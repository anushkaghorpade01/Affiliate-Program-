import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'

const NEXT_SECTION_ID = 'tastemakers-wall'

function scrollProgressToFade(v: number) {
  if (v < 0.22) return 0
  if (v > 0.3) return 1
  return (v - 0.22) / 0.08
}

type Props = {
  cinematicSectionRef: RefObject<HTMLElement | null>
}

export function StartApplicationFloatingCta({ cinematicSectionRef }: Props) {
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()
  const [nextInView, setNextInView] = useState(false)
  const [cinematicInView, setCinematicInView] = useState(false)
  const [scrollFade, setScrollFade] = useState(0)

  const { scrollYProgress } = useScroll({
    target: cinematicSectionRef,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)

  useLayoutEffect(() => {
    setScrollFade(scrollProgressToFade(smooth.get()))
  }, [smooth])

  useMotionValueEvent(smooth, 'change', (v) => {
    setScrollFade(scrollProgressToFade(v))
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const cinematicEl = cinematicSectionRef.current
    if (!cinematicEl) return

    const ioCinematic = new IntersectionObserver(([e]) => setCinematicInView(e.isIntersecting), {
      threshold: 0,
      rootMargin: '0px',
    })
    ioCinematic.observe(cinematicEl)

    const nextEl = document.getElementById(NEXT_SECTION_ID)
    let ioNext: IntersectionObserver | undefined
    if (nextEl) {
      ioNext = new IntersectionObserver(([e]) => setNextInView(e.isIntersecting), {
        threshold: 0,
        rootMargin: '0px',
      })
      ioNext.observe(nextEl)
    }

    return () => {
      ioCinematic.disconnect()
      ioNext?.disconnect()
    }
  }, [cinematicSectionRef, mounted])

  const targetOpacity = cinematicInView && !nextInView ? scrollFade : 0

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!mounted) return null

  return createPortal(
    <motion.a
      href="#apply"
      onClick={handleClick}
      initial={false}
      animate={{ opacity: targetOpacity }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={targetOpacity > 0.04 ? 0 : -1}
      className="fixed bottom-8 right-6 z-[100] flex cursor-pointer items-baseline gap-[0.35em] font-display text-sm font-light tracking-[0.16em] text-[#f4f1ea]/[0.7] outline-none transition-colors duration-300 [text-shadow:0_0_26px_rgba(244,241,234,0.07)] hover:text-[#f4f1ea]/90 focus-visible:text-[#f4f1ea]/88 focus-visible:ring-1 focus-visible:ring-[#f4f1ea]/25 md:bottom-12 md:right-12 md:text-[0.9375rem]"
      style={{
        pointerEvents: targetOpacity > 0.04 ? 'auto' : 'none',
      }}
      aria-label="Start application — scroll to form"
    >
      <span>Start application</span>
      {reduceMotion ? (
        <span aria-hidden className="inline-block font-light leading-none">
          ↓
        </span>
      ) : (
        <motion.span
          aria-hidden
          className="inline-block font-light leading-none"
          animate={{ y: [0, 2.5, 0] }}
          transition={{
            duration: 2.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ↓
        </motion.span>
      )}
    </motion.a>,
    document.body,
  )
}
