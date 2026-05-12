import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/** Paired with hero logo row (`HeroSection` uses `h-9` = 36px). */
const RIBBON_H = 36
const CLOSED_W = RIBBON_H
/** Toggle + divider + three compact icon hits + padding */
const OPEN_W = 138

const ICON_REVEAL_DELAY_MS = 300
const ICON_HIDE_COLLAPSE_MS = 220
const ICON_STAGGER_S = 0.052

/** Tabler Icons `share` (MIT) — outline; same treatment as `WhatsAppOutlineIcon` */
function ShareGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#ffffff]/88', className)}
      aria-hidden
    >
      <path
        d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 10.7l6.6 -3.4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 13.3l6.6 3.4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Tabler Icons `brand-whatsapp` (MIT) — outline, scaled via parent `className` */
function WhatsAppOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#ffffff]/88', className)}
      aria-hidden
    >
      <path
        d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Minimal × — close affordance only (not the X.com brand mark). */
function CloseMenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#ffffff]/88', className)}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  )
}

/** Tabler Icons `brand-x` (MIT) — X / Twitter mark; same treatment as `WhatsAppOutlineIcon` */
function TwitterXOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#ffffff]/88', className)}
      aria-hidden
    >
      <path
        d="M4 4l11.733 16h4.267l-11.733 -16z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Tabler Icons `copy` (MIT) — overlapping rounded rects; same treatment as `WhatsAppOutlineIcon` */
function CopyOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#ffffff]/88', className)}
      aria-hidden
    >
      <path
        d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckThinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5.5 12.5 10 17 18.5 6.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ribbonSurface =
  'relative overflow-hidden rounded-full border border-[#ebe6dc]/[0.07] bg-[rgba(0,11,9,0.16)] shadow-[0_2px_16px_rgba(0,0,0,0.045)] backdrop-blur-[9px] backdrop-saturate-[1.08] ring-1 ring-[#f4f1ea]/[0.035]'

const iconHit =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#ebe6dc]/34 outline-none transition-[color,opacity,background-color,transform] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[rgba(223,242,236,0.04)] hover:text-[#d8cfc0]/78 hover:opacity-100 focus-visible:ring-1 focus-visible:ring-[#ebe6dc]/14 active:scale-[0.98]'

