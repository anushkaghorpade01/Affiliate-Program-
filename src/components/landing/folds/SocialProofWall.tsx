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
 * - **Desktop (md+)**: 20×20 grid — place each image with `col` / `row` (end exclusive). Fold-2 web view
 *   uses the original **5-image** collage (Deepankar, postcard, Striver, Fairmont, tote); Kritika and Garv
 *   are omitted on desktop via `hideOnDesktop`. Mobile layout is unchanged.
 * - **Mobile**: 28×20 grid — use `mobileCol` / `mobileRow` (end exclusive). Column tracks use
 *   `minmax(3.5rem, 1fr)`; gap is tighter than desktop so more width goes to tracks.
 * - Images must not overlap; desktop placements keep breathing room per guide — mobile may sit flush on shared grid lines.
 *
 * **Grid overlay** (dashed cells + `col,row` labels): off by default; set `DEBUG_GRID` to `true`
 * locally for placement work (see `/guide.md`). Mobile uses 28 columns, desktop 20.
 */
const GRID_COLUMNS = 20
const MOBILE_GRID_COLUMNS = 28
const GRID_ROWS = 20
const DEBUG_GRID = false

/** Uniform scale for all collage tiles — preserves grid topology; scroll range uses scaled width (transform does not affect `scrollWidth`). */
const COLLAGE_VISUAL_SCALE = 1.02

/** Max width/height of each bitmap vs. its grid cell — shrinks painted area without clipping or changing grid lines. */
const COLLAGE_IMAGE_MAX_PERCENT = 92

/** Minimum track width on narrow viewports keeps collage tiles legible (more horizontal scroll, less tiny postage stamps). */
const MOBILE_COL_MIN = '3.5rem'

const GRID_TEMPLATE_STYLE = {
  gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
} satisfies CSSProperties

/** Mobile: fixed ~28 columns with a floor on track size. Desktop: unchanged 20×20 `1fr` tracks. */
const GRID_COLUMN_CLASSES = `[grid-template-columns:repeat(${MOBILE_GRID_COLUMNS},minmax(${MOBILE_COL_MIN},1fr))] md:[grid-template-columns:repeat(${GRID_COLUMNS},minmax(0,1fr))]`

/** Tighter gaps on mobile (more width to tracks, less visible gutter); md+ unchanged. */
const GRID_GAP_CLASSES = 'gap-x-1 gap-y-1 md:gap-x-5 md:gap-y-5'

/** Must match 28 × {@link MOBILE_COL_MIN} + 27 × mobile gap-x (`0.25rem` for `gap-1`). */
const MOBILE_GALLERY_MIN_WIDTH = 'max-md:min-w-[calc(28*3.5rem+27*0.25rem)]'

type GridRange = readonly [start: number, end: number]

type GalleryItem = {
  src: string
  alt: string
  width: number
  height: number
  /** Desktop 20×20 grid (ignored when `mobileOnly`). */
  col: GridRange
  row: GridRange
  mobileCol: GridRange
  mobileRow: GridRange
  href?: string
  /** Hide on `md+` — still provide `col`/`row` for typing; unused in layout. */
  mobileOnly?: boolean
  /** Omitted from desktop grid (fold-2 “5 tiles” web layout); still shown on mobile. */
  hideOnDesktop?: boolean
}

/**
 * Mobile (**28×20**): asymmetric collage rects — disjoint cells, organic rhythm; grid overlay in dev only.
 * Placement lives on the **plain `div` grid child** so layout isn’t swallowed by Framer Motion.
 */
