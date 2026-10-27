/**
 * @file IntelligenceCategoryPage.tsx
 * Research Discipline Explorer Page for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { getCategoryBySlug, SCIENTIFIC_DOMAINS } from '../data/categories';
import { newsService, TimelineStory } from '../services/newsService';
import { ARTICLES } from '../data/newsArticles';
import {
  Atom,
  ArrowLeft,
  Building2,
  BookOpen,
  Bookmark,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
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
  const [stories, setStories] = useState<TimelineStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all');

  const category = useMemo(() => getCategoryBySlug(slug) || {
    slug,
    nameEnglish: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Scientific research and discoveries in ${slug}.`,
    accentColor: '#06b6d4',
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    newsService
      .fetchTimelineStories({ category: slug, limit: 30 })
      .then((res) => {
        if (!isMounted) return;
        if (res.stories && res.stories.length > 0) {
          setStories(res.stories);
        } else {
          // Check static articles matching this category
          const fallback = ARTICLES.filter((a) => a.category === slug).map((a) => ({
            id: a.id,
            source_id: 'editorial_archive',
            source_name: a.primaryInstitution || a.author.name,
            source_group: 'Scientific Journals',
            source_url: `#/article/${a.slug}`,
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
          setStories(fallback);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        const fallback = ARTICLES.filter((a) => a.category === slug).map((a) => ({
          id: a.id,
          source_id: 'editorial_archive',
          source_name: a.primaryInstitution || a.author.name,
          source_group: 'Scientific Journals',
          source_url: `#/article/${a.slug}`,
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
        setStories(fallback);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Extract institutions available in this discipline
  const institutions = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => {
      if (s.source_name) set.add(s.source_name);
    });
    return Array.from(set);
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (selectedInstitution === 'all') return stories;
    return stories.filter((s) => s.source_name === selectedInstitution);
  }, [stories, selectedInstitution]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Top Banner Header */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Wire</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.accentColor }}
                />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Research Discipline
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                {category.nameEnglish}
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono">
                <div className="text-slate-400 text-[11px]">Indexed Research Dossiers</div>
                <div className="text-xl font-bold text-white mt-0.5">{stories.length} Papers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Institution Filter bar */}
        {institutions.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono pb-2">
            <span className="text-slate-400 flex items-center gap-1 shrink-0">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Filter by Hub:
            </span>
            <button
              onClick={() => setSelectedInstitution('all')}
              className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                selectedInstitution === 'all'
                  ? 'bg-cyan-600 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              All Hubs ({stories.length})
            </button>
            {institutions.map((inst) => (
              <button
                key={inst}
                onClick={() => setSelectedInstitution(inst)}
                className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                  selectedInstitution === inst
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {inst}
              </button>
            ))}
          </div>
        )}

        {/* Stories Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs font-mono space-y-2">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading research publications...</p>
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectArticle(story.source_guid || story.id)}
                className="flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 group shadow-lg"
              >
                <div>
                  {story.image_url ? (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                      <img
                        src={story.image_url}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-full bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                        {category.nameEnglish}
                      </span>
                      <Atom className="w-5 h-5 text-slate-700" />
                    </div>
                  )}

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Building2 className="w-3 h-3 text-cyan-400" />
                        <span className="truncate max-w-[150px]">{story.source_name || 'Primary Lab'}</span>
                      </span>
                      <span>{new Date(story.published_at).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {story.title}
                    </h3>

                    {story.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {story.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{story.author || 'Research Team'}</span>
                    <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 text-xs font-mono">
            No research papers currently indexed in this discipline.
          </div>
        )}
      </div>
    </div>
  );
};
