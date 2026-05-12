/** Spring for smoothing scroll progress — editorial, not bouncy. */
export const cinematicScrollSpring = {
  stiffness: 72,
  damping: 38,
  mass: 0.35,
  restDelta: 0.0008,
} as const

/** Slightly snappier follow on narrow viewports (fold 2 horizontal scrub). */
export const cinematicScrollSpringMobile = {
  stiffness: 92,
  damping: 36,
  mass: 0.32,
  restDelta: 0.0008,
} as const
