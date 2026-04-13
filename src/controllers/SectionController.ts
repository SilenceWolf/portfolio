// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

// La classe abstraite SectionController sert de contrat commun à toutes les sections.
// Chaque section concrète doit déclarer son id, son label de navigation et son thème.
// Les données métier sont laissées aux sous-classes — ce niveau ne connaît que la structure.

import type { SectionTheme } from '@/lib/themes'

export abstract class SectionController {
  abstract readonly id: string
  abstract readonly label: string
  abstract readonly theme: SectionTheme
}
