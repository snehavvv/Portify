import { useState, useRef } from 'react';
import { ChevronDown, Upload, Sparkles, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { generateBio } from '../../utils/gemini';

export default function ProfileCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, setProfile } = usePortfolio();
  const fileInputRef = useRef(null);

  // AI Bio State
  const [isAiBioOpen, setIsAiBioOpen] = useState(false);
  const [aiBioPrompt, setAiBioPrompt] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [bioError, setBioError] = useState('');

  const handleGenerateBio = async () => {
    if (!aiBioPrompt.trim()) return;
    
    setIsGeneratingBio(true);
    setBioError('');
    
    try {
      const generatedBio = await generateBio(aiBioPrompt);
      setProfile(prev => ({ ...prev, bio: generatedBio }));
      setIsAiBioOpen(false);
      setAiBioPrompt('');
    } catch (err) {
      setBioError(err.message || 'Failed to generate bio.');
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Use FileReader to convert image to base64 string for persistence
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#5DB87A]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Profile</h2>
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
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Name</label>
            <input 
              type="text" 
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Role / Title</label>
            <input 
              type="text" 
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs text-[#5A4E42] font-medium">Short Bio</label>
              <button 
                onClick={() => setIsAiBioOpen(!isAiBioOpen)}
                className="text-xs flex items-center gap-1 text-[#C8833A] hover:text-[#E8A857] transition-colors"
              >
                <Sparkles size={12} />
                {isAiBioOpen ? 'Close AI' : 'AI Bio'}
              </button>
            </div>
            
            {isAiBioOpen && (
              <div className="mb-3 p-3 bg-[#221C15] border border-[#C8833A]/30 rounded-xl space-y-2">
                <p className="text-xs text-[#9A8878]">Describe your role/experience for the AI:</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={aiBioPrompt}
                    onChange={(e) => setAiBioPrompt(e.target.value)}
                    placeholder="e.g. Frontend dev with 3 years React..."
                    className="flex-1 px-3 py-2 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-lg focus:outline-none focus:border-[#C8833A]/60"
                  />
                  <button 
                    onClick={handleGenerateBio}
                    disabled={isGeneratingBio || !aiBioPrompt.trim()}
                    className="px-3 py-2 rounded-lg font-medium text-xs text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                  >
                    {isGeneratingBio ? <Loader2 size={14} className="animate-spin" /> : 'Generate'}
                  </button>
                </div>
                {bioError && <p className="text-xs text-red-400">{bioError}</p>}
              </div>
            )}

            <textarea 
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Profile Photo</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                name="photoUrl"
                value={profile.photoUrl}
                onChange={handleChange}
                placeholder="Paste an image URL..."
                className="flex-1 px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2.5 bg-[#221C15] border border-[#2E2418] rounded-xl text-[#C8833A] hover:bg-[#2E2418] hover:text-[#E8A857] transition-all duration-200"
                title="Upload Photo"
              >
                <Upload size={16} />
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
