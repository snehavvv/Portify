import { useState } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function ProjectsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { projects, setProjects } = usePortfolio();
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    link: ''
  });

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: '', description: '', tech: '', link: '' });
      setIsAdding(false);
    }
  };

  const handleRemoveProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="bg-[#1A1410] rounded-2xl border border-[#2E2418] hover:border-[#3D2E1E] transition-all duration-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E8724A]"></span>
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Projects</h2>
        </div>
        <ChevronDown size={16} className={`text-[#5A4E42] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className="overflow-hidden transition-all duration-[350ms]"
        style={{ 
          maxHeight: isOpen ? '2000px' : '0',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="px-4 pb-4">
          
          {/* List of existing projects */}
          <div className="space-y-2 mb-3">
            {projects.map(project => (
              <div key={project.id} className="p-3 bg-[#0D0A07] border border-[#2E2418] rounded-xl relative group">
                <button 
                  onClick={() => handleRemoveProject(project.id)}
                  className="absolute top-3 right-3 text-[#5A4E42] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 size={14} />
                </button>
                <h3 className="font-medium text-sm text-[#F5F0E8] pr-6">{project.title}</h3>
                <p className="text-xs text-[#9A8878] mt-1 line-clamp-2">{project.description}</p>
                <div className="text-[10px] text-[#C8833A] mt-2 tracking-wide font-medium uppercase">{project.tech}</div>
              </div>
            ))}
          </div>

          {/* Add project form or button */}
          {!isAdding ? (
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 border border-dashed border-[#2E2418] bg-[#0D0A07] hover:border-[#3D2E1E] rounded-xl text-[#5A4E42] hover:text-[#9A8878] transition-all duration-200 text-xs font-medium"
            >
              + Add Project
            </button>
          ) : (
            <div className="p-3 border border-[#2E2418] rounded-xl bg-[#0D0A07] space-y-2.5">
              <input 
                type="text" 
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="w-full px-3 py-2.5 text-sm bg-[#1A1410] text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
              <textarea 
                placeholder="Description"
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="w-full px-3 py-2.5 text-sm bg-[#1A1410] text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150 resize-none"
              />
              <input 
                type="text" 
                placeholder="Technologies (e.g. React, Node.js)"
                value={newProject.tech}
                onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                className="w-full px-3 py-2.5 text-sm bg-[#1A1410] text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
              <input 
                type="text" 
                placeholder="Project Link (URL)"
                value={newProject.link}
                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                className="w-full px-3 py-2.5 text-sm bg-[#1A1410] text-[#F5F0E8] placeholder-[#5A4E42] border border-[#2E2418] rounded-xl focus:outline-none focus:border-[#C8833A]/60 focus:ring-1 focus:ring-[#C8833A]/20 transition-all duration-150"
              />
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={handleAddProject}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#0D0A07] bg-gradient-to-r from-[#C8833A] to-[#E8A857] hover:brightness-110 transition-all duration-200"
                >
                  Save Project
                </button>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 border border-[#2E2418] text-[#9A8878] rounded-xl text-xs hover:border-[#3D2E1E] hover:text-[#F5F0E8] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
