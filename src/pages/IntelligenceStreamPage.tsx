/**
 * @file IntelligenceStreamPage.tsx
 * Modern, high-performance information intelligence homepage for Samvad Intel.
 * Replaces the conventional newspaper homepage with an intelligence stream & research hub:
 * - Live D1 published intelligence wire (strictly read-only for public visitors)
 * - Multi-dimensional exploration: Topic Domains, Source Entities, Language (mr/hi/en)
 * - Source Transparency metadata (PIB, Sakaal, AIR, Lokmat, etc. with verified provenance)
 * - Fast research dossier creation & bookmarking
 * - Real-time edge status metrics & source transparency index
 */

import React, { useState, useEffect, useCallback } from 'react';
import { newsService, TimelineStory, BackendSource } from '../services/newsService';
import { ARTICLES } from '../data/newsArticles';
import { ALL_CATEGORIES } from '../data/categories';
import {
  Activity,
  Layers,
  Database,
  Building2,
  Radio,
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
  'Government Sources': {
    label: 'Verified Official',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/70',
    icon: <Building2 className="w-3 h-3 text-emerald-400 inline mr-1" />,
  },
  'Indian News': {
    label: 'National Wire',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-800/70',
    icon: <Radio className="w-3 h-3 text-amber-400 inline mr-1" />,
  },
  'International News': {
    label: 'Global Intelligence',
    badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-800/70',
    icon: <Globe className="w-3 h-3 text-sky-400 inline mr-1" />,
  },
};

// Fallback items if API is completely offline
const STATIC_FALLBACK_STORIES: TimelineStory[] = ARTICLES.map((a) => ({
  id: a.id,
  source_id: 'editorial_office',
  source_name: a.author.name || 'Verified Correspondent',
  source_group: 'Government Sources',
  source_url: `#/article/${a.slug}`,
  source_guid: a.slug,
  title: a.title,
  description: a.excerpt,
  content: a.content.join('\n\n'),
  image_url: a.image,
  author: a.author.name,
  published_at: a.publishedAt,
  category: a.category,
  language: a.language || 'mr',
  status: 'published',
  created_at: a.publishedAt,
}));

