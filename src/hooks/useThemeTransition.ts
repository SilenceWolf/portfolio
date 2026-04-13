// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

// Ce hook anime progressivement les CSS vars de :root au fil du scroll.
// Résultat : la nav, le curseur, et l'ambiance globale changent de couleur
// en suivant la position de scroll — pas de cut brutal entre sections.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ThemeVars = { bg: string; accent1: string; accent2: string; text: string }

// Miroir des valeurs définies dans globals.css — si tu change une couleur là-bas,
// il faut aussi la mettre à jour ici pour que la transition soit cohérente.
const THEMES: Record<string, ThemeVars> = {
  hero:       { bg: '#050510', accent1: '#00d4ff', accent2: '#7c3aed',  text: '#e0e0ff' },
  experience: { bg: '#0a0f1a', accent1: '#1aff8c', accent2: '#00d4ff',  text: '#b0ffcc' },
  formation:  { bg: '#0d1a2e', accent1: '#60a5fa', accent2: '#38bdf8',  text: '#e0f2fe' },
  skills:     { bg: '#0a0a0f', accent1: '#a78bfa', accent2: '#c9a84c',  text: '#d4d4d8' },
  culture:    { bg: '#0d0015', accent1: '#c9a84c', accent2: '#8b0000',  text: '#f0f0e8' },
  musique:    { bg: '#1a0a2e', accent1: '#ff7eb9', accent2: '#9b5de5',  text: '#f5e6d3' },
  sport:      { bg: '#0f1a10', accent1: '#2d6a4f', accent2: '#c1121f',  text: '#d4d4d8' },
  contact:    { bg: '#050510', accent1: '#00d4ff', accent2: '#c9a84c',  text: '#e0e0ff' },
}

const SECTION_ORDER = [
  'hero', 'experience', 'formation', 'skills',
  'culture', 'musique', 'sport', 'contact',
]

export function useThemeTransition() {
  useEffect(() => {
    const root = document.documentElement

    // Applique le thème initial sans animation
    const initial = THEMES['hero']
    root.style.setProperty('--bg',      initial.bg)
    root.style.setProperty('--accent1', initial.accent1)
    root.style.setProperty('--accent2', initial.accent2)
    root.style.setProperty('--text',    initial.text)

    const triggers: ScrollTrigger[] = []

    SECTION_ORDER.forEach((id, index) => {
      if (index === 0) return // hero est le thème initial, pas de transition entrante

      const el = document.getElementById(id)
      if (!el) return

      const from_theme = THEMES[SECTION_ORDER[index - 1]]
      const to_theme   = THEMES[id]

      // scrub: 0.8 = l'animation suit le scroll avec 0.8s de lissage
      // start 85% → top 0% : la transition démarre quand la section
      // entre dans les 85% bas de l'écran et finit quand elle atteint le haut
      const tween = gsap.fromTo(
        root,
        {
          '--bg':      from_theme.bg,
          '--accent1': from_theme.accent1,
          '--accent2': from_theme.accent2,
          '--text':    from_theme.text,
        },
        {
          '--bg':      to_theme.bg,
          '--accent1': to_theme.accent1,
          '--accent2': to_theme.accent2,
          '--text':    to_theme.text,
          ease: 'none',
          overwrite: 'auto',
        }
      )

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'top 0%',
        scrub: 0.8,
        animation: tween,
        invalidateOnRefresh: true,
      })

      triggers.push(trigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])
}
