<script setup>
import { computed } from 'vue'
import { useActiveSection } from '../composables/useActiveSection.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'product', label: 'Product' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const { active, progress } = useActiveSection(sections.map((s) => s.id))

const scrolled = computed(() => progress.value > 0.005)
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <!-- Reading progress: how far down the page you are. -->
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

    <div class="wrap bar">
      <a href="#top" class="mark">
        <span class="mark-glyph" aria-hidden="true">🐋</span>
        <span class="iris-text">Vidya</span>
      </a>

      <nav class="nav" aria-label="Sections">
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          :class="{ current: active === s.id }"
          :aria-current="active === s.id ? 'true' : undefined"
        >
          {{ s.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(3, 22, 30, 0.55);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.header.is-scrolled {
  background: rgba(3, 22, 30, 0.82);
  border-bottom-color: var(--border);
}

.progress {
  position: absolute;
  inset-inline: 0;
  bottom: -1px;
  height: 2px;
  background: var(--iris);
  transform-origin: 0 50%;
  transition: transform 0.1s linear;
}

.bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 62px;
}

.mark {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
}

.mark-glyph {
  font-size: 1.05rem;
  filter: drop-shadow(0 0 8px rgba(79, 227, 210, 0.6));
  transition: transform 0.35s ease;
}

.mark:hover .mark-glyph {
  transform: translateX(3px) rotate(-8deg);
}

.nav {
  display: flex;
  gap: 0.2rem;
  margin-left: auto;
  font-size: 0.86rem;
}

.nav a {
  position: relative;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  color: var(--faint);
  transition: color 0.2s ease, background 0.2s ease;
}

.nav a:hover {
  color: var(--text);
  background: rgba(79, 227, 210, 0.08);
}

.nav a.current {
  color: var(--text);
}

/* Iridescent dot under the section you're reading. */
.nav a.current::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 5px;
  height: 5px;
  margin-left: -2.5px;
  border-radius: 50%;
  background: var(--iris);
  box-shadow: 0 0 8px var(--cyan);
}

@media (max-width: 720px) {
  .nav {
    gap: 0;
    font-size: 0.78rem;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .nav::-webkit-scrollbar {
    display: none;
  }
  .nav a {
    padding-inline: 0.45rem;
    white-space: nowrap;
  }
}
</style>
