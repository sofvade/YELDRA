
import { NextResponse } from 'next/server'
import { createTicket } from '@/lib/store'

function detectIntent(message: string) {
  const m = (message || '').toLowerCase()
  const hasInvoice = /factura|invoice|pdf|xml/.test(m)
  const hasReturn = /devolver|devoluci[oó]n|cambio/.test(m)
  const orderIdMatch = m.match(/#?([A-Z]{2,}-\d{3,})/)
  const orderId = orderIdMatch?.[1] ?? 'FR-1025'
  if (hasReturn) return { intent: 'return' as const, orderId }
  if (hasInvoice) return { intent: 'invoice' as const, orderId }
  return { intent: 'support' as const, orderId }
}

export async function POST(req: Request) {
  const { message } = await req.json()
  const { intent, orderId } = detectIntent(message || '')
  let reply = ''

  if (intent === 'invoice') {
    reply = '¡Hecho! ✅ Aquí tienes tu factura PDF y el XML. ¿Necesitas iniciar una devolución o cambio?'
    createTicket({ type:'invoice', orderId, summary:`Factura enviada del pedido ${orderId}` })
  } else if (intent === 'return') {
    reply = 'Plazo OK. Te genero la etiqueta y programo la recogida para mañana 10–14h. Dejo el reembolso preparado. ¿Confirmas?'
    createTicket({ type:'return', orderId, summary:`Devolución iniciada del pedido ${orderId}` })
  } else {
    reply = 'Puedo ayudarte con factura, devoluciones/cambios, seguimiento y garantías. ¿Qué necesitas?'
    createTicket({ type:'support', summary:`Consulta general: "${(message||'').slice(0,80)}"` })
  }

  return NextResponse.json({ intent, orderId, reply })
}
