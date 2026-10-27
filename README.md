# Curiosity Research

> **Discover What’s Next.**  
> **Global Science, Research & Emerging Technology Discovery Platform**  
> **Created & Architected by Shubham Sonale**  
> Built on Cloudflare Workers, Edge D1 Distributed SQL, and Peer-Reviewed Ingestion Pipelines.

---

## 1. Product Vision & Purpose

**Curiosity Research** transforms scientific discovery and emerging technology journalism into an open, high-precision research intelligence platform.

Contemporary scientific reporting is frequently fragmented between sensationalized summaries, inaccessible corporate paywalls, and noisy preprint servers. **Curiosity Research** bridges this divide by providing an elegant, distraction-free discovery engine that indexes peer-reviewed papers, connects readers directly to primary Digital Object Identifiers (DOIs), and tracks technological breakthroughs across global laboratories and premier Indian research powerhouses.

### The Five Core Pillars

1. **Premium Science & Technology Magazine:** In-depth, high-fidelity investigative features that elucidate complex experimental breakthroughs without compromising technical rigor.
2. **Research Explorer for Scientific Papers:** Every publication is cataloged with its verified DOI, journal name, publication year, author affiliations, and one-click citation generators (BibTeX, APA, IEEE).
3. **Real-Time Breakthrough Discovery Feed:** Automated 30-minute edge ingestion polling leading wire sources (Nature, Science, arXiv, Phys.org) with cryptographic SHA-256 deduplication.
4. **Multi-Domain Topic Exploration:** Comprehensive categorization spanning 10 core scientific frontiers:
   - Space & Astrophysics
   - Quantum & High-Energy Physics
   - Artificial Intelligence & Computing
   - Biotechnology & Genomics
   - Medicine & Clinical Health
   - Chemistry & Materials Science
   - Clean Energy & Climate Science
   - Robotics & Autonomous Systems
   - Advanced Engineering & Nanotechnology
   - Perspectives & Reviews
5. **Coverage of Indian Research Institutions:** Dedicated spotlight on landmark publications and indigenous technologies originating from IISc Bengaluru, TIFR Mumbai, ISRO, IITs, and CSIR laboratories.

---

## 2. Creator Attribution

- **Platform Creator & System Architect:** **Shubham Sonale**
- **Contact:** `shubhamsonale2004@gmail.com`
- **Product Tagline:** *Discover What's Next.*
- **Mission:** Democratizing open, verifiable scientific intelligence with zero paid API dependencies and uncompromising source transparency.

---

## 3. Intended Users & Use Cases

- **Academic & Doctoral Researchers:** Monitor incoming preprints and journal findings across interdisciplinary fields; export citations directly into `.bib` files for LaTeX literature reviews.
- **Engineers & Deep-Tech Founders:** Track innovations in solid-state quantum devices, green hydrogen catalysts, and non-Euclidean graph transformers.
- **Science Journalists & Communicators:** Trace technological assertions back to their raw experimental datasets and primary peer-reviewed DOI publications.
- **Students & Curious Minds:** Explore frontiers of human knowledge with clear, authoritative scientific explanations grounded in verifiable evidence.
- **Peer Editorial Newsroom:** Review, verify, and approve incoming research submissions through a secure, session-authenticated editorial workbench.

---

## 4. System Architecture

Curiosity Research deploys a globally distributed edge architecture combining Cloudflare Workers, serverless D1 SQLite persistence, and a high-performance React 19 frontend.

```
                               ┌────────────────────────────────────────┐
                               │           RESEARCH EXPLORERS           │
                               │        (Desktop & Mobile Web)          │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   ▼
                                        Cloudflare Workers Edge
                                  (Routing & Single-Page Asset Cache)
                                                   │
                  ┌────────────────────────────────┴───────────────────────────────┐
                  │                                                                │
                  ▼                                                                ▼
       GET /api/news (Strictly Published)                           REST /api/editorial/* & /api/admin/*
       GET /api/institutions (Research Hubs)                                       │
                  │                                                                ▼
                  ▼                                                HttpOnly Session Token Validation
        Cloudflare D1 Database                                                     │
   (Published Papers, Hubs & Sources)                                              ▼
                                                                     Cloudflare D1 Database (All Pools)
                                                                 (Incoming, Review, Approved, Published)
                                                                                   ▲
                                                                                   │
                                                                    Scheduled Cron (*/30 min)
                                                                 Scientific Ingestion & SHA-256 Hashing
```

### Backend Capabilities (Preserved & Reused Engine)

