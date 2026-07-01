import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const TOTAL_FRAMES = 119;
const FRAME_PATH = 'frames/frame-';

export default function HeroSection() {
  const { lang, setLang, t } = useLang();
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    const el = textRef.current;
    const container = headingRef.current;
    if (!el || !container) return;
    const fit = () => {
      el.style.fontSize = '10vw';
      void el.offsetHeight;
      const measured = el.scrollWidth;
      if (measured <= 0) return;
      const avail = container.clientWidth - 40;
      const px = (avail / measured) * parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(px / window.innerWidth) * 100}vw`;
    };
    document.fonts.ready.then(fit);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [t.heroHeading, lang]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedRef.current++;
        if (loadedRef.current === 1) drawFrame(0);
      };
      images.push(img);
    }
    framesRef.current = images;
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

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const mobileBtnClass = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 hover:scale-105 transition-all duration-300 px-6 py-3 text-sm w-full";

  return (
    <section className="relative h-screen flex flex-col overflow-x-visible pt-14">
      <div className="absolute top-0 left-0 right-0 h-32 z-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }} />

      <div ref={headingRef} className="relative z-20 w-full px-5 pt-[10px] md:pt-[20px] text-center md:text-left overflow-visible">
        <FadeIn delay={0.15} y={40}>
          <h1
            ref={textRef}
            className="hero-heading font-black uppercase tracking-tight leading-none"
          >
            {t.heroHeading}
          </h1>
        </FadeIn>
      </div>

      <nav className="flex justify-between items-center px-5 md:px-10 py-3 fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.8) 15%, transparent 40%, transparent 60%, rgba(0,0,0,0.8) 85%, #000 100%)' }}>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-white font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity">
            {t.heroName}
          </a>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <a href="#contact" className="text-white font-medium uppercase tracking-wider text-xs md:text-sm blink-subtle">
            {t.letsTalk}
          </a>
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-200 hover:scale-105 ${lang === 'en' ? 'text-white bg-white/10' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'}`}
            >
              En
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-200 hover:scale-105 ${lang === 'ru' ? 'text-white bg-white/10' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'}`}
            >
              Ru
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:scale-110 transition-transform"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start gap-8 px-6 pt-24 pb-10 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="fixed top-3 right-5 md:right-10 z-[101] p-1 hover:scale-110 transition-transform"
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="flex flex-col items-center gap-5 mt-8" onClick={(e) => e.stopPropagation()}>
              {t.nav.map((item, i) => {
                const anchors = ['work', 'about', 'services', 'contact'];
                return (
                  <a
                    key={item}
                    href={`#${anchors[i]}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#D7E2EA] font-medium uppercase tracking-wider text-2xl md:text-3xl hover:opacity-70 transition-opacity"
                  >
                    {item}
                  </a>
                );
              })}
            </div>

            <div className="w-full max-w-xs flex flex-col items-center gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
              <a href="mailto:olegdevyatow@gmail.com" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </a>
              <a href="https://t.me/olegdevyatow" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></svg>
                Telegram
              </a>
              <a href="https://www.linkedin.com/in/oleg-devyatow-653584367/" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://www.behance.net/reesoonki" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                Behance
              </a>
              <a href="https://olegdevyatow.tilda.ws" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                {t.oldPortfolio}
              </a>
              <a href="https://olezhapth2.github.io/od/#projects" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                {t.fullProjects}
              </a>
              <a href="https://www.threads.com/@olegdevaytow?invite=0" target="_blank" rel="noopener noreferrer" className={mobileBtnClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                Threads
              </a>
            </div>

            <div className="flex items-center gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setLang('en'); setMenuOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-200 ${lang === 'en' ? 'text-white bg-white/10' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'}`}
              >
                En
              </button>
              <button
                onClick={() => { setLang('ru'); setMenuOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-200 ${lang === 'ru' ? 'text-white bg-white/10' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'}`}
              >
                Ru
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="hero-canvas-wrap">
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
