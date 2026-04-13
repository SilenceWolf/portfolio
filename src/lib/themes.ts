// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

// Les thèmes sont la colonne vertébrale de l'identité visuelle du portfolio.
// Chaque section a sa propre ambiance — le data-theme est posé par BaseSection
// et les CSS custom properties font le reste dans globals.css.

export type ThemeName =
  | 'cyberpunk'
  | 'terminal'
  | 'hologram'
  | 'skills'
  | 'japan'
  | 'lofi'
  | 'dojo'
  | 'contact'

export interface SectionTheme {
  name: ThemeName
  bg: string
  accent1: string
  accent2: string
  text: string
}

export const themes: Record<ThemeName, SectionTheme> = {
  cyberpunk: {
    name: 'cyberpunk',
    bg: '#050510',
    accent1: '#00d4ff',
    accent2: '#7c3aed',
    text: '#e0e0ff',
  },
  terminal: {
    name: 'terminal',
    bg: '#0a0f1a',
    accent1: '#1aff8c',
    accent2: '#00d4ff',
    text: '#b0ffcc',
  },
  hologram: {
    name: 'hologram',
    bg: '#0d1a2e',
    accent1: '#60a5fa',
    accent2: '#38bdf8',
    text: '#e0f2fe',
  },
  skills: {
    name: 'skills',
    bg: '#0a0a0f',
    accent1: '#a78bfa',
    accent2: '#c9a84c',
    text: '#d4d4d8',
  },
  japan: {
    name: 'japan',
    bg: '#0d0015',
    accent1: '#c9a84c',
    accent2: '#8b0000',
    text: '#f0f0e8',
  },
  lofi: {
    name: 'lofi',
    bg: '#1a0a2e',
    accent1: '#ff7eb9',
    accent2: '#9b5de5',
    text: '#f5e6d3',
  },
  dojo: {
    name: 'dojo',
    bg: '#f5f0e8',
    accent1: '#2d6a4f',
    accent2: '#c1121f',
    text: '#1a1a1a',
  },
  contact: {
    name: 'contact',
    bg: '#050510',
    accent1: '#00d4ff',
    accent2: '#c9a84c',
    text: '#e0e0ff',
  },
}
