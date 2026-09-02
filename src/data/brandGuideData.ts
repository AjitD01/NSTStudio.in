/**
 * Official Brand Data extracted directly from "NST Brand Guideline (March 2026)"
 * Holy Grail document for Nikunj Storytelling Studio (NST)
 */

export interface CorePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  subDisciplines: string[];
  image: string;
  accentColor: string;
}

export interface LogoAnatomyPart {
  part: string;
  name: string;
  symbolism: string;
  lore: string;
  highlight: string;
}

export interface MascotPose {
  id: number;
  name: string;
  role: string;
  description: string;
}

export interface CollateralItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  dimensions: string;
  typography: string;
  description: string;
  details: string[];
}

export const BRAND_MANIFESTO = {
  name: "NST STUDIO",
  fullName: "Nikunj Storytelling Studio",
  tagline: "Story First.",
  established: "March 2026",
  vision:
    "To build a creative storytelling studio that inspires imagination through film, animation, branding, and education. NST aims to create a platform where stories are created, shared, and taught.",
  promise:
    "NST exists to build brands that people don't just see but genuinely connect with. Through strategic storytelling, thoughtful design, and emotionally driven branding, we help businesses create meaningful identities that are memorable, human, and built for long-term growth.",
  philosophy:
    "In today's visual world, many projects focus on design or production first. NST believes that the foundation of every meaningful creative work is storytelling. A strong story creates emotion, connection, and memorable experiences. Film, animation, and design are tools used to bring stories to life.",
  campaignTriptych: [
    { label: "LOGO", sub: "is Seen" },
    { label: "CAMPAIGN", sub: "is Noticed" },
    { label: "STORY", sub: "is Remembered" },
  ],
  quote: "“Ideas that move.”",
  location: "Pune & Mumbai, Maharashtra, India · 411046",
  email: "nststudio.in@gmail.com",
  phone: "+91 8651178652",
  instagram: "@nststudio.in",
  founder: "Vidhi Debnath / Nikunj",
};

export const CORE_PILLARS: CorePillar[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding & Visual Identity",
    subtitle: "Story-Driven Design Systems",
    tagline: "Strategy + Storytelling + Design to transform business into a brand.",
    description:
      "Story-driven design including brand strategy, logo design, bespoke colour palettes, typography hierarchy, and comprehensive brand guidelines built for enduring recognition.",
    subDisciplines: [
      "Brand Strategy & Story",
      "Visual Identity Development",
      "Brand Guidelines & Semiotics",
      "Logomark & Monogram Craft",
    ],
    image: "/brand/p45_2.png",
    accentColor: "#FF2222",
  },
  {
    id: "film",
    number: "02",
    title: "Film & Animation",
    subtitle: "Cinematic Visual Narratives",
    tagline: "Visual stories through motion that breathe soul into corporate vision.",
    description:
      "Narrative-driven short films, brand advertising commercials, and animated content that captivate audiences with emotional resonance and cinematic precision.",
    subDisciplines: [
      "Brand Advertising Films",
      "Animated Content for Children",
      "Story-Based Short Films",
      "Cinematography & Direction",
    ],
    image: "/brand/p45_1.png",
    accentColor: "#E0A96D",
  },
  {
    id: "education",
    number: "03",
    title: "Creative Education",
    subtitle: "Pedagogy & Creative Thinking",
    tagline: "Where stories are created, shared, and taught.",
    description:
      "Nurturing the next generation of creative minds through drawing fundamentals, design basics, visual storytelling masterclasses, and lateral creative thinking programmes.",
    subDisciplines: [
      "Drawing Fundamentals",
      "Design Basics & Composition",
      "Visual Storytelling Workshops",
      "Creative Thinking Programmes",
    ],
    image: "/brand/p47_0.jpg",
    accentColor: "#FFFFFF",
  },
];

