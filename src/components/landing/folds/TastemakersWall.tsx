import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { tastemakerCards } from '@/components/landing/data'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

export function TastemakersWall() {
  const ref = useRef<HTMLElement>(null)
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true })
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 30, factor * -30])
  const grainY = useTransform(smooth, [0, 1], [factor * -16, factor * 16])

  return (
    <section ref={ref} className="relative -mt-6 overflow-hidden px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#000d09]/22 to-transparent" />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#e6f6f1_0%,#dff2ec_100%)]"
        aria-hidden
      />
      <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-65" />

      <div className="relative mx-auto max-w-7xl">
        <FoldReveal>
          <h2 className="font-display text-[3rem] leading-[0.92] tracking-[-0.03em] text-[#003328] md:text-[5.3rem]">Meet the Tastemakers.</h2>
        </FoldReveal>
        <FoldReveal delay={0.06} className="mt-5">
          <p className="max-w-2xl text-lg text-[#003328]/75">Portraits, places, objects, playlists, and recommendations from the people shaping the Flent atmosphere.</p>
        </FoldReveal>

        <FoldReveal delay={0.1} className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {tastemakerCards.map((card) => (
                <motion.article key={card} whileHover={{ y: -6 }} className="min-w-[77%] rounded-[2rem] border border-[#003328]/15 bg-white/70 p-7 shadow-[0_30px_80px_-45px_rgba(0,51,40,0.5)] backdrop-blur-sm md:min-w-[34%]">
                  <div className="h-52 rounded-2xl bg-[linear-gradient(160deg,#003328,#008d75)]" />
                  <p className="mt-5 font-display text-3xl text-[#003328]">{card}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#003328]/60">Objects / Spots / Fragments</p>
                </motion.article>
              ))}
            </div>
          </div>
        </FoldReveal>
      </div>
    </section>
  )
}
