// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

// Logger minimaliste — uniquement en dev, silencieux en prod.
// Ça évite de laisser des console.log partout en oubliant de les retirer.

const is_dev = process.env.NODE_ENV === 'development'

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (is_dev) console.info(`[SW] ${message}`, ...args)
  },
  warn: (message: string, ...args: unknown[]) => {
    if (is_dev) console.warn(`[SW WARN] ${message}`, ...args)
  },
  error: (message: string, ...args: unknown[]) => {
    // Les erreurs passent toujours, même en prod
    console.error(`[SW ERROR] ${message}`, ...args)
  },
}
