import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { trackItems } from '@/components/landing/data'
import type { TrackItem } from '@/components/landing/types'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

function useTouchFlipEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return enabled
}

function TrackFlipCard({ card }: { card: TrackItem }) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouchFlipEnabled = useTouchFlipEnabled()
  const isInView = useInView(ref, { amount: 0.62, margin: '-12% 0px -12% 0px' })
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  if (!card.image) return null

  const isFlipped = isHovered || (isTouchFlipEnabled && isInView) || isFocused

  return (
    <motion.div
      ref={ref}
      tabIndex={0}
      aria-label={`${card.title} card details`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="h-[25rem] w-full rounded-[2rem] outline-none [perspective:1200px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 58, damping: 20, mass: 0.95 }}
        className="relative h-full w-full rounded-[2rem] will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src={card.image.src}
          alt={card.image.alt}
          className="absolute inset-0 h-full w-full rounded-[2rem] object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 flex rounded-[2rem] bg-white p-8 text-black [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0)]">
          <div className="mt-auto max-w-[24ch]">
            <p className="font-display text-3xl leading-none">{card.title}</p>
            <p className="mt-5 text-base leading-[1.15] text-black/72">
              Placeholder text explaining this tastemaker card and the role they play in moving Flent through their circles.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function InteractiveTracks() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 24, factor * -24])
  const headingY = useTransform(smooth, [0, 1], [factor * 18, factor * -18])
  const tilesY = useTransform(smooth, [0, 1], [factor * 34, factor * -34])

  return (
    <section ref={ref} className="relative -mt-4 overflow-hidden px-6 pb-36 pt-20 md:px-12 md:pb-44">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[#000d09]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <FoldReveal>
          <motion.h2 style={{ y: headingY }} className="max-w-4xl font-display text-[2.8rem] leading-[0.95] tracking-[-0.03em] text-[#E8F5F0] md:text-[4.7rem]">Not all tastemakers move the same way.</motion.h2>
        </FoldReveal>
        <FoldReveal delay={0.08} className="mt-12">
          <motion.div style={{ y: tilesY }} className="grid gap-6 md:grid-cols-3">
            {trackItems.map((card) =>
              card.image ? (
                <TrackFlipCard
                  key={card.title}
                  card={card}
                />
              ) : (
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  key={card.title}
                  className="group relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#003328] to-[#001c16] p-7"
                >
                  <motion.p variants={{ rest: { y: 0 }, hover: { y: -18 } }} className="font-display text-4xl leading-[1] text-[#E8F5F0]">{card.title}</motion.p>
                  <motion.p variants={{ rest: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }} className="absolute bottom-8 left-7 max-w-[22ch] text-base text-[#dff2ec]/80">{card.copy}</motion.p>
                </motion.div>
              ),
            )}
          </motion.div>
        </FoldReveal>
      </div>
    </section>
  )
}
