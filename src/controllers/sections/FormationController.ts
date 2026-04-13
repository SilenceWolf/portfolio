// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { formations, languages } from '@/lib/data'
import type { FormationItem, LanguageItem } from '@/lib/data'

export class FormationController extends SectionController {
  readonly id = 'formation'
  readonly label = 'Formation'
  readonly theme: SectionTheme = themes.hologram

  readonly section_title = 'Parcours & Formation'
  readonly formations: FormationItem[] = formations
  readonly languages: LanguageItem[] = languages
}

export const formationController = new FormationController()
