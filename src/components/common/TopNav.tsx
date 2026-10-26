/**
 * @file TopNav.tsx
 * High-performance, clean intelligence platform navigation header for Samvad Intel.
 * Features:
 * - Real-time system status indicators (Edge D1 status, Verified wire, Ingestion sync)
 * - Quick search shortcut (Cmd+K / Ctrl+K)
 * - Topic exploration & dossier filters
 * - Source Transparency Directory link
 * - Workspace / Editorial link with security indicator
 * - Language filter & Reading / Theme controls
 */

import React, { useState, useEffect } from 'react';
import { ALL_CATEGORIES } from '../../data/categories';
import { FontSizeOption } from '../../utils/readingPreferences';
import { ThemeMode } from '../../types/news';
import {
  Search,
  Bookmark,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  Activity,
  Layers,
  Database,
  Globe2,
  FileText,
  Compass,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';

interface TopNavProps {
  currentCategorySlug?: string;
  isArticlePage?: boolean;
  onSelectCategory: (slug: string) => void;
  onOpenSearch: () => void;
  onNavigateHome: () => void;
  onNavigateBookmarks: () => void;
  onNavigateTimeline?: () => void;
  onNavigateEditorial?: () => void;
  onNavigateEditorialDesk?: () => void;
  onNavigateEpaper: () => void; // Used for "Intelligence Briefings & Reports"
  onNavigateAbout: () => void;  // Used for "Methodology & Architecture"
  onNavigateContact: () => void;// Used for "Source Disclosure & Contact"
  fontSize: FontSizeOption;
  onChangeFontSize: (size: FontSizeOption) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  bookmarksCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentCategorySlug,
  isArticlePage = false,
  onSelectCategory,
  onOpenSearch,
  onNavigateHome,
  onNavigateBookmarks,
  onNavigateEditorial,
  onNavigateEditorialDesk,
  onNavigateEpaper,
  onNavigateAbout,
  onNavigateContact,
  fontSize,
  onChangeFontSize,
  theme,
  onToggleTheme,
  bookmarksCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 40 && currentY > lastScrollY) {
        setIsScrolledDown(true);
      } else if (currentY < lastScrollY - 15 || currentY <= 20) {
        setIsScrolledDown(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Keyboard shortcut listener for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const isCompact = isArticlePage || isScrolledDown;

  return (
    <header className="w-full bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-md text-slate-200 border-b border-slate-800/80 sticky top-0 z-40 transition-all duration-200">
      {/* 1. Global Utility & Telemetry Status Bar (Collapsed in compact mode) */}
      {!isCompact && (
        <div className="hidden md:flex items-center justify-between px-4 lg:px-8 py-1.5 bg-slate-900/60 border-b border-slate-800/50 text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              EDGE NODE: ASIA-SOUTH1
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Database className="w-3 h-3 text-cyan-400" />
              D1 CLUSTER: VERIFIED
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">INGESTION: CRON 30M ACTIVE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateAbout}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Methodology & Sources
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onNavigateEpaper}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              Intelligence Briefings
            </button>
            <span className="text-slate-600">|</span>
            {onNavigateEditorialDesk && (
              <button
                onClick={onNavigateEditorialDesk}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 text-slate-400 hover:text-amber-200 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                Editorial Desk
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Platform Header Bar */}
      <div className={`px-4 lg:px-8 mx-auto flex items-center justify-between gap-3 transition-all ${
        isCompact ? 'h-13' : 'h-15'
      }`}>
        {/* Left: Product Identity & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          {isArticlePage && (
            <button
              onClick={onNavigateHome}
              className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer mr-1"
              title="Return to Intelligence Stream"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* Visual Brand Mark */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/30 group-hover:border-cyan-300 transition-all">
              <Activity className="w-4 h-4 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  SAMVAD
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  INTEL
                </span>
              </div>
              {!isCompact && (
                <p className="text-[10px] text-slate-400 tracking-wider font-mono-code -mt-0.5 hidden sm:block">
                  INFORMATION INTELLIGENCE & RESEARCH
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Center: Search & Topic Quick Filters (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 max-w-md w-full mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono-code transition-all cursor-pointer shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Query intelligence, sources, topics...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Font control, Theme, Dossier / Bookmarks, Mobile Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search on Mobile */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Saved Dossiers / Bookmarks */}
          <button
            onClick={onNavigateBookmarks}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            title="Saved Dossiers"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Dossier</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-code font-bold bg-cyan-600 text-white">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Reading Font Size Toggle */}
          <div className="hidden sm:flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5 text-xs font-mono-code">
            <button
              onClick={() => onChangeFontSize('sm')}
              className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                fontSize === 'sm' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800/80' : 'text-slate-400 hover:text-white'
              }`}
              title="Compact typography"
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('md')}
              className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                fontSize === 'md' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800/80' : 'text-slate-400 hover:text-white'
              }`}
              title="Standard typography"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('lg')}
              className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                fontSize === 'lg' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800/80' : 'text-slate-400 hover:text-white'
              }`}
              title="Enlarged typography"
            >
              A+
            </button>
          </div>

          {/* Theme Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {/* Mobile Navigation Drawer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Topic Exploration Filter Strip (Horizontally Scrollable) */}
      {!isArticlePage && (
        <div className="bg-slate-950 border-t border-slate-900 px-4 lg:px-8 py-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max text-xs">
            <span className="flex items-center gap-1 text-[11px] font-mono-code uppercase text-slate-500 mr-2">
              <Compass className="w-3 h-3 text-cyan-400" />
              Topics:
            </span>

            <button
              onClick={() => onSelectCategory('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                !currentCategorySlug || currentCategorySlug === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              Live Intelligence (All)
            </button>

            {ALL_CATEGORIES.map((cat) => {
              const isActive = currentCategorySlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.nameEnglish}</span>
                  <span className="text-[10px] opacity-70">({cat.nameMarathi})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <p className="text-[10px] font-mono-code uppercase text-slate-400 px-2 pb-1">
              Platform Views
            </p>
            <button
              onClick={() => {
                onNavigateHome();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live Intelligence Stream
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => {
                onNavigateBookmarks();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-cyan-400" />
                Saved Research Dossiers
              </span>
              <span className="text-xs font-mono-code text-cyan-400 font-bold">{bookmarksCount}</span>
            </button>
            <button
              onClick={() => {
                onNavigateEpaper();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Periodic Intelligence Briefings
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => {
                onNavigateAbout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Methodology & Verification Framework
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => {
                onNavigateContact();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-400" />
                Source Transparency & Disclosure
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-900 space-y-2">
            <p className="text-[10px] font-mono-code uppercase text-slate-400 px-2">
              Topic Taxonomy
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded bg-slate-900 text-left text-xs text-slate-300 hover:text-white border border-slate-800"
                >
                  <span className="font-semibold">{cat.nameEnglish}</span>
                  <span className="block text-[10px] text-slate-500">{cat.nameMarathi}</span>
                </button>
              ))}
            </div>
          </div>

          {onNavigateEditorialDesk && (
            <div className="pt-3 border-t border-slate-900">
              <button
                onClick={() => {
                  onNavigateEditorialDesk();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-xs font-mono-code text-amber-400 bg-amber-950/30 border border-amber-900/50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  Restricted Editorial Desk
                </span>
                <span className="text-[10px] uppercase font-bold">Staff Access</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
