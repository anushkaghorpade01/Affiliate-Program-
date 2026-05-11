const footerLinks = [
  { label: 'Flent', href: 'https://www.flent.in/', external: true },
  { label: 'Home', href: '/#home' },
  { label: "FAQ's", href: '/faq' },
  { label: 'Apply', href: '/#apply' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/flent.in/', icon: '/social/instagram.svg' },
  { label: 'X', href: 'https://x.com/flenthomes', icon: '/social/x.png' },
  { label: 'YouTube', href: 'https://www.youtube.com/@FlentHomes', icon: '/social/youtube.svg' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-6 pb-8 pt-12 text-[#f4f1ea] md:min-h-[58vh] md:px-12 md:pb-10 md:pt-14">
      <div className="relative mx-auto min-h-[30rem] max-w-[92rem] md:min-h-[34rem]">
        <img
          src="/flent-logo-white.png"
          alt="Flent"
          width={1120}
          height={220}
          className="w-[min(42vw,17rem)] opacity-90"
          loading="lazy"
          decoding="async"
        />

        <p className="mt-7 max-w-[23rem] font-sans text-[clamp(0.9rem,1.55vw,1.55rem)] font-medium uppercase leading-[1.08] tracking-[0.035em] text-[#f4f1ea]/92 md:mt-8">
          <span className="text-[#d87542]">/</span> DISCOVERED <span className="text-[#f4f1ea]/42">THROUGH</span> PEOPLE,
          <br />
          SHARED <span className="text-[#f4f1ea]/42">THROUGH</span> TASTE
        </p>

        <nav aria-label="Footer navigation" className="absolute right-0 top-[33%] flex flex-col gap-5 text-sm text-[#f4f1ea]/60 md:top-[32%] md:gap-6 md:text-base">
          {footerLinks.map((link) => (
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
        </nav>

        <div className="absolute bottom-0 left-0 space-y-4 font-sans text-xs leading-none text-[#f4f1ea]/22 md:text-sm">
          <div className="flex gap-4 text-[#f4f1ea]/42">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Flent on ${link.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f4f1ea]/18 transition duration-300 hover:border-[#f4f1ea]/45 hover:opacity-80"
              >
                <img src={link.icon} alt="" className="h-3.5 w-3.5 object-contain invert" loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
          <div className="flex gap-5">
            <a href="#" className="transition-opacity duration-300 hover:text-[#f4f1ea]/55">
              Privacy Policy
            </a>
            <a href="#" className="transition-opacity duration-300 hover:text-[#f4f1ea]/55">
              Terms
            </a>
          </div>
          <p>©2026. All data is protected</p>
        </div>
      </div>
    </footer>
  )
}
