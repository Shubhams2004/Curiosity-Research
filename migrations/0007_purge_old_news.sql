-- Migration 0007: Purge Old News & Maintain Daily Freshness
-- Creator: Shubham Sonale
-- Tagline: Discover What's Next.
-- 1. Deactivate legacy newspaper sources
-- 2. Remove obsolete legacy newspaper stories
-- 3. Clean up unreviewed incoming stories older than 14 days
-- 4. Clean up archived / rejected news older than 14 days
-- 5. Clean up old unedited published general stories older than 60 days

-- 1. Deactivate legacy non-scientific newspaper feeds so they are not ingested
UPDATE news_sources
SET active = 0
WHERE id IN (
  'src_sakal_mr', 'src_loksatta_mr', 'src_in_sakal', 'src_dd_mr', 'src_gov_mahanews',
  'src_gov_pib_mr', 'src_gov_rbi', 'src_gov_pib_national', 'src_in_thehindu',
  'src_in_ndtv', 'src_intl_bbc', 'src_intl_un', 'src_intl_aljazeera', 'src_air_mr'
);

-- 2. Purge obsolete newspaper stories from legacy sources
DELETE FROM stories 
WHERE source_id IN (
  'src_sakal_mr', 'src_loksatta_mr', 'src_in_sakal', 'src_dd_mr', 'src_gov_mahanews',
  'src_gov_pib_mr', 'src_gov_rbi', 'src_gov_pib_national', 'src_in_thehindu',
  'src_in_ndtv', 'src_intl_bbc', 'src_intl_un', 'src_intl_aljazeera', 'src_air_mr'
);

-- 3. Purge old unreviewed incoming noise older than 14 days to keep incoming queue fresh
DELETE FROM stories 
WHERE status = 'incoming' 
  AND (is_edited IS NULL OR is_edited = 0) 
  AND created_at < datetime('now', '-14 days');

-- 4. Purge old archived and rejected news older than 14 days
DELETE FROM stories 
WHERE status IN ('archived', 'rejected') 
  AND (is_edited IS NULL OR is_edited = 0) 
  AND updated_at < datetime('now', '-14 days');

-- 5. Purge old unedited published general stories older than 60 days (preserving landmark research breakthroughs)
DELETE FROM stories 
WHERE status = 'published' 
  AND (is_breakthrough IS NULL OR is_breakthrough = 0) 
  AND (is_edited IS NULL OR is_edited = 0) 
  AND (published_at < datetime('now', '-60 days') OR created_at < datetime('now', '-60 days'));

