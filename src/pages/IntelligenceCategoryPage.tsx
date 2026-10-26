/**
 * @file IntelligenceCategoryPage.tsx
 * Domain Topic Exploration Page for Samvad Intel.
 * Features:
 * - Direct D1 live feed for specific category / topic domain
 * - Statistical breakdowns & topic metadata
 * - Source and language filtering within the domain
 * - Fast transitions to full research dossiers
 */

import React, { useState, useEffect } from 'react';
import { getCategoryBySlug } from '../data/categories';
import { getArticlesByCategory, ARTICLES } from '../data/newsArticles';
import { newsService } from '../services/newsService';
import { Article } from '../types/news';
import {
  ChevronRight,
  Clock,
  ArrowLeft,
  Building2,
  Compass,
  Filter,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface IntelligenceCategoryPageProps {
  slug: string;
  onSelectArticle: (slugOrId: string) => void;
  onNavigateHome: () => void;
}

export const IntelligenceCategoryPage: React.FC<IntelligenceCategoryPageProps> = ({
  slug,
  onSelectArticle,
  onNavigateHome,
}) => {
  const category = getCategoryBySlug(slug);
  const [filterLang, setFilterLang] = useState<'all' | 'mr' | 'hi' | 'en'>('all');
  const [liveArticles, setLiveArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    if (category) {
      newsService
        .fetchPublishedFromApi(category.slug, 30)
        .then((articles) => {
          if (isMounted) {
            if (articles && articles.length > 0) {
              setLiveArticles(articles);
            } else {
              setLiveArticles(null);
            }
          }
        })
        .catch(() => {
          if (isMounted) setLiveArticles(null);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-2xl font-bold text-white mb-2">Topic Domain Not Found</h1>
        <p className="text-sm text-slate-400 mb-6">
          The requested intelligence domain does not exist or has been relocated.
        </p>
        <button
          onClick={onNavigateHome}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-code text-xs font-bold rounded-lg cursor-pointer transition-colors"
        >
          Return to Intelligence Stream
        </button>
      </div>
    );
  }

  // Fallback to local data if live API returns null/empty
  const rawArticles = liveArticles || getArticlesByCategory(category.slug);
  const articles = rawArticles.filter((a) => {
    if (filterLang === 'all') return true;
    return (a.language || 'mr').toLowerCase() === filterLang;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header Banner with Topic Metadata */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Intelligence Stream
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 uppercase font-bold">{category.nameEnglish}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-mono-code text-xs uppercase font-bold">
                  INTELLIGENCE DOMAIN
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  {category.nameMarathi}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {category.nameEnglish} Research Dossiers
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Language filter for domain */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono-code shrink-0">
              <span className="text-slate-500 px-2 text-[11px] uppercase">Language:</span>
              <button
                onClick={() => setFilterLang('all')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLang === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLang('mr')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLang === 'mr' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setFilterLang('hi')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLang === 'hi' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setFilterLang('en')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLang === 'en' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grid of Dossiers */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        {loading ? (
          <div className="py-20 text-center font-mono-code text-xs text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Scanning domain records on edge D1 cluster...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 space-y-3 max-w-lg mx-auto">
            <Layers className="w-8 h-8 text-cyan-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No Dossiers In This Language Filter</h3>
            <p className="text-xs leading-relaxed">
              No verified records currently match the selected language filter for this topic domain.
            </p>
            <button
              onClick={() => setFilterLang('all')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono-code rounded-lg transition-colors cursor-pointer"
            >
              Show All Languages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug || article.id)}
                className="p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                    <span className="text-slate-400 font-semibold truncate max-w-[150px]">
                      {article.author.name}
                    </span>
                    <span className="text-slate-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-editorial leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[11px] text-slate-500 uppercase">
                    LANG: {(article.language || 'mr').toUpperCase()}
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                    Examine <ChevronRight className="w-3.5 h-3.5" />
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
