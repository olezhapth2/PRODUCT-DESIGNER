import { LangProvider } from './lib/i18n';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <LangProvider>
      <div style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </div>
    </LangProvider>
  );
}
