
import { NextResponse } from 'next/server'
import { metrics } from '@/lib/store'

export async function GET() {
  return NextResponse.json(metrics())
}
