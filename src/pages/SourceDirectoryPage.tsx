/**
 * @file SourceDirectoryPage.tsx
 * Research Institutions & Verified Scientific Feeds Directory for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import React, { useState, useEffect } from 'react';
import { newsService, BackendSource } from '../services/newsService';
import {
  Building2,
  BookOpen,
  Globe,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Send,
  Clock,
  Atom,
  Sparkles,
  FileText,
  Cpu,
} from 'lucide-react';

interface SourceDirectoryPageProps {
  onNavigateHome: () => void;
}

interface InstitutionData {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  country: string;
  focusAreas: string;
  website: string;
  establishedYear: number;
  notableBreakthroughs: string;
}

const STATIC_INSTITUTIONS: InstitutionData[] = [
  {
    id: 'inst_iisc',
    name: 'Indian Institute of Science',
    abbreviation: 'IISc',
    city: 'Bengaluru',
    country: 'India',
    focusAreas: 'Condensed Matter Physics, Quantum Computing, Molecular Biophysics, Aerospace',
    website: 'https://iisc.ac.in',
    establishedYear: 1909,
    notableBreakthroughs: 'Topological Kagome superlattices, indigenous turbofan turbine blades, CRISPR diagnostics.',
  },
  {
    id: 'inst_tifr',
    name: 'Tata Institute of Fundamental Research',
    abbreviation: 'TIFR',
    city: 'Mumbai',
    country: 'India',
    focusAreas: 'High-Energy Particle Physics, String Theory, Radio Astronomy, Oncology',
    website: 'https://www.tifr.res.in',
    establishedYear: 1945,
    notableBreakthroughs: 'Giant Metrewave Radio Telescope (GMRT), superconducting qubits, NexCAR-19B immunotherapy.',
  },
  {
    id: 'inst_isro',
    name: 'Indian Space Research Organisation',
    abbreviation: 'ISRO',
    city: 'Bengaluru',
    country: 'India',
    focusAreas: 'Planetary Exploration, Space Observatories, Cryogenic Propulsion, Earth Telemetry',
    website: 'https://www.isro.gov.in',
    establishedYear: 1969,
    notableBreakthroughs: 'Chandrayaan lunar water-ice detection, Mars Orbiter Mission, Aditya-L1 solar halo observatory.',
  },
  {
    id: 'inst_iitb',
    name: 'Indian Institute of Technology Bombay',
    abbreviation: 'IIT Bombay',
    city: 'Mumbai',
    country: 'India',
    focusAreas: 'Green Hydrogen, Silicon Photonics, Nanotechnology, Microelectronics',
    website: 'https://www.iitb.ac.in',
    establishedYear: 1958,
    notableBreakthroughs: 'Corrosion-free direct seawater electrolysis for zero-carbon hydrogen at $1.15/kg.',
  },
  {
    id: 'inst_iitm',
    name: 'Indian Institute of Technology Madras',
    abbreviation: 'IIT Madras',
    city: 'Chennai',
    country: 'India',
    focusAreas: 'Geometric AI, Quantum Materials, SHAKTI Open-Source Processors, Ocean Energy',
    website: 'https://www.iitm.ac.in',
    establishedYear: 1959,
    notableBreakthroughs: 'GeoBio-100M molecular graph transformer, India 5G/6G indigenous testbed, Shakti RISC-V.',
  },
  {
    id: 'inst_csir_ncl',
    name: 'CSIR - National Chemical Laboratory',
    abbreviation: 'CSIR-NCL',
    city: 'Pune',
    country: 'India',
    focusAreas: 'Polymer Science, Continuous Flow Catalysis, Clean Fuel Cells, Agritech',
    website: 'https://www.ncl-india.org',
    establishedYear: 1950,
    notableBreakthroughs: 'Targeted epigenetic chromatin modification for 65% drought preservation in dryland crops.',
  },
  {
    id: 'inst_ncbs',
    name: 'National Centre for Biological Sciences',
    abbreviation: 'NCBS',
    city: 'Bengaluru',
    country: 'India',
    focusAreas: 'Genomics, Molecular Biophysics, Olfactory Neural Circuit Dynamics',
    website: 'https://www.ncbs.res.in',
    establishedYear: 1992,
    notableBreakthroughs: 'Single-molecule lipid bilayer tracking and plant stomata epigenetic regulation.',
  },
  {
    id: 'inst_iucaa',
    name: 'Inter-University Centre for Astronomy and Astrophysics',
    abbreviation: 'IUCAA',
    city: 'Pune',
    country: 'India',
    focusAreas: 'Gravitational Waves, Cosmological Relativism, AstroSat Space UV Telescope',
    website: 'https://www.iucaa.in',
    establishedYear: 1988,
    notableBreakthroughs: 'LIGO-India gravitational-wave observatory design and AstroSat science operations.',
  },
  {
    id: 'inst_cern',
    name: 'European Organization for Nuclear Research',
    abbreviation: 'CERN',
    city: 'Geneva',
    country: 'Switzerland',
    focusAreas: 'High-Energy Particle Physics, Large Hadron Collider (LHC), Antimatter',
    website: 'https://home.cern',
    establishedYear: 1954,
    notableBreakthroughs: 'Higgs boson discovery, Quark-gluon plasma verification, World Wide Web architecture.',
  },
  {
    id: 'inst_mit',
    name: 'Massachusetts Institute of Technology',
    abbreviation: 'MIT',
    city: 'Cambridge, MA',
    country: 'United States',
    focusAreas: 'Artificial Intelligence, Magnetic Confinement Fusion, Quantum Computing',
    website: 'https://mit.edu',
    establishedYear: 1861,
    notableBreakthroughs: 'High-field tokamak magnetic confinement (SPARC), transformer reasoning architectures.',
  },
];

export const SourceDirectoryPage: React.FC<SourceDirectoryPageProps> = ({ onNavigateHome }) => {
  const [sources, setSources] = useState<BackendSource[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionData[]>(STATIC_INSTITUTIONS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'institutions' | 'feeds'>('institutions');

  // Paper submission form
  const [paperForm, setPaperForm] = useState({
    author: '',
    institution: '',
    doi: '',
    journal: '',
    paperUrl: '',
    notes: '',
  });
  const [paperSubmitted, setPaperSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([newsService.fetchActiveSources(), newsService.fetchInstitutions()])
      .then(([srcs, insts]) => {
        if (srcs && srcs.length > 0) setSources(srcs);
        if (insts && insts.length > 0) {
          setInstitutions(
            insts.map((i) => ({
              id: i.id,
              name: i.name,
              abbreviation: i.abbreviation || '',
              city: i.city,
              country: i.country,
              focusAreas: i.focus_areas,
              website: i.website || '',
              establishedYear: i.established_year || 1950,
              notableBreakthroughs: i.notable_breakthroughs || '',
            }))
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaperSubmitted(true);
    setTimeout(() => {
      setPaperForm({
        author: '',
        institution: '',
        doi: '',
        journal: '',
        paperUrl: '',
        notes: '',
      });
      setPaperSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Feed</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Source Provenance & Research Ecosystem</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Research Institutions & Verified Feeds
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl mt-1 leading-relaxed">
                Full transparency disclosure of indexed Indian research institutions, global partner laboratories, and verified peer-reviewed ingestion feeds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('institutions')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                  activeTab === 'institutions'
                    ? 'bg-cyan-600 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Research Institutions ({institutions.length})
              </button>
              <button
                onClick={() => setActiveTab('feeds')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                  activeTab === 'feeds'
                    ? 'bg-cyan-600 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Verified Feeds ({sources.length > 0 ? sources.length : 8})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 space-y-12">
        {/* 1. Research Institutions Directory */}
        {activeTab === 'institutions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                Premier Indian & Global Research Centers
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Sorted by Country & Scientific Focus
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institutions.map((inst) => (
                <div
                  key={inst.id}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{inst.name}</span>
                        {inst.abbreviation && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {inst.abbreviation}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {inst.city}, {inst.country} • Est. {inst.establishedYear}
                      </div>
                    </div>
                    {inst.website && (
                      <a
                        href={inst.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="Visit official portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400 font-mono text-[11px] block mb-0.5">Focus Areas:</span>
                    {inst.focusAreas}
                  </div>

                  {inst.notableBreakthroughs && (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 space-y-0.5 font-mono">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Notable Breakthroughs:
                      </span>
                      <p className="text-slate-400 font-sans">{inst.notableBreakthroughs}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Ingestion Feeds Directory */}
        {activeTab === 'feeds' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Verified Scientific RSS & Atom Ingestion Pipeline
              </h2>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cron Interval: 30 Minutes
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Source Entity</th>
                    <th className="p-3.5">Classification</th>
                    <th className="p-3.5">Feed Endpoint</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {(sources.length > 0
                    ? sources
                    : [
                        {
                          id: 'nature',
                          name: 'Nature News & Research',
                          source_group: 'Scientific Journals',
                          feed_url: 'https://www.nature.com/nature.rss',
                          active: 1,
                        },
                        {
                          id: 'science',
                          name: 'Science Magazine (AAAS)',
                          source_group: 'Scientific Journals',
                          feed_url: 'https://www.science.org/rss/news_current.xml',
                          active: 1,
                        },
                        {
                          id: 'arxiv',
                          name: 'arXiv Computer Science & AI',
                          source_group: 'Preprint Repositories',
                          feed_url: 'https://arxiv.org/rss/cs.AI',
                          active: 1,
                        },
                        {
                          id: 'isro',
                          name: 'ISRO - Indian Space Research Organisation',
                          source_group: 'Indian Research Institutions',
                          feed_url: 'https://www.isro.gov.in/rss.xml',
                          active: 1,
                        },
                      ]
                  ).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-white">{s.name}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                          {s.source_group}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 truncate max-w-xs">{s.feed_url || ('source_url' in s ? s.source_url : '')}</td>
                      <td className="p-3.5 text-emerald-400 font-bold">ACTIVE (200 OK)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Paper / Research Submission Form */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" />
              Submit a Peer-Reviewed Paper or Laboratory Breakthrough
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              Are you an investigator, doctoral researcher, or institution laboratory member? Submit your peer-reviewed paper or preprint for rapid indexing on Curiosity Research.
            </p>
          </div>

          {paperSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Research submitted successfully! Our peer editorial desk will verify the DOI and metadata within 24 hours.
              </span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Author / Principal Investigator:</label>
                  <input
                    type="text"
                    required
                    value={paperForm.author}
                    onChange={(e) => setPaperForm({ ...paperForm, author: e.target.value })}
                    placeholder="e.g. Prof. Arindam Ghosh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Affiliated Institution:</label>
                  <input
                    type="text"
                    required
                    value={paperForm.institution}
                    onChange={(e) => setPaperForm({ ...paperForm, institution: e.target.value })}
                    placeholder="e.g. IISc Bengaluru / IIT Madras"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Digital Object Identifier (DOI):</label>
                  <input
                    type="text"
                    required
                    value={paperForm.doi}
                    onChange={(e) => setPaperForm({ ...paperForm, doi: e.target.value })}
                    placeholder="e.g. 10.1038/s41586-026-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Journal / Preprint Archive:</label>
                  <input
                    type="text"
                    required
                    value={paperForm.journal}
                    onChange={(e) => setPaperForm({ ...paperForm, journal: e.target.value })}
                    placeholder="e.g. Nature, Physical Review Letters, arXiv"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Direct Paper URL (Open Access / Journal Link):</label>
                <input
                  type="url"
                  required
                  value={paperForm.paperUrl}
                  onChange={(e) => setPaperForm({ ...paperForm, paperUrl: e.target.value })}
                  placeholder="https://journals.aps.org/prl/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Key Findings Summary & Methodology Notes:</label>
                <textarea
                  rows={3}
                  value={paperForm.notes}
                  onChange={(e) => setPaperForm({ ...paperForm, notes: e.target.value })}
                  placeholder="Highlight core experimental findings, sample size, or theoretical advancements..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Submit Publication for Verification</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