1. **Cloudflare Worker Entrypoint (`src/worker/index.ts`):**
   - Directs `/api/*` requests to the D1 REST router.
   - Serves built SPA static assets via Cloudflare `env.ASSETS` with single-page fallback.
   - Triggers background wire polling every 30 minutes via Cloudflare Cron Triggers (`*/30 * * * *`).
2. **Edge D1 Database (`migrations/`):**
   - Serverless SQLite cluster with 6 migrations (`0001` through `0006`).
   - Cleaned of obsolete newspaper stories while preserving table structures (`news_sources`, `stories`, `editorial_sessions`, and `research_institutions`).
   - Additive schema additions for scientific research metadata (`doi`, `journal_name`, `publication_year`, `primary_institution`, `paper_url`, `citation_count`, `is_breakthrough`).
3. **Ingestion & Classifier Pipeline (`src/worker/ingestion.ts`, `src/worker/classifier.ts`):**
   - High-fault-tolerant, zero-dependency RSS/Atom parser (`rssParser.ts`).
   - Deterministic keyword and contextual classifier mapping articles into scientific disciplines.
   - Canonical SHA-256 content hashing (`title|source_url`) preventing duplicate records.
   - Automated 14-day archival retention rule preventing database bloat while permanently protecting approved and published research dossiers.
4. **Session Authentication & Security (`src/worker/api.ts`):**
   - Cryptographic constant-time comparison against `env.ADMIN_API_KEY` preventing timing attacks.
   - Ephemeral HttpOnly cookie sessions stored in D1 (`editorial_sessions`).
   - Unpublished research papers (`incoming`, `review`, `rejected`) strictly return HTTP 404 on public APIs.

---

## 5. Technology Stack

- **Frontend:** React 19, TypeScript 5.7, Tailwind CSS v4, Vite 6
- **Icons:** Lucide React
- **Backend / Edge Runtime:** Cloudflare Workers (TypeScript)
- **Database:** Cloudflare D1 (Serverless Distributed SQLite)
- **Typography:** Plus Jakarta Sans (Modern UI), JetBrains Mono (Technical indicators & DOIs), Newsreader (Serif academic dossier reading)
- **Tooling:** Wrangler 4, tsx, Node.js 22

---

## 6. Repository Structure

