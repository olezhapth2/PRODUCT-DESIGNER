const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DAMP = 8;
const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
/* ========= SpecularButton — vanilla-порт (React Bits, WebGL2) ========= */
const SB_VERT = `#version 300 es
in vec2 aPosition;
void main(){ gl_Position = vec4(aPosition, 0.0, 1.0); }`;

const SB_FRAG = `#version 300 es
precision highp float;
uniform vec2 uCenter; uniform vec2 uHalf; uniform float uRadius; uniform float uPx;
uniform float uSpot; uniform vec2 uEntry; uniform vec3 uLineColor; uniform vec3 uBaseColor;
uniform float uIntensity; uniform vec2 uWindow; uniform float uThickness; uniform float uGlow;
out vec4 outColor;
float roundedBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
float loopPosition(vec2 p, vec2 b, float r){
  vec2 inner = b - r; float arc = 1.5707963 * r; float quarter = inner.x + inner.y + arc;
  vec2 a = abs(p); vec2 q = a - inner;
  float s = q.x > 0.0 && q.y > 0.0 ? inner.y + atan(q.y, q.x) * r
    : (q.x > q.y ? min(a.y, inner.y) : inner.y + arc + inner.x - min(a.x, inner.x));
  if (p.x < 0.0) s = p.y >= 0.0 ? 2.0 * quarter - s : 2.0 * quarter + s;
  else if (p.y < 0.0) s = 4.0 * quarter - s;
  return s / max(4.0 * quarter, 0.0001);
}
float lobe(float position, float center){ float gap = abs(fract(position - center + 0.5) - 0.5); return 1.0 - smoothstep(uWindow.x, uWindow.x + uWindow.y, gap); }
void main(){
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedBox(p, uHalf, uRadius);
  float position = loopPosition(p, uHalf, uRadius);
  float key = lobe(position, uSpot);
  float back = lobe(position, uSpot + 0.5);
  float streak = key + back * 0.45;
  float width = max(uThickness * uPx * mix(1.0, max(key, back), 0.6), 0.35);
  float band = smoothstep(-width - 0.6, -width + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float hair = smoothstep(-uPx - 0.6, -uPx + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float inside = 1.0 - smoothstep(-0.6, 0.6, d);
  vec2 pool = (p - uEntry) / (uHalf.y * vec2(1.6, 1.1));
  float glow = streak * 0.2 * exp(-abs(d + width * 0.5) / (5.0 * uPx)) + inside * 0.08 * exp(-dot(pool, pool));
  float light = clamp((band * streak + glow * uGlow) * uIntensity, 0.0, 1.0);
  vec4 base = vec4(uBaseColor, 1.0) * hair * 0.6;
  outColor = vec4(uLineColor, 1.0) * light + base * (1.0 - light);
}`;

const SB_UNIFORMS = ["uCenter","uHalf","uRadius","uPx","uSpot","uEntry","uLineColor","uBaseColor","uIntensity","uWindow","uThickness","uGlow"];
const sbWrap = (x) => x - Math.floor(x);
const sbClamp = (v, a, b) => Math.min(b, Math.max(a, v));

function sbLoopPos(x, y, hx, hy, r) {
  const innerX = hx - r, innerY = hy - r;
  const arc = Math.PI / 2 * r, quarter = innerX + innerY + arc;
  const ax = Math.abs(x), ay = Math.abs(y);
  const qx = ax - innerX, qy = ay - innerY;
  let s;
  if (qx > 0 && qy > 0) s = innerY + Math.atan2(qy, qx) * r;
  else if (qx > qy) s = Math.min(ay, innerY);
  else s = innerY + arc + innerX - Math.min(ax, innerX);
  if (x < 0) s = y >= 0 ? 2 * quarter - s : 2 * quarter + s;
  else if (y < 0) s = 4 * quarter - s;
  return sbWrap(s / Math.max(4 * quarter, 1e-4));
}

