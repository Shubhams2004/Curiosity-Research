/**
 * @file MethodologyPage.tsx
 * Architecture, Verification Standards & Methodology for Samvad Intel.
 * Replaces the conventional newspaper AboutPage:
 * - Edge architecture breakdown (Cloudflare Workers, D1 distributed SQL, Cron triggers)
 * - Ingestion & verification lifecycle (Incoming -> Review -> Approved -> Published)
 * - Anti-hallucination & cryptographic hash deduplication standards
 * - Language intelligence philosophy (Marathi, Hindi, English)
 */

import React from 'react';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  Lock,
  ArrowLeft,
  Terminal,
  Activity,
  FileCheck,
  Sparkles,
} from 'lucide-react';

interface MethodologyPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header Banner */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Intelligence Stream
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 uppercase font-bold">Methodology & Architecture</span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono-code uppercase font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              SYSTEM METHODOLOGY SPECIFICATION
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Platform Architecture & Verification Standards
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Samvad Intel is an open information intelligence engine engineered to solve information disorder, wire fragmentation, and language silos across Indian governance and regional developments.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Documentation Sections */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-10 space-y-8 font-sans">
        {/* Core Pillar 1: Edge Pipeline */}
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edge-Native Serverless Infrastructure</h2>
              <p className="text-xs font-mono-code text-slate-400">Zero-cold-start execution on Cloudflare Workers</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The platform executes on Cloudflare Workers at edge nodes in proximity to South Asian telecommunications hubs. Data queries leverage Cloudflare D1—a distributed SQLite edge database with low latency read replication and serialized write safety.
          </p>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono-code text-slate-400 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-slate-600 block">DB ENGINE</span>
              <span className="text-white font-bold">Cloudflare D1</span>
            </div>
            <div>
              <span className="text-slate-600 block">CRON CADENCE</span>
              <span className="text-white font-bold">*/30 Minutes</span>
            </div>
            <div>
              <span className="text-slate-600 block">INGESTION MODE</span>
              <span className="text-emerald-400 font-bold">Isolated Staging</span>
            </div>
            <div>
              <span className="text-slate-600 block">SECURITY</span>
              <span className="text-cyan-400 font-bold">HttpOnly Sessions</span>
            </div>
          </div>
        </div>

        {/* Core Pillar 2: Editorial Lifecycle */}
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Editorial Lifecycle & Anti-Slop Protocol</h2>
              <p className="text-xs font-mono-code text-slate-400">Strict separation between raw RSS wires and verified intelligence</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unlike unfiltered RSS warehouses that publish raw feeds indiscriminately, Samvad Intel enforces a strict multi-tier editorial lifecycle:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono-code">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">01. INCOMING</span>
              <p className="text-[11px] text-slate-400">Automated ingestion from authenticated government and wire feeds.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">02. REVIEW</span>
              <p className="text-[11px] text-slate-400">Verification of facts, original wire integrity check, and language check.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">03. APPROVE</span>
              <p className="text-[11px] text-slate-400">Editorial sign-off; preparation of structured analytical summaries.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">04. PUBLISH</span>
              <p className="text-[11px] text-slate-400">Public release to the intelligence stream and topic dossiers.</p>
            </div>
          </div>
        </div>

        {/* Core Pillar 3: Deduplication & Source Provenance */}
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cryptographic Deduplication & Retention</h2>
              <p className="text-xs font-mono-code text-slate-400">SHA-256 wire hashing and non-destructive archival</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every incoming wire article is processed through a SHA-256 canonical hashing function covering normalized titles and descriptions. Identical or republished stories across wire syndicates are automatically flagged to prevent database bloat. Furthermore, unreviewed staging wires older than 14 days are cleanly archived while published records remain permanently preserved.
          </p>
        </div>

        {/* Core Pillar 4: Engineering Leadership & Creator Attribution */}
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Platform Creator & System Architect</h2>
              <p className="text-xs font-mono-code text-slate-400">Engineering direction & research platform design</p>
            </div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Shubham Sonale</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CREATOR & LEAD ARCHITECT
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                Conceived and engineered Samvad Intel as an open, verifiable intelligence architecture to unify regional vernacular journalism, verified government gazettes, and multi-source investigative research.
              </p>
            </div>
            <div className="text-xs font-mono-code text-slate-500 shrink-0">
              <span className="block text-slate-400">RESEARCH PLATFORM</span>
              <span className="text-cyan-400">v1.2 Production Release</span>
            </div>
          </div>
        </div>

        {/* Transparency Callout */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Source Disclosure Directory</h3>
            <p className="text-xs text-slate-400">
              Review our complete directory of active government feeds, national news wires, and regional correspondents.
            </p>
          </div>
          <button
            onClick={onNavigateContact}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-mono-code font-bold cursor-pointer transition-colors shrink-0"
          >
            Open Source Directory →
          </button>
        </div>
      </main>
    </div>
  );
};
