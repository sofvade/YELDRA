// lib/store.ts

/** ---------- Tickets ---------- */
export type TicketStatus = "new" | "open" | "closed";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: number;
};

export type CreateTicketInput = {
  summary?: string;
  title?: string;
  description?: string;
  orderId?: string;
  type?: "invoice" | "return" | "support" | string;
  status?: TicketStatus;
};

let tickets: Ticket[] = [];

export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  "use server";

  const id = `TCK_${Math.random().toString(36).slice(2, 8)}`;
  const title = input.title ?? input.summary ?? "Ticket";
  const description =
    input.description ??
    ([
      input.type ? `Tipo: ${input.type}` : null,
      input.orderId ? `Pedido: ${input.orderId}` : null,
    ]
      .filter(Boolean)
      .join(" · ") || "—");

  const ticket: Ticket = {
    id,
    title,
    description,
    status: input.status ?? "new",
    createdAt: Date.now(),
  };

  tickets.unshift(ticket);
  return ticket;
}

export async function listTickets() {
  "use server";
  return tickets;
}

/** ---------- Metrics ---------- */
export type Metric = { name: string; value: number; updatedAt: number };
export const metrics: Metric[] = [];
export function listMetrics(): Metric[] {
  return metrics;
}
