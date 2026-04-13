// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

import { forwardRef } from 'react'
import type { ThemeName } from '@/lib/themes'

interface BaseSectionProps {
  id: string
  theme: ThemeName
  className?: string
  children: React.ReactNode
}

// forwardRef parce que GSAP a besoin du nœud DOM pour les scroll triggers.
// Chaque section passe sa ref ici plutôt que de gérer ça en double partout.
const BaseSection = forwardRef<HTMLElement, BaseSectionProps>(
  ({ id, theme, className = '', children }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-theme={theme}
        className={`section-base ${className}`}
      >
        {children}
      </section>
    )
  }
)

BaseSection.displayName = 'BaseSection'

export default BaseSection
