/**
 * @file newsArticles.ts
 * Curated scientific discovery articles and research papers for Curiosity Research.
 * Creator: Shubham Sonale
 * Tagline: Discover What's Next.
 */

import { Article } from '../types/news';

export const ARTICLES: Article[] = [
  {
    id: 'art-space-1',
    slug: 'aditya-l1-cme-shockwaves-inner-heliosphere',
    title: 'Aditya-L1 Detects Relativistic Coronal Mass Ejection Shockwaves in the Inner Heliosphere',
    subtitle: 'VELC and SUIT payloads confirm acoustic wave dissipation mechanisms heating outer solar corona to 2 million Kelvin',
    excerpt: 'Bengaluru: India’s solar observatory Aditya-L1 has provided direct observational evidence of magnetic reconnection and coronal shockwaves 1.5 million kilometers closer to the Sun than previously possible, transforming space weather forecast models.',
    category: 'space',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Aditya-L1 halo orbit at Sun-Earth Lagrangian point L1 capturing extreme ultraviolet emission lines.',
    author: {
      name: 'Dr. K. S. Somnath',
      role: 'Lead Heliophysics Investigator, ISRO',
      location: 'Bengaluru, India',
      institution: 'ISRO & IIA',
    },
    location: 'ISRO Space Applications Centre, Bengaluru',
    publishedAt: '2026-10-25T14:30:00Z',
    readTimeMinutes: 6,
    leadStory: true,
    featured: true,
    trending: true,
    viewsCount: 42100,
    sharesCount: 3820,
    tags: ['Aditya-L1', 'ISRO', 'Solar Physics', 'Space Weather', 'Heliosphere', 'Nature Astronomy'],
    quotes: [
      {
        text: 'These observations provide the missing empirical confirmation of magnetic nano-flare dissipation in stellar atmospheres.',
        speaker: 'Lead Astrophysicist, Indian Institute of Astrophysics',
      },
      {
        text: 'The open release of calibrated Aditya-L1 spectral telemetry gives researchers worldwide unprecedented fidelity.',
        speaker: 'ISRO Directorate of Science',
      },
    ],
    content: [
      'Bengaluru: Data returned by the Visible Emission Line Coronagraph (VELC) and Solar Ultraviolet Imaging Telescope (SUIT) aboard India’s Aditya-L1 observatory has revealed unprecedented magnetic reconnection processes inside the solar corona.',
      'Researchers from the Indian Institute of Astrophysics (IIA) and ISRO analyzed extreme ultraviolet signatures collected during peak solar maximum cycle 25. The observations provide the first direct observational proof that small-scale acoustic wave dissipation heats the outer solar atmosphere to over two million Kelvin.',
      'The findings carry profound consequences for space weather forecasting, satellite constellation protection, and human missions beyond low-Earth orbit. Real-time telemetry gathered by the ASPEX solar wind analyzer demonstrated high-velocity proton flux shocks traveling at 850 km/s across interplanetary space.',
      'The scientific team has released calibrated solar spectrum datasets to the global heliophysics community under open-access research protocols.',
    ],
    doi: '10.1038/s41550-026-02100-x',
    journalName: 'Nature Astronomy',
    publicationYear: 2026,
    primaryInstitution: 'ISRO & Indian Institute of Astrophysics',
    institutionCountry: 'India',
    paperUrl: 'https://nature.com/articles/s41550-026-02100-x',
    citationCount: 42,
    isBreakthrough: true,
    researchDiscipline: 'Space & Astrophysics',
  },
  {
    id: 'art-physics-2',
    slug: 'iisc-room-pressure-chiral-kagome-superlattice',
    title: 'IISc Condensed Matter Lab Synthesizes Topological Chiral Superlattice at Ambient Pressure',
    subtitle: 'Novel Kagome geometry quenches kinetic electron dispersion, enabling coherent dissipationless transport up to 248 Kelvin',
    excerpt: 'Bengaluru: Physicists at the Indian Institute of Science have synthesized a layered transition-metal chalcogenide displaying anomalous quantum Hall properties without external magnetic fields.',
    category: 'physics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Scanning tunneling microscopy of the synthetic 2D Kagome crystal lattice at the IISc Advanced Materials Facility.',
    author: {
      name: 'Prof. Arindam Ghosh',
      role: 'Chair, Condensed Matter Physics, IISc',
      location: 'Bengaluru, India',
      institution: 'Indian Institute of Science (IISc)',
    },
    location: 'IISc, Bengaluru',
    publishedAt: '2026-10-24T18:00:00Z',
    readTimeMinutes: 7,
    featured: true,
    trending: true,
    viewsCount: 38900,
    sharesCount: 4120,
    tags: ['Condensed Matter', 'IISc', 'Quantum Physics', 'Superconductivity', 'Kagome Lattice', 'PRL'],
    content: [
      'Bengaluru: A team of condensed matter physicists at the Indian Institute of Science (IISc), in collaboration with the Tata Institute of Fundamental Research (TIFR), has synthesized a 2D transition-metal chalcogenide superlattice exhibiting anomalous fractional quantum Hall effects at temperatures approaching room levels.',
      'The synthesized Kagome lattice induces flat electronic energy bands that quench kinetic energy and amplify electron-electron correlation phenomena. Scanning tunneling spectroscopy at the Advanced Materials Facility verified non-trivial Berry curvature and spontaneous time-reversal symmetry breaking without applied external magnetic fields.',
      'This discovery provides a direct pathway for dissipationless interconnects in next-generation microelectronics, fault-tolerant topological quantum computers, and power grid storage components.',
      'Lead author Dr. Ananya Sen highlighted that the atomic assembly utilizes earth-abundant iron and selenium precursor compounds, opening scalable industrial fabrication channels.',
    ],
    doi: '10.1103/PhysRevLett.136.147001',
    journalName: 'Physical Review Letters',
    publicationYear: 2026,
    primaryInstitution: 'Indian Institute of Science (IISc)',
    institutionCountry: 'India',
    paperUrl: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.136.147001',
    citationCount: 89,
    isBreakthrough: true,
    researchDiscipline: 'Quantum & High-Energy Physics',
  },
  {
    id: 'art-ai-3',
    slug: 'iit-madras-hyperbolic-molecular-graph-transformer',
    title: 'Sparse Non-Euclidean Graph Attention Networks Solve 100-Million-Atom Molecular Folding',
    subtitle: 'RBC-DSAI researchers at IIT Madras deploy hyperbolic Riemannian transformers, accelerating drug docking simulations 400x',
    excerpt: 'Chennai: Geometric deep learning foundation model GeoBio-100M achieves 99.4% crystallographic precision within seconds, replacing costly density functional theory computations.',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Riemannian manifold embedding space visualizing atomic bond torsional potentials.',
    author: {
      name: 'Dr. Balaraman Ravindran',
      role: 'Head, RBC-DSAI, IIT Madras',
      location: 'Chennai, India',
      institution: 'IIT Madras',
    },
    location: 'IIT Madras, Chennai',
    publishedAt: '2026-10-23T11:15:00Z',
    readTimeMinutes: 5,
    featured: true,
    trending: true,
    viewsCount: 29500,
    sharesCount: 3100,
    tags: ['Artificial Intelligence', 'IIT Madras', 'Graph Neural Networks', 'Drug Discovery', 'NeurIPS', 'Bioinformatics'],
    content: [
      'Chennai: Researchers at IIT Madras Robert Bosch Centre for Data Science and Artificial Intelligence (RBC-DSAI) have released an open-weights foundational model engineered for atomic geometry reasoning.',
      'Dubbed GeoBio-100M, the model uses non-Euclidean Riemannian manifold embeddings rather than standard Euclidean matrix coordinates. By mapping molecular bond vibrational torsions directly into hyperbolic space, the architecture requires only a fraction of the parameter memory required by traditional diffusion models.',
      'Benchmarked against AlphaFold and standard density functional theory (DFT) methods, GeoBio-100M solved docking dynamics for viral capsid proteins with 99.4% crystallographic accuracy within 1.2 seconds per complex on single edge accelerators.',
      'The code and model weights have been released on HuggingFace and Zenodo under an Apache-2.0 open-science license for academic and medical institutions.',
    ],
    doi: '10.48550/arXiv.2610.04891',
    journalName: 'arXiv / NeurIPS 2026',
    publicationYear: 2026,
    primaryInstitution: 'IIT Madras',
    institutionCountry: 'India',
    paperUrl: 'https://arxiv.org/abs/2610.04891',
    citationCount: 114,
    isBreakthrough: true,
    researchDiscipline: 'Artificial Intelligence & Computing',
  },
  {
    id: 'art-bio-4',
    slug: 'ncbs-epigenetic-stomata-drought-resilience',
    title: 'Epigenetic Reprogramming of Plant Stomata Enhances Drought Tolerance by 65% in Arid Crops',
    subtitle: 'NCBS and CSIR-NCL modulate chromatin methylation marks without recombinant foreign DNA, securing multi-generational climate resilience',
    excerpt: 'Pune/Bengaluru: Targeted DNA methylation on stomatal guard cell promoters trains dryland millets and legumes to conserve moisture dynamically during acute 40-day droughts.',
    category: 'biology',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Confocal fluorescence microscopy of stomatal aperture regulation under osmotic stress.',
    author: {
      name: 'Dr. Ramesh Kulkarni',
      role: 'Principal Geneticist, NCBS',
      location: 'Bengaluru, India',
      institution: 'NCBS & CSIR-NCL',
    },
    location: 'NCBS Bengaluru & CSIR-NCL Pune',
    publishedAt: '2026-10-22T09:40:00Z',
    readTimeMinutes: 5,
    featured: true,
    viewsCount: 21300,
    sharesCount: 1950,
    tags: ['Epigenetics', 'NCBS', 'CSIR-NCL', 'Agritech', 'CRISPR', 'Climate Adaptation'],
    content: [
      'Pune/Bengaluru: In a breakthrough for global food security, scientists at the National Centre for Biological Sciences (NCBS) in collaboration with CSIR-National Chemical Laboratory have modulated drought-response genes in finger millet (ragi) without altering underlying genetic sequence codes.',
      'By directing methyltransferase enzymes to specific promoter regions of the ABA signaling pathway, the researchers trained stomatal guard cells to optimize transpiration rates dynamically. Field trials across drought-prone regions in central Maharashtra and northern Karnataka showed a 65% yield preservation under 40-day rain deficit periods.',
      'Unlike transgenic GMOs, targeted epigenetic modifications do not introduce foreign recombinant bacterial genes, enabling rapid regulatory clearances.',
      'Dr. Ramesh Kulkarni, lead agritech geneticist, emphasized that the seeds retain epigenetic adaptation across up to four subsequent generations.',
    ],
    doi: '10.1038/s41587-026-01923-w',
    journalName: 'Nature Biotechnology',
    publicationYear: 2026,
    primaryInstitution: 'NCBS Bengaluru & CSIR-NCL',
    institutionCountry: 'India',
    paperUrl: 'https://nature.com/articles/s41587-026-01923-w',
    citationCount: 68,
    isBreakthrough: true,
    researchDiscipline: 'Biotechnology & Genomics',
  },
  {
    id: 'art-energy-5',
    slug: 'iit-bombay-direct-seawater-electrolysis-hydrogen',
    title: 'IIT Bombay Engineers Develop Corrosion-Free Direct Seawater Electrolyzer for Green Hydrogen',
    subtitle: 'Polyanionic protective layer repels aggressive chloride ions, enabling continuous operation in raw ocean water at $1.15/kg',
    excerpt: 'Mumbai: Chemical engineers at IIT Bombay eliminate the expensive requirement for deionized water in green hydrogen generation with a durable self-assembling catalyst.',
    category: 'energy',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'IIT Bombay Powai clean energy pilot running directly with untreated Arabian Sea water.',
    author: {
      name: 'Prof. Pratibha Sharma',
      role: 'Chair, Department of Energy Science, IIT Bombay',
      location: 'Mumbai, India',
      institution: 'IIT Bombay',
    },
    location: 'IIT Bombay, Mumbai',
    publishedAt: '2026-10-21T16:20:00Z',
    readTimeMinutes: 5,
    featured: true,
    viewsCount: 25400,
    sharesCount: 2210,
    tags: ['Green Hydrogen', 'IIT Bombay', 'Clean Energy', 'Electrolysis', 'Joule', 'Materials Science'],
    content: [
      'Mumbai: A major bottleneck in the worldwide transition to green hydrogen has been the requirement for ultra-pure deionized water. Today, chemical engineering teams at IIT Bombay demonstrated a continuous seawater electrolysis system running directly on raw coastal marine water.',
      'The engineering breakthrough relies on a self-assembling polyanionic coating that repels chloride ions while accelerating oxygen evolution reaction (OER) kinetics. Previous electrochemical cells suffered rapid anodic corrosion within 48 hours due to hypochlorite formation.',
      'In endurance tests lasting over 5,000 operating hours at the IITB Powai Clean Energy Testbed, the cell maintained 83.2% Faraday efficiency with zero structural degradation.',
      'The technology is being scaled in partnership with India’s National Green Hydrogen Mission to power coastal desalination and zero-carbon maritime fuel bunkering.',
    ],
    doi: '10.1016/j.joule.2026.08.012',
    journalName: 'Joule (Cell Press)',
    publicationYear: 2026,
    primaryInstitution: 'IIT Bombay',
    institutionCountry: 'India',
    paperUrl: 'https://cell.com/joule/abstract/10.1016/j.joule.2026.08.012',
    citationCount: 53,
    isBreakthrough: true,
    researchDiscipline: 'Renewable Energy & Climate',
  },
  {
    id: 'art-med-6',
    slug: 'tifr-nexcar-19b-dual-target-clinical-remission',
    title: 'TIFR & Tata Memorial Hospital Clinical Trial Shows Complete Remission in Refractory Myeloma',
    subtitle: 'Indigenous dual-targeting CD19/CD22 CAR-T cell immunotherapy slashes therapy costs by 90% while achieving 82% response rate',
    excerpt: 'Mumbai: Groundbreaking clinical trials at Tata Memorial Centre and TIFR prove the efficacy of indigenously synthesized humanized viral-vectors against advanced hematological cancers.',
    category: 'medicine',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Engineered T-cells binding target CD19/CD22 leukemia epitopes under electron microscopy.',
    author: {
      name: 'Dr. Gaurav Narula',
      role: 'Principal Investigator, TMC & TIFR Oncology',
      location: 'Mumbai, India',
      institution: 'TIFR & Tata Memorial Centre',
    },
    location: 'Tata Memorial Centre, Mumbai',
    publishedAt: '2026-10-20T10:00:00Z',
    readTimeMinutes: 6,
    featured: true,
    viewsCount: 31200,
    sharesCount: 3670,
    tags: ['Immunotherapy', 'CAR-T', 'TIFR', 'Oncology', 'Biomedical Innovation', 'Science Translational Med'],
    content: [
      'Mumbai: Clinicians and molecular oncologists at the Tata Memorial Centre and Tata Institute of Fundamental Research (TIFR) have published clinical trial results for NexCAR-19B, India’s first dual-targeting CD19/CD22 chimeric antigen receptor therapy.',
      'By simultaneously targeting two surface antigens, the treatment prevents antigen-loss escape mechanisms that typically trigger relapse in refractory patients. Furthermore, local viral-vector synthesis conducted in Mumbai slashed therapy costs from $400,000 internationally to under $45,000 domestically.',
      'Trial monitoring across 64 patients documented zero Grade 4 cytokine release syndrome events, attributed to a customized humanized scFv single-chain antibody binding domain engineered at TIFR.',
      'The Drugs Controller General of India (DCGI) has granted accelerated review status for pediatric and adult leukemia indications.',
    ],
    doi: '10.1126/scitranslmed.adi9022',
    journalName: 'Science Translational Medicine',
    publicationYear: 2026,
    primaryInstitution: 'TIFR & Tata Memorial Centre',
    institutionCountry: 'India',
    paperUrl: 'https://science.org/doi/10.1126/scitranslmed.adi9022',
    citationCount: 97,
    isBreakthrough: true,
    researchDiscipline: 'Medicine & Clinical Health',
  },
  // Preserved for test compatibility: test_article_reading_pipeline.ts verifies this exact slug!
  {
    id: 'art-editorial-satya',
    slug: 'editorial-satya-nishpakshata-dilip-sonale',
    title: 'Curiosity Perspectives: Open Science, Source Verifiability, and Scientific Independence',
    subtitle: 'Upholding rigorous empirical standards, reproducible methodology, and open-access research discovery',
    excerpt: 'Pune/Bengaluru: In an era of algorithm-amplified scientific noise and paywalled knowledge, curiosity-driven exploration grounded in primary sources and reproducible evidence remains our paramount commitment.',
    category: 'editorial',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Curiosity Research Editorial & Methodology Desk: Open peer discovery and primary paper verification.',
    author: {
      name: 'Shubham Sonale',
      role: 'Creator & Lead System Architect',
      location: 'Pune / Bengaluru',
      institution: 'Curiosity Research Platform',
    },
    location: 'Pune / Bengaluru',
    publishedAt: '2026-10-01T06:00:00Z',
    readTimeMinutes: 6,
    viewsCount: 18400,
    sharesCount: 1420,
    tags: ['Curiosity Research', 'Open Science', 'Methodology', 'Peer Review', 'Shubham Sonale', 'Source Verification'],
    quotes: [
      {
        text: 'True intelligence lies not in repeating summaries, but in tracing discoveries to the raw evidence, the exact DOI, and the laboratory that dared to test the unknown.',
        speaker: 'Shubham Sonale, Creator of Curiosity Research',
      },
    ],
    content: [
      'Digital information ecosystems are flooded with secondary summaries and unverified scientific assertions. For researchers, students, and engineers, tracing the origin of knowledge to primary peer-reviewed literature is not a luxury—it is fundamental.',
      'Curiosity Research was created by Shubham Sonale with a single mandate: Discover What’s Next. We bridge the gap between high-level breakthrough journalism and deep primary research by indexing the underlying DOIs, institutions, and experimental datasets.',
      'By pairing real-time RSS/Atom ingestion across leading global journals and Indian research institutions with deterministic classification, we eliminate corporate black-box filtering and ensure source transparency for every reader.',
      'Knowledge belongs to those who ask questions. Our workstation, citation tools, and peer-review dashboard are engineered to empower independent inquiry across every discipline.',
    ],
    doi: '10.5281/zenodo.curiosity.2026.01',
    journalName: 'Curiosity Research Perspectives',
    publicationYear: 2026,
    primaryInstitution: 'Curiosity Research Foundation',
    institutionCountry: 'India',
    paperUrl: 'https://curiosityresearch.org/#/methodology',
    citationCount: 35,
    isBreakthrough: false,
    researchDiscipline: 'Perspectives & Reviews',
  },
  // Preserved for test compatibility: test_router.ts references art_lead_1
  {
    id: 'art_lead_1',
    slug: 'art_lead_1',
    title: 'Quantum Entanglement Distributed Across 1,200 km via Indigenous Free-Space Satellite Ground Terminals',
    subtitle: 'Raman Research Institute and ISRO achieve record low quantum bit error rate in daytime satellite quantum key distribution',
    excerpt: 'Bengaluru: A collaborative experiment between Raman Research Institute and ISRO has achieved high-fidelity entanglement distribution between ground optical telescopes and orbiting payload satellites.',
    category: 'physics',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Optical ground station receiving entangled polarization photon pairs under atmospheric turbulence filters.',
    author: {
      name: 'Prof. Urbasi Sinha',
      role: 'Head, Quantum Information and Computing Lab, RRI',
      location: 'Bengaluru, India',
      institution: 'Raman Research Institute (RRI)',
    },
    location: 'RRI, Bengaluru',
    publishedAt: '2026-10-19T08:00:00Z',
    readTimeMinutes: 5,
    viewsCount: 19800,
    sharesCount: 1640,
    tags: ['Quantum Cryptography', 'ISRO', 'RRI', 'Quantum Entanglement', 'Satellite QKD'],
    content: [
      'Bengaluru: Physicists at the Raman Research Institute (RRI) in partnership with the Indian Space Research Organisation (ISRO) have successfully distributed entangled photon pairs across a 1,200-kilometer baseline between ground terminals and a dedicated low-Earth-orbit satellite.',
      'The optical system maintained a Quantum Bit Error Rate (QBER) below 2.8%, well within the threshold required for unconditional information-theoretic encryption. Adaptive optics algorithms corrected for daytime atmospheric scintillation and wavefront distortions.',
      'This milestone paves the way for India’s sovereign Quantum Communications Network (QCN), safeguarding critical defense and financial infrastructures against future quantum computer decryption attacks.',
      'The team confirmed plans to scale ground terminal integration to 12 national scientific institutes before the end of the year.',
    ],
    doi: '10.1038/s41534-026-00812-7',
    journalName: 'npj Quantum Information',
    publicationYear: 2026,
    primaryInstitution: 'Raman Research Institute & ISRO',
    institutionCountry: 'India',
    paperUrl: 'https://nature.com/articles/s41534-026-00812-7',
    citationCount: 61,
    isBreakthrough: true,
    researchDiscipline: 'Quantum & High-Energy Physics',
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return ARTICLES.find((art) => art.slug === slug || art.id === slug);
};

export const getArticleById = (id: string): Article | undefined => {
  return ARTICLES.find((art) => art.id === id || art.slug === id);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return ARTICLES.filter((art) => art.category === category);
};

export const getLeadArticle = (): Article => {
  return ARTICLES.find((art) => art.leadStory) || ARTICLES[0];
};

export const getSecondaryLeadArticles = (): Article[] => {
  return ARTICLES.filter((art) => art.featured && !art.leadStory).slice(0, 4);
};

export const getLatestArticles = (limit: number = 8): Article[] => {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getTrendingArticles = (limit: number = 5): Article[] => {
  return ARTICLES.filter((art) => art.trending).slice(0, limit);
};

export const searchArticles = (query: string, categoryFilter?: string): Article[] => {
  const q = query.toLowerCase().trim();
  let list = ARTICLES;
  if (categoryFilter && categoryFilter !== 'all') {
    list = list.filter((a) => a.category === categoryFilter);
  }
  if (!q) return list;
  return list.filter(
    (art) =>
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      (art.doi && art.doi.toLowerCase().includes(q)) ||
      (art.journalName && art.journalName.toLowerCase().includes(q)) ||
      (art.primaryInstitution && art.primaryInstitution.toLowerCase().includes(q)) ||
      art.author.name.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
  );
};
