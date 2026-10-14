export type SectionCopy = { eyebrow: string; heading: string; body: string };
export type Capability = SectionCopy & { kind: "forms" | "peptides" | "data" };
export type Workflow = SectionCopy & { id: string; label: string };
export const links = {
  login: "https://10xscience.com/login",
  blog: "https://10xscience.com/blog",
  careers: "https://10xscience.com/careers",
} as const;
export const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Workflows", href: "#workflows" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;
export const content = {
  header: {
    demo: "Request a demo",
    login: "Log in",
    skip: "Skip to content",
    menu: "Open navigation",
    close: "Close navigation",
  },
  hero: {
    eyebrow: "FOR PROTEIN CHARACTERIZATION",
    lines: ["Turn complex protein data", "into answers you can inspect."],
    body: "For scientists developing protein therapeutics, 10x Science uses AI to help identify proteins, characterize modifications, and interpret mass spectrometry data.",
    primary: "Request a demo",
    secondary: "Explore the platform",
    proof: "Backed by Y Combinator",
  },
  platform: {
    eyebrow: "INSIDE THE PLATFORM",
    heading: "See the sample. Explore the signal.",
    body: "Explore a visual walkthrough of protein analysis, from the data you inspect to the modifications you investigate.",
    label: "Illustrative interface · Sample data",
    tabs: [
      {
        id: "protein",
        label: "Protein analysis",
        caption: "Explore protein signals in the context of your sample.",
      },
      {
        id: "modifications",
        label: "Modification analysis",
        caption: "Investigate modifications alongside the sequence.",
      },
      {
        id: "peptides",
        label: "Peptide mapping",
        caption:
          "Examine peptide-level detail without losing the protein view.",
      },
    ],
  },
  research: {
    label: "Research backgrounds across leading institutions",
    institutions: ["Stanford", "MIT", "UC Berkeley", "UCSF", "UW–Madison"],
    supporting:
      "The 10x Science team brings research experience from these institutions.",
  },
  problem: {
    eyebrow: "THE ANALYSIS BOTTLENECK",
    heading: "The experiment is done.\nThe interpretation is not.",
    body: "A spectrum is a starting point. The next step is understanding which protein is present, how it has changed, and which signals deserve a closer look.",
    questions: [
      "Is this the protein we expected?",
      "Which modifications are present?",
      "What needs further investigation?",
    ],
    closing: "Bring those questions into the analysis.",
  },
  capabilities: [
    {
      kind: "forms",
      eyebrow: "PROTEOFORMS",
      heading: "Look beyond the protein name.",
      body: "Investigate proteoforms and combinations of modifications, including glycosylation. Explore the molecular variation behind a single protein identity.",
    },
    {
      kind: "peptides",
      eyebrow: "PEPTIDE MAPPING",
      heading: "Check identity. Investigate variation.",
      body: "Use peptide mapping and de novo sequencing to examine target identity, post-translational modifications, and unexpected sequence variants.",
    },
    {
      kind: "data",
      eyebrow: "YOUR DATA",
      heading: "Keep your research context close.",
      body: "Work with vendor-neutral software, UniProt integration, and custom libraries built around the proteins you study.",
    },
  ] satisfies Capability[],
  workflows: {
    eyebrow: "WORKFLOWS",
    heading: "Start with the way you study proteins.",
    body: "Explore top-down, middle-down, and targeted approaches in a focused view of your analysis.",
    legend: "Workflow illustration",
    items: [
      {
        id: "top-down",
        label: "Top-down",
        eyebrow: "01 / TOP-DOWN",
        heading: "Begin with the intact protein.",
        body: "Explore protein-level variation and modifications without starting from a peptide-only view.",
      },
      {
        id: "middle-down",
        label: "Middle-down",
        eyebrow: "02 / MIDDLE-DOWN",
        heading: "Focus on larger protein fragments.",
        body: "Investigate parts of the protein while retaining more sequence context than small peptides provide.",
      },
      {
        id: "targeted",
        label: "Targeted",
        eyebrow: "03 / TARGETED",
        heading: "Keep a specific protein in focus.",
        body: "Center the analysis on the protein or region relevant to your research question.",
      },
    ] satisfies Workflow[],
  },
  about: {
    eyebrow: "BUILT AROUND SCIENTIFIC WORK",
    heading: "Make room for closer inspection.",
    body: "Protein characterization depends on the details. This walkthrough puts spectra, sequences, and modification views at the center, so you can see the kinds of analysis to discuss with the 10x Science team.",
    title: "Meet 10x Science.",
    description:
      "10x Science develops AI software for protein characterization. Its team combines scientific research experience with software development to address complex analytical work.",
    link: "Read the team's latest updates",
  },
  faq: {
    heading: "A few questions before the demo.",
    items: [
      {
        question: "Who is 10x Science for?",
        answer:
          "Scientists and analytical teams working on protein characterization, including teams studying protein therapeutics.",
      },
      {
        question: "Which workflows can I explore?",
        answer:
          "The platform presents top-down, middle-down, and targeted workflows, alongside proteoform analysis and peptide mapping. Discuss your specific experiment with the team to confirm fit.",
      },
      {
        question: "Will it work with our instruments and data?",
        answer:
          "10x Science describes its software as vendor-neutral. Ask the team to confirm support for your instruments, file formats, and analysis requirements.",
      },
      {
        question: "Can we use our own protein libraries?",
        answer:
          "The platform supports custom libraries alongside UniProt integration. The team can explain how these fit your analysis.",
      },
      {
        question: "What about deployment and data handling?",
        answer:
          "Discuss your infrastructure, data-handling requirements, and review process with the team before using research data.",
      },
      {
        question: "How do we evaluate it?",
        answer:
          "Request a demo and describe your workflow. Ask the team to walk through the analysis relevant to your research and explain the available evaluation options.",
      },
    ],
  },
  demo: {
    eyebrow: "TAKE A CLOSER LOOK",
    heading: "See how 10x Science fits your analysis.",
    body: "Tell the team what you study and where interpretation gets difficult. Start with a conversation about your workflow.",
    name: "Name",
    email: "Work email",
    organization: "Organization",
    message: "What are you working on?",
    optional: "optional",
    placeholder:
      "Tell us about your proteins, workflow, or analysis questions.",
    notice: "Concept preview — this form does not send information.",
    submit: "Preview request",
    productionSubmit: "Request a demo",
    success: "Preview complete. No request has been sent.",
    errors: {
      name: "Please enter your name.",
      email: "Enter a valid email address.",
      organization: "Please enter your organization.",
    },
  },
  footer: {
    descriptor: "Protein characterization, with AI.",
    credit:
      "Independent website concept by Hippo. Not affiliated with 10x Science.",
    note: "Built for closer inspection.",
  },
  ui: {
    interactive: "Interactive walkthrough",
    annotate: "Annotations",
    dragHint: "Drag to zoom · double-click to reset",
    zoom: "Zoom to selection",
    resetZoom: "Reset zoom",
    signalHint: "Choose a signal to inspect its sequence region.",
    signalLinks: "Illustrative signal links",
    residueHint: "Select a position to explore a modification category.",
    annotationNote: "Example annotations only · no molecular assignment",
    builder: "Modification builder",
    addAnnotation: "Add annotation",
    removeAnnotation: "Remove annotation",
    clearAnnotations: "Clear annotations",
    applied: "Your example annotations",
    noAnnotations:
      "No annotations added. Select a position and category to begin.",
    demoOnly: "Demonstration only. No analysis is being run.",
    stopWalkthrough: "Stop walkthrough",
    walkthroughComplete: "Walkthrough complete. Explore the example.",
    walkthroughStopped: "Walkthrough paused. You’re in control.",
    proteinSteps: [
      "Choose a sample",
      "Inspect a signal",
      "Explore its sequence",
    ],
    modificationSteps: [
      "Choose a position",
      "Explore a category",
      "Add an example annotation",
    ],
    peptideSteps: [
      "Select a peptide",
      "Inspect its spectrum",
      "Keep the sequence in view",
    ],
    replay: "Replay walkthrough",
    project: "Example project",
    samples: "Samples",
    sampleData: "Sample data",
    spectrum: "Spectrum",
    sequence: "Sequence view",
    selected: "Selected",
    overview: "Analysis overview",
    details: "Sample detail",
    protein: "Protein view",
    illustrative: "Illustrative data",
    conceptual: "Conceptual view",
    library: "Custom library",
    uniprot: "UniProt",
    modCategories: "Example modification categories",
    positions: "Illustrative positions",
    sequenceNote: "Schematic sequence · positions are illustrative",
    coverage: "Peptide coverage",
    peptideRegion: "Selected region",
    chartNote: "Illustrative signal · not experimental results",
    formNames: ["Example form A", "Example form B", "Example form C"],
    browse: "Research context",
    resources: "Resources",
    linkedSpectrum: "Linked spectrum",
  },
} as const;
