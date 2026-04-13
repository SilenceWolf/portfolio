// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { experiences, projects } from '@/lib/data'
import type { ExperienceItem, ProjectItem } from '@/lib/data'

export class ExperienceProController extends SectionController {
  readonly id = 'experience'
  readonly label = 'Expérience'
  readonly theme: SectionTheme = themes.terminal

  readonly section_title = 'Expériences Professionnelles'
  readonly experiences: ExperienceItem[] = experiences
  readonly projects: ProjectItem[] = projects
}

export const experienceProController = new ExperienceProController()