export const LOGO_ANATOMY: LogoAnatomyPart[] = [
  {
    part: "N",
    name: "Typographic Monogram",
    symbolism: "Letter 'N' stands for Nikunj in NST",
    lore: "Abstract architectural letterform forming the structural foundation of the mark.",
    highlight: "Letterform Geometry",
  },
  {
    part: "Pose",
    name: "Sitting Pose of Krishna",
    symbolism: "Nikunj is historically associated with Lord Krishna",
    lore: "The sitting figure is the classical depiction of Lord Krishna resting in contemplation, embodied through the sharp diagonal strokes of the letter N.",
    highlight: "Spiritual Heritage",
  },
  {
    part: "Flute",
    name: "The Red Flute",
    symbolism: "The Emotional Core of Identity",
    lore: "Symbolizes storytelling, human connection, and vibrant creative energy. It draws instant focal clarity within a minimal form, reinforcing NST's belief that every brand begins with a story.",
    highlight: "#FF2222 Emotional Core",
  },
  {
    part: "Reel",
    name: "Film Reel Thought Bubble",
    symbolism: "Represents STUDIO and Cinematic Motion",
    lore: "Hovering as a thought bubble above the sitting creator, the circular reel with film sprockets celebrates film, animation, and dynamic production.",
    highlight: "Cinematic Craft",
  },
  {
    part: "Companion",
    name: "Loyal Canine Silhouette",
    symbolism: "Trust, Loyalty & Companionship",
    lore: "Sitting dutifully beside the creator on the jagged stone, symbolizing fidelity, enduring partnership, and unwavering devotion to narrative truth.",
    highlight: "Creative Fidelity",
  },
];

export const COLOR_PALETTE = [
  {
    name: "Storytelling Red",
    hex: "#FF2222",
    cmyk: "C:0 M:87 Y:87 K:0",
    rgb: "255, 34, 34",
    role: "The Emotional Core — Red Flute & Creative Spark",
    type: "Primary Accent",
  },
  {
    name: "Deep Onyx",
    hex: "#1E1E1E",
    cmyk: "C:0 M:0 Y:0 K:88",
    rgb: "30, 30, 30",
    role: "Structure, Film Silhouette & Architectural Ground",
    type: "Primary Dark",
  },
  {
    name: "Studio Off-White",
    hex: "#F9F9F9",
    cmyk: "C:0 M:0 Y:0 K:2",
    rgb: "249, 249, 249",
    role: "Pure Canvas, High-Contrast Legibility & Space",
    type: "Primary Light",
  },
  {
    name: "Maison Gold",
    hex: "#E0A96D",
    cmyk: "C:0 M:24 Y:51 K:12",
    rgb: "224, 169, 109",
    role: "Warm Atelier Sheen, Luxury Borders & Accents",
    type: "Secondary Metallic",
  },
];

export const TYPOGRAPHY_SYSTEM = [
  {
    role: "Main Titles / Hero Headlines",
    family: "Satoshi Bold",
    size: "48pt – 64pt",
    usage: "Page Titles, Hero Sections, Key Brand Messaging",
    sample: "LOGO is Seen. STORY is Remembered.",
  },
  {
    role: "Subtitles & Category Headers",
    family: "Poppins Semi Bold",
    size: "32pt – 40pt",
    usage: "Section Titles, Category Headers, Navigation",
    sample: "Branding, Film & Creative Education",
  },
  {
    role: "Body Text & Longform Copy",
    family: "Poppins Regular",
    size: "16px – 18px",
    usage: "Paragraphs, Content Sections, Case Studies",
    sample: "The foundation of every meaningful creative work is storytelling.",
  },
  {
    role: "Narrative Voice / Special Case",
    family: "Courier Prime",
    size: "14px – 16px Monospace",
    usage: "Screenplay dialogue, typewriter letters, technical director notes",
    sample: "INT. NST STUDIO - NIGHT // The red flute plays.",
  },
];

export const MASCOT_POSES: MascotPose[] = [
  {
    id: 1,
    name: "The Flute Player (Master Mark)",
    role: "Primary Logomark",
    description: "Seated on jagged stone with the red flute to lips and film reel above, forming the letter N.",
  },
  {
    id: 2,
    name: "The Standing Storyteller",
    role: "Attentive Greeting",
    description: "Upright geometric silhouette holding the red flute diagonally across the chest.",
  },
  {
    id: 3,
    name: "The Contemplative Scribe",
    role: "Deep Research",
    description: "Standing in poise with the flute rested behind, listening and observing brand truths.",
  },
  {
    id: 4,
    name: "Ascent to the Horizon",
    role: "Inspiration & Vision",
    description: "Flute elevated gracefully upwards towards the stars, channeling creative energy.",
  },
  {
    id: 5,
    name: "The Reclining Poet",
    role: "Narrative Reflection",
    description: "Reclining comfortably in thought, letting ideas organically germinate into stories.",
  },
  {
    id: 6,
    name: "The Lotus Meditator",
    role: "Spiritual Focus",
    description: "Cross-legged in serene zen meditation, grounding strategy in clarity and purpose.",
  },
  {
    id: 7,
    name: "The Director's Pedestal",
    role: "Production & Studio",
    description: "Sitting upon the studio production block, playing flute with deliberate cadence.",
  },
  {
    id: 8,
    name: "Open Horizons",
    role: "Welcoming Collaboration",
    description: "Arms gracefully outstretched, inviting partners into the storytelling fold.",
  },
];