function sbRimPoint(pos, hx, hy, r) {
  const innerX = hx - r, innerY = hy - r;
  const arc = Math.PI / 2 * r, quarter = innerX + innerY + arc;
  let s = sbWrap(pos) * 4 * quarter, signX = 1, signY = 1;
  if (s > 3 * quarter) { s = 4 * quarter - s; signY = -1; }
  else if (s > 2 * quarter) { s -= 2 * quarter; signX = -1; signY = -1; }
  else if (s > quarter) { s = 2 * quarter - s; signX = -1; }
  let x = innerX - (s - innerY - arc), y = hy;
  if (s <= innerY) { x = hx; y = s; }
  else if (s <= innerY + arc) {
    const a = (s - innerY) / Math.max(r, 1e-4);
    x = innerX + Math.cos(a) * r;
    y = innerY + Math.sin(a) * r;
  }
  return [x * signX, y * signY];
}

const sbProbe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
const sbColorCache = new Map();
function sbRgb(value) {
  let c = sbColorCache.get(value);
  if (c) return c;
  let rgb = [1, 1, 1];
  if (sbProbe) {
    sbProbe.clearRect(0, 0, 1, 1);
    sbProbe.fillStyle = "#000";
    sbProbe.fillStyle = value;
    sbProbe.fillRect(0, 0, 1, 1);
    const [r, g, b] = sbProbe.getImageData(0, 0, 1, 1).data;
    rgb = [r / 255, g / 255, b / 255];
  }
  sbColorCache.set(value, rgb);
  return rgb;
}

const SB = { pointer: { x: 0, y: 0, known: false }, list: [], raf: 0, last: 0 };
function sbWake() {
  if (!SB.raf) { SB.last = 0; SB.raf = requestAnimationFrame(sbFrame); }
}
window.addEventListener("pointermove", (e) => {
  SB.pointer.x = e.clientX; SB.pointer.y = e.clientY; SB.pointer.known = true;
  sbWake();
}, { passive: true });
window.addEventListener("pointerleave", () => { SB.pointer.known = false; sbWake(); }, { passive: true });

function sbRestSpot(b) {
  const r = Math.min(b.s.radius, b.w / 2, b.h / 2);
  const inset = r * (1 - Math.SQRT1_2);
  return sbLoopPos(inset - b.w / 2, b.h / 2 - inset, b.w / 2, b.h / 2, r);
}

function sbAim(b) {
  const p = SB.pointer, s = b.s;
  if (!p.known) return null;
  const rect = b.el.getBoundingClientRect();
  const scale = rect.width / b.w || 1;
  const hx = b.w / 2, hy = b.h / 2;
  const r = Math.min(s.radius, hx, hy);
  const x = (p.x - rect.left - rect.width / 2) / scale;
  const y = (rect.top + rect.height / 2 - p.y) / scale;
  const dist = Math.hypot(Math.max(Math.abs(x) - hx, 0), Math.max(Math.abs(y) - hy, 0));
  const t = sbClamp(1 - dist / s.proximity, 0, 1);
  const near = t * t * (3 - 2 * t);
  const nearest = sbLoopPos(x, y, hx, hy, r);
  if (dist > 0) return { spot: nearest, near };
  const inset = r * (1 - Math.SQRT1_2);
  const rest = sbLoopPos(inset - hx, hy - inset, hx, hy, r);
  const depth = sbClamp(Math.min(hx - Math.abs(x), hy - Math.abs(y)) / (hy * 0.8), 0, 1);
  const sway = rest - (x / hx) * 0.06 - (y / hy) * 0.02;
  const off = sway - nearest - Math.round(sway - nearest);
  return { spot: sbWrap(nearest + off * depth * depth * (3 - 2 * depth)), near };
}

