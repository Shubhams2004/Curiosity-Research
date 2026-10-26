/**
 * @file BriefingArchivesPage.tsx
 * Periodic Intelligence Briefings & Situation Reports for Samvad Intel.
 * Replaces the conventional newspaper EpaperPage with digital dossier compilations:
 * - Weekly situation briefings & compiled policy analysis
 * - Dossier pagination & reader
 * - Downloadable research brief format
 */

import React, { useState } from 'react';
import {
  ChevronRight,
  Download,
  FileText,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { ARTICLES } from '../data/newsArticles';

interface BriefingArchivesPageProps {
  onNavigateHome: () => void;
  onSelectArticle: (slugOrId: string) => void;
}

const BRIEFINGS_CATALOG = [
  {
    id: 'intel-brief-2026-w42',
    title: 'Executive Briefing W-42: Maharashtra Agrarian Water Infrastructure & Budget Realignment',
    dateRange: 'October 15 – October 22, 2026',
    summary: 'Cross-sectoral intelligence review synthesizing state budget irrigation allocations, ground-water monitoring reports, and procurement pricing updates across western Maharashtra.',
    classification: 'UNRESTRICTED / PUBLIC DOSSIER',
    dossierCount: 14,
    leadEntity: 'State Bureau & Ministry Data',
  },
  {
    id: 'intel-brief-2026-w41',
    title: 'Executive Briefing W-41: National High-Speed Logistics & Port Connectivity Milestones',
    dateRange: 'October 8 – October 14, 2026',
    summary: 'Synthesized intelligence tracking industrial corridor progress, port automation at JNPT, and freight infrastructure expansion across central rail corridors.',
    classification: 'UNRESTRICTED / PUBLIC DOSSIER',
    dossierCount: 18,
    leadEntity: 'PIB & Infrastructure Gazette',
  },
  {
    id: 'intel-brief-2026-w40',
    title: 'Executive Briefing W-40: Renewable Energy Grid Integration & Solar Micro-Grid Initiatives',
    dateRange: 'October 1 – October 7, 2026',
    summary: 'Evaluating rural solar feeder deployments, battery storage tender allocations, and state utility transmission load curves.',
    classification: 'UNRESTRICTED / PUBLIC DOSSIER',
    dossierCount: 12,
    leadEntity: 'Energy Department & Bureau Feeds',
  },
];

export const BriefingArchivesPage: React.FC<BriefingArchivesPageProps> = ({
  onNavigateHome,
  onSelectArticle,
}) => {
  const [selectedBriefing, setSelectedBriefing] = useState(BRIEFINGS_CATALOG[0]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header Banner */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Intelligence Stream
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 uppercase font-bold">Intelligence Briefings</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-mono-code uppercase font-bold">
                <FileText className="w-3.5 h-3.5" />
                PERIODIC INTELLIGENCE REPORTS
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Synthesized Executive Situation Reports
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Compiled situational reviews and analytical briefings derived from verified D1 wire streams, designed for strategic evaluation and policy research.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-code font-bold text-xs rounded-lg cursor-pointer transition-colors flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Briefing Package Ready' : 'Download Briefing PDF'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog & Reader */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Briefing Selection Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono-code uppercase text-slate-400 font-bold">
              Available Situation Reports
            </h3>
            {BRIEFINGS_CATALOG.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBriefing(b)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedBriefing.id === b.id
                    ? 'bg-slate-900 border-cyan-500/80 shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="text-[10px] font-mono-code text-cyan-400 uppercase font-bold mb-1">
                  {b.dateRange}
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{b.title}</h4>
                <div className="mt-2 text-xs font-mono-code text-slate-500 flex items-center gap-2">
                  <span>{b.dossierCount} Dossiers</span>
                  <span>·</span>
                  <span>{b.leadEntity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Briefing Reader (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800 text-xs font-mono-code">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold uppercase">
                {selectedBriefing.classification}
              </span>
              <span className="text-slate-400">{selectedBriefing.dateRange}</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                {selectedBriefing.title}
              </h2>
              <p className="mt-3 text-sm text-slate-300 font-editorial leading-relaxed">
                {selectedBriefing.summary}
              </p>
            </div>

            {/* Dossier Items in this Briefing */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3 font-sans">
              <h4 className="text-xs font-mono-code uppercase font-bold text-slate-300">
                Included Wire Intelligence Dossiers
              </h4>
              <div className="space-y-3">
                {ARTICLES.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art.slug || art.id)}
                    className="p-3.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg cursor-pointer transition-all flex items-center justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono-code text-slate-400 mb-1">
                        <span className="text-cyan-400 uppercase font-bold">{art.category}</span>
                        <span>·</span>
                        <span>{art.author.name}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {art.title}
                      </h5>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
