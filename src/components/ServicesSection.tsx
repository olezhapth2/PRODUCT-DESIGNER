import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';

export default function ServicesSection() {
  const { t } = useLang();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-[95]">
      <FadeIn>
        <h2 className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}>
          {t.servicesHeading}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {t.services.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className="relative flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="font-black text-[#0C0C0C] leading-none transition-colors duration-300 group-hover:text-[#B600A8]" style={{ fontSize: 'clamp(2.5rem, 8.5vw, 120px)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="font-medium uppercase transition-colors duration-300 group-hover:text-[#B600A8]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {s.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                  {s.desc}
                </p>
              </div>

              <AnimatePresence>
                {hoveredIndex === i && (
                  <>
                    <motion.img
                      src={[['images/icons/rocket.png', 'images/icons/pencil.png'], ['images/icons/loud-speaker.png', 'images/icons/coffee.png'], ['images/icons/crowned.png', 'images/icons/outlet.png'], ['images/icons/clapperboard.png', 'images/icons/spary.png'], ['images/icons/magic.png', 'images/icons/rotten.png']][i][0]}
                      alt=""
                      className="hidden md:block absolute left-0 -bottom-6 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] object-contain pointer-events-none"
                      style={{ mixBlendMode: 'multiply' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img
                      src={[['images/icons/rocket.png', 'images/icons/pencil.png'], ['images/icons/loud-speaker.png', 'images/icons/coffee.png'], ['images/icons/crowned.png', 'images/icons/outlet.png'], ['images/icons/clapperboard.png', 'images/icons/spary.png'], ['images/icons/magic.png', 'images/icons/rotten.png']][i][1]}
                      alt=""
                      className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] object-contain pointer-events-none"
                      style={{ mixBlendMode: 'multiply' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
