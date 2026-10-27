/**
 * @file BriefingArchivesPage.tsx
 * Monthly Research Compendiums & Briefings for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React from 'react';
import {
  ChevronRight,
  Download,
  FileText,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Atom,
  Building2,
} from 'lucide-react';
import { ARTICLES } from '../data/newsArticles';

interface BriefingArchivesPageProps {
  onNavigateHome: () => void;
  onSelectArticle: (slugOrId: string) => void;
}

const RESEARCH_COMPENDIUMS = [
  {
    id: 'curiosity-comp-2026-10',
    volume: 'Volume III • October 2026',
    title: 'Inner Heliosphere Shockwaves, Topological Kagome Superlattices & Dual-Target CAR-T',
    summary: 'Curated peer-reviewed compendium featuring Aditya-L1 solar coronagraph telemetry, IISc ambient-pressure quantum materials synthesis, and TIFR/TMC clinical remission in advanced myeloma.',
    paperCount: 6,
    leadInstitutions: 'ISRO, IISc Bengaluru, TIFR Mumbai, IIT Bombay',
    editor: 'Shubham Sonale, Lead Curator',
  },
  {
    id: 'curiosity-comp-2026-09',
    volume: 'Volume II • September 2026',
    title: 'Non-Euclidean Geometric AI, Direct Seawater Electrolysis & Plant Stomatal Epigenetics',
    summary: 'Focus on IIT Madras hyperbolic graph transformers for molecular drug folding, continuous Arabian seawater green hydrogen generation, and NCBS/CSIR-NCL drought resilience traits.',
    paperCount: 5,
    leadInstitutions: 'IIT Madras, IIT Bombay, NCBS Bengaluru, CSIR-NCL',
    editor: 'Shubham Sonale, Lead Curator',
  },
  {
    id: 'curiosity-comp-2026-08',
    volume: 'Volume I • August 2026',
    title: 'Free-Space Satellite Quantum Cryptography & Relativistic Astrometry',
    summary: 'Analysis of Raman Research Institute and ISRO daytime 1,200 km satellite QKD distribution and AstroSat cosmological observational runs.',
    paperCount: 4,
    leadInstitutions: 'Raman Research Institute, ISRO, IUCAA Pune',
    editor: 'Shubham Sonale, Lead Curator',
  },
];

export const BriefingArchivesPage: React.FC<BriefingArchivesPageProps> = ({
  onNavigateHome,
  onSelectArticle,
}) => {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Feed</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Curated Research Compendiums</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Monthly Research Briefings
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-1 leading-relaxed">
              Curated digests synthesizing landmark peer-reviewed publications, experimental data, and institutional breakthroughs. Curated by <strong>Shubham Sonale</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-8 space-y-8">
        {/* Compendiums Catalog */}
        <div className="space-y-6">
          {RESEARCH_COMPENDIUMS.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold uppercase">
                  {comp.volume}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {comp.editor}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {comp.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed font-sans">
                  {comp.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    {comp.leadInstitutions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    {comp.paperCount} Peer Dossiers
                  </span>
                </div>

                <button
                  onClick={() => onSelectArticle(ARTICLES[0].slug)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Featured Paper</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
