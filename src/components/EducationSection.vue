<script setup>
import { education, certifications } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'
</script>

<template>
  <section id="education" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="book" /> Education &amp; Certifications</p>

      <div class="layout">
        <div class="stack">
          <div v-for="e in education" :key="e.title" class="card spotlight row">
            <div>
              <h2>{{ e.title }}</h2>
              <p class="org">{{ e.org }}</p>
            </div>
            <span class="period">{{ e.period }}</span>
          </div>

          <div class="certs">
            <div v-for="c in certifications" :key="c.title" class="card spotlight">
              <h3><AppIcon :name="c.icon" /> {{ c.title }}</h3>
              <p class="org">{{ c.org }}</p>
              <p class="detail">{{ c.detail }}</p>
            </div>
          </div>
        </div>

        <div class="art-slot" aria-hidden="true"><AppArt name="scroll" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  align-items: start;
  gap: clamp(1rem, 3vw, 2rem);
}

.stack {
  display: grid;
  gap: 0.85rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}

.certs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.85rem;
}

.certs h3 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.certs h3 svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: var(--cyan);
}

.org {
  margin-top: 0.15rem;
  font-size: 0.87rem;
  color: var(--cyan);
}

.detail {
  margin-top: 0.6rem;
  font-size: 0.875rem;
}

.period {
  font-size: 0.76rem;
  font-family: var(--mono);
  color: var(--faint);
}

.art-slot {
  opacity: 0.8;
}

@media (max-width: 760px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .art-slot {
    order: -1;
    max-width: 170px;
    margin-inline: auto;
  }
}
</style>
