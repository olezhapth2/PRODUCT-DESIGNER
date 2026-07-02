import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const TOTAL_FRAMES = 119;
const FRAME_PATH = 'frames/frame-';

export default function HeroSection({ preloaderDone = true }: { preloaderDone?: boolean }) {
  const { lang, t } = useLang();
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const fit = () => {
      const span = document.createElement('span');
      span.textContent = t.heroHeading;
      span.style.cssText =
        "position:absolute;visibility:hidden;pointer-events:none;white-space:nowrap;" +
        "font-family:'Dela Gothic One',sans-serif;font-weight:900;" +
        "text-transform:uppercase;letter-spacing:-0.025em;font-size:10vw;";
      document.body.appendChild(span);
      const w = span.scrollWidth;
      document.body.removeChild(span);
      if (w > 0) el.style.fontSize = `${(innerWidth / w) * 10}vw`;
    };

    document.fonts.ready.then(fit);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [t.heroHeading, lang]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    const BATCH = 30;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      if (i <= BATCH) {
        img.src = `${FRAME_PATH}${String(i).padStart(3, '0')}.jpg`;
      }
      img.onload = () => {
        loadedRef.current++;
        if (loadedRef.current === 1) drawFrame(0);
      };
      images.push(img);
    }
    framesRef.current = images;

    const loadRest = () => {
      for (let i = BATCH; i < TOTAL_FRAMES; i++) {
        if (!images[i].src) {
          images[i].src = `${FRAME_PATH}${String(i + 1).padStart(3, '0')}.jpg`;
        }
      }
    };
    const timer = setTimeout(loadRest, 1500);
    return () => clearTimeout(timer);
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames[index]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (canvas.width !== frames[index].naturalWidth) {
      canvas.width = frames[index].naturalWidth;
      canvas.height = frames[index].naturalHeight;
    }
    ctx.drawImage(frames[index], 0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(x * TOTAL_FRAMES));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          drawFrame(frame);
        }
      });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const x = Math.max(0, Math.min(1, (e.gamma! + 45) / 90));
        const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(x * TOTAL_FRAMES));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          drawFrame(frame);
        }
      });
    };

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
        if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation);
      }).catch(() => {});
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);


  return (
    <section className="relative h-screen flex flex-col overflow-x-visible">
      <div className="relative z-20 w-full px-1 text-center md:text-left overflow-visible">
          <motion.h1
            ref={textRef}
            className="hero-heading font-black uppercase tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t.heroHeading}
          </motion.h1>
      </div>

      {/* Desktop: tagline left, buttons right */}
      <div className="hidden md:flex flex-row justify-between items-end gap-6 pb-10 px-10 mt-auto relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[320px]" style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.5rem)' }}>
            {t.heroTagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-3">
            <ContactButton />
            <a
              href="https://t.me/olegdevyatow"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex overflow-hidden rounded-full p-[1px] hover:scale-105 transition-transform duration-300"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gray-950 px-6 py-4 text-gray-50 backdrop-blur-3xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></svg>
              </span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Mobile: tagline + buttons centered */}
      <div className="flex md:hidden flex-col items-center gap-4 pb-6 px-5 mt-auto relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
            {t.heroTagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-3">
            <ContactButton />
            <a
              href="https://t.me/olegdevyatow"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex overflow-hidden rounded-full p-[1px] hover:scale-105 transition-transform duration-300"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gray-950 px-4 py-3 text-gray-50 backdrop-blur-3xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></svg>
              </span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Head animation */}
      <div className="hero-canvas-wrap" style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-[93vw] sm:w-[576px] md:w-[704px] lg:w-[832px]"
            style={{ imageRendering: 'auto', opacity: 0.8, filter: 'blur(3px)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)
              `,
              backgroundSize: '4px 4px'
            }}
          />
        </div>
      </div>
    </section>
  );
}
