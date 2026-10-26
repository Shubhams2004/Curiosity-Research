/**
 * @file ResearchDossierPage.tsx
 * Professional Personal Workspace & Research Dossier Manager for Samvad Intel.
 * Features:
 * - Saved research dossiers & investigative reading list
 * - Personal research notes & annotations (persisted in LocalStorage)
 * - Research export (JSON / Citation summary)
 * - Dossier tagging & filtering
 */

import React, { useState, useEffect } from 'react';
import { ARTICLES } from '../data/newsArticles';
import { ALL_CATEGORIES } from '../data/categories';
import {
  Bookmark,
  ChevronRight,
  Trash2,
  BookOpen,
  ArrowLeft,
  FileText,
  Clock,
  Layers,
  ArrowUpRight,
  Download,
  Edit3,
  Save,
  Check,
  FolderOpen,
  Tag,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';

interface ResearchDossierPageProps {
  bookmarkedIds: string[];
  onSelectArticle: (slugOrId: string) => void;
  onRemoveBookmark: (slugOrId: string) => void;
  onNavigateHome: () => void;
}

const STORAGE_NOTES_KEY = 'samvad_personal_workspace_notes';

export const ResearchDossierPage: React.FC<ResearchDossierPageProps> = ({
  bookmarkedIds,
  onSelectArticle,
  onRemoveBookmark,
  onNavigateHome,
}) => {
  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>({});
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_NOTES_KEY);
      if (stored) {
        setPersonalNotes(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const saveNote = (articleId: string) => {
    const updated = { ...personalNotes, [articleId]: currentNoteText };
    setPersonalNotes(updated);
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(updated));
    } catch {}
    setActiveEditingId(null);
    setSavedFeedback(articleId);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const savedArticles = ARTICLES.filter(
    (a) => bookmarkedIds.includes(a.slug) || bookmarkedIds.includes(a.id)
  );

  const filteredArticles =
    categoryFilter === 'all'
      ? savedArticles
      : savedArticles.filter((a) => a.category === categoryFilter);

  const exportWorkspaceDossier = () => {
    const data = {
      workspaceName: 'Samvad Intel Research Workspace',
      exportDate: new Date().toISOString(),
      itemCount: savedArticles.length,
      dossiers: savedArticles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        author: a.author.name,
        publishedAt: a.publishedAt,
        personalNote: personalNotes[a.id] || personalNotes[a.slug] || null,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `samvad-intel-workspace-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* 1. Header Banner */}
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
            <span className="text-cyan-400 uppercase font-bold">Personal Research Workspace</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono-code uppercase font-bold mb-2">
                <FolderOpen className="w-3.5 h-3.5" />
                RESEARCH DOSSIER & WORKSPACE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Personal Investigative Workspace
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono-code mt-1">
                {savedArticles.length} curated intelligence items flagged with private analyst notes
              </p>
            </div>

            {savedArticles.length > 0 && (
              <button
                onClick={exportWorkspaceDossier}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 rounded-lg text-xs font-mono-code font-bold flex items-center gap-2 cursor-pointer transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Dossier (JSON)</span>
              </button>
            )}
          </div>

          {/* Domain Filter */}
          {savedArticles.length > 0 && (
            <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar text-xs font-mono-code">
              <span className="text-slate-500 text-[11px] uppercase mr-1">Filter Domain:</span>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                All ({savedArticles.length})
              </button>
              {ALL_CATEGORIES.map((cat) => {
                const count = savedArticles.filter((a) => a.category === cat.slug).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setCategoryFilter(cat.slug)}
                    className={`px-2.5 py-1 rounded cursor-pointer whitespace-nowrap ${
                      categoryFilter === cat.slug
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {cat.nameEnglish} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 2. Dossiers List */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pt-8">
        {savedArticles.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 space-y-4 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Your Research Workspace is Empty</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              When reviewing intelligence briefs in the stream, click the bookmark icon to catalog items for deep-dive investigation, custom analyst annotations, and structured export.
            </p>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-code text-xs font-bold rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Intelligence Stream</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const note = personalNotes[article.id] || personalNotes[article.slug] || '';
              const isEditing = activeEditingId === article.id;

              return (
                <div
                  key={article.id}
                  className="p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all space-y-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 uppercase font-bold text-[10px]">
                        {article.category}
                      </span>
                      <span>{article.author.name}</span>
                      <span>·</span>
                      <span className="text-slate-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectArticle(article.slug || article.id)}
                        className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded text-xs font-mono-code font-bold cursor-pointer transition-colors"
                      >
                        Read Full Dossier
                      </button>

                      <button
                        onClick={() => onRemoveBookmark(article.slug || article.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Remove from Workspace"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectArticle(article.slug || article.id)}
                    className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-editorial line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Personal Analyst Note Section */}
                  <div className="pt-3 border-t border-slate-800/80 font-mono-code text-xs">
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={currentNoteText}
                          onChange={(e) => setCurrentNoteText(e.target.value)}
                          placeholder="Add private analyst observation, investigation lead, or cross-reference..."
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-xs font-sans"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => setActiveEditingId(null)}
                            className="px-2.5 py-1 text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => saveNote(article.id)}
                            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Note</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                        <div className="flex items-start gap-2 overflow-hidden">
                          <Edit3 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          {note ? (
                            <p className="text-slate-300 font-sans text-xs italic line-clamp-2">
                              &ldquo;{note}&rdquo;
                            </p>
                          ) : (
                            <p className="text-slate-500 text-[11px]">
                              No analyst note added yet. Click to attach investigation notes.
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {savedFeedback === article.id && (
                            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                              <Check className="w-3 h-3" />
                              Saved
                            </span>
                          )}
                          <button
                            onClick={() => {
                              setActiveEditingId(article.id);
                              setCurrentNoteText(note);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 text-[11px] underline cursor-pointer"
                          >
                            {note ? 'Edit Note' : 'Add Note'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
