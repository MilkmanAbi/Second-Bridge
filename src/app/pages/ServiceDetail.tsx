import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Bookmark, BookmarkCheck,
  Share2, MessageSquare, ExternalLink, Tag, Languages, Check
} from "lucide-react";
import { services } from "../data/servicesData";

export function ServiceDetail() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sb-bookmarks") || "[]");
      return saved.includes(id);
    } catch { return false; }
  });
  const [copySuccess, setCopySuccess] = useState(false);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <h2 className="text-2xl text-foreground mb-4">Service Not Found</h2>
          <p className="text-muted-foreground mb-6">
            This service doesn't exist in the directory or may have been removed.
          </p>
          <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("sb-bookmarks") || "[]");
      const updated = isBookmarked
        ? saved.filter((bid) => bid !== id)
        : [...saved, id];
      localStorage.setItem("sb-bookmarks", JSON.stringify(updated));
      setIsBookmarked(!isBookmarked);
    } catch { /* no-op */ }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      setCopySuccess(false);
    }
  };

  // Related services in the same category
  const related = services
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/services"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Link>

      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                {service.category}
              </span>
              {service.isHotline && (
                <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Hotline
                </span>
              )}
              {service.isFree && (
                <span className="text-xs text-muted-foreground">Free</span>
              )}
              {service.isAnonymous && (
                <span className="text-xs text-muted-foreground">Anonymous access</span>
              )}
            </div>
            <h1 className="text-2xl text-foreground mb-2">{service.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1.5" />
              {service.region}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors ${
                isBookmarked
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              {isBookmarked ? (
                <><BookmarkCheck className="w-4 h-4" /><span className="hidden sm:inline">Bookmarked</span></>
              ) : (
                <><Bookmark className="w-4 h-4" /><span className="hidden sm:inline">Bookmark</span></>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card text-foreground hover:bg-muted text-sm transition-colors"
            >
              {copySuccess ? (
                <><Check className="w-4 h-4" /><span className="hidden sm:inline">Copied</span></>
              ) : (
                <><Share2 className="w-4 h-4" /><span className="hidden sm:inline">Share</span></>
              )}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{service.description}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg text-foreground mb-4">Contact</h2>
          <div className="space-y-3">
            {service.contact.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                  <a href={`tel:${service.contact.phone}`} className="text-foreground hover:opacity-75 font-mono">
                    {service.contact.phone}
                  </a>
                </div>
              </div>
            )}
            {service.contact.sms && (
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Text / SMS</p>
                  <p className="text-foreground font-mono">{service.contact.sms}</p>
                </div>
              </div>
            )}
            {service.contact.chat && (
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Online Chat</p>
                  <a
                    href={service.contact.chat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:opacity-75 flex items-center gap-1"
                  >
                    Open chat <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
            {service.contact.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${service.contact.email}`} className="text-foreground hover:opacity-75">
                    {service.contact.email}
                  </a>
                </div>
              </div>
            )}
            {service.contact.website && (
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Website</p>
                  <a
                    href={service.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:opacity-75 flex items-center gap-1"
                  >
                    {service.contact.website.replace("https://", "").replace("http://", "")}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
            {service.contact.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Address</p>
                  <p className="text-foreground">{service.contact.address}</p>
                </div>
              </div>
            )}
            {service.hours && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Hours</p>
                  <p className="text-foreground">{service.hours}</p>
                </div>
              </div>
            )}
            {service.languages && service.languages.length > 0 && (
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Languages</p>
                  <p className="text-foreground">{service.languages.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-lg text-foreground mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tracker CTA */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-foreground mb-1">Keep track of this service</h3>
            <p className="text-sm text-muted-foreground">
              Add private notes or reminders in your personal tracker.
            </p>
          </div>
          <Link
            to="/tracker"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
          >
            Open Tracker
          </Link>
        </div>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg text-foreground mb-4">More in {service.category}</h2>
          <div className="space-y-3">
            {related.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="block bg-card p-4 rounded-lg border border-border hover:border-muted-foreground hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm text-foreground mb-1">{s.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <MapPin className="w-3 h-3" />
                    {s.region}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
