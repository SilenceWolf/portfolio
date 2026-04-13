// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { skillCategories } from '@/lib/data'
import type { SkillCategory } from '@/lib/data'

export class SkillsController extends SectionController {
  readonly id = 'skills'
  readonly label = 'Skills'
  readonly theme: SectionTheme = themes.skills

  readonly section_title = 'Compétences'
  readonly skill_categories: SkillCategory[] = skillCategories

  // Les kanji en filigrane — subtils, juste pour l'ambiance
  readonly background_kanji = ['技', '術', '知', '識', '力', '創']
}

export const skillsController = new SkillsController()
