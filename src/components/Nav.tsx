import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLang } from '../lib/i18n';

const mobileBtnClass = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 hover:scale-105 transition-all duration-300 px-6 py-3 text-sm w-full";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const menuOverlay = createPortal(
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start gap-8 px-6 pt-24 pb-10 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="fixed top-3 right-5 md:right-10 z-[201] p-1 hover:scale-110 transition-transform"
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
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <nav className="flex justify-between items-center px-5 md:px-10 py-3 sticky top-0 z-[100] w-full" style={{ background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 60%, transparent 100%)' }}>
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
      {menuOverlay}
    </>
  );
}
