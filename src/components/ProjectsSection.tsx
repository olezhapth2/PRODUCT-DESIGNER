import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';

const totalCards = 7;

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

function ProjectCard({
  project,
  index,
  scrollYProgress,
  labels,
}: {
  project: { num: string; category: string; name: string; tag?: string; metrics: string[]; task: string; whatWasDone: string; result: string; role: string; duration: string; team: string; images: { col1Top: string; col1Bottom: string; col2: string }; notionUrl: string };
  index: number;
  scrollYProgress: MotionValue<number>;
  labels: { task: string; whatWasDone: string; result: string };
}) {
  const progressRatio = totalCards > 1 ? index / (totalCards - 1) : 0;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [progressRatio * 0.8, 1], [1, targetScale]);
  const [popupSrc, setPopupSrc] = useState<string | null>(null);
  const { t } = useLang();

  return (
    <div
      className="min-h-[50vh] sm:min-h-[60vh] py-4 sm:py-6 flex items-start sticky top-28 md:top-36 pb-8"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        className="w-full rounded-[20px] sm:rounded-[28px] md:rounded-[36px] border-2 p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col gap-3 sm:gap-4 justify-between overflow-hidden"
        style={{ scale, transformOrigin: 'top center', background: '#000000', borderColor: '#D7E2EA' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span className="font-black text-[#D7E2EA] leading-none" style={{ fontSize: 'clamp(2.5rem, 8.5vw, 120px)' }}>
              {project.num}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-wider">{project.category}</span>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-xl md:text-2xl">{project.name}</span>
                {project.tag && (
                  <span className="text-[#B600A8] text-xs font-semibold uppercase tracking-wider border border-[#B600A8]/30 rounded-full px-2 py-0.5">
                    {project.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={project.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex overflow-hidden rounded-full p-[1px] hover:scale-105 transition-transform duration-300"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gray-950 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium text-gray-50 backdrop-blur-3xl uppercase tracking-widest">
                {t.liveProject}
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <h4 className="text-[#D7E2EA] text-xs font-bold uppercase tracking-wider mb-1">{labels.task}</h4>
            <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">{project.task}</p>
          </div>
          <div>
            <h4 className="text-[#D7E2EA] text-xs font-bold uppercase tracking-wider mb-1">{labels.whatWasDone}</h4>
            <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">{project.whatWasDone}</p>
          </div>
          <div>
            <h4 className="text-[#D7E2EA] text-xs font-bold uppercase tracking-wider mb-1">{labels.result}</h4>
            <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">{project.result}</p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="w-[40%] flex flex-col gap-2 sm:gap-3">
            <img
              src={project.images.col1Top}
              alt=""
              className="w-full rounded-[10px] object-cover"
              loading="lazy"
              onClick={() => setPopupSrc(project.images.col1Top)}
            />
            <img
              src={project.images.col1Bottom}
              alt=""
              className="w-full rounded-[10px] object-cover"
              loading="lazy"
              onClick={() => setPopupSrc(project.images.col1Bottom)}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.images.col2}
              alt=""
              className="w-full h-full rounded-[10px] object-cover"
              loading="lazy"
              onClick={() => setPopupSrc(project.images.col2)}
            />
          </div>
        </div>
      </motion.div>

      {popupSrc && <ImagePopup src={popupSrc} onClose={() => setPopupSrc(null)} />}
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-[95] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: 'transparent' }}
    >
      <FadeIn>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}>
          {t.projectsHeading}
        </h2>
      </FadeIn>

      <div className="max-w-[80rem] mx-auto">
        {t.projects.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            scrollYProgress={scrollYProgress}
            labels={{ task: t.task, whatWasDone: t.whatWasDone, result: t.result }}
          />
        ))}
      </div>
    </section>
  );
}
