import { Link } from "react-router";
import { Search, BookmarkPlus, MessageSquare, ArrowRight, MapPin, Loader2, Heart, Wrench } from "lucide-react";
import { useUserLocation } from "../hooks/useLocation";

export function Home() {
  const { location } = useUserLocation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="mb-16">
        <h1 className="text-4xl text-foreground mb-4">Second Bridge</h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          A directory of community services and resources. Browse, take notes, and connect
          — at your own pace, on your own terms.
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          {location.status === "loading" && (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Detecting your region…</span></>
          )}
          {location.status === "granted" && location.city && (
            <><MapPin className="w-3.5 h-3.5" />
            <span>
              {location.city}, {location.regionName} — services near you are surfaced first in the directory.{" "}
              <Link to="/services" className="underline underline-offset-2 hover:text-foreground">Browse all</Link>
            </span></>
          )}
        </div>
      </div>

      {/* Five equal cards — no hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {[
          {
            to: "/services", icon: Search, title: "Services Directory",
            desc: "Browse community services by category, region, or keyword. Search for what you're looking for — nothing is pushed at you.",
            cta: "Browse directory",
          },
          {
            to: "/contribute", icon: Heart, title: "Contribute",
            desc: "Find organisations and charities to donate to or volunteer with. Links go directly to each organisation — decide for yourself.",
            cta: "Find organisations",
          },
          {
            to: "/tools", icon: Wrench, title: "Tools",
            desc: "Calendar, task list, scratchpad, timer. Lightweight utilities stored locally in your browser.",
            cta: "Open tools",
          },
          {
            to: "/tracker", icon: BookmarkPlus, title: "Personal Tracker",
            desc: "Save services, keep private notes, organise what matters to you. Stored locally — nothing leaves your device.",
            cta: "Open tracker",
          },
          {
            to: "/community", icon: MessageSquare, title: "Community",
            desc: "Peer discussions and shared experience. Anonymous by default. No obligation to participate.",
            cta: "Browse forums",
          },
        ].map(({ to, icon: Icon, title, desc, cta }) => (
          <Link
            key={to}
            to={to}
            className="group bg-card p-7 rounded-lg border border-border hover:border-muted-foreground hover:shadow-sm transition-all"
          >
            <Icon className="w-6 h-6 text-foreground mb-4" />
            <h3 className="text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{desc}</p>
            <span className="text-sm text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              {cta} <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="border-t border-border pt-12">
        <div className="max-w-2xl">
          <h2 className="text-xl text-foreground mb-3">About Second Bridge</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Second Bridge is an open-source platform built on MILK principles — Minimal, Inclusive,
            Lucid, Kind. A tool, not a caretaker. You decide what to look at, save, or share.
            Nothing is collected, tracked, or assumed about you. For the community, by the community.
          </p>
          <Link to="/about" className="text-sm text-foreground inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
