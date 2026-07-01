import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedCharProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function AnimatedChar({ char, index, total, scrollYProgress }: AnimatedCharProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charIndex = 0;

  return (
    <p ref={ref} className={`relative ${className}`} style={style}>
      {words.map((word, wi) => {
        const wordChars = word.split('');
        const startIdx = charIndex;
        charIndex += wordChars.length;
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {wordChars.map((char, ci) => (
              <AnimatedChar
                key={ci}
                char={char}
                index={startIdx + ci}
                total={text.replace(/ /g, '').length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </span>
        );
      }).reduce<React.ReactNode[]>((acc, word, i) => {
        if (i > 0) acc.push(<span key={`s${i}`} className="inline-block">&nbsp;</span>);
        acc.push(word);
        return acc;
      }, [])}
    </p>
  );
}
