import { useState } from 'react';
import { LangProvider, useLang } from './lib/i18n';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';
import Preloader from './components/Preloader';

function AppInner() {
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} heading={t.heroHeading} />}
      <div style={{ overflowX: 'clip' }}>
        <Nav />
        <HeroSection preloaderDone={!loading} />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </div>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
