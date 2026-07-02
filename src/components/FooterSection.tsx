import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';

const btnClass = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(215,226,234,0.15)] transition-all duration-300 px-6 py-3 text-sm";

const icons = {
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  send: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  behance: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  external: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>,
  at: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>,
};

function ImagePopup({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          src={src}
          className="max-w-full max-h-full object-contain rounded-[10px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function FooterSection() {
  const { t } = useLang();
  const [popupSrc, setPopupSrc] = useState<string | null>(null);

  return (
    <footer id="contact" className="py-20 sm:py-24 md:py-32 relative">
      <div className="w-full px-5 mb-12 sm:mb-16 md:mb-20">
        <FadeIn>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}>
            {t.letsTalk}
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12 px-5">

        <FadeIn delay={0.2}>
          <p className="text-[#D7E2EA]/60 text-center max-w-lg text-sm sm:text-base leading-relaxed">
            {t.footerDesc}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-3">
            <a href="mailto:olegdevyatow@gmail.com" className={btnClass}>
              {icons.mail}
              Email
            </a>
            <a href="https://t.me/olegdevyatow" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.send}
              Telegram
            </a>
            <a href="https://www.linkedin.com/in/oleg-devyatow-653584367/" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.linkedin}
              LinkedIn
            </a>
            <a href="https://www.behance.net/reesoonki" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.behance}
              Behance
            </a>
            <a href="https://olezhapth2.github.io/od/#projects" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.external}
              {t.fullProjects}
            </a>
            <a href="https://www.threads.com/@olegdevaytow?invite=0" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.at}
              Threads
            </a>
            <a href="https://olegdevyatow.tilda.ws" target="_blank" rel="noopener noreferrer" className={btnClass}>
              {icons.external}
              {t.oldPortfolio}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center gap-3 max-w-[500px] w-full">
            <div
              className="rounded-2xl overflow-hidden border border-[#D7E2EA]/10 cursor-pointer hover:scale-[1.02] transition-transform duration-300 w-full"
              onClick={() => setPopupSrc('aimimo.png')}
            >
              <img src="aimimo.png" alt="" className="w-full block" loading="lazy" />
            </div>
            <p className="text-[#D7E2EA]/40 text-xs text-center">
              {t.footerCardCaption}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="text-[#D7E2EA]/25 text-xs text-center mt-4">
            {t.copyright}
          </p>
        </FadeIn>
      </div>

      {popupSrc && <ImagePopup src={popupSrc} onClose={() => setPopupSrc(null)} />}
    </footer>
  );
}
