
import { NextResponse } from 'next/server'

// Stub: In production call WhatsApp Cloud API /messages with WHATSAPP_TOKEN
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}))
  const { to, template, variables } = body
  return NextResponse.json({ queued: true, to, template, variables })
}
