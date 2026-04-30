import { usePortfolio } from '../../hooks/usePortfolio';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

export default function PreviewPanel() {
  const { templateType } = usePortfolio();
  const isDesign = templateType === 'design';

  return (
    <div className="relative w-full min-h-full">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-20 bg-[#0F0C09] border-b border-[#2E2418] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8833A] animate-pulse"></span>
          <span className="text-xs font-semibold text-[#5A4E42] uppercase tracking-widest">Live Preview</span>
        </div>
        <span className="text-xs text-[#5A4E42]">Updates as you type</span>
      </div>
      
      <div className="p-6 lg:p-10">
        <div className={`w-full max-w-3xl mx-auto flex flex-col ${isDesign ? 'items-center' : 'items-stretch'}`}>
          <HeroSection />
          <div className={`flex flex-col gap-10 mt-10 w-full ${isDesign ? 'items-center' : ''}`}>
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
