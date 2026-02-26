export interface Education {
  degree: string;
  institute: string;
  year: string;
  description: string;
  certificateLink?: string;
}

export interface Project {
  name: string;
  thumbnail: string;
  problemStatement: string;
  category: 'AI Automation' | 'Web' | 'n8n' | 'Prompt Engineering' | 'Photography';
  techStack: string[];
  gallery?: string[];
  status: 'Live' | 'Code' | 'In Progress';
  details: {
    problem: string;
    role: string;
    solution: string;
    outcome: string;
    github?: string;
    liveDemo?: string;
    caseStudyPdf?: string;
  };
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'AI Automation' | 'Web Development' | 'Tools & Platforms';
  usageInfo?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
}

export interface Socials {
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  bio: string;
  whatIDoBest: string[];
  highlights: {
    currentFocus: string;
    learningMindset: string;
  };
  education: Education[];
  skills: Skill[];
  interests: string[];
  projects: Project[];
  testimonials: Testimonial[];
  socials: Socials;
  cv: string;
  calendlyLink?: string;
  profileImage: string;
  heroImage?: string;
}
