import { useEffect, useRef } from 'react';

const row1Images = [
  'images/marquee/q.gif',
  'images/marquee/w.gif',
  'images/marquee/e.gif',
  'images/marquee/r.gif',
];

const row2Images = [
  'images/marquee/t.gif',
  'images/marquee/y.gif',
  'images/marquee/u.gif',
  'images/marquee/i.gif',
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isVisible = false;
    const imgs = section.querySelectorAll<HTMLImageElement>('img');

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        imgs.forEach((img) => {
          if (isVisible && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!sectionRef.current || !row1Ref.current || !row2Ref.current) {
          ticking = false;
          return;
        }
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const isMobile = window.innerWidth < 768;
        const speed = isMobile ? 0.12 : 0.3;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * speed;

        row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
        row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tripledRow1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images];
  const tripledRow2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 relative z-[95]">
      <div className="overflow-hidden">
        <div ref={row1Ref} className="flex gap-2 md:gap-3 items-center will-change-transform">
          {tripledRow1.map((src, i) => (
            <img
              key={i}
              data-src={src}
              alt=""
              className="w-[23vw] min-w-[23vw] sm:w-[350px] md:w-[420px] rounded-xl md:rounded-2xl object-cover flex-shrink-0 bg-[#1a1a1a]"
              style={{ aspectRatio: '16/10' }}
            />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-2 md:gap-3 items-center mt-2 md:mt-3 will-change-transform">
          {tripledRow2.map((src, i) => (
            <img
              key={i}
              data-src={src}
              alt=""
              className="w-[23vw] min-w-[23vw] sm:w-[350px] md:w-[420px] rounded-xl md:rounded-2xl object-cover flex-shrink-0 bg-[#1a1a1a]"
              style={{ aspectRatio: '16/10' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
