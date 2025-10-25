
# Linea OS — Pilot (Next.js + Vercel)

Demo funcional (local) del rail de post‑venta por chat: **facturas**, **devoluciones** y **reembolsos**. 
Incluye una simulación de WhatsApp y un **panel** con KPIs y tickets.

## Requisitos
- Node 18+
- PNPM o NPM
- (Opcional) Vercel CLI

## Arranque local
```bash
pnpm install   # o npm install
pnpm dev       # o npm run dev
# Abre http://localhost:3000
```

## Qué incluye
- **/app/page.tsx** — chat simulado (WhatsApp‑like) con intents (factura/devolución/soporte).
- **/app/admin/page.tsx** — panel con KPIs y tickets.
- **/app/api/** — endpoints de demo (intents, métricas, tickets).
- **/lib/store.ts** — almacén en memoria (cámbialo por Postgres/Supabase en producción).
- **/data/orders.json** — ejemplo de pedido (FR-1025).

## Despliegue en Vercel
1. Crea un repo con estos archivos.
2. Conecta a Vercel (import project) y deploy.
3. Añade posteriormente tus conectores reales (Shopify/Woo/Stripe/Logística) y variables de entorno.

## Siguientes pasos (producción)
- Sustituir **store** por base de datos.
- Implementar **webhooks** reales (Shopify: orders/create, refunds/create).
- Añadir **Stripe Refunds** y conector de **etiquetas** (Packlink/Sendcloud).
- Integrar **WhatsApp Cloud API** (plantillas utility/service) en un microservicio.

> Esta demo es *stateless* y no persiste tras reinicios en un serverless. Está pensada para ventas y prototipado rápido.


---

## Endpoints de ejemplo añadidos
- `POST /api/webhooks/shopify` — Stub para recibir webhooks (orders/refunds). Añade verificación HMAC en prod.
- `POST /api/stripe/refund` — Stub de reembolso (integra Stripe oficial en prod).
- `POST /api/whatsapp/send` — Stub para enviar plantilla por WhatsApp Cloud API.

### Variables de entorno
Copia `.env.example` a `.env.local` y completa tus claves cuando conectes servicios reales.
