// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Three.js vanilla dans un useEffect — on évite R3F complètement.
// Pour un effet de fond, c'est plus simple et ça évite les conflits
// de réconciliateur React selon les versions de Next.js.

interface Node3D {
  position: THREE.Vector3
  // petite vélocité pour que les nodes dérivent légèrement
  velocity: THREE.Vector3
}

function buildScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 22)

  // Génère les nodes avec une petite dérive aléatoire
  const node_count = 70
  const nodes: Node3D[] = Array.from({ length: node_count }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 28,
      (Math.random() - 0.5) * 28,
      (Math.random() - 0.5) * 14,
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.001,
    ),
  }))

  // Points (les nodes)
  const node_geo = new THREE.BufferGeometry()
  const node_positions = new Float32Array(node_count * 3)
  nodes.forEach((n, i) => {
    node_positions[i * 3]     = n.position.x
    node_positions[i * 3 + 1] = n.position.y
    node_positions[i * 3 + 2] = n.position.z
  })
  node_geo.setAttribute('position', new THREE.BufferAttribute(node_positions, 3))

  const node_mat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.15,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  })
  const points = new THREE.Points(node_geo, node_mat)
  scene.add(points)

  // Connexions entre nodes proches (distance < 5)
  const line_positions: number[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 5) {
        line_positions.push(
          nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z,
        )
      }
    }
  }

  const line_geo = new THREE.BufferGeometry()
  line_geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(line_positions), 3))

  const line_mat = new THREE.LineBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.25,
  })
  const lines = new THREE.LineSegments(line_geo, line_mat)
  scene.add(lines)

  // Groupe qui tourne lentement autour de Y et X
  const group = new THREE.Group()
  group.add(points)
  group.add(lines)
  scene.add(group)

  // Retire les enfants du scene (ils sont dans group maintenant)
  scene.remove(points)
  scene.remove(lines)

  return { renderer, scene, camera, group, node_geo, node_positions, nodes }
}

export default function NeuralNetwork() {
  const canvas_ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvas_ref.current
    if (!canvas) return

    const { renderer, scene, camera, group, node_geo, node_positions, nodes } =
      buildScene(canvas)

    let animation_id: number
    let last_time = 0

    function animate(time: number) {
      animation_id = requestAnimationFrame(animate)

      const delta = Math.min((time - last_time) / 1000, 0.05)
      last_time = time

      // Rotation lente du groupe entier
      group.rotation.y += delta * 0.04
      group.rotation.x += delta * 0.015

      // Mise à jour de l'attribut position des nodes (dérive légère)
      nodes.forEach((node, i) => {
        node.position.addScaledVector(node.velocity, 1)

        // Rebond sur les bords du volume
        if (Math.abs(node.position.x) > 14) node.velocity.x *= -1
        if (Math.abs(node.position.y) > 14) node.velocity.y *= -1
        if (Math.abs(node.position.z) > 7)  node.velocity.z *= -1

        node_positions[i * 3]     = node.position.x
        node_positions[i * 3 + 1] = node.position.y
        node_positions[i * 3 + 2] = node.position.z
      })
      node_geo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animation_id = requestAnimationFrame(animate)

    // Redimensionnement propre
    function handleResize() {
      if (!canvas) return
      const width  = canvas.clientWidth
      const height = canvas.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animation_id)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      node_geo.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvas_ref}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  )
}
