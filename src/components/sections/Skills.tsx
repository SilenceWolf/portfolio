// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import BaseSection from '@/components/base/BaseSection'
import type { SkillsController } from '@/controllers/sections/SkillsController'
import type { SkillCategory } from '@/lib/data'

interface SkillsProps {
  controller: SkillsController
}

// Animation en cascade pour chaque catégorie — le staggerChildren fait descendre
// les badges les uns après les autres, ce qui donne une impression de "chargement" intentionnel
const container_variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const badge_variant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

function SkillCategoryBlock({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="mb-8"
    >
      <h3
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: 'var(--accent2)' }}
      >
        <span style={{ color: 'var(--accent1)' }}># </span>
        {category.label}
      </h3>
      <motion.div
        variants={container_variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={badge_variant}
            className="badge-skill hoverable"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Skills({ controller }: SkillsProps) {
  const section_ref = useRef<HTMLElement>(null)

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="py-24 relative"
    >
      {/* Kanji supprimés — le fond sombre seul suffit */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {[].map((kanji, i) => (
          <span
            key={i}
            className="absolute font-mono"
            style={{
              fontSize: `${8 + (i % 3) * 4}rem`,
              opacity: 0,
              color: 'var(--accent1)',
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 2) * 40}%`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 5}deg)`,
              userSelect: 'none',
            }}
          >
            {kanji}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
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
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-center text-xs tracking-widest opacity-40 mb-16 uppercase"
        >
          Stack technique & Domaines
        </motion.p>

        {/* Grille de catégories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {controller.skill_categories.map((category, i) => (
            <SkillCategoryBlock key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </BaseSection>
  )
}
