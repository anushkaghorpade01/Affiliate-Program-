import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function ShareGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="18" cy="5" r="2.25" fill="currentColor" />
      <circle cx="6" cy="12" r="2.25" fill="currentColor" />
      <circle cx="18" cy="19" r="2.25" fill="currentColor" />
      <path
        d="M8 11.25 14.5 7M8 12.75 14.5 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.47-4.45-9.92-9.91-9.92zm5.52 13.86c-.24.67-.97 1.24-1.59 1.42-.43.12-.98.22-3.18-.67-2.67-1.13-4.38-3.87-4.51-4.05-.13-.18-1.08-1.44-1.08-2.75 0-1.31.68-1.96.92-2.23.24-.26.53-.33.71-.33.18 0 .36 0 .52.01.17.01.39-.06.61.46.22.54.76 1.85.83 1.99.07.13.12.29.02.47-.1.18-.15.29-.3.45-.15.15-.32.34-.46.46-.14.11-.29.24-.13.46.16.22.71 1.17 1.54 1.9 1.06.95 1.95 1.24 2.23 1.39.28.15.44.13.6-.08.16-.21.69-.8.87-1.07.18-.27.36-.23.6-.14.24.1 1.52.72 1.78.85.26.13.43.2.49.31.06.11.06.64-.18 1.31z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 13a5 5 0 010-7l1.2-1.2a5 5 0 017.07 7.07L17 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 010 7l-1.2 1.2a5 5 0 01-7.07-7.07L7 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeroMobileShare({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const wa = () => {
    const text = encodeURIComponent(shareUrl)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const x = () => {
    const u = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?url=${u}`, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
      setOpen(false)
    } catch {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={cn('pointer-events-auto relative z-[45]', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Share this page"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dff2ec]/12 bg-[#dff2ec]/[0.05] text-[#dff2ec]/65 shadow-none backdrop-blur-[2px] transition hover:border-[#dff2ec]/18 hover:bg-[#dff2ec]/[0.08] hover:text-[#dff2ec]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/35 active:scale-[0.97]"
      >
        <ShareGlyph className="h-[17px] w-[17px]" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Share via"
          className="absolute right-0 top-[calc(100%+6px)] z-50 flex gap-0.5 rounded-xl border border-[#dff2ec]/14 bg-[#001811]/90 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <button
            type="button"
            aria-label="Share on WhatsApp"
            onClick={wa}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#25D366] transition hover:bg-[#dff2ec]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/35"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Share on X"
            onClick={x}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#dff2ec]/80 transition hover:bg-[#dff2ec]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/35"
          >
            <XIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={copied ? 'Link copied' : 'Copy link'}
            onClick={copy}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#dff2ec]/70 transition hover:bg-[#dff2ec]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/35"
          >
            <LinkIcon className="h-[17px] w-[17px]" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
