import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const lineOpacity = useTransform(smooth, [0, 0.35, 1], [0.35, 0.85, 1])

  return (
    <footer ref={ref} className="relative -mt-10 px-6 pb-10 pt-16 text-[#dff2ec]/70 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#003328]/15 to-transparent" />
      <FoldReveal y={16}>
        <motion.div className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/15 pt-7 text-xs uppercase tracking-[0.18em]" style={{ opacity: lineOpacity }}>
          <span>Flent Tastemakers</span>
          <span>Built for good taste</span>
        </motion.div>
      </FoldReveal>
    </footer>
  )
}
