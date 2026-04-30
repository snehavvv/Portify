import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function ContactCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { contact, setContact } = usePortfolio();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C87AB8]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Contact & Links</h2>
        </div>
        <ChevronDown size={16} className={`text-[#5A4E42] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className="overflow-hidden transition-all duration-[350ms]"
        style={{ 
          maxHeight: isOpen ? '1000px' : '0',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="px-4 pb-4 flex flex-col gap-3">
          <div>
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Email</label>
            <input 
              type="email" 
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="hello@example.com"
              className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">GitHub Username</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#2E2418] bg-[#221C15] text-[#5A4E42] text-xs">
                github.com/
              </span>
              <input 
                type="text" 
                name="github"
                value={contact.github}
                onChange={handleChange}
                className="flex-1 px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] border border-[#2E2418] rounded-r-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">LinkedIn Username</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#2E2418] bg-[#221C15] text-[#5A4E42] text-xs">
                linkedin.com/in/
              </span>
              <input 
                type="text" 
                name="linkedin"
                value={contact.linkedin}
                onChange={handleChange}
                className="flex-1 px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] border border-[#2E2418] rounded-r-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
