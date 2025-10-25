
'use client'
import { useState } from 'react'
import ChatBubble from '@/components/ChatBubble'

type Msg = { from: 'user'|'bot', text: string }

async function fetchIntent(message: string) {
  const res = await fetch('/api/intents', { method:'POST', body: JSON.stringify({ message }) })
  return res.json()
}

export default function HomePage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'user', text: 'Hola, ¿me envías la factura del pedido #FR-1025?' },
    { from: 'bot', text: '¡Hecho! ✅ Aquí tienes la factura PDF y el XML. ¿Necesitas iniciar una devolución o cambio?' }
  ])
  const [input, setInput] = useState('Quiero devolver el producto.')
  const [busy, setBusy] = useState(false)

  const onSend = async () => {
    if (!input.trim()) return
    const userMsg: Msg = { from: 'user', text: input }
    setMsgs(m => [...m, userMsg])
    setInput('')
    setBusy(true)
    const { reply } = await fetchIntent(userMsg.text)
    setMsgs(m => [...m, { from:'bot', text: reply }])
    setBusy(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-4">
        <div className="text-sm font-medium mb-2">WhatsApp — Linea · Postventa</div>
        <div className="h-[440px] overflow-y-auto rounded-xl border bg-white p-3">
          {msgs.map((m, i) => <ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>)}
          {busy && <ChatBubble from="bot">Procesando…</ChatBubble>}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border rounded-xl px-3 py-2 text-sm" placeholder="Escribe un mensaje…"
            value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onSend()} />
          <button onClick={onSend} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm disabled:opacity-50" disabled={busy}>Enviar</button>
        </div>
        <div className="text-xs text-gray-500 mt-2">Demo local: sin conexión real a WhatsApp/Stripe/Logística.</div>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="card p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500">Tiempo medio de respuesta</div>
            <div className="text-2xl font-semibold mt-1">24 s</div>
          </div>
          <div className="card p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500">% Auto-resuelto</div>
            <div className="text-2xl font-semibold mt-1">78%</div>
          </div>
          <div className="card p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500">Ahorro/caso</div>
            <div className="text-2xl font-semibold mt-1">€6,40</div>
          </div>
          <div className="card p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500">NPS post-devolución</div>
            <div className="text-2xl font-semibold mt-1">47</div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Conexiones</div>
            <div className="flex gap-2 text-xs">
              <span className="badge bg-green-100 text-green-700">Shopify</span>
              <span className="badge bg-blue-100 text-blue-700">Stripe</span>
              <span className="badge bg-purple-100 text-purple-700">Factura/Veri*factu</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">Esta demo simula: emisión de factura, inicio de devolución con etiqueta y programación de recogida.</div>
        </div>
        <div className="card p-4">
          <div className="text-sm font-medium mb-2">Últimos tickets</div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Pedido FR-1025 · Factura enviada</span><span className="badge bg-emerald-100 text-emerald-700">Resuelto</span></li>
            <li className="flex justify-between"><span>DEV-7819 · Devolución creada</span><span className="badge bg-yellow-100 text-yellow-700">En curso</span></li>
            <li className="flex justify-between"><span>FAC-5042 · Reembolso completado</span><span className="badge bg-emerald-100 text-emerald-700">Resuelto</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
