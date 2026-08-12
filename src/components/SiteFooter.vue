<script setup>
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap bar">
      <p>© {{ year }} {{ profile.name }}</p>
      <p class="built">Built with Vue 3 &amp; Vite · <a href="#top" class="link-underline">Back to top ↑</a></p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding-block: 1.9rem;
  background: rgba(2, 20, 28, 0.6);
}

.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  justify-content: space-between;
  font-size: 0.82rem;
}

p {
  color: var(--faint);
}
</style>
