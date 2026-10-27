/**
 * @file research.ts
 * Type definitions for Curiosity Research - Global Science & Technology Discovery Platform.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

export type ResearchDiscipline =
  | 'space'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'medicine'
  | 'ai'
  | 'robotics'
  | 'energy'
  | 'engineering'
  | 'indian-innovation';

export interface ResearchInstitution {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  country: string;
  focusAreas: string;
  website: string;
  establishedYear: number;
  notableBreakthroughs?: string;
  publicationsCount?: number;
}

export interface ScientificPaper {
  id: string;
  doi: string;
  title: string;
  abstract: string;
  journalName: string;
  publicationYear: number;
  primaryInstitution: string;
  institutionCountry: string;
  paperUrl: string;
  citationCount: number;
  isBreakthrough: boolean;
  discipline: ResearchDiscipline;
  authors: string[];
  publishedAt: string;
  openAccess: boolean;
  keyFindings: string[];
  pdfUrl?: string;
}

export interface ResearchFilterState {
  searchQuery: string;
  discipline: string;
  institution: string;
  onlyBreakthroughs: boolean;
  yearRange: [number, number];
  sortBy: 'latest' | 'citations' | 'alphabetical';
}
