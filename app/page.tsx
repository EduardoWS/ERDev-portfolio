"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin, Globe, ExternalLink, Code, Database, Layout, Terminal, ChevronRight, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './components/ResumePDF';
import { resumeContent } from './data/resume-content';

const App = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = resumeContent[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Top Bar / Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-indigo-600">ER.Dev</span>

          <div className="flex items-center gap-4">
            {isClient ? (
              <PDFDownloadLink
                document={<ResumePDF data={t} />}
                fileName={`Resume_Eduardo_Ribeiro_${lang.toUpperCase()}.pdf`}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
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
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <Download size={16} />
                {t.sections.download}
              </button>
            )}
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setLang('pt')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'pt' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Header Section */}
        <header className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
          <div className="space-y-6 flex-1 text-center sm:text-left">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Eduardo Ribeiro
              </h1>
              <p className="text-xl sm:text-2xl text-indigo-600 font-medium">
                {t.role}
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base text-slate-600">
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Mail size={18} />
                {t.contact.email}
              </a>
              <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href={`https://${t.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Github size={18} />
                GitHub
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={18} />
                {t.contact.location}
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-600 border-l-4 border-indigo-200 pl-4 text-left">
              {t.summary}
            </p>
          </div>

          <div className="shrink-0">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-indigo-100">
              <Image
                src="/edu.jpg"
                alt="Eduardo Ribeiro"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </header>

        {/* Skills Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
            <Terminal className="text-indigo-600" />
            {t.sections.skills}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SkillCard icon={<Layout size={20} />} title="Frontend" skills={t.skills.frontend} />
            <SkillCard icon={<Database size={20} />} title="Backend & Cloud" skills={t.skills.backend} />
            <SkillCard icon={<Code size={20} />} title="Database" skills={t.skills.database} />
            <SkillCard icon={<ExternalLink size={20} />} title="Tools & Methods" skills={t.skills.tools} />
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
            <Globe className="text-indigo-600" />
            {t.sections.experience}
          </h2>

          <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
            {t.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 sm:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full w-fit mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>

                <div className="text-lg font-medium text-slate-700 mb-4">{exp.company}</div>
                <p className="text-slate-600 mb-4 italic">{exp.description}</p>

                <ul className="space-y-3">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 group">
                      <ChevronRight size={16} className="mt-1 text-indigo-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Experience Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
            <Globe className="text-indigo-600" />
            {t.sections.academicExperience}
          </h2>

          <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
            {t.academicExperience.map((exp, index) => (
              <div key={index} className="relative pl-8 sm:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full w-fit mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>

                <div className="text-lg font-medium text-slate-700 mb-4">{exp.company}</div>
                <p className="text-slate-600 mb-4 italic">{exp.description}</p>

                <ul className="space-y-3">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 group">
                      <ChevronRight size={16} className="mt-1 text-indigo-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
            <Code className="text-indigo-600" />
            {t.sections.projects}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{project.name}</h3>
                <p className="text-xs font-mono text-indigo-600 mb-3 bg-indigo-50 inline-block px-2 py-1 rounded">{project.tech}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
            <Layout className="text-indigo-600" />
            {t.sections.education}
          </h2>
          <div className="space-y-6">
            {t.education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{edu.institution}</h3>
                  <p className="text-slate-700 font-medium">{edu.degree}</p>
                  <p className="text-slate-500 text-sm mt-1">{edu.desc}</p>
                </div>
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
            <Layout className="text-indigo-600" />
            {t.sections.certifications}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.certifications.map((cert, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{cert.name}</h3>
                  <p className="text-slate-500 text-xs">{cert.issuer}</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full whitespace-nowrap">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Eduardo Ribeiro. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

const SkillCard = ({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          {icon}
        </div>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-sm font-medium rounded-full border border-slate-200">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
