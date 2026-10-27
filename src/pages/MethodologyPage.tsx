/**
 * @file MethodologyPage.tsx
 * Architecture, Verification Standards & Creator Attribution for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Building2,
  Atom,
  CheckCircle2,
  Sparkles,
  Lock,
  ExternalLink,
  Code2,
  Server,
  Layers,
  FileText,
  Mail,
  User,
  Cpu,
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
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Feed</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Platform Methodology & Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Curiosity Research
            </h1>
            <p className="text-cyan-400 text-base font-mono font-bold mt-1">
              Discover What’s Next.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-8 space-y-12">
        {/* 1. Creator Attribution Card */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">Platform Creator & Lead Architect</div>
                <h2 className="text-xl font-bold text-white">Shubham Sonale</h2>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a
                href="mailto:shubhamsonale2004@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                shubhamsonale2004@gmail.com
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Curiosity Research was conceptualized, designed, and architected by <strong>Shubham Sonale</strong> with a foundational conviction: scientific breakthroughs should not be trapped behind corporate paywalls, sensationalized by algorithmic clickbait, or severed from their primary peer-reviewed literature.
          </p>
        </section>

        {/* 2. Platform Vision & The 5 Pillars */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>The Five Pillars</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Engineering Open Scientific Discovery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                1. Premium Science & Technology Magazine
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Deep investigative scientific journalism that transforms complex experimental datasets into accessible, high-fidelity narratives without diluting technical precision.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                2. Research Explorer for Papers & DOIs
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Every publication is anchored to a permanent Digital Object Identifier (DOI), allowing readers to inspect original methodology, citations, and journal provenance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                3. Real-Time Breakthrough Discovery Feed
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Automated 30-minute ingestion across global wire sources (Nature, Science, arXiv, Phys.org) with cryptographic SHA-256 deduplication and edge caching.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                4. Multi-Domain Topic Exploration
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Systematic categorization across 10 disciplines: Space & Astrophysics, Quantum & Physics, AI & Computing, Biology & Genomics, Medicine, Clean Energy, Robotics, and Advanced Engineering.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 md:col-span-2 space-y-2">
              <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                5. Premier Indian Research Institutions & Innovation
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Dedicated spotlight on indigenous breakthroughs emerging from the Indian Institute of Science (IISc), Tata Institute of Fundamental Research (TIFR), ISRO, IITs, and CSIR laboratories.
              </p>
            </div>
          </div>
        </section>

        {/* 3. System Architecture & Technical Specifications */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Architecture & Data Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Edge Distributed Infrastructure</h2>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">1. Edge Compute & Storage (Cloudflare Workers + D1 SQLite)</div>
              <p className="text-slate-400 font-sans leading-relaxed">
                The entire API runtime executes within milliseconds on Cloudflare Workers edge nodes globally. Primary storage resides in Cloudflare D1 (relational serverless SQLite), enabling low-latency queries with zero cold starts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">2. Zero Paid API Dependencies & Deterministic Classifier</div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Curiosity Research does not rely on costly external commercial AI APIs. Articles and publications are deterministically classified using open keyword heuristics and metadata inspection, ensuring 100% predictable, reproducible performance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">3. Multi-Tier Provenance Tracking & Cryptographic Deduplication</div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Every incoming RSS/Atom item undergoes SHA-256 content hashing (`title|source_url`). Stale unedited records older than 14 days are systematically archived, preserving database agility while preventing noise accumulation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">4. Strict Security & Editorial Role Isolation</div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Public read endpoints (/api/news) only serve status = &apos;published&apos; records. Unpublished incoming papers (status = &apos;incoming&apos;, &apos;review&apos;, &apos;rejected&apos;) are strictly isolated behind cryptographic HMAC admin authentication with HttpOnly session cookies.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Contact & Inquiries */}
        <section className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-white font-bold">Research Collaborations & Institution Indexing</div>
            <div className="text-slate-400">
              Submit laboratory publications or request institution partnership.
            </div>
          </div>

          <button
            onClick={onNavigateContact}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>View Institutions Directory</span>
          </button>
        </section>
      </div>
    </div>
  );
};
