import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'
import { cn } from '@/lib/utils'

const orbitPlaceholders = [
  { rotate: -14, arcY: 22, mobileArcY: 4 },
  { rotate: -7, arcY: 10, mobileArcY: 2 },
  { rotate: -2, arcY: -8, mobileArcY: -1 },
  { rotate: 1, arcY: -14, mobileArcY: -2 },
  { rotate: 8, arcY: -5, mobileArcY: -1 },
  { rotate: 12, arcY: 12, mobileArcY: 2 },
  { rotate: 14, arcY: 24, mobileArcY: 4 },
] as const

/** Brand logos per orbit slot. */
const orbitAssets: Partial<Record<number, { src: string; alt: string }>> = {
  0: { src: '/orbit/redstory.png', alt: 'Redstory' },
  1: { src: '/orbit/dyson.png', alt: 'Dyson' },
  2: { src: '/orbit/blue-tokai.png', alt: 'Blue Tokai Coffee Roasters' },
  3: { src: '/orbit/smeg.png', alt: 'Smeg' },
  4: { src: '/orbit/comet.png', alt: 'Comet' },
  5: { src: '/orbit/fig-living.png', alt: 'fig LIVING' },
  6: { src: '/orbit/partner-d.png', alt: 'Brand partner' },
}

export function RewardsOrbit() {
  const ref = useRef<HTMLElement>(null)
  const [isMobileOrbit, setIsMobileOrbit] = useState(false)
  const reduceMotion = useReducedMotion()
  const ambientMotion = !reduceMotion
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const introY = useTransform(smooth, [0, 1], [factor * 18, factor * -18])
  const orbitY = useTransform(smooth, [0, 1], [factor * 28, factor * -28])
  const unlockY = useTransform(smooth, [0, 1], [factor * 14, factor * -22])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobileOrbit(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate min-h-[92vh] overflow-hidden bg-[#000d09] px-[5vw] pb-[6vh] md:min-h-[96vh]',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,38,32,0.22)_0%,transparent_58%)]',
        'after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.48)_100%)] after:opacity-95',
      )}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />

      <FoldReveal className="absolute left-1/2 top-[min(14vh,8rem)] z-[1] w-full max-w-[min(720px,calc(100vw-10vw))] -translate-x-1/2 text-center md:max-w-[min(720px,50vw)]">
        <motion.div style={{ y: introY }}>
          <p className="text-[1.125rem] leading-[1.32] text-[#E8F5F0]/78 md:text-xl md:leading-[1.3]">
          The more Flent moves through your circles, the more your world opens up with it.
          </p>
        </motion.div>
      </FoldReveal>

      <FoldReveal
        delay={0.06}
        className="absolute left-1/2 top-[min(29vh,17rem)] z-[1] flex w-full max-w-[100vw] -translate-x-1/2 justify-center md:top-[min(27vh,16rem)] md:max-w-[min(1200px,84vw)]"
      >
        <motion.div
          style={{ y: orbitY }}
          className={cn(
            'relative flex w-full touch-pan-x justify-center pt-3 md:pt-0',
            'overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden',
          )}
        >
          <div className="flex min-w-[min(100%,780px)] items-end justify-center gap-0 px-0 md:min-w-0">
            {orbitPlaceholders.map((slot, idx) => {
              const asset = orbitAssets[idx]
              const arcY = isMobileOrbit ? slot.mobileArcY : slot.arcY
              return (
              <motion.div
                key={idx}
                className={cn(
                  'relative shrink-0 overflow-hidden rounded-[1.25rem] border border-[rgba(232,245,240,0.12)] bg-[rgba(232,245,240,0.03)]',
                  asset ? 'opacity-100' : 'opacity-[0.92]',
                  'w-[clamp(4.25rem,13.6vw,4.85rem)] md:w-[clamp(9.375rem,11vw,11.875rem)]',
                  'h-[clamp(5.8rem,17vw,6.45rem)] md:h-[clamp(11.875rem,22vh,14.375rem)]',
                  '-ml-3 first:ml-0 md:-ml-7',
                )}
                initial={false}
                animate={
                  ambientMotion
                    ? {
                        y: [arcY, arcY - (isMobileOrbit ? 1.5 : 3), arcY + (isMobileOrbit ? 1.5 : 2), arcY],
                        rotate: [slot.rotate - 0.35, slot.rotate + 0.35, slot.rotate],
                      }
                    : {
                        y: arcY,
                        rotate: slot.rotate,
                      }
                }
                transition={
                  ambientMotion
                    ? {
                        duration: 11 + idx * 0.65,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : { duration: 0 }
                }
                whileHover={
                  ambientMotion
                    ? {
                        y: arcY - 6,
                        opacity: 1,
                        boxShadow: '0 0 48px rgba(232,245,240,0.07)',
                        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                      }
                    : undefined
                }
                aria-hidden={!asset}
              >
                {asset ? (
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    width={480}
                    height={480}
                    className="pointer-events-none h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </motion.div>
              )
            })}
          </div>
        </motion.div>
      </FoldReveal>

      <FoldReveal
        delay={0.1}
        className="absolute left-1/2 top-[min(52vh,27rem)] z-[1] w-full max-w-[min(720px,92vw)] -translate-x-1/2 pt-[min(6vh,2.75rem)] text-center md:top-[52vh] md:pt-[min(5vh,2.5rem)]"
      >
        <motion.div style={{ y: unlockY }}>
          <h2 className="font-sans text-[1.45rem] font-medium leading-none tracking-[0.06em] text-[#E8F5F0] md:text-[clamp(1.625rem,2.55vw,2.2rem)] md:tracking-[0.05em]">
            What showing up unlocks.
          </h2>
          <p className="mx-auto mt-[min(3.8vh,1.75rem)] max-w-md text-[1.125rem] leading-[1.18] text-[#E8F5F0]/90 md:mt-[min(6.5vh,2.75rem)] md:text-[1.375rem] md:leading-[1.15]">
            Full Catalog
            <br />
            Unlocks on joining
          </p>
        </motion.div>
      </FoldReveal>
    </section>
  )
}
