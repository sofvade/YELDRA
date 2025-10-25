
import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Linea OS — Pilot',
  description: 'Receipts, Devoluciones & Post-venta por chat',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b bg-white">
          <div className="container-max flex items-center gap-4 py-3">
            <Image src="/logo.svg" alt="Linea OS" width={120} height={32} />
            <div className="text-sm text-gray-500">Demo interactiva · WhatsApp-like + Panel</div>
            <a href="/admin" className="ml-auto text-sm font-medium text-sky-700 hover:underline">Panel</a>
            <a href="https://vercel.com/new" target="_blank" className="text-sm text-gray-600 hover:underline">Deploy</a>
          </div>
        </header>
        <main className="container-max py-8">{children}</main>
        <footer className="container-max py-6 text-xs text-gray-500">© {new Date().getFullYear()} Linea OS (Pilot). Demo no conectada a sistemas reales.</footer>
      </body>
    </html>
  )
}
