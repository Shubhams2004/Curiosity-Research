/**
 * @file App.tsx
 * Samvad Intel - Multilingual Information Intelligence & Research Platform
 * Entry routing and layout composition.
 * Preserves all backend endpoints and editorial flows (/editorial-desk, /api/*)
 */

import React, { useState, useEffect } from 'react';
import { useRouter, navigateTo } from './utils/router';
import { useReadingPreferences } from './utils/readingPreferences';
import { getArticleBySlug, getArticleById } from './data/newsArticles';
import { newsService } from './services/newsService';
import { Article } from './types/news';

// New Samvad Intel UI Components
import { TopNav } from './components/common/TopNav';
import { IntelligenceFooter } from './components/common/IntelligenceFooter';
import { IntelligenceSearchModal } from './components/common/IntelligenceSearchModal';
import { IntelligenceStreamPage } from './pages/IntelligenceStreamPage';
import { IntelligenceDossierPage } from './pages/IntelligenceDossierPage';
import { IntelligenceCategoryPage } from './pages/IntelligenceCategoryPage';
import { IntelligenceSearchPage } from './pages/IntelligenceSearchPage';
import { ResearchDossierPage } from './pages/ResearchDossierPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { SourceDirectoryPage } from './pages/SourceDirectoryPage';
import { BriefingArchivesPage } from './pages/BriefingArchivesPage';
import { EditorialDashboardPage } from './pages/EditorialDashboardPage';

