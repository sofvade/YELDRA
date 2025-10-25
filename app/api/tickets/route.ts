
import { NextResponse } from 'next/server'
import { listTickets } from '@/lib/store'

export async function GET() {
  return NextResponse.json(listTickets())
}
