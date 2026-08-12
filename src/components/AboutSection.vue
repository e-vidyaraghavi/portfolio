<script setup>
import { profile } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'
</script>

<template>
  <section id="about" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="user" /> Who am I</p>

      <div class="card spotlight body">
        <div class="art-slot" aria-hidden="true"><AppArt name="bubbles" /></div>
        <p class="lead">{{ profile.summary }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.body {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(1.35rem, 3vw, 2rem);
}

.art-slot {
  opacity: 0.9;
}

@media (max-width: 620px) {
  .body {
    grid-template-columns: 1fr;
  }
  .art-slot {
    max-width: 110px;
  }
}
</style>
