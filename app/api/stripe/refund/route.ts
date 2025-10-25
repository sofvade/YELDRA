
import { NextResponse } from 'next/server'

// Stub: In production call Stripe's Refunds API with STRIPE_SECRET_KEY
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}))
  const { payment_intent, amount, reason } = body
  // TODO: stripe.refunds.create({ payment_intent, amount, reason })
  return NextResponse.json({ ok: true, refund: { id: 're_123demo', amount, reason, status: 'succeeded' } })
}
