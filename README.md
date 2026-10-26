# Samvad Intel (संवाद इंटेल)

> **High-Precision Multilingual Information Intelligence & Research Platform**  
> **Created & Architected by Shubham Sonale**  
> Powered by Cloudflare Workers, Edge D1 Distributed SQL, and Multi-Source Wire Verification.

---

## 1. Product Vision & Purpose

**Samvad Intel** transforms conventional regional news aggregation into a professional, high-performance **information intelligence and research platform**. 

Traditional news portals often present unverified, noisy RSS warehouses that blur the line between raw wire data and verified facts. **Samvad Intel** bridges this gap by providing an open, verifiable intelligence engine that aggregates, classifies, and cryptographically traces communications from official gazettes, government agencies, and regional bureaus across **Marathi (`mr`), Hindi (`hi`), and English (`en`)**.

### Core Value Propositions
- **Source Transparency & Provenance:** Every piece of intelligence retains its cryptographic origin, publishing entity, and external reference URL.
- **Strict Staging Separation:** Incoming RSS/Atom wires land in a staging pool and must pass through an editorial lifecycle (`incoming` → `review` → `approved` → `published`) before public exposure.
- **Zero Database Bloat:** Cryptographic SHA-256 deduplication and an automated 14-day retention rule for unreviewed staging keep the edge database efficient while permanently preserving all verified dossiers.
- **Multilingual Intelligence:** Native cross-lingual taxonomy spanning regional affairs (Maharashtra), national policy (Desh), global dynamics (World), economy, technology, and governance.

---

## 2. Intended Users & Use Cases

- **Policy Researchers & Analysts:** Track official government briefings (e.g., Press Information Bureau, state departments) with verified audit trails.
- **Investigative Journalists & Fact-Checkers:** Trace wire origins, compare regional reporting, and cross-reference multiple news sources.
- **Corporate & Regulatory Intelligence Teams:** Monitor state infrastructure tenders, agricultural economy trends, and legislative developments in real time.
- **Editorial Newsrooms:** Curate, edit, and publish verified situation dossiers using a secure, session-authenticated editorial workbench.

---

## 3. System Architecture

Samvad Intel combines a serverless edge backend on Cloudflare with a client-side Single-Page Application (SPA) running in React 19 and Tailwind CSS.

```
                              ┌────────────────────────────────────────┐
                              │              PUBLIC USERS              │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                                       Cloudflare Workers Edge
                                 (Routing & Asset Cache Layer)
                                                  │
                 ┌────────────────────────────────┴───────────────────────────────┐
                 │                                                                │
                 ▼                                                                ▼
      GET /api/news (Strictly Published)                           REST /api/editorial/* & /api/admin/*
                 │                                                                │
                 ▼                                                                ▼
       Cloudflare D1 Database                                       HttpOnly Session Token Validation
  (Published Dossiers & Sources)                                                  │
                                                                                  ▼
                                                                     Cloudflare D1 Database (All Pools)
                                                                 (Incoming, Review, Approved, Published)
                                                                                  ▲
                                                                                  │
                                                                   Scheduled Cron (*/30 min)
                                                                  Wire Ingestion & SHA-256 Hashing
```

### Backend Capabilities (Preserved from Underlying Engine)
1. **Cloudflare Worker Entrypoint (`src/worker/index.ts`):**
   - Routes `/api/*` requests to the D1 REST router.
   - Serves built SPA static assets via Cloudflare `env.ASSETS` with single-page fallback.
   - Runs background ingestion every 30 minutes via Cloudflare Cron Triggers (`*/30 * * * *`).
2. **Edge D1 Database (`migrations/`):**
   - Distributed SQLite cluster with five applied migrations (`0001` through `0005`).
   - Stores `news_sources`, `stories` (with full `content` and editorial fields), and `editorial_sessions`.
3. **Ingestion & Classification Pipeline (`src/worker/ingestion.ts`, `src/worker/classifier.ts`):**
   - High-fault-tolerant RSS/Atom feed parser (`rssParser.ts`).
   - Keyword and contextual classification into standard domains (`maharashtra`, `desh`, `world`, `politics`, `economy`, `education`, `tech`, `sports`, `editorial`).
   - Canonical SHA-256 content hashing to eliminate duplicates.
   - Non-destructive 14-day archiving rule for unreviewed incoming items.
