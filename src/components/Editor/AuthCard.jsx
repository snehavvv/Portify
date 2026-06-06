import { useState } from 'react';
import { ChevronDown, KeyRound, LogOut } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { supabase } from '../../supabase';

export default function AuthCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = usePortfolio();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!error) setIsLoginMode(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    // Reset form fields so a fresh login form appears
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#4A9EFF]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">
            {user ? 'Account' : 'Sign In / Register'}
          </h2>
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
          {user ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8833A] to-[#E8A857] flex items-center justify-center text-[#0D0A07] text-lg font-bold mb-3">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <p className="text-[#F5F0E8] font-medium text-sm">Logged in as</p>
              <p className="text-[#5A4E42] text-xs mt-0.5 mb-4">{user.email}</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-[#2E2418] rounded-xl text-[#9A8878] hover:text-[#F5F0E8] hover:border-[#3D2E1E] transition-all duration-200 text-xs"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="flex flex-col gap-3">
              {error && (
                <div className={`p-3 border rounded-xl text-xs ${error.includes('Email not confirmed') ? 'bg-amber-500/10 border-amber-900/30 text-amber-400' : 'bg-red-500/10 border-red-900/30 text-red-400'}`}>
                  {error.includes('Email not confirmed') ? (
                    <div className="space-y-1">
                      <p className="font-bold">Email not confirmed!</p>
                      <p>Check your inbox for a verification link or disable "Confirm Email" in your Supabase Dashboard settings.</p>
                    </div>
                  ) : error}
                </div>
              )}
              
              <div>
                <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5A4E42] font-medium mb-1.5">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-[#0D0A07] text-sm text-[#F5F0E8] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-2.5 rounded-xl font-semibold text-sm text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? 'Processing...' : isLoginMode ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center text-xs text-[#5A4E42]">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                  className="text-[#C8833A] hover:text-[#E8A857] transition-colors"
                >
                  {isLoginMode ? "Sign Up" : "Log In"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
