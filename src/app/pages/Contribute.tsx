import { useState, useMemo } from "react";
import { ExternalLink, Search, Globe, X } from "lucide-react";

interface Org {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  website: string;
  donateUrl?: string;
  volunteerUrl?: string;
  type: "donate" | "volunteer" | "both";
}

const orgs: Org[] = [
  // ── International ──────────────────────────────────────────────────────
  {
    id: "msf",
    name: "Médecins Sans Frontières (MSF)",
    description: "Provides emergency medical care to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    category: "Healthcare", region: "International",
    website: "https://www.msf.org", donateUrl: "https://www.msf.org/donate",
    volunteerUrl: "https://www.msf.org/work-us", type: "both",
  },
  {
    id: "unhcr-donate",
    name: "UNHCR – UN Refugee Agency",
    description: "Provides life-saving assistance and protection for refugees and displaced people worldwide.",
    category: "Refugee & Displacement", region: "International",
    website: "https://www.unhcr.org", donateUrl: "https://donate.unhcr.org",
    type: "donate",
  },
  {
    id: "oxfam",
    name: "Oxfam",
    description: "Works to end poverty and inequality. Runs emergency relief, development, and campaigning programmes globally.",
    category: "Poverty & Development", region: "International",
    website: "https://www.oxfam.org", donateUrl: "https://www.oxfam.org/en/donate",
    volunteerUrl: "https://www.oxfam.org/en/take-action/volunteer", type: "both",
  },
  {
    id: "savechildren",
    name: "Save the Children",
    description: "Improves the lives of children through education, health, and protection programmes in 100+ countries.",
    category: "Children", region: "International",
    website: "https://www.savethechildren.org",
    donateUrl: "https://www.savethechildren.org/us/donate", type: "donate",
  },
  {
    id: "wikimedia",
    name: "Wikimedia Foundation",
    description: "Supports Wikipedia and free knowledge infrastructure used by hundreds of millions of people daily.",
    category: "Education & Knowledge", region: "International",
    website: "https://wikimediafoundation.org",
    donateUrl: "https://donate.wikimedia.org", type: "donate",
  },
  {
    id: "eff",
    name: "Electronic Frontier Foundation (EFF)",
    description: "Defends civil liberties in the digital world — privacy, free speech, and innovation.",
    category: "Digital Rights", region: "International",
    website: "https://www.eff.org", donateUrl: "https://www.eff.org/donate",
    volunteerUrl: "https://www.eff.org/about/volunteer", type: "both",
  },
  {
    id: "open-source-collective",
    name: "Open Source Collective",
    description: "Fiscal host for open-source projects. Fund tools you depend on — software, libraries, communities.",
    category: "Open Source", region: "International",
    website: "https://www.oscollective.org",
    donateUrl: "https://opencollective.com/opensource", type: "donate",
  },
  // ── United States ──────────────────────────────────────────────────────
  {
    id: "feeding-america-c",
    name: "Feeding America",
    description: "Nationwide network of 200+ food banks. Volunteer at a local food bank or donate to fund meals.",
    category: "Food Assistance", region: "United States",
    website: "https://www.feedingamerica.org",
    donateUrl: "https://www.feedingamerica.org/ways-to-give",
    volunteerUrl: "https://www.feedingamerica.org/take-action/volunteer", type: "both",
  },
  {
    id: "aclu",
    name: "American Civil Liberties Union (ACLU)",
    description: "Defends constitutional rights and civil liberties for everyone in the United States.",
    category: "Civil Rights", region: "United States",
    website: "https://www.aclu.org", donateUrl: "https://www.aclu.org/donate",
    volunteerUrl: "https://www.aclu.org/volunteer", type: "both",
  },
  {
    id: "habitat",
    name: "Habitat for Humanity",
    description: "Builds and repairs homes for families in need. Volunteer on a build site or donate toward construction.",
    category: "Housing", region: "United States / International",
    website: "https://www.habitat.org",
    donateUrl: "https://www.habitat.org/support",
    volunteerUrl: "https://www.habitat.org/volunteer", type: "both",
  },
  {
    id: "nami-donate",
    name: "NAMI (National Alliance on Mental Illness)",
    description: "Advocates for mental health awareness and provides support, education, and resources in the US.",
    category: "Mental Health", region: "United States",
    website: "https://www.nami.org",
    donateUrl: "https://www.nami.org/Support-Education/Donate-to-NAMI", type: "donate",
  },
  // ── United Kingdom ─────────────────────────────────────────────────────
  {
    id: "shelter-uk-c",
    name: "Shelter (UK)",
    description: "Campaigns and provides services to end homelessness and bad housing in England and Scotland.",
    category: "Housing", region: "United Kingdom",
    website: "https://www.shelter.org.uk",
    donateUrl: "https://www.shelter.org.uk/support_us/donate",
    volunteerUrl: "https://www.shelter.org.uk/support_us/volunteer", type: "both",
  },
  {
    id: "trussell-c",
    name: "Trussell Trust",
    description: "Runs the UK's largest food bank network. Donate food or money, or volunteer at a local food bank.",
    category: "Food Assistance", region: "United Kingdom",
    website: "https://www.trusselltrust.org",
    donateUrl: "https://www.trusselltrust.org/make-a-donation/",
    volunteerUrl: "https://www.trusselltrust.org/get-involved/volunteer/", type: "both",
  },
  {
    id: "mind-uk",
    name: "Mind (UK)",
    description: "Provides mental health information, support, and campaigns for better mental health services in England and Wales.",
    category: "Mental Health", region: "United Kingdom",
    website: "https://www.mind.org.uk",
    donateUrl: "https://www.mind.org.uk/donate",
    volunteerUrl: "https://www.mind.org.uk/get-involved/volunteering/", type: "both",
  },
  // ── Australia ──────────────────────────────────────────────────────────
  {
    id: "salvos-au",
    name: "Salvation Army Australia",
    description: "Provides emergency relief, community programs, and social services across Australia.",
    category: "General Support", region: "Australia",
    website: "https://www.salvationarmy.org.au",
    donateUrl: "https://www.salvationarmy.org.au/donate/",
    volunteerUrl: "https://www.salvationarmy.org.au/volunteer/", type: "both",
  },
  {
    id: "beyond-blue-c",
    name: "Beyond Blue (Australia)",
    description: "Supports mental health in Australia. Donate to fund support services, research, and awareness campaigns.",
    category: "Mental Health", region: "Australia",
    website: "https://www.beyondblue.org.au",
    donateUrl: "https://www.beyondblue.org.au/about-us/donate", type: "donate",
  },
  // ── Singapore ──────────────────────────────────────────────────────────
  {
    id: "yellow-ribbon",
    name: "Yellow Ribbon Singapore",
    description: "Supports rehabilitation of ex-offenders and their families. Volunteer as a befriender or donate.",
    category: "Rehabilitation", region: "Singapore",
    website: "https://www.yellowribbon.gov.sg",
    donateUrl: "https://www.yellowribbon.gov.sg/support-us/donate",
    volunteerUrl: "https://www.yellowribbon.gov.sg/support-us/volunteer", type: "both",
  },
  {
    id: "spo",
    name: "Singapore Prison Fellowship",
    description: "Provides holistic care for inmates, ex-offenders, and their families through volunteer programmes.",
    category: "Rehabilitation", region: "Singapore",
    website: "https://www.spf.org.sg",
    volunteerUrl: "https://www.spf.org.sg/volunteer", type: "volunteer",
  },
  {
    id: "food-from-the-heart",
    name: "Food from the Heart (Singapore)",
    description: "Volunteer-run food distribution charity in Singapore, providing food aid to low-income families.",
    category: "Food Assistance", region: "Singapore",
    website: "https://www.foodfromtheheart.sg",
    donateUrl: "https://www.foodfromtheheart.sg/donate",
    volunteerUrl: "https://www.foodfromtheheart.sg/volunteer", type: "both",
  },
  {
    id: "sasco",
    name: "SASCO Senior Citizens' Home",
    description: "Provides residential and day care services for elderly in Singapore. Accepts volunteers and donations.",
    category: "Elder Care", region: "Singapore",
    website: "https://www.sasco.sg",
    donateUrl: "https://www.sasco.sg/donate",
    volunteerUrl: "https://www.sasco.sg/volunteer", type: "both",
  },
];