export function HeroMobileShare({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const [iconsVisible, setIconsVisible] = useState(false)
  const [copyPhase, setCopyPhase] = useState<'idle' | 'copied'>('idle')
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const clearTimers = useCallback(() => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current)
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current)
    revealTimerRef.current = null
    collapseTimerRef.current = null
  }, [])

  const collapseRibbon = useCallback(() => {
    clearTimers()
    setIconsVisible(false)
    const ms = reduceMotion ? 0 : ICON_HIDE_COLLAPSE_MS
    collapseTimerRef.current = setTimeout(() => {
      setExpanded(false)
      setCopyPhase('idle')
      collapseTimerRef.current = null
    }, ms)
  }, [clearTimers, reduceMotion])

  const expandRibbon = useCallback(() => {
    clearTimers()
    setExpanded(true)
    const ms = reduceMotion ? 0 : ICON_REVEAL_DELAY_MS
    revealTimerRef.current = setTimeout(() => {
      setIconsVisible(true)
      revealTimerRef.current = null
    }, ms)
  }, [clearTimers, reduceMotion])

  useEffect(() => () => clearTimers(), [clearTimers])

  useEffect(() => {
    if (!expanded) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) collapseRibbon()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [expanded, collapseRibbon])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') collapseRibbon()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded, collapseRibbon])

  const toggleAnchor = () => {
    if (expanded) collapseRibbon()
    else expandRibbon()
  }

  const wa = () => {
    const text = encodeURIComponent(shareUrl)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
    collapseRibbon()
  }

  const xShare = () => {
    const u = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?url=${u}`, '_blank', 'noopener,noreferrer')
    collapseRibbon()
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyPhase('copied')
      window.setTimeout(() => setCopyPhase('idle'), 2000)
    } catch {
      collapseRibbon()
    }
  }

  const morphEase = reduceMotion ? { duration: 0.12 } : { duration: 0.42, ease: EASE }

  const widthTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: expanded ? 0.56 : 0.48, ease: EASE }

  const iconMotion = (index: number) => {
    if (reduceMotion) {
      return {
        opacity: iconsVisible ? 1 : 0,
        x: 0,
        transition: { duration: 0.12 },
      }
    }
    if (!iconsVisible) {
      return {
        opacity: 0,
        x: 8,
        transition: { duration: 0.18, ease: EASE },
      }
    }
    return {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.46,
        delay: 0.08 + index * ICON_STAGGER_S,
        ease: EASE,
      },
    }
  }

  return (
    <div className={cn('pointer-events-auto relative z-[45] flex items-center', className)}>
      <motion.div
        ref={rootRef}
        role={expanded ? 'dialog' : undefined}
        aria-label={expanded ? 'Share via' : undefined}
        initial={false}
        animate={{
          width: expanded ? OPEN_W : CLOSED_W,
          height: RIBBON_H,
        }}
        transition={widthTransition}
        className={cn(ribbonSurface, 'flex items-stretch')}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(165deg,rgba(223,242,236,0.05)_0%,transparent_46%,rgba(0,0,0,0.06)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_1px_rgba(244,241,234,0.04)]"
          aria-hidden
        />

        <button
          type="button"
          aria-expanded={expanded}
          aria-haspopup="dialog"
          aria-label={expanded ? 'Close share menu' : 'Share this page'}
          onClick={toggleAnchor}
          className={cn(
            'relative z-[1] flex h-full w-9 shrink-0 items-center justify-center rounded-full text-[#ebe6dc]/48 outline-none transition-[color,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#ebe6dc]/72 focus-visible:ring-1 focus-visible:ring-[#ebe6dc]/18',
            !expanded && 'hover:scale-[1.03] active:scale-[1]',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.span
                key="close"
                role="presentation"
                initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
                transition={morphEase}
                className="flex items-center justify-center"
              >
                <CloseMenuIcon className="h-[13px] w-[13px]" />
              </motion.span>
            ) : (
              <motion.span
                key="share"
                role="presentation"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={morphEase}
                className="flex items-center justify-center"
              >
                <ShareGlyph className="h-[13px] w-[13px]" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div
          className={cn(
            'relative z-[1] flex min-w-0 flex-1 items-center',
            expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          aria-hidden={!expanded}
        >
          <div
            className="mx-1 h-4 w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(235,230,220,0.14),transparent)]"
            aria-hidden
          />

          <div className="flex flex-1 items-center justify-end gap-0.5 pr-1.5">
            <motion.button
              type="button"
              aria-label="Share on WhatsApp"
              onClick={wa}
              animate={iconMotion(0)}
              className={iconHit}
            >
              <WhatsAppOutlineIcon className="pointer-events-none h-[12px] w-[12px]" />
            </motion.button>

            <motion.button
              type="button"
              aria-label="Share on X"
              onClick={xShare}
              animate={iconMotion(1)}
              className={iconHit}
            >
              <TwitterXOutlineIcon className="pointer-events-none h-[12px] w-[12px]" />
            </motion.button>

            <motion.button
              type="button"
              aria-label={copyPhase === 'copied' ? 'Link copied' : 'Copy link'}
              onClick={copy}
              animate={iconMotion(2)}
              className={cn(
                iconHit,
                copyPhase === 'copied' && 'text-[#d4c4a8]/55 hover:text-[#d8cca8]/72',
              )}
            >
              <span className="sr-only" aria-live="polite">
                {copyPhase === 'copied' ? 'Copied' : ''}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                {copyPhase === 'idle' ? (
                  <motion.span
                    key="link"
                    role="presentation"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={morphEase}
                    className="pointer-events-none flex items-center justify-center"
                  >
                    <CopyOutlineIcon className="pointer-events-none h-[12px] w-[12px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copied"
                    role="presentation"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={morphEase}
                    className="pointer-events-none flex items-center justify-center"
                  >
                    <CheckThinIcon className="h-[12px] w-[12px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
