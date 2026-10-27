/**
 * @file index.ts
 * Cloudflare Worker entrypoint for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 * Seamlessly combines Vite SPA static assets with the research D1 backend and scheduled cron ingestion.
 */

import { Env, ExecutionContext, ScheduledEvent } from './types';
import { handleApiRequest } from './api';
import { runIngestionPipeline } from './ingestion';

export default {
  /**
   * HTTP Fetch Handler
   * Directs /api/* requests to the D1 research API, and all other routes to static SPA assets.
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // API Routes
    if (url.pathname.startsWith('/api/') || url.pathname === '/api') {
      return handleApiRequest(request, env);
    }

    // Static Assets & Single-Page Application (SPA) Fallback
    // Leverages Cloudflare Workers Assets binding configured in wrangler.jsonc
    if (env.ASSETS) {
      const res = await env.ASSETS.fetch(request as never);
      return res as unknown as Response;
    }

    return new Response('Curiosity Research Service Initializing...', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },

  /**
   * Scheduled Cron Handler
   * Automatically triggered by Cloudflare Cron Trigger (approx. every 30 minutes)
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`[Curiosity Cron] Scheduled research discovery ingestion triggered at ${new Date(event.scheduledTime).toISOString()}`);
    ctx.waitUntil(
      runIngestionPipeline(env)
        .then((summary) => {
          console.log(
            `[Curiosity Cron] Ingestion completed: ${summary.newStoriesInserted} new, ${summary.duplicatesSkipped} skipped, ${summary.failedSources} errors`
          );
        })
        .catch((err) => {
          console.error('[Curiosity Cron] Ingestion failed:', err);
        })
    );
  },
};