const categories = ["All Categories", ...Array.from(new Set(orgs.map(o => o.category))).sort()];
const regions = ["All Regions", "International", "United States", "United Kingdom", "Australia", "Singapore"];
const types = ["All", "Donate", "Volunteer", "Both"];

export function Contribute() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [region, setRegion] = useState("All Regions");
  const [type, setType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => orgs.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.category.toLowerCase().includes(q);
    const matchCat = category === "All Categories" || o.category === category;
    const matchRegion = region === "All Regions" || o.region.includes(region);
    const matchType = type === "All" ||
      (type === "Donate" && (o.type === "donate" || o.type === "both")) ||
      (type === "Volunteer" && (o.type === "volunteer" || o.type === "both")) ||
      (type === "Both" && o.type === "both");
    return matchSearch && matchCat && matchRegion && matchType;
  }), [search, category, region, type]);

  const hasFilters = search || category !== "All Categories" || region !== "All Regions" || type !== "All";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Contribute</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Organisations and charities you can donate to or volunteer with. All listings link
          directly to each organisation — Second Bridge makes no recommendations. Browse,
          decide for yourself, and act on their site.
        </p>
      </div>

      {/* Search + filter */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search organisations…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-muted-foreground" /></button>}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={() => setShowFilters(!showFilters)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Filters {showFilters ? "↑" : "↓"}
          </button>
          {/* Type quick pills */}
          <div className="flex gap-1.5 flex-wrap">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  type === t ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button onClick={() => { setSearch(""); setCategory("All Categories"); setRegion("All Regions"); setType("All"); }} className="text-xs text-muted-foreground hover:text-foreground ml-auto">
              Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-1.5">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1.5">Region</label>
              <select value={region} onChange={e => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-5">
        {filtered.length} organisation{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 bg-card rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">No organisations match your filters.</p>
          </div>
        ) : filtered.map(org => (
          <div key={org.id} className="bg-card rounded-lg border border-border p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-foreground text-sm">{org.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">{org.category}</span>
                  <span>{org.region}</span>
                </div>
              </div>
              <a href={org.website} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors shrink-0"
                aria-label={`Visit ${org.name} website`}>
                <Globe className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{org.description}</p>

            <div className="flex gap-2 flex-wrap">
              {(org.type === "donate" || org.type === "both") && org.donateUrl && (
                <a href={org.donateUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-border text-foreground rounded-md text-xs hover:bg-muted transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Donate
                </a>
              )}
              {(org.type === "volunteer" || org.type === "both") && org.volunteerUrl && (
                <a href={org.volunteerUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-border text-foreground rounded-md text-xs hover:bg-muted transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Volunteer
                </a>
              )}
              <a href={org.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-border text-muted-foreground rounded-md text-xs hover:bg-muted transition-colors ml-auto">
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card rounded-lg border border-border p-5">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> All listings are informational.
          Second Bridge does not endorse, vet, or represent any organisation. All links go directly
          to each organisation. Verify independently before donating or volunteering.{" "}
          <a href="https://github.com/MilkmanAbi/Second-Bridge" target="_blank" rel="noopener noreferrer"
            className="underline hover:text-foreground">Suggest an organisation on GitHub.</a>
        </p>
      </div>
    </div>
  );
}
