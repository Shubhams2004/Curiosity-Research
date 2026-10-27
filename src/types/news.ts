/**
 * @file news.ts
 * Core data contracts for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

export type CategorySlug =
  | 'space'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'medicine'
  | 'ai'
  | 'robotics'
  | 'energy'
  | 'engineering'
  | 'indian-innovation'
  | 'editorial'
  | 'tech'
  // Legacy compatibility slugs
  | 'maharashtra'
  | 'desh'
  | 'world'
  | 'politics'
  | 'economy'
  | 'education'
  | 'sports'
  | 'entertainment';

export type LanguageCode = 'en' | 'mr' | 'hi';

export interface Author {
  name: string;
  role: string;
  location: string;
  avatar?: string;
  institution?: string;
}

export interface Quote {
  text: string;
  speaker: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: CategorySlug;
  image: string;
  imageCaption?: string;
  author: Author;
  location: string;
  publishedAt: string; // ISO String
  readTimeMinutes: number;
  leadStory?: boolean;
  featured?: boolean;
  trending?: boolean;
  mostRead?: boolean;
  viewsCount: number;
  sharesCount: number;
  tags: string[];
  quotes?: Quote[];
  content: string[]; // Array of deep academic/research paragraphs
  language?: LanguageCode;

  // Scientific research discovery metadata
  doi?: string;
  journalName?: string;
  publicationYear?: number;
  primaryInstitution?: string;
  institutionCountry?: string;
  paperUrl?: string;
  citationCount?: number;
  isBreakthrough?: boolean;
  researchDiscipline?: string;
}

export interface Category {
  slug: CategorySlug;
  nameEnglish: string;
  nameMarathi?: string;
  description: string;
  accentColor: string;
  iconName?: string;
}

export interface WeeklyEdition {
  id: string;
  volume: number;
  issue: number;
  dateRange: string;
  fullDateLabel: string;
  editorInChief: string;
  rniRegistration?: string;
  establishedYear: number;
  headlineQuote: string;
}

export interface Comment {
  id: string;
  author: string;
  city: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface BreakingItem {
  id: string;
  title: string;
  timestamp: string;
  category: CategorySlug;
  articleSlug: string;
  doi?: string;
  journal?: string;
}

export type EditionCity = 'Bengaluru' | 'Mumbai' | 'Delhi' | 'Pune' | 'Chennai' | 'पुणे';
export type ThemeMode = 'light' | 'dark';
