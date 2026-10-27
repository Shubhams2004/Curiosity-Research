import { WeeklyEdition } from '../types/news';

export const CURRENT_WEEKLY_EDITION: WeeklyEdition = {
  id: 'vol-3-issue-42',
  volume: 3,
  issue: 42,
  dateRange: 'October 2026 Edition',
  fullDateLabel: 'Curiosity Research Volume III | October 2026',
  editorInChief: 'Shubham Sonale',
  rniRegistration: 'CURIO/2026/SCIENCE',
  establishedYear: 2024,
  headlineQuote: 'Curiosity Research: Discover What’s Next — Global Science & Technology Platform',
};

export const EDITORIAL_TEAM = {
  creator: {
    name: 'Shubham Sonale',
    role: 'Creator & Lead System Architect',
    experience: 'Information Intelligence, Edge Distributed Architecture & Scientific Discovery Systems',
    email: 'shubhamsonale2004@gmail.com',
  },
  researchBoard: [
    {
      name: 'Dr. Ananya Sen',
      role: 'Fellow, Condensed Matter & Quantum Physics',
      location: 'IISc Bengaluru',
    },
    {
      name: 'Dr. Ramesh Kulkarni',
      role: 'Senior Scientist, Biotechnology & Plant Genomics',
      location: 'NCBS & CSIR-NCL Pune',
    },
    {
      name: 'Dr. K. S. Somnath',
      role: 'Principal Investigator, Heliophysics & Space Systems',
      location: 'ISRO SAC Bengaluru',
    },
    {
      name: 'Prof. Pratibha Sharma',
      role: 'Chair, Sustainable Clean Energy & Hydrogen Engineering',
      location: 'IIT Bombay',
    },
  ],
  researchHub: {
    name: 'Curiosity Research Global Laboratory',
    address: 'Curiosity Research Science & Innovation Hub, Bengaluru / Pune, India',
    email: 'research@curiosityresearch.org',
    creatorEmail: 'shubhamsonale2004@gmail.com',
  },
};
