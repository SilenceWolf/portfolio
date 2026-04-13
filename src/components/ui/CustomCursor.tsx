// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useEffect, useRef, useState } from 'react'

// Le curseur custom ajoute cette subtilité visuelle qui fait sentir
// que le site est soigné — c'est un détail mais ça compte.
// Sur mobile/tactile, il ne sert à rien donc on le désactive proprement.
export default function CustomCursor() {
  const cursor_ref = useRef<HTMLDivElement>(null)
  const [is_hovering, setIsHovering] = useState(false)
  const [is_touch_device, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // On détecte une fois si c'est un device tactile
    const check_touch = () => window.matchMedia('(pointer: coarse)').matches
    setIsTouchDevice(check_touch())

    if (check_touch()) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursor_ref.current) return
      cursor_ref.current.style.left = `${e.clientX}px`
      cursor_ref.current.style.top = `${e.clientY}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.hoverable')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (is_touch_device) return null

  return (
    <div
      ref={cursor_ref}
      className={`custom-cursor ${is_hovering ? 'is-hovering' : ''}`}
      aria-hidden="true"
    />
  )
}
