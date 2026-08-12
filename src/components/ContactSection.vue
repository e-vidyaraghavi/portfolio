<script setup>
import { profile } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'

const items = [
  {
    icon: 'mail',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'Vidya Raghavi',
    href: profile.links.linkedin,
  },
  {
    icon: 'download',
    label: 'Résumé',
    value: 'Download PDF',
    href: profile.links.resume,
  },
]
</script>

<template>
  <section id="contact" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="send" /> Connect with me</p>

      <div class="top">
        <div>
          <h2 class="pitch">Let's talk about <span class="iris-text">what to build next.</span></h2>
          <p class="lead">
            Email is the fastest way to reach me — I usually reply within a day. You'll also find
            me on LinkedIn, and my résumé is a click away.
          </p>
        </div>

        <div class="art-slot" aria-hidden="true"><AppArt name="bubbles" /></div>
      </div>

      <ul class="grid">
        <li v-for="item in items" :key="item.label">
          <!-- Only real http(s) destinations open in a new tab; a mailto: with
               target="_blank" leaves an empty tab behind. -->
          <a
            class="card spotlight contact-card"
            :href="item.href"
            :target="item.href.startsWith('http') ? '_blank' : undefined"
            :rel="item.href.startsWith('http') ? 'noopener' : undefined"
          >
            <span class="icon-wrap"><AppIcon :name="item.icon" /></span>
            <span class="text">
              <span class="label">{{ item.label }}</span>
              <span class="value">{{ item.value }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
}

.pitch {
  font-size: clamp(1.45rem, 1rem + 1.6vw, 2.1rem);
  max-width: 20em;
  letter-spacing: -0.03em;
}

.lead {
  margin-top: 0.9rem;
  max-width: 36em;
}

/* Explicit equal columns rather than auto-fit: every card gets exactly the
   same width, and grid gives them a shared row height for free. */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 2.25rem;
}

/* Each <li> is a grid so its card can stretch to the full row height —
   otherwise a card whose text wraps ends up taller than its neighbours. */
.grid li {
  display: grid;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 100%;
  padding: 1rem 1.05rem;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-hi);
  box-shadow: var(--glow);
}

.icon-wrap {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(79, 227, 210, 0.1);
  border: 1px solid var(--border);
  color: var(--cyan);
  transition: background 0.25s ease;
}

.contact-card:hover .icon-wrap {
  background: rgba(79, 227, 210, 0.2);
}

.icon-wrap svg {
  width: 18px;
  height: 18px;
}

.text {
  display: grid;
  min-width: 0;
}

.label {
  font-size: 0.7rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--faint);
}

/* Sized so the full email address fits on one line in a third of the column;
   break-word (not anywhere) so it only ever breaks as a last resort. */
.value {
  font-size: 0.8rem;
  color: var(--text);
  overflow-wrap: break-word;
}

@media (max-width: 700px) {
  .top {
    grid-template-columns: 1fr;
  }
  .art-slot {
    max-width: 150px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
