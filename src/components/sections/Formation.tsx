// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import BaseSection from '@/components/base/BaseSection'
import type { FormationController } from '@/controllers/sections/FormationController'
import type { LanguageItem } from '@/lib/data'

interface FormationProps {
  controller: FormationController
}

// Barre de langue — l'animation se déclenche uniquement quand
// la barre entre dans le viewport, pas à l'ouverture de la page
function LanguageBar({ lang }: { lang: LanguageItem }) {
  const bar_ref = useRef<HTMLDivElement>(null)
  const is_in_view = useInView(bar_ref, { once: true, margin: '-50px' })

  return (
    <div ref={bar_ref} className="mb-4">
      <div className="flex justify-between items-baseline mb-1">
        <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent1)' }}>
          {lang.name}
        </span>
        <span className="font-mono text-xs opacity-60">
          {lang.level}
          {lang.detail && ` — ${lang.detail}`}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(96, 165, 250, 0.15)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, var(--accent1), var(--accent2))' }}
          initial={{ width: 0 }}
          animate={is_in_view ? { width: `${lang.score}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function Formation({ controller }: FormationProps) {
  const section_ref = useRef<HTMLElement>(null)

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="py-24"
    >
      <div className="max-w-5xl mx-auto px-6">
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formations — cards hologrammes */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-sm uppercase tracking-widest mb-6 opacity-60"
            >
              Diplômes & Parcours
            </motion.h3>
            <div className="space-y-4">
              {controller.formations.map((formation, i) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card-hologram"
                >
                  <span
                    className="font-mono text-xs tracking-widest block mb-1"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {formation.period}
                  </span>
                  <h4
                    className="font-mono font-bold mb-0.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {formation.school}
                  </h4>
                  <p className="font-mono text-sm opacity-70">{formation.diploma}</p>
                  {formation.details.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formation.details.map((detail) => (
                        <span
                          key={detail}
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: 'var(--accent1)',
                            border: '1px solid rgba(96, 165, 250, 0.2)',
                          }}
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Langues — barres animées */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-sm uppercase tracking-widest mb-6 opacity-60"
            >
              Langues
            </motion.h3>
            <div className="card-hologram">
              {controller.languages.map((lang) => (
                <LanguageBar key={lang.name} lang={lang} />
              ))}
            </div>

            {/* Certifications mise en valeur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 card-hologram"
            >
              <h4 className="font-mono text-sm font-bold mb-3" style={{ color: 'var(--accent1)' }}>
                Certification
              </h4>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center font-mono font-bold text-lg"
                  style={{ background: 'rgba(96, 165, 250, 0.1)', color: 'var(--accent1)' }}
                >
                  830
                </div>
                <div>
                  <p className="font-mono text-sm font-bold">TOEIC</p>
                  <p className="font-mono text-xs opacity-60">Anglais B2</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}
