import { Category, CategorySlug } from '../types/news';

export const SCIENTIFIC_DOMAINS: Category[] = [
  {
    slug: 'space',
    nameEnglish: 'Space & Astrophysics',
    nameMarathi: 'अंतराळ व खगोलभौतिकी',
    description: 'Planetary missions, deep heliosphere dynamics, cosmology, stellar evolution, and satellite instrumentation.',
    accentColor: '#38bdf8', // Sky Blue
  },
  {
    slug: 'ai',
    nameEnglish: 'AI & Computing',
    nameMarathi: 'कृत्रिम बुद्धिमत्ता व संगणन',
    description: 'Geometric deep learning, quantum algorithms, neural architectures, neuromorphic computing, and foundation models.',
    accentColor: '#818cf8', // Indigo Violet
  },
  {
    slug: 'physics',
    nameEnglish: 'Quantum & Physics',
    nameMarathi: 'क्वांटम व भौतिकशास्त्र',
    description: 'Condensed matter, topological materials, high-energy particle physics, superconducting superlattices, and relativity.',
    accentColor: '#06b6d4', // Cyan
  },
  {
    slug: 'biology',
    nameEnglish: 'Biology & Genomics',
    nameMarathi: 'जैविकशास्त्र व जीनोमिक्स',
    description: 'CRISPR gene editing, molecular biophysics, epigenetic plant traits, synthetic biology, and evolutionary dynamics.',
    accentColor: '#10b981', // Emerald Green
  },
  {
    slug: 'medicine',
    nameEnglish: 'Medicine & Health',
    nameMarathi: 'वैद्यकशास्त्र व आरोग्य',
    description: 'CAR-T immunotherapy, mRNA lipid nanoparticles, neuro-degenerative therapies, precision oncology, and clinical trials.',
    accentColor: '#f43f5e', // Rose
  },
  {
    slug: 'chemistry',
    nameEnglish: 'Chemistry & Materials',
    nameMarathi: 'रसायनशास्त्र व पदार्थविज्ञान',
    description: 'Heterogeneous catalysis, flow chemistry, metal-organic frameworks, polymer physics, and battery electrochemistry.',
    accentColor: '#f59e0b', // Amber
  },
  {
    slug: 'energy',
    nameEnglish: 'Energy & Climate',
    nameMarathi: 'ऊर्जा व पर्यावरण तंत्रज्ञान',
    description: 'Direct seawater electrolysis, perovskite photovoltaics, green hydrogen, atmospheric carbon capture, and grid storage.',
    accentColor: '#84cc16', // Lime
  },
  {
    slug: 'robotics',
    nameEnglish: 'Robotics & Autonomy',
    nameMarathi: 'रोबोटिक्स व स्वायत्त प्रणाली',
    description: 'Bio-inspired quadruped locomotion, surgical robotic manipulators, autonomous aerospace navigation, and tactile sensing.',
    accentColor: '#a855f7', // Purple
  },
  {
    slug: 'engineering',
    nameEnglish: 'Advanced Engineering',
    nameMarathi: 'प्रगत अभियांत्रिकी व नॅनो',
    description: 'Semiconductor lithography, micro-electromechanical systems (MEMS), photonic waveguides, and structural metamaterials.',
    accentColor: '#64748b', // Slate
  },
  {
    slug: 'indian-innovation',
    nameEnglish: 'Indian Innovation',
    nameMarathi: 'भारतीय संशोधन व नवकल्पना',
    description: 'Breakthrough publications and indigenous technologies emerging from IISc, TIFR, IITs, ISRO, CSIR, and NCBS.',
    accentColor: '#f97316', // Saffron Orange
  },
  {
    slug: 'editorial',
    nameEnglish: 'Perspectives & Reviews',
    nameMarathi: 'संपादकीय व संशोधन भाष्य',
    description: 'Scientific commentary, methodological audits, peer analysis, science policy debates, and open-access advocacy.',
    accentColor: '#0284c7', // Deep Cyan
  },
];

// Combine scientific domains and legacy categories for backward compatibility
export const ALL_CATEGORIES: Category[] = [
  ...SCIENTIFIC_DOMAINS,
  {
    slug: 'tech',
    nameEnglish: 'Science & Technology',
    nameMarathi: 'विज्ञान-तंत्रज्ञान',
    description: 'Comprehensive science, space, AI, and engineering discoveries.',
    accentColor: '#0ea5e9',
  },
  {
    slug: 'maharashtra',
    nameEnglish: 'Maharashtra Research Hubs',
    nameMarathi: 'महाराष्ट्र',
    description: 'Scientific research across Pune, Mumbai, and regional Maharashtra institutions (TIFR, IITB, NCL, IUCAA).',
    accentColor: '#b91c1c',
  },
  {
    slug: 'desh',
    nameEnglish: 'National Science Initiatives',
    nameMarathi: 'देश',
    description: 'Indian National Science Missions, Department of Science & Technology, and CSIR milestones.',
    accentColor: '#c2410c',
  },
  {
    slug: 'world',
    nameEnglish: 'Global Scientific Frontier',
    nameMarathi: 'जग',
    description: 'International scientific breakthroughs from CERN, NASA, ESA, MIT, and Max Planck Society.',
    accentColor: '#1d4ed8',
  },
  {
    slug: 'economy',
    nameEnglish: 'Deep Tech & Research Economy',
    nameMarathi: 'अर्थव्यवस्था',
    description: 'Deep-tech startups, R&D patent filings, venture science, and high-tech manufacturing economics.',
    accentColor: '#0f766e',
  },
  {
    slug: 'education',
    nameEnglish: 'Academic & Doctoral Research',
    nameMarathi: 'शिक्षण',
    description: 'Doctoral research fellowships, Indian Institute of Science education, and STEM pedagogy.',
    accentColor: '#047857',
  },
  {
    slug: 'politics',
    nameEnglish: 'Science Policy & Governance',
    nameMarathi: 'राजकारण',
    description: 'National quantum missions, semiconductor incentives, and intellectual property governance.',
    accentColor: '#991b1b',
  },
  {
    slug: 'sports',
    nameEnglish: 'Biomechanics & Sports Science',
    nameMarathi: 'क्रीडा',
    description: 'Kinematics, athletic performance biometrics, physiological telemetry, and sports technology.',
    accentColor: '#b45309',
  },
  {
    slug: 'entertainment',
    nameEnglish: 'Sci-Art & Scientific Visualizations',
    nameMarathi: 'मनोरंजन',
    description: 'Astrophotography, molecular animations, science communication, and generative visual simulations.',
    accentColor: '#be185d',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return ALL_CATEGORIES.find((cat) => cat.slug === slug);
};
