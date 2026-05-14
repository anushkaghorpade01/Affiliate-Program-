import { handleSubmitApplicationRequest } from '../server/hubspotApplication'

/**
 * Vercel Serverless Function: POST JSON tastemaker application → HubSpot contact upsert.
 * Env: HUBSPOT_PRIVATE_APP_ACCESS_TOKEN (required); optional property mappings below.
 */
export default async function handler(req: { method?: string; body?: unknown }, res: {
  status: (code: number) => typeof res
  setHeader: (name: string, value: string) => void
  json: (data: unknown) => void
}): Promise<void> {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' })
    return
  }

  const raw =
    typeof req.body === 'string'
      ? req.body
      : typeof req.body === 'object' && req.body !== null
        ? JSON.stringify(req.body)
        : '{}'

  const { status, body } = await handleSubmitApplicationRequest(raw, process.env)
  res.status(status).json(body)
}
