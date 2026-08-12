<script setup>
// Ambient bubbles drifting upward behind the content.
// Pure CSS animation on a fixed, non-interactive layer — deterministic
// values (no Math.random) so the layout is stable between renders.
const bubbles = [
  { left: 6, size: 10, delay: 0, dur: 26, drift: 18 },
  { left: 16, size: 5, delay: 6, dur: 20, drift: -12 },
  { left: 27, size: 14, delay: 12, dur: 32, drift: 24 },
  { left: 38, size: 7, delay: 3, dur: 23, drift: -20 },
  { left: 49, size: 4, delay: 15, dur: 18, drift: 14 },
  { left: 61, size: 11, delay: 9, dur: 29, drift: -16 },
  { left: 72, size: 6, delay: 18, dur: 21, drift: 22 },
  { left: 83, size: 13, delay: 2, dur: 34, drift: -14 },
  { left: 92, size: 8, delay: 11, dur: 25, drift: 16 },
]
</script>

<template>
  <div class="field" aria-hidden="true">
    <span
      v-for="(b, i) in bubbles"
      :key="i"
      class="bubble"
      :style="{
        left: `${b.left}%`,
        width: `${b.size}px`,
        height: `${b.size}px`,
        animationDelay: `-${b.delay}s`,
        animationDuration: `${b.dur}s`,
        '--drift': `${b.drift}px`,
      }"
    />
  </div>
</template>

<style scoped>
.field {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -6%;
  border-radius: 50%;
  border: 1px solid rgba(150, 235, 245, 0.28);
  background: radial-gradient(circle at 32% 28%, rgba(200, 250, 255, 0.3), transparent 62%);
  animation-name: rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rise {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  12% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.5;
  }
  100% {
    transform: translate3d(var(--drift), -108vh, 0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .field {
    display: none;
  }
}
</style>
