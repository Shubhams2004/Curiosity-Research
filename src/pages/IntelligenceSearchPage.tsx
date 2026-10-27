/**
 * @file IntelligenceSearchPage.tsx
 * Full-scale research query and exploration page for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState } from 'react';
import { searchArticles } from '../data/newsArticles';
import { SCIENTIFIC_DOMAINS } from '../data/categories';
import {
  Search,
  ChevronRight,
  Clock,
  ArrowLeft,
  Building2,
  BookOpen,
  Atom,
} from 'lucide-react';

interface IntelligenceSearchPageProps {
  initialQuery: string;
  onSelectArticle: (slugOrId: string) => void;
  onNavigateHome: () => void;
}

export const IntelligenceSearchPage: React.FC<IntelligenceSearchPageProps> = ({
  initialQuery,
  onSelectArticle,
  onNavigateHome,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allFound = searchArticles(query);
  const filtered = selectedCategory === 'all'
    ? allFound
    : allFound.filter((a) => a.category === selectedCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header & Search Control Strip */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Discovery Feed
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 font-bold uppercase">Research Search</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scientific Research & Paper Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Search peer-reviewed publications, DOIs, research institutions, and authors indexed across Curiosity Research.
          </p>

          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 shadow-xl focus-within:border-cyan-500 transition-colors">
              <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by DOI (e.g., 10.1038/...), paper title, institution, or keywords..."
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
              />
            </div>
          </form>

          {/* Discipline Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 text-xs font-mono">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              All Disciplines
            </button>
            {SCIENTIFIC_DOMAINS.map((d) => (
              <button
                key={d.slug}
                onClick={() => setSelectedCategory(d.slug)}
                className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === d.slug
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {d.nameEnglish}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Results Section */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pt-8 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span>{filtered.length} Publications Matched</span>
          {query && <span>Query: &quot;{query}&quot;</span>}
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.slug || item.id)}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-2"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase text-[10px]">
                    {item.category}
                  </span>
                  {item.doi && (
                    <span className="text-slate-400 text-[11px]">DOI: {item.doi}</span>
                  )}
                  {item.journalName && (
                    <span className="text-amber-300/80 text-[11px] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-400" />
                      {item.journalName} ({item.publicationYear || 2026})
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  {item.primaryInstitution && (
                    <span className="flex items-center gap-1 text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {item.primaryInstitution}
                    </span>
                  )}
                  <span>Investigator: {item.author.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTimeMinutes} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 font-mono text-xs text-slate-400">
            <Atom className="w-10 h-10 text-slate-600 mx-auto" />
            <p>No publications found matching your search query.</p>
          </div>
        )}
      </main>
    </div>
  );
};
