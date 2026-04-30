import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { supabase } from '../../supabase';

export default function AnalyticsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [weeklyViews, setWeeklyViews] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const { user, publishedPortfolioId } = usePortfolio();

  useEffect(() => {
    if (!isOpen || !user || !publishedPortfolioId) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('analytics')
          .select('*')
          .eq('portfolio_id', publishedPortfolioId);

        if (error) throw error;

        const views = data || [];
        setTotalViews(views.length);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentViews = views.filter(v => new Date(v.viewed_at) >= sevenDaysAgo);
        setWeeklyViews(recentViews.length);

        const days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
          const count = views.filter(v => v.viewed_at && v.viewed_at.startsWith(dateStr)).length;
          days.push({ label: dayLabel, count });
        }
        setDailyData(days);
      } catch (err) {
        console.warn('Analytics fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [isOpen, user, publishedPortfolioId]);

  if (!user) return null;

  const maxCount = Math.max(...dailyData.map(d => d.count), 1);

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#7AB8C8]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Analytics</h2>
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
          
          {!publishedPortfolioId ? (
            <div className="text-[#5A4E42] text-xs py-4 text-center italic">
              Publish your portfolio first to see analytics.
            </div>
          ) : loading ? (
            <div className="text-[#5A4E42] text-xs animate-pulse py-4 text-center">Loading analytics...</div>
          ) : (
            <div className="space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0D0A07] rounded-xl p-4 text-center border border-[#2E2418]">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#C8833A] to-[#E8A857] bg-clip-text text-transparent">{totalViews}</div>
                  <div className="text-[10px] text-[#5A4E42] mt-1 uppercase tracking-wider">Total Views</div>
                </div>
                <div className="bg-[#0D0A07] rounded-xl p-4 text-center border border-[#2E2418]">
                  <div className="text-4xl font-bold text-[#F5F0E8]">{weeklyViews}</div>
                  <div className="text-[10px] text-[#5A4E42] mt-1 uppercase tracking-wider">Last 7 Days</div>
                </div>
              </div>

              {/* Daily Bar Chart */}
              <div>
                <div className="text-[10px] text-[#5A4E42] uppercase tracking-wider mb-3">Daily Views</div>
                <div className="flex items-end gap-1.5 h-20">
                  {dailyData.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-6 bg-[#221C15] border border-[#2E2418] text-[#E8A857] text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {day.count}
                      </div>
                      <div 
                        className="w-full rounded-t-sm animate-bar group-hover:opacity-80 transition-opacity"
                        style={{ 
                          height: `${Math.max((day.count / maxCount) * 100, 8)}%`,
                          background: day.count > 0 ? 'linear-gradient(to top, #C8833A, #E8A857)' : '#221C15',
                          animationDelay: `${i * 0.05}s`,
                          animationFillMode: 'both'
                        }}
                      ></div>
                      <span className="text-[9px] text-[#5A4E42]">{day.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
