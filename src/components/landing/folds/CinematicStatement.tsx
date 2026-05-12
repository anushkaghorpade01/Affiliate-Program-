import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { StartApplicationFloatingCta } from '@/components/landing/shared/StartApplicationFloatingCta'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

const processSteps = [
  {
    number: '01',
    title: 'Apply as a Tastemaker',
    body: 'Fill out the application and tell us how you move culture, people, or recommendations around you.',
  },
  {
    number: '02',
    title: 'Get approved',
    body: 'Our team reviews every application to keep the network intentional, trusted, and aligned.',
  },
  {
    number: '03',
    title: 'Start sharing',
    body: 'Log into your dashboard to access your links, rewards, brand drops, and start earning immediately.',
  },
]

const featureCards = [
  {
    title: 'Personal dashboard',
    body: 'Track referrals, rewards, approvals, payouts, and activity from one place.',
    visual: 'dashboard',
  },
  {
    title: 'Ready-to-share assets',
    body: 'Campaigns, brand drops, invite links, and creator assets are already prepared for you.',
    visual: 'assets',
  },
  {
    title: 'Guides and Resources',
    body: 'Access content buckets, creative direction, and posting guides to help you unlock more.',
    visual: 'resources',
  },
  {
    title: 'Reliable payouts',
    body: 'Earnings and rewards are tracked clearly and paid out directly with zero friction.',
    visual: 'payouts',
  },
] as const