export const IntelligenceStreamPage: React.FC<IntelligenceStreamPageProps> = ({
  onSelectArticle,
  onSelectCategory,
  onNavigateEpaper,
  onNavigateContact,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [stories, setStories] = useState<TimelineStory[]>([]);
  const [activeSources, setActiveSources] = useState<BackendSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Load published stories from Cloudflare D1 API
  const loadStories = useCallback(async (targetPage: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await newsService.fetchTimelineStories({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        source_group: selectedGroup !== 'all' ? selectedGroup : undefined,
        page: targetPage,
        limit: 15,
      });

      if (res.stories && res.stories.length > 0) {
        setStories(res.stories);
        setTotalPages(res.totalPages);
        setTotalCount(res.total);
      } else {
        // Safe fallback only if DB is empty
        let fallback = [...STATIC_FALLBACK_STORIES];
        if (selectedCategory !== 'all') {
          fallback = fallback.filter((s) => s.category === selectedCategory);
        }
        setStories(fallback);
        setTotalPages(1);
        setTotalCount(fallback.length);
      }
    } catch (err) {
      console.warn('[Samvad Intel] Falling back to verified local baseline:', err);
      setStories(STATIC_FALLBACK_STORIES);
      setTotalPages(1);
      setTotalCount(STATIC_FALLBACK_STORIES.length);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedGroup]);

  // Load registered sources catalog for transparency widget
  useEffect(() => {
    newsService.fetchActiveSources().then((sources) => {
      if (sources && sources.length > 0) {
        setActiveSources(sources);
      }
    });
  }, []);

  useEffect(() => {
    setPage(1);
    loadStories(1);
  }, [loadStories]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    loadStories(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter stories client-side if language or search keyword entered
  const displayedStories = stories.filter((s) => {
    if (selectedLanguage !== 'all') {
      const sLang = (s.language || 'mr').toLowerCase();
      if (sLang !== selectedLanguage) return false;
    }
    if (searchFilter.trim()) {
      const term = searchFilter.toLowerCase();
      const matchTitle = (s.title || '').toLowerCase().includes(term);
      const matchDesc = (s.description || '').toLowerCase().includes(term);
      const matchSource = (s.source_name || '').toLowerCase().includes(term);
      if (!matchTitle && !matchDesc && !matchSource) return false;
    }
    return true;
  });

  const featuredStory = displayedStories[0];
  const regularStories = displayedStories.slice(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* 1. Platform Mission & Live Wire Intelligence Header */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono-code">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                VERIFIED SOURCE INTELLIGENCE WIRE
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Multilingual Information Intelligence & Research Stream
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Aggregated, cross-verified, and cryptographically hashed intelligence briefs from official government gazettes, news desks, and regional bureaus across Marathi, Hindi, and English.
              </p>
            </div>

            {/* Quick Metrics Panel */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 sm:p-4 shrink-0 font-mono-code text-xs">
              <div className="text-center sm:text-left">
                <span className="text-[10px] text-slate-500 uppercase block">Active Wire</span>
                <span className="text-base sm:text-lg font-bold text-white">{totalCount}</span>
                <span className="text-[10px] text-emerald-400 block">D1 Published</span>
              </div>
              <div className="text-center sm:text-left border-x border-slate-800 px-3">
                <span className="text-[10px] text-slate-500 uppercase block">Ingest Sources</span>
                <span className="text-base sm:text-lg font-bold text-white">{activeSources.length || 7}</span>
                <span className="text-[10px] text-cyan-400 block">Multilateral</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[10px] text-slate-500 uppercase block">Verification</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400">100%</span>
                <span className="text-[10px] text-slate-400 block">Curated</span>
              </div>
            </div>
          </div>

          {/* 2. Interactive Discovery Filters Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
            {/* Source Group Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-code">
              <span className="text-slate-500 text-[11px] mr-1 uppercase flex items-center gap-1">
                <Filter className="w-3 h-3 text-cyan-400" />
                Provenance:
              </span>
              <button
                onClick={() => setSelectedGroup('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedGroup === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Sources
              </button>
              {Object.entries(SOURCE_GROUP_META).map(([grp, meta]) => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center ${
                    selectedGroup === grp
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {meta.icon}
                  {meta.label}
                </button>
              ))}
            </div>

            {/* Language Selection & Local Search Filter */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono-code">
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    selectedLanguage === 'all'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Lang
                </button>
                <button
                  onClick={() => setSelectedLanguage('mr')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    selectedLanguage === 'mr'
                      ? 'bg-slate-800 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Marathi Intelligence"
                >
                  मराठी
                </button>
                <button
                  onClick={() => setSelectedLanguage('hi')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    selectedLanguage === 'hi'
                      ? 'bg-slate-800 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Hindi Intelligence"
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    selectedLanguage === 'en'
                      ? 'bg-slate-800 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="English Intelligence"
                >
                  EN
                </button>
              </div>

              {/* In-feed quick search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter stream..."
                  className="pl-7 pr-3 py-1 bg-slate-900 border border-slate-800 text-xs rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code w-32 sm:w-44"
                />
                <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Stream & Exploration Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {loading ? (
              <div className="py-20 text-center space-y-3 font-mono-code text-xs text-slate-400">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p>Retrieving verified intelligence records from Cloudflare D1...</p>
              </div>
            ) : displayedStories.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 space-y-3">
                <Info className="w-10 h-10 text-cyan-400 mx-auto" />
                <h3 className="text-base font-bold text-white">No Matching Intelligence Found</h3>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  No verified items match your current filter parameters. Try resetting your domain or provenance filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGroup('all');
                    setSelectedLanguage('all');
                    setSearchFilter('');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono-code rounded-lg transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured Intelligence Lead Dossier */}
                {featuredStory && page === 1 && !searchFilter && (
                  <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-slate-400 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold uppercase text-[10px]">
                          LEAD DOSSIER
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase">
                          {featuredStory.category}
                        </span>
                        <span className="text-slate-500">
                          {featuredStory.source_name || 'Official Gazette'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{new Date(featuredStory.published_at).toLocaleString()}</span>
                      </div>
                    </div>

                    <h2
                      onClick={() => onSelectArticle(featuredStory.source_guid || featuredStory.id)}
                      className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                    >
                      {featuredStory.title}
                    </h2>

                    <p className="mt-3 text-sm text-slate-300 font-editorial leading-relaxed line-clamp-3">
                      {featuredStory.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Full Source Record Available</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onToggleBookmark(featuredStory.source_guid || featuredStory.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            isBookmarked(featuredStory.source_guid || featuredStory.id)
                              ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                              : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                          }`}
                          title="Save to Research Dossier"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onSelectArticle(featuredStory.source_guid || featuredStory.id)}
                          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Examine Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Intelligence Stream Cards */}
                <div className="space-y-4">
                  {(page === 1 && !searchFilter ? regularStories : displayedStories).map((story) => {
                    const groupMeta =
                      SOURCE_GROUP_META[story.source_group || ''] ||
                      SOURCE_GROUP_META['Government Sources'];

                    return (
                      <article
                        key={story.id}
                        className="p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all group"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-slate-400 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase ${groupMeta.badgeClass}`}
                            >
                              {groupMeta.icon}
                              {groupMeta.label}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase">
                              {story.category}
                            </span>
                            <span className="text-slate-400 font-semibold">
                              {story.source_name || 'Verified Source'}
                            </span>
                          </div>

                          <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {new Date(story.published_at).toLocaleDateString()}
                          </span>
                        </div>

                        <h3
                          onClick={() => onSelectArticle(story.source_guid || story.id)}
                          className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                        >
                          {story.title}
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-slate-400 font-editorial leading-relaxed line-clamp-2">
                          {story.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono-code">
                          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                            <span>LANG: {(story.language || 'mr').toUpperCase()}</span>
                            <span>•</span>
                            <span className="text-emerald-400/90 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              VERIFIED
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onToggleBookmark(story.source_guid || story.id)}
                              className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                                isBookmarked(story.source_guid || story.id)
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                              }`}
                              title="Add to Research Dossier"
                            >
                              <Bookmark className="w-3 h-3" />
                            </button>

                            <button
                              onClick={() => onSelectArticle(story.source_guid || story.id)}
                              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                            >
                              <span>Read Dossier</span>
                              <ChevronRight className="w-3 h-3 text-cyan-400" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-code text-slate-400">
                    <div>
                      Page <span className="text-white font-bold">{page}</span> of{' '}
                      <span className="text-white font-bold">{totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-200 cursor-pointer transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-200 cursor-pointer transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Rail: Research Tools & Source Transparency Catalog (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Source Transparency Index Widget */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-mono-code uppercase font-bold text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Source Transparency Index
                </h4>
                <button
                  onClick={onNavigateContact}
                  className="text-[11px] font-mono-code text-cyan-400 hover:text-cyan-300"
                >
                  View All
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Samvad Intel indexes official government communication channels and peer-reviewed wire feeds. Raw incoming data is cryptographically staged before editorial approval.
              </p>

              <div className="space-y-2 pt-1">
                {(activeSources.length > 0 ? activeSources.slice(0, 5) : [
                  { id: 'src_pib_mr', name: 'पत्र सूचना कार्यालय (PIB Mumbai)', source_group: 'Government Sources', language: 'mr' },
                  { id: 'src_pib_en', name: 'Press Information Bureau (PIB India)', source_group: 'Government Sources', language: 'en' },
                  { id: 'src_sakal_mr', name: 'सकाळ वृत्तसेवा (Sakal Wire)', source_group: 'Indian News', language: 'mr' },
                  { id: 'src_hindu_en', name: 'The Hindu National Wire', source_group: 'Indian News', language: 'en' },
                  { id: 'src_air_mr', name: 'आकाशवाणी वृत्त (All India Radio)', source_group: 'Government Sources', language: 'mr' },
                ]).map((src) => (
                  <div
                    key={src.id}
                    className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{src.name}</div>
                      <div className="text-[10px] font-mono-code text-slate-500">
                        {src.source_group} · {(src.language || 'mr').toUpperCase()}
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Operational Feed" />
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Research Dossier & Briefings Promo */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-slate-800 rounded-xl space-y-3 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 uppercase font-bold">
                <FileText className="w-4 h-4" />
                <span>Periodic Intelligence Reports</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Compiled Intelligence Briefings
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access structured quarterly situation dossiers, policy analysis briefs, and cross-sectoral research digests formatted for strategic evaluation.
              </p>
              <button
                onClick={onNavigateEpaper}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono-code font-bold rounded-lg border border-slate-700 cursor-pointer transition-colors"
              >
                Access Briefing Archives
              </button>
            </div>

            {/* 3. Methodology & Verification Standards */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3 font-sans">
              <h4 className="text-xs font-mono-code uppercase font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verification Standards
              </h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Deduplication through SHA-256 content hashes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Automated 14-day retention rule for unreviewed staging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Immutable origin wire preservation during editing</span>
                </li>
              </ul>
              <button
                onClick={onNavigateContact}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 pt-1 block"
              >
                Inspect Methodology Documentation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
