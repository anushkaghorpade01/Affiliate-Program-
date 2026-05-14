import { PRINCIPAL_HEADLINE_CLASSNAME } from '@/components/landing/principalHeadlineClassName'
import { PRINCIPAL_SUPPORT_MOBILE_COMBINED } from '@/components/landing/principalSupportingMobileTypography'
import { FloatingKey } from '@/components/landing/shared/FloatingKey'
import { HeroMobileShare } from '@/components/landing/shared/HeroMobileShare'
import { cn } from '@/lib/utils'

const captionGold = 'text-[#d4b878]/96'

/** Mobile hero only — compact pill / small label (desktop uses its own CTA classes). */
const mobileApplyClasses =
  'inline-flex items-center justify-center rounded-full bg-[#d4a754] px-[calc(2rem+2px)] py-[calc(9px+1px)] font-sans text-[calc(14px+1px)] font-semibold tracking-[0.02em] text-white shadow-[0_8px_24px_rgba(212,167,84,0.35),inset_0_1px_0_rgba(255,255,255,0.32)] brightness-105 contrast-[1.03] transition-[transform,box-shadow,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_11px_30px_rgba(212,167,84,0.42),inset_0_1px_0_rgba(255,255,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a754]/40'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative z-[3] h-[calc(56rem-80px)] scroll-mt-0 overflow-x-hidden px-6 pb-5 pt-5 max-md:z-[3] max-md:overflow-visible md:z-auto md:h-[calc(clamp(42rem,55.8vw,72rem)+6rem)] md:overflow-hidden md:px-12 md:pb-0 md:pt-16"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 flex items-center justify-center max-md:z-0 max-md:[-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_71%,transparent_100%)] max-md:[mask-image:linear-gradient(to_bottom,#000_0%,#000_71%,transparent_100%)] md:[-webkit-mask-image:none] md:[mask-image:none]"
      >
        <img
          src="/hero-background.png"
          alt=""
          className="h-full w-full origin-center object-cover -scale-x-100"
        />
      </div>

      <div className="relative z-[4] mx-auto flex w-full max-w-lg flex-col items-center text-center md:hidden">
        <div className="mb-[calc(1.25rem+18px)] flex h-10 w-full max-w-xl items-center justify-between gap-3 self-stretch">
          <a
            href="https://www.flent.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Flent — visit flent.in"
            className="flex h-full w-24 shrink-0 items-center justify-start"
          >
            <img
              src="/flent-logo-white.png"
              alt="Flent"
              className="max-h-full w-full object-contain object-left"
            />
          </a>
          <HeroMobileShare className="h-full shrink-0" />
        </div>

        <h1
          className={cn(
            'mt-2 flex flex-col items-center gap-[6px] text-white',
            PRINCIPAL_HEADLINE_CLASSNAME,
          )}
        >
          <span className="block">Your influence is real.</span>
          <span className="block">Now it’s rewarding too.</span>
        </h1>

        <p className={cn('font-sans text-white/92', PRINCIPAL_SUPPORT_MOBILE_COMBINED)}>
          Your recommendations can earn you up to ₹1 lakh.
        </p>

        <div className="mt-[calc(2rem-7.5px)]">
          <a
            href="#apply"
            aria-label="Jump to tastemaker application form"
            className={mobileApplyClasses}
          >
            Apply Now
          </a>
        </div>

        <div className="relative mx-auto mt-12 h-[min(58svh,24.5rem)] w-full max-w-[min(92vw,21.5rem)]">
          <p
            className={`pointer-events-none absolute left-[12%] top-[33%] z-[2] max-w-[7.8rem] text-left font-sans text-[0.62rem] font-normal leading-[1.3] tracking-[0.035em] ${captionGold}`}
          >
            Flent&apos;s search for
            <br />
            <span className="font-sans italic">Tastemakers</span>
          </p>

          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center pt-[4%] select-none">
            <FloatingKey className="relative h-[min(105vw,68rem)] w-[min(75vw,40rem)] -rotate-[4deg]" />
          </div>

          <p
            className={`pointer-events-none absolute left-[68%] top-[60%] z-[2] max-w-[6.4rem] text-left font-sans text-[0.62rem] font-normal leading-[1.3] tracking-[0.035em] ${captionGold}`}
          >
            Limited spots
            <br />
            available
          </p>
        </div>
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
          <h1 className={cn(PRINCIPAL_HEADLINE_CLASSNAME, 'text-[#E8F5F0]')}>
            Your influence is real
            <br />
            Now it’s rewarding too
          </h1>
          <p className="max-w-xl text-[calc(1.25rem+1.5px)] leading-relaxed text-[#dff2ec]/80">
            For creators, connectors, and people whose recommendations already move people. <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            Share Flent within your circles, create around it, or help someone find their next home. Your recommendations now get rewarded.
          </p>
        </div>

        <div className="relative mt-10 flex min-h-[560px] items-start justify-start lg:mt-0">
          <div className="pointer-events-none absolute left-[-18%] top-[8%] select-none">
            <FloatingKey className="z-10 h-[31rem] w-[22rem] xl:h-[35rem] xl:w-[25rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}
