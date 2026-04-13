// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BaseSection from '@/components/base/BaseSection'
import type { ContactController } from '@/controllers/sections/ContactController'

interface ContactProps {
  controller: ContactController
}

type FormState = 'idle' | 'loading' | 'sent' | 'error'

interface FormData {
  name: string
  email: string
  message: string
}

// Icônes SVG inline pour les liens sociaux — pas besoin d'une librairie entière
function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Contact({ controller }: ContactProps) {
  const section_ref = useRef<HTMLElement>(null)
  const [form_state, setFormState] = useState<FormState>('idle')
  const [form_data, setFormData] = useState<FormData>({ name: '', email: '', message: '' })

  // En prod, il faudra brancher ça sur une API route Next.js.
  // Pour l'instant, on simule l'envoi avec un faux délai.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    // TODO : remplacer par un fetch vers /api/contact
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('sent')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const input_class = `
    w-full bg-transparent border-b font-mono text-sm py-3 px-0
    focus:outline-none transition-colors duration-200
    placeholder:opacity-30
  `

  return (
    <BaseSection
      ref={section_ref}
      id={controller.id}
      theme={controller.theme.name}
      className="contact-gradient-bg py-24"
    >
      <div className="max-w-4xl mx-auto px-6">
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
          className="font-mono text-center text-sm opacity-50 mb-16 tracking-widest"
        >
          — Travaillons ensemble —
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {form_state !== 'sent' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Votre nom"
                      value={form_data.name}
                      onChange={handleInputChange}
                      className={input_class}
                      style={{ borderColor: 'rgba(0, 212, 255, 0.3)', color: 'var(--text)' }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="votre@email.com"
                      value={form_data.email}
                      onChange={handleInputChange}
                      className={input_class}
                      style={{ borderColor: 'rgba(0, 212, 255, 0.3)', color: 'var(--text)' }}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      required
                      placeholder="Votre message..."
                      rows={5}
                      value={form_data.message}
                      onChange={handleInputChange}
                      className={`${input_class} resize-none`}
                      style={{ borderColor: 'rgba(0, 212, 255, 0.3)', color: 'var(--text)' }}
                    />
                  </div>

                  {/* Bouton avec états Framer Motion */}
                  <motion.button
                    type="submit"
                    disabled={form_state === 'loading'}
                    layout
                    className="hoverable w-full py-3 font-mono text-sm uppercase tracking-widest border transition-colors duration-200"
                    style={{
                      borderColor: 'var(--accent1)',
                      color: form_state === 'loading' ? 'var(--bg)' : 'var(--accent1)',
                      background: form_state === 'loading' ? 'var(--accent1)' : 'transparent',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {form_state === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-3 h-3 border border-current rounded-full border-t-transparent animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer le message'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <p className="font-mono text-2xl mb-4" style={{ color: 'var(--accent1)' }}>
                    ✓ Message envoyé
                  </p>
                  <p className="font-mono text-sm opacity-60">
                    Je vous répondrai dans les plus brefs délais.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Infos de contact + liens sociaux */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Email direct */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Email</p>
              <a
                href={`mailto:${controller.email}`}
                className="hoverable font-mono text-sm hover:opacity-80 transition-opacity"
                style={{ color: 'var(--accent1)' }}
              >
                {controller.email}
              </a>
            </div>

            {/* Téléphone */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Téléphone</p>
              <a
                href={`tel:${controller.phone.replace(/\./g, '')}`}
                className="hoverable font-mono text-sm hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {controller.phone}
              </a>
            </div>

            {/* Liens sociaux */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Réseaux</p>
              <div className="flex gap-4">
                {controller.social_links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    // GSAP magnétique à implémenter ici :
                    // onMouseMove → calculer offset depuis le centre → gsap.to(el, {x, y})
                    // onMouseLeave → gsap.to(el, {x: 0, y: 0, duration: 0.5})
                    data-magnetic
                    className="hoverable w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:border-[var(--accent1)] hover:text-[var(--accent1)]"
                    style={{
                      borderColor: 'rgba(0, 212, 255, 0.2)',
                      color: 'var(--text)',
                    }}
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseSection>
  )
}