4. **Session Authentication & Security (`src/worker/api.ts`):**
   - Cryptographic constant-time validation of admin credentials against `ADMIN_API_KEY`.
   - Ephemeral HttpOnly cookie sessions stored in D1 (`editorial_sessions`).
   - Zero exposure of admin credentials or draft/incoming stories to public endpoints.

---

## 4. Frontend Design & Information Architecture

The frontend has been rebuilt from a traditional Marathi newspaper format into a minimal, dark-mode-first intelligence suite:

1. **Intelligence Stream (Live Wire):**
   - Replaces the newspaper homepage with an interactive intelligence dashboard.
   - Real-time published wire records directly retrieved from Cloudflare D1.
   - Filterable by provenance group (*Verified Official*, *National Wire*, *Global Intelligence*), topic domain, and language (*Marathi*, *Hindi*, *English*).
   - Read-only for public visitors (no public ingestion triggers).
2. **Research Dossier Reader:**
   - Streamlined, distraction-free reading experience with academic/research citation export.
   - Full-text multi-paragraph body rendering without truncation.
   - Source provenance metadata, authoring agency, and D1 cryptographic verification trail.
   - Graceful fallback messaging (*ही बातमी सध्या उपलब्ध नाही*) for non-existent or unapproved records.
3. **Domain Exploration Pages:**
   - Dedicated deep dives for individual categories with language sub-filtering.
4. **Research Query Engine (`⌘K` Modal & Search Page):**
   - Global keyboard-driven search across dossiers, agencies, and tags.
5. **Saved Research Dossiers:**
   - Local research bookmarking system with persistence for synthesis and review.
6. **Source Transparency Directory:**
   - Live query of active backend sources (`/api/sources`) showing group, language, protocol, and homepage verification links.
7. **Periodic Intelligence Briefings:**
   - Synthesized situational reviews and analytical briefings derived from verified D1 streams.

---

## 5. Technology Stack

- **Runtime & Deployment:** Cloudflare Workers, Cloudflare D1 Database, Cloudflare Assets
- **Frontend Framework:** React 19, TypeScript 5.7, Vite 6
- **Styling:** Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono, Newsreader
- **Icons:** Lucide React
- **CLI & Deployment Tools:** Wrangler 4.x, Node.js / Tsx

---

## 6. Repository Structure