const galleryItems: GalleryItem[] = [
  {
    src: '/social-proof/deepankar-tweet.png',
    alt: 'Social post about a house in Indiranagar',
    width: 1024,
    height: 806,
    /** Desktop: original 5-up fold-2 grid (`2228ff2`); mobile placements unchanged below. */
    col: [2, 6],
    row: [2, 15],
    mobileCol: [1, 6],
    mobileRow: [1, 8],
  },
  {
    src: '/social-proof/flent-postcard.png',
    alt: 'Flent postcard held in hand',
    width: 1024,
    height: 683,
    col: [7, 9],
    row: [5, 21],
    mobileCol: [3, 12],
    mobileRow: [8, 15],
    href: 'https://www.instagram.com/p/DVizDjukR3s/',
  },
  {
    src: '/social-proof/striver-reply.png',
    alt: 'Social reply recommending Flent homes',
    width: 1024,
    height: 600,
    col: [10, 14],
    row: [1, 13],
    mobileCol: [7, 14],
    mobileRow: [1, 7],
  },
  {
    src: '/social-proof/fairmont-card.png',
    alt: 'Creator holding a Fairmont listing card',
    width: 1024,
    height: 576,
    col: [15, 17],
    row: [8, 21],
    mobileCol: [13, 18],
    mobileRow: [8, 14],
    href: 'https://www.instagram.com/reel/DXlc4OGkqdy/?igsh=MXBwYnBnaWllYzVpeA==',
  },
  {
    src: '/social-proof/flent-tote.png',
    alt: 'Flent tote bag held indoors',
    width: 1024,
    height: 576,
    col: [17, 21],
    row: [4, 14],
    mobileCol: [11, 18],
    mobileRow: [15, 23],
  },
  {
    src: '/social-proof/tweet-kritika-kumari.png',
    alt: 'Kritika on X praises Flent home design',
    width: 1024,
    height: 1200,
    col: [1, 11],
    row: [15, 22],
    mobileCol: [1, 11],
    mobileRow: [15, 22],
    hideOnDesktop: true,
  },
  {
    src: '/social-proof/tweet-garv-malik.png',
    alt: 'Garv Malik post on flats and Flent interiors',
    width: 1024,
    height: 1200,
    col: [18, 21],
    row: [1, 8],
    /** Mobile: +1 col each side; Striver shortened to [7,14); Supratik → [24,29). */
    mobileCol: [14, 24],
    mobileRow: [1, 7],
    hideOnDesktop: true,
  },
  {
    src: '/social-proof/tweet-prakash-mardi.png',
    alt: 'Prakash Mardi recommends Flent on X',
    width: 1024,
    height: 900,
    col: [1, 2],
    row: [1, 2],
    /** +2 cols right; left of Supratik (col 24). Up 1 row vs Garv mobile [1,7]. */
    mobileCol: [19, 23],
    mobileRow: [7, 13],
    mobileOnly: true,
  },
  {
    src: '/social-proof/tweet-kaashvi-saxena.png',
    alt: 'Kaashvi Saxena post on brokerage-free Bengaluru rentals',
    width: 1024,
    height: 900,
    col: [1, 2],
    row: [1, 2],
    /** Nudged +1 col right; end line 29 (28-col grid cap). */
    mobileCol: [25, 29],
    mobileRow: [15, 21],
    mobileOnly: true,
  },
  {
    src: '/social-proof/tweet-anurag-mundhada.png',
    alt: 'Anurag Mundhada on X praises Flent homes and penthouse',
    width: 1024,
    height: 1200,
    col: [1, 2],
    row: [1, 2],
    /** Starts col 18 (after Fairmont 13/18); translate ≈ +1.5 col. +1 row span at bottom. */
    mobileCol: [18, 23],
    mobileRow: [14, 23],
    mobileOnly: true,
  },
  {
    src: '/social-proof/tweet-supratik-das.png',
    alt: 'Supratik Das on X praises Flent for the best homes in Bangalore',
    width: 1024,
    height: 900,
    col: [1, 2],
    row: [1, 2],
    /** Mobile: shifted +1 col (clears Garv [14,24]); stacks with Kaashvi cols, disjoint rows. */
    mobileCol: [24, 29],
    mobileRow: [5, 10],
    mobileOnly: true,
  },
]

type EditorialFrameProps = {
  src: string
  alt: string
  width?: number
  height?: number
  href?: string
  className?: string
  /** Fold-2 mobile: no tilt / hover lift — content stays clipped to the tile. */
  staticVisual?: boolean
}

/**
 * Debug overlays — labelled `col,row`; match desktop 20 cols vs mobile 28 cols.
 */
function GridDebugOverlay() {
  const mobileCells: ReactNode[] = []
  for (let row = 1; row <= GRID_ROWS; row++) {
    for (let col = 1; col <= MOBILE_GRID_COLUMNS; col++) {
      mobileCells.push(
        <div
          key={`m-${col},${row}`}
          style={{ gridColumn: `${col} / ${col + 1}`, gridRow: `${row} / ${row + 1}` }}
          className="flex items-center justify-center border border-dashed border-[#003328]/30 bg-[#003328]/[0.02] font-mono text-[9px] leading-none text-[#003328]/65"
        >
          {col},{row}
        </div>,
      )
    }
  }

  const desktopCells: ReactNode[] = []
  for (let row = 1; row <= GRID_ROWS; row++) {
    for (let col = 1; col <= GRID_COLUMNS; col++) {
      desktopCells.push(
        <div
          key={`d-${col},${row}`}
          style={{ gridColumn: `${col} / ${col + 1}`, gridRow: `${row} / ${row + 1}` }}
          className="flex items-center justify-center border border-dashed border-[#003328]/30 bg-[#003328]/[0.02] font-mono text-[9px] leading-none text-[#003328]/65 md:text-[10px]"
        >
          {col},{row}
        </div>,
      )
    }
  }

  const mobileColsClass = `[grid-template-columns:repeat(${MOBILE_GRID_COLUMNS},minmax(${MOBILE_COL_MIN},1fr))]`
  const desktopColsClass = `[grid-template-columns:repeat(${GRID_COLUMNS},minmax(0,1fr))]`

  return (
    <>
      <div
        aria-hidden
        style={GRID_TEMPLATE_STYLE}
        className={cn(
          'pointer-events-none absolute inset-0 z-10 grid md:hidden',
          mobileColsClass,
          GRID_GAP_CLASSES,
        )}
      >
        {mobileCells}
      </div>
      <div
        aria-hidden
        style={GRID_TEMPLATE_STYLE}
        className={cn(
          'pointer-events-none absolute inset-0 z-10 hidden md:grid',
          desktopColsClass,
          GRID_GAP_CLASSES,
        )}
      >
        {desktopCells}
      </div>
    </>
  )
}

