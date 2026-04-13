// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

// TODO: quand le modèle .glb sera prêt, remplacer ce placeholder par un
// vrai composant Three.js vanilla (useEffect + canvas) ou R3F si la
// compatibilité Next.js est résolue à ce moment-là.
// Placer le fichier dans /public/models/avatar.glb

export default function Avatar3D() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 180, height: 220 }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Tête */}
        <div
          className="mx-auto rounded-full"
          style={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
            border: '1.5px solid rgba(0,212,255,0.4)',
            boxShadow: '0 0 20px rgba(0,212,255,0.2)',
          }}
        />
        {/* Corps */}
        <div
          className="mx-auto mt-2 rounded"
          style={{
            width: 80,
            height: 100,
            background: 'linear-gradient(180deg, rgba(0,212,255,0.1), rgba(124,58,237,0.08))',
            border: '1.5px solid rgba(0,212,255,0.25)',
            boxShadow: '0 0 30px rgba(124,58,237,0.15)',
          }}
        />
      </div>
    </div>
  )
}
