/**
 * @file TopNav.tsx
 * Navigation header for Curiosity Research - Global Science & Technology Discovery Platform.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useEffect } from 'react';
import { SCIENTIFIC_DOMAINS } from '../../data/categories';
import { FontSizeOption } from '../../utils/readingPreferences';
import { ThemeMode } from '../../types/news';
import {
  Search,
  Bookmark,
  Menu,
  X,
  Sun,
  Moon,
  Atom,
  Building2,
  Compass,
  ArrowLeft,
  ChevronDown,
  Lock,
  Layers,
  Sparkles,
  BookOpen,
  Info,
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
  onNavigateEpaper: () => void; // Used for "Monthly Research Briefings"
  onNavigateAbout: () => void;  // Used for "About & Methodology"
  onNavigateContact: () => void;// Used for "Institutions & Sources Directory"
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
  const [isDisciplinesOpen, setIsDisciplinesOpen] = useState(false);
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
    <header className="w-full bg-slate-950/95 backdrop-blur-md text-slate-200 border-b border-slate-800/80 sticky top-0 z-40 transition-all duration-200">
      {/* 1. Global Science Platform Bar */}
      {!isCompact && (
        <div className="hidden md:flex items-center justify-between px-4 lg:px-8 py-1.5 bg-slate-900/70 border-b border-slate-800/60 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              CURIOSITY RESEARCH
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-300 italic">Discover What’s Next.</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">
              Platform by <strong className="text-slate-200 font-medium">Shubham Sonale</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateContact}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Building2 className="w-3 h-3 text-cyan-400" />
              Institutions & Sources
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onNavigateEpaper}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              Monthly Briefings
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onNavigateAbout}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3 h-3 text-emerald-400" />
              About & Methodology
            </button>
            <span className="text-slate-700">|</span>
            {onNavigateEditorialDesk && (
              <button
                onClick={onNavigateEditorialDesk}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 text-slate-400 hover:text-amber-200 cursor-pointer"
                title="Peer-Review & Publishing Newsroom"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                Editorial Desk
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Platform Header Bar */}
      <div
        className={`px-4 lg:px-8 mx-auto flex items-center justify-between gap-3 transition-all ${
          isCompact ? 'h-13' : 'h-16'
        }`}
      >
        {/* Left: Product Identity & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          {isArticlePage && (
            <button
              onClick={onNavigateHome}
              className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer mr-1"
              title="Return to Discovery Feed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* Visual Brand Mark */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/30 group-hover:border-cyan-300 transition-all">
              <Atom className="w-4.5 h-4.5 text-white animate-spin-slow" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  CURIOSITY
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  RESEARCH
                </span>
              </div>
              {!isCompact && (
                <p className="text-[10px] text-slate-400 tracking-wider font-mono -mt-0.5 hidden sm:block">
                  DISCOVER WHAT’S NEXT • GLOBAL SCIENCE & TECH
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Center: Search & Navigation Tabs (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl mx-4">
          <button
            onClick={onOpenSearch}
            className="flex-1 flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono transition-all cursor-pointer shadow-inner"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Search papers, DOIs, institutions, topics...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 shrink-0 ml-2">
              ⌘K
            </kbd>
          </button>

          {/* Quick Nav Links */}
          <nav className="flex items-center gap-1 text-xs font-medium text-slate-300 shrink-0">
            <button
              onClick={onNavigateHome}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                !currentCategorySlug
                  ? 'bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20'
                  : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              Feed
            </button>

            <button
              onClick={onNavigateContact}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
            >
              Institutions
            </button>

            {/* Disciplines dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDisciplinesOpen(!isDisciplinesOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                <span>Disciplines</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isDisciplinesOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-xl shadow-2xl p-2 z-50 grid grid-cols-1 gap-1"
                  onMouseLeave={() => setIsDisciplinesOpen(false)}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                    Research Disciplines
                  </div>
                  {SCIENTIFIC_DOMAINS.map((domain) => (
                    <button
                      key={domain.slug}
                      onClick={() => {
                        onSelectCategory(domain.slug);
                        setIsDisciplinesOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="text-slate-300 group-hover:text-cyan-300">
                        {domain.nameEnglish}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: domain.accentColor }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right: Actions, Font control, Theme, Workstation, Mobile Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search on Mobile */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Research Workstation / Saved Papers */}
          <button
            onClick={onNavigateBookmarks}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            title="Personal Research Workstation"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Workstation</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-cyan-600 text-white">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Font Size Adjuster (sm / md / lg) */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => onChangeFontSize('sm')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                fontSize === 'sm'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('md')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                fontSize === 'md'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Normal text"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('lg')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                fontSize === 'lg'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-300 hover:text-amber-300 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Horizontal Scientific Domains Scrollbar */}
      <div className="w-full bg-slate-950/90 border-t border-slate-900 px-4 lg:px-8 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs whitespace-nowrap">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
            !currentCategorySlug || currentCategorySlug === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          All Breakthroughs
        </button>

        {SCIENTIFIC_DOMAINS.map((cat) => {
          const isActive = currentCategorySlug === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.accentColor }}
              />
              <span>{cat.nameEnglish}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-auto bg-slate-950/98 border-b border-slate-800 p-4 max-h-[85vh] overflow-y-auto z-50 shadow-2xl backdrop-blur-xl">
          <div className="space-y-4">
            {/* Quick creator info */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">Curiosity Research</div>
              <div className="text-cyan-400 text-[11px] mb-1">Discover What’s Next.</div>
              <div className="text-slate-400 text-[11px]">
                Created by <strong className="text-slate-200">Shubham Sonale</strong>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 text-sm font-medium">
              <button
                onClick={() => {
                  onNavigateHome();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                Discovery Magazine & Feed
              </button>

              <button
                onClick={() => {
                  onNavigateContact();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                Research Institutions & Sources
              </button>

              <button
                onClick={() => {
                  onNavigateBookmarks();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-cyan-400" />
                  Personal Workstation
                </span>
                {bookmarksCount > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-600 text-white font-mono">
                    {bookmarksCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onNavigateEpaper();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                Monthly Research Briefings
              </button>

              <button
                onClick={() => {
                  onNavigateAbout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <Info className="w-4 h-4 text-emerald-400" />
                About & Methodology
              </button>

              {onNavigateEditorialDesk && (
                <button
                  onClick={() => {
                    onNavigateEditorialDesk();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-amber-300 flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  Editorial Desk (Publishing Pipeline)
                </button>
              )}
            </div>

            {/* Mobile Disciplines Grid */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Disciplines
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SCIENTIFIC_DOMAINS.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.accentColor }}
                    />
                    <span className="truncate">{cat.nameEnglish}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
