import { useState, useEffect } from 'react';
import { EditionCity, ThemeMode } from '../types/news';

export type FontSizeOption = 'sm' | 'md' | 'lg';

const STORAGE_KEYS = {
  FONT_SIZE: 'curiosity_font_size',
  BOOKMARKS: 'curiosity_bookmarks',
  EDITION: 'curiosity_edition',
  THEME: 'curiosity_theme',
};

// Legacy keys fallback to ensure smooth user preference migration
const LEGACY_KEYS = {
  FONT_SIZE: 'bahumol_font_size',
  BOOKMARKS: 'bahumol_bookmarks',
  EDITION: 'bahumol_edition',
  THEME: 'bahumol_theme',
};

export const useReadingPreferences = () => {
  const [fontSize, setFontSizeState] = useState<FontSizeOption>('md');
  const [bookmarks, setBookmarksState] = useState<string[]>([]);
  const [edition, setEditionState] = useState<EditionCity>('Bengaluru');
  const [theme, setThemeState] = useState<ThemeMode>('dark'); // Dark mode by default for research workstation

  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem(STORAGE_KEYS.THEME) ||
        localStorage.getItem(LEGACY_KEYS.THEME)) as ThemeMode;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Default to dark mode for scientific workstation
        setThemeState('dark');
        document.documentElement.classList.add('dark');
      }

      const savedFontSize = (localStorage.getItem(STORAGE_KEYS.FONT_SIZE) ||
        localStorage.getItem(LEGACY_KEYS.FONT_SIZE)) as FontSizeOption;
      if (savedFontSize && ['sm', 'md', 'lg'].includes(savedFontSize)) {
        setFontSizeState(savedFontSize);
      }

      const savedBookmarks =
        localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || localStorage.getItem(LEGACY_KEYS.BOOKMARKS);
      if (savedBookmarks) {
        setBookmarksState(JSON.parse(savedBookmarks));
      }

      const savedEdition = (localStorage.getItem(STORAGE_KEYS.EDITION) ||
        localStorage.getItem(LEGACY_KEYS.EDITION)) as EditionCity;
      if (savedEdition) {
        setEditionState(savedEdition);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  };

  const setFontSize = (size: FontSizeOption) => {
    setFontSizeState(size);
    try {
      localStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
    } catch {}
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarksState((prev) => {
      const updated = prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

  const setEdition = (newEdition: EditionCity) => {
    setEditionState(newEdition);
    try {
      localStorage.setItem(STORAGE_KEYS.EDITION, newEdition);
    } catch {}
  };

  return {
    fontSize,
    setFontSize,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    edition,
    setEdition,
    theme,
    toggleTheme,
  };
};
