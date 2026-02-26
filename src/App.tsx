/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  ChevronRight,
  Code,
  GraduationCap,
  User,
  Briefcase,
  Heart,
  Menu,
  X,
  Check,
  Quote,
  Calendar,
  ArrowRight,
  Layers,
  Zap,
  Target,
  Search,
  Filter,
  School,
  Sun,
  Moon
} from 'lucide-react';
import { ProfileData, Project, Skill } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectImage, setActiveProjectImage] = useState<string | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 60,
    mass: 0.5,
    restDelta: 0.001
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (selectedProject) {
      setActiveProjectImage(selectedProject.thumbnail);
    } else {
      setActiveProjectImage(null);
    }
  }, [selectedProject]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'education', 'projects', 'testimonials', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Initial check
    const currentSection = sections.find(id => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      }
      return false;
    });
    if (currentSection) setActiveSection(currentSection);

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    fetch('/profile.json')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 rounded-full border-2 border-maroon-500 border-t-transparent animate-spin"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">
        <p>Failed to load profile data. Please check profile.json.</p>
      </div>
    );
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const filteredProjects = profile.projects.filter(p => 
    projectFilter === 'All' || p.category === projectFilter
  );

  const skillCategories = Array.from(new Set(profile.skills.map(s => s.category)));

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const trackResumeClick = () => {
    console.log('Resume Downloaded:', new Date().toISOString());
    // In a real app, you'd send this to an analytics provider
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border-color)]">
        {/* Page Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-maroon-500 origin-left z-[60]"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold text-gradient"
          >
            Sami<span className="text-stone-200">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  activeSection === link.href.substring(1) ? 'text-maroon-500' : 'text-[var(--text-secondary)] hover:text-maroon-500'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-maroon-500 rounded-full shadow-[0_2px_8px_rgba(216,93,93,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--border-color)] text-[var(--text-primary)] hover:bg-maroon-500/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <motion.a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackResumeClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -2, boxShadow: '0 10px 20px -10px rgba(216, 93, 93, 0.3)' }}
              className="px-5 py-2 rounded-full bg-maroon-900/40 border border-maroon-500/30 text-maroon-300 text-sm font-medium hover:bg-maroon-800/60 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--border-color)] text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="text-[var(--text-primary)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      activeSection === link.href.substring(1) ? 'text-maroon-500' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackResumeClick}
                  className="w-full py-3 rounded-xl bg-maroon-900/40 border border-maroon-500/30 text-maroon-300 text-center font-medium"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maroon-900/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-maroon-950/30 rounded-full blur-[120px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <motion.a
              href="#contact"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(216, 93, 93, 0.5)', boxShadow: '0 0 20px rgba(216, 93, 93, 0.1)' }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-maroon-950/50 border border-maroon-800/30 text-maroon-400 text-xs font-semibold uppercase tracking-[0.15em] mt-12 mb-8 transition-all cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon-500"></span>
              </span>
              Available for Internships & Freelance
            </motion.a>

            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              Crafting <span className="text-gradient">Digital</span> <br />
              Experiences.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Hi. This is Sami. An AI-driven Software Engineer building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-maroon-700 hover:bg-maroon-600 text-white font-semibold transition-all shadow-lg shadow-maroon-900/20 flex items-center justify-center gap-2"
              >
                View Projects
                <ChevronRight size={20} />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-maroon-500/5 text-[var(--text-primary)] font-semibold transition-all flex items-center justify-center gap-2"
              >
                Get in Touch
              </a>
              <button 
                onClick={() => setIsResumeModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-[var(--border-color)] hover:border-maroon-500/30 text-[var(--text-secondary)] hover:text-maroon-500 font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Briefcase size={18} />
                View CV
              </button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-[var(--border-color)] relative group">
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-maroon-950/10 mix-blend-overlay dark:bg-maroon-950/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-maroon-700 rounded-2xl -z-10 hidden md:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px bg-maroon-500" />
                <span className="text-maroon-500 font-semibold uppercase tracking-wider text-sm">About Me</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">A brief story about my journey.</h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                {profile.bio}
              </p>

              <div className="mb-8">
                <h4 className="text-[var(--text-primary)] font-semibold mb-4 flex items-center gap-2">
                  <Target size={18} className="text-maroon-500" />
                  What I Do Best
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.whatIDoBest.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                      <Check size={14} className="text-maroon-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <Zap className="text-maroon-500 mb-4" size={24} />
                  <h4 className="font-semibold mb-1">Current Focus</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{profile.highlights.currentFocus}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <Layers className="text-maroon-500 mb-4" size={24} />
                  <h4 className="font-semibold mb-1">Learning Mindset</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{profile.highlights.learningMindset}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education, Skills & Interests Section */}
        <section id="education" className="py-24 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left Column: Education Timeline */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-maroon-500" />
                    <span className="text-maroon-500 font-semibold uppercase tracking-wider text-sm">Journey</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-12 text-[var(--text-primary)] flex items-center gap-3">
                    <GraduationCap className="text-maroon-500" size={32} />
                    Educational Background
                  </h2>
                  
                  <div className="space-y-12">
                    {profile.education.map((edu, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8 border-l border-maroon-900/30 pb-2 last:pb-0"
                      >
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-maroon-600 border-4 border-[var(--bg-secondary)]" />
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                          <span className="text-maroon-500 font-mono text-sm">{edu.year}</span>
                          {edu.certificateLink && (
                            <a href={edu.certificateLink} className="text-xs text-maroon-500 hover:underline flex items-center gap-1">
                              View Certificate <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{edu.degree}</h3>
                        <p className="text-[var(--text-secondary)] font-medium flex items-center gap-2 mb-3">
                          <School size={16} className="text-maroon-500" />
                          {edu.institute}
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl opacity-80">
                          {edu.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Skills & Interests */}
              <div className="lg:col-span-5 space-y-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-maroon-500" />
                    <span className="text-maroon-500 font-semibold uppercase tracking-wider text-sm">Expertise</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
                    <Zap className="text-maroon-500" size={28} />
                    Skills & Expertise
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium hover:border-maroon-500/40 hover:bg-maroon-900/5 transition-all cursor-default"
                      >
                        {skill.name}
                        {skill.usageInfo && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl text-center">
                            {skill.usageInfo}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-maroon-500" />
                    <span className="text-maroon-500 font-semibold uppercase tracking-wider text-sm">Passions</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
                    <Heart className="text-maroon-500" size={28} />
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.interests.map((interest, i) => (
                      <motion.div
                        key={interest}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] text-sm hover:text-maroon-500 transition-colors cursor-default"
                      >
                        {interest}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Selected Projects</h2>
                <p className="text-[var(--text-secondary)]">A showcase of AI automation and web engineering solutions.</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['All', 'AI Automation', 'Web', 'n8n', 'Prompt Engineering'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      projectFilter === filter 
                        ? 'bg-maroon-700 text-white shadow-lg shadow-maroon-900/20' 
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    layout
                    key={project.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden hover:border-maroon-500/30 transition-all flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={project.thumbnail} 
                        alt={project.name} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-60" />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          project.status === 'Live' ? 'bg-green-500/20 text-green-600 border border-green-500/30' : 
                          project.status === 'In Progress' ? 'bg-amber-500/20 text-amber-600 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] text-[var(--text-secondary)] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)]">{tech}</span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-maroon-500 transition-colors">{project.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2">
                        {project.problemStatement}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-xs font-bold text-maroon-500 uppercase tracking-widest">
                        View Case Study <ArrowRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">Social <span className="text-gradient">Proof</span></h2>
            <p className="text-[var(--text-secondary)]">What mentors and peers say about my work and dedication.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {profile.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[40px] bg-[var(--bg-secondary)] border border-[var(--border-color)] relative"
              >
                <Quote className="absolute top-8 right-8 text-maroon-500/10" size={48} />
                <p className="text-lg text-[var(--text-primary)] italic mb-8 leading-relaxed relative z-10 opacity-90">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-maroon-700 flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">{t.name}</h4>
                    <p className="text-xs text-[var(--text-secondary)]">{t.role} @ {t.organization}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="glass rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-700/5 rounded-full blur-[80px]" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">Let's build something <span className="text-gradient">extraordinary</span> together.</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-12">
                  I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-maroon-500/10 flex items-center justify-center text-maroon-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Email Me</p>
                      <a href={`mailto:${profile.email}`} className="text-lg font-medium hover:text-maroon-500 transition-colors">{profile.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-maroon-500/10 flex items-center justify-center text-maroon-500">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Call Me</p>
                      <p className="text-lg font-medium">{profile.phone}</p>
                    </div>
                  </div>
                </div>

                {profile.calendlyLink && (
                  <a 
                    href={profile.calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-maroon-500/5 transition-all"
                  >
                    <Calendar size={20} className="text-maroon-500" />
                    Schedule a 15-min Call
                  </a>
                )}
              </div>

              <div className="bg-[var(--bg-primary)]/50 rounded-3xl p-8 border border-[var(--border-color)]">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  {/* Honeypot for spam prevention */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Name</label>
                      <input required type="text" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors text-[var(--text-primary)]" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Email</label>
                      <input required type="email" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors text-[var(--text-primary)]" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Project Type</label>
                    <select className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors appearance-none text-[var(--text-primary)]">
                      <option>AI Automation</option>
                      <option>Web Development</option>
                      <option>Workflow Optimization</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Message</label>
                    <textarea required minLength={10} rows={4} className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors resize-none text-[var(--text-primary)]" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                      formStatus === 'success' ? 'bg-green-600 text-white' : 'bg-maroon-700 hover:bg-maroon-600 text-white shadow-maroon-900/20'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : formStatus === 'success' ? (
                      <>
                        <Check size={20} />
                        Message Sent!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-maroon-700 text-white shadow-xl shadow-maroon-900/40 flex items-center justify-center hover:bg-maroon-600 transition-all"
            aria-label="Back to top"
          >
            <ChevronRight size={24} className="-rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsResumeModalOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[var(--bg-primary)] rounded-[40px] border border-[var(--border-color)] overflow-hidden shadow-2xl flex flex-col h-[85vh]"
            >
              <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                <h3 className="text-xl font-bold">Curriculum Vitae</h3>
                <div className="flex items-center gap-4">
                  <a 
                    href={profile.cv} 
                    download
                    onClick={trackResumeClick}
                    className="px-4 py-2 rounded-xl bg-maroon-700 text-white text-sm font-bold flex items-center gap-2 hover:bg-maroon-600 transition-all"
                  >
                    <Download size={16} />
                    Download
                  </a>
                  <button onClick={() => setIsResumeModalOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-grow bg-[var(--bg-secondary)] relative">
                {/* Embedded PDF Viewer Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 rounded-2xl bg-maroon-900/10 flex items-center justify-center text-maroon-500 mb-6">
                    <Briefcase size={40} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">Resume Preview</h4>
                  <p className="text-[var(--text-secondary)] max-w-md mb-8">
                    The embedded PDF viewer is available in the production environment. You can download the full CV using the button above.
                  </p>
                  <a 
                    href={profile.cv} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-maroon-500 hover:text-maroon-400 font-bold flex items-center gap-2"
                  >
                    Open in New Tab <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[var(--bg-primary)] rounded-[40px] border border-[var(--border-color)] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-[var(--text-primary)] hover:bg-maroon-700 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                <div className="grid lg:grid-cols-2">
                  <div className="h-64 lg:h-full relative">
                    <img 
                      src={activeProjectImage || selectedProject.thumbnail} 
                      alt={selectedProject.name} 
                      className="w-full h-full object-cover transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] to-transparent hidden lg:block" />
                  </div>
                  
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full bg-maroon-900/30 text-maroon-400 text-[10px] font-bold uppercase tracking-widest border border-maroon-500/20">
                        {selectedProject.category}
                      </span>
                      <span className="text-[var(--text-secondary)] text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        2024
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">{selectedProject.name}</h2>
                    
                    <div className="space-y-8 mb-12">
                      <div>
                        <h4 className="text-xs font-bold text-maroon-500 uppercase tracking-widest mb-2">The Problem</h4>
                        <p className="text-[var(--text-secondary)] leading-relaxed">{selectedProject.details.problem}</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-bold text-maroon-500 uppercase tracking-widest mb-2">My Role</h4>
                          <p className="text-[var(--text-secondary)]">{selectedProject.details.role}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-maroon-500 uppercase tracking-widest mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.techStack.map(t => (
                              <span key={t} className="text-[10px] text-[var(--text-primary)] px-2 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-maroon-500 uppercase tracking-widest mb-2">The Solution</h4>
                        <p className="text-[var(--text-secondary)] leading-relaxed">{selectedProject.details.solution}</p>
                      </div>

                      {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-maroon-500 uppercase tracking-widest mb-4">Gallery</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {[selectedProject.thumbnail, ...selectedProject.gallery].map((img, idx) => (
                              <button 
                                key={idx} 
                                onClick={() => setActiveProjectImage(img)}
                                className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-300 ${
                                  activeProjectImage === img 
                                    ? 'border-maroon-500 ring-2 ring-maroon-500/20 scale-[0.98]' 
                                    : 'border-[var(--border-color)] hover:border-maroon-500/50'
                                }`}
                              >
                                <img 
                                  src={img} 
                                  alt={`Gallery ${idx + 1}`} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-6 rounded-2xl bg-maroon-900/10 border border-maroon-900/30">
                        <h4 className="text-xs font-bold text-maroon-400 uppercase tracking-widest mb-2">The Outcome</h4>
                        <p className="text-[var(--text-primary)] font-medium">{selectedProject.details.outcome}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {selectedProject.details.liveDemo && (
                        <a href={selectedProject.details.liveDemo} className="px-8 py-3 rounded-xl bg-maroon-700 hover:bg-maroon-600 text-white font-bold transition-all flex items-center gap-2">
                          Live Demo <ExternalLink size={18} />
                        </a>
                      )}
                      {selectedProject.details.github && (
                        <a href={selectedProject.details.github} className="px-8 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-maroon-500/10 transition-all flex items-center gap-2">
                          GitHub <Github size={18} />
                        </a>
                      )}
                      {selectedProject.details.caseStudyPdf && (
                        <a href={selectedProject.details.caseStudyPdf} className="px-8 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-maroon-500/10 transition-all flex items-center gap-2">
                          Case Study <Download size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[var(--text-secondary)] text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            {profile.socials.github && (
              <a href={profile.socials.github} className="text-[var(--text-secondary)] hover:text-maroon-500 transition-colors">
                <Github size={20} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} className="text-[var(--text-secondary)] hover:text-maroon-500 transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {profile.socials.twitter && (
              <a href={profile.socials.twitter} className="text-[var(--text-secondary)] hover:text-maroon-500 transition-colors">
                <Twitter size={20} />
              </a>
            )}
            {profile.socials.facebook && (
              <a href={profile.socials.facebook} className="text-[var(--text-secondary)] hover:text-maroon-500 transition-colors">
                <Facebook size={20} />
              </a>
            )}
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} className="text-[var(--text-secondary)] hover:text-maroon-500 transition-colors">
                <Instagram size={20} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-[var(--text-secondary)] hover:text-maroon-500 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-xs text-[var(--text-secondary)] hover:text-maroon-500 transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