function EditorialFrame({ src, alt, width, height, href, className, staticVisual }: EditorialFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState('rotateX(0deg) rotateY(0deg) translateZ(0px)')

  return (
    <motion.div
      ref={ref}
      onMouseMove={(event) => {
        if (staticVisual) return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        const rotateY = (x - 0.5) * 4.5
        const rotateX = (0.5 - y) * 4
        setTilt(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`)
      }}
      onMouseLeave={() => {
        if (!staticVisual) setTilt('rotateX(0deg) rotateY(0deg) translateZ(0px)')
      }}
      style={
        staticVisual
          ? undefined
          : ({ transform: tilt, transformStyle: 'preserve-3d' } satisfies CSSProperties)
      }
      whileHover={staticVisual ? undefined : { y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'group relative flex h-full w-full min-h-0 min-w-0 items-center justify-start',
        staticVisual
          ? 'overflow-visible'
          : 'overflow-visible md:[perspective:900px]',
        className,
      )}
    >
      <span className="relative flex h-full w-full min-h-0 min-w-0 items-center justify-start">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            maxWidth: `${COLLAGE_IMAGE_MAX_PERCENT}%`,
            maxHeight: `${COLLAGE_IMAGE_MAX_PERCENT}%`,
          }}
          className="pointer-events-none block h-auto w-auto rounded-[1.05rem] object-contain object-left select-none"
        />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${alt}`}
            className="absolute inset-0 z-[2] cursor-pointer rounded-[1.05rem]"
          />
        ) : null}
      </span>
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
  const [galleryLayoutIsMobile, setGalleryLayoutIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      const mobile = mq.matches
      setScrollSpring(mobile ? cinematicScrollSpringMobile : cinematicScrollSpring)
      setScrollOffset(mobile ? FOLD2_SCROLL_OFFSET_MOBILE : FOLD2_SCROLL_OFFSET_DESKTOP)
      setGalleryLayoutIsMobile(mobile)
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

  // Vertical scroll progress drives a horizontal translation so the gallery's
  // right edge lands flush at scroll progress 1. Extent uses scaled visual width
  // (see COLLAGE_VISUAL_SCALE) because transform scale does not change scrollWidth.
  const [maxScroll, setMaxScroll] = useState(0)
  useEffect(() => {
    const galleryEl = galleryRef.current
    const viewportEl = galleryEl?.parentElement
    if (!galleryEl || !viewportEl) return

    const update = () => {
      const logicalWidth = galleryEl.scrollWidth
      const visualWidth = logicalWidth * COLLAGE_VISUAL_SCALE
      setMaxScroll(Math.max(visualWidth - viewportEl.clientWidth, 0))
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
              <span className="block">Our homes rent themselves.</span>
            </h2>
          </FoldReveal>
          <p
            className={cn(
              'mx-auto text-balance px-1 text-center font-sans font-normal text-[#003328]/58',
              PRINCIPAL_SUPPORT_MOBILE_COMBINED,
            )}
          >
            We&apos;re a hot topic waiting for you to pick up.
          </p>

          <div className="relative mt-8 min-h-0 flex-1 overflow-visible md:mt-14">
            <motion.div
              ref={galleryRef}
              style={{
                x: collageX,
                scale: COLLAGE_VISUAL_SCALE,
                transformOrigin: '0 0',
                ...GRID_TEMPLATE_STYLE,
              }}
              className={cn(
                'relative grid h-full min-h-0 w-[265vw] md:w-[170vw] md:min-w-[82rem]',
                MOBILE_GALLERY_MIN_WIDTH,
                GRID_COLUMN_CLASSES,
                GRID_GAP_CLASSES,
              )}
            >
              {galleryItems.map((item) => {
                const useMobileGrid = galleryLayoutIsMobile
                const gridColumn = useMobileGrid
                  ? `${item.mobileCol[0]} / ${item.mobileCol[1]}`
                  : `${item.col[0]} / ${item.col[1]}`
                const gridRow = useMobileGrid
                  ? `${item.mobileRow[0]} / ${item.mobileRow[1]}`
                  : `${item.row[0]} / ${item.row[1]}`

                return (
                  <div
                    key={item.src}
                    style={{ gridColumn, gridRow }}
                    className={cn(
                      'min-h-0 min-w-0',
                      item.mobileOnly && 'md:hidden',
                      item.hideOnDesktop && 'md:hidden',
                      item.src === '/social-proof/tweet-anurag-mundhada.png' &&
                        'translate-x-[calc(100%*3/10)]',
                    )}
                  >
                    <EditorialFrame
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      href={item.href}
                      staticVisual={galleryLayoutIsMobile}
                      className={
                        item.src === '/social-proof/tweet-kritika-kumari.png'
                          ? '[&_img]:[object-position:left_top]'
                          : undefined
                      }
                    />
                  </div>
                )
              })}
              {DEBUG_GRID ? <GridDebugOverlay /> : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
