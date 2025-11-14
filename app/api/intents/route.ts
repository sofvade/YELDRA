import { NextResponse } from "next/server";

type Intent = "invoice" | "return" | "support";

function detectIntent(message: string): { intent: Intent; orderId: string } {
  const m = (message || "").toLowerCase();
  const hasInvoice = /factura|invoice|pdf|xml/.test(m);
  const hasReturn  = /devolver|devoluci[oó]n|cambio/.test(m);
  const orderIdMatch = m.match(/#?([A-Z]{2,}-\d{3,})/);
  const orderId = orderIdMatch?.[1] ?? "FR-1025";
  if (hasReturn)  return { intent: "return",  orderId };
  if (hasInvoice) return { intent: "invoice", orderId };
  return { intent: "support", orderId };
}

export const dynamic = "force-dynamic"; // evita caché en el handler

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as { message?: string }));
    const { message = "" } = body;
    const { intent, orderId } = detectIntent(message);
    let reply = "";

    if (intent === "invoice") {
      reply = "¡Hecho! ✅ Aquí tienes tu factura PDF y el XML. ¿Necesitas iniciar una devolución o cambio?";
      await createTicket({ summary: `Factura enviada del pedido ${orderId}`, orderId, type: "invoice" });
    } else if (intent === "return") {
      reply = "Plazo OK. Te genero la etiqueta y programo la recogida para mañana 10–14h. Dejo el reembolso preparado. ¿Confirmas?";
      await createTicket({ summary: `Devolución iniciada del pedido ${orderId}`, orderId, type: "return" });
    } else {
      reply = "Puedo ayudarte con factura, devoluciones/cambios, seguimiento y garantías. ¿Qué necesitas?";
      await createTicket({ summary: `Consulta general: "${message.slice(0, 80)}"`, type: "support" });
    }

    return NextResponse.json({ intent, orderId, reply });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
async function createTicket({
  summary,
  orderId,
  type,
}: {
  summary: string;
  orderId?: string;
  type: Intent;
}): Promise<void> {
  const payload = {
    summary,
    type,
    orderId: orderId ?? null,
    source: "linea-pilot",
    createdAt: new Date().toISOString(),
  };

  const url = process.env.TICKET_API_URL ?? "https://tickets.example.com/api/v1/tickets";
  const apiKey = process.env.TICKET_API_KEY;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("createTicket failed", { status: res.status, body });
    }
  } catch (err) {
    console.error("createTicket error", err);
  }
}