export const COLLATERAL_ITEMS: CollateralItem[] = [
  {
    id: "visiting-cards",
    category: "01 / PRINT COLLATERAL",
    title: "Visiting Cards Atelier",
    subtitle: "Textured Cardstock with Debossed Crimson Flute",
    image: "/brand/p57_0.jpg",
    dimensions: "85mm × 55mm Luxury Heavyweight",
    typography: "Courier Prime & Satoshi Bold",
    description:
      "Crafted with double-thick cotton rag cardstock. The front showcases the standing storyteller with delicate red flute foil; the obsidian reverse features circular concentric typography with scannable QR code and gold contact details.",
    details: [
      "Tactile debossed red flute highlight (#FF2222)",
      "High-contrast obsidian matte rear finish",
      "Direct screenplay typography in Courier Prime",
      "Integrated studio WhatsApp / Inquiry QR code",
    ],
  },
  {
    id: "executive-letterhead",
    category: "02 / OFFICIAL STATIONERY",
    title: "Executive Studio Letterhead",
    subtitle: "Watermarked Parchment with Crimson Wax Seal",
    image: "/brand/p59_0.jpg",
    dimensions: "A4 (210mm × 297mm)",
    typography: "Satoshi, Courier Prime Family",
    description:
      "Minimal, professional layout ensuring brand dignity. Features a subtle 30% opacity brand character watermark in the lower corner and an embossed crimson wax seal with 'STORY FIRST' header rule.",
    details: [
      "Story First header lockup with red accent rule",
      "Subtle geometric Krishna character watermark",
      "Official crimson wax seal mark in bottom right",
      "Full corporate registry: Pune & Mumbai, Maharashtra",
    ],
  },
  {
    id: "screenplay-envelopes",
    category: "03 / DISPATCH & DELIVERY",
    title: "Cinematic Envelopes & Dispatch",
    subtitle: "242mm × 110mm Architectural Flap",
    image: "/brand/p61_0.png",
    dimensions: "242mm × 110mm with 34mm Curved Red Flap",
    typography: "Courier Prime & Satoshi",
    description:
      "A statement dispatch envelope for scripts, contracts, and bespoke brand books. Features a vibrant solid crimson curved closure flap (#FF2222) and pin-sharp typography with studio postal coordinates.",
    details: [
      "Contoured red flap (#FF2222) with 7mm precision margins",
      "Studio pin-drop: Pune Maharashtra 411046, India",
      "Screenplay Courier body snippet across bottom edge",
      "Engineered for high-touch physical client unboxing",
    ],
  },
  {
    id: "urban-billboard",
    category: "04 / OUTDOOR INSTALLATION",
    title: "Campaign Billboard: 'Ideas That Move'",
    subtitle: "Monumental Urban Architectural Installation",
    image: "/brand/p45_1.png",
    dimensions: "Large-Format Exterior Facade",
    typography: "Clash Display & Satoshi Bold",
    description:
      "A high-impact architectural takeover featuring the signature sweeping red brushstroke alongside the stark declaration: 'IDEAS THAT MOVE.' Emphasizes NST's cinematic scale and cultural imprint.",
    details: [
      "Monochrome architectural backdrop with crimson flourish",
      "Clash Display high-impact typography",
      "Minimalist silhouette of storyteller standing in shadow",
      "Showcased in international brand presentations",
    ],
  },
  {
    id: "brand-history-book",
    category: "05 / BOUND MONOGRAPH",
    title: "Hardback Monograph: 'Brand's History'",
    subtitle: "Custom Clothbound Narrative Archive",
    image: "/brand/p45_2.png",
    dimensions: "Collector's Edition Clothbound 240mm × 320mm",
    typography: "Satoshi & Courier Prime",
    description:
      "A bound keepsake volume chronicling client heritage, semiotic genesis, and identity lore. Features open lay-flat binding with 3D pop-up Krishna character standing beside classical architectural ruins.",
    details: [
      "Lay-flat open spread with pop-up dimensional cutouts",
      "Red ribbon bookmark extending as the Sacred Thread",
      "Historical narrative synthesis for enterprise clients",
      "Preserves brand folklore for multi-generational brands",
    ],
  },
  {
    id: "presentation-deck",
    category: "06 / DIGITAL ARCHITECTURE",
    title: "16:9 Presentation Architecture",
    subtitle: "High-Fidelity Narrative Pitch Deck",
    image: "/brand_pages/page_51.png",
    dimensions: "11” × 6.1875” (16:9 Widescreen)",
    typography: "Satoshi Bold & Poppins",
    description:
      "Clean slide templates engineered for executive pitches, client unveiling, and pedagogical masterclasses. Combines editorial photography, geometric circular data visualization, and minimalist red callouts.",
    details: [
      "Quarter-circle photo mask with editorial fashion imagery",
      "Multi-tier donut data charts with percentage callouts",
      "Consistent 80px safe margins and clean typography",
      "Presented for leading enterprise organizations",
    ],
  },
];

