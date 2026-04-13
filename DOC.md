# Documentation — Portfolio Silence Wolf

> Louis Guillory (Silence Wolf) — 2026

---

## Description

Portfolio personnel développé avec Next.js 14 (App Router) et TypeScript.
Il présente le parcours professionnel, les formations, les compétences techniques et les centres d'intérêt de Louis Guillory.

L'esthétique joue sur 8 thèmes visuels distincts (cyberpunk, terminal, hologram, etc.), chacun associé à une section, pour créer une immersion progressive au fil du scroll.

---

## Lancer en local

```bash
cd Siteweb/portfolio
npm install
npm run dev
```

L'application tourne sur `http://localhost:3000`.

Pour le build de production :
```bash
npm run build
npm start
```

---

## Architecture

### Pattern MVC adapté au React

```
src/
├── controllers/        # Données + logique métier
│   ├── SectionController.ts   # Classe abstraite commune
│   └── sections/              # Une classe concrète par section
├── components/
│   ├── base/           # BaseSection — wrapper GSAP + thème
│   ├── sections/       # Vues React (une par section)
│   ├── ui/             # Composants globaux (Navigation, CustomCursor)
│   └── three/          # Composants Three.js/R3F
└── lib/
    ├── data.ts         # Toutes les données du CV
    ├── themes.ts       # Définitions des 8 thèmes
    └── logger.ts       # Logger dev/prod
```

**Controller** : classe TypeScript qui porte toutes les données et constantes d'une section (id, label, thème, textes, tableaux de données). Aucune logique React ici.

**View** : composant React fonctionnel dans `src/components/sections/`. Reçoit le controller en prop. Ne contient aucune donnée hardcodée.

**BaseSection** : wrapper `forwardRef` autour de chaque section. Pose le `data-theme` pour les CSS custom properties et expose la ref au ScrollTrigger GSAP.

---

## Ajouter une section

1. Ajouter les données dans `src/lib/data.ts`
2. Créer le controller dans `src/controllers/sections/NomController.ts`
   - Étendre `SectionController`
   - Déclarer `id`, `label`, `theme` (depuis `themes.ts`)
3. Créer le composant dans `src/components/sections/Nom.tsx`
   - Utiliser `BaseSection` comme wrapper
   - Recevoir le controller en prop
4. Importer et instancier dans `src/app/page.tsx`

---

## Changer un thème

Tous les thèmes sont dans `src/lib/themes.ts`. Chaque thème est une entrée du record `themes` avec `bg`, `accent1`, `accent2`, `text`.

Les valeurs sont aussi déclarées comme CSS custom properties dans `src/app/globals.css` via `[data-theme="nom"]`. Les deux doivent être cohérents.

Pour changer la couleur accent d'une section :
1. Modifier `themes.ts` (pour TypeScript)
2. Modifier le bloc `[data-theme="nom"]` correspondant dans `globals.css`

---

## Décisions techniques

### Pourquoi l'architecture controllers/views ?

La séparation controllers/views permet de modifier les données (textes, liste d'expériences, etc.) sans toucher aux composants React. Sur un portfolio, on modifie les données souvent mais rarement le markup. Ça évite aussi que les composants deviennent des blobs avec des centaines de lignes de constantes en tête.

### Pourquoi GSAP + Framer Motion ?

Les deux coexistent intentionnellement :
- **Framer Motion** : animations d'entrée simples basées sur `whileInView`, `initial`/`animate`. Déclaratif, lisible, parfait pour les transitions courantes.
- **GSAP** : animations plus complexes liées au scroll (ScrollTrigger), animations de lettres (split text), effets magnétiques. GSAP a une API plus précise pour tout ce qui est sequencé ou lié au scroll.

### Pourquoi Lenis ?

Le scroll natif n'a pas assez d'inertie pour l'ambiance recherchée. Lenis ajoute un easing sur le scroll sans casser les comportements natifs (ancres, focus clavier). Il s'intègre aussi très bien avec le RAF GSAP.

### Pourquoi dynamic() pour NeuralNetwork ?

Three.js et @react-three/fiber dépendent de WebGL et du DOM — aucun de ces deux n'existe côté serveur. `dynamic(() => import(...), { ssr: false })` fait en sorte que le composant ne soit jamais rendu côté serveur, évitant les erreurs d'hydratation.

### CSS custom properties vs Tailwind

Tailwind gère la mise en page (grid, flex, spacing, responsive). Les couleurs et variables de thème passent par des CSS custom properties (`--bg`, `--accent1`, etc.) pour pouvoir être overridées section par section via `data-theme` sans générer des milliers de classes utilitaires Tailwind.

---

## Ce qui reste à implémenter

- **Avatar 3D** : remplacer le placeholder géométrique dans `Avatar3D.tsx` par un `useGLTF` une fois que le modèle `.glb` est dans `public/models/avatar.glb`.
- **Effet magnétique** : les `data-magnetic` dans Contact.tsx ont un commentaire inline. Brancher GSAP `onMouseMove` → offset → `gsap.to`.
- **API Contact** : créer `src/app/api/contact/route.ts` et brancher le fetch dans le formulaire Contact.
- **Split text avancé** : la ref `title_ref` dans Hero est prête. L'animation GSAP de base est là, on peut l'affiner avec `SplitText` plugin GSAP (licence Club).
