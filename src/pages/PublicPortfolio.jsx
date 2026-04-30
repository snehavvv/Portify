import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { PortfolioProvider } from '../context/PortfolioContext';
import HeroSection from '../components/Preview/HeroSection';
import SkillsSection from '../components/Preview/SkillsSection';
import ProjectsSection from '../components/Preview/ProjectsSection';
import ContactSection from '../components/Preview/ContactSection';

export default function PublicPortfolio({ slug }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data: portfolio, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        setData(portfolio.data);

        // Log analytics view
        try {
          await supabase.from('analytics').insert({
            portfolio_id: portfolio.id,
            viewed_at: new Date().toISOString(),
            user_agent: navigator.userAgent
          });
        } catch (analyticsErr) {
          console.warn('Analytics logging failed:', analyticsErr.message);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0A07] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#C8833A] animate-pulse"></span>
          <span className="text-[#9A8878] font-medium text-sm">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0D0A07] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[#F5F0E8] mb-2">Portfolio not found</h1>
          <p className="text-[#5A4E42] text-sm">The link you followed may be broken or the portfolio doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <PortfolioProvider initialData={data}>
      <div className="min-h-screen bg-[#0D0A07] py-12 lg:py-20">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-0 px-6 lg:px-8">
          <HeroSection />
          <div className="flex flex-col gap-10 mt-10 pb-16">
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}
