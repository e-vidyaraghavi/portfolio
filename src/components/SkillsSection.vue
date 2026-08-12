<script setup>
import { skills } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'
</script>

<template>
  <section id="skills" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="code" /> Skills</p>

      <div class="layout">
        <div class="groups">
          <div v-for="group in skills" :key="group.group" class="group card spotlight">
            <h3><AppIcon :name="group.icon" /> {{ group.group }}</h3>
            <ul>
              <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="art-slot" aria-hidden="true"><AppArt name="prism" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 170px;
  align-items: start;
  gap: clamp(1rem, 3vw, 2rem);
}

.groups {
  display: grid;
  gap: 0.85rem;
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  margin-bottom: 0.85rem;
}

h3 svg {
  width: 15px;
  height: 15px;
  color: var(--cyan);
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.art-slot {
  position: sticky;
  top: 90px;
  opacity: 0.85;
}

@media (max-width: 760px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .art-slot {
    position: static;
    order: -1;
    max-width: 200px;
    margin-inline: auto;
  }
}
</style>
