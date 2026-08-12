<script setup>
import { profile, highlights, tags } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'
import StatCounter from './StatCounter.vue'
</script>

<template>
  <section id="top" class="hero">
    <div class="wrap grid">
      <div class="copy">
        <p class="greeting">{{ profile.greeting }} I'm</p>
        <h1><span class="iris-text">{{ profile.name }}</span></h1>

        <p class="role">
          <AppIcon name="briefcase" />
          {{ profile.role }}, {{ profile.company }}
          <span class="loc"><AppIcon name="pin" /> {{ profile.location }}</span>
        </p>

        <p class="lead tagline">{{ profile.tagline }}</p>

        <div class="actions">
          <!-- Jumps to the contact section rather than firing a mailto:, which
               silently does nothing without a configured mail client (and is
               blocked outright inside a sandboxed preview). -->
          <a class="btn primary" href="#contact">
            <AppIcon name="send" />
            Get in touch
          </a>
          <a class="btn" :href="profile.links.resume" target="_blank" rel="noopener">
            <AppIcon name="download" />
            Résumé
          </a>
          <a
            class="btn icon-only"
            :href="profile.links.linkedin"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <AppIcon name="linkedin" />
          </a>
        </div>
      </div>

      <div class="portrait" aria-hidden="true">
        <AppArt name="whale" />
      </div>
    </div>

    <!-- Full page width, not inside the narrow copy column, so all four tags
         sit on one line on desktop. -->
    <ul class="wrap tags">
      <li v-for="tag in tags" :key="tag" class="chip">
        <span class="tick" aria-hidden="true"></span>
        {{ tag }}
      </li>
    </ul>

    <dl class="wrap stats">
      <StatCounter v-for="h in highlights" :key="h.label" v-bind="h" />
    </dl>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: clamp(2.5rem, 7vw, 4.5rem) clamp(2rem, 5vw, 3rem);
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
}

.greeting {
  font-size: 1.05rem;
  color: var(--faint);
  margin-bottom: 0.2rem;
}

.role {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: var(--text);
  font-weight: 500;
  font-size: 0.96rem;
}

.role svg {
  width: 15px;
  height: 15px;
  color: var(--cyan);
}

.loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--faint);
  font-weight: 400;
  font-size: 0.88rem;
  margin-left: 0.35rem;
}

.loc svg {
  color: var(--faint);
}

.tagline {
  margin-top: 1rem;
  max-width: 32em;
}

/* One straight row on desktop; wraps only when it genuinely can't fit. */
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: clamp(1.5rem, 4vw, 2.25rem);
}

.tags .chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  padding: 0.32rem 0.7rem;
  white-space: nowrap;
}

/* Small iridescent dot, so the tags read as a set rather than as links. */
.tick {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--iris);
  flex-shrink: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.62rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: var(--surface);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease;
}

.btn:hover {
  transform: translateY(-2px);
  border-color: var(--border-hi);
  box-shadow: var(--glow);
}

.btn.primary {
  background: var(--iris);
  border-color: transparent;
  color: #032028;
  font-weight: 600;
}

.btn.primary:hover {
  box-shadow: 0 10px 30px rgba(79, 227, 210, 0.3);
}

.btn.icon-only {
  padding: 0.62rem 0.72rem;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.portrait {
  position: relative;
}

/* Slow bob, so the creature feels suspended in water. */
.portrait :deep(.art) {
  animation: float 9s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-14px) rotate(-1.5deg);
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  margin-top: 1.1rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .portrait {
    order: -1;
    max-width: 300px;
    margin-inline: auto;
  }
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
