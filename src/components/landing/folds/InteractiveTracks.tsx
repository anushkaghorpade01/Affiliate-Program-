import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { trackItems } from '@/components/landing/data'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

export function InteractiveTracks() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 24, factor * -24])

  return (
    <section ref={ref} className="relative -mt-4 overflow-hidden px-6 py-20 md:px-12">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[#000d09]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <FoldReveal>
          <h2 className="max-w-4xl font-display text-[2.8rem] leading-[0.95] tracking-[-0.03em] text-[#E8F5F0] md:text-[4.7rem]">Not all tastemakers move the same way.</h2>
        </FoldReveal>
        <FoldReveal delay={0.08} className="mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {trackItems.map((card) => (
              <motion.div whileHover="hover" initial="rest" animate="rest" key={card.title} className="group relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#003328] to-[#001c16] p-7">
                <motion.p variants={{ rest: { y: 0 }, hover: { y: -18 } }} className="font-display text-4xl leading-[1] text-[#E8F5F0]">{card.title}</motion.p>
                <motion.p variants={{ rest: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }} className="absolute bottom-8 left-7 max-w-[22ch] text-base text-[#dff2ec]/80">{card.copy}</motion.p>
              </motion.div>
            ))}
          </div>
        </FoldReveal>
      </div>
    </section>
  )
}
