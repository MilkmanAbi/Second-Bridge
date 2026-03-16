import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Search, Filter, MapPin, Tag, Phone, Globe, MessageSquare, ExternalLink, X } from "lucide-react";
import { services, serviceCategories, serviceRegions, type ServiceCategory } from "../data/servicesData";
import { useUserLocation } from "../hooks/useLocation";

export function Services() {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const { getServiceRegion } = useUserLocation();

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All Categories"
  );
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showAnonymousOnly, setShowAnonymousOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Auto-set region on first load
  useEffect(() => {
    const detected = getServiceRegion();
    if (detected !== "All Regions") {
      setSelectedRegion(detected);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.tags.some((t) => t.toLowerCase().includes(q)) ||
        service.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All Categories" || service.category === selectedCategory;

      const matchesRegion =
        selectedRegion === "All Regions" ||
        service.region === "International" ||
        service.region === selectedRegion ||
        service.region.includes(selectedRegion);

      const matchesFree = !showFreeOnly || service.isFree;
      const matchesAnon = !showAnonymousOnly || service.isAnonymous;

      return matchesSearch && matchesCategory && matchesRegion && matchesFree && matchesAnon;
    });
  }, [searchQuery, selectedCategory, selectedRegion, showFreeOnly, showAnonymousOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedRegion("All Regions");
    setShowFreeOnly(false);
    setShowAnonymousOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "All Categories" ||
    selectedRegion !== "All Regions" ||
    showFreeOnly ||
    showAnonymousOnly;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Services Directory</h1>
        <p className="text-muted-foreground">
          Real community services and hotlines. All listings are informational — contact details go
          directly to each organisation.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, category, or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide filters" : "Filters"}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All Categories">All Categories</option>
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1.5">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {serviceRegions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="rounded"
                />
                Free services only
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAnonymousOnly}
                  onChange={(e) => setShowAnonymousOnly(e.target.checked)}
                  className="rounded"
                />
                Anonymous access
              </label>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {selectedCategory !== "All Categories" && (
              <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All Categories")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedRegion !== "All Regions" && (
              <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1">
                {selectedRegion}
                <button onClick={() => setSelectedRegion("All Regions")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {showFreeOnly && (
              <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1">
                Free only
                <button onClick={() => setShowFreeOnly(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {showAnonymousOnly && (
              <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1">
                Anonymous
                <button onClick={() => setShowAnonymousOnly(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-5">
        {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"}
        {selectedRegion !== "All Regions" && ` in ${selectedRegion}`}
        {selectedCategory !== "All Categories" && ` · ${selectedCategory}`}
      </p>

      <div className="space-y-3">
        {filteredServices.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-3">No services match your current filters.</p>
            <button onClick={clearFilters} className="text-sm text-foreground underline">
              Clear filters
            </button>
          </div>
        ) : (
          filteredServices.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="block bg-card rounded-lg border border-border p-5 hover:border-muted-foreground hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-foreground">{service.name}</h3>
                    {service.isHotline && (
                      <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                        Hotline
                      </span>
                    )}
                    {service.isFree && (
                      <span className="text-xs text-muted-foreground">Free</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {service.region}
                    </span>
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                      {service.category}
                    </span>
                    {service.hours && <span>{service.hours}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  {service.contact.phone && (
                    <span className="flex items-center gap-1 text-xs">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="font-mono hidden sm:inline">{service.contact.phone}</span>
                    </span>
                  )}
                  {service.contact.website && (
                    <a
                      href={service.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
                      title="Open website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {service.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-8 bg-card rounded-lg border border-border p-5">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> All listings are informational. Second Bridge does not
          endorse or represent any service. Contact details link directly to each organisation.
          If you know of a service that should be listed,{" "}
          <a href="https://github.com/MilkmanAbi/Second-Bridge" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            contribute to the directory
          </a>.
        </p>
      </div>
    </div>
  );
}