```
├── index.html                   # HTML entry point with Samvad Intel metadata & web fonts
├── metadata.json                # Project capabilities and metadata
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── wrangler.jsonc               # Cloudflare Workers, D1 binding, and Cron trigger configuration
├── scripts/
│   └── prepare-cloudflare.js    # Pre-build validation script for Cloudflare D1 ID
├── migrations/                  # D1 SQLite Database Migrations
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_source_groups.sql
│   ├── 0003_add_editorial_fields.sql
│   ├── 0004_editorial_sessions.sql
│   └── 0005_add_story_content.sql
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root routing dispatcher and application state
│   ├── index.css                # Global CSS rules, typography, and scroll utilities
│   ├── types/
│   │   └── news.ts              # Frontend TypeScript definitions for articles, categories, and sources
│   ├── utils/
│   │   ├── router.ts            # Hash router supporting article slugs, domains, and editorial desk
│   │   ├── readingPreferences.ts# LocalStorage preferences hook (theme, font size, bookmarks)
│   │   └── dateFormatter.ts     # Bilingual date and relative time formatting helpers
│   ├── services/
│   │   └── newsService.ts       # Content abstraction layer interfacing with D1 /api/* endpoints
│   ├── data/
│   │   ├── categories.ts        # Category slugs, English & Marathi labels, and descriptions
│   │   ├── newsArticles.ts      # Offline baseline intelligence articles
│   │   ├── tickerData.ts        # Real-time briefing updates
│   │   └── editionData.ts       # Editorial board information
│   ├── components/
│   │   ├── common/
│   │   │   ├── TopNav.tsx                   # Platform navigation bar with edge telemetry & search shortcut
│   │   │   ├── IntelligenceFooter.tsx       # System architecture, standards & disclosure footer
│   │   │   ├── IntelligenceSearchModal.tsx  # Cmd+K search modal with domain filtering
│   │   │   └── ImageWithFallback.tsx        # Fallback-safe image rendering component
│   │   └── editorial/
│   │       └── StoryWorkspace.tsx           # Multi-pane newsroom workspace (Editor, Wire, Preview)
│   ├── pages/
│   │   ├── IntelligenceStreamPage.tsx       # Primary intelligence homepage
│   │   ├── IntelligenceDossierPage.tsx      # Full dossier reading page with citation tools
│   │   ├── IntelligenceCategoryPage.tsx     # Topic domain exploration view
│   │   ├── IntelligenceSearchPage.tsx       # Query engine page
│   │   ├── ResearchDossierPage.tsx          # Saved research dossiers list
│   │   ├── MethodologyPage.tsx              # System architecture and verification standards
│   │   ├── SourceDirectoryPage.tsx          # Source transparency directory and feed nomination
│   │   ├── BriefingArchivesPage.tsx         # Periodic situation reports and briefings
│   │   └── EditorialDashboardPage.tsx       # Restricted staff editorial desk
│   └── worker/                  # Cloudflare Worker Backend
│       ├── index.ts             # Worker fetch & scheduled cron dispatcher
│       ├── api.ts               # REST API endpoints (Public & Protected Editorial)
│       ├── ingestion.ts         # Multi-source RSS/Atom fetcher, deduplication & retention engine
│       ├── rssParser.ts         # Robust XML feed parser
│       ├── classifier.ts        # Domain classifier
│       └── types.ts             # Worker environment, D1, and feed types
└── test/                        # Complete backend and architecture verification suites
    ├── test_router.ts
    ├── test_editorial_auth.ts
    ├── test_editorial_dashboard.ts
    ├── test_homepage_api_integration.ts
    ├── test_article_reading_pipeline.ts
    └── test_ux_and_architecture_fixes.ts
```

---

## 7. Verified Backend API Overview

All public endpoints are strictly read-only and return only published records. Private editorial endpoints require a valid session.

### Public Read-Only Endpoints
- `GET /api/sources`: Returns all active news and wire sources grouped by `source_group`.
- `GET /api/news`: Returns paginated published intelligence stories with optional `category`, `source_group`, `page`, and `limit` query parameters.
- `GET /api/news/category/:category`: Returns published stories filtered by category.
- `GET /api/news/:id`: Returns a specific published story by `id` or `source_guid`. Returns `HTTP 404` for non-existent or unpublished stories.

### Protected Editorial Endpoints (Requires Session Cookie or Bearer Token)
- `POST /api/editorial/auth/login`: Authenticates credentials against `ADMIN_API_KEY` and creates a 24-hour session in `editorial_sessions`.
- `POST /api/editorial/auth/logout`: Destroys the active session in D1.
- `GET /api/editorial/auth/session`: Checks whether the current client holds an active authenticated session.
- `GET /api/editorial/stats`: Returns counts across `incoming`, `review`, `approved`, `published`, `rejected`, and `archived`.
- `GET /api/editorial/incoming`: Returns incoming unreviewed wire stories.
- `GET /api/editorial/stories`: Generic query across any editorial status.
- `PATCH /api/editorial/story/:id`: Updates title, content, category, language, or notes without corrupting original wire metadata.
- `POST /api/editorial/story/:id/review`: Advances story to `review`.
- `POST /api/editorial/story/:id/approve`: Advances story to `approved`.
- `POST /api/editorial/story/:id/publish`: Transitions approved story to `published`.
- `POST /api/editorial/story/:id/reject`: Transitions story to `rejected`.
- `POST /api/editorial/story/:id/archive`: Archives a story.
- `POST /api/admin/refresh`: Manually triggers the RSS wire ingestion pipeline (authenticated staff only).

