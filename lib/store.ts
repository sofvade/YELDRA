export type TicketStatus = "new" | "open" | "closed";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: number;
};

let tickets: Ticket[] = [];

// Server Action 1
export async function createTicket(
  t: Omit<Ticket, "id" | "createdAt" | "status"> & { status?: TicketStatus }
) {
  "use server"; // ← anotación por función
  const id = `TCK_${Math.random().toString(36).slice(2, 8)}`;
  const ticket: Ticket = { id, createdAt: Date.now(), status: t.status ?? "new", ...t };
  tickets.unshift(ticket);
  return ticket;
}

// Server Action 2
export async function listTickets() {
  "use server"; // ← anotación por función
  return tickets;
}

