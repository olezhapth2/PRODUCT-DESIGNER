import { useLang } from '../lib/i18n';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

export default function AboutSection() {
  const { t } = useLang();

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 relative overflow-hidden">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}>
            {t.aboutHeading}
          </h2>
        </FadeIn>

        <AnimatedText
          text={t.aboutText}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[600px]"
          style={{ textAlign: 'justify', wordBreak: 'keep-all', overflowWrap: 'normal', hyphens: 'none' }}
        />

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
