-- Migration 0007: Purge Old News & Maintain Daily Freshness
-- Creator: Shubham Sonale
-- Tagline: Discover What's Next.
-- 1. Remove obsolete legacy newspaper stories
-- 2. Clean up unreviewed incoming stories older than 14 days
-- 3. Clean up archived / rejected news older than 30 days

-- 1. Purge obsolete newspaper stories from legacy non-scientific sources
DELETE FROM stories 
WHERE source_id IN ('src_sakal_mr', 'src_loksatta_mr', 'src_in_sakal', 'src_dd_mr', 'src_gov_mahanews', 'src_gov_pib_mr');

-- 2. Purge old unreviewed incoming noise older than 14 days to keep incoming queue fresh
DELETE FROM stories 
WHERE status = 'incoming' 
  AND (is_edited IS NULL OR is_edited = 0) 
  AND created_at < datetime('now', '-14 days');

-- 3. Purge old archived and rejected news older than 30 days
DELETE FROM stories 
WHERE status IN ('archived', 'rejected') 
  AND (is_edited IS NULL OR is_edited = 0) 
  AND updated_at < datetime('now', '-30 days');
