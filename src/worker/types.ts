/**
 * @file types.ts
 * Cloudflare Worker and D1 Database Types for Curiosity Research
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import type { D1Database, Fetcher, ExecutionContext, ScheduledEvent } from '@cloudflare/workers-types';

export type { D1Database, Fetcher, ExecutionContext, ScheduledEvent };

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_API_KEY?: string;
  ENVIRONMENT?: string;
}

export type StoryStatus =
  | 'incoming'
  | 'review'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'archived';

export interface NewsSourceRow {
  id: string;
  name: string;
  feed_url: string;
  source_url: string;
  source_type: string;
  language: string;
  default_category: string;
  active: number;
  source_group: 'Scientific Journals' | 'Indian Research Institutions' | 'Preprint Repositories' | 'Technology Labs' | 'Indian News' | 'Government Sources' | 'International News' | string;
  last_fetched_at: string | null;
  created_at: string;
}

export interface StoryRow {
  id: string;
  source_id: string;
  source_url: string;
  source_guid: string | null;
  title: string;
  description: string | null;
  content?: string | null;
  image_url: string | null;
  author: string | null;
  published_at: string;
  category: string;
  language: string;
  status: StoryStatus;
  content_hash: string;
  created_at: string;
  updated_at: string;
  source_name?: string;
  source_group?: string;
  original_title?: string | null;
  original_description?: string | null;
  tags?: string | null;
  editorial_notes?: string | null;
  is_edited?: number;

  // Scientific metadata fields
  doi?: string | null;
  journal_name?: string | null;
  publication_year?: number | null;
  primary_institution?: string | null;
  institution_country?: string | null;
  paper_url?: string | null;
  citation_count?: number | null;
  is_breakthrough?: number | null;
  research_discipline?: string | null;
}

export interface ResearchInstitutionRow {
  id: string;
  name: string;
  abbreviation: string | null;
  city: string;
  country: string;
  focus_areas: string;
  website: string | null;
  established_year: number | null;
  notable_breakthroughs?: string | null;
  created_at: string;
}

export interface EditorialUpdatePayload {
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  language?: 'en' | 'mr' | 'hi' | string;
  image_url?: string;
  author?: string;
  tags?: string;
  editorial_notes?: string;
  doi?: string;
  journal_name?: string;
  primary_institution?: string;
  paper_url?: string;
}

export interface EditorialCounts {
  all: number;
  incoming: number;
  review: number;
  approved: number;
  published: number;
  rejected: number;
  archived: number;
}

export interface EditorialSessionRow {
  id: string;
  created_at: string;
  expires_at: string;
}

export interface EditorialAuthUser {
  role: 'editor';
  editorInChief: string;
}

export interface ParsedFeedItem {
  guid?: string;
  title: string;
  link: string;
  description?: string;
  content?: string;
  pubDate?: string;
  publishedAt?: string;
  author?: string;
  imageUrl?: string;
  categoryCandidate?: string;
}

export interface IngestionResult {
  sourceId: string;
  sourceName: string;
  fetchedCount: number;
  insertedCount: number;
  duplicateCount: number;
  skippedCount?: number;
  error?: string;
}

export interface IngestionSummary {
  timestamp: string;
  totalSources: number;
  successfulSources: number;
  failedSources: number;
  newStoriesInserted: number;
  duplicatesSkipped: number;
  details: IngestionResult[];
  startedAt?: string;
  completedAt?: string;
  activeSources?: number;
  results?: IngestionResult[];
}

export type PipelineSummary = IngestionSummary;
