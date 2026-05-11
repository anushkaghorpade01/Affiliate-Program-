import { Button } from '@/components/ui/button'
import { FloatingKey } from '@/components/landing/shared/FloatingKey'

export function HeroSection() {
  return (
    <section className="relative h-[calc(clamp(42rem,55.8vw,72rem)+6rem)] overflow-hidden px-6 pt-28 md:px-12 md:pt-16">
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 flex items-center justify-center">
        <img
          src="/hero-background.png"
          alt=""
          className="h-full w-full origin-center object-cover -scale-x-100"
        />
      </div>

      <p className="absolute right-6 top-[15.5rem] text-right text-base tracking-[0.02em] text-[#dff2ec]/78 md:right-12 md:top-[11.5rem] md:text-2xl">
        Flent&apos;s search for
        <br />
        <span className="italic">Tastemakers</span>
      </p>
      <a href="#apply" aria-label="Jump to tastemaker application form">
        <Button className="absolute right-6 top-[39rem] bg-[#D4A853] px-10 text-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,168,83,0.45)] md:right-12 md:top-[34.8rem] md:px-12">
          Apply now
        </Button>
      </a>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-7">
          <img
            src="/flent-logo-white.png"
            alt="Flent"
            className="h-auto w-24 md:w-32"
          />
          <br />
          <h1 className="font-display text-[1.9rem] leading-[0.92] tracking-[-0.03em] text-[#E8F5F0] md:text-[3.3rem] xl:text-[4.5rem]">
            Your influence is real
            <br />
            Now it’s rewarding too
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[#dff2ec]/80 md:text-xl">
          For creators, connectors, and people whose recommendations already move people. <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            Share Flent within your circles, create around it, or help someone find their next home. Your recommendations now get rewarded.
          </p>
        </div>

        <div className="relative mt-10 flex min-h-[420px] items-start justify-start md:min-h-[560px] lg:mt-0">
          <div className="absolute left-1/2 top-[-2%] -translate-x-1/2 md:left-[-18%] md:top-[8%] md:translate-x-0">
            <FloatingKey
              className="z-10 h-[15rem] w-[10.5rem] md:h-[31rem] md:w-[22rem] xl:h-[35rem] xl:w-[25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
