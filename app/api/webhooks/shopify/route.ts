
import { NextResponse } from 'next/server'

// NOTE: This is a minimal stub for local testing. In production:
// - Read the raw body (disable body parsing) to verify HMAC with SHOPIFY_WEBHOOK_SECRET
// - Handle topics: orders/create, orders/updated, refunds/create
// - Upsert orders, create tickets, trigger notifications

export async function POST(req: Request) {
  const topic = req.headers.get('x-shopify-topic') || 'unknown'
  const shop = req.headers.get('x-shopify-shop-domain') || 'unknown.myshopify.com'
  const payload = await req.json().catch(()=>({}))

  // TODO: verify HMAC here and persist payload
  return NextResponse.json({ ok: true, topic, shop, received: true, sample: !!payload })
}
