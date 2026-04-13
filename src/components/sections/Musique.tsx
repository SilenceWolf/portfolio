// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import BaseSection from '@/components/base/BaseSection'
import type { MusiqueController } from '@/controllers/sections/MusiqueController'

interface MusiqueProps {
  controller: MusiqueController
}

// Valeurs pré-calculées en dehors du composant — évite le mismatch SSR/client
// (Math.sin donne des flottants longs, le serveur et le client les arrondissent différemment)
const WAVEFORM_BARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  height: parseFloat((20 + Math.sin((i / 32) * Math.PI * 2) * 60 + 40).toFixed(2)),
  delay: parseFloat(((i / 32) * 0.8).toFixed(3)),
  duration: parseFloat((0.8 + (i % 5) * 0.15).toFixed(2)),
  opacity: parseFloat((0.6 + (i % 3) * 0.1).toFixed(1)),
}))

// Waveform animée — les barres pulsent à des rythmes décalés pour
// simuler une onde sonore. L'amplitude varie pour que ce soit organique.
function Waveform() {
  return (
    <div className="flex items-end justify-center gap-1 h-24" aria-hidden="true">
      {WAVEFORM_BARS.map((bar) => (
        <div
          key={bar.id}
          className="waveform-bar"
          style={{
            height: `${bar.height}%`,
            animationDelay: `${bar.delay}s`,
            animationDuration: `${bar.duration}s`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  )
}

// Représentation visuelle du clavier de piano
function PianoKeys({ keys }: { keys: Array<{ note: string; is_black: boolean }> }) {
  // On affiche 2 octaves pour que ça ait l'air d'un vrai piano
  const white_keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const black_key_pattern = [true, true, false, true, true, true, false] // true = a une touche noire à droite

  return (
    <div className="relative flex h-32" aria-label="Clavier de piano">
      {/* 2 octaves de touches blanches */}
      {Array.from({ length: 14 }, (_, i) => (
        <div
          key={i}
          className="relative border border-current flex-1 rounded-b-sm"
          style={{
            borderColor: 'rgba(255, 126, 185, 0.3)',
            background: 'rgba(255, 126, 185, 0.05)',
            minWidth: '20px',
          }}
        >
          {/* Note en bas de la touche */}
          {i % 7 === 0 && (
            <span
              className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-mono"
              style={{ color: 'var(--accent1)', fontSize: '0.55rem' }}
            >
              {white_keys[i % 7]}
            </span>
          )}
        </div>
      ))}

      {/* Touches noires superposées */}
      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: 14 }, (_, i) => {
          const has_black = black_key_pattern[i % 7]
          const key_width = `${100 / 14}%`
          return has_black ? (
            <div
              key={i}
              className="absolute top-0 rounded-b-sm"
              style={{
                left: `calc(${(i + 0.65) * (100 / 14)}%)`,
                width: `calc(${100 / 14}% * 0.6)`,
                height: '60%',
                background: 'rgba(255, 126, 185, 0.7)',
                zIndex: 1,
              }}
            />
          ) : (
            <div key={i} style={{ width: key_width }} />
          )
        })}
      </div>
    </div>
  )
}

export default function Musique({ controller }: MusiqueProps) {
  const section_ref = useRef<HTMLElement>(null)

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="py-24 relative"
    >
      {/* Paysage japonais — tons roses chauds, parfait pour l'ambiance lo-fi */}
      <img
        src="/bg-musique-japon.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      />

      {/* Overlay pour fondre l'image dans le thème lo-fi violet/rose */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,10,46,0.75) 0%, rgba(26,10,46,0.6) 50%, rgba(26,10,46,0.85) 100%)',
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

        {/* Waveform animée */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.5 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="my-10"
        >
          <Waveform />
        </motion.div>

        {/* Instruments */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {controller.instruments.map((instrument, i) => (
            <motion.div
              key={instrument.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              className="p-6 border rounded"
              style={{
                borderColor: 'rgba(255, 126, 185, 0.25)',
                background: 'rgba(255, 126, 185, 0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{instrument.icon}</span>
                <h3
                  className="font-mono text-2xl font-bold"
                  style={{ color: 'var(--accent1)' }}
                >
                  {instrument.name}
                </h3>
              </div>
              {instrument.years !== null && (
                <p className="font-mono text-sm opacity-80 mb-1">
                  {instrument.years} ans de pratique
                </p>
              )}
            </motion.div>
          ))}
        </div>


        {/* Clavier de piano */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <PianoKeys keys={controller.piano_keys} />
        </motion.div>

        {/* Activités musicales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {controller.activities.map((activity) => (
            <span
              key={activity}
              className="font-mono text-sm px-4 py-2 rounded-full border"
              style={{
                borderColor: 'rgba(155, 93, 229, 0.4)',
                color: 'var(--accent2)',
                background: 'rgba(155, 93, 229, 0.08)',
              }}
            >
              {activity}
            </span>
          ))}
        </motion.div>
      </div>
    </BaseSection>
  )
}
