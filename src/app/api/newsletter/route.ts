import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/newsletter-schema'
import { subscribe } from '@/lib/newsletter'

/** Inscrição na newsletter. Valida server-side, checa honeypot, encaminha ao ESP (mock). */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = newsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 })
  }

  // Honeypot preenchido => bot. Responde 200 sem sinalizar a detecção.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    const result = await subscribe(parsed.data)
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 })
    }
    return NextResponse.json({ ok: true, mocked: result.mocked })
  } catch (err) {
    console.error('[api/newsletter] erro', err)
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 })
  }
}
