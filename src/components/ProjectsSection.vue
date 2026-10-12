<script setup>
import { projects } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="layers" /> Projects</p>

      <p class="intro lead">Design, research and build work outside the day job.</p>

      <div class="grid">
        <a
          v-for="p in projects"
          :key="p.title"
          class="card spotlight project"
          :href="p.href"
          target="_blank"
          rel="noopener"
        >
          <span class="emoji" aria-hidden="true">{{ p.emoji }}</span>

          <h2>{{ p.title }}</h2>
          <p class="detail">{{ p.detail }}</p>

          <ul class="tags">
            <li v-for="t in p.tags" :key="t" class="chip">{{ t }}</li>
          </ul>

          <span class="cta">
            {{ p.cta }}
            <AppIcon name="chevron" class="arrow" />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  margin-bottom: 1.4rem;
  max-width: 34em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.9rem;
}

.project {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.project:hover {
  transform: translateY(-4px);
  border-color: var(--border-hi);
  box-shadow: var(--glow);
}

.emoji {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  font-size: 1.2rem;
  border-radius: 12px;
  background: rgba(79, 227, 210, 0.1);
  border: 1px solid var(--border);
}

.detail {
  font-size: 0.9rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.tags .chip {
  font-size: 0.74rem;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.35rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--cyan);
}

.arrow {
  width: 15px;
  height: 15px;
  transform: rotate(-90deg);
  transition: transform 0.25s ease;
}

.project:hover .arrow {
  transform: rotate(-90deg) translateY(-4px);
}
</style>
