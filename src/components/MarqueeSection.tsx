import { useEffect, useRef } from 'react';

const row1Images = [
  'images/marquee/q.gif',
  'images/marquee/w.gif',
];

const row2Images = [
  'images/marquee/e.gif',
  'images/marquee/r.gif',
];

const row3Images = [
  'images/marquee/t.gif',
  'images/marquee/y.gif',
];

const row4Images = [
  'images/marquee/u.gif',
  'images/marquee/i.gif',
];

const allDesktopRow1 = ['images/marquee/q.gif', 'images/marquee/w.gif', 'images/marquee/e.gif', 'images/marquee/r.gif'];
const allDesktopRow2 = ['images/marquee/t.gif', 'images/marquee/y.gif', 'images/marquee/u.gif', 'images/marquee/i.gif'];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopRow1Ref = useRef<HTMLDivElement>(null);
  const desktopRow2Ref = useRef<HTMLDivElement>(null);
  const mobileRow1Ref = useRef<HTMLDivElement>(null);
  const mobileRow2Ref = useRef<HTMLDivElement>(null);
  const mobileRow3Ref = useRef<HTMLDivElement>(null);
  const mobileRow4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const isMobile = window.innerWidth < 768;
        const speed = isMobile ? 0.12 : 0.3;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * speed;
        const shift = offset - 200;

        if (isMobile) {
          if (mobileRow1Ref.current) mobileRow1Ref.current.style.transform = `translate3d(${shift}px, 0, 0)`;
          if (mobileRow2Ref.current) mobileRow2Ref.current.style.transform = `translate3d(${-shift}px, 0, 0)`;
          if (mobileRow3Ref.current) mobileRow3Ref.current.style.transform = `translate3d(${shift}px, 0, 0)`;
          if (mobileRow4Ref.current) mobileRow4Ref.current.style.transform = `translate3d(${-shift}px, 0, 0)`;
        } else {
          if (desktopRow1Ref.current) desktopRow1Ref.current.style.transform = `translate3d(${shift}px, 0, 0)`;
          if (desktopRow2Ref.current) desktopRow2Ref.current.style.transform = `translate3d(${-shift}px, 0, 0)`;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const desktopRow1 = [...allDesktopRow1, ...allDesktopRow1, ...allDesktopRow1];
  const desktopRow2 = [...allDesktopRow2, ...allDesktopRow2, ...allDesktopRow2];

  const mobileRow1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images];
  const mobileRow2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];
  const mobileRow3 = [...row3Images, ...row3Images, ...row3Images, ...row4Images];
  const mobileRow4 = [...row4Images, ...row4Images, ...row4Images, ...row4Images];

  return (
    <section ref={sectionRef} className="pt-8 sm:pt-12 md:pt-16 pb-10 relative z-[95]">
      {/* Desktop: 2 rows */}
      <div className="hidden md:block overflow-hidden">
        <div ref={desktopRow1Ref} className="flex gap-3 items-center will-change-transform">
          {desktopRow1.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[420px] rounded-2xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
        <div ref={desktopRow2Ref} className="flex gap-3 items-center mt-3 will-change-transform">
          {desktopRow2.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[420px] rounded-2xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
      </div>

      {/* Mobile: 4 rows, bigger cards */}
      <div className="md:hidden overflow-hidden">
        <div ref={mobileRow1Ref} className="flex gap-2 items-center will-change-transform">
          {mobileRow1.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[45vw] min-w-[45vw] rounded-xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
        <div ref={mobileRow2Ref} className="flex gap-2 items-center mt-2 will-change-transform">
          {mobileRow2.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[45vw] min-w-[45vw] rounded-xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
        <div ref={mobileRow3Ref} className="flex gap-2 items-center mt-2 will-change-transform">
          {mobileRow3.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[45vw] min-w-[45vw] rounded-xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
        <div ref={mobileRow4Ref} className="flex gap-2 items-center mt-2 will-change-transform">
          {mobileRow4.map((src, i) => (
            <img key={i} src={src} alt="" className="w-[45vw] min-w-[45vw] rounded-xl object-cover flex-shrink-0 bg-[#1a1a1a]" style={{ aspectRatio: '16/10' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
