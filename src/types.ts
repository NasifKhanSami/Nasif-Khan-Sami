export interface Education {
  degree: string;
  institute: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface Socials {
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  bio: string;
  education: Education[];
  skills: string[];
  interests: string[];
  projects: Project[];
  socials: Socials;
  resume: string;
  profileImage: string;
}
