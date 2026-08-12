import { onMounted, onUnmounted } from 'vue'

/**
 * Fades elements in as they enter the viewport.
 * Add class="reveal" to any element; this observes them all once mounted
 * and adds .is-visible when they scroll into view.
 */
export function useReveal(selector = '.reveal') {
  let observer

  onMounted(() => {
    const targets = document.querySelectorAll(selector)

    // No observer support → leave everything visible (the CSS only hides
    // elements once .reveal-ready is set, so there is nothing to undo).
    if (!('IntersectionObserver' in window)) return

    // Opt into the hidden-then-revealed state now that we can observe.
    document.documentElement.classList.add('reveal-ready')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target) // reveal once, then stop watching
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
