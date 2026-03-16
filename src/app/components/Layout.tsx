import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Search, Home, List, BookmarkPlus, MessageSquare, Info, Moon, Sun, Wrench, Heart } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ThemeCustomizer } from "./ThemeCustomizer";

const BASE = "/Second-Bridge";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { mode, toggleMode } = useTheme();

  const navigation = [
    { name: "Home",       path: "/",          icon: Home },
    { name: "Services",   path: "/services",  icon: List },
    { name: "Contribute", path: "/contribute",icon: Heart },
    { name: "Tools",      path: "/tools",     icon: Wrench },
    { name: "Tracker",    path: "/tracker",   icon: BookmarkPlus },
    { name: "Community",  path: "/community", icon: MessageSquare },
    { name: "About",      path: "/about",     icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const logoSrc = mode === "dark"
    ? `${BASE}/logo-dark.png`
    : `${BASE}/logo-light.png`;

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <header className="bg-card border-b border-border sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img src={logoSrc} alt="Second Bridge" className="w-9 h-9 object-cover rounded-full" />
              <span className="text-lg text-foreground hidden sm:inline">Second Bridge</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-0.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md transition-colors text-sm ${
                      isActive(item.path)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1.5">
              <form onSubmit={handleSearch} className="hidden xl:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search services…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 w-48 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>
              </form>
              <ThemeCustomizer />
              <button
                onClick={toggleMode}
                className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile / tablet nav */}
          <nav className="lg:hidden pb-2 flex overflow-x-auto gap-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md whitespace-nowrap text-sm transition-colors flex items-center gap-1.5 shrink-0 ${
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="bg-card border-t border-border mt-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src={logoSrc} alt="Second Bridge" className="w-8 h-8 object-cover rounded-full" />
                <span className="text-foreground">Second Bridge</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Open-source community resource directory. Built on MILK principles.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-foreground mb-3">Directory</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground">All Services</Link></li>
                <li><Link to="/services?category=Housing" className="text-muted-foreground hover:text-foreground">Housing</Link></li>
                <li><Link to="/services?category=Food+Assistance" className="text-muted-foreground hover:text-foreground">Food Assistance</Link></li>
                <li><Link to="/services?category=Healthcare" className="text-muted-foreground hover:text-foreground">Healthcare</Link></li>
                <li><Link to="/services?category=Legal+Services" className="text-muted-foreground hover:text-foreground">Legal Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm text-foreground mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contribute" className="text-muted-foreground hover:text-foreground">Contribute</Link></li>
                <li><Link to="/tools" className="text-muted-foreground hover:text-foreground">Tools</Link></li>
                <li><Link to="/tracker" className="text-muted-foreground hover:text-foreground">Personal Tracker</Link></li>
                <li><Link to="/community" className="text-muted-foreground hover:text-foreground">Community Forums</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About & MILK</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm text-foreground mb-3">Project</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://github.com/MilkmanAbi/Second-Bridge" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">MILK Philosophy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
            <p>Open source · No tracking · All data stays on your device</p>
            <p>Designed by MilkmanAbi · Direction by Pilaiyar Siva Bala</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
