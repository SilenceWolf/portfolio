// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { SectionController } from '@/controllers/SectionController'
import { themes } from '@/lib/themes'
import type { SectionTheme } from '@/lib/themes'
import { identity } from '@/lib/data'

export interface SocialLink {
  label: string
  href: string
  icon: string // nom de l'icône — SVG inline dans le composant
}

export class ContactController extends SectionController {
  readonly id = 'contact'
  readonly label = 'Contact'
  readonly theme: SectionTheme = themes.contact

  readonly section_title = 'Me contacter'
  readonly email = identity.email
  readonly phone = identity.phone

  // Les liens sociaux — href à remplir quand les profils existent
  readonly social_links: SocialLink[] = [
    { label: 'Email', href: `mailto:${identity.email}`, icon: 'mail' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  ]
}

export const contactController = new ContactController()