function sbDraw(b) {
  const { gl, canvas, U, s, pr } = b;
  const pad = 24, w = b.w, h = b.h;
  const scaleX = canvas.width / (w + pad * 2);
  const scaleY = canvas.height / (h + pad * 2);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(pr);
  gl.uniform2f(U.uCenter, (pad + w / 2) * scaleX, (pad + h / 2) * scaleY);
  gl.uniform2f(U.uHalf, (w / 2) * scaleX, (h / 2) * scaleY);
  const r = Math.min(s.radius, w / 2, h / 2);
  gl.uniform1f(U.uRadius, r * scaleX);
  gl.uniform1f(U.uPx, b.ratio);
  const [rx, ry] = sbRimPoint(b.spot, w / 2, h / 2, r);
  const len = Math.hypot(rx, ry) || 1;
  const pull = 1 - Math.min(0.35 * (h / 2), len) / len;
  gl.uniform1f(U.uSpot, b.spot);
  gl.uniform2f(U.uEntry, rx * pull * scaleX, ry * pull * scaleY);
  gl.uniform3fv(U.uLineColor, sbRgb(s.line));
  gl.uniform3fv(U.uBaseColor, sbRgb(s.base));
  gl.uniform1f(U.uIntensity, s.intensity * b.level);
  gl.uniform2f(U.uWindow, s.shine / 360, s.fade / 360 + 0.0001);
  gl.uniform1f(U.uThickness, s.thick);
  gl.uniform1f(U.uGlow, s.glow);
  gl.bindVertexArray(b.vao);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.bindVertexArray(null);
}

function sbFrame(now) {
  SB.raf = 0;
  const dt = SB.last ? Math.min(0.05, (now - SB.last) / 1000) : 1 / 60;
  SB.last = now;
  let settling = false;
  for (const b of SB.list) {
    const s = b.s;
    if (!b.ready) { b.spot = sbRestSpot(b); b.level = s.idle; b.ready = true; }
    const aim = sbAim(b);
    const spot = aim ? aim.spot : sbRestSpot(b);
    let diff = spot - b.spot;
    diff -= Math.round(diff);
    b.spot = sbWrap(b.spot + diff * (1 - Math.exp(-dt * DAMP)));
    const levelTarget = s.idle + (aim ? (1 - s.idle) * aim.near : 0);
    b.level += (levelTarget - b.level) * (1 - Math.exp(-dt * DAMP));
    sbDraw(b);
    if (Math.abs(diff) > 0.0002 || Math.abs(levelTarget - b.level) > 0.001) settling = true;
  }
  if (settling) SB.raf = requestAnimationFrame(sbFrame);
  else SB.last = 0;
}

function specular(el, opts = {}) {
  const s = Object.assign(
    { radius: 14, line: "#ffffff", base: "#55555c", intensity: 1, idle: 0.5, shine: 10, fade: 34, thick: 1.4, glow: 1, proximity: 260 },
    opts
  );
  const canvas = document.createElement("canvas");
  canvas.className = "sb-canvas";
  canvas.setAttribute("aria-hidden", "true");
  el.prepend(canvas);
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) { canvas.remove(); el.classList.add("is-no-shader"); return; }
  const mk = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
  };
  const vs = mk(gl.VERTEX_SHADER, SB_VERT);
  const fs = mk(gl.FRAGMENT_SHADER, SB_FRAG);
  if (!vs || !fs) return;
  const pr = gl.createProgram();
  gl.attachShader(pr, vs);
  gl.attachShader(pr, fs);
  gl.bindAttribLocation(pr, 0, "aPosition");
  gl.linkProgram(pr);
  const U = {};
  for (const n of SB_UNIFORMS) U[n] = gl.getUniformLocation(pr, n);
  const buf = gl.createBuffer();
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  const b = { el, gl, pr, canvas, U, vao, buf, s, spot: 0, level: s.idle, ready: false, w: 1, h: 1, ratio: 1 };
  SB.list.push(b);
  const measure = () => {
    const rect = b.el.getBoundingClientRect();
    b.w = Math.max(1, rect.width);
    b.h = Math.max(1, rect.height);
    b.ratio = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.max(1, Math.round((b.w + 48) * b.ratio));
    canvas.height = Math.max(1, Math.round((b.h + 48) * b.ratio));
    b.ready = false;
    sbWake();
  };
  b.resizeObserver = new ResizeObserver(measure);
  b.resizeObserver.observe(el);
  measure();
}

