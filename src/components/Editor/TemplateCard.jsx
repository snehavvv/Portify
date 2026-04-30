import { CheckCircle2, FileText } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function TemplateCard() {
  const { templates, selectedTemplateId, setSelectedTemplateId } = usePortfolio();

  if (!templates || templates.length === 0) {
    return (
      <div className="bg-[#1A1410] border border-[#2E2418] rounded-2xl p-5 mb-4">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-20 bg-[#221C15] rounded-xl"></div>
          <div className="h-20 bg-[#221C15] rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1410] border border-[#2E2418] rounded-2xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8833A]"></span>
        <h3 className="text-sm font-bold text-[#F5F0E8] uppercase tracking-wider">Template</h3>
      </div>

      <div className="flex flex-col gap-3">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden ${
                isSelected 
                ? 'bg-[#221C15] border-[#C8833A] shadow-[0_0_20px_rgba(200,131,58,0.1)]' 
                : 'bg-[#14100D] border-[#2E2418] hover:border-[#3D2E1E] hover:bg-[#1A1410]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-[#C8833A] animate-modal-in">
                  <CheckCircle2 size={18} />
                </div>
              )}
              
              <div className={`p-2.5 rounded-lg border transition-colors ${isSelected ? 'bg-[#0D0A07] border-[#C8833A]/30 text-[#C8833A]' : 'bg-[#1A1410] border-[#2E2418] text-[#5A4E42] group-hover:text-[#9A8878]'}`}>
                <FileText size={20} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-sm text-[#F5F0E8]">{template.name}</h4>
                <p className="text-[11px] text-[#5A4E42] group-hover:text-[#9A8878] mt-0.5 leading-tight">
                  {template.description || 'Professional portfolio layout'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
