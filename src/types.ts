export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  type: "College Project" | "Personal Project";
  organization?: string;
  description: string;
  highlights: string[];
  techUsed: string[];
  engagementIncrease?: string;
  accuracyMetric?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  isRemote?: boolean;
  responsibilities: string[];
  techUsed?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  gpaScale: string;
  relevantCoursework: string[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}
