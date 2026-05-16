import type { IncomingMessage } from 'node:http'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { handleSubmitApplicationRequest } from './api/submit-application'

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

/** Dev-only: mirrors Vercel `POST /api/submit-application` so the token stays server-side. */
function hubspotSubmitDevPlugin(): Plugin {
  return {
    name: 'hubspot-submit-application-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''
        if (pathname !== '/api/submit-application' || req.method !== 'POST') {
          next()
          return
        }
        try {
          const env = loadEnv(server.config.mode, process.cwd(), '')
          const merged = { ...process.env, ...env }
          const raw = await readRequestBody(req as IncomingMessage)
          const { status, body } = await handleSubmitApplicationRequest(raw, merged)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, message: 'Internal server error' }))
        }
      })
    },
  }
}

/** Default share image: dedicated Fold 1 screenshot for link previews only (`public/og-fold1-hero.png`). */
const DEFAULT_OG_IMAGE_PATH = '/og-fold1-hero.png'

function normalizePublicPath(raw: string | undefined): string {
  const t = raw?.trim() || DEFAULT_OG_IMAGE_PATH
  return t.startsWith('/') ? t : `/${t}`
}

/**
 * WhatsApp / Facebook / LinkedIn need an absolute https `og:image`; relative URLs are often ignored.
 * Merge `process.env` with `loadEnv()` — Vercel dashboard vars live in `process.env`, not `.env` files.
 */
function siteOriginForOg(env: Record<string, string | undefined>): string | undefined {
  const trimmed =
    env.VITE_SITE_ORIGIN?.trim().replace(/\/$/, '') ||
    env.SITE_URL?.trim().replace(/\/$/, '')
  if (trimmed) return trimmed

  const prod = env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (prod) {
    return prod.startsWith('http') ? prod.replace(/\/$/, '') : `https://${prod.replace(/\/$/, '')}`
  }

  const vercel = env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel}`
  return undefined
}

function ogImageAbsoluteUrlPlugin(
  env: Record<string, string | undefined>,
  ogImagePath: string,
): Plugin {
  return {
    name: 'og-image-absolute-url',
    transformIndexHtml(html) {
      const origin = siteOriginForOg(env)
      const path = ogImagePath
      const imageUrl = origin ? `${origin}${path}` : path
      if (!origin) {
        console.warn(
          '[vite] og:image has no site origin — using a relative path. Social crawlers usually require an absolute https URL.\n' +
            '  Set VITE_SITE_ORIGIN (e.g. https://www.flent.in) in .env.production or Vercel env, or rely on VERCEL_URL during the Vercel build.',
        )
      }
      return html.split('__OG_IMAGE_URL__').join(imageUrl)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envFromFiles = loadEnv(mode, process.cwd(), '')
  /** Vercel / CI inject vars into `process.env`; `loadEnv` only reads `.env*` files. */
  const env: Record<string, string | undefined> = { ...envFromFiles, ...process.env }
  const ogImagePath = normalizePublicPath(env.VITE_OG_IMAGE)

  return {
    plugins: [react(), tailwindcss(), ogImageAbsoluteUrlPlugin(env, ogImagePath), hubspotSubmitDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
