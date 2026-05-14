/**
 * HubSpot CRM upsert for tastemaker applications (runs server-side only).
 */

export type TastemakerApplicationPayload = {
  fullName: string
  email: string
  city: string
  socialLinks: string[]
  homeAnswer: string
}

const HUBSPOT_API = 'https://api.hubapi.com'

export function splitName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim()
  if (!trimmed) return { firstname: '', lastname: '' }
  const parts = trimmed.split(/\s+/)
  const firstname = parts[0] ?? ''
  const lastname = parts.length > 1 ? parts.slice(1).join(' ') : ''
  return { firstname, lastname }
}

export function buildDetailsBlob(payload: TastemakerApplicationPayload): string {
  const links = payload.socialLinks.filter(Boolean)
  const lines = [
    links.length ? `Social profiles:\n${links.map((u, i) => `${i + 1}. ${u}`).join('\n')}` : '',
    payload.city.trim() ? `City: ${payload.city.trim()}` : '',
    payload.homeAnswer.trim() ? `What makes a house a home:\n${payload.homeAnswer.trim()}` : '',
  ].filter(Boolean)
  return lines.join('\n\n')
}

export type HubspotEnvOptions = {
  applicationDetailsProperty?: string
  applicantFlagProperty?: string
  applicantFlagValue?: string
}

export async function upsertTastemakerContact(
  payload: TastemakerApplicationPayload,
  token: string,
  hubspotOptions?: HubspotEnvOptions,
): Promise<{ ok: true; contactId: string; created: boolean } | { ok: false; status: number; message: string }> {
  const email = payload.email.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, message: 'Valid email is required.' }
  }

  const { firstname, lastname } = splitName(payload.fullName)
  const detailsBlob = buildDetailsBlob(payload)

  const properties: Record<string, string> = {
    email,
    ...(firstname.trim() ? { firstname: firstname.trim() } : {}),
    ...(lastname.trim() ? { lastname: lastname.trim() } : {}),
    ...(payload.city.trim() ? { city: payload.city.trim() } : {}),
  }

  const detailsProp = hubspotOptions?.applicationDetailsProperty?.trim()
  if (detailsProp && detailsBlob) {
    properties[detailsProp] = detailsBlob
  }

  const flagProp = hubspotOptions?.applicantFlagProperty?.trim()
  const flagVal = hubspotOptions?.applicantFlagValue?.trim()
  const hasFlagProp = Boolean(flagProp)
  const hasFlagVal = Boolean(flagVal)
  if (hasFlagProp !== hasFlagVal) {
    console.warn(
      '[hubspot] Set both HUBSPOT_APPLICANT_FLAG_PROPERTY and HUBSPOT_APPLICANT_FLAG_VALUE (dropdown internal value), or omit both.',
    )
  }
  if (flagProp && flagVal !== undefined && flagVal !== '') {
    properties[flagProp] = flagVal
  }

  const searchRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
        },
      ],
      properties: ['email'],
      limit: 1,
    }),
  })

  if (!searchRes.ok) {
    const text = await searchRes.text()
    return {
      ok: false,
      status: 502,
      message: `HubSpot search failed (${searchRes.status}): ${text.slice(0, 280)}`,
    }
  }

  const searchJson = (await searchRes.json()) as { total?: number; results?: { id: string }[] }
  const existingId = searchJson.results?.[0]?.id

  if (existingId) {
    const patchRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/${existingId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    })
    if (!patchRes.ok) {
      const text = await patchRes.text()
      return {
        ok: false,
        status: 502,
        message: `HubSpot update failed (${patchRes.status}): ${text.slice(0, 280)}`,
      }
    }
    return { ok: true, contactId: existingId, created: false }
  }

  const createRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  })

  if (!createRes.ok) {
    const text = await createRes.text()
    return {
      ok: false,
      status: 502,
      message: `HubSpot create failed (${createRes.status}): ${text.slice(0, 280)}`,
    }
  }

  const created = (await createRes.json()) as { id?: string }
  const id = created.id
  if (!id) {
    return { ok: false, status: 502, message: 'HubSpot create returned no contact id.' }
  }
  return { ok: true, contactId: id, created: true }
}

export type ParsePayloadResult = TastemakerApplicationPayload | { error: string }

export function parseApplicationPayload(raw: string): ParsePayloadResult {
  const MAX = 120_000
  if (raw.length > MAX) return { error: 'Payload too large' }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return { error: 'Invalid JSON body' }
  }

  if (!body || typeof body !== 'object') return { error: 'Invalid body' }
  const o = body as Record<string, unknown>

  if (typeof o.fullName !== 'string') return { error: 'fullName is required' }
  if (typeof o.email !== 'string') return { error: 'email is required' }
  if (typeof o.city !== 'string') return { error: 'city is required' }
  if (typeof o.homeAnswer !== 'string') return { error: 'homeAnswer is required' }

  const socialLinks = Array.isArray(o.socialLinks)
    ? o.socialLinks.filter((x): x is string => typeof x === 'string').slice(0, 5)
    : []

  return {
    fullName: o.fullName,
    email: o.email,
    city: o.city,
    socialLinks,
    homeAnswer: o.homeAnswer,
  }
}

export function hubspotOptionsFromEnv(env: NodeJS.ProcessEnv): HubspotEnvOptions {
  return {
    applicationDetailsProperty: env.HUBSPOT_APPLICATION_DETAILS_PROPERTY,
    applicantFlagProperty: env.HUBSPOT_APPLICANT_FLAG_PROPERTY,
    applicantFlagValue: env.HUBSPOT_APPLICANT_FLAG_VALUE,
  }
}

export async function handleSubmitApplicationRequest(jsonBody: string, env: NodeJS.ProcessEnv) {
  const token = env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN?.trim()
  if (!token) {
    return { status: 500 as const, body: { ok: false as const, message: 'HubSpot is not configured.' } }
  }

  const parsed = parseApplicationPayload(jsonBody)
  if ('error' in parsed) {
    return { status: 400 as const, body: { ok: false as const, message: parsed.error } }
  }

  const result = await upsertTastemakerContact(parsed, token, hubspotOptionsFromEnv(env))

  if (!result.ok) {
    return { status: result.status >= 400 && result.status < 600 ? result.status : 502, body: { ok: false as const, message: result.message } }
  }

  return {
    status: 200 as const,
    body: { ok: true as const, contactId: result.contactId, created: result.created },
  }
}
