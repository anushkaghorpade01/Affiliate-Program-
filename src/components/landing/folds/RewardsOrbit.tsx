import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { cn } from '@/lib/utils'

const orbitPlaceholders = [
  { rotate: -14, arcY: 22 },
  { rotate: -7, arcY: 10 },
  { rotate: -2, arcY: -8 },
  { rotate: 1, arcY: -14 },
  { rotate: 8, arcY: -5 },
  { rotate: 12, arcY: 12 },
  { rotate: 14, arcY: 24 },
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
  const reduceMotion = useReducedMotion()
  const ambientMotion = !reduceMotion

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate min-h-[128vh] overflow-hidden bg-[#000d09] px-[5vw] pb-[10vh] md:min-h-[130vh]',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,38,32,0.22)_0%,transparent_58%)]',
        'after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.48)_100%)] after:opacity-95',
      )}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />

      <FoldReveal className="absolute left-1/2 top-[min(9vh,5.25rem)] z-[1] w-full max-w-[min(720px,calc(100vw-10vw))] -translate-x-1/2 text-center md:max-w-[min(720px,50vw)]">
        <p className="text-[1.125rem] leading-[1.32] text-[#E8F5F0]/78 md:text-xl md:leading-[1.3]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
      </FoldReveal>

      <FoldReveal
        delay={0.06}
        className="absolute left-1/2 top-[min(19vh,11rem)] z-[1] flex w-full max-w-[min(1200px,84vw)] -translate-x-1/2 justify-center md:top-[min(22vh,13rem)]"
      >
        <div
          className={cn(
            'relative flex w-full touch-pan-x justify-center',
            'overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden',
          )}
        >
          <div className="flex min-w-[min(100%,780px)] items-end justify-center gap-0 px-1 md:min-w-0 md:px-0">
            {orbitPlaceholders.map((slot, idx) => {
              const asset = orbitAssets[idx]
              return (
              <motion.div
                key={idx}
                className={cn(
                  'relative shrink-0 overflow-hidden rounded-[1.25rem] border border-[rgba(232,245,240,0.12)] bg-[rgba(232,245,240,0.03)]',
                  asset ? 'opacity-100' : 'opacity-[0.92]',
                  'w-[clamp(9.25rem,24vw,11.75rem)] md:w-[clamp(9.375rem,11vw,11.875rem)]',
                  'h-[clamp(11.5rem,28vw,14.25rem)] md:h-[clamp(11.875rem,22vh,14.375rem)]',
                  '-ml-5 first:ml-0 md:-ml-7',
                )}
                initial={false}
                animate={
                  ambientMotion
                    ? {
                        y: [slot.arcY, slot.arcY - 5, slot.arcY + 3, slot.arcY],
                        rotate: [slot.rotate - 0.35, slot.rotate + 0.35, slot.rotate],
                      }
                    : {
                        y: slot.arcY,
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
                        y: slot.arcY - 9,
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
        </div>
      </FoldReveal>

      <FoldReveal
        delay={0.1}
        className="absolute left-1/2 top-[min(52vh,27rem)] z-[1] w-full max-w-[min(720px,92vw)] -translate-x-1/2 pt-[min(6vh,2.75rem)] text-center md:top-[47vh] md:pt-[min(5vh,2.5rem)]"
      >
        <h2 className="font-sans text-[1.75rem] font-medium leading-none tracking-[0.06em] text-[#E8F5F0] md:text-[clamp(1.75rem,2.8vw,2.375rem)] md:tracking-[0.05em]">
          What showing up unlocks.
        </h2>
        <p className="mx-auto mt-[min(6.5vh,2.75rem)] max-w-md text-[1.125rem] leading-[1.18] text-[#E8F5F0]/90 md:text-[1.375rem] md:leading-[1.15]">
          Full Catalog
          <br />
          Unlocks on joining
        </p>
      </FoldReveal>

      <FoldReveal
        delay={0.14}
        className="absolute left-[max(1rem,5vw)] top-[min(72vh,36rem)] z-[1] md:top-[76vh]"
      >
        <p className="max-w-[min(92vw,26ch)] font-display text-[clamp(3.25rem,11vw,9.375rem)] font-normal leading-[0.94] tracking-[-0.03em] text-[#E8F5F0]">
          Lorem ipsum dolor.
        </p>
      </FoldReveal>
    </section>
  )
}
