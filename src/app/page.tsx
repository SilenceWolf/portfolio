// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useThemeTransition } from '@/hooks/useThemeTransition'

import Navigation from '@/components/ui/Navigation'
import CustomCursor from '@/components/ui/CustomCursor'
import Hero from '@/components/sections/Hero'
import ExperiencePro from '@/components/sections/ExperiencePro'
import Formation from '@/components/sections/Formation'
import Skills from '@/components/sections/Skills'
import CultureJaponaise from '@/components/sections/CultureJaponaise'
import Musique from '@/components/sections/Musique'
import Sport from '@/components/sections/Sport'
import Contact from '@/components/sections/Contact'

import { heroController } from '@/controllers/sections/HeroController'
import { experienceProController } from '@/controllers/sections/ExperienceProController'
import { formationController } from '@/controllers/sections/FormationController'
import { skillsController } from '@/controllers/sections/SkillsController'
import { cultureController } from '@/controllers/sections/CultureController'
import { musiqueController } from '@/controllers/sections/MusiqueController'
import { sportController } from '@/controllers/sections/SportController'
import { contactController } from '@/controllers/sections/ContactController'

export default function HomePage() {
  const lenis_ref = useRef<Lenis | null>(null)

  useThemeTransition()

  useEffect(() => {
    // Lenis donne ce smooth scroll élégant qu'on ne peut pas reproduire
    // avec scroll-behavior: smooth seul — notamment pour les interactions GSAP.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis_ref.current = lenis

    let raf_id: number

    function raf(time: number) {
      lenis.raf(time)
      raf_id = requestAnimationFrame(raf)
    }

    raf_id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(raf_id)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero controller={heroController} />
        <ExperiencePro controller={experienceProController} />
        <Formation controller={formationController} />
        <Skills controller={skillsController} />
        <CultureJaponaise controller={cultureController} />
        <Musique controller={musiqueController} />
        <Sport controller={sportController} />
        <Contact controller={contactController} />
      </main>
    </>
  )
}
