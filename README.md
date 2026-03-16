# Second Bridge

An open-source community support resource directory built on **MILK principles** — Minimal, Inclusive, Lucid, Kind.

Live: [https://milkmanabi.github.io/Second-Bridge/](https://milkmanabi.github.io/Second-Bridge/)

---

## What It Is

Second Bridge is a platform that connects users to real community support services — crisis lines, housing, food assistance, healthcare, legal aid, LGBTQ+ support, and more — across the US, UK, Australia, Canada, and internationally.

It also provides:
- **Personal Tracker** — private notes and bookmarks (localStorage, no backend)
- **Community Forums** — anonymous peer discussion threads (localStorage)
- **Location-aware recommendations** — IP-based geolocation to surface relevant services

---

## MILK Philosophy

Every feature and design decision follows **MILK**:

| Principle | Meaning |
|-----------|---------|
| **M**inimal | Only what's functional and useful. No noise, no nudges. |
| **I**nclusive | Accessible, keyboard-navigable, anonymous by default. |
| **L**ucid | Transparent, predictable, explainable. No hidden logic. |
| **K**ind | Professional, calm, neutral. No patronising language. |

Full philosophy: [`src/imports/MILK-Philosophy.md`](src/imports/MILK-Philosophy.md)

---

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- React Router v7 (HashRouter for GH Pages)
- Radix UI / shadcn components
- No backend — all data is localStorage or static

---

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

You need to enable GitHub Pages in your repo settings:
- Settings → Pages → Source: **GitHub Actions**

---

## Contributing

To add or update a service listing, edit `src/app/data/servicesData.ts` and open a PR.

All contributions must adhere to MILK principles. See the [contribution philosophy](src/imports/MILK-Philosophy.md).

---

*Designed and authored by MilkmanAbi. Conceptual direction by Pilaiyar Siva Bala.*
