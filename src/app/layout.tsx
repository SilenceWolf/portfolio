// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Louis Guillory — Silence Wolf | Portfolio',
  description:
    'Portfolio de Louis Guillory (Silence Wolf) — Apprenti Ingénieur, Dev & Créatif, CY Tech.',
  keywords: ['portfolio', 'ingénieur', 'développeur', 'CY Tech', 'Louis Guillory'],
  authors: [{ name: 'Louis Guillory', url: 'mailto:louis.guillory@edu.esiee-it.fr' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* JetBrains Mono pour le style terminal/code qu'on veut partout */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