export const BRAND_PAGES_LIST = [
  { page: 1, title: "Cover: Brand Guideline 2026", file: "/brand_pages/page_01.png" },
  { page: 2, title: "Vision: Inspiring Imagination", file: "/brand_pages/page_02.png" },
  { page: 4, title: "The Brand: The Storytelling Studio", file: "/brand_pages/page_04.png" },
  { page: 6, title: "Brand Promise: Genuine Connection", file: "/brand_pages/page_06.png" },
  { page: 7, title: "Introduction: Nikunj Storytelling Studio", file: "/brand_pages/page_07.png" },
  { page: 9, title: "Core Pillars: Branding, Film, Education", file: "/brand_pages/page_09.png" },
  { page: 12, title: "Brand Logo: Krishna in Letter N", file: "/brand_pages/page_12.png" },
  { page: 14, title: "Logo Variations & Lockups", file: "/brand_pages/page_14.png" },
  { page: 15, title: "Logo Making: Flute, N & Reel Anatomy", file: "/brand_pages/page_15.png" },
  { page: 16, title: "Clear Space & Grid System", file: "/brand_pages/page_16.png" },
  { page: 22, title: "Brand Colours: #FF2222, #1E1E1E, #F9F9F9", file: "/brand_pages/page_22.png" },
  { page: 26, title: "Logo Misuse Rules", file: "/brand_pages/page_26.png" },
  { page: 30, title: "Primary Typeface: Satoshi", file: "/brand_pages/page_30.png" },
  { page: 32, title: "Font Hierarchy: H1, H2, H3", file: "/brand_pages/page_32.png" },
  { page: 36, title: "Special Case Fonts: Courier Prime", file: "/brand_pages/page_36.png" },
  { page: 39, title: "Brand Face: 8 Poses of the Mascot", file: "/brand_pages/page_39.png" },
  { page: 45, title: "Campaign: Seen, Noticed, Remembered", file: "/brand_pages/page_45.png" },
  { page: 47, title: "Social Story: New Era of Design", file: "/brand_pages/page_47.png" },
  { page: 48, title: "SNS Cover Banner: Vidhi Debnath & Mist", file: "/brand_pages/page_48.png" },
  { page: 51, title: "Presentation Architecture: Slide Design", file: "/brand_pages/page_51.png" },
  { page: 56, title: "Visiting Card Flat Layout & Specs", file: "/brand_pages/page_56.png" },
  { page: 57, title: "Visiting Card 3D Atelier Mockup", file: "/brand_pages/page_57.png" },
  { page: 58, title: "Studio Letterhead Specs & Watermark", file: "/brand_pages/page_58.png" },
  { page: 59, title: "Letterhead 3D Executive Desk Mockup", file: "/brand_pages/page_59.png" },
  { page: 60, title: "Dispatch Envelope Architecture", file: "/brand_pages/page_60.png" },
  { page: 61, title: "Dispatch Envelope 3D Director's Desk", file: "/brand_pages/page_61.png" },
];
