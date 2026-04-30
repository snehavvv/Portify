import { useState } from 'react';
import { ChevronDown, X, Sparkles, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { generateSkills } from '../../utils/gemini';

export default function SkillsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { skills, setSkills } = usePortfolio();

  // AI Skills State
  const [isAiSkillsOpen, setIsAiSkillsOpen] = useState(false);
  const [aiSkillsPrompt, setAiSkillsPrompt] = useState('');
  const [isGeneratingSkills, setIsGeneratingSkills] = useState(false);
  const [skillsError, setSkillsError] = useState('');

  const handleGenerateSkills = async () => {
    if (!aiSkillsPrompt.trim()) return;
    
    setIsGeneratingSkills(true);
    setSkillsError('');
    
    try {
      const generatedSkills = await generateSkills(aiSkillsPrompt);
      
      // Merge unique skills
      const newSkillsList = [...skills];
      generatedSkills.forEach(skill => {
        if (!newSkillsList.some(s => s.toLowerCase() === skill.toLowerCase())) {
          newSkillsList.push(skill);
        }
      });
      
      setSkills(newSkillsList);
      setIsAiSkillsOpen(false);
      setAiSkillsPrompt('');
    } catch (err) {
      setSkillsError(err.message || 'Failed to generate skills.');
    } finally {
      setIsGeneratingSkills(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (inputValue.trim() && !skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E8A857]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Skills</h2>
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
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#5A4E42] font-medium">Add skills manually or let AI suggest them</span>
            <button 
              onClick={() => setIsAiSkillsOpen(!isAiSkillsOpen)}
              className="text-xs flex items-center gap-1 text-[#C8833A] hover:text-[#E8A857] transition-colors"
            >
              <Sparkles size={12} />
              {isAiSkillsOpen ? 'Close AI' : 'AI Suggest'}
            </button>
          </div>

          {isAiSkillsOpen && (
            <div className="mb-3 p-3 bg-[#221C15] border border-[#C8833A]/30 rounded-xl space-y-2">
              <p className="text-xs text-[#9A8878]">Enter your role to get skill suggestions:</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={aiSkillsPrompt}
                  onChange={(e) => setAiSkillsPrompt(e.target.value)}
                  placeholder="e.g. Backend Node.js Developer..."
                  className="flex-1 px-3 py-2 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-lg focus:outline-none focus:border-[#C8833A]/60"
                />
                <button 
                  onClick={handleGenerateSkills}
                  disabled={isGeneratingSkills || !aiSkillsPrompt.trim()}
                  className="px-3 py-2 rounded-lg font-medium text-xs text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                >
                  {isGeneratingSkills ? <Loader2 size={14} className="animate-spin" /> : 'Suggest'}
                </button>
              </div>
              {skillsError && <p className="text-xs text-red-400">{skillsError}</p>}
            </div>
          )}

          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Add a skill (e.g. React)"
              className="flex-1 px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
            />
            <button 
              onClick={handleAddSkill}
              className="px-4 py-2.5 rounded-xl font-medium text-xs text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 transition-all duration-200"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                onClick={() => handleRemoveSkill(skill)}
                className="flex items-center gap-1 bg-[#221C15] border border-[#2E2418] text-[#E8A857] px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-[#2E1810] hover:border-red-900/40 hover:text-red-400 transition-all duration-200 group"
                title="Click to remove"
              >
                <span>{skill}</span>
                <X size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-xs text-[#5A4E42] italic">No skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
