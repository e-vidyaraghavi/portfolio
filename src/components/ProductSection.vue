<script setup>
import { ref } from 'vue'
import { productWork } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
import AppArt from './AppArt.vue'

// First case study open by default — the strongest one leads.
const open = ref(productWork.map((_, i) => i === 0))

const toggle = (i) => (open.value[i] = !open.value[i])
</script>

<template>
  <section id="product" class="section">
    <div class="wrap">
      <p class="section-label"><AppIcon name="compass" /> Product Work</p>

      <p class="intro lead">
        Three problems I worked on — what was wrong, what I changed, and what happened as a
        result.
      </p>

      <div class="cases">
        <article v-for="(item, i) in productWork" :key="item.title" class="case card spotlight">
          <button
            class="head"
            type="button"
            :aria-expanded="open[i]"
            :aria-controls="`case-${i}`"
            @click="toggle(i)"
          >
            <span class="icon-wrap"><AppIcon :name="item.icon" /></span>

            <span class="head-text">
              <span class="tag">{{ item.tag }}</span>
              <h2>{{ item.title }}</h2>
            </span>

            <AppIcon name="chevron" class="chevron" :class="{ flipped: open[i] }" />
          </button>

          <!-- The element the .collapse clips must carry no padding or border of
               its own — a border box cannot shrink below them, so the closed
               state would leak a strip of content. Padding goes on .body. -->
          <div :id="`case-${i}`" class="collapse" :class="{ 'is-open': open[i] }">
            <div class="clip">
            <div class="body">
              <div class="text">
                <div class="block">
                  <p class="block-label"><AppIcon name="question" /> The problem</p>
                  <p>{{ item.problem }}</p>
                </div>

                <div class="block">
                  <p class="block-label"><AppIcon name="route" /> How I approached it</p>
                  <ul>
                    <li v-for="(step, k) in item.approach" :key="k">{{ step }}</li>
                  </ul>
                </div>

                <div class="block outcome">
                  <p class="block-label"><AppIcon name="flag" /> Outcome</p>
                  <p>{{ item.outcome }}</p>
                </div>
              </div>

              <div class="art-slot" aria-hidden="true"><AppArt :name="item.art" /></div>
            </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  margin-bottom: 1.5rem;
  max-width: 36em;
}

.cases {
  display: grid;
  gap: 0.9rem;
}

.case {
  padding: 0;
  transition: border-color 0.25s ease;
}

.case:hover {
  border-color: var(--border-hi);
}

.head {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 0.9rem;
  text-align: left;
  padding: 1.2rem 1.35rem;
}

.icon-wrap {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: rgba(79, 227, 210, 0.1);
  border: 1px solid var(--border);
  color: var(--cyan);
}

.icon-wrap svg {
  width: 17px;
  height: 17px;
}

.head-text {
  display: grid;
  gap: 0.28rem;
  min-width: 0;
}

.tag {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--faint);
}

h2 {
  font-size: 1.02rem;
}

.chevron {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  margin-top: 0.35rem;
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

.body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  align-items: start;
  gap: clamp(1rem, 3vw, 2rem);
  padding: 1.2rem 1.35rem 1.4rem;
  border-top: 1px solid var(--border);
}

.text {
  display: grid;
  gap: 1.15rem;
}

.block-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.71rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 0.45rem;
}

.block-label svg {
  width: 14px;
  height: 14px;
  color: var(--cyan);
}

.block p {
  font-size: 0.92rem;
}

.block ul {
  display: grid;
  gap: 0.5rem;
}

.block li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.92rem;
  color: var(--muted);
}

.block li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.58em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--iris);
  opacity: 0.85;
}

/* The result is the payoff — give it a gradient rail and tinted ground. */
.outcome {
  position: relative;
  background: rgba(79, 227, 210, 0.07);
  border-radius: 0 12px 12px 0;
  padding: 0.9rem 1.05rem;
  overflow: hidden;
}

.outcome::before {
  content: '';
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 3px;
  background: var(--iris);
}

.outcome p {
  color: var(--text);
}

.art-slot {
  opacity: 0.85;
  padding-top: 0.5rem;
}

@media (max-width: 700px) {
  .body {
    grid-template-columns: 1fr;
  }
  .art-slot {
    order: -1;
    max-width: 190px;
    margin-inline: auto;
  }
}

@media (max-width: 520px) {
  .head,
  .body {
    padding-inline: 1.05rem;
  }
}
</style>
