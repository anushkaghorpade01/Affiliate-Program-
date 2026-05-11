import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
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
      <div className="relative h-52 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#061f19]/72 p-5">
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-[#dff2ec]/55">
          <span>Referrals</span>
          <span>Live</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {['₹82k', '41', '12'].map((label) => (
            <div key={label} className="rounded-2xl border border-[#dff2ec]/10 bg-[#dff2ec]/[0.04] p-3">
              <div className="h-1.5 w-8 rounded-full bg-[#dff2ec]/20" />
              <p className="mt-5 font-display text-2xl text-[#dff2ec]">{label}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex h-16 items-end gap-2">
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
      <div className="relative h-52 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#061f19]/72">
        <div className="absolute left-5 top-5 h-28 w-24 rotate-[-7deg] rounded-2xl border border-white/10 bg-[#dff2ec]/10" />
        <div className="absolute left-20 top-10 h-28 w-28 rotate-[5deg] rounded-2xl border border-white/10 bg-[#154d40]/80 p-4">
          <div className="h-2 w-14 rounded-full bg-white/30" />
          <div className="mt-12 h-2 w-20 rounded-full bg-white/20" />
        </div>
        <div className="absolute bottom-5 right-5 flex gap-2">
          {['WA', 'IG', 'TT'].map((label) => (
            <span key={label} className="grid h-11 w-11 place-items-center rounded-full border border-[#dff2ec]/12 bg-[#dff2ec]/10 text-xs text-[#dff2ec]/80">
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'resources') {
    return (
      <div className="relative h-52 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#061f19]/72 p-5">
        <div className="flex gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#dff2ec]/58">
          {['Buckets', 'Guides', 'Direction'].map((label) => (
            <span key={label} className="rounded-full border border-[#dff2ec]/10 bg-[#dff2ec]/[0.05] px-3 py-2">
              {label}
            </span>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 h-28 w-[46%] rounded-[1.25rem] border border-[#dff2ec]/12 bg-[#dff2ec]/[0.06] p-4">
          <div className="h-2 w-16 rounded-full bg-[#dff2ec]/30" />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-[#dff2ec]/14" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#dff2ec]/14" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#dff2ec]/14" />
          </div>
          <p className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-[0.18em] text-[#dff2ec]/48">Posting guide</p>
        </div>
        <div className="absolute bottom-8 right-5 h-32 w-[42%] rotate-[4deg] rounded-[1.25rem] border border-[#dff2ec]/12 bg-[#154d40]/70 p-4 shadow-[0_18px_60px_-38px_rgba(223,242,236,0.45)]">
          <div className="h-10 w-10 rounded-full bg-[#dff2ec]/18" />
          <div className="mt-5 h-2 w-20 rounded-full bg-[#dff2ec]/24" />
          <div className="mt-3 h-1.5 w-14 rounded-full bg-[#dff2ec]/16" />
        </div>
        <div className="absolute right-6 top-20 h-px w-24 rotate-[-18deg] bg-[#dff2ec]/16" />
      </div>
    )
  }

  return (
    <div className="relative h-52 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#061f19]/72 p-5">
      <div className="rounded-2xl border border-[#dff2ec]/10 bg-[#dff2ec]/[0.04] p-4">
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-[#dff2ec]/55">
          <span>Payout</span>
          <span>Cleared</span>
        </div>
        <p className="mt-7 font-display text-5xl leading-none text-[#dff2ec]">₹20,000</p>
      </div>
      <div className="absolute bottom-7 left-7 right-7 flex items-center gap-3 text-[#dff2ec]/62">
        <span className="h-px flex-1 bg-[#dff2ec]/18" />
        <span className="text-xs uppercase tracking-[0.18em]">Direct</span>
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
    <article
      className="group overflow-hidden rounded-[2rem] border border-[#dff2ec]/10 bg-[#dff2ec]/[0.045] p-4 shadow-[0_28px_80px_-48px_rgba(223,242,236,0.28)] backdrop-blur md:p-5"
    >
      <FeatureVisual type={visual} />
      <div className="px-2 pb-2 pt-7">
        <h3 className="font-display text-[2rem] leading-none tracking-[-0.02em] text-[#dff2ec] md:text-[2.35rem]">
          {title}
        </h3>
        <p className="mt-4 max-w-[30rem] text-sm leading-[1.45] text-[#dff2ec]/64 md:text-[0.95rem]">
          {body}
        </p>
      </div>
    </article>
  )
}

function ProcessSeparator(): ReactNode {
  return (
    <div className="hidden flex-1 items-center px-5 md:flex" aria-hidden>
      <span className="h-px flex-1 bg-[#dff2ec]/15" />
      <span className="ml-3 text-[#dff2ec]/25">→</span>
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
    <section ref={ref} className="relative -mt-2 overflow-hidden px-6 py-24 md:px-12 md:py-28">
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

        <FoldReveal delay={0.12} className="mt-16 md:mt-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {processSteps.map((step, index) => (
              <div key={step.number} className="contents">
                <div className="max-w-[23rem] md:w-[30%]">
                  <p className="text-xs tracking-[0.28em] text-[#dff2ec]/38">{step.number}</p>
                  <h3 className="mt-5 font-display text-[2rem] leading-none tracking-[-0.02em] text-[#dff2ec]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-sm leading-[1.45] text-[#dff2ec]/58">
                    {step.body}
                  </p>
                </div>
                {index < processSteps.length - 1 ? <ProcessSeparator /> : null}
              </div>
            ))}
          </div>
        </FoldReveal>

        <FoldReveal delay={0.16} className="mt-20 md:mt-28">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
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
  )
}
