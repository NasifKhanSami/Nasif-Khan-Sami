/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
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
  X
} from 'lucide-react';
import { ProfileData } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="min-h-screen bg-[#0f0a0a] flex items-center justify-center">
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
      <div className="min-h-screen bg-[#0f0a0a] flex items-center justify-center text-stone-400">
        <p>Failed to load profile data. Please check profile.json.</p>
      </div>
    );
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
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
                className="text-sm font-medium text-stone-400 hover:text-maroon-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href={profile.resume}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-5 py-2 rounded-full bg-maroon-900/40 border border-maroon-500/30 text-maroon-300 text-sm font-medium hover:bg-maroon-800/60 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Resume
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-stone-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a1212] border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-stone-300"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href={profile.resume}
                  className="w-full py-3 rounded-xl bg-maroon-900/40 border border-maroon-500/30 text-maroon-300 text-center font-medium"
                >
                  Download Resume
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
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-maroon-950/50 border border-maroon-800/30 text-maroon-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              Available for new opportunities
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              Crafting <span className="text-gradient">Digital</span> <br />
              Experiences.
            </h1>
            <p className="text-lg md:text-xl text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Hi. This is Sami. An AI-driven Software Engineer building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-maroon-700 hover:bg-maroon-600 text-white font-semibold transition-all shadow-lg shadow-maroon-900/20 flex items-center justify-center gap-2"
              >
                Get in Touch
                <ChevronRight size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-maroon-500 to-transparent" />
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
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative group">
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-maroon-950/20 mix-blend-overlay" />
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
                <span className="text-maroon-400 font-semibold uppercase tracking-wider text-sm">About Me</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">A brief story about my journey.</h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-8">
                {profile.bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <User className="text-maroon-400 mb-4" size={24} />
                  <h4 className="font-semibold mb-1">Personal Info</h4>
                  <p className="text-sm text-stone-500">{profile.address}</p>
                  <p className="text-sm text-stone-500">{profile.phone}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <Heart className="text-maroon-400 mb-4" size={24} />
                  <h4 className="font-semibold mb-1">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map(interest => (
                      <span key={interest} className="text-xs text-stone-500">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-[#140e0e]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Educational Background</h2>
              <p className="text-stone-500">My academic journey and certifications.</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              {profile.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-maroon-900/50 pb-8 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-maroon-600 border-4 border-[#140e0e]" />
                  <span className="text-maroon-500 font-mono text-sm mb-2 block">{edu.year}</span>
                  <h3 className="text-xl font-bold text-stone-200 mb-1">{edu.degree}</h3>
                  <p className="text-stone-500 flex items-center gap-2">
                    <GraduationCap size={16} />
                    {edu.institute}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold mb-6">Technical <br /><span className="text-gradient">Proficiency</span></h2>
              <p className="text-stone-400 leading-relaxed mb-8">
                Over the years, I've cultivated a diverse set of skills across the full stack, focusing on performance, scalability, and user experience.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-maroon-900/30 flex items-center justify-center text-maroon-400">
                  <Code size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Modern Stack</h4>
                  <p className="text-xs text-stone-500">Always learning new tech</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {profile.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-maroon-500/30 transition-all group"
                >
                  <p className="font-medium text-stone-300 group-hover:text-maroon-300 transition-colors">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="glass rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-700/10 rounded-full blur-[80px]" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's build something <span className="text-gradient">extraordinary</span> together.</h2>
                <p className="text-stone-400 text-lg mb-12">
                  I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-maroon-900/30 flex items-center justify-center text-maroon-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Email Me</p>
                      <a href={`mailto:${profile.email}`} className="text-lg font-medium hover:text-maroon-400 transition-colors">{profile.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-maroon-900/30 flex items-center justify-center text-maroon-400">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Call Me</p>
                      <p className="text-lg font-medium">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-maroon-900/30 flex items-center justify-center text-maroon-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Location</p>
                      <p className="text-lg font-medium">{profile.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Email</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Subject</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors" placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Message</label>
                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon-500 transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button className="w-full py-4 rounded-xl bg-maroon-700 hover:bg-maroon-600 text-white font-bold transition-all shadow-lg shadow-maroon-900/20">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-stone-500 text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            {profile.socials.github && (
              <a href={profile.socials.github} className="text-stone-500 hover:text-maroon-400 transition-colors">
                <Github size={20} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} className="text-stone-500 hover:text-maroon-400 transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {profile.socials.twitter && (
              <a href={profile.socials.twitter} className="text-stone-500 hover:text-maroon-400 transition-colors">
                <Twitter size={20} />
              </a>
            )}
            {profile.socials.facebook && (
              <a href={profile.socials.facebook} className="text-stone-500 hover:text-maroon-400 transition-colors">
                <Facebook size={20} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
