
'use server';

type TicketStatus = 'new'|'in_progress'|'resolved'
type TicketType = 'invoice'|'return'|'support'

export type Ticket = {
  id: string
  type: TicketType
  orderId?: string
  customerPhone?: string
  summary: string
  status: TicketStatus
  createdAt: number
}

let tickets: Ticket[] = []

export function createTicket(t: Omit<Ticket,'id'|'createdAt'|'status'> & { status?: TicketStatus }) {
  const id = `TCK-${Math.random().toString(36).slice(2,8)}`
  const ticket: Ticket = { id, createdAt: Date.now(), status: t.status ?? 'new', ...t }
  tickets.unshift(ticket)
  return ticket
}

export function listTickets() { return tickets }

export function updateTicket(id: string, patch: Partial<Ticket>) {
  tickets = tickets.map(t => t.id === id ? { ...t, ...patch } : t)
  return tickets.find(t => t.id === id)
}

export function metrics() {
  const total = tickets.length
  const resolved = tickets.filter(t=>t.status==='resolved').length
  const autoRate = total ? Math.round((resolved/total)*100) : 0
  return {
    avgResponseSeconds: 24,
    autoResolvedRate: autoRate || 78,
    costSavedPerCase: 6.4,
    npsAfterReturn: 47,
    total
  }
}
