import { FloatingKey } from '@/components/landing/shared/FloatingKey'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[56rem] scroll-mt-0 overflow-hidden px-6 pb-8 pt-12 md:h-[calc(clamp(42rem,55.8vw,72rem)+6rem)] md:px-12 md:pb-0 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 flex items-center justify-center">
        <img
          src="/hero-background.png"
          alt=""
          className="h-full w-full origin-center object-cover -scale-x-100"
        />
      </div>

      <div className="relative z-[1] flex flex-col gap-5 md:hidden">
        <img src="/flent-logo-white.png" alt="Flent" className="mb-[5px] h-auto w-24 shrink-0" />
        <h1 className="font-display text-[clamp(2.35rem,8vw,3.55rem)] leading-[1.05] tracking-[-0.03em] text-[#E8F5F0]">
          Your influence is real
          <br />
          Now it’s rewarding too
        </h1>
        <p className="max-w-[21rem] text-sm leading-[1.1] text-[#dff2ec]/90">
          For creators, connectors, and people whose
          <br />
          recommendations already move people.
        </p>
        <p className="mt-8 max-w-[11rem] text-left text-sm leading-tight tracking-[0.02em] text-[#dff2ec]/88">
          Flent&apos;s search for
          <br />
          <span className="italic">Tastemakers</span>
        </p>
        <div className="pointer-events-none flex justify-center py-3 select-none">
          <FloatingKey className="h-[17rem] w-[11.25rem] shrink-0" />
        </div>
        <div className="-mt-[3.125rem] flex justify-end">
          <a
            href="#apply"
            aria-label="Jump to tastemaker application form"
            className="inline-flex items-center justify-center rounded-full bg-[#D4A853] px-8 py-2.5 text-sm font-medium tracking-wide text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,168,83,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/50"
          >
            Apply now
          </a>
        </div>
        <p className="mt-8 max-w-[20.5rem] text-sm leading-[1.1] text-[#dff2ec]/90">
          Share Flent within your circles, create around it, or help someone find their next home. Your recommendations now get rewarded.
        </p>
      </div>

      <p className="absolute right-12 top-[11.5rem] hidden text-right text-2xl tracking-[0.02em] text-[#dff2ec]/78 md:block">
        Flent&apos;s search for
        <br />
        <span className="italic">Tastemakers</span>
      </p>
      <a
        href="#apply"
        aria-label="Jump to tastemaker application form"
        className="absolute right-12 top-[34.8rem] z-30 hidden items-center justify-center rounded-full bg-[#D4A853] px-12 py-3 text-base font-medium tracking-wide text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,168,83,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/50 md:inline-flex"
      >
        Apply now
      </a>

      <div className="relative mx-auto hidden max-w-7xl gap-10 md:grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-7">
          <img
            src="/flent-logo-white.png"
            alt="Flent"
            className="h-auto w-32"
          />
          <br />
          <h1 className="font-display text-[3.55rem] leading-[0.92] tracking-[-0.03em] text-[#E8F5F0] xl:text-[4.75rem]">
            Your influence is real
            <br />
            Now it’s rewarding too
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-[#dff2ec]/80">
          For creators, connectors, and people whose recommendations already move people. <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            Share Flent within your circles, create around it, or help someone find their next home. Your recommendations now get rewarded.
          </p>
        </div>

        <div className="relative mt-10 flex min-h-[560px] items-start justify-start lg:mt-0">
          <div className="pointer-events-none absolute left-[-18%] top-[8%] select-none">
            <FloatingKey
              className="z-10 h-[31rem] w-[22rem] xl:h-[35rem] xl:w-[25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
