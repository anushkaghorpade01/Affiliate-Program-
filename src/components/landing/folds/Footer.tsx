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
    <footer className="relative overflow-hidden bg-black px-6 pb-4 pt-5 text-[#f4f1ea] md:min-h-[40vh] md:px-12 md:pb-6 md:pt-10">
      <div className="relative mx-auto max-w-[92rem] md:min-h-[22rem]">
        <img
          src="/flent-logo-white.png"
          alt="Flent"
          width={1120}
          height={220}
          className="w-[min(42vw,17rem)] opacity-90"
          loading="lazy"
          decoding="async"
        />

        <p className="mt-5 max-w-[23rem] font-sans text-[clamp(0.9rem,1.55vw,1.55rem)] font-medium uppercase leading-[1.08] tracking-[0.035em] text-[#f4f1ea]/92 md:mt-6 md:max-w-[20rem] md:text-[clamp(0.78rem,0.92vw,1.05rem)] md:leading-[1.1] md:tracking-[0.04em]">
          DISCOVERED <span className="text-[#f4f1ea]/42">THROUGH</span> PEOPLE,
          <br />
          SHARED <span className="text-[#f4f1ea]/42">THROUGH</span> TASTE
        </p>

        <nav
          aria-label="Footer navigation"
          className="mt-5 flex items-start gap-x-6 text-left text-sm text-[#f4f1ea]/60 md:absolute md:left-0 md:top-[54%] md:mt-0 md:gap-x-10 md:text-base"
        >
          {[footerLinks.slice(0, 2), footerLinks.slice(2, 4)].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 md:gap-6">
              {column.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="transition-opacity duration-300 hover:text-[#f4f1ea]/88"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <nav
          aria-label="Social links"
          className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-sans text-[0.8125rem] font-semibold leading-snug tracking-[0.02em] text-[#f4f1ea]/88 md:absolute md:bottom-5 md:left-0 md:mt-0 md:gap-x-14 md:text-[0.95rem]"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap transition-opacity duration-300 hover:text-[#f4f1ea]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
