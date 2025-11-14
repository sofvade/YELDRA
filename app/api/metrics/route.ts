import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const mod = await import('@/lib/store');
  const listMetrics = (mod as any).listMetrics;
  const metrics = typeof listMetrics === 'function' ? await listMetrics() : [];
  return NextResponse.json({ metrics });
}
