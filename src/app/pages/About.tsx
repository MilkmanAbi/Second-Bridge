import { Link } from "react-router";
import { Minimize2, Users, Eye, Heart, Github, ExternalLink } from "lucide-react";

const milkPrinciples = [
  {
    icon: Minimize2,
    letter: "M",
    name: "Minimal",
    description:
      "Only what's functional and useful. No unnecessary features, notifications, or emotional nudges. Information presented directly — no clutter, no noise.",
  },
  {
    icon: Users,
    letter: "I",
    name: "Inclusive",
    description:
      "Keyboard navigable, screen-reader friendly, sufficient contrast. Anonymous participation available by default. Neutral language that doesn't assume your situation.",
  },
  {
    icon: Eye,
    letter: "L",
    name: "Lucid",
    description:
      "Predictable, transparent interactions. No hidden logic, no misleading copy, no unclear policies. Search results explain why they appear. You always know what's happening.",
  },
  {
    icon: Heart,
    letter: "K",
    name: "Kind",
    description:
      "Professional and calm throughout. No patronising language, no alarmist colours or popups, no assumptions about why you're here. Resources without judgment.",
  },
];

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl text-foreground mb-3">About Second Bridge</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          An open-source directory connecting people with real community support services. Built on
          principles of clarity, respect, and autonomy. The platform is a tool, not a caretaker.
        </p>
      </div>

      {/* MILK Principles */}
      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <h2 className="text-2xl text-foreground mb-2">MILK Design Philosophy</h2>
        <p className="text-sm text-muted-foreground mb-7">
          Every feature, interaction, and piece of copy in Second Bridge follows the MILK framework.
          It was developed as the foundational design philosophy for this project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milkPrinciples.map(({ icon: Icon, letter, name, description }) => (
            <div key={letter} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 bg-secondary rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-foreground mb-1.5">
                  <span className="text-muted-foreground font-mono text-sm mr-1.5">{letter} —</span>
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <h2 className="text-xl text-foreground mb-4">What Second Bridge Is</h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Second Bridge provides a clear, searchable directory of community support services —
            crisis lines, food assistance, housing, legal aid, healthcare, and more — across
            multiple countries. All listings use real contact information sourced from the
            organisations themselves.
          </p>
          <p>
            It also provides a personal tracker for private notes and bookmarks, and a peer
            forum for community discussion. All features are optional and voluntary.
          </p>
          <p>
            <strong className="text-foreground">What it is not:</strong> a mental health app,
            a crisis intervention service, or a replacement for professional support. It is an
            information and organisation tool. Users are treated as capable adults.
          </p>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <h2 className="text-xl text-foreground mb-4">Privacy & Data</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Second Bridge collects no personal data and has no backend or user accounts.</p>
          <ul className="space-y-1.5 mt-3 ml-4">
            <li>· Notes and bookmarks are stored in your browser only (localStorage)</li>
            <li>· Community threads are stored in your browser only</li>
            <li>· Location detection uses IP geolocation (ip-api.com) to suggest nearby resources — no data is retained</li>
            <li>· No cookies, no analytics, no tracking</li>
            <li>· Clearing your browser data removes all local content</li>
          </ul>
        </div>
      </div>

      {/* Open source */}
      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <h2 className="text-xl text-foreground mb-4">Open Source</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Second Bridge is fully open source. The code is public, contributions are welcome, and
          the directory can be extended for any region. If you know of a service that should be
          listed, opening a pull request or issue is the way to do it.
        </p>
        <a
          href="https://github.com/MilkmanAbi/Second-Bridge"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-colors"
        >
          <Github className="w-4 h-4" />
          View on GitHub
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Disclaimer */}
      <div className="bg-card rounded-lg border border-border p-6 mb-8">
        <h2 className="text-lg text-foreground mb-3">Disclaimer</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All service listings are informational only. Second Bridge does not endorse, represent,
          or take responsibility for any listed organisation. Contact details link directly to each
          service. Verify information independently before acting on it. This platform does not
          provide medical, legal, or crisis intervention services.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm"
        >
          Browse Services
        </Link>
        <Link
          to="/community"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm"
        >
          Community Forums
        </Link>
      </div>

      {/* Attribution */}
      <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
        <p>MILK philosophy designed and authored by MilkmanAbi.</p>
        <p>Conceptual direction by Pilaiyar Siva Bala.</p>
        <p>
          Open source under the terms of the project licence.{" "}
          <a
            href="https://github.com/MilkmanAbi/Second-Bridge/blob/main/MILK-Philosophy.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Read the full MILK philosophy
          </a>.
        </p>
      </div>
    </div>
  );
}
