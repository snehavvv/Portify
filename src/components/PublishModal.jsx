import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function PublishModal({ isOpen, onClose, slug }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = `${window.location.origin}/p/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const particles = [
    { size: 6, left: '10%', delay: '0s' },
    { size: 4, left: '25%', delay: '0.3s' },
    { size: 8, left: '45%', delay: '0.1s' },
    { size: 5, left: '65%', delay: '0.5s' },
    { size: 7, left: '80%', delay: '0.2s' },
    { size: 4, left: '92%', delay: '0.4s' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#1A1410] border border-[#2E2418] rounded-3xl w-full max-w-md overflow-visible shadow-2xl animate-modal-in relative">
        
        {/* Copper Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: '-10px',
              background: i % 2 === 0 ? '#C8833A' : '#E8A857',
              animationDelay: p.delay,
              opacity: 0.7,
            }}
          ></div>
        ))}
        
        <div className="p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-[#5A4E42] hover:text-[#F5F0E8] transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#F5F0E8]">Your portfolio is live 🎉</h2>
            <p className="text-sm text-[#9A8878] mt-1">Share it with the world</p>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-semibold text-[#5A4E42] uppercase tracking-widest mb-2">
              Public URL
            </label>
            <div className="flex bg-[#0D0A07] border border-[#2E2418] rounded-xl overflow-hidden">
              <input 
                type="text" 
                readOnly 
                value={url} 
                className="flex-1 px-4 py-3 bg-transparent font-mono text-sm text-[#C8833A] outline-none"
              />
              <button 
                onClick={handleCopy}
                className="px-4 border-l border-[#2E2418] text-[#5A4E42] hover:text-[#C8833A] hover:bg-[#221C15] transition-all duration-200 flex items-center justify-center"
                title="Copy to clipboard"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && <p className="text-green-500 text-xs mt-2 text-center">Copied! ✓</p>}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-sm text-[#9A8878] border border-[#2E2418] hover:border-[#3D2E1E] hover:text-[#F5F0E8] transition-all duration-200"
            >
              Close
            </button>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ boxShadow: '0 4px 20px rgba(200,131,58,0.3)' }}
            >
              View Site <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
