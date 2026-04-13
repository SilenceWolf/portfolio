// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import BaseSection from '@/components/base/BaseSection'
import type { HeroController } from '@/controllers/sections/HeroController'

// SSR: false parce que Three.js a besoin du DOM/WebGL — pas disponible côté serveur
const NeuralNetwork = dynamic(() => import('@/components/three/NeuralNetwork'), {
  ssr: false,
})

const Avatar3D = dynamic(() => import('@/components/three/Avatar3D'), {
  ssr: false,
})

interface HeroProps {
  controller: HeroController
}

export default function Hero({ controller }: HeroProps) {
  const section_ref = useRef<HTMLElement>(null)
  const title_ref = useRef<HTMLHeadingElement>(null)

  // Typewriter — on cycle sur les mots de façon infinie
  const [current_word_index, setCurrentWordIndex] = useState(0)
  const [displayed_text, setDisplayedText] = useState('')
  const [is_deleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const words = controller.typewriter_words
    const current_word = words[current_word_index]
    let timeout: ReturnType<typeof setTimeout>

    if (!is_deleting && displayed_text.length < current_word.length) {
      // On écrit caractère par caractère
      timeout = setTimeout(() => {
        setDisplayedText(current_word.slice(0, displayed_text.length + 1))
      }, 100)
    } else if (!is_deleting && displayed_text.length === current_word.length) {
      // On attend un peu avant d'effacer
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (is_deleting && displayed_text.length > 0) {
      // On efface
      timeout = setTimeout(() => {
        setDisplayedText(displayed_text.slice(0, -1))
      }, 50)
    } else if (is_deleting && displayed_text.length === 0) {
      // On passe au mot suivant
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed_text, is_deleting, current_word_index, controller.typewriter_words])

  // GSAP — animation d'entrée des lettres du titre
  // Chaque <span> dans .split-text représente une lettre, on les fait tomber en stagger
  useGSAP(() => {
    if (!title_ref.current) return

    const spans = title_ref.current.querySelectorAll('.split-text span')
    if (spans.length === 0) return

    gsap.from(spans, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, { scope: section_ref })

  // Découpe le nom en spans individuels pour que GSAP puisse animer lettre par lettre
  const splitName = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        style={char === ' ' ? { display: 'inline-block', width: '0.4em' } : { display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <BaseSection ref={section_ref} id={controller.id} theme={controller.theme.name} className="flex items-center justify-center">
      {/* Fond pixel art cyberpunk — image de base, très sombre */}
      <img
        src="/bg-hero-cyberpunk.gif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Neural network Three.js par-dessus le gif */}
      <div className="absolute inset-0 z-[5]">
        <NeuralNetwork />
      </div>

      {/* Vignette qui assombrit les bords pour garder le texte lisible */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,5,16,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Contenu principal */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 gap-8">
        {/* Avatar 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Avatar3D />
        </motion.div>

        {/* Nom en lettres séparées pour l'animation GSAP */}
        <h1
          ref={title_ref}
          className="split-text text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-widest"
          style={{ color: 'var(--text)' }}
        >
          {splitName(controller.name.toUpperCase())}
        </h1>

        {/* Alias + typewriter */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: 'var(--accent2)' }}
          >
            {controller.alias}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="font-mono text-lg md:text-2xl"
            style={{ color: 'var(--accent1)' }}
          >
            <span>&gt; </span>
            <span className="inline-block min-w-[6ch]">{displayed_text}</span>
            {/* Curseur clignotant */}
            <span className="inline-block w-0.5 h-5 bg-current align-middle ml-0.5 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-mono text-sm opacity-60 mt-2"
          >
            {controller.tagline}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.a
          href={controller.cta_target}
          onClick={(e) => {
            e.preventDefault()
            document.querySelector(controller.cta_target)?.scrollIntoView({ behavior: 'smooth' })
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hoverable mt-4 px-8 py-3 border font-mono text-sm uppercase tracking-widest transition-all duration-300"
          style={{
            borderColor: 'var(--accent1)',
            color: 'var(--accent1)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--accent1)'
            el.style.color = 'var(--bg)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'transparent'
            el.style.color = 'var(--accent1)'
          }}
        >
          {controller.cta_label}
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
          aria-hidden="true"
        >
          <div className="scroll-indicator-dot" />
          <div className="scroll-indicator-dot" />
          <div className="scroll-indicator-dot" />
        </motion.div>
      </div>
    </BaseSection>
  )
}
