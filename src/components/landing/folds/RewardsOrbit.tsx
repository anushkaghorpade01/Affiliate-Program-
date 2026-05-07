import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { rewardsOrbitItems } from '@/components/landing/data'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

export function RewardsOrbit() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const reduceMotion = useReducedMotion()
  const ambientMotion = factor > 0 && !reduceMotion

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const baseY = useTransform(smooth, [0, 1], [factor * 28, factor * -28])
  const glowY = useTransform(smooth, [0, 1], [factor * -20, factor * 20])

  return (
    <section ref={ref} className="relative -mt-6 overflow-hidden px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#dff2ec]/25 to-transparent" />
      <motion.div
        style={{ y: baseY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,141,117,0.2),transparent_45%),#000d09]"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,141,117,0.15),transparent_40%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <FoldReveal>
          <h2 className="font-display text-[2.8rem] leading-[0.95] tracking-[-0.03em] text-[#E8F5F0] md:text-[5.2rem]">What good taste unlocks.</h2>
        </FoldReveal>
        <FoldReveal delay={0.07} className="mt-5">
          <p className="max-w-2xl text-lg text-[#dff2ec]/70">The brands, spaces, and little luxuries that make up the Flent way of living.</p>
        </FoldReveal>

        <FoldReveal delay={0.1} className="relative mt-16">
          <div className="grid gap-4 md:grid-cols-3">
            {rewardsOrbitItems.map((item, idx) => (
              <motion.div
                key={item}
                animate={
                  ambientMotion
                    ? { y: [0, idx % 2 ? -10 : 10, 0], x: [0, idx % 2 ? 8 : -8, 0] }
                    : undefined
                }
                transition={{ duration: 12 + idx, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Card className="bg-[#003328]/45 p-6 hover:bg-[#003328]/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853]">Artifact {String(idx + 1).padStart(2, '0')}</p>
                  <p className="mt-4 font-display text-3xl leading-tight text-[#E8F5F0]">{item}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </FoldReveal>
      </div>
    </section>
  )
}
