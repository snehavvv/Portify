import { createContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';

export const PortfolioContext = createContext(null);

// Default empty states
const DEFAULT_PROFILE = { name: '', role: '', bio: '', photoUrl: '' };
const DEFAULT_SKILLS = [];
const DEFAULT_PROJECTS = [];
const DEFAULT_CONTACT = { email: '', github: '', linkedin: '' };

export const PortfolioProvider = ({ children, initialData = null }) => {
  const [user, setUser] = useState(null);
  const prevUserIdRef = useRef(null);
  
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

  const [profile, setProfile] = useState(() => getInitialState('profile', DEFAULT_PROFILE));
  const [skills, setSkills] = useState(() => getInitialState('skills', DEFAULT_SKILLS));
  const [projects, setProjects] = useState(() => getInitialState('projects', DEFAULT_PROJECTS));
  const [contact, setContact] = useState(() => getInitialState('contact', DEFAULT_CONTACT));
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => getInitialState('templateId', null));
  const [publishedPortfolioId, setPublishedPortfolioId] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [lastPublishedSlug, setLastPublishedSlug] = useState('');

  // Helper: clear all portfolio data from state and localStorage
  const clearPortfolioData = () => {
    setProfile({ ...DEFAULT_PROFILE });
    setSkills([...DEFAULT_SKILLS]);
    setProjects([...DEFAULT_PROJECTS]);
    setContact({ ...DEFAULT_CONTACT });
    setSelectedTemplateId(null);
    setPublishedPortfolioId(null);
    setLastPublishedSlug('');

    localStorage.removeItem('portiffy_profile');
    localStorage.removeItem('portiffy_skills');
    localStorage.removeItem('portiffy_projects');
    localStorage.removeItem('portiffy_contact');
    localStorage.removeItem('portiffy_templateId');
  };

  // Save to localStorage whenever data changes (only when logged in and not viewing a published portfolio)
  useEffect(() => {
    if (!initialData && user) {
      localStorage.setItem('portiffy_profile', JSON.stringify(profile));
      localStorage.setItem('portiffy_skills', JSON.stringify(skills));
      localStorage.setItem('portiffy_projects', JSON.stringify(projects));
      localStorage.setItem('portiffy_contact', JSON.stringify(contact));
      if (selectedTemplateId) {
        localStorage.setItem('portiffy_templateId', JSON.stringify(selectedTemplateId));
      }
    }
  }, [profile, skills, projects, contact, selectedTemplateId, initialData, user]);

  // 1. Auth Listener — clear data on sign-out, reset on user change
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      prevUserIdRef.current = sessionUser?.id ?? null;
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newUser = session?.user ?? null;

      if (event === 'SIGNED_OUT') {
        // User signed out — wipe all stale data
        clearPortfolioData();
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // If a *different* user signed in, reset to defaults first
        if (newUser && newUser.id !== prevUserIdRef.current) {
          clearPortfolioData();
        }
      }

      setUser(newUser);
      prevUserIdRef.current = newUser?.id ?? null;
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
