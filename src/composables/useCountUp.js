import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Counts a number up from 0 once its element scrolls into view.
 * Returns { display, el } — bind el as a template ref.
 * Respects prefers-reduced-motion by jumping straight to the target.
 */
export function useCountUp(target, duration = 1400) {
  const display = ref(0)
  const el = ref(null)
  let observer
  let frame

  const run = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      display.value = target
      return
    }

    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast start, soft landing
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      display.value = Math.round(target * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!el.value || !('IntersectionObserver' in window)) {
      display.value = target
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        run()
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
  })

  return { display, el }
}
