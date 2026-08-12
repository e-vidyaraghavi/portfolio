# Vidya Raghavi Elangovan — Portfolio

A single-page product portfolio built with **Vue 3** and **Vite**, deployed to GitHub Pages.

Dark iridescent ocean theme, collapsible product case studies, hand-drawn SVG artwork, animated
stat counters, and scroll-reveal — no runtime dependencies beyond Vue, and no external images.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
npm run bundle   # build + inline everything into one shareable .html
```

## Editing content

All content lives in [src/data/profile.js](src/data/profile.js) — summary, case studies, projects,
skills, roles, education, links. Edit that file; no component changes needed.

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which
builds and publishes to GitHub Pages. Enable it once under
**Settings → Pages → Source: GitHub Actions**.

## Docs

[NOTES.md](NOTES.md) walks through how the project was built and why — the design system, each
changelog, the visual-verification workflow, and the open to-dos.
