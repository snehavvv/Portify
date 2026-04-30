import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';

export default function SplitLayout({ editor, preview }) {
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'preview'

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0D0A07] relative pb-16 lg:pb-0">
      {/* Editor Panel */}
      <div className={`w-full lg:w-[45%] h-screen sticky top-0 overflow-y-auto border-r border-[#2E2418] bg-[#0D0A07] ${activeTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
        {editor}
      </div>

      {/* Preview Panel */}
      <div className={`w-full lg:w-[55%] min-h-screen overflow-y-auto bg-[#0F0C09] ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
        {preview}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1A1410] border-t border-[#2E2418] flex items-center justify-around p-2 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-200 ${activeTab === 'editor' ? 'text-[#C8833A] bg-[#221C15]' : 'text-[#5A4E42] hover:text-[#9A8878]'}`}
        >
          <Edit3 size={20} className="mb-1" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Editor</span>
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-200 ${activeTab === 'preview' ? 'text-[#C8833A] bg-[#221C15]' : 'text-[#5A4E42] hover:text-[#9A8878]'}`}
        >
          <Eye size={20} className="mb-1" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Preview</span>
        </button>
      </div>
    </div>
  );
}
