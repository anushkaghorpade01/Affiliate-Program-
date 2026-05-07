import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'
import { cn } from '@/lib/utils'

type EditorialFrameProps = {
  src: string
  alt: string
  className?: string
}

function EditorialFrame({ src, alt, className }: EditorialFrameProps) {
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
      style={{ transform: tilt, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('group absolute overflow-hidden [perspective:900px]', className)}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_45%,rgba(0,0,0,0.14))] opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
    </motion.div>
  )
}

export function SocialProofWall() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 22, factor * -22])
  const grainY = useTransform(smooth, [0, 1], [factor * -12, factor * 12])

  return (
    <section ref={ref} className="relative -mt-7 overflow-hidden rounded-t-[2.75rem] bg-[#dff2ec] md:-mt-9 md:rounded-t-[4.5rem]">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[linear-gradient(165deg,#edf8f3_0%,#dff2ec_58%,#d8ebe5_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.38),transparent_36%)]" />
      <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-55" />

      <div className="relative mx-auto w-[92vw] pb-8 pt-10 md:pb-12 md:pt-14">
        <FoldReveal>
          <h2 className="text-center font-display text-[2.45rem] leading-[0.95] tracking-[-0.03em] text-[#003328] md:text-[5.9rem]">
            The word on the street.
          </h2>
        </FoldReveal>

        <div className="relative mt-8 h-[58rem] md:mt-14 md:h-[58vw] md:min-h-[52rem]">
          <EditorialFrame
            src="https://picsum.photos/seed/flent-collage-1/1400/875"
            alt="Editorial moment one"
            className="left-[1%] top-[6%] h-[11.5rem] w-[70vw] md:h-auto md:w-[32vw] md:aspect-[16/10]"
          />

          <motion.div
            whileHover={{ y: -3 }}
            className="absolute left-[57%] top-[1%] w-[37vw] text-[#003328]/84 md:left-[63%] md:top-[6%] md:w-[15vw]"
          >
            <p className="text-sm leading-[1.2] md:text-[1.5vw] md:leading-[1.18]">
              Reshares, reposts,
              tags, threads,
              mentions, moments.
            </p>
          </motion.div>

          <EditorialFrame
            src="https://picsum.photos/seed/flent-collage-2/1600/1200"
            alt="Center-right hero moment"
            className="left-[26%] top-[31%] h-[14.5rem] w-[62vw] md:left-[43%] md:top-[24%] md:h-auto md:w-[36vw] md:aspect-[4/3]"
          />

          <EditorialFrame
            src="https://picsum.photos/seed/flent-collage-3/900/1200"
            alt="Lower-left portrait"
            className="left-[0%] top-[57%] h-[13.5rem] w-[29vw] md:left-[0.5%] md:top-[61%] md:h-auto md:w-[14vw] md:aspect-[3/4]"
          />

          <EditorialFrame
            src="https://picsum.photos/seed/flent-collage-4/900/1400"
            alt="Far-right cropped portrait"
            className="right-[-20%] top-[45%] h-[16.5rem] w-[27vw] md:right-[-6.5vw] md:top-[37%] md:h-auto md:w-[12vw] md:aspect-[3/4]"
          />

          <EditorialFrame
            src="https://picsum.photos/seed/flent-collage-5/1400/900"
            alt="Lower-center continuation"
            className="left-[32%] top-[86%] h-[11rem] w-[46vw] md:left-[27%] md:top-[89%] md:h-auto md:w-[34vw] md:aspect-[16/10]"
          />
        </div>
      </div>
    </section>
  )
}