import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const { route } = useRouter();
  const {
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  } = useReadingPreferences();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [liveArticleDetail, setLiveArticleDetail] = useState<Article | null>(null);
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [articleNotFound, setArticleNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (route.page === 'article') {
      const targetSlugOrId = route.params.slug || route.params.id || '';
      if (!targetSlugOrId) {
        setLiveArticleDetail(null);
        setLoadingArticle(false);
        setArticleNotFound(true);
        return;
      }

      setLoadingArticle(true);
      setArticleNotFound(false);
      let isMounted = true;

      // 1. Dynamic API fetch first from Cloudflare D1
      newsService
        .getArticleById(targetSlugOrId)
        .then((article) => {
          if (!isMounted) return;
          if (article) {
            setLiveArticleDetail(article);
            setLoadingArticle(false);
            setArticleNotFound(false);
          } else {
            return newsService.getArticleBySlug(targetSlugOrId);
          }
        })
        .then((bySlugArticle) => {
          if (!isMounted) return;
          if (bySlugArticle) {
            setLiveArticleDetail(bySlugArticle);
            setLoadingArticle(false);
            setArticleNotFound(false);
          } else {
            // 2. Check static fallback only if matching ID exists
            const local = getArticleBySlug(targetSlugOrId) || getArticleById(targetSlugOrId);
            if (local) {
              setLiveArticleDetail(local);
              setArticleNotFound(false);
            } else {
              setLiveArticleDetail(null);
              setArticleNotFound(true);
            }
            setLoadingArticle(false);
          }
        })
        .catch(() => {
          if (!isMounted) return;
          const local = getArticleBySlug(targetSlugOrId) || getArticleById(targetSlugOrId);
          if (local) {
            setLiveArticleDetail(local);
            setArticleNotFound(false);
          } else {
            setLiveArticleDetail(null);
            setArticleNotFound(true);
          }
          setLoadingArticle(false);
        });

      return () => {
        isMounted = false;
      };
    } else {
      setLiveArticleDetail(null);
      setLoadingArticle(false);
      setArticleNotFound(false);
    }
  }, [route.page, route.params.slug, route.params.id]);

  // Routing Handlers
  const handleSelectArticle = (slugOrId: string) => {
    navigateTo(`#/article/${slugOrId}`);
  };

  const handleSelectCategory = (slug: string) => {
    if (slug === 'all') {
      navigateTo('#/');
    } else if (slug === 'editorial') {
      navigateTo('#/editorial');
    } else if (slug === 'editorial-desk' || slug === 'editorial_desk') {
      navigateTo('#/editorial-desk');
    } else {
      navigateTo(`#/category/${slug}`);
    }
  };

  const handleNavigateHome = () => {
    navigateTo('#/');
  };

  const handleNavigateAbout = () => {
    navigateTo('#/about');
  };

  const handleNavigateContact = () => {
    navigateTo('#/contact');
  };

  const handleNavigateEpaper = () => {
    navigateTo('#/epaper');
  };

  const handleNavigateBookmarks = () => {
    navigateTo('#/bookmarks');
  };

  const handleNavigateTimeline = () => {
    navigateTo('#/timeline');
  };

  const handleNavigateEditorial = () => {
    navigateTo('#/editorial');
  };

  const handleNavigateEditorialDesk = () => {
    navigateTo('#/editorial-desk');
  };

  const handleViewAllResults = (query: string) => {
    navigateTo(`#/search?q=${encodeURIComponent(query)}`);
  };

  let currentCategorySlug: string | undefined = undefined;
  if (route.page === 'category' && route.params.slug) {
    currentCategorySlug = route.params.slug;
  } else if (route.page === 'editorial') {
    currentCategorySlug = 'editorial';
  }

  const renderCurrentPage = () => {
    switch (route.page) {
      case 'category':
        if (route.params.slug === 'editorial-desk' || route.params.slug === 'editorial_desk') {
          return (
            <EditorialDashboardPage
              onNavigateHome={handleNavigateHome}
              onNavigateTimeline={handleNavigateTimeline}
              initialStoryId={route.params.storyId}
            />
          );
        }
        return (
          <IntelligenceCategoryPage
            slug={route.params.slug || 'maharashtra'}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={handleNavigateHome}
          />
        );

      case 'article': {
        const targetSlugOrId = route.params.slug || route.params.id || '';
        const article =
          liveArticleDetail ||
          getArticleBySlug(targetSlugOrId) ||
          getArticleById(targetSlugOrId);

        if (loadingArticle && !article) {
          return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-slate-400 font-mono-code text-xs">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p>Opening research dossier from edge node...</p>
            </div>
          );
        }

        if (!article || articleNotFound) {
          return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto font-sans">
              <div className="w-14 h-14 bg-rose-950/40 border border-rose-800/80 rounded-2xl flex items-center justify-center mb-4 text-rose-400">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Intelligence Dossier Not Found
              </h2>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                ही बातमी सध्या उपलब्ध नाही. (The requested intelligence record does not exist or has not been approved for public release.)
              </p>
              <button
                onClick={handleNavigateHome}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg font-mono-code font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Intelligence Wire
              </button>
            </div>
          );
        }

        return (
          <IntelligenceDossierPage
            article={article}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
            onNavigateHome={handleNavigateHome}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
            fontSize={fontSize}
            onChangeFontSize={setFontSize}
          />
        );
      }

      case 'search':
        return (
          <IntelligenceSearchPage
            initialQuery={route.params.query || ''}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={handleNavigateHome}
          />
        );

      case 'about':
        return (
          <MethodologyPage
            onNavigateHome={handleNavigateHome}
            onNavigateContact={handleNavigateContact}
          />
        );

      case 'contact':
        return <SourceDirectoryPage onNavigateHome={handleNavigateHome} />;

      case 'epaper':
        return (
          <BriefingArchivesPage
            onNavigateHome={handleNavigateHome}
            onSelectArticle={handleSelectArticle}
          />
        );

      case 'bookmarks':
        return (
          <ResearchDossierPage
            bookmarkedIds={bookmarks}
            onSelectArticle={handleSelectArticle}
            onRemoveBookmark={toggleBookmark}
            onNavigateHome={handleNavigateHome}
          />
        );

      case 'editorial':
        return (
          <IntelligenceCategoryPage
            slug="editorial"
            onSelectArticle={handleSelectArticle}
            onNavigateHome={handleNavigateHome}
          />
        );

      case 'editorial-desk':
        return (
          <EditorialDashboardPage
            onNavigateHome={handleNavigateHome}
            onNavigateTimeline={handleNavigateTimeline}
            initialStoryId={route.params.storyId}
          />
        );

      case 'timeline':
      case 'home':
      default:
        return (
          <IntelligenceStreamPage
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
            onNavigateEpaper={handleNavigateEpaper}
            onNavigateContact={handleNavigateContact}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 transition-colors ${
        fontSize === 'lg' ? 'text-[17px]' : fontSize === 'sm' ? 'text-[14px]' : 'text-[15px]'
      }`}
    >
      {/* 1. Samvad Intel Global Top Navigation Bar */}
      <TopNav
        currentCategorySlug={currentCategorySlug}
        isArticlePage={route.page === 'article'}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateBookmarks={handleNavigateBookmarks}
        onNavigateTimeline={handleNavigateTimeline}
        onNavigateEditorial={handleNavigateEditorial}
        onNavigateEditorialDesk={handleNavigateEditorialDesk}
        onNavigateEpaper={handleNavigateEpaper}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        theme={theme}
        onToggleTheme={toggleTheme}
        bookmarksCount={bookmarks.length}
      />

      {/* 2. Main Content View */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* 3. Global Intelligence Search Modal (Cmd+K / Ctrl+K) */}
      <IntelligenceSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
        onViewAllResults={handleViewAllResults}
      />

      {/* 4. Samvad Intel Footer */}
      <IntelligenceFooter
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        onNavigateEpaper={handleNavigateEpaper}
        onNavigateEditorialDesk={handleNavigateEditorialDesk}
      />
    </div>
  );
}
