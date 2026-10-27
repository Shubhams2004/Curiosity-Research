/**
 * @file ResearchDossierPage.tsx
 * Personal Research Workstation & Citation Export for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useMemo } from 'react';
import { ARTICLES } from '../data/newsArticles';
import { Article } from '../types/news';
import {
  Bookmark,
  ArrowLeft,
  Trash2,
  Download,
  Share2,
  Copy,
  Check,
  Building2,
  BookOpen,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Atom,
  FileCode,
} from 'lucide-react';

interface ResearchDossierPageProps {
  bookmarkedIds: string[];
  onSelectArticle: (slugOrId: string) => void;
  onRemoveBookmark: (articleId: string) => void;
  onNavigateHome: () => void;
}

export const ResearchDossierPage: React.FC<ResearchDossierPageProps> = ({
  bookmarkedIds,
  onSelectArticle,
  onRemoveBookmark,
  onNavigateHome,
}) => {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  // Match bookmarked IDs against ARTICLES
  const savedArticles = useMemo(() => {
    return ARTICLES.filter(
      (a) => bookmarkedIds.includes(a.id) || bookmarkedIds.includes(a.slug)
    );
  }, [bookmarkedIds]);

  // Generate full BibTeX bundle
  const bibtexBundle = useMemo(() => {
    if (savedArticles.length === 0) return '';
    return savedArticles
      .map((a) => {
        const citeKey = `${(a.author.name || 'author').split(' ').pop()?.toLowerCase() || 'paper'}${a.publicationYear || 2026}`;
        return `@article{${citeKey},
  author = {${a.author.name}},
  title = {${a.title}},
  journal = {${a.journalName || 'Curiosity Research'}},
  year = {${a.publicationYear || 2026}},
  doi = {${a.doi || `10.5281/curiosity.${a.id}`}},
  institution = {${a.primaryInstitution || a.author.institution || 'Curiosity Research'}},
  url = {${a.paperUrl || `https://curiosityresearch.org/#/article/${a.slug}`}}
}`;
      })
      .join('\n\n');
  }, [savedArticles]);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtexBundle);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([bibtexBundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `curiosity-research-bibliography-${new Date().toISOString().slice(0, 10)}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Feed</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Bookmark className="w-4 h-4 text-cyan-400" />
                <span>Personal Research Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Saved Papers & Literature Review
              </h1>
              <p className="text-slate-300 text-sm max-w-xl mt-1 leading-relaxed">
                Organize, review, and export peer-reviewed publications saved during your research inquiry.
              </p>
            </div>

            {savedArticles.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyBibtex}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedBibtex ? 'BibTeX Copied' : 'Copy BibTeX'}</span>
                </button>

                <button
                  onClick={handleDownloadBib}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .bib File</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 space-y-8">
        {/* Workspace Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400">Saved Research Items</div>
            <div className="text-2xl font-bold text-white mt-1">{savedArticles.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400">Total Citation Volume</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">
              {savedArticles.reduce((acc, curr) => acc + (curr.citationCount || 0), 0)}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400">Disciplines Covered</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {new Set(savedArticles.map((a) => a.category)).size}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400">Citation Export Ready</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">BibTeX / APA</div>
          </div>
        </div>

        {/* Papers List */}
        {savedArticles.length > 0 ? (
          <div className="space-y-4">
            {savedArticles.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
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

                  <h3
                    onClick={() => onSelectArticle(item.slug || item.id)}
                    className="text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
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

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => onSelectArticle(item.slug || item.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Open Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-800 transition-colors cursor-pointer"
                    title="Remove from Workstation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Your Research Workstation is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Bookmark papers, discoveries, and institution breakthroughs from the discovery wire to collect them here for literature reviews and BibTeX export.
            </p>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Discoveries</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
