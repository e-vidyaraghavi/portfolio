<script setup>
import { useCountUp } from '../composables/useCountUp.js'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
})

// Counts up from zero the first time it scrolls into view.
const { display, el } = useCountUp(props.value)
</script>

<template>
  <div ref="el" class="stat card spotlight">
    <dt>
      <span class="iris-text">{{ display }}{{ suffix }}</span>
    </dt>
    <dd>{{ label }}</dd>
  </div>
</template>

<style scoped>
.stat {
  padding: 1.1rem 1.2rem;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.stat:hover {
  transform: translateY(-3px);
  border-color: var(--border-hi);
}

dt {
  font-size: clamp(1.7rem, 1.2rem + 1.6vw, 2.3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

dd {
  margin: 0.3rem 0 0;
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.45;
}
</style>
