import { usePortfolio } from '../../hooks/usePortfolio';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsSection() {
  const { projects, templateType } = usePortfolio();
  const isDesign = templateType === 'design';

  if (!projects || projects.length === 0) {
    return (
      <section>
        <div className="border-l-2 border-[#C8833A]/40 pl-3 mb-4">
          <h3 className="text-[10px] font-semibold text-[#5A4E42] uppercase tracking-[0.15em]">Selected Work</h3>
        </div>
        <div className={`grid gap-4 ${isDesign ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {[1,2].map(i => (
            <div key={i} className="bg-[#1A1410] animate-pulse rounded-2xl h-24"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={`${isDesign ? 'flex flex-col items-center' : 'border-l-2 border-[#C8833A]/40 pl-3'} mb-4`}>
        <h3 className="text-[10px] font-semibold text-[#5A4E42] uppercase tracking-[0.15em]">Selected Work</h3>
        {isDesign && <div className="w-8 h-0.5 bg-[#C8833A]/40 mt-1"></div>}
      </div>
      <div className={`grid gap-4 ${isDesign ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {projects.map((project) => (
          <a 
            key={project.id}
            href={project.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block bg-[#1A1410] border border-[#2E2418] rounded-2xl hover:border-[#C8833A]/30 hover:-translate-y-[2px] transition-all duration-200 relative ${isDesign ? 'p-6' : 'p-4'}`}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            <div className="absolute top-4 right-4 text-[#C8833A] opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowUpRight size={16} />
            </div>
            <h4 className={`${isDesign ? 'text-lg' : 'text-sm'} font-bold text-[#F5F0E8] pr-6`}>{project.title}</h4>
            <p className={`${isDesign ? 'text-sm' : 'text-xs'} text-[#9A8878] mt-1 line-clamp-2 leading-relaxed`}>{project.description}</p>
            
            {project.tech && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tech.split(',').map((t, i) => (
                  <span key={i} className="bg-[#0D0A07] text-[#5A4E42] text-[10px] px-2 py-0.5 rounded-full border border-[#2E2418]">{t.trim()}</span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
