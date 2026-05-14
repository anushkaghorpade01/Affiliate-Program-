import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { PRINCIPAL_HEADLINE_CLASSNAME } from '@/components/landing/principalHeadlineClassName'
import {
  PRINCIPAL_HEADLINE_MOBILE_TOP_INSET,
  PRINCIPAL_SUPPORT_MOBILE_COMBINED,
} from '@/components/landing/principalSupportingMobileTypography'
import {
  cinematicScrollSpring,
  cinematicScrollSpringMobile,
} from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'
import { cn } from '@/lib/utils'

/**
 * Horizontal scroll gallery. See `/guide.md` for the full system.
 *
 * - Gallery is a 20×20 grid; place each image with `col` / `row` ranges.
 * - Range end is exclusive (CSS grid line semantics): `[2, 8]` spans cols 2..7.
 * - Images must not overlap and should leave ≥1 empty track between edges.
 *
 * Flip `DEBUG_GRID` to `true` to overlay the 400 cells with `col,row` labels
 * (per the guide's "Debug Mode") for picking placements, then flip back.
 */
const GRID_COLUMNS = 20
const MOBILE_GRID_COLUMNS = 28
const GRID_ROWS = 20
const DEBUG_GRID = false

const GRID_TEMPLATE_STYLE = {
  gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
} satisfies CSSProperties

const GRID_COLUMN_CLASSES = `[grid-template-columns:repeat(${MOBILE_GRID_COLUMNS},minmax(0,1fr))] md:[grid-template-columns:repeat(${GRID_COLUMNS},minmax(0,1fr))]`

const GRID_GAP_CLASSES = 'gap-x-1.5 gap-y-1.5 md:gap-x-3 md:gap-y-3'

type GridRange = readonly [start: number, end: number]

type GalleryItem = {
  src: string
  alt: string
  width: number
  height: number
  col: GridRange
  row: GridRange
  mobileCol: GridRange
  mobileRow: GridRange
  href?: string
}

const galleryItems: GalleryItem[] = [
  {
    src: '/social-proof/deepankar-tweet.png',
    alt: 'Social post about a house in Indiranagar',
    width: 1024,
    height: 806,
    col: [2, 6],
    row: [2, 15],
    mobileCol: [2, 13],
    mobileRow: [3, 11],
  },
  {
    src: '/social-proof/flent-postcard.png',
    alt: 'Flent postcard held in hand',
    width: 1024,
    height: 683,
    col: [7, 9],
    row: [5, 21],
    mobileCol: [9, 20],
    mobileRow: [12, 20],
    href: 'https://www.instagram.com/p/DVizDjukR3s/',
  },
  {
    src: '/social-proof/striver-reply.png',
    alt: 'Social reply recommending Flent homes',
    width: 1024,
    height: 600,
    col: [10, 14],
    row: [1, 13],
    mobileCol: [13, 22],
    mobileRow: [2, 9],
  },
  {
    src: '/social-proof/fairmont-card.png',
    alt: 'Creator holding a Fairmont listing card',
    width: 1024,
    height: 576,
    col: [15, 17],
    row: [8, 21],
    mobileCol: [18, 29],
    mobileRow: [14, 22],
    href: 'https://www.instagram.com/reel/DXlc4OGkqdy/?igsh=MXBwYnBnaWllYzVpeA==',
  },
  {
    src: '/social-proof/flent-tote.png',
    alt: 'Flent tote bag held indoors',
    width: 1024,
    height: 576,
    col: [18, 21],
    row: [4, 13],
    mobileCol: [23, 29],
    mobileRow: [4, 12],
  },
]

type EditorialFrameProps = {
  src: string
  alt: string
  width?: number
  height?: number
  href?: string
  className?: string
  style?: CSSProperties
}

type GalleryPlacementStyle = CSSProperties & {
  '--mobile-col': string
  '--mobile-row': string
  '--desktop-col': string
  '--desktop-row': string
}

/**
 * Debug overlay — renders every cell of the 20×20 grid with its `col,row`
 * coordinate. Sits inside the panning container so it tracks the gallery.
 */
function GridDebugOverlay() {
  const cells: ReactNode[] = []
  for (let row = 1; row <= GRID_ROWS; row++) {
    for (let col = 1; col <= GRID_COLUMNS; col++) {
      cells.push(
        <div
          key={`${col},${row}`}
          style={{ gridColumn: col, gridRow: row }}
          className={cn(
            'flex items-center justify-center border border-dashed border-[#003328]/30 bg-[#003328]/[0.02] font-mono text-[9px] leading-none text-[#003328]/65 md:text-[10px]',
            col > GRID_COLUMNS ? 'md:hidden' : '',
          )}
        >
          {col},{row}
        </div>,
      )
    }
  }
  return (
    <div
      aria-hidden
      style={GRID_TEMPLATE_STYLE}
      className={cn('pointer-events-none absolute inset-0 z-10 grid', GRID_COLUMN_CLASSES, GRID_GAP_CLASSES)}
    >
      {cells}
    </div>
  )
}

