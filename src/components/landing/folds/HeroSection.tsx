import { FloatingKey } from '@/components/landing/shared/FloatingKey'
import { HeroMobileShare } from '@/components/landing/shared/HeroMobileShare'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[calc(56rem-30px)] scroll-mt-0 overflow-hidden px-6 pb-8 pt-10 md:h-[calc(clamp(42rem,55.8vw,72rem)+6rem)] md:px-12 md:pb-0 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 flex items-center justify-center">
        <img
          src="/hero-background.png"
          alt=""
          className="h-full w-full origin-center object-cover -scale-x-100"
        />
      </div>

      <div className="relative z-[1] flex flex-col gap-5 pt-6 md:hidden">
        <div className="mb-[5px] flex items-center justify-between gap-3">
          <a
            href="https://www.flent.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Flent — visit flent.in"
            className="shrink-0"
          >
            <img src="/flent-logo-white.png" alt="Flent" className="h-auto w-24" />
          </a>
          <HeroMobileShare className="shrink-0" />
        </div>
        <h1 className="mt-1 font-display text-[clamp(2.2rem,7.5vw,3.35rem)] leading-[1.05] tracking-[-0.03em] text-[#E8F5F0]">
          Your influence is real
          <br />
          Now it’s rewarding too
        </h1>
        <p className="-mt-2 max-w-[21rem] text-sm leading-[1.1] text-[#dff2ec]/90">
          For creators, connectors, and people whose
          <br />
          recommendations already move people.
        </p>
        <p className="mt-16 max-w-[11rem] text-left text-sm leading-tight tracking-[0.02em] text-[#dff2ec]/88">
          Flent&apos;s search for
          <br />
          <span className="italic">Tastemakers</span>
        </p>
        <div className="pointer-events-none -mt-2 flex justify-center py-3 select-none">
          <FloatingKey className="h-[17rem] w-[11.25rem] shrink-0" />
        </div>
        <div className="-mt-[calc(4rem+20px)] flex justify-end">
          <a
            href="#apply"
            aria-label="Jump to tastemaker application form"
            className="inline-flex items-center justify-center rounded-full bg-[#D4A853] px-8 py-2.5 text-sm font-medium tracking-wide text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,168,83,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/50 max-md:shadow-[0_5px_20px_rgba(212,168,83,0.24)] max-md:hover:-translate-y-0.5 max-md:hover:shadow-[0_7px_24px_rgba(212,168,83,0.3)] max-md:active:scale-[0.985] max-md:active:translate-y-px max-md:active:shadow-[0_3px_14px_rgba(212,168,83,0.34)] md:duration-500"
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
          <a
            href="https://www.flent.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Flent — visit flent.in"
            className="inline-block"
          >
            <img src="/flent-logo-white.png" alt="Flent" className="h-auto w-32" />
          </a>
          <br />
          <h1 className="font-display text-[3.35rem] leading-[0.92] tracking-[-0.03em] text-[#E8F5F0] xl:text-[4.5rem]">
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
