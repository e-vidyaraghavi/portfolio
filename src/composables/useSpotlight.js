import { onMounted, onUnmounted } from 'vue'

/**
 * Pointer-tracking sheen on `.spotlight` cards.
 * Writes --mx/--my custom properties that the CSS radial-gradient reads.
 * One delegated listener on the document rather than one per card.
 */
export function useSpotlight() {
  const onMove = (e) => {
    const card = e.target.closest?.('.spotlight')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  onMounted(() => document.addEventListener('pointermove', onMove, { passive: true }))
  onUnmounted(() => document.removeEventListener('pointermove', onMove))
}
