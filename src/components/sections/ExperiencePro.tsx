// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BaseSection from '@/components/base/BaseSection'
import type { ExperienceProController } from '@/controllers/sections/ExperienceProController'
import type { ExperienceItem } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProProps {
  controller: ExperienceProController
}

// Un item de la timeline — alterne gauche/droite selon l'index
function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const is_right = index % 2 === 0
  const item_ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={item_ref}
      className={`relative flex items-start gap-8 mb-12 ${is_right ? 'flex-row' : 'flex-row-reverse'}`}
      data-timeline-item
    >
      {/* Contenu */}
      <div className={`w-1/2 ${is_right ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <span
          className="font-mono text-xs tracking-widest uppercase mb-1 block"
          style={{ color: 'var(--accent2)' }}
        >
          {item.period}
        </span>
        <h3 className="font-mono font-bold text-lg mb-0.5" style={{ color: 'var(--text)' }}>
          {item.role}
        </h3>
        <p className="font-mono text-sm opacity-60 mb-3">
          {item.company} — {item.location}
        </p>
        <ul className={`text-sm opacity-70 mb-3 space-y-1 ${is_right ? 'list-none' : 'list-none'}`}>
          {item.tasks.map((task, i) => (
            <li key={i} className="font-mono text-xs">
              <span style={{ color: 'var(--accent1)' }}>▸ </span>
              {task}
            </li>
          ))}
        </ul>
        <div className={`flex flex-wrap gap-2 ${is_right ? 'justify-end' : 'justify-start'}`}>
          {item.tags.map((tag) => (
            <span key={tag} className="badge-terminal">
              <span style={{ color: 'var(--accent2)' }}>&gt; </span>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Point sur la timeline */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10"
        style={{ borderColor: 'var(--accent1)', background: 'var(--bg)', boxShadow: '0 0 8px var(--accent1)' }}
      />

      {/* Moitié vide pour équilibrer */}
      <div className="w-1/2" />
    </div>
  )
}

export default function ExperiencePro({ controller }: ExperienceProProps) {
  const section_ref = useRef<HTMLElement>(null)

  // GSAP ScrollTrigger — effet scan : chaque item de timeline apparaît en glissant
  // quand il entre dans le viewport. Le délai stagger donne l'impression d'un scan
  // qui descend la page, comme un terminal qui reçoit des données.
  useGSAP(() => {
    if (!section_ref.current) return

    const items = section_ref.current.querySelectorAll('[data-timeline-item]')

    items.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -60 : 60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Ligne centrale qui s'anime du haut vers le bas au scroll
    const timeline_line = section_ref.current.querySelector('[data-timeline-line]')
    if (timeline_line) {
      gsap.from(timeline_line, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section_ref.current,
          start: 'top 60%',
        },
      })
    }
  }, { scope: section_ref })

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="circuit-bg py-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Titre de section */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: 'var(--accent1)' }}
        >
          <span style={{ color: 'var(--accent2)' }}>$</span> {controller.section_title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-center text-sm opacity-40 mb-16 tracking-widest"
        >
          ── EXPERIENCES.LOG ──
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale lumineuse */}
          <div data-timeline-line className="timeline-line" aria-hidden="true" />

          {controller.experiences.map((exp, i) => (
            <TimelineItem key={exp.id} item={exp} index={i} />
          ))}
        </div>

        {/* Projets perso */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3
            className="font-mono text-xl font-bold mb-6 text-center"
            style={{ color: 'var(--accent2)' }}
          >
            <span style={{ color: 'var(--accent1)' }}>&gt; </span>
            Projets personnels
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {controller.projects.map((project) => (
              <div
                key={project.id}
                className="border p-4 font-mono"
                style={{
                  borderColor: 'rgba(26, 255, 140, 0.2)',
                  background: 'rgba(26, 255, 140, 0.03)',
                }}
              >
                <h4 className="font-bold mb-2" style={{ color: 'var(--accent1)' }}>
                  {project.name}
                </h4>
                <p className="text-sm opacity-70 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge-terminal text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseSection>
  )
}
