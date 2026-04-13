// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const nav_links = [
  { label: 'Accueil',    href: '#hero' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Formation',  href: '#formation' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Passions',   href: '#culture' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navigation() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menu_open,  setMenuOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target_el = document.querySelector(href)
    if (target_el) target_el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      // La nav utilise les CSS vars de :root — elles sont animées par useThemeTransition
      // donc la couleur de la nav suit l'ambiance courante progressivement
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--bg) 90%, transparent)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid color-mix(in srgb, var(--accent1) 15%, transparent)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.3s ease',
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
    >
      {/* Logo SW — suit accent1 du thème courant */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
        className="hoverable font-mono font-bold text-xl tracking-widest transition-colors duration-500"
        style={{ color: 'var(--accent1)' }}
      >
        SW
      </a>

      {/* Liens desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {nav_links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="hoverable nav-link font-mono text-sm uppercase tracking-wider"
              // nav-link hover utilise déjà var(--accent1) via globals.css
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Burger mobile — barre en accent1 courant */}
      <button
        className="md:hidden hoverable flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menu_open)}
        aria-label={menu_open ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-6 h-0.5 transition-all duration-300"
            style={{ backgroundColor: 'var(--accent1)' }}
            aria-hidden="true"
          />
        ))}
      </button>

      {/* Menu mobile */}
      <AnimatePresence>
        {menu_open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 py-4 backdrop-blur-md"
            style={{
              background: 'color-mix(in srgb, var(--bg) 95%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--accent1) 15%, transparent)',
            }}
          >
            <ul className="flex flex-col items-center gap-4">
              {nav_links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="nav-link font-mono text-sm uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
