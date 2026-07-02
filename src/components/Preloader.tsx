import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
  heading: string;
}

export default function Preloader({ onComplete, heading }: PreloaderProps) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleLetters >= heading.length) {
      const timer = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setVisibleLetters((v) => v + 1), 70);
    return () => clearTimeout(timer);
  }, [visibleLetters, heading.length]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: '#000' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <h1
            className="font-black uppercase tracking-tight leading-none select-none text-center"
            style={{
              fontSize: '10vw',
              color: '#ffffff',
              fontFamily: "'Dela Gothic One', sans-serif",
              margin: 0,
              padding: 0,
            }}
          >
            {heading.split('').map((letter, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: i < visibleLetters ? 1 : 0,
                  transform: i < visibleLetters ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.12s ease, transform 0.12s ease',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
