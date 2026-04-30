import { usePortfolio } from '../../hooks/usePortfolio';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function ContactSection() {
  const { contact, templateType } = usePortfolio();
  const isDesign = templateType === 'design';

  const hasContactInfo = contact.email || contact.github || contact.linkedin;

  if (!hasContactInfo) return null;

  return (
    <section className={`pt-8 border-t border-[#2E2418] w-full ${isDesign ? 'flex flex-col items-center text-center' : ''}`}>
      <div className={`${isDesign ? 'flex flex-col items-center' : 'border-l-2 border-[#C8833A]/40 pl-3'} mb-4`}>
        <h3 className="text-[10px] font-semibold text-[#5A4E42] uppercase tracking-[0.15em]">Connect</h3>
        {isDesign && <div className="w-8 h-0.5 bg-[#C8833A]/40 mt-1"></div>}
      </div>
      <div className={`flex gap-3 ${isDesign ? 'justify-center' : ''}`}>
        {contact.email && (
          <a 
            href={`mailto:${contact.email}`}
            className="w-10 h-10 rounded-xl border border-[#2E2418] flex items-center justify-center text-[#C8833A] hover:bg-[#1A1410] hover:border-[#3D2E1E] hover:text-[#E8A857] transition-all duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        )}
        {contact.github && (
          <a 
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-[#2E2418] flex items-center justify-center text-[#C8833A] hover:bg-[#1A1410] hover:border-[#3D2E1E] hover:text-[#E8A857] transition-all duration-200"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
        )}
        {contact.linkedin && (
          <a 
            href={`https://linkedin.com/in/${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-[#2E2418] flex items-center justify-center text-[#C8833A] hover:bg-[#1A1410] hover:border-[#3D2E1E] hover:text-[#E8A857] transition-all duration-200"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        )}
      </div>
      <div className={`flex flex-col gap-1 mt-3 ${isDesign ? 'items-center' : ''}`}>
        {contact.email && <span className="text-xs text-[#9A8878] hover:text-[#F5F0E8] transition-colors cursor-default">{contact.email}</span>}
        {contact.github && <span className="text-xs text-[#9A8878] hover:text-[#F5F0E8] transition-colors cursor-default">github.com/{contact.github}</span>}
        {contact.linkedin && <span className="text-xs text-[#9A8878] hover:text-[#F5F0E8] transition-colors cursor-default">linkedin.com/in/{contact.linkedin}</span>}
      </div>
    </section>
  );
}
