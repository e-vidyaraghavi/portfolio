import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently in view so the nav can highlight it,
 * plus overall scroll progress (0–1) for the top progress bar.
 */
export function useActiveSection(ids) {
  const active = ref(ids[0])
  const progress = ref(0)
  let observer

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that's on screen.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) active.value = visible[0].target.id
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    observer?.disconnect()
  })

  return { active, progress }
}
