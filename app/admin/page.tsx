
'use client'
import { useEffect, useState } from 'react'

type Metrics = { avgResponseSeconds: number, autoResolvedRate: number, costSavedPerCase: number, npsAfterReturn: number, total: number }
type Ticket = { id: string, type: string, orderId?: string, status: string, summary: string, createdAt: number }

export default function AdminPage() {
  const [metrics, setMetrics] = useState<Metrics|null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(()=>{
    fetch('/api/metrics').then(r=>r.json()).then(setMetrics)
    fetch('/api/tickets').then(r=>r.json()).then(setTickets)
  }, [])

  return (
    <div className="grid gap-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-xs text-gray-500 uppercase">Tiempo medio</div>
          <div className="text-2xl font-semibold mt-1">{metrics?.avgResponseSeconds ?? 0} s</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-500 uppercase">% Auto-resuelto</div>
          <div className="text-2xl font-semibold mt-1">{metrics?.autoResolvedRate ?? 0}%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-500 uppercase">Ahorro/caso</div>
          <div className="text-2xl font-semibold mt-1">€{metrics?.costSavedPerCase ?? 0}</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-500 uppercase">NPS post-devolución</div>
          <div className="text-2xl font-semibold mt-1">{metrics?.npsAfterReturn ?? 0}</div>
        </div>
      </div>

      <div className="card p-4">
        <div className="text-sm font-medium mb-2">Tickets</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">ID</th><th>Tipo</th><th>Pedido</th><th>Estado</th><th>Resumen</th><th>Creado</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.id}</td>
                <td>{t.type}</td>
                <td>{t.orderId ?? '-'}</td>
                <td><span className="badge bg-gray-100">{t.status}</span></td>
                <td className="max-w-[360px] truncate">{t.summary}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
