import { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children, initialData = null }) => {
  const [user, setUser] = useState(null);
  
  // Load initial state from localStorage or props
  const getInitialState = (key, fallback) => {
    if (initialData && initialData[key]) return initialData[key];
    try {
      const saved = localStorage.getItem(`portiffy_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [profile, setProfile] = useState(() => getInitialState('profile', { name: '', role: '', bio: '', photoUrl: '' }));
  const [skills, setSkills] = useState(() => getInitialState('skills', []));
  const [projects, setProjects] = useState(() => getInitialState('projects', []));
  const [contact, setContact] = useState(() => getInitialState('contact', { email: '', github: '', linkedin: '' }));
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => getInitialState('templateId', null));
  const [publishedPortfolioId, setPublishedPortfolioId] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [lastPublishedSlug, setLastPublishedSlug] = useState('');

  // Save to localStorage whenever data changes (only if we're not viewing a published public portfolio)
  useEffect(() => {
    if (!initialData) {
      localStorage.setItem('portiffy_profile', JSON.stringify(profile));
      localStorage.setItem('portiffy_skills', JSON.stringify(skills));
      localStorage.setItem('portiffy_projects', JSON.stringify(projects));
      localStorage.setItem('portiffy_contact', JSON.stringify(contact));
      if (selectedTemplateId) {
        localStorage.setItem('portiffy_templateId', JSON.stringify(selectedTemplateId));
      }
    }
  }, [profile, skills, projects, contact, selectedTemplateId, initialData]);

  // 1. Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch User Portfolio Data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || initialData) return; // Don't fetch if viewing published or not logged in

      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data && data.data) {
          const p = data.data;
          // Only overwrite local state if it's empty, or you could prompt the user. 
          // For now, we'll just set it to the fetched data if it exists.
          if (p.profile) setProfile(p.profile);
          if (p.skills) setSkills(p.skills);
          if (p.projects) setProjects(p.projects);
          if (p.contact) setContact(p.contact);
          if (data.template_id) setSelectedTemplateId(data.template_id);
          setPublishedPortfolioId(data.id);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      }
    };

    fetchUserData();
  }, [user, initialData]);

  // 3. Fetch Available Templates
  useEffect(() => {
    const fetchTemplates = async () => {
      const FALLBACK = [
        { id: 'dev', name: 'Developer' },
        { id: 'design', name: 'Designer' },
        { id: 'student', name: 'Student' },
      ];
      
      try {
        const { data, error } = await supabase.from('templates').select('*');
        if (data && data.length > 0) {
          setTemplates(data);
          if (!selectedTemplateId) setSelectedTemplateId(data[0].id);
        } else {
          setTemplates(FALLBACK);
          if (!selectedTemplateId) setSelectedTemplateId(FALLBACK[0].id);
        }
      } catch (e) {
        setTemplates(FALLBACK);
        if (!selectedTemplateId) setSelectedTemplateId(FALLBACK[0].id);
      }
    };
    fetchTemplates();
  }, []);

  // Robustly identify the current template type
  const activeTemplate = templates.find(t => t.id === selectedTemplateId);
  const templateType = activeTemplate?.name?.toLowerCase().includes('design') ? 'design' : 
                       activeTemplate?.name?.toLowerCase().includes('student') ? 'student' : 'dev';

  return (
    <PortfolioContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        skills,
        setSkills,
        projects,
        setProjects,
        contact,
        setContact,
        templates,
        selectedTemplateId,
        setSelectedTemplateId,
        templateType,
        publishedPortfolioId,
        setPublishedPortfolioId,
        isPublishModalOpen,
        setIsPublishModalOpen,
        lastPublishedSlug,
        setLastPublishedSlug,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
