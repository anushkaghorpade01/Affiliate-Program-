/** Spring for smoothing scroll progress — editorial, not bouncy. */
export const cinematicScrollSpring = {
  stiffness: 72,
  damping: 38,
  mass: 0.35,
  restDelta: 0.0008,
} as const