---

## 8. Local Development & Installation

### Prerequisites
- Node.js 20+
- npm or bun

### Setup Instructions
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Run the local development server:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

3. Run linting & type checks:
   ```bash
   npm run lint
   ```

4. Execute backend test suites:
   ```bash
   npx tsx test/test_router.ts
   npx tsx test/test_editorial_auth.ts
   npx tsx test/test_editorial_dashboard.ts
   npx tsx test/test_homepage_api_integration.ts
   npx tsx test/test_article_reading_pipeline.ts
   npx tsx test/test_ux_and_architecture_fixes.ts
   ```

---

## 9. Cloudflare Deployment Instructions

The project is configured for direct deployment to Cloudflare Workers with D1 and Assets bindings.

### Configuration (`wrangler.jsonc`)
- Worker entry point: `src/worker/index.ts`
- Asset directory: `./dist` (configured as a single-page application)
- Database binding: `DB` pointing to `bahumol-samaj-db`
- Cron triggers: `["*/30 * * * *"]`

### Production Build & Deploy
1. Build frontend assets and validate D1 configuration:
   ```bash
   npm run build
   ```
2. Verify deployment locally via dry run:
   ```bash
   npx wrangler deploy --dry-run
   ```
3. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

### D1 Database Migrations
To apply migrations on the remote Cloudflare D1 database:
```bash
npm run d1:migrate
```

---

## 10. Required Environment Variables & Secrets

Configure secrets via Cloudflare Dashboard or Wrangler CLI (never commit values to version control):

| Variable / Secret | Scope | Purpose |
| :--- | :--- | :--- |
| `ADMIN_API_KEY` | Worker Secret | Secret credential used by editorial staff to authenticate at `/api/editorial/auth/login`. |
| `ENVIRONMENT` | Worker Variable | Environment designation (e.g., `production` or `development`) to enforce secure cookies. |

---

## 11. Security Considerations

- **Strict Status Gating:** Unauthenticated visitors have access only to `status = 'published'` records. Incoming, under review, rejected, or archived stories return HTTP 404 on the public API.
- **Timing-Safe Secret Verification:** Secret keys submitted to `/api/editorial/auth/login` are compared using `crypto.subtle` SHA-256 digests in constant time to prevent timing attacks.
- **Credential Isolation:** The `ADMIN_API_KEY` is never transmitted to the browser or included in client bundle outputs. Sessions rely on random 24-byte tokens.
- **Read-Only Public Surface:** Public visitors cannot initiate ingestion or insert records into D1.

---

## 12. Current Implementation Status & Roadmap

### Implemented & Verified Capabilities
- [x] Modern Samvad Intel product identity, typography, and high-contrast dark theme.
- [x] Live intelligence stream homepage connected to Cloudflare D1 `/api/news`.
- [x] Dedicated research dossier reader with citation export and full body rendering.
- [x] Topic domain exploration pages with multilingual toggles (`mr`, `hi`, `en`).
- [x] Quick search modal (`⌘K`) and full-page query engine.
- [x] Source transparency catalog querying `/api/sources`.
- [x] Local research dossier bookmarking with LocalStorage persistence.
- [x] Preserved editorial dashboard (`#/editorial-desk`) with HttpOnly session authentication and full status lifecycle.
- [x] 100% passing test coverage across 6 backend and UX test suites (84 total assertions passed).

### Planned Future Capabilities
- [ ] Export of research dossiers to Markdown and BibTeX formats.
- [ ] Interactive source graph visualization depicting wire citation relationships.
- [ ] Automated alerting webhooks for high-priority government gazette announcements.
- [ ] Granular role-based access control (Admin, Senior Editor, Wire Analyst).

---

## 13. Creator & Attribution

**Samvad Intel** was created and architected by **Shubham Sonale**.

- **Creator:** Shubham Sonale
- **Role:** Lead System Architect & Product Designer
- **Vision:** Open, verifiable, edge-native information intelligence platform unifying multilingual regional journalism, official governance feeds, and analytical research workflows.
- **License:** Proprietary / Open Intelligence Architecture