```
├── .gitignore
├── README.md                      # Comprehensive product documentation
├── index.html                     # HTML5 entry point with scientific metadata & JSON-LD
├── metadata.json                  # AI Studio metadata & capabilities
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Vite bundler configuration with Tailwind v4 plugin
├── wrangler.jsonc                 # Cloudflare Worker & D1 binding configuration
│
├── migrations/                    # D1 SQLite Database Migrations
│   ├── 0001_initial_schema.sql    # Base tables: news_sources, stories, indexes
│   ├── 0002_add_source_groups.sql # Categorization groups
│   ├── 0003_add_editorial_fields.sql # Editorial audit columns
│   ├── 0004_editorial_sessions.sql   # Session authentication table
│   ├── 0005_add_story_content.sql    # Full article/paper content body
│   └── 0006_curiosity_research.sql   # Scientific metadata, institutions & paper seeds
│
├── scripts/
│   └── prepare-cloudflare.js      # Build preparation & D1 validation helper
│
├── src/
│   ├── main.tsx                   # React root entry point
│   ├── App.tsx                    # Top-level routing composition & state management
│   ├── index.css                  # Global Tailwind v4 CSS imports
│   │
│   ├── types/
│   │   ├── news.ts                # Core Article, Category, Author, and Status interfaces
│   │   └── research.ts            # ResearchDiscipline, ScientificPaper, Institution types
│   │
│   ├── data/
│   │   ├── categories.ts          # 10 Scientific disciplines + backward-compatible categories
│   │   ├── newsArticles.ts        # Landmark scientific papers & research dossiers (with DOIs)
│   │   ├── tickerData.ts          # Real-time scientific breakthrough briefs
│   │   └── editionData.ts         # Monthly compendium & curator metadata (Shubham Sonale)
│   │
│   ├── services/
│   │   └── newsService.ts         # Data layer abstraction (Worker API + local fallback)
│   │
│   ├── utils/
│   │   ├── router.ts              # Hash-based SPA routing engine (#/article/:id, #/category/:slug)
│   │   └── readingPreferences.ts  # Theme, font-size, and workstation bookmark state
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── TopNav.tsx                 # Curiosity Research global navigation header
│   │   │   ├── IntelligenceFooter.tsx     # Platform footer with institutions & creator credit
│   │   │   ├── IntelligenceSearchModal.tsx # Cmd+K paper and DOI search modal
│   │   │   └── ImageWithFallback.tsx      # Robust asset rendering with placeholder fallback
│   │   └── editorial/
│   │       └── StoryWorkspace.tsx         # Newsroom editing and publishing workspace
│   │
│   ├── pages/
│   │   ├── IntelligenceStreamPage.tsx     # Primary Science Magazine & Breakthrough Wire
│   │   ├── IntelligenceDossierPage.tsx    # Academic Paper Dossier reader with citation generator
│   │   ├── IntelligenceCategoryPage.tsx   # Discipline exploration page (Space, Quantum, AI...)
│   │   ├── IntelligenceSearchPage.tsx     # Full-scale scientific research query explorer
│   │   ├── ResearchDossierPage.tsx        # Personal research workstation with BibTeX export
│   │   ├── MethodologyPage.tsx            # About, verification protocols, creator attribution
│   │   ├── SourceDirectoryPage.tsx        # Institutions & verified feeds catalog + submission
│   │   ├── BriefingArchivesPage.tsx       # Monthly research compendiums (Vol. I-III)
│   │   └── EditorialDashboardPage.tsx     # Peer-review & publishing dashboard
│   │
│   └── worker/
│       ├── index.ts               # Cloudflare Worker fetch & cron handlers
│       ├── api.ts                 # REST API router (/api/news, /api/institutions, /api/editorial/*)
│       ├── ingestion.ts           # Wire fetcher, SHA-256 hasher, retention manager
│       ├── classifier.ts          # Deterministic keyword discipline classifier
│       ├── rssParser.ts           # Zero-dependency XML RSS/Atom parser
│       └── types.ts               # Cloudflare Worker D1 schema types
│
└── test/                          # Comprehensive Verification Test Suites
    ├── test_router.ts             # Routing hash parsing & fallback isolation
    ├── test_editorial_auth.ts     # Constant-time auth & session lifecycle tests
    ├── test_editorial_dashboard.ts# Editorial workflow (draft -> approve -> publish)
    ├── test_homepage_api_integration.ts # API integration & static fallback tests
    ├── test_article_reading_pipeline.ts # Full-text content integrity tests
    └── test_ux_and_architecture_fixes.ts # End-to-end UX & retention rules tests
```

---

## 7. Verified Backend API Routes

