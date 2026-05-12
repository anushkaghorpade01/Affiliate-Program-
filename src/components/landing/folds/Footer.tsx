const footerLinks = [
  { label: 'Flent', href: 'https://www.flent.in/', external: true },
  { label: 'Home', href: '/#home' },
  { label: "FAQ's", href: '/faq' },
  { label: 'Apply', href: '/#apply' },
]

/** Text-only row — same destinations as previous icon links; LinkedIn added for parity with reference. */
const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/flent.in/' },
  { label: 'X.com', href: 'https://x.com/flenthomes' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/company/flenthomes' },
  { label: 'YouTube', href: 'https://www.youtube.com/@FlentHomes' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-6 pb-4 pt-5 text-[#f4f1ea] max-md:pb-12 max-md:pt-10 md:min-h-[40vh] md:px-12 md:pb-6 md:pt-10">
      <div className="relative mx-auto max-w-7xl md:min-h-[22rem]">
        <img
          src="/flent-logo-white.png"
          alt="Flent"
          width={1120}
          height={220}
          className="w-[min(42vw,17rem)] opacity-90 max-md:w-[min(50vw,18.25rem)]"
          loading="lazy"
          decoding="async"
        />

        <p className="mt-[calc(1.25rem-6px)] max-w-[23rem] font-sans text-[clamp(0.675rem,2.7vw,0.7875rem)] font-medium uppercase leading-[1.08] tracking-[0.035em] max-md:mt-10 max-md:max-w-[min(24rem,92vw)] max-md:text-[clamp(0.78rem,3.15vw,0.9rem)] max-md:leading-[1.26] max-md:tracking-[0.072em] md:mt-6 md:max-w-[20rem] md:text-[clamp(0.78rem,0.92vw,1.05rem)] md:leading-[1.1] md:tracking-[0.04em]">
          <span className="text-[#f4f1ea]/92 max-md:text-[rgba(244,241,234,0.94)]">DISCOVERED</span>{' '}
          <span className="text-[#f4f1ea]/42 max-md:text-[rgba(244,241,234,0.36)]">THROUGH</span>{' '}
          <span className="text-[#f4f1ea]/92 max-md:text-[rgba(244,241,234,0.94)]">PEOPLE,</span>
          <br />
          <span className="text-[#f4f1ea]/92 max-md:text-[rgba(244,241,234,0.94)]">SHARED</span>{' '}
          <span className="text-[#f4f1ea]/42 max-md:text-[rgba(244,241,234,0.36)]">THROUGH</span>{' '}
          <span className="text-[#f4f1ea]/92 max-md:text-[rgba(244,241,234,0.94)]">TASTE</span>
        </p>

        <nav
          aria-label="Footer navigation"
          className="mt-5 flex items-start gap-x-6 text-left text-sm text-[#f4f1ea]/60 max-md:mt-11 max-md:gap-x-14 max-md:text-[0.9375rem] max-md:text-[rgba(244,241,234,0.58)] md:absolute md:left-0 md:top-[54%] md:mt-0 md:gap-x-10 md:text-base"
        >
          {[footerLinks.slice(0, 2), footerLinks.slice(2, 4)].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 max-md:gap-y-5 md:gap-6">
              {column.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="no-underline transition-colors duration-300 hover:text-[#f4f1ea]/88 max-md:hover:text-[rgba(244,241,234,0.9)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div
          className="hidden h-px w-full bg-[rgba(255,255,255,0.12)] max-md:mt-14 max-md:mb-10 max-md:block"
          aria-hidden
        />

        <nav
          aria-label="Social links"
          className="mt-[calc(1.25rem+10px)] flex flex-wrap items-baseline justify-center gap-x-8 gap-y-2 font-sans text-[0.65625rem] font-semibold leading-snug tracking-[0.02em] max-md:mt-0 max-md:w-full max-md:justify-between max-md:gap-x-3 max-md:gap-y-4 max-md:text-[0.8125rem] max-md:font-medium max-md:text-[rgba(255,255,255,0.42)] max-md:normal-case md:absolute md:bottom-5 md:left-0 md:mt-0 md:justify-start md:gap-x-14 md:text-[0.95rem] md:font-semibold md:text-[#f4f1ea]/72"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="no-underline transition-colors duration-300 max-md:whitespace-normal max-md:hover:text-[rgba(255,255,255,0.82)] md:whitespace-nowrap md:hover:text-[#f4f1ea]/88"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
