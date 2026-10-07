/* ==========================================================
   SITE CONTENT — edit this file to update the website.
   You don't need to touch the HTML to add people, collaborators,
   publications or news. Just add/remove entries below.

   Entries marked with  // TODO  are placeholders — replace them.
   ========================================================== */

const SITE = {
  groupName: "Superconducting Quantum Devices Group",
  shortName: "SQD Group",
  institution: "London Centre for Nanotechnology, University College London",
  email: "sqd-group@ucl.ac.uk",                       // TODO: real contact email
  address: ["London Centre for Nanotechnology", "17–19 Gordon Street", "London WC1H 0AH, UK"],
  googleScholar: "",                                  // TODO: group/PI Google Scholar URL
  github: "",                                         // TODO: optional GitHub org URL
  // Set to false once you've replaced the placeholder content
  showPlaceholderNotes: true,
};

/* ---------------- MEMBERS ----------------
   category: "pi" | "postdoc" | "phd" | "masters" | "visitor" | "alumni"
   photo:   path to an image in assets/img/ (optional — initials are used if empty)
   links:   any of { email, website, scholar, orcid, linkedin, github }
-------------------------------------------------- */
const MEMBERS = [
  {
    name: "Prof. Paul Warburton",
    category: "pi",
    role: "Principal Investigator",
    bio: "Paul leads the Superconducting Quantum Devices Group at the London Centre for Nanotechnology. " +
         "His research spans superconducting electronics, quantum phase slip physics and hardware for " +
         "quantum information processing.",                         // TODO: check / expand bio
    photo: "",
    links: { email: "", website: "", scholar: "" },               // TODO
  },
  {
    name: "Jay",                                                   // TODO: full name
    category: "phd",
    role: "PhD Researcher",
    bio: "Quantum phase slip nanowires and gate-tunable CQUID resonators for parametric amplification and three-wave mixing.",
    photo: "",
    links: { email: "", linkedin: "" },                            // TODO
  },
  {
    name: "Postdoc Name",                                          // TODO
    category: "postdoc",
    role: "Postdoctoral Research Associate",
    bio: "Short one-line description of research focus.",
    photo: "",
    links: {},
  },
  {
    name: "PhD Student Name",                                      // TODO
    category: "phd",
    role: "PhD Researcher",
    bio: "Short one-line description of research focus.",
    photo: "",
    links: {},
  },
  {
    name: "MSc Student Name",                                      // TODO
    category: "masters",
    role: "MSc Project Student",
    bio: "Project title or focus.",
    photo: "",
    links: {},
  },
  // Alumni are shown as a compact list: "Name — role (years), now at ..."
  { name: "Former Member", category: "alumni", role: "PhD (20XX–20XX)", now: "now at Company / University" }, // TODO
];

/* ---------------- COLLABORATORS ----------------
   type: "academic" | "industry" | "facility"
   logo: optional path to a logo in assets/img/
-------------------------------------------------- */
const COLLABORATORS = [
  {
    name: "Collaborator Name",                                     // TODO
    institution: "University / Institute",
    location: "City, Country",
    type: "academic",
    area: "e.g. Theory of quantum phase slips and dual Josephson junctions.",
    url: "",
    logo: "",
  },
  {
    name: "Collaborator Name",                                     // TODO
    institution: "University / Institute",
    location: "City, Country",
    type: "academic",
    area: "e.g. Thin-film growth of disordered superconductors (NbN, TiN, InOx).",
    url: "",
    logo: "",
  },
  {
    name: "Partner Contact",                                       // TODO
    institution: "Company Name",
    location: "City, Country",
    type: "industry",
    area: "e.g. Cryogenic microwave amplifiers and readout electronics.",
    url: "",
    logo: "",
  },
  {
    name: "Facility Contact",                                      // TODO
    institution: "National Lab / Shared Facility",
    location: "City, Country",
    type: "facility",
    area: "e.g. Electron-beam lithography and materials characterisation.",
    url: "",
    logo: "",
  },
];

/* ---------------- FUNDERS (shown on Collaborators page) ---------------- */
const FUNDERS = [
  { name: "EPSRC", url: "https://www.ukri.org/councils/epsrc/" },  // TODO: confirm funders
  { name: "UCL", url: "https://www.ucl.ac.uk/" },
];

/* ---------------- PUBLICATIONS ----------------
   Group members' names in `authors` are bolded automatically
   if they match a name in MEMBERS (surname match).
   type: "journal" | "preprint" | "conference" | "thesis"
-------------------------------------------------- */
const PUBLICATIONS = [
  {
    year: 2026,
    title: "Title of paper",                                       // TODO
    authors: "A. Author, B. Author, P. A. Warburton",
    venue: "Journal Name 12, 345 (2026)",
    type: "journal",
    doi: "", arxiv: "", pdf: "",
  },
  {
    year: 2025,
    title: "Title of preprint",                                    // TODO
    authors: "A. Author, P. A. Warburton",
    venue: "arXiv preprint",
    type: "preprint",
    doi: "", arxiv: "", pdf: "",
  },
];

/* ---------------- NEWS ---------------- */
const NEWS = [
  { date: "2026-10-01", text: "Our new website is live!" },
  { date: "2026-06-15", text: "Poster on voltage-tunable CQUID resonators presented at a quantum sensing symposium." }, // TODO: check
  { date: "2026-01-25", text: "New cooldown of the CQUID parametric amplifier device." },                              // TODO: check
];

/* ---------------- OPEN POSITIONS ---------------- */
const POSITIONS = [
  {
    title: "PhD studentships",
    text: "We welcome enquiries from strong candidates in physics, electronic engineering or materials science interested in superconducting devices, nanofabrication and cryogenic microwave measurement.",
    status: "Enquiries welcome",
  },
  {
    title: "MSc & undergraduate projects",
    text: "Research projects in device design and simulation, microwave measurement and data analysis are available each year.",
    status: "Ongoing",
  },
  {
    title: "Postdoctoral positions",
    text: "Opportunities are advertised on UCL's jobs portal when funded. Researchers interested in applying for independent fellowships with the group are encouraged to get in touch.",
    status: "When funded",
  },
];
