/**
 * @file IntelligenceSearchModal.tsx
 * High-performance scientific paper & research discovery search modal for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useEffect, useRef } from 'react';
import { SCIENTIFIC_DOMAINS } from '../../data/categories';
import { newsService } from '../../services/newsService';
import { Article } from '../../types/news';
import {
  Search,
  X,
  ArrowRight,
  Atom,
  Building2,
  BookOpen,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface IntelligenceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slugOrId: string) => void;
  onViewAllResults: (query: string) => void;
}

export const IntelligenceSearchModal: React.FC<IntelligenceSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const found = await newsService.search(
          query,
          selectedCategory === 'all' ? undefined : selectedCategory
        );
        setResults(found.slice(0, 8));
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onViewAllResults(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scientific papers, DOIs (e.g. 10.1038/...), institutions, authors, disciplines..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-slate-300 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded text-xs font-mono transition-colors cursor-pointer"
          >
            ESC
          </button>
        </form>

        {/* Discipline Filters */}
        <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-mono text-slate-500 mr-1 uppercase">Discipline:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          {SCIENTIFIC_DOMAINS.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.nameEnglish}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-2">
          {isSearching ? (
            <div className="py-10 text-center text-slate-400 text-xs font-mono">
              <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Scanning research database & paper registry...
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectArticle(item.slug || item.id);
                  onClose();
                }}
                className="p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-lg cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase">
                      {item.category}
                    </span>
                    {item.doi && (
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        DOI: {item.doi}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                  {item.primaryInstitution && (
                    <span className="flex items-center gap-1 text-slate-300">
                      <Building2 className="w-3 h-3 text-cyan-400" />
                      {item.primaryInstitution}
                    </span>
                  )}
                  {item.journalName && (
                    <span className="flex items-center gap-1 text-amber-300/80">
                      <BookOpen className="w-3 h-3 text-amber-400" />
                      {item.journalName}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : query.trim() ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching research papers or articles found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="py-8 px-4 text-center space-y-3">
              <p className="text-xs font-mono text-slate-400 uppercase">Suggested Research Queries</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  'Aditya-L1 Heliosphere',
                  'IISc Kagome Superlattice',
                  'IIT Madras Molecular AI',
                  'NCBS Epigenetics',
                  'IIT Bombay Seawater Hydrogen',
                  'TIFR CAR-T Immunotherapy',
                  'Quantum Entanglement RRI',
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setQuery(sample)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {results.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{results.length} scientific publications found</span>
            <button
              onClick={handleSubmit}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>View All Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
