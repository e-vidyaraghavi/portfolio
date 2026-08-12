<script setup>
import { ref } from 'vue'
import { experience } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'

// Current role starts expanded; older roles start collapsed.
const open = ref(experience.map((job) => job.current))

const toggle = (i) => (open.value[i] = !open.value[i])
</script>

<template>
  <section id="experience" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="briefcase" /> Employment History</p>

      <ol class="timeline">
        <li v-for="(job, i) in experience" :key="job.company" class="item">
          <span class="node" :class="{ current: job.current }" aria-hidden="true"></span>

          <div class="card spotlight">
            <button
              class="head"
              type="button"
              :aria-expanded="open[i]"
              :aria-controls="`job-${i}`"
              @click="toggle(i)"
            >
              <span class="titles">
                <h2>{{ job.role }}</h2>
                <span class="company">{{ job.company }}</span>
                <span class="period">{{ job.period }}</span>
              </span>
              <AppIcon name="chevron" class="chevron" :class="{ flipped: open[i] }" />
            </button>

            <div class="art-strip" aria-hidden="true">
              <AppArt :name="job.art" view-box="0 56 240 104" stretch />
            </div>

            <p class="summary">{{ job.summary }}</p>

            <!-- .clip carries no padding: see the note in ProductSection. -->
            <div :id="`job-${i}`" class="collapse" :class="{ 'is-open': open[i] }">
              <div class="clip">
                <ul class="points">
                  <li v-for="(point, k) in job.points" :key="k">{{ point }}</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: grid;
  gap: 1rem;
}

.item {
  position: relative;
  padding-left: 1.9rem;
}

/* Connector line between roles. */
.item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 1.9rem;
  bottom: -1rem;
  width: 1px;
  background: linear-gradient(180deg, var(--border-hi), transparent);
}

.node {
  position: absolute;
  left: 0;
  top: 1.5rem;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--surface-solid);
  border: 1px solid var(--border-hi);
}

.node.current {
  background: var(--iris);
  border-color: transparent;
  box-shadow: 0 0 12px rgba(79, 227, 210, 0.7);
}

.head {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.titles {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.7rem;
}

.company {
  font-size: 0.9rem;
  color: var(--cyan);
}

.period {
  font-size: 0.76rem;
  color: var(--faint);
  font-family: var(--mono);
}

.chevron {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  margin-left: auto;
  color: var(--faint);
  transition: transform 0.35s ease, color 0.2s ease;
}

.chevron.flipped {
  transform: rotate(180deg);
}

.head:hover .chevron {
  color: var(--cyan);
}

/* Thin decorative band under the role header. */
.art-strip {
  height: 44px;
  margin: 0.85rem 0 0.9rem;
  opacity: 0.55;
}

.summary {
  font-size: 0.92rem;
}

.points {
  display: grid;
  gap: 0.55rem;
  padding-top: 0.9rem;
}

.points li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.92rem;
  color: var(--muted);
}

.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.58em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--iris);
  opacity: 0.8;
}
</style>
