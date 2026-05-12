/** ease-in-out cubic — closer to hero motion curves than native smooth scroll */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function parseScrollMarginTop(el: Element): number {
  const parsed = parseFloat(getComputedStyle(el).scrollMarginTop)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Document scroll Y so `element` aligns with the top of the viewport, honoring scroll-margin-top. */
export function getDocumentScrollYForElement(element: Element): number {
  const rect = element.getBoundingClientRect()
  const margin = parseScrollMarginTop(element)
  return rect.top + window.scrollY - margin
}

export function smoothScrollToY(targetY: number, durationMs = 840): Promise<void> {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const startY = window.scrollY
  const change = targetY - startY

  if (prefersReduced || Math.abs(change) < 2) {
    window.scrollTo(0, Math.max(0, targetY))
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let startTime: number | null = null

    function step(now: number) {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / durationMs)
      window.scrollTo(0, startY + change * easeInOutCubic(t))
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

export function smoothScrollElementIntoView(element: HTMLElement | null): void {
  if (!element) return
  const targetY = getDocumentScrollYForElement(element)
  void smoothScrollToY(Math.max(0, targetY))
}
