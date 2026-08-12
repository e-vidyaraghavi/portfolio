// Inlines the Vite build into one self-contained HTML fragment.
// Used to publish a shareable preview link; GitHub Pages uses dist/ directly.
// Usage: npm run build && node scripts/bundle-single-file.mjs <outfile>

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const out = process.argv[2] || 'portfolio-single-file.html'

const assets = readdirSync(join(dist, 'assets'))
const css = readFileSync(join(dist, 'assets', assets.find((f) => f.endsWith('.css'))), 'utf8')
const js = readFileSync(join(dist, 'assets', assets.find((f) => f.endsWith('.js'))), 'utf8')

const html = readFileSync(join(dist, 'index.html'), 'utf8')
const title = html.match(/<title>(.*?)<\/title>/s)[1]

// The inline ground-colour style from index.html, so the single-file build
// paints the dark background before the main stylesheet arrives.
const ground = html.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? ''

writeFileSync(
  out,
  `<title>${title}</title>
${ground}
<style>
${css}
</style>
<div id="app"></div>
<script type="module">
${js}
</script>
`,
)

console.log(`Wrote ${out}`)
