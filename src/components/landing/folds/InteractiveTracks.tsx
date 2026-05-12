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
  const [isMobileTrack, setIsMobileTrack] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  const isTouchFlipEnabled = useTouchFlipEnabled()
  const isInView = useInView(ref, { amount: 0.62, margin: '-12% 0px -12% 0px' })
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobileTrack(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (!card.image) return null

  if (isMobileTrack) {
    return (
      <div
        ref={ref}
        className="relative h-[17rem] w-full overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_14px_44px_-22px_rgba(0,0,0,0.55)]"
      >
        <img
          src={card.image.src}
          alt={card.image.alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Soft veil: photo stays visible but muted for readable type */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[#000d09]/[0.38]"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/78 via-black/28 to-transparent p-5 pt-12">
          <p className="font-display text-[1.35rem] leading-[0.98] tracking-[-0.02em] text-[#E8F5F0]">
            {card.title}
          </p>
          <p className="mt-2.5 max-w-[28ch] text-[0.8125rem] leading-[1.22] text-[#E8F5F0]/86">{card.copy}</p>
        </div>
      </div>
    )
  }

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
      className="h-[21rem] w-full rounded-[1.75rem] outline-none [perspective:1200px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 58, damping: 20, mass: 0.95 }}
        className="relative h-full w-full rounded-[1.75rem] will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src={card.image.src}
          alt={card.image.alt}
          className="absolute inset-0 h-full w-full rounded-[1.75rem] object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 flex rounded-[1.75rem] bg-white p-7 text-black [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0)]">
          <div className="mt-auto max-w-[24ch]">
            <p className="font-display text-[1.75rem] leading-[1.05]">{card.title}</p>
            <p className="mt-4 text-[0.9375rem] leading-[1.15] text-black/72">
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
    <section ref={ref} className="relative -mt-4 overflow-hidden px-6 pb-[calc(9rem-84px)] pt-16 md:px-12 md:pb-32 md:pt-20">
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
          <motion.div style={{ y: tilesY }} className="grid gap-6 md:grid-cols-3 md:gap-5">
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
                  className="group relative h-[17rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-b from-[#003328] to-[#001c16] p-6 md:h-[21rem] md:rounded-[1.75rem] md:p-6"
                >
                  <motion.p variants={{ rest: { y: 0 }, hover: { y: -18 } }} className="font-display text-3xl leading-[1] text-[#E8F5F0] md:text-[2rem] md:leading-[1.02]">{card.title}</motion.p>
                  <motion.p variants={{ rest: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }} className="absolute bottom-6 left-6 max-w-[22ch] text-sm text-[#dff2ec]/80 md:bottom-7 md:left-6 md:text-[0.9375rem]">{card.copy}</motion.p>
                </motion.div>
              ),
            )}
          </motion.div>
        </FoldReveal>
      </div>
    </section>
  )
}
