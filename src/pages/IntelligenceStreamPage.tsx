/**
 * @file IntelligenceStreamPage.tsx
 * Primary Science Magazine & Discovery Feed for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { newsService, TimelineStory, BackendSource } from '../services/newsService';
import { ARTICLES, getLeadArticle } from '../data/newsArticles';
import { SCIENTIFIC_DOMAINS, getCategoryBySlug } from '../data/categories';
import { BREAKING_NEWS_ITEMS } from '../data/tickerData';
import {
  Atom,
  Building2,
  BookOpen,
  Globe,
  Filter,
  Search,
  Bookmark,
  Share2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  Info,
  Layers,
  Cpu,
  Telescope,
  Dna,
  Zap,
  TrendingUp,
  Flame,
  Eye,
  BarChart3,
  Tag,
  Activity,
  Crown,
} from 'lucide-react';

interface IntelligenceStreamPageProps {
  onSelectArticle: (slugOrId: string) => void;
  onSelectCategory: (slug: string) => void;
  onNavigateEpaper: () => void;
  onNavigateContact: () => void;
  isBookmarked: (slugOrId: string) => boolean;
  onToggleBookmark: (slugOrId: string) => void;
}

const SOURCE_GROUP_META: Record<
  string,
  { label: string; badgeClass: string; icon: React.ReactNode }
> = {
  'Scientific Journals': {
    label: 'Peer-Reviewed Journal',
    badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/70',
    icon: <BookOpen className="w-3 h-3 text-cyan-400 inline mr-1" />,
  },
  'Indian Research Institutions': {
    label: 'Indian Research Hub',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-800/70',
    icon: <Building2 className="w-3 h-3 text-amber-400 inline mr-1" />,
  },
  'Preprint Repositories': {
    label: 'Open Preprint (arXiv)',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/70',
    icon: <FileText className="w-3 h-3 text-emerald-400 inline mr-1" />,
  },
  'Technology Labs': {
    label: 'Advanced Tech Lab',
    badgeClass: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/70',
    icon: <Cpu className="w-3 h-3 text-indigo-400 inline mr-1" />,
  },
  'Government Sources': {
    label: 'Official Science Mission',
    badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-800/70',
    icon: <Globe className="w-3 h-3 text-sky-400 inline mr-1" />,
  },
};

// Fallback items if API is completely empty
const STATIC_FALLBACK_STORIES: TimelineStory[] = ARTICLES.map((a) => ({
  id: a.id,
  source_id: 'curiosity_research_bureau',
  source_name: a.primaryInstitution || a.author.name || 'Verified Research Group',
  source_group: a.category === 'space' || a.category === 'physics' ? 'Indian Research Institutions' : 'Scientific Journals',
  source_url: a.paperUrl || `#/article/${a.slug}`,
  source_guid: a.slug,
  title: a.title,
  description: a.excerpt,
  content: a.content.join('\n\n'),
  image_url: a.image,
  author: a.author.name,
  published_at: a.publishedAt,
  category: a.category,
  language: a.language || 'en',
  status: 'published',
  created_at: a.publishedAt,
}));

export const IntelligenceStreamPage: React.FC<IntelligenceStreamPageProps> = ({
  onSelectArticle,
  onSelectCategory,
  onNavigateContact,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [stories, setStories] = useState<TimelineStory[]>([]);
  const [activeSources, setActiveSources] = useState<BackendSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'breakthroughs' | 'indian'>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedSourceGroup, setSelectedSourceGroup] = useState<string>('all');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [trendingTab, setTrendingTab] = useState<'categories' | 'tags'>('categories');

  const leadArticle = useMemo(() => getLeadArticle(), []);

  // -------------------------------------------------------------
  // DYNAMIC "TRENDING NOW" COMPUTATION FROM ARTICLE METADATA
  // Aggregates verified reader volume across categories and tags
  // -------------------------------------------------------------
  const { top5Categories, top5Tags, maxCategoryReads, maxTagReads } = useMemo(() => {
    // 1. Category aggregation
    const categoryStats: Record<
      string,
      { totalReads: number; articleCount: number; topArticleTitle: string; topArticleSlug: string }
    > = {};

    // 2. Tag aggregation
    const tagStats: Record<
      string,
      { totalReads: number; articleCount: number; topArticleTitle: string; topArticleSlug: string; primaryCategory: string }
    > = {};

    for (const art of ARTICLES) {
      const views = art.viewsCount || 1000;
      const cat = art.category;

      // Category metrics
      if (!categoryStats[cat]) {
        categoryStats[cat] = {
          totalReads: views,
          articleCount: 1,
          topArticleTitle: art.title,
          topArticleSlug: art.slug || art.id,
        };
      } else {
        categoryStats[cat].totalReads += views;
        categoryStats[cat].articleCount += 1;
        // Keep title of highest-read article
        if (views > (categoryStats[cat].totalReads / categoryStats[cat].articleCount)) {
          categoryStats[cat].topArticleTitle = art.title;
          categoryStats[cat].topArticleSlug = art.slug || art.id;
        }
      }

      // Tag metrics
      if (Array.isArray(art.tags)) {
        for (const rawTag of art.tags) {
          const tag = rawTag.trim();
          if (!tag) continue;
          if (!tagStats[tag]) {
            tagStats[tag] = {
              totalReads: views,
              articleCount: 1,
              topArticleTitle: art.title,
              topArticleSlug: art.slug || art.id,
              primaryCategory: cat,
            };
          } else {
            tagStats[tag].totalReads += views;
            tagStats[tag].articleCount += 1;
          }
        }
      }
    }

    const sortedCategories = Object.entries(categoryStats)
      .map(([slug, data]) => {
        const catInfo = getCategoryBySlug(slug);
        return {
          slug,
          name: catInfo?.nameEnglish || slug.toUpperCase(),
          totalReads: data.totalReads,
          articleCount: data.articleCount,
          topArticleTitle: data.topArticleTitle,
          topArticleSlug: data.topArticleSlug,
          accentColor: catInfo?.accentColor || '#38bdf8',
        };
      })
      .sort((a, b) => b.totalReads - a.totalReads)
      .slice(0, 5);

    const sortedTags = Object.entries(tagStats)
      .map(([tag, data]) => ({
        tag,
        totalReads: data.totalReads,
        articleCount: data.articleCount,
        topArticleTitle: data.topArticleTitle,
        topArticleSlug: data.topArticleSlug,
        primaryCategory: data.primaryCategory,
      }))
      .sort((a, b) => b.totalReads - a.totalReads)
      .slice(0, 5);

    const maxCat = sortedCategories[0]?.totalReads || 1;
    const maxTag = sortedTags[0]?.totalReads || 1;

    return {
      top5Categories: sortedCategories,
      top5Tags: sortedTags,
      maxCategoryReads: maxCat,
      maxTagReads: maxTag,
    };
  }, []);

  const formatReads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [storyResult, sourcesResult] = await Promise.all([
        newsService.fetchTimelineStories({ limit: 40 }),
        newsService.fetchActiveSources(),
      ]);

      if (storyResult.stories && storyResult.stories.length > 0) {
        setStories(storyResult.stories);
      } else {
        setStories(STATIC_FALLBACK_STORIES);
      }

      setActiveSources(sourcesResult);
    } catch {
      setStories(STATIC_FALLBACK_STORIES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCopyDoi = (doi: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(doi);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  // Filtered stories based on discipline, tab, and source group
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // 1. Discipline filter
      if (selectedDiscipline !== 'all' && story.category !== selectedDiscipline) {
        return false;
      }
      // 2. Source group filter
      if (selectedSourceGroup !== 'all' && story.source_group !== selectedSourceGroup) {
        return false;
      }
      // 3. Tab filter
      if (activeTab === 'indian') {
        const titleLower = story.title.toLowerCase();
        const srcLower = (story.source_name || '').toLowerCase();
        const descLower = (story.description || '').toLowerCase();
        const isIndian =
          story.source_group === 'Indian Research Institutions' ||
          story.category === 'indian-innovation' ||
          titleLower.includes('iisc') ||
          titleLower.includes('isro') ||
          titleLower.includes('tifr') ||
          titleLower.includes('iit') ||
          titleLower.includes('ncbs') ||
          srcLower.includes('isro') ||
          srcLower.includes('iisc') ||
          descLower.includes('india') ||
          descLower.includes('bengaluru') ||
          descLower.includes('mumbai');
        return isIndian;
      }
      return true;
    });
  }, [stories, selectedDiscipline, selectedSourceGroup, activeTab]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* 1. Breaking Breakthroughs Ticker Bar */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 lg:px-8 py-2 overflow-hidden flex items-center gap-3">
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-mono font-bold uppercase tracking-wider shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          BREAKTHROUGHS
        </span>
        <div className="overflow-x-auto no-scrollbar flex items-center gap-6 text-xs whitespace-nowrap text-slate-300">
          {BREAKING_NEWS_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectArticle(item.articleSlug)}
              className="hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-cyan-400 font-mono text-[11px]">[{item.timestamp}]</span>
              <span className="text-slate-300 group-hover:underline">{item.title}</span>
              {item.doi && (
                <span className="text-[10px] font-mono text-slate-400">DOI: {item.doi}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-8">
        {/* 2. Platform Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <Atom className="w-4 h-4 text-cyan-400" />
              <span>Open Science & Technology Discovery Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Discover What’s Next.
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Curiosity Research bridges groundbreaking science journalism with primary peer-reviewed literature.
              Tracking discoveries across Space, Quantum Physics, AI, Biotechnology, Medicine, Clean Energy, and Indian Research Institutions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 text-[11px]">Platform Architecture</div>
              <div className="text-white font-bold">Created by Shubham Sonale</div>
              <div className="text-emerald-400 text-[10px] flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                D1 Edge Node • Zero Paywalls
              </div>
            </div>
          </div>
        </div>

        {/* 3. Lead Magazine Feature Dossier */}
        {leadArticle && (
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 lg:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    LANDMARK DISCOVERY
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase">
                    {leadArticle.category}
                  </span>
                  {leadArticle.journalName && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-cyan-400" />
                      {leadArticle.journalName} ({leadArticle.publicationYear || 2026})
                    </span>
                  )}
                </div>

                <h2
                  onClick={() => onSelectArticle(leadArticle.slug)}
                  className="text-2xl sm:text-3xl font-extrabold text-white hover:text-cyan-300 transition-colors cursor-pointer leading-tight"
                >
                  {leadArticle.title}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {leadArticle.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  {leadArticle.primaryInstitution && (
                    <span className="flex items-center gap-1 text-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {leadArticle.primaryInstitution}
                    </span>
                  )}
                  {leadArticle.doi && (
                    <button
                      onClick={(e) => handleCopyDoi(leadArticle.doi!, e)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Click to copy DOI"
                    >
                      <span>DOI: {leadArticle.doi}</span>
                      {copiedDoi === leadArticle.doi ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] text-slate-400">Copy</span>
                      )}
                    </button>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {leadArticle.readTimeMinutes} min read
                  </span>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => onSelectArticle(leadArticle.slug)}
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50"
                  >
                    <span>Read Research Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onToggleBookmark(leadArticle.id)}
                    className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      isBookmarked(leadArticle.id)
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    }`}
                    title="Save to Workstation"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div
                  onClick={() => onSelectArticle(leadArticle.slug)}
                  className="overflow-hidden rounded-xl border border-slate-800 cursor-pointer group"
                >
                  <img
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {leadArticle.imageCaption && (
                    <div className="p-2.5 bg-slate-950/90 text-[11px] text-slate-400 border-t border-slate-800">
                      {leadArticle.imageCaption}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3.5. Trending Now: Top 5 Most-Read Categories & Tags */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-7 shadow-xl space-y-6">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-300">Live Reader Engagement</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">TRENDING NOW</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>Top 5 Most-Read Research Topics</span>
                <Activity className="w-5 h-5 text-cyan-400" />
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                Dynamically ranked by verified reader engagement, citation metrics, and peer-review interest across Curiosity Research.
              </p>
            </div>

            {/* View Mode Toggle: Categories vs Tags */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setTrendingTab('categories')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  trendingTab === 'categories'
                    ? 'bg-cyan-600 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Top Categories</span>
              </button>
              <button
                type="button"
                onClick={() => setTrendingTab('tags')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  trendingTab === 'tags'
                    ? 'bg-cyan-600 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Trending Tags</span>
              </button>
            </div>
          </div>

          {/* Cards Grid: Dynamically displays either Top 5 Categories or Top 5 Tags */}
          {trendingTab === 'categories' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {top5Categories.map((item, index) => {
                const rank = index + 1;
                const percentage = Math.round((item.totalReads / maxCategoryReads) * 100);
                return (
                  <div
                    key={item.slug}
                    onClick={() => onSelectCategory(item.slug)}
                    className="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-cyan-950/30"
                  >
                    <div>
                      {/* Top Meta: Rank & Reads */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                            rank === 1
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : rank === 2
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : rank === 3
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {rank === 1 && <Crown className="w-3 h-3 text-amber-400" />}
                          #{rank}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-bold">{formatReads(item.totalReads)}</span>
                        </div>
                      </div>

                      {/* Category Name */}
                      <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                        {item.name}
                      </h3>

                      {/* Read volume progress bar */}
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden my-2">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Top Story Preview */}
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mt-2">
                        {item.topArticleTitle}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 mt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{item.articleCount} {item.articleCount === 1 ? 'dossier' : 'dossiers'}</span>
                      <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {top5Tags.map((item, index) => {
                const rank = index + 1;
                const percentage = Math.round((item.totalReads / maxTagReads) * 100);
                return (
                  <div
                    key={item.tag}
                    onClick={() => onSelectArticle(item.topArticleSlug)}
                    className="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-amber-950/30"
                  >
                    <div>
                      {/* Top Meta: Rank & Reads */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                            rank === 1
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : rank === 2
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : rank === 3
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {rank === 1 && <Flame className="w-3 h-3 text-amber-400" />}
                          #{rank}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-bold">{formatReads(item.totalReads)}</span>
                        </div>
                      </div>

                      {/* Tag Name */}
                      <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1 font-mono">
                        #{item.tag}
                      </h3>

                      {/* Read volume progress bar */}
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden my-2">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Top Paper Headline */}
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mt-2">
                        {item.topArticleTitle}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 mt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="uppercase text-[10px] text-slate-400">{item.primaryCategory}</span>
                      <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 4. Research Platform Metrics & Indian Innovation Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Primary Research Domains</div>
            <div className="text-lg font-bold text-white mt-1">10 Disciplines</div>
            <div className="text-cyan-400 text-[10px] mt-0.5">Space, Quantum, AI, Bio, Energy</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Indian Institutions Indexed</div>
            <div className="text-lg font-bold text-white mt-1">10 Premier Hubs</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">IISc, TIFR, ISRO, IITs, CSIR</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Verification Pipeline</div>
            <div className="text-lg font-bold text-white mt-1">100% Peer Traced</div>
            <div className="text-amber-400 text-[10px] mt-0.5">DOI & Primary Provenance</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Edge Ingestion Engine</div>
            <div className="text-lg font-bold text-white mt-1">Automated 30M</div>
            <div className="text-sky-400 text-[10px] mt-0.5">Cloudflare D1 SQLite Engine</div>
          </div>
        </div>

        {/* 5. Stream Filter Controls & Navigation Tabs */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            {/* View Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Publications
              </button>
              <button
                onClick={() => setActiveTab('indian')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'indian'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇮🇳 Indian Research Hubs</span>
              </button>
            </div>

            {/* Discipline Dropdown Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                Discipline:
              </span>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="bg-slate-900 text-white text-xs border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
              >
                <option value="all">All Disciplines (10)</option>
                {SCIENTIFIC_DOMAINS.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.nameEnglish}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 6. Research Articles & Papers Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs font-mono space-y-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Fetching peer-reviewed publications from Cloudflare D1...</p>
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => {
              const meta = SOURCE_GROUP_META[story.source_group || ''] || {
                label: 'Verified Research Wire',
                badgeClass: 'bg-slate-900 text-slate-300 border-slate-800',
                icon: <Atom className="w-3 h-3 text-cyan-400 inline mr-1" />,
              };

              const catInfo = getCategoryBySlug(story.category);

              return (
                <article
                  key={story.id}
                  onClick={() => onSelectArticle(story.source_guid || story.id)}
                  className="flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 group shadow-lg"
                >
                  <div>
                    {/* Thumbnail Image */}
                    {story.image_url ? (
                      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                        <img
                          src={story.image_url}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-slate-800">
                            {catInfo?.nameEnglish || story.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-28 w-full bg-gradient-to-r from-slate-950 to-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {catInfo?.nameEnglish || story.category}
                        </span>
                        <Atom className="w-6 h-6 text-slate-700" />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-4 space-y-2">
                      {/* Source & Provenance Badge */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold flex items-center ${meta.badgeClass}`}
                        >
                          {meta.icon}
                          <span className="truncate max-w-[140px]">{story.source_name || meta.label}</span>
                        </span>
                        <span className="text-slate-400">
                          {new Date(story.published_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {story.title}
                      </h3>

                      {/* Excerpt */}
                      {story.description && (
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {story.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-slate-400 text-[11px]">
                        By {story.author || 'Research Team'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(story.id);
                          }}
                          className={`p-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer ${
                            isBookmarked(story.id) ? 'text-cyan-400 font-bold' : 'text-slate-400'
                          }`}
                          title="Save to Workstation"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 text-xs font-mono">
            No research papers found matching the selected filters.
          </div>
        )}

        {/* 7. Dedicated Indian Research Showcase */}
        <section className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-cyan-950/20 border border-amber-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Premier Indian Research Ecosystem</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                IISc, TIFR, ISRO, IITs & CSIR Innovations
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Direct open discovery into India’s scientific breakthroughs, quantum technologies, and aerospace achievements.
              </p>
            </div>
            <button
              onClick={onNavigateContact}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer self-start md:self-auto flex items-center gap-1.5"
            >
              <span>Explore Institutions</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">IISc Bengaluru</div>
              <div className="text-white text-xs">Topological Kagome Crystal</div>
              <div className="text-[11px] text-slate-400">Condensed Matter Physics</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">ISRO & IIA</div>
              <div className="text-white text-xs">Aditya-L1 Heliosphere Shock</div>
              <div className="text-[11px] text-slate-400">Deep Space & Solar Corona</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">TIFR & TMC Mumbai</div>
              <div className="text-white text-xs">NexCAR-19B Immunotherapy</div>
              <div className="text-[11px] text-slate-400">CAR-T Complete Remission</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">IIT Bombay & IIT Madras</div>
              <div className="text-white text-xs">Seawater Hydrogen & GeoBio AI</div>
              <div className="text-[11px] text-slate-400">Clean Energy & Deep Tech</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
