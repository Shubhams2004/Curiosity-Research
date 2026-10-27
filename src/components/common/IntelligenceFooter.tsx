/**
 * @file IntelligenceFooter.tsx
 * Footer component for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React from 'react';
import { SCIENTIFIC_DOMAINS } from '../../data/categories';
import {
  Atom,
  Building2,
  ExternalLink,
  ShieldCheck,
  Compass,
  FileText,
  Lock,
  ArrowUpRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateEpaper: () => void;
  onNavigateEditorialDesk?: () => void;
}

export const IntelligenceFooter: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  onNavigateEpaper,
  onNavigateEditorialDesk,
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-300 pt-12 pb-8 px-4 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Platform Identity & Creator Attribution */}
        <div className="space-y-4">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/30">
              <Atom className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                CURIOSITY RESEARCH
              </span>
              <p className="text-[11px] font-mono text-cyan-400">Discover What’s Next.</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Curiosity Research is an open science, research, and emerging technology discovery platform.
            We index peer-reviewed publications, track scientific breakthroughs in real-time, and spotlight
            landmark research emerging from premier Indian and global institutions.
          </p>

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-400">System Architect & Creator:</div>
            <div className="text-cyan-300 font-bold text-sm">Shubham Sonale</div>
            <div className="text-[11px] text-slate-400">shubhamsonale2004@gmail.com</div>
          </div>
        </div>

        {/* Col 2: Scientific Disciplines */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Research Disciplines
          </h4>
          <ul className="space-y-1.5 text-xs">
            {SCIENTIFIC_DOMAINS.slice(0, 7).map((d) => (
              <li key={d.slug}>
                <button
                  onClick={() => onSelectCategory(d.slug)}
                  className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center gap-2 cursor-pointer text-left"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: d.accentColor }}
                  />
                  <span>{d.nameEnglish}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Research Hubs & Institutions */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            Premier Institutions
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>IISc Bengaluru (Indian Inst. of Science)</span>
                <span className="text-[10px] text-cyan-400 font-mono">India</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>TIFR Mumbai (Fundamental Research)</span>
                <span className="text-[10px] text-cyan-400 font-mono">India</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>ISRO (Space Research Organisation)</span>
                <span className="text-[10px] text-cyan-400 font-mono">India</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>IIT Bombay & IIT Madras</span>
                <span className="text-[10px] text-cyan-400 font-mono">India</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>NCBS Bengaluru & CSIR-NCL Pune</span>
                <span className="text-[10px] text-cyan-400 font-mono">India</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>CERN Geneva & MIT Cambridge</span>
                <span className="text-[10px] text-slate-500 font-mono">Global</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform Architecture & Open Science */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Open Science & Standards
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={onNavigateAbout}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>Verification Standards & Methodology</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateEpaper}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Monthly Research Compendiums</span>
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateContact}
                className="hover:text-cyan-300 transition-colors text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3 h-3 text-cyan-400" />
                <span>Verified Scientific Feeds Directory</span>
              </button>
            </li>
            {onNavigateEditorialDesk && (
              <li className="pt-2 border-t border-slate-800">
                <button
                  onClick={onNavigateEditorialDesk}
                  className="hover:text-amber-300 transition-colors text-amber-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Peer-Review & Editorial Newsroom</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Infrastructure */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          © 2024–2026 <strong className="text-slate-200">Curiosity Research</strong>. Discover What’s Next.
          Platform Architected & Created by <strong className="text-cyan-300">Shubham Sonale</strong>.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Cloudflare Workers + D1 Edge</span>
          <span>•</span>
          <span>Zero Paid API Dependencies</span>
          <span>•</span>
          <span>Open Science Protocol</span>
        </div>
      </div>
    </footer>
  );
};
