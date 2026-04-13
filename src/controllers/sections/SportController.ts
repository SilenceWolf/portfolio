// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { sportData } from '@/lib/data'

export class SportController extends SectionController {
  readonly id = 'sport'
  readonly label = 'Sport'
  readonly theme: SectionTheme = themes.dojo

  readonly section_title = '道場 — Sport'
  readonly sports = sportData
}

export const sportController = new SportController()
