// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BaseSection from '@/components/base/BaseSection'
import type { SportController } from '@/controllers/sections/SportController'

interface SportProps {
  controller: SportController
}

// Silhouette de judoka — style encre minimaliste, inspiré des kakemono japonais
function JudoSilhouette() {
  return (
    <svg
      viewBox="0 0 100 140"
      className="w-32 md:w-48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tête */}
      <circle cx="50" cy="18" r="10" fill="var(--accent1)" opacity="0.7" />
      {/* Corps — posture de judoka en position de base */}
      <path
        d="M50 28 L50 70"
        stroke="var(--accent1)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Bras tendus */}
      <path
        d="M50 40 L25 55 M50 40 L75 55"
        stroke="var(--accent1)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Jambes en position */}
      <path
        d="M50 70 L35 100 M50 70 L65 100"
        stroke="var(--accent1)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Pieds */}
      <path
        d="M35 100 L25 110 M65 100 L75 110"
        stroke="var(--accent1)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Ceinture */}
      <rect x="38" y="58" width="24" height="5" rx="2" fill="#2d6a4f" opacity="0.9" />
    </svg>
  )
}

// Barre de ceinture animée — s'étire de gauche à droite au scroll
function BeltBar({ color, label }: { color: string; label: string }) {
  const bar_ref = useRef<HTMLDivElement>(null)
  const is_in_view = useInView(bar_ref, { once: true, margin: '-60px' })

  return (
    <div ref={bar_ref} className="mb-2">
      <span className="font-mono text-xs mb-1 block opacity-60">{label}</span>
      <div
        className="h-3 rounded overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.2)' }}
      >
        <motion.div
          className="h-full rounded"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={is_in_view ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function Sport({ controller }: SportProps) {
  const section_ref = useRef<HTMLElement>(null)

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="tatami-bg py-24 relative overflow-hidden"
    >
      {/* Fond cyberpunk-japon — la transition visuelle colle parfaitement
          avec les arts martiaux : urbain + nature japonaise */}
      <img
        src="/bg-skills-transition.gif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />

      {/* Overlay doux pour que le texte sombre reste lisible sur ce fond */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,240,232,0.55) 0%, rgba(245,240,232,0.4) 50%, rgba(245,240,232,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: 'var(--accent1)' }}
        >
          {controller.section_title}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px mx-auto mb-16 max-w-xs"
          style={{ background: 'linear-gradient(to right, transparent, var(--accent1), transparent)' }}
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Silhouette judo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center pt-4"
          >
            <JudoSilhouette />
          </motion.div>

          {/* Données sports */}
          <div className="space-y-6">
            {controller.sports.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="p-5 border rounded"
                style={{
                  borderColor: 'rgba(45, 106, 79, 0.35)',
                  background: 'rgba(255,255,255,0.45)',
                }}
              >
                {/* En-tête : nom + nom japonais */}
                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    className="font-mono text-xl font-bold"
                    style={{ color: 'var(--accent1)' }}
                  >
                    {sport.icon} {sport.name}
                  </h3>
                  <span
                    className="font-mono text-2xl"
                    style={{ color: 'var(--accent2)', opacity: 0.5 }}
                  >
                    {sport.name_jp}
                  </span>
                </div>

                <p
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent2)' }}
                >
                  {sport.detail}
                </p>

                {/* Description */}
                {/* Barre de ceinture pour le judo */}
                {sport.belt_color && sport.belt_label && (
                  <BeltBar color={sport.belt_color} label={sport.belt_label} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </BaseSection>
  )
}
