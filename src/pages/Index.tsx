import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border/30">
        © {new Date().getFullYear()} Saad Shakil. All rights reserved.
      </footer>
    </div>
  );
}
