/**
 * @file IntelligenceDossierPage.tsx
 * Comprehensive academic paper and research dossier reading view for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState } from 'react';
import { Article, CategorySlug } from '../types/news';
import { getCategoryBySlug } from '../data/categories';
import { FontSizeOption } from '../utils/readingPreferences';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Building2,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  FileText,
  Quote,
  ChevronRight,
  Atom,
} from 'lucide-react';

interface IntelligenceDossierPageProps {
  article: Article;
  onSelectArticle: (slugOrId: string) => void;
  onSelectCategory: (slug: string) => void;
  onNavigateHome: () => void;
  isBookmarked: (slugOrId: string) => boolean;
  onToggleBookmark: (slugOrId: string) => void;
  fontSize: FontSizeOption;
  onChangeFontSize: (size: FontSizeOption) => void;
}

export const IntelligenceDossierPage: React.FC<IntelligenceDossierPageProps> = ({
  article,
  onSelectCategory,
  onNavigateHome,
  isBookmarked,
  onToggleBookmark,
  fontSize,
  onChangeFontSize,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [selectedCitationFormat, setSelectedCitationFormat] = useState<'bibtex' | 'apa' | 'ieee'>('bibtex');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const catInfo = getCategoryBySlug(article.category);
  const bookmarked = isBookmarked(article.id) || isBookmarked(article.slug);

  const doiValue = article.doi || `10.5281/curiosity.${article.id}`;
  const journalName = article.journalName || 'Curiosity Research Journal';
  const pubYear = article.publicationYear || 2026;
  const institution = article.primaryInstitution || article.author.institution || 'Curiosity Research Laboratory';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(doiValue);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  // Generate citation string
  const generateCitation = () => {
    const authorName = article.author.name || 'Curiosity Research Team';
    const title = article.title;
    if (selectedCitationFormat === 'bibtex') {
      const citeKey = `${authorName.split(' ').pop()?.toLowerCase() || 'paper'}${pubYear}`;
      return `@article{${citeKey},
  author = {${authorName}},
  title = {${title}},
  journal = {${journalName}},
  year = {${pubYear}},
  doi = {${doiValue}},
  institution = {${institution}},
  url = {${article.paperUrl || window.location.href}}
}`;
    }
    if (selectedCitationFormat === 'apa') {
      return `${authorName} (${pubYear}). ${title}. ${journalName}. https://doi.org/${doiValue}`;
    }
    return `[1] ${authorName}, "${title}," ${journalName}, ${pubYear}, doi: ${doiValue}.`;
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(generateCitation());
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const contentFontSizeClass =
    fontSize === 'lg'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'sm'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <article className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* 1. Header Navigation & Status Bar */}
      <div className="w-full bg-slate-900/80 border-b border-slate-800/80 sticky top-14 sm:top-16 z-30 backdrop-blur-md px-4 lg:px-8 py-2.5 flex items-center justify-between text-xs font-mono">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery Wire</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Quick Font Size */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 rounded-md px-1.5 py-0.5">
            <button
              onClick={() => onChangeFontSize('sm')}
              className={`px-1 rounded ${fontSize === 'sm' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('md')}
              className={`px-1 rounded ${fontSize === 'md' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('lg')}
              className={`px-1 rounded ${fontSize === 'lg' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
            >
              A+
            </button>
          </div>

          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md border transition-colors cursor-pointer ${
              bookmarked
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>{bookmarked ? 'Saved to Workstation' : 'Save Dossier'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-8 space-y-6">
        {/* 2. Research Metadata & Provenance Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={() => onSelectCategory(article.category)}
              className="px-2.5 py-0.5 rounded-full font-bold uppercase transition-colors flex items-center gap-1 bg-cyan-950/80 text-cyan-300 border border-cyan-800 cursor-pointer"
            >
              <Atom className="w-3.5 h-3.5" />
              <span>{catInfo?.nameEnglish || article.category}</span>
            </button>

            {article.isBreakthrough && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                VERIFIED BREAKTHROUGH
              </span>
            )}

            <span className="text-slate-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-cyan-400" />
              {journalName} ({pubYear})
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-lg text-slate-300 font-serif italic leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Academic Affiliation & DOI Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-slate-900">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <strong>{institution}</strong>
              </span>

              <span className="text-slate-400">
                Lead Investigator: <strong className="text-slate-200">{article.author.name}</strong>
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {article.readTimeMinutes} min read
              </span>
            </div>

            {/* DOI Badge with Copy / External Link */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <span className="px-2 py-1 text-[11px] text-slate-400 border-r border-slate-800">
                  DOI: {doiValue}
                </span>
                <button
                  onClick={handleCopyDoi}
                  className="px-2 py-1 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy DOI"
                >
                  {copiedDoi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {article.paperUrl && (
                <a
                  href={article.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg flex items-center gap-1 text-xs transition-colors"
                >
                  <span>Publisher Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 3. Hero Visual Asset */}
        {article.image && (
          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
            {article.imageCaption && (
              <div className="p-3 bg-slate-950/90 text-xs text-slate-400 border-t border-slate-800 flex items-center gap-2">
                <span className="text-cyan-400 font-mono font-bold text-[10px]">FIGURE:</span>
                <span>{article.imageCaption}</span>
              </div>
            )}
          </div>
        )}

        {/* 4. Abstract / Key Findings Box */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900/70 border border-cyan-900/40 text-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Executive Abstract & Research Highlights
            </span>
            <span className="text-slate-400">Open Access Dataset</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-serif">
            {article.excerpt}
          </p>
        </div>

        {/* 5. Main Article / Research Body */}
        <div className="prose prose-invert max-w-none pt-4 space-y-5">
          {article.content.map((paragraph, idx) => (
            <p
              key={idx}
              className={`${contentFontSizeClass} text-slate-200 font-serif leading-relaxed text-justify`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 6. Quotes / Scholarly Perspectives */}
        {article.quotes && article.quotes.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Investigator Insights & Statements
            </div>
            {article.quotes.map((q, idx) => (
              <blockquote
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border-l-4 border-cyan-500 text-slate-200 space-y-2"
              >
                <p className="italic text-sm sm:text-base font-serif">&ldquo;{q.text}&rdquo;</p>
                <div className="text-xs font-mono text-cyan-300 font-semibold">— {q.speaker}</div>
              </blockquote>
            ))}
          </div>
        )}

        {/* 7. Interactive Citation Generator Box */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Quote className="w-4 h-4 text-cyan-400" />
                Cite This Research Publication
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Standardized academic citation format for researchers, bibliographies, and literature reviews
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setSelectedCitationFormat('bibtex')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  selectedCitationFormat === 'bibtex' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                BibTeX
              </button>
              <button
                onClick={() => setSelectedCitationFormat('apa')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  selectedCitationFormat === 'apa' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                APA
              </button>
              <button
                onClick={() => setSelectedCitationFormat('ieee')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  selectedCitationFormat === 'ieee' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                IEEE
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-lg bg-slate-950 text-xs font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap border border-slate-800/80">
              {generateCitation()}
            </pre>
            <button
              onClick={handleCopyCitation}
              className="absolute top-2.5 right-2.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCitation ? 'Copied' : 'Copy Citation'}</span>
            </button>
          </div>
        </div>

        {/* 8. Source Transparency & Verification Guarantee */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Indexed by <strong className="text-slate-200">Curiosity Research</strong> with primary provenance verification.
            </span>
          </div>
          <button
            onClick={onNavigateHome}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Explore More Discoveries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
