// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import BaseSection from '@/components/base/BaseSection'
import type { CultureController } from '@/controllers/sections/CultureController'
import type { InterestItem } from '@/lib/data'

interface CultureJapanaiseProps {
  controller: CultureController
}

// Génère les gouttes de pluie avec des positions et vitesses pseudo-aléatoires.
// On fait ça côté client uniquement pour éviter les divergences SSR/hydration.
function RainLayer() {
  const drops = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${(i * 2.5) % 100}%`,
      height: `${60 + (i * 13) % 80}px`,
      duration: `${1.5 + (i * 0.17) % 2}s`,
      delay: `${(i * 0.11) % 3}s`,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            top: '-20px',
          }}
        />
      ))}
    </div>
  )
}

// Silhouette de loup SVG simple — style encre japonaise, très épuré
function WolfSilhouette() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-48 md:w-64 opacity-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Silhouette simplifiée d'un loup assis, style calligraphie */}
      <path
        d="M30 90 C30 90 20 85 15 70 C10 55 25 45 35 50
           C35 50 38 42 45 38 C48 36 52 36 55 40
           C58 36 65 30 72 28 C80 26 88 30 90 38
           C95 35 105 33 112 38 C118 42 120 50 118 58
           C125 55 135 58 138 68 C141 78 135 88 128 90
           C120 92 110 88 105 82
           C100 88 92 92 85 94 C78 96 70 94 65 90
           C60 94 52 96 45 94 C38 92 30 90 30 90Z"
        fill="var(--accent1)"
      />
      {/* Oreilles */}
      <path
        d="M68 38 L62 18 L78 32Z"
        fill="var(--accent1)"
      />
      <path
        d="M88 38 L96 18 L80 32Z"
        fill="var(--accent1)"
      />
      {/* Queue */}
      <path
        d="M30 90 C20 88 10 80 12 70 C14 60 22 65 30 72"
        stroke="var(--accent1)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Card pour chaque centre d'intérêt
function InterestCard({ item, index }: { item: InterestItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className="p-6 border rounded relative overflow-hidden"
      style={{
        borderColor: 'rgba(201, 168, 76, 0.25)',
        background: 'rgba(13, 0, 21, 0.6)',
      }}
    >
      {/* Titre japonais en filigrane */}
      <span
        className="absolute top-3 right-4 font-mono text-4xl pointer-events-none select-none"
        style={{ color: 'var(--accent1)', opacity: 0.08 }}
        aria-hidden="true"
      >
        {item.title_jp}
      </span>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{item.icon}</span>
        <h3
          className="font-mono text-lg font-bold"
          style={{ color: 'var(--accent1)' }}
        >
          {item.title}
        </h3>
      </div>

      {/* Illustration personnelle si disponible */}
      {item.preview && (
        <div className="mb-3 rounded overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          <img
            src={item.preview}
            alt={`Illustration — ${item.title}`}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Sous-éléments tels qu'écrits sur le CV */}
      {item.items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.items.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{
                borderColor: 'rgba(201, 168, 76, 0.3)',
                color: 'var(--accent2)',
                background: 'rgba(201, 168, 76, 0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function CultureJaponaise({ controller }: CultureJapanaiseProps) {
  const section_ref = useRef<HTMLElement>(null)

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="py-24 relative overflow-hidden"
    >
      {/* Ruelle de Tokyo — pixel art animé en fond */}
      <img
        src="/bg-culture-tokyo.gif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.7 }}
      />

      {/* Overlay sombre pour garder les couleurs du thème et la lisibilité */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,0,21,0.7) 0%, rgba(13,0,21,0.5) 50%, rgba(13,0,21,0.8) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Pluie animée CSS par-dessus le gif */}
      <RainLayer />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Titre principal */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-4xl md:text-6xl font-bold mb-4"
          style={{ color: 'var(--accent1)' }}
        >
          {controller.section_title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-lg tracking-widest mb-12 opacity-80"
          style={{ color: 'var(--text)' }}
        >
          {controller.subtitle}
        </motion.p>

        {/* Cards des centres d'intérêt */}
        <div className="w-full grid md:grid-cols-3 gap-6 mb-16 text-left">
          {controller.interests.map((item, i) => (
            <InterestCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Silhouette loup dans la brume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative"
        >
          <WolfSilhouette />
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-12"
            style={{
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </BaseSection>
  )
}
