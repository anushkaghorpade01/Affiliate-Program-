import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
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
const GRID_ROWS = 20
const DEBUG_GRID = true

const GRID_TEMPLATE_STYLE = {
  gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
} satisfies CSSProperties

const GRID_GAP_CLASSES = 'gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-3'

type GridRange = readonly [start: number, end: number]

type GalleryItem = {
  src: string
  alt: string
  width: number
  height: number
  col: GridRange
  row: GridRange
}

const galleryItems: GalleryItem[] = [
  {
    src: 'https://picsum.photos/seed/flent-collage-2/1600/1200',
    alt: 'Center-right hero moment',
    width: 1600,
    height: 1200,
    col: [2, 6],
    row: [2, 15],
  },
  {
    src: 'https://picsum.photos/seed/flent-collage-4/900/1400',
    alt: 'Far-right cropped portrait',
    width: 900,
    height: 1400,
    col: [7, 9],
    row: [4, 21],
  },
  {
    src: 'https://picsum.photos/seed/flent-collage-1/1400/875',
    alt: 'Editorial moment one',
    width: 1400,
    height: 875,
    col: [10, 14],
    row: [5, 19],
  },
  {
    src: 'https://picsum.photos/seed/flent-collage-3/900/1200',
    alt: 'Lower-left portrait',
    width: 900,
    height: 1200,
    col: [15, 17],
    row: [1, 21],
  },
  {
    src: 'https://picsum.photos/seed/flent-collage-5/1400/900',
    alt: 'Lower-center continuation',
    width: 1400,
    height: 900,
    col: [18, 21],
    row: [4, 12],
  },
]

type EditorialFrameProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
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
          className="flex items-center justify-center border border-dashed border-[#003328]/30 bg-[#003328]/[0.02] font-mono text-[9px] leading-none text-[#003328]/65 md:text-[10px]"
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
      className={cn('pointer-events-none absolute inset-0 z-10 grid', GRID_GAP_CLASSES)}
    >
      {cells}
    </div>
  )
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
        'group relative min-h-0 min-w-0 overflow-hidden shadow-[0_20px_55px_-24px_rgba(0,51,40,0.42)] [perspective:900px]',
        className,
      )}
    >
      <img src={src} alt={alt} width={width} height={height} className="block h-full w-full min-h-0 min-w-0 object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_45%,rgba(0,0,0,0.14))] opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
    </motion.div>
  )
}

export function SocialProofWall() {
  const ref = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
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
    <section ref={ref} className="relative -mt-7 h-[300vh] rounded-t-[2.75rem] md:-mt-9 md:h-[340vh] md:rounded-t-[4.5rem]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[linear-gradient(165deg,#edf8f3_0%,#dff2ec_58%,#d8ebe5_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.38),transparent_36%)]" />
        <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0 opacity-55" />

        <div className="relative mx-auto flex h-full min-h-0 w-[92vw] flex-col pb-8 pt-10 md:pb-12 md:pt-14">
          <FoldReveal>
            <h2 className="text-center font-display text-[2.45rem] leading-[0.95] tracking-[-0.03em] text-[#003328] md:text-[5.9rem]">
              The word on the street.
            </h2>
          </FoldReveal>
          <p className="mx-auto mt-3 max-w-[24rem] text-center text-sm leading-[1.2] text-[#003328]/84 md:mt-4 md:text-base">
            Reshares, reposts, tags, threads, mentions, moments.
          </p>

          <div className="relative mt-8 min-h-0 flex-1 overflow-visible md:mt-14">
            <motion.div
              ref={galleryRef}
              style={{ x: collageX, ...GRID_TEMPLATE_STYLE }}
              className={cn(
                'relative grid h-full min-h-0 w-[200vw] min-w-[74rem] md:w-[170vw]',
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
                  style={{
                    gridColumn: `${item.col[0]} / ${item.col[1]}`,
                    gridRow: `${item.row[0]} / ${item.row[1]}`,
                  }}
                />
              ))}
             {/* {DEBUG_GRID ? <GridDebugOverlay /> : null} */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