function FeatureVisual({ type }: { type: (typeof featureCards)[number]['visual'] }) {
  if (type === 'dashboard') {
    return (
      <div className="relative h-28 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#061f19]/72 p-2 md:h-52 md:rounded-[1.5rem] md:p-5">
        <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.2em] text-[#dff2ec]/55 md:text-[0.65rem]">
          <span>Referrals</span>
          <span>Live</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 md:mt-6 md:gap-3">
          {['₹82k', '41', '12'].map((label) => (
            <div key={label} className="rounded-lg border border-[#dff2ec]/10 bg-[#dff2ec]/[0.04] p-1.5 md:rounded-2xl md:p-3">
              <div className="h-1 w-5 rounded-full bg-[#dff2ec]/20 md:h-1.5 md:w-8" />
              <p className="mt-1 font-display text-[0.9375rem] text-[#dff2ec] md:mt-5 md:text-2xl">{label}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex h-8 items-end gap-1 md:bottom-5 md:left-5 md:right-5 md:h-16 md:gap-2">
          {[35, 54, 42, 76, 61, 88, 72].map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className="flex-1 rounded-t-full bg-gradient-to-t from-[#1b8f76]/30 to-[#dff2ec]/55"
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'assets') {
    return (
      <div className="relative h-28 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#061f19]/72 md:h-52 md:rounded-[1.5rem]">
        <div className="absolute left-1.5 top-1.5 h-[3.5rem] w-14 rotate-[-7deg] rounded border border-white/10 bg-[#dff2ec]/10 md:left-5 md:top-5 md:h-28 md:w-24 md:rounded-2xl" />
        <div className="absolute left-[2.65rem] top-4 h-[3.5rem] w-[3.5rem] rotate-[5deg] rounded border border-white/10 bg-[#154d40]/80 p-1 md:left-20 md:top-10 md:h-28 md:w-28 md:rounded-2xl md:p-4">
          <div className="h-1 w-8 rounded-full bg-white/30 md:h-2 md:w-14" />
          <div className="mt-2 h-1 w-10 rounded-full bg-white/20 md:mt-12 md:h-2 md:w-20" />
        </div>
        <div className="absolute bottom-1.5 right-1.5 flex gap-px md:bottom-5 md:right-5 md:gap-2">
          {(['WA', 'IG', 'TT'] as const).map((label) => (
            <span
              key={label}
              className="grid h-5 w-5 place-items-center rounded-full border border-[#dff2ec]/12 bg-[#dff2ec]/10 text-[0.5rem] text-[#dff2ec]/80 md:h-11 md:w-11 md:text-xs"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'resources') {
    return (
      <div className="relative h-28 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#061f19]/72 p-2 md:h-52 md:rounded-[1.5rem] md:p-5">
        <div className="flex gap-1.5 text-[0.55rem] uppercase tracking-[0.18em] text-[#dff2ec]/58 md:gap-2 md:text-[0.65rem]">
          {['Buckets', 'Guides', 'Direction'].map((label) => (
            <span key={label} className="rounded-full border border-[#dff2ec]/10 bg-[#dff2ec]/[0.05] px-2 py-1.5 md:px-3 md:py-2">
              {label}
            </span>
          ))}
        </div>
        <div className="absolute bottom-1.5 left-1.5 h-[3.25rem] w-[46%] rounded border border-[#dff2ec]/12 bg-[#dff2ec]/[0.06] p-1 md:bottom-5 md:left-5 md:h-28 md:rounded-[1.25rem] md:p-4">
          <div className="h-1.5 w-12 rounded-full bg-[#dff2ec]/30 md:h-2 md:w-16" />
          <div className="mt-2 space-y-1.5 md:mt-4 md:space-y-2">
            <div className="h-1 w-full rounded-full bg-[#dff2ec]/14 md:h-1.5" />
            <div className="h-1 w-4/5 rounded-full bg-[#dff2ec]/14 md:h-1.5" />
            <div className="h-1 w-2/3 rounded-full bg-[#dff2ec]/14 md:h-1.5" />
          </div>
          <p className="absolute bottom-2.5 left-2.5 text-[0.55rem] uppercase tracking-[0.18em] text-[#dff2ec]/48 md:bottom-4 md:left-4 md:text-[0.65rem]">
            Posting guide
          </p>
        </div>
        <div className="absolute bottom-2 right-1.5 h-[4rem] w-[42%] rotate-[4deg] rounded border border-[#dff2ec]/12 bg-[#154d40]/70 p-1 shadow-[0_18px_60px_-38px_rgba(223,242,236,0.45)] md:bottom-8 md:right-5 md:h-32 md:rounded-[1.25rem] md:p-4">
          <div className="h-7 w-7 rounded-full bg-[#dff2ec]/18 md:h-10 md:w-10" />
          <div className="mt-3 h-1.5 w-14 rounded-full bg-[#dff2ec]/24 md:mt-5 md:h-2 md:w-20" />
          <div className="mt-2 h-1 w-10 rounded-full bg-[#dff2ec]/16 md:mt-3 md:h-1.5 md:w-14" />
        </div>
        <div className="absolute right-2 top-10 h-px w-10 rotate-[-18deg] bg-[#dff2ec]/16 md:right-6 md:top-20 md:w-24" />
      </div>
    )
  }

  return (
    <div className="relative h-28 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#061f19]/72 p-2 md:h-52 md:rounded-[1.5rem] md:p-5">
      <div className="rounded-lg border border-[#dff2ec]/10 bg-[#dff2ec]/[0.04] p-2 md:rounded-2xl md:p-4">
        <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.2em] text-[#dff2ec]/55 md:text-[0.65rem]">
          <span>Payout</span>
          <span>Cleared</span>
        </div>
        <p className="mt-1.5 font-display text-[1.5rem] leading-none text-[#dff2ec] md:mt-7 md:text-5xl">₹20,000</p>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-[#dff2ec]/62 md:bottom-7 md:left-7 md:right-7 md:gap-3">
        <span className="h-px flex-1 bg-[#dff2ec]/18" />
        <span className="text-[0.65rem] uppercase tracking-[0.18em] md:text-xs">Direct</span>
        <span className="h-px flex-1 bg-[#dff2ec]/18" />
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  body,
  visual,
}: {
  title: string
  body: string
  visual: (typeof featureCards)[number]['visual']
}) {
  return (
    <article className="group overflow-hidden rounded-[1.2rem] border border-[#dff2ec]/10 bg-[#dff2ec]/[0.045] p-1.5 shadow-[0_28px_80px_-48px_rgba(223,242,236,0.28)] backdrop-blur md:rounded-[2rem] md:p-5">
      <FeatureVisual type={visual} />
      <div className="px-0.5 pb-0.5 pt-2.5 md:px-2 md:pb-2 md:pt-7">
        <h3 className="font-display text-[1.22rem] leading-none tracking-[-0.02em] text-[#dff2ec] md:text-[2.35rem]">
          {title}
        </h3>
        <p className="mt-1.5 max-w-[30rem] text-[0.7rem] leading-[1.45] text-[#dff2ec]/64 md:mt-4 md:text-[0.95rem]">
          {body}
        </p>
      </div>
    </article>
  )
}

function ProcessSeparator(): ReactNode {
  return (
    <div className="hidden flex-1 items-center justify-center px-5 md:flex" aria-hidden>
      <span className="text-[#dff2ec]/25">→</span>
    </div>
  )
}

export function CinematicStatement() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 26, factor * -26])
  const grainY = useTransform(smooth, [0, 1], [factor * -14, factor * 14])

  return (
    <>
      <section ref={ref} className="relative -mt-2 overflow-hidden px-6 py-10 md:px-12 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#000d09]/35 to-transparent" />
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute -inset-y-10 inset-x-0 bg-[url('/folds/start-earning-backdrop.png')] bg-cover bg-center brightness-[0.5] saturate-[0.95]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_54%,rgba(0,0,0,0.48)_100%)]" />
        <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl">
          <FoldReveal className="max-w-[58rem] md:max-w-[55%]">
            <h2 className="font-display text-[3.8rem] leading-[0.88] tracking-[-0.04em] text-[#dff2ec] md:text-[7.25rem]">
              Start earning from day one.
            </h2>
          </FoldReveal>
          <FoldReveal delay={0.08} className="mt-6 max-w-[28rem]">
            <p className="text-base leading-[1.35] text-[#dff2ec]/68 md:text-lg">
              You bring the influence. We handle the rest.
            </p>
          </FoldReveal>

          <FoldReveal delay={0.12} className="mt-8 md:mt-20">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-0">
              {processSteps.map((step, index) => (
                <div key={step.number} className="contents">
                  <div className="max-w-[23rem] md:w-[30%]">
                    <p className="text-xs tracking-[0.28em] text-[#dff2ec]/38">{step.number}</p>
                    <h3 className="mt-3 font-display text-[2rem] leading-none tracking-[-0.02em] text-[#dff2ec] md:mt-5">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.45] text-[#dff2ec]/58 md:mt-5">
                      {step.body}
                    </p>
                  </div>
                  {index < processSteps.length - 1 ? <ProcessSeparator /> : null}
                </div>
              ))}
            </div>
          </FoldReveal>

          <FoldReveal delay={0.16} className="mt-8 md:mt-28">
            <div className="grid gap-2.5 md:grid-cols-2 md:gap-6">
              {featureCards.map((card) => (
                <FeatureCard
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  visual={card.visual}
                />
              ))}
            </div>
          </FoldReveal>
        </div>
      </section>
      <StartApplicationFloatingCta cinematicSectionRef={ref} />
    </>
  )
}
