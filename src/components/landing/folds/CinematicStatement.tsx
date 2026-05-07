import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

export function CinematicStatement() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 26, factor * -26])
  const grainY = useTransform(smooth, [0, 1], [factor * -14, factor * 14])

  return (
    <section ref={ref} className="relative -mt-2 overflow-hidden px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#000d09]/35 to-transparent" />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,141,117,0.26),transparent_45%),linear-gradient(170deg,#001610_0%,#003328_60%,#000d09_100%)]"
        aria-hidden
      />
      <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-16 md:flex-row md:items-end">
        <FoldReveal className="max-w-xl">
          <h2 className="font-display text-[3rem] leading-[0.92] tracking-[-0.03em] text-[#E8F5F0] md:text-[6rem]">Start earning from day one</h2>
        </FoldReveal>
        <FoldReveal delay={0.08} className="max-w-md">
          <p className="text-lg text-[#dff2ec]/75">From your first recommendation, your taste starts compounding into meaningful rewards, collaborations, and access.</p>
        </FoldReveal>
      </div>
    </section>
  )
}
