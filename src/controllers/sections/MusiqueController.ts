// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { musicData } from '@/lib/data'

export class MusiqueController extends SectionController {
  readonly id = 'musique'
  readonly label = 'Musique'
  readonly theme: SectionTheme = themes.lofi

  readonly section_title = 'おんがく — Musique'
  readonly instruments = musicData.instruments
  readonly activities = musicData.activities

  readonly piano_keys = [
    { note: 'C', is_black: false },
    { note: 'C#', is_black: true },
    { note: 'D', is_black: false },
    { note: 'D#', is_black: true },
    { note: 'E', is_black: false },
    { note: 'F', is_black: false },
    { note: 'F#', is_black: true },
    { note: 'G', is_black: false },
    { note: 'G#', is_black: true },
    { note: 'A', is_black: false },
    { note: 'A#', is_black: true },
    { note: 'B', is_black: false },
  ]
}

export const musiqueController = new MusiqueController()
