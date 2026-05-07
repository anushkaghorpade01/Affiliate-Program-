import { type CSSProperties, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'
import { cn } from '@/lib/utils'

const socialProofItems = [
  { src: 'https://picsum.photos/seed/flent-collage-2/1600/1200', alt: 'Center-right hero moment', width: 1600, height: 1200, adjust: '300', size: 1.25 },
  { src: 'https://picsum.photos/seed/flent-collage-4/900/1400', alt: 'Far-right cropped portrait', width: 900, height: 1400, size: 0.75 },
    { src: 'https://picsum.photos/seed/flent-collage-1/1400/875', alt: 'Editorial moment one', width: 1400, height: 875, size: 1.25 },
    { src: 'https://picsum.photos/seed/flent-collage-3/900/1200', alt: 'Lower-left portrait', width: 900, height: 1200, size: 0.75  },  
  { src: 'https://picsum.photos/seed/flent-collage-5/1400/900', alt: 'Lower-center continuation', width: 1400, height: 900, size: 1.25 },
]
const socialProofColumnClasses = ['col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5']

type EditorialFrameProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
}

function EditorialFrame({ src, alt, width, height, className, style }: EditorialFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState('rotateX(0deg) rotateY(0deg) translateZ(0px)')

  return (
    <motion.div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        const rotateY = (x - 0.5) * 4.5
        const rotateX = (0.5 - y) * 4
        setTilt(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`)
      }}
      onMouseLeave={() => setTilt('rotateX(0deg) rotateY(0deg) translateZ(0px)')}
      style={{ transform: tilt, transformStyle: 'preserve-3d', ...style }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'group relative overflow-hidden shadow-[0_20px_55px_-24px_rgba(0,51,40,0.42)] [perspective:900px]',
        className
      )}
    >
      <img src={src} alt={alt} width={width} height={height} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_45%,rgba(0,0,0,0.14))] opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
    </motion.div>
  )
}

export function SocialProofWall() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 22, factor * -22])
  const grainY = useTransform(smooth, [0, 1], [factor * -12, factor * 12])
  const collageX = useTransform(smooth, [0, 1], ['0%', '-43%'])

  return (
    <section ref={ref} className="relative -mt-7 h-[300vh] rounded-t-[2.75rem] md:-mt-9 md:h-[340vh] md:rounded-t-[4.5rem]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[linear-gradient(165deg,#edf8f3_0%,#dff2ec_58%,#d8ebe5_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.38),transparent_36%)]" />
        <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-55" />

        <div className="relative mx-auto flex h-full w-[92vw] flex-col pb-8 pt-10 md:pb-12 md:pt-14">
          <FoldReveal>
            <h2 className="text-center font-display text-[2.45rem] leading-[0.95] tracking-[-0.03em] text-[#003328] md:text-[5.9rem]">
              The word on the street.
            </h2>
          </FoldReveal>
          <p className="mx-auto mt-3 max-w-[24rem] text-center text-sm leading-[1.2] text-[#003328]/84 md:mt-4 md:text-base">
            Reshares, reposts, tags, threads, mentions, moments.
          </p>

          <div className="relative mt-8 flex-1 overflow-visible md:mt-14">
            <motion.div style={{ x: collageX }} className="relative h-full w-[200vw] min-w-[74rem] md:w-[160vw]">
              <div className="grid h-full grid-cols-5 grid-rows-2 items-start gap-x-5 gap-y-4 md:gap-x-8 md:gap-y-6">
                {socialProofItems.map((item, index) => {
                  return (
                    <EditorialFrame
                      key={item.alt}
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className={cn(
                        'max-h-full w-full',
                        socialProofColumnClasses[index],
                        'row-start-1 self-start',
                      )}
                      style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    />
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
