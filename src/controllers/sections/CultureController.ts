// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { interestData } from '@/lib/data'

export class CultureController extends SectionController {
  readonly id = 'culture'
  readonly label = 'Passions'
  readonly theme: SectionTheme = themes.japan

  readonly section_title = '文化 — Centres d\'intérêt'
  readonly subtitle = 'Culture Japonaise · Dessin'
  readonly interests = interestData

}

export const cultureController = new CultureController()