/* Блик кнопок берёт цвета из токенов темы. Раньше при смене темы создавались
   новые WebGL-контексты, а старые оставались в SB.list — после нескольких
   переключений браузер начинал гасить контексты (вплоть до фона). Теперь
   контексты создаются один раз, а тема меняет только цвета. */
function specOpts(el) {
  const primary = el.classList.contains("btn--primary");
  return {
    radius: 14,
    line: primary ? (document.documentElement.dataset.theme === "dark" ? "#0a0a0c" : "#ffffff") : cssVar("--acc"),
    base: primary ? cssVar("--acc") : cssVar("--spec-base"),
    idle: primary ? .55 : .4,
    intensity: primary ? .9 : 1,
  };
}
if (!REDUCED) document.querySelectorAll(".btn").forEach((el) => specular(el, specOpts(el)));
function syncSpeculars() {
  for (const b of SB.list) Object.assign(b.s, specOpts(b.el));
  sbColorCache.clear();
  for (const b of SB.list) b.ready = false;
  sbWake();
}


const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
const icons = [...document.querySelectorAll(".ui-icon")];
const replayIcon = icon => {
  if (motionQuery.matches || typeof icon.setCurrentTime !== "function") return;
  icon.setCurrentTime(0);
  icon.unpauseAnimations();
};
const freezeIcon = icon => {
  if (typeof icon.setCurrentTime !== "function") return;
  icon.setCurrentTime(10);
  icon.pauseAnimations();
};
icons.forEach(icon => {
  freezeIcon(icon);
  const target = icon.closest("a, .hello, .label, h2, h3, figcaption, .timeline-date, .case-meta, .case-role, .story-strip li, dt, button") || icon;
  target.addEventListener("pointerenter", () => replayIcon(icon));
  target.addEventListener("focusin", () => replayIcon(icon));
});
if (!motionQuery.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in");
      entry.target.querySelectorAll(".ui-icon").forEach(replayIcon);
      if (entry.target.matches(".ui-icon")) replayIcon(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll(".rv").forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight) element.classList.add("in");
    observer.observe(element);
  });
  icons.forEach(icon => observer.observe(icon));
  document.documentElement.classList.add("js-motion");
}
document.querySelectorAll("[data-motion-toggle]").forEach(button => {
  const image = document.getElementById(button.getAttribute("aria-controls"));
  button.addEventListener("click", () => {
    const playing = button.getAttribute("aria-pressed") === "true";
    image.src = playing ? image.dataset.poster : image.dataset.motion;
    button.setAttribute("aria-pressed", String(!playing));
    const label = button.querySelector("span");
    if (label) label.textContent = playing ? "Воспроизвести демонстрацию" : "Остановить демонстрацию";
  });
});
motionQuery.addEventListener("change", event => {
  if (!event.matches) {
    document.querySelectorAll(".btn").forEach(element => {
      element.classList.remove("is-no-shader");
      specular(element, specOpts(element));
    });
    return;
  }
  document.documentElement.classList.remove("js-motion");
  icons.forEach(freezeIcon);
  document.querySelectorAll("[data-motion-toggle][aria-pressed=true]").forEach(button => button.click());
  for (const button of SB.list) {
    button.resizeObserver?.disconnect();
    button.gl.deleteBuffer(button.buf);
    button.gl.deleteVertexArray(button.vao);
    button.gl.deleteProgram(button.pr);
    button.canvas.remove();
    button.el.classList.add("is-no-shader");
  }
  SB.list.length = 0;
  cancelAnimationFrame(SB.raf);
  SB.raf = 0;
});
