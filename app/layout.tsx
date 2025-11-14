// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"; // 👈

export const metadata: Metadata = {
  title: "Yeldra",
  description: "IA que hace crecer tu e-commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        {/* Solo reporta en producción (dominios de Vercel). Puedes dejarlo siempre */}
        <SpeedInsights />
        {/* O, si prefieres, solo en prod:
        {process.env.NODE_ENV === "production" && <SpeedInsights />} */}
      </body>
    </html>
  );
}
