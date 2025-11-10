import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({
    name: "YELDRA",
    tagline: "IA que hace crecer tu e-commerce.",
    features: [
      "Insights en tiempo real",
      "Automatiza campañas",
      "Predicción de ventas",
      "Panel unificado (Shopify, Ads, Email)",
    ],
  });
}
