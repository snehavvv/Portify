import { usePortfolio } from '../../hooks/usePortfolio';

export default function SkillsSection() {
  const { skills, templateType } = usePortfolio();
  const isDesign = templateType === 'design';

  if (!skills || skills.length === 0) {
    return (
      <section className={isDesign ? 'text-center w-full' : ''}>
        <div className={`${isDesign ? 'flex flex-col items-center' : 'border-l-2 border-[#C8833A]/40 pl-3'} mb-4`}>
          <h3 className="text-[10px] font-semibold text-[#5A4E42] uppercase tracking-[0.15em]">Skills & Expertise</h3>
        </div>
        <div className={`flex flex-wrap gap-2 ${isDesign ? 'justify-center' : ''}`}>
          {[1,2,3].map(i => (
            <div key={i} className="bg-[#1A1410] animate-pulse rounded-full h-7 w-20"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={isDesign ? 'text-center w-full' : ''}>
      <div className={`${isDesign ? 'flex flex-col items-center' : 'border-l-2 border-[#C8833A]/40 pl-3'} mb-4`}>
        <h3 className="text-[10px] font-semibold text-[#5A4E42] uppercase tracking-[0.15em]">Skills & Expertise</h3>
        {isDesign && <div className="w-8 h-0.5 bg-[#C8833A]/40 mt-1"></div>}
      </div>
      <div className={`flex gap-2 ${skills.length > 6 ? 'overflow-x-auto pb-2' : 'flex-wrap'} ${isDesign ? 'justify-center' : ''}`}>
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs text-[#E8A857] bg-[#1A1410] border border-[#C8833A]/20 hover:border-[#C8833A]/60 transition-all duration-200 cursor-default"
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 8px rgba(200,131,58,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
