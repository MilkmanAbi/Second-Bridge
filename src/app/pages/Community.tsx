import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MessageSquare, Plus, Filter, Calendar, X } from "lucide-react";
import { serviceCategories } from "../data/servicesData";

interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  region: string;
  timestamp: string;
  replyCount: number;
  preview: string;
}

const COMMUNITY_KEY = "sb-community-threads";

// Seed threads — realistic, no filler
const seedThreads: Thread[] = [
  {
    id: "seed-1",
    title: "Tips for navigating housing assistance applications",
    author: "Anonymous",
    category: "Housing",
    region: "United States",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    replyCount: 9,
    preview: "I went through the HUD counselling process last month. A few things I wish I'd known going in — happy to share what helped.",
  },
  {
    id: "seed-2",
    title: "Non-hotline mental health options that worked for me",
    author: "Anonymous",
    category: "Crisis & Mental Health",
    region: "General",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    replyCount: 14,
    preview: "Not everyone is comfortable calling a hotline. Sharing some lower-barrier options that actually helped.",
  },
  {
    id: "seed-3",
    title: "SNAP application — what to expect (US)",
    author: "Anonymous",
    category: "Food Assistance",
    region: "United States",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 38).toISOString(),
    replyCount: 6,
    preview: "Went through the SNAP process in February. Here's a realistic walkthrough of what the experience is like.",
  },
  {
    id: "seed-4",
    title: "UK — Citizens Advice vs legal aid, when to use which",
    author: "Anonymous",
    category: "Legal Services",
    region: "United Kingdom",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 51).toISOString(),
    replyCount: 4,
    preview: "Both services exist but they serve different situations. Sharing from experience what the difference actually means in practice.",
  },
  {
    id: "seed-5",
    title: "Finding LGBTQ+-affirming services in smaller towns",
    author: "Anonymous",
    category: "LGBTQ+ Support",
    region: "General",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    replyCount: 11,
    preview: "Big city services are easy to find — but what about everyone else? Some strategies that worked for me.",
  },
  {
    id: "seed-6",
    title: "Using the tracker feature to manage multiple applications",
    author: "Anonymous",
    category: "General Support",
    region: "General",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 90).toISOString(),
    replyCount: 3,
    preview: "Juggling food bank, housing, and benefits applications at once. Here's how I used the tracker to stay on top of it.",
  },
];

function loadThreads(): Thread[] {
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNITY_KEY) || "null");
    return saved ?? seedThreads;
  } catch { return seedThreads; }
}

function saveThreads(threads: Thread[]) {
  try {
    localStorage.setItem(COMMUNITY_KEY, JSON.stringify(threads));
  } catch { /* no-op */ }
}

const regions = [
  "All Regions", "General", "United States", "United Kingdom", "Australia", "Canada", "Ireland", "International"
];

export function Community() {
  const [threads, setThreads] = useState<Thread[]>(loadThreads);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [showFilters, setShowFilters] = useState(false);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPreview, setNewPreview] = useState("");
  const [newCategory, setNewCategory] = useState(serviceCategories[0]);
  const [newRegion, setNewRegion] = useState("General");
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    saveThreads(threads);
  }, [threads]);

  const handlePost = () => {
    if (!newTitle.trim() || !newPreview.trim()) return;
    const thread: Thread = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      author: isAnonymous ? "Anonymous" : "You",
      category: newCategory,
      region: newRegion,
      timestamp: new Date().toISOString(),
      replyCount: 0,
      preview: newPreview.trim(),
    };
    const updated = [thread, ...threads];
    setThreads(updated);
    setNewTitle("");
    setNewPreview("");
    setShowNewThread(false);
  };

  const filteredThreads = threads.filter((t) => {
    const matchCat = selectedCategory === "All Categories" || t.category === selectedCategory;
    const matchRegion = selectedRegion === "All Regions" || t.region === selectedRegion || t.region === "General";
    return matchCat && matchRegion;
  });

  const formatDate = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    if (h < 48) return "Yesterday";
    return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Community Forums</h1>
        <p className="text-muted-foreground text-sm">
          Peer discussions, experience sharing, and practical advice. Anonymous by default.
          Not a substitute for professional support.
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={() => setShowNewThread(!showNewThread)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" />
            New Thread
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-border text-muted-foreground rounded-md hover:bg-muted text-sm transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide filters" : "Filter"}
          </button>
        </div>

        {showNewThread && (
          <div className="pt-5 border-t border-border space-y-3">
            <input
              type="text"
              placeholder="Thread title…"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="What would you like to discuss or share?"
              value={newPreview}
              onChange={(e) => setNewPreview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {serviceCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {regions.filter((r) => r !== "All Regions").map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              Post anonymously
            </label>
            <div className="flex gap-3">
              <button
                onClick={handlePost}
                disabled={!newTitle.trim() || !newPreview.trim()}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 text-sm disabled:opacity-40 transition-opacity"
              >
                Post Thread
              </button>
              <button
                onClick={() => { setShowNewThread(false); setNewTitle(""); setNewPreview(""); }}
                className="px-5 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showFilters && (
          <div className="pt-5 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All Categories">All Categories</option>
                {serviceCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
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
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {filteredThreads.length} thread{filteredThreads.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-3 mb-8">
        {filteredThreads.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground text-sm">No threads match your filters.</p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <Link
              key={thread.id}
              to={`/community/${thread.id}`}
              className="block bg-card rounded-lg border border-border p-5 hover:border-muted-foreground hover:shadow-sm transition-all"
            >
              <h3 className="text-foreground mb-2">{thread.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{thread.preview}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                  {thread.category}
                </span>
                {thread.region !== "General" && <span>{thread.region}</span>}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(thread.timestamp)}
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <MessageSquare className="w-3 h-3" />
                  {thread.replyCount}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-foreground mb-3">Community Guidelines</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>Be respectful. Different situations, different needs.</li>
          <li>Share information and experience — not medical or legal advice.</li>
          <li>Anonymous posting is available and encouraged if preferred.</li>
          <li>This is peer discussion, not professional support.</li>
        </ul>
      </div>
    </div>
  );
}