function EditorialFrame({ src, alt, width, height, href, className, style }: EditorialFrameProps) {
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
        'group relative min-h-0 min-w-0 overflow-visible [perspective:900px]',
        className,
      )}
    >
      <div className="relative z-[1] flex h-full w-full min-h-0 min-w-0 items-center justify-center md:block">
        <div className="relative inline-block h-full max-w-full overflow-hidden rounded-xl md:block md:w-full">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-full w-auto max-w-full min-w-0 object-contain md:w-full"
          />
        </div>
      </div>
      {href ? (
        <>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${alt}`}
            className="absolute inset-0 z-[2] cursor-pointer"
          />
        </>
      ) : null}
    </motion.div>
  )
}

const FOLD2_SCROLL_OFFSET_DESKTOP = ['start start', 'end end'] as const
const FOLD2_SCROLL_OFFSET_MOBILE = ['start start', 'end 50%'] as const

export function SocialProofWall() {
  const ref = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const factor = useCinematicIntensity()
  const [scrollSpring, setScrollSpring] = useState<
    typeof cinematicScrollSpring | typeof cinematicScrollSpringMobile
  >(cinematicScrollSpring)
  const [scrollOffset, setScrollOffset] = useState<
    typeof FOLD2_SCROLL_OFFSET_DESKTOP | typeof FOLD2_SCROLL_OFFSET_MOBILE
  >(FOLD2_SCROLL_OFFSET_DESKTOP)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      const mobile = mq.matches
      setScrollSpring(mobile ? cinematicScrollSpringMobile : cinematicScrollSpring)
      setScrollOffset(mobile ? FOLD2_SCROLL_OFFSET_MOBILE : FOLD2_SCROLL_OFFSET_DESKTOP)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...scrollOffset],
  })
  const smooth = useSpring(scrollYProgress, scrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 22, factor * -22])
  const grainY = useTransform(smooth, [0, 1], [factor * -12, factor * 12])

  // Vertical scroll progress drives a horizontal translation that exactly
  // covers `galleryWidth − viewportWidth`, so the gallery's right edge
  // lands flush at scroll progress 1 across every breakpoint.
  const [maxScroll, setMaxScroll] = useState(0)
  useEffect(() => {
    const galleryEl = galleryRef.current
    const viewportEl = galleryEl?.parentElement
    if (!galleryEl || !viewportEl) return

    const update = () => {
      setMaxScroll(Math.max(galleryEl.scrollWidth - viewportEl.clientWidth, 0))
    }
    update()

    const observer = new ResizeObserver(update)
    observer.observe(galleryEl)
    observer.observe(viewportEl)
    return () => observer.disconnect()
  }, [])
  const collageX = useTransform(smooth, [0, 1], [0, -maxScroll])

  return (
    <section
      ref={ref}
      className="relative z-[2] -mt-10 h-[185vh] rounded-t-[2.75rem] max-md:z-[2] md:z-auto md:h-[340vh] md:-mt-12 md:rounded-t-[4.5rem]"
    >
      <div className="sticky top-0 h-screen overflow-hidden rounded-t-[2.75rem] md:rounded-t-[4.5rem]">
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[linear-gradient(165deg,#edf8f3_0%,#dff2ec_58%,#d8ebe5_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.38),transparent_36%)]" />
        <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-55" />

        <div className="relative mx-auto flex h-full min-h-0 w-[92vw] flex-col pb-8 pt-10 md:pb-12 md:pt-14">
          <FoldReveal>
            <h2
              className={cn(
                'text-center text-[#003328]',
                PRINCIPAL_HEADLINE_MOBILE_TOP_INSET,
                PRINCIPAL_HEADLINE_CLASSNAME,
              )}
            >
              <span className="max-md:hidden">The word on the street.</span>
              <span className="block md:hidden">People already talk about us.</span>
            </h2>
          </FoldReveal>
          <p
            className={cn(
              'mx-auto px-1 text-center font-sans font-normal text-[#003328]/58 max-md:text-balance md:text-balance',
              PRINCIPAL_SUPPORT_MOBILE_COMBINED,
              'md:mt-5 md:max-w-[22rem] md:text-[calc(0.875rem+1.5px)] md:leading-[1.14] md:tracking-[0.018em]',
            )}
          >
            <span className="md:hidden">Be one of them. Get rewarded for it.</span>
            <span className="hidden md:block">
              Reshares, reposts, tags, threads,
              <br />
              mentions, conversations.
              <br />
              The little internet things
              <br />
              that move Flent around.
            </span>
          </p>

          <div className="relative mt-8 min-h-0 flex-1 overflow-visible md:mt-14">
            <motion.div
              ref={galleryRef}
              style={{ x: collageX, ...GRID_TEMPLATE_STYLE }}
              className={cn(
                'relative grid h-full min-h-0 w-[235vw] min-w-[82rem] md:w-[170vw]',
                GRID_COLUMN_CLASSES,
                GRID_GAP_CLASSES,
              )}
            >
              {galleryItems.map((item) => (
                <EditorialFrame
                  key={item.alt}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  href={item.href}
                  className="[grid-column:var(--mobile-col)] [grid-row:var(--mobile-row)] md:[grid-column:var(--desktop-col)] md:[grid-row:var(--desktop-row)]"
                  style={{
                    '--mobile-col': `${item.mobileCol[0]} / ${item.mobileCol[1]}`,
                    '--mobile-row': `${item.mobileRow[0]} / ${item.mobileRow[1]}`,
                    '--desktop-col': `${item.col[0]} / ${item.col[1]}`,
                    '--desktop-row': `${item.row[0]} / ${item.row[1]}`,
                  } as GalleryPlacementStyle}
                />
              ))}
              {DEBUG_GRID ? <GridDebugOverlay /> : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
