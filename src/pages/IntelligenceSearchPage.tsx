/**
 * @file IntelligenceSearchPage.tsx
 * Full-scale research query and exploration page for Samvad Intel.
 */

import React, { useState } from 'react';
import { searchArticles } from '../data/newsArticles';
import { ALL_CATEGORIES } from '../data/categories';
import {
  Search,
  ChevronRight,
  Clock,
  ArrowLeft,
  Filter,
  Layers,
  Building2,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
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

  const filtered = searchArticles(query, selectedCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header & Search Control Strip */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Intelligence Stream
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 font-bold uppercase">Research Query</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Information Intelligence Query Engine
          </h1>

          {/* Form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-2xl pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-cyan-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dossiers, sources, topics, legislative acts..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 text-white rounded-xl text-sm focus:outline-none focus:border-cyan-400 font-sans shadow-inner placeholder-slate-500"
              />
            </div>
          </form>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 text-xs font-mono-code">
            <span className="text-slate-500 text-[11px] uppercase mr-1">Filter Domain:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Domains
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.nameEnglish}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Query Results */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pt-8">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 pb-4 border-b border-slate-800/80 mb-6">
          <span>
            Matched <span className="text-white font-bold">{filtered.length}</span> research dossiers
          </span>
          {query && (
            <span className="text-slate-500">
              Query: &quot;<span className="text-cyan-400">{query}</span>&quot;
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 space-y-3">
            <Search className="w-8 h-8 text-cyan-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Intelligence Records</h3>
            <p className="text-xs max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any published dossiers matching your query. Try broadening your terms or switching domains.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.slug || item.id)}
                className="p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 uppercase font-bold text-[10px]">
                      {item.category}
                    </span>
                    <span className="text-slate-300 font-semibold">{item.author.name}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-400 font-editorial leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono-code text-slate-500">
                  <span className="text-[11px]">LANG: {(item.language || 'mr').toUpperCase()}</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                    Examine Dossier →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
