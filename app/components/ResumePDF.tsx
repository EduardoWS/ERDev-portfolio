import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { resumeContent } from '../data/resume-content';

// Register a font if needed, but for now we'll use standard fonts.
// To make it look better, we can register fonts later if the user wants.

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5', // Indigo 600
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a', // Slate 900
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#4f46e5', // Indigo 600
    marginBottom: 8,
    fontWeight: 'medium',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 10,
    color: '#475569', // Slate 600
    marginTop: 5,
  },
  contactItem: {
    marginRight: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4f46e5',
    paddingLeft: 6,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#475569',
    marginBottom: 8,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },
  jobRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  jobPeriod: {
    fontSize: 10,
    color: '#4f46e5',
    fontWeight: 'bold',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  jobCompany: {
    fontSize: 10,
    color: '#334155', // Slate 700
    marginBottom: 6,
    fontStyle: 'italic',
    fontWeight: 'medium',
  },
  jobDescription: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 1.5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: '#4f46e5',
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCategory: {
    width: '48%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  skillList: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 9,
    color: '#4f46e5',
    marginBottom: 8,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  projectDesc: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  certificationItem: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// Helper to parse bold text (**text**)
const RichText = ({ text, style }: { text: string, style?: any }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <Text style={style}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <Text key={i} style={{ fontWeight: 'bold', color: '#1e293b' }}>{part.slice(2, -2)}</Text>;
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
};

type ContentType = typeof resumeContent.pt;

export const ResumePDF = ({ data }: { data: ContentType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>Eduardo Ribeiro</Text>
        <Text style={styles.role}>{data.role}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{data.contact.email}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Link src={`https://${data.contact.linkedin}`} style={styles.contactItem}>LinkedIn</Link>
          <Text style={styles.contactItem}>|</Text>
          <Link src={`https://${data.contact.github}`} style={styles.contactItem}>GitHub</Link>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{data.contact.location}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.sections.education}</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.educationItem} wrap={false}>
            <View style={styles.jobHeader}>
              <Text style={{ ...styles.jobRole, fontSize: 10 }}>{edu.institution}</Text>
              <Text style={styles.jobPeriod}>{edu.period}</Text>
            </View>
            <Text style={{ fontSize: 10, color: '#334155' }}>{edu.degree}</Text>
            <Text style={{ fontSize: 8, color: '#64748b' }}>{edu.desc}</Text>
          </View>
        ))}
      </View>


      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.sections.experience}</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem} wrap={false}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobRole}>{exp.role}</Text>
              <Text style={styles.jobPeriod}>{exp.period}</Text>
            </View>
            <Text style={styles.jobCompany}>{exp.company}</Text>
            <Text style={styles.jobDescription}>{exp.description}</Text>
            {exp.achievements.map((achievement, i) => (
              <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <RichText text={achievement} style={styles.bulletText} />
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Academic Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.sections.academicExperience}</Text>
        {data.academicExperience.map((exp, index) => (
          <View key={index} style={styles.experienceItem} wrap={false}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobRole}>{exp.role}</Text>
              <Text style={styles.jobPeriod}>{exp.period}</Text>
            </View>
            <Text style={styles.jobCompany}>{exp.company}</Text>
            <Text style={styles.jobDescription}>{exp.description}</Text>
            {exp.achievements.map((achievement, i) => (
              <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <RichText text={achievement} style={styles.bulletText} />
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.sections.projects}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {data.projects.map((project, index) => (
            <View key={index} style={{ ...styles.projectItem, width: '48%' }} wrap={false}>
              <Text style={styles.projectTitle}>{project.name}</Text>
              <Text style={styles.projectTech}>{project.tech}</Text>
              <Text style={styles.projectDesc}>{project.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.sections.skills}</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Frontend</Text>
            <Text style={styles.skillList}>{data.skills.frontend.join(', ')}</Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Backend & Cloud</Text>
            <Text style={styles.skillList}>{data.skills.backend.join(', ')}</Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Database</Text>
            <Text style={styles.skillList}>{data.skills.database.join(', ')}</Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Tools</Text>
            <Text style={styles.skillList}>{data.skills.tools.join(', ')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>{data.sections.certifications}</Text>
        <View style={{ padding: 10, backgroundColor: '#f8fafc', borderRadius: 6, borderWidth: 1, borderColor: '#e2e8f0' }}>
          {data.certifications.map((cert, index) => (
            <View key={index} style={styles.certificationItem}>
              <View>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a' }}>{cert.name}</Text>
                <Text style={{ fontSize: 9, color: '#64748b' }}>{cert.issuer}</Text>
              </View>
              <Text style={{ fontSize: 9, color: '#4f46e5', fontWeight: 'bold' }}>{cert.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document >
);
