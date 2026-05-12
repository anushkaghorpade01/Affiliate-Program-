import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'
import { cn } from '@/lib/utils'

/** Desktop: arcY / rotate via flex row + overlap. */
const orbitPlaceholders = [
  { rotate: -14, arcY: 22 },
  { rotate: -7, arcY: 10 },
  { rotate: -2, arcY: -8 },
  { rotate: 1, arcY: -14 },
  { rotate: 8, arcY: -5 },
  { rotate: 12, arcY: 12 },
  { rotate: 14, arcY: 24 },
] as const

/**
 * Mobile-only: premium editorial stack — matches reference arc & fan (Dyson omitted).
 * Order: Redstory → Comet → SMEG → fig → Blue Tokai (outer wings swapped).
 * Z: Redstory < Comet < SMEG > fig > Tokai. Vertical: wings low, inner pair level, hero apex.
 */
const MOBILE_ORBIT_COMPOSITION = [
  {
    assetIndex: 0,
    left: '17.5%',
    topPct: 51.05,
    width: 'clamp(5.8rem, 28.5vw, 8.72rem)',
    arcY: 5,
    rotate: -12,
    scale: 0.88,
    z: 11,
    opacity: 1,
    blurPx: 0,
  },
  {
    assetIndex: 4,
    left: '33%',
    topPct: 45.55,
    width: 'clamp(5.85rem, 28.5vw, 8.75rem)',
    arcY: 2,
    rotate: -6,
    scale: 0.92,
    z: 23,
    opacity: 1,
    blurPx: 0,
  },
  {
    assetIndex: 3,
    left: '50%',
    topPct: 39.85,
    width: 'clamp(6.38rem, 30vw, 9.32rem)',
    arcY: -6,
    rotate: -1.25,
    scale: 1,
    z: 56,
    opacity: 1,
    blurPx: 0,
  },
  {
    assetIndex: 5,
    left: '66.5%',
    topPct: 45.6,
    width: 'clamp(5.85rem, 28.5vw, 8.75rem)',
    arcY: 2,
    rotate: 6,
    scale: 0.92,
    z: 34,
    opacity: 1,
    blurPx: 0,
  },
  {
    assetIndex: 2,
    left: '82%',
    topPct: 51,
    width: 'clamp(5.8rem, 28.5vw, 8.72rem)',
    arcY: 5,
    rotate: 12,
    scale: 0.88,
    z: 14,
    opacity: 1,
    blurPx: 0,
  },
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
  const [isMobileOrbit, setIsMobileOrbit] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
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
        'relative isolate bg-[#000d09] px-[5vw] pb-[4vh] max-md:min-h-[calc(94vh-92px)] max-md:overflow-visible max-md:pb-[max(1.5rem,calc(max(3.25vh,1.125rem)-76px))] md:min-h-[calc(96vh-180px)] md:overflow-hidden md:pb-[max(1.25rem,calc(6vh-180px))]',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,38,32,0.22)_0%,transparent_58%)]',
        'after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.48)_100%)] after:opacity-95',
      )}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />

      <FoldReveal className="absolute left-1/2 top-[min(11vh,6rem)] z-[1] w-full max-w-[min(720px,calc(100vw-10vw))] -translate-x-1/2 text-center max-md:top-[min(calc(8vh-10px),calc(5.25rem-10px))] max-md:z-[60] md:top-[min(11.5vh,6.75rem)] md:max-w-[min(720px,50vw)]">
        <motion.div style={{ y: introY }}>
          <p className="text-[1.125rem] leading-[1.32] text-[#E8F5F0]/78 md:text-xl md:leading-[1.3]">
            The more Flent moves through your circles, the more your world opens up with it.
          </p>
        </motion.div>
      </FoldReveal>

      <FoldReveal
        delay={0.06}
        className="absolute left-1/2 top-[min(23vh,12.5rem)] z-[1] flex w-full max-w-[100vw] -translate-x-1/2 justify-center max-md:top-[min(calc(26vh-36px),calc(13.75rem-36px))] max-md:z-10 max-md:w-screen max-md:max-w-none md:top-[min(27vh,16rem)] md:max-w-[min(1200px,84vw)]"
      >
        <motion.div
          style={{ y: orbitY }}
          className={cn(
            'relative w-full justify-center pt-2 md:flex md:pt-0',
            'max-md:h-[clamp(268px,50vmin,388px)] max-md:overflow-visible max-md:pb-[max(0px,calc(min(7vh,2.75rem)-12px))] max-md:pt-[max(0px,calc(min(1vh,0.5rem)-4px))]',
            'overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:h-auto md:overflow-visible md:pb-0 md:pt-0 [&::-webkit-scrollbar]:hidden',
          )}
        >
          <div
            className={cn(
              'relative w-full gap-0 px-0',
              'max-md:mx-auto max-md:min-h-[clamp(268px,50vmin,388px)] max-md:min-w-0 max-md:w-full',
              'flex min-w-0 items-end justify-center md:flex md:min-w-0',
            )}
          >
            {isMobileOrbit
              ? MOBILE_ORBIT_COMPOSITION.map((slot, compositionIdx) => {
                  const asset = orbitAssets[slot.assetIndex]
                  const baseRotate = slot.rotate
                  const rotateWobble = Math.abs(baseRotate) < 2 ? 0.035 : 0.07
                  const arcY = slot.arcY

                  const wrapperStyle: CSSProperties = {
                    left: slot.left,
                    top: `${slot.topPct}%`,
                    zIndex: slot.z,
                    width: slot.width,
                    transform: 'translate(-50%, -50%)',
                  }

                  return (
                    <div
                      key={`orbit-mobile-${slot.assetIndex}-${compositionIdx}`}
                      className={cn('max-md:absolute', 'md:contents')}
                      style={wrapperStyle}
                    >
                      <motion.div
                        className={cn(
                          'shrink-0 overflow-hidden rounded-[1.25rem] border border-[rgba(232,245,240,0.12)] bg-[rgba(232,245,240,0.03)]',
                          asset ? 'opacity-100' : 'opacity-[0.92]',
                          'max-md:h-full max-md:w-full max-md:shadow-[0_22px_52px_-20px_rgba(0,0,0,0.82)]',
                          'max-md:aspect-square md:relative',
                          'md:aspect-auto md:w-[clamp(9.375rem,11vw,11.875rem)]',
                          'md:h-[clamp(11.875rem,22vh,14.375rem)]',
                          'md:-ml-7 md:shadow-none md:first:ml-0',
                          'md:z-auto',
                        )}
                        style={{
                          opacity: slot.opacity,
                          filter: slot.blurPx > 0 ? `blur(${slot.blurPx}px)` : undefined,
                        }}
                        initial={false}
                        animate={
                          ambientMotion
                            ? {
                                y: [arcY, arcY - 2, arcY + 1.5, arcY],
                                rotate: [
                                  baseRotate - rotateWobble,
                                  baseRotate + rotateWobble,
                                  baseRotate,
                                ],
                                scale: [
                                  slot.scale - 0.008,
                                  slot.scale + 0.008,
                                  slot.scale,
                                ],
                              }
                            : {
                                y: arcY,
                                rotate: baseRotate,
                                scale: slot.scale,
                              }
                        }
                        transition={
                          ambientMotion
                            ? {
                                duration: 12 + compositionIdx * 0.55,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                            : { duration: 0 }
                        }
                        whileHover={
                          ambientMotion
                            ? {
                                y: arcY - 4,
                                opacity: 1,
                                filter: 'blur(0px)',
                                scale: slot.scale * 1.02,
                                boxShadow: '0 0 56px rgba(232,245,240,0.08)',
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
                    </div>
                  )
                })
              : [...orbitPlaceholders].map((slot, idx) => {
                  const asset = orbitAssets[idx]
                  const arcY = slot.arcY
                  const baseRotate = slot.rotate
                  const rotateWobble = 0.35
                  return (
                    <div key={`orbit-${idx}`} className="md:contents">
                      <motion.div
                        className={cn(
                          'shrink-0 overflow-hidden rounded-[1.25rem] border border-[rgba(232,245,240,0.12)] bg-[rgba(232,245,240,0.03)]',
                          asset ? 'opacity-100' : 'opacity-[0.92]',
                          'relative aspect-auto h-[clamp(11.875rem,22vh,14.375rem)] w-[clamp(9.375rem,11vw,11.875rem)]',
                          '-ml-7 shadow-none first:ml-0',
                        )}
                        initial={false}
                        animate={
                          ambientMotion
                            ? {
                                y: [arcY, arcY - 3, arcY + 2, arcY],
                                rotate: [
                                  baseRotate - rotateWobble,
                                  baseRotate + rotateWobble,
                                  baseRotate,
                                ],
                              }
                            : {
                                y: arcY,
                                rotate: baseRotate,
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
                    </div>
                  )
                })}
          </div>
        </motion.div>
      </FoldReveal>

      <FoldReveal
        delay={0.1}
        className="absolute left-1/2 top-[min(42vh,21.5rem)] z-[1] w-full max-w-[min(720px,92vw)] -translate-x-1/2 pt-[min(3.25vh,1.25rem)] text-center max-md:top-[min(calc(62vh-30px),calc(31.5rem-30px))] max-md:z-[60] max-md:pt-[max(0px,calc(min(4vh,1.6rem)-10px))] md:top-[52vh] md:pt-[min(5vh,2.5rem)]"
      >
        <motion.div style={{ y: unlockY }}>
          <h2 className="font-display text-[1.45rem] font-normal leading-none tracking-[-0.02em] text-[#E8F5F0] md:text-[clamp(1.625rem,2.55vw,2.2rem)] md:tracking-[-0.025em]">
            What showing up unlocks.
          </h2>
          <p className="mx-auto mt-[min(3vh,1.35rem)] max-w-md font-sans text-[1.125rem] leading-[1.18] text-[#E8F5F0]/90 md:mt-[min(6.5vh,2.75rem)] md:text-[1.375rem] md:leading-[1.15]">
            Full Catalog
            <br />
            Unlocks on joining
          </p>
        </motion.div>
      </FoldReveal>
    </section>
  )
}
