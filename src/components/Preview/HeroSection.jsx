import { usePortfolio } from '../../hooks/usePortfolio';

export default function HeroSection() {
  const { profile, templateType } = usePortfolio();

  const getInitial = () => {
    if (profile.name && profile.name.trim()) return profile.name.trim().charAt(0).toUpperCase();
    return '?';
  };

  const isDesign = templateType === 'design';
  const isStudent = templateType === 'student';

  return (
    <section 
      className={`w-full px-8 pt-10 pb-8 border-b border-[#2E2418] mb-8 ${isDesign ? 'flex flex-col items-center text-center' : 'text-left'}`}
      style={{ background: isDesign 
        ? 'radial-gradient(circle at center, rgba(200,131,58,0.12) 0%, transparent 70%)' 
        : 'radial-gradient(ellipse at top left, rgba(200,131,58,0.12) 0%, transparent 55%)' 
      }}
    >
      {/* Photo or Initials Avatar */}
      <div className={isDesign ? 'mb-6' : 'mb-4'}>
        {profile.photoUrl ? (
          <div 
            className={`rounded-full overflow-hidden border-2 border-[#C8833A] ${isDesign ? 'w-24 h-24' : 'w-[72px] h-[72px]'}`}
            style={{ boxShadow: '0 0 16px rgba(200,131,58,0.3)' }}
          >
            <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name || 'User') + '&background=1A1410&color=F5F0E8';
              }}
            />
          </div>
        ) : (
          <div 
            className={`rounded-full bg-gradient-to-br from-[#C8833A] to-[#E8A857] flex items-center justify-center font-bold text-[#0D0A07] ${isDesign ? 'w-24 h-24 text-2xl' : 'w-[72px] h-[72px] text-xl'}`}
            style={{ boxShadow: '0 0 16px rgba(200,131,58,0.3)' }}
          >
            {getInitial()}
          </div>
        )}
      </div>

      {/* Name */}
      <h1 className={`${isDesign ? 'text-5xl' : 'text-4xl'} font-bold tracking-tight leading-tight`}>
        {profile.name ? (
          <span className="text-[#F5F0E8]">{profile.name}</span>
        ) : (
          <span className="text-[#2E2418] italic">Your Name</span>
        )}
      </h1>

      {/* Role */}
      <div className="mt-2">
        {profile.role ? (
          <span className={`${isDesign ? 'text-xl' : 'text-base'} font-medium bg-gradient-to-r from-[#C8833A] to-[#E8A857] bg-clip-text text-transparent`}>
            {profile.role}
          </span>
        ) : (
          <span className="text-base text-[#2E2418] italic">Your Role</span>
        )}
      </div>

      {/* Bio */}
      <div className={`mt-3 ${isDesign ? 'max-w-xl' : 'max-w-lg'}`}>
        {profile.bio ? (
          <p className="text-sm text-[#9A8878] leading-relaxed">{profile.bio}</p>
        ) : (
          <div className="space-y-2">
            <div className="bg-[#1A1410] animate-pulse rounded h-3 w-full"></div>
            <div className="bg-[#1A1410] animate-pulse rounded h-3 w-full"></div>
            <div className="bg-[#1A1410] animate-pulse rounded h-3 w-2/3"></div>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-4 inline-flex items-center gap-1.5 bg-[#1A1410] border border-[#2E2418] rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-xs text-[#9A8878]">
          {isStudent ? 'Open to Internships' : 'Open to opportunities'}
        </span>
      </div>
    </section>
  );
}
