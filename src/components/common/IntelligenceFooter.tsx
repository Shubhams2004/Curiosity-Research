/**
 * @file IntelligenceFooter.tsx
 * Modern, professional footer for Samvad Intel Information Intelligence Platform.
 * Displays system architecture, source provenance guidelines, verified sources, and methodology links.
 */

import React from 'react';
import { ALL_CATEGORIES } from '../../data/categories';
import {
  ShieldCheck,
  Database,
  Globe2,
  Terminal,
  Activity,
  Layers,
  FileText,
  Lock,
  ExternalLink,
  Cpu,
} from 'lucide-react';

interface IntelligenceFooterProps {
  onSelectCategory: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateEpaper: () => void;
  onNavigateEditorialDesk?: () => void;
}

export const IntelligenceFooter: React.FC<IntelligenceFooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  onNavigateEpaper,
  onNavigateEditorialDesk,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Platform Overview & System Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white border border-cyan-400/40 shadow-sm">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                SAMVAD <span className="text-cyan-400">INTEL</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A high-precision information intelligence and verification engine built for researchers, journalists, and policy analysts. Powered by serverless edge workers, distributed D1 storage, and multi-source wire ingestion across Marathi, Hindi, and English.
            </p>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs font-mono-code space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  RUNTIME ARCHITECTURE
                </span>
                <span className="text-emerald-400 font-bold">Cloudflare Workers + D1</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Data pipeline strictly isolates raw incoming wires in staging until editorial verification and cryptographic hashing.
              </div>
            </div>
          </div>

          {/* Col 2: Taxonomy & Topic Domains (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Intelligence Domains
            </h4>
            <ul className="space-y-1.5 text-xs">
              {ALL_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="hover:text-cyan-300 text-slate-400 transition-colors cursor-pointer flex items-center justify-between w-full"
                  >
                    <span>{cat.nameEnglish}</span>
                    <span className="text-[10px] font-mono-code text-slate-600">({cat.nameMarathi})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Research & Transparency (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Standards & Disclosure
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onNavigateAbout}
                className="w-full p-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg text-left transition-colors cursor-pointer group block"
              >
                <div className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                  <span>Verification Framework</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Source validation, deduplication hashes, and editorial lifecycle protocols.
                </p>
              </button>

              <button
                onClick={onNavigateContact}
                className="w-full p-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg text-left transition-colors cursor-pointer group block"
              >
                <div className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                  <span>Source Transparency Directory</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Full catalog of official government feeds, wire services, and regional desks.
                </p>
              </button>

              <button
                onClick={onNavigateEpaper}
                className="w-full p-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg text-left transition-colors cursor-pointer group block"
              >
                <div className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                  <span>Periodic Intelligence Dossiers</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Archived situation reports and compiled weekly analyses.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Infrastructure Telemetry */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} SAMVAD INTEL</span>
            <span>·</span>
            <span>Created by <strong className="text-slate-300 font-semibold">Shubham Sonale</strong></span>
            <span>·</span>
            <span>OPEN INTELLIGENCE ECOSYSTEM</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              REST API: v1.0
            </span>
            {onNavigateEditorialDesk && (
              <button
                onClick={onNavigateEditorialDesk}
                className="text-slate-500 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                Staff Desk
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