All endpoints execute within the Cloudflare Worker runtime:

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/news` | Public | Returns published research articles with pagination, category, and source group filters. |
| `GET` | `/api/news/:id` | Public | Returns a single published article/paper. Returns HTTP 404 for draft, review, or rejected stories. |
| `GET` | `/api/sources` | Public | Returns registered scientific feeds with active status and group metadata. |
| `GET` | `/api/institutions`| Public | Returns directory of premier Indian and global research institutions. |
| `POST`| `/api/editorial/auth/login` | Public | Authenticates editor using timing-safe secret check; issues HttpOnly cookie. |
| `GET` | `/api/editorial/auth/session` | Protected | Validates active session token from cookie or Bearer header against D1. |
| `POST`| `/api/editorial/auth/logout`| Protected | Destroys active session record in D1 and clears cookie. |
| `GET` | `/api/editorial/incoming` | Protected | Lists unreviewed incoming papers awaiting editorial decision. |
| `GET` | `/api/editorial/stats` | Protected | Real-time counts of papers across status pools (`incoming`, `review`, `approved`, `published`, `rejected`). |
| `POST`| `/api/editorial/story/:id/approve` | Protected | Transitions paper to approved status. |
| `POST`| `/api/editorial/story/:id/publish` | Protected | Publishes approved research paper to the public `/api/news` wire. |
| `POST`| `/api/editorial/story/:id/reject` | Protected | Rejects paper with optional editorial reason. |
| `PATCH`|`/api/editorial/story/:id` | Protected | Updates editable metadata (title, abstract, content, DOI, institution, tags). |
| `POST`| `/api/admin/refresh` | Protected | Manually triggers ingestion pipeline execution. |

---

## 8. Local Development & Installation

### Prerequisites
- Node.js >= 20.0.0
- npm or bun

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### Step 3: Run Verification Test Suites
Execute all six verified unit and integration test suites:
```bash
npx tsx test/test_router.ts
npx tsx test/test_editorial_auth.ts
npx tsx test/test_editorial_dashboard.ts
npx tsx test/test_homepage_api_integration.ts
npx tsx test/test_article_reading_pipeline.ts
npx tsx test/test_ux_and_architecture_fixes.ts
```

### Step 4: Validate Production Build & Type Checking
```bash
npm run lint    # Runs tsc --noEmit
npm run build   # Prepares Cloudflare bindings and compiles production Vite bundle
```

---

## 9. Cloudflare Deployment Instructions

The project is preconfigured to deploy directly to Cloudflare Workers with Assets:

1. **Authenticate Wrangler:**
   ```bash
   npx wrangler login
   ```

2. **Run D1 Database Migrations (Remote):**
   ```bash
   npx wrangler d1 migrations apply bahumol-samaj-db --remote
   ```

3. **Configure Editorial Secret:**
   Set the secure editorial newsroom key in Cloudflare:
   ```bash
   npx wrangler secret put ADMIN_API_KEY
   ```

4. **Deploy Application:**
   ```bash
   npm run deploy
   ```

### Proposed Infrastructure Renames
To maintain complete deployment stability and prevent broken remote bindings, the Cloudflare Worker name (`bahumol-samaj`) and D1 database binding (`bahumol-samaj-db`) have been deliberately preserved in `wrangler.jsonc` and `package.json`.

**Recommended Remote Renaming Steps (When Ready):**
1. Create new D1 database: `npx wrangler d1 create curiosity-research-db`
2. Update `wrangler.jsonc`:
   - Set `"name": "curiosity-research"`
   - Set `"database_name": "curiosity-research-db"` and provide the newly returned `database_id`
3. Apply migrations to new database:
   ```bash
   npx wrangler d1 migrations apply curiosity-research-db --remote
   ```
4. Set secret on new worker: `npx wrangler secret put ADMIN_API_KEY --name curiosity-research`
5. Deploy: `npx wrangler deploy`

---

## 10. Security Considerations

- **Zero Hardcoded Secrets:** Secret validation executes exclusively against server-configured `env.ADMIN_API_KEY`. No default fallback credentials exist in the codebase.
- **Timing-Attack Resistance:** Verification uses `crypto.subtle.digest('SHA-256')` with XOR-sum constant-time byte loops.
- **Strict Public Status Gating:** Unreviewed incoming feeds, drafts, and rejected articles are never exposed on public read endpoints (`/api/news`). Attempting to access an unpublished record returns HTTP 404.
- **HttpOnly Cookie Sessions:** Editorial dashboard access utilizes server-side session IDs (`ses_*`) with `SameSite=Lax` and `HttpOnly` flags.
- **SQL Injection Prevention:** All D1 database queries utilize parameterized prepared statements (`db.prepare(...).bind(...)`).

---

## 11. Current Implementation Status vs Planned Capabilities

### Currently Implemented & Verified
- [x] Full product re-identity as **Curiosity Research** with creator attribution to **Shubham Sonale** (*Discover What’s Next*).
- [x] Premium science and technology magazine layout with featured landmark breakthroughs.
- [x] Research paper reader with DOI links, publisher links, academic affiliations, and abstracts.
- [x] One-click interactive Citation Generator (BibTeX, APA, IEEE formats).
- [x] Personal Research Workstation with bookmarking, literature review management, and `.bib` file download.
- [x] 10 Scientific disciplines taxonomy with multi-dimensional filtering.
- [x] Premier Indian Research Institutions catalog (IISc, TIFR, ISRO, IIT Bombay, IIT Madras, CSIR-NCL, NCBS, IUCAA).
- [x] Verified scientific wire sources catalog (Nature, Science, arXiv, Phys.org, ISRO).
- [x] Interactive paper submission flow for researchers and institutions.
- [x] Preserved session-authenticated editorial newsroom and peer-review pipeline.
- [x] D1 additive migration `0006_curiosity_research.sql` for scientific metadata and institution reference tables.
- [x] 100% pass rate across all 6 test suites (84/84 assertions).
- [x] Production build and TypeScript verification cleanly passing.

### Planned Future Roadmap
- [ ] Direct LaTeX and MathJax / KaTeX rendering in equation-dense theoretical physics papers.
- [ ] Interactive 3D molecular structures viewer (PDB/mmCIF WebGL render) for biochemical publications.
- [ ] Automated arXiv daily category sync via webhook.
- [ ] Reader customizable email digests for newly indexed papers matching specific keywords or DOIs.

---

## 12. License & Rights

Architected and developed by **Shubham Sonale**. Open research indexing and public scientific discovery provided under open-science principles.
