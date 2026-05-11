import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

const tastemakerArchiveCards = [
  {
    label: 'Superpower',
    title: 'Object Study',
    src: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=720&q=85',
    className: 'z-[1] w-[10rem] translate-y-10 rotate-[-2deg] opacity-90 md:w-[13rem] md:translate-y-12',
  },
  {
    label: 'Character AI',
    title: 'City Lens',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=85',
    className: 'z-[2] -ml-7 w-[12rem] translate-y-2 rotate-[1.5deg] md:-ml-8 md:w-[16rem] md:translate-y-4',
  },
  {
    label: 'Baboon Bees',
    title: 'Archive Portrait',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=820&q=85',
    className: 'z-[4] -ml-8 w-[14rem] rotate-[-0.75deg] md:-ml-10 md:w-[20rem]',
  },
  {
    label: 'Waverly',
    title: 'Atmosphere',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=85',
    className: 'z-[3] -ml-8 w-[11rem] translate-y-8 rotate-[2deg] md:-ml-10 md:w-[15rem] md:translate-y-10',
  },
] as const

export function TastemakersWall() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const railY = useTransform(smooth, [0, 1], [factor * 18, factor * -18])
  const grainY = useTransform(smooth, [0, 1], [factor * -8, factor * 8])

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f3eee8] px-6 pb-0 pt-8 md:min-h-[92vh] md:px-12 md:pt-10">
      <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[92rem] flex-col">
        <FoldReveal>
          <div className="relative min-h-[18rem] md:min-h-[24rem]">
            <h2 className="font-display text-[clamp(5.5rem,18vw,14rem)] leading-[0.78] tracking-[-0.065em] text-[#cda03b]">
              Wall of
            </h2>
            <p className="mt-7 max-w-[14rem] text-left text-[0.95rem] leading-[1.12] tracking-[-0.02em] text-[#1a1a18]/82 md:mt-8 md:max-w-[15rem] md:text-[1.05rem]">
              A living archive of taste, influence, and the people who move culture quietly.
            </p>
            <h2 className="absolute right-0 top-[5.75rem] font-display text-[clamp(4.35rem,15vw,13rem)] leading-[0.78] tracking-[-0.065em] text-[#cda03b] md:top-[7.25rem]">
              Tastemakers
            </h2>
          </div>
        </FoldReveal>

        <FoldReveal delay={0.1} className="mt-auto">
          <motion.div
            style={{ y: railY }}
            className="relative left-1/2 flex w-[calc(100vw+6rem)] -translate-x-1/2 items-end overflow-visible pb-0 pl-[8vw] md:w-[calc(100vw+10rem)] md:pl-[14vw]"
          >
            {tastemakerArchiveCards.map((card) => (
              <motion.article
                key={card.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={card.className}
              >
                <p className="mb-1.5 text-[0.62rem] leading-none tracking-[-0.01em] text-[#1a1a18]/38 md:text-[0.68rem]">
                  ○ {card.label}
                </p>
                <div className="overflow-hidden rounded-[0.7rem] bg-[#e8e0d7] shadow-[0_18px_50px_-42px_rgba(0,0,0,0.75)]">
                  <img
                    src={card.src}
                    alt={card.title}
                    width={820}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </FoldReveal>
      </div>
    </section>
  )
}
