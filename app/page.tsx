"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin, Globe, ExternalLink, Code, Database, Layout, Terminal, ChevronRight, Download, Moon, Sun, Menu, X } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './components/ResumePDF';
import { resumeContent } from './data/resume-content';
import { RevealOnScroll } from './components/RevealOnScroll';
import { ParticleBackground } from './components/ParticleBackground';
import { getSkillIcon } from './utils/skill-icons';

const App = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const t = resumeContent[lang];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300 relative">
      <ParticleBackground theme={theme} />

      {/* Top Bar / Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">ER.Dev</span>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            {isClient ? (
              <PDFDownloadLink
                document={<ResumePDF data={t} />}
                fileName={`Resume_Eduardo_Ribeiro_${lang.toUpperCase()}.pdf`}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {({ loading }) => (
                  <>
                    <Download size={16} />
                    {loading ? '...' : t.sections.download}
                  </>
                )}
              </PDFDownloadLink>
            ) : (
              <button
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Download size={16} />
                {t.sections.download}
              </button>
            )}
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

            {/* Language Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setLang('pt')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'pt' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90"
              aria-label="Toggle Theme"
            >
              <div className="relative w-5 h-5 overflow-hidden">
                <div
                  className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                    }`}
                >
                  <Moon size={20} />
                </div>
                <div
                  className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`}
                >
                  <Sun size={20} />
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all active:scale-95"
              >
                {theme === 'light' ? (
                  <>
                    <Sun size={18} /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} /> Dark Mode
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Language</span>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setLang('pt')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${lang === 'pt' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              {isClient ? (
                <PDFDownloadLink
                  document={<ResumePDF data={t} />}
                  fileName={`Resume_Eduardo_Ribeiro_${lang.toUpperCase()}.pdf`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  {({ loading }) => (
                    <>
                      <Download size={18} />
                      {loading ? '...' : t.sections.download}
                    </>
                  )}
                </PDFDownloadLink>
              ) : (
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  <Download size={18} />
                  {t.sections.download}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10">

        {/* Header Section */}
        <RevealOnScroll>
          <header className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            <div className="space-y-6 flex-1 text-center sm:text-left">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Eduardo Ribeiro
                </h1>
                <p className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 font-medium">
                  {t.role}
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Mail size={18} />
                  {t.contact.email}
                </a>
                <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a href={`https://${t.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Github size={18} />
                  GitHub
                </a>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500">
                  <MapPin size={18} />
                  {t.contact.location}
                </div>
              </div>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 border-l-4 border-indigo-200 dark:border-indigo-900 pl-4 text-left">
                {t.summary}
              </p>
            </div>

            <div className="shrink-0">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg ring-2 ring-indigo-100 dark:ring-indigo-900/50">
                <Image
                  src="/edu.jpg"
                  alt="Eduardo Ribeiro"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {/* Education Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-8">
              <Layout className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.education}
            </h2>
            <div className="space-y-6">
              {t.education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.institution}</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{edu.degree}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{edu.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>


        {/* Experience Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-8">
              <Globe className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.experience}
            </h2>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12">
              {t.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 sm:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-900 shadow-sm"></div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full w-fit mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">{exp.company}</div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 italic">{exp.description}</p>

                  <ul className="space-y-3">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 group">
                        <ChevronRight size={16} className="mt-1 text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Academic Experience Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-8">
              <Globe className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.academicExperience}
            </h2>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12">
              {t.academicExperience.map((exp, index) => (
                <div key={index} className="relative pl-8 sm:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-900 shadow-sm"></div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full w-fit mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">{exp.company}</div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 italic">{exp.description}</p>

                  <ul className="space-y-3">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 group">
                        <ChevronRight size={16} className="mt-1 text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Projects Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-8">
              <Code className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.projects}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:bg-slate-800/50 transition-all">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-3 bg-indigo-50 dark:bg-indigo-900/30 inline-block px-2 py-1 rounded">{project.tech}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{project.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Skills Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-6">
              <Terminal className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.skills}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkillCard icon={<Layout size={20} />} title="Frontend" skills={t.skills.frontend} />
              <SkillCard icon={<Database size={20} />} title="Backend" skills={t.skills.backend} />
              <SkillCard icon={<Code size={20} />} title="Database & Cloud" skills={t.skills.database} />
              <SkillCard icon={<ExternalLink size={20} />} title="Tools & Methods" skills={t.skills.tools} />
            </div>
          </section>
        </RevealOnScroll>


        {/* Certifications Section */}
        <RevealOnScroll>
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-8">
              <Layout className="text-indigo-600 dark:text-indigo-400" />
              {t.sections.certifications}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.certifications.map((cert, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{cert.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 py-8 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Eduardo Ribeiro. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};



const SkillCard = ({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:bg-slate-800/50 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
          {icon}
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-default">
            <span className="text-lg">{getSkillIcon(skill)}</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
