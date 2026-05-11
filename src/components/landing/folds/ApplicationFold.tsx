import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FloatingKey } from '@/components/landing/shared/FloatingKey'
import { cinematicScrollSpring } from '@/components/landing/shared/cinematicScrollSpring'
import { FoldReveal } from '@/components/landing/shared/FoldReveal'
import { useCinematicIntensity } from '@/components/landing/shared/useCinematicIntensity'

export function ApplicationFold() {
  const ref = useRef<HTMLElement>(null)
  const factor = useCinematicIntensity()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, cinematicScrollSpring)
  const bgY = useTransform(smooth, [0, 1], [factor * 22, factor * -22])
  const grainY = useTransform(smooth, [0, 1], [factor * -12, factor * 12])
  const panelY = useTransform(smooth, [0, 1], [factor * 10, factor * -10])
  const keyParallax = useTransform(smooth, [0, 1], [0, factor * -28])

  return (
    <section id="apply" ref={ref} className="relative -mt-6 scroll-mt-8 overflow-hidden px-6 pb-24 pt-24 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#dff2ec]/20 to-transparent" />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[url('/folds/application-backdrop.png')] bg-cover bg-center brightness-[0.5] saturate-[0.95]"
        aria-hidden
      />
      <motion.div style={{ y: grainY }} className="grain pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y: panelY }}
        className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.025] p-3 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.8)] md:grid-cols-[1fr_0.8fr]"
      >
        <FoldReveal className="rounded-[1.65rem] bg-[#001b15]/62 p-6 shadow-[24px_0_80px_-56px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-10">
          <h2 className="font-display text-[2.6rem] leading-[0.95] tracking-[-0.03em] text-[#E8F5F0] md:text-[4.5rem]">Take the Tastemaker Test.</h2>
          <p className="mt-4 text-[#dff2ec]/75">Taste &gt; following.</p>

          <form className="mt-8 space-y-4">
            {['Your Name', 'Email', 'Where can we find you online?'].map((field) => (
              <input key={field} placeholder={field} className="h-12 w-full rounded-2xl border border-white/15 bg-[#000d09]/40 px-4 text-[#E8F5F0] placeholder:text-[#dff2ec]/45" />
            ))}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select className="h-12 rounded-2xl border border-white/15 bg-[#000d09]/40 px-4 text-[#E8F5F0]">
                <option>City</option>
              </select>
              <select className="h-12 rounded-2xl border border-white/15 bg-[#000d09]/40 px-4 text-[#E8F5F0]">
                <option>I'm a...</option>
              </select>
            </div>
            <textarea placeholder="In one line - what makes a house a home?&#10;&#10;Take your time." className="h-28 w-full rounded-2xl border border-white/15 bg-[#000d09]/40 px-4 py-3 text-[#E8F5F0] placeholder:text-[#dff2ec]/45" />
            <Button className="w-full bg-[#D4A853] text-[#000d09] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,168,83,0.4)]">Submit application</Button>
            <p className="text-xs text-[#dff2ec]/60">By applying you agree to our T&amp;Cs. We do not spam. Ever.</p>
          </form>
        </FoldReveal>

        <FoldReveal delay={0.06} className="relative flex min-h-[340px] items-center justify-center rounded-[1.6rem]">
          <FloatingKey scrollParallaxY={keyParallax} />
        </FoldReveal>
      </motion.div>
    </section>
  )
}
