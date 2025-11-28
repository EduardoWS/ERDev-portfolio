import React from 'react';
import {
  FaReact, FaAngular, FaFigma, FaHtml5, FaCss3, FaNodeJs, FaJava, FaPython,
  FaGitAlt, FaGithub, FaDocker, FaFileExcel, FaDatabase
} from 'react-icons/fa';
import {
  SiNextdotjs, SiCanva, SiTypescript, SiTailwindcss, SiNestjs, SiFirebase,
  SiPostgresql, SiOracle, SiDbeaver, SiPostman, SiCplusplus, SiGooglecloud
} from 'react-icons/si';
import { TbApi, TbSql, TbDatabase, TbLock } from 'react-icons/tb';
import { MdViewKanban } from 'react-icons/md';

export const getSkillIcon = (skillName: string) => {
  const normalizedName = skillName.toLowerCase();

  if (normalizedName.includes('react')) return <FaReact className="text-[#61DAFB]" />;
  if (normalizedName.includes('next')) return <SiNextdotjs className="text-black dark:text-white" />;
  if (normalizedName.includes('angular')) return <FaAngular className="text-[#DD0031]" />;
  if (normalizedName.includes('canva')) return <SiCanva className="text-[#00C4CC]" />;
  if (normalizedName.includes('figma')) return <FaFigma className="text-[#F24E1E]" />;
  if (normalizedName.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
  if (normalizedName.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (normalizedName.includes('html')) return <FaHtml5 className="text-[#E34F26]" />;
  if (normalizedName.includes('css')) return <FaCss3 className="text-[#1572B6]" />;

  if (normalizedName.includes('node')) return <FaNodeJs className="text-[#339933]" />;
  if (normalizedName.includes('nest')) return <SiNestjs className="text-[#E0234E]" />;
  if (normalizedName.includes('java') && !normalizedName.includes('script')) return <FaJava className="text-[#007396]" />;
  if (normalizedName.includes('python')) return <FaPython className="text-[#3776AB]" />;
  if (normalizedName.includes('c++') || normalizedName.includes('c/c++')) return <SiCplusplus className="text-[#00599C]" />;
  if (normalizedName.includes('firebase') || normalizedName.includes('firestore')) return <SiFirebase className="text-[#FFCA28]" />;
  if (normalizedName.includes('google cloud') || normalizedName.includes('gcp')) return <SiGooglecloud className="text-[#4285F4]" />;
  if (normalizedName.includes('api')) return <TbApi className="text-slate-600 dark:text-slate-400" />;
  if (normalizedName.includes('oauth')) return <TbLock className="text-slate-600 dark:text-slate-400" />;

  if (normalizedName.includes('postgres')) return <SiPostgresql className="text-[#4169E1]" />;
  if (normalizedName.includes('oracle')) return <SiOracle className="text-[#F80000]" />;
  if (normalizedName.includes('nosql')) return <FaDatabase className="text-[#47A248]" />;
  if (normalizedName.includes('modeling')) return <TbDatabase className="text-slate-600 dark:text-slate-400" />;
  if (normalizedName.includes('sql')) return <TbSql className="text-[#003B57]" />;

  if (normalizedName.includes('git/')) return <FaGithub className="text-black dark:text-white" />;
  if (normalizedName.includes('git')) return <FaGitAlt className="text-[#F05032]" />;
  if (normalizedName.includes('docker')) return <FaDocker className="text-[#2496ED]" />;
  if (normalizedName.includes('vba')) return <FaFileExcel className="text-[#217346]" />;
  if (normalizedName.includes('scrum') || normalizedName.includes('kanban')) return <MdViewKanban className="text-[#0079BF]" />;
  if (normalizedName.includes('dbeaver')) return <SiDbeaver className="text-[#382923] dark:text-[#FFFFFF]" />;
  if (normalizedName.includes('postman')) return <SiPostman className="text-[#FF6C37]" />;

  return <TbDatabase className="text-slate-400" />; // Default icon
};
