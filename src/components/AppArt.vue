<script setup>
import { useId } from 'vue'

// Decorative iridescent artwork, one per section.
// Inline SVG (no external image requests), gradient IDs made unique with
// useId() so multiple instances on a page don't collide.
const props = defineProps({
  name: { type: String, required: true },
  // Crop to a region of the artwork (used for the thin decorative bands).
  viewBox: { type: String, default: '0 0 240 200' },
  // Let the artwork stretch to its container instead of keeping its ratio —
  // only for bands, where a fixed short height is the point.
  stretch: { type: Boolean, default: false },
})

const uid = useId()
const g = (suffix) => `${uid}-${suffix}`
</script>

<template>
  <svg
    class="art"
    :class="[`art-${name}`, { stretch }]"
    :viewBox="viewBox"
    :preserveAspectRatio="stretch ? 'none' : undefined"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="g('iris')" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="#4fe3d2" />
        <stop offset="45%" stop-color="#7ec4f5" />
        <stop offset="75%" stop-color="#9b8cf7" />
        <stop offset="100%" stop-color="#f98fd4" />
      </linearGradient>
      <linearGradient :id="g('fade')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4fe3d2" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#9b8cf7" stop-opacity="0.04" />
      </linearGradient>
      <radialGradient :id="g('bloom')">
        <stop offset="0%" stop-color="#4fe3d2" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#4fe3d2" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- Whale — the hero motif, echoing the reference artwork.
         Head at the left, tail fluke at the right. -->
    <g v-if="name === 'whale'" :stroke="`url(#${g('iris')})`" fill="none" stroke-width="2">
      <circle cx="118" cy="100" r="80" :fill="`url(#${g('bloom')})`" stroke="none" />

      <!-- Body -->
      <path
        d="M44 106c0-27 30-46 68-46 39 0 68 21 80 44-16 20-45 32-80 32-38 0-68-6-68-30z"
        :fill="`url(#${g('fade')})`"
        stroke-linejoin="round"
      />

      <!-- Tail fluke: upper and lower lobes -->
      <path
        d="M192 104c10-9 20-22 25-37-13 5-24 14-31 25M192 106c12 6 22 16 28 28-13-3-24-11-31-19"
        stroke-linejoin="round"
      />

      <!-- Jaw line and belly grooves -->
      <path d="M45 112c22 11 45 15 72 14" stroke-opacity="0.75" stroke-linecap="round" />
      <path
        d="M62 122c4 6 8 10 13 13M78 126c3 6 7 10 11 13M94 128c3 5 6 9 10 12"
        stroke-opacity="0.4"
        stroke-width="1.6"
        stroke-linecap="round"
      />

      <!-- Pectoral fin -->
      <path
        d="M116 124c-3 13 2 24 12 30-7-11-9-20-8-28"
        stroke-opacity="0.8"
        stroke-linejoin="round"
      />

      <!-- Eye -->
      <circle cx="66" cy="98" r="2.6" :fill="`url(#${g('iris')})`" stroke="none" />

      <!-- Blowhole spout -->
      <g stroke-linecap="round" stroke-opacity="0.7">
        <path d="M92 58c3-9 1-16-4-21M104 56c5-10 4-18-1-24" />
      </g>

      <!-- Drifting bubbles -->
      <g stroke-opacity="0.3">
        <circle cx="46" cy="58" r="4" />
        <circle cx="30" cy="40" r="2.5" />
        <circle cx="62" cy="34" r="3" />
      </g>
    </g>

    <!-- Growth: an engagement curve lifting -->
    <g v-else-if="name === 'growth'">
      <path
        d="M20 150c30-6 44-26 62-44s34-34 62-44v88z"
        :fill="`url(#${g('fade')})`"
        opacity="0.7"
      />
      <path
        d="M20 150c30-6 44-26 62-44s34-34 62-44"
        fill="none"
        :stroke="`url(#${g('iris')})`"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <circle cx="144" cy="62" r="16" :fill="`url(#${g('bloom')})`" />
      <circle cx="144" cy="62" r="4.5" :fill="`url(#${g('iris')})`" />
      <g stroke="rgba(140,230,240,0.16)" stroke-width="1">
        <path d="M20 150h160M20 116h160M20 82h160" />
      </g>
    </g>

    <!-- Orbit: a product at the centre, integrations circling -->
    <g v-else-if="name === 'orbit'" fill="none" :stroke="`url(#${g('iris')})`">
      <circle cx="120" cy="100" r="70" stroke-opacity="0.2" />
      <circle cx="120" cy="100" r="48" stroke-opacity="0.35" />
      <circle cx="120" cy="100" r="26" stroke-opacity="0.6" />
      <circle cx="120" cy="100" r="34" :fill="`url(#${g('bloom')})`" stroke="none" />
      <circle cx="120" cy="100" r="6" :fill="`url(#${g('iris')})`" stroke="none" />
      <circle cx="168" cy="100" r="5" :fill="`url(#${g('iris')})`" stroke="none" />
      <circle cx="120" cy="30" r="4" :fill="`url(#${g('iris')})`" stroke="none" />
      <circle cx="86" cy="134" r="3.5" :fill="`url(#${g('iris')})`" stroke="none" />
    </g>

    <!-- Network: stakeholders connected -->
    <g v-else-if="name === 'network'">
      <g stroke="rgba(140,230,240,0.3)" stroke-width="1.2">
        <path d="M60 60 120 100 180 56M60 60 70 148M120 100 70 148M120 100 176 146M180 56 176 146" />
      </g>
      <circle cx="120" cy="100" r="30" :fill="`url(#${g('bloom')})`" />
      <g :fill="`url(#${g('iris')})`">
        <circle cx="120" cy="100" r="9" />
        <circle cx="60" cy="60" r="6" />
        <circle cx="180" cy="56" r="6" />
        <circle cx="70" cy="148" r="5" />
        <circle cx="176" cy="146" r="5" />
      </g>
    </g>

    <!-- Wave: layered water, used on the current role -->
    <g v-else-if="name === 'wave'" fill="none" :stroke="`url(#${g('iris')})`" stroke-linecap="round">
      <path d="M10 80c20-16 40-16 60 0s40 16 60 0 40-16 60 0 40 16 40 0" stroke-opacity="0.7" />
      <path d="M10 108c20-16 40-16 60 0s40 16 60 0 40-16 60 0 40 16 40 0" stroke-opacity="0.45" />
      <path d="M10 136c20-16 40-16 60 0s40 16 60 0 40-16 60 0 40 16 40 0" stroke-opacity="0.22" />
    </g>

    <!-- Pulse: monitoring / uptime -->
    <g v-else-if="name === 'pulse'" fill="none" :stroke="`url(#${g('iris')})`" stroke-width="2">
      <path
        d="M10 100h48l14-30 16 62 16-46 14 14h112"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="104" cy="86" r="18" :fill="`url(#${g('bloom')})`" stroke="none" />
    </g>

    <!-- Prism: skills refracting -->
    <g v-else-if="name === 'prism'">
      <circle cx="120" cy="100" r="60" :fill="`url(#${g('bloom')})`" />
      <path
        d="M120 40 175 145H65z"
        fill="none"
        :stroke="`url(#${g('iris')})`"
        stroke-width="2"
        stroke-opacity="0.8"
      />
      <g stroke-width="2.5" stroke-linecap="round">
        <path d="M20 96h72" stroke="#eafbff" stroke-opacity="0.6" />
        <path d="M148 92h72" stroke="#4fe3d2" />
        <path d="M148 102h68" stroke="#7ec4f5" />
        <path d="M148 112h60" stroke="#9b8cf7" />
        <path d="M148 122h50" stroke="#f98fd4" />
      </g>
    </g>

    <!-- Bubbles: contact / signal rising -->
    <g v-else-if="name === 'bubbles'" fill="none" :stroke="`url(#${g('iris')})`">
      <circle cx="120" cy="120" r="50" :fill="`url(#${g('bloom')})`" stroke="none" />
      <circle cx="90" cy="150" r="16" stroke-opacity="0.7" />
      <circle cx="140" cy="120" r="11" stroke-opacity="0.6" />
      <circle cx="106" cy="96" r="8" stroke-opacity="0.5" />
      <circle cx="150" cy="70" r="5.5" stroke-opacity="0.4" />
      <circle cx="122" cy="48" r="3.5" stroke-opacity="0.3" />
    </g>

    <!-- Certificate with a ribbon seal: education / credentials -->
    <g v-else-if="name === 'scroll'" fill="none" :stroke="`url(#${g('iris')})`" stroke-width="2">
      <circle cx="120" cy="96" r="56" :fill="`url(#${g('bloom')})`" stroke="none" />

      <rect
        x="58"
        y="42"
        width="124"
        height="88"
        rx="8"
        stroke-opacity="0.55"
        :fill="`url(#${g('fade')})`"
      />

      <g stroke-opacity="0.8" stroke-linecap="round" stroke-width="2.2">
        <path d="M76 66h72M76 84h72M76 102h44" />
      </g>

      <!-- Ribbon tails, then the seal on top of them -->
      <path
        d="M120 138l-13 26 13-7 13 7-13-26z"
        stroke-opacity="0.7"
        stroke-linejoin="round"
        :fill="`url(#${g('fade')})`"
      />
      <circle cx="120" cy="134" r="17" :fill="`url(#${g('fade')})`" />
      <circle cx="120" cy="134" r="9" stroke-opacity="0.6" />
    </g>
  </svg>
</template>

<style scoped>
.art {
  width: 100%;
  height: auto;
  overflow: visible;
}

.art.stretch {
  height: 100%;
}
</style>
