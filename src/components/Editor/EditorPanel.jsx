import { useState } from 'react';
import AuthCard from './AuthCard';
import TemplateCard from './TemplateCard';
import ProfileCard from './ProfileCard';
import SkillsCard from './SkillsCard';
import ProjectsCard from './ProjectsCard';
import ContactCard from './ContactCard';
import AnalyticsCard from './AnalyticsCard';
import PublishModal from '../PublishModal';
import { usePortfolio } from '../../hooks/usePortfolio';
import { supabase } from '../../supabase';

export default function EditorPanel() {
  const [publishing, setPublishing] = useState(false);
  
  const { 
    user, 
    profile, 
    skills, 
    projects, 
    contact, 
    selectedTemplateId, 
    setPublishedPortfolioId,
    setIsPublishModalOpen,
    setLastPublishedSlug
  } = usePortfolio();

  const generateSlug = (name) => {
    const base = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') : 'portfolio';
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${base}-${random}`;
  };

  const handlePublish = async () => {
    if (!user) {
      alert("Please log in first to publish your portfolio.");
      return;
    }

    setPublishing(true);
    try {
      const slug = generateSlug(profile.name);
      
      const portfolioData = {
        profile,
        skills,
        projects,
        contact
      };

      const { data, error } = await supabase
        .from('portfolios')
        .upsert({ 
          user_id: user.id, 
          template_id: selectedTemplateId,
          slug: slug, 
          data: portfolioData,
          is_published: true
        })
        .select()
        .single();

      if (error) throw error;

      if (data?.id) {
        setPublishedPortfolioId(data.id);
      }

      setLastPublishedSlug(slug);
      setIsPublishModalOpen(true);
    } catch (err) {
      console.error('Error publishing:', err);
      alert('Failed to publish. ' + err.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#2E2418] flex items-center gap-3 bg-[#0D0A07] sticky top-0 z-20">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(200,131,58,0.15)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="8" height="18" rx="2" fill="url(#copper)" />
                <rect x="11" y="1" width="8" height="18" rx="2" stroke="#C8833A" strokeWidth="1.5" fill="none" />
                <defs>
                  <linearGradient id="copper" x1="1" y1="1" x2="9" y2="19">
                    <stop stopColor="#C8833A" />
                    <stop offset="1" stopColor="#E8A857" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#F5F0E8] tracking-tight leading-none">Portify</h1>
            <p className="text-[10px] text-[#5A4E42] uppercase tracking-widest mt-0.5">Portfolio Builder</p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <AuthCard />
          <TemplateCard />
          <ProfileCard />
          <SkillsCard />
          <ProjectsCard />
          <ContactCard />
          <AnalyticsCard />
        </div>

        {/* Publish Button */}
        <div className="p-4 border-t border-[#2E2418]">
          <button 
            onClick={handlePublish}
            disabled={publishing}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 hover:scale-[1.01] transform transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ boxShadow: '0 4px 20px rgba(200,131,58,0.3)' }}
          >
            {publishing ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0D0A07] border-t-transparent rounded-full animate-spin"></span>
                Publishing...
              </>
            ) : 'Publish Portfolio'}
          </button>
        </div>
      </div>
  );
}
