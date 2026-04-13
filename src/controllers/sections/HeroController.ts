// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { identity } from '@/lib/data'

// Le Hero est la première impression — tout doit être là dès le chargement.
// On regroupe ici les mots qui tournent dans le typewriter pour pouvoir
// les modifier facilement sans fouiller dans le composant.
export class HeroController extends SectionController {
  readonly id = 'hero'
  readonly label = 'Accueil'
  readonly theme: SectionTheme = themes.cyberpunk

  readonly name = identity.name
  readonly alias = identity.alias
  readonly tagline = identity.tagline

  // Les mots du typewriter dans l'ordre d'apparition
  readonly typewriter_words = ['Dev', 'IA', 'VR/AR', 'Créatif']

  readonly cta_label = 'Voir mes projets'
  readonly cta_target = '#experience'
}

export const heroController = new HeroController()
