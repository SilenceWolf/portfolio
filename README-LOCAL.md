# Portfolio — Lancer en local

## Prérequis

Avant tout, vérifie que tu as :

```bash
node -v   # 18 ou plus
npm -v    # 9 ou plus
```

Si Node n'est pas installé : https://nodejs.org (prendre la version LTS)

---

## 1. Installer les dépendances

À faire une seule fois (ou après un `git pull` qui change le `package.json`) :

```bash
cd c:/Users/loulo/Documents/PROJET_PERSO/Siteweb/portfolio
npm install
```

L'installation prend 1-2 minutes — elle télécharge Next.js, Three.js, GSAP, Framer Motion, etc.

---

## 2. Lancer le serveur de développement

```bash
npm run dev
```

Ouvre ensuite **http://localhost:3000** dans ton navigateur.

Le serveur recharge automatiquement dès que tu sauvegardes un fichier — pas besoin de relancer.

---

## 3. Autres commandes utiles

```bash
# Vérifier que le build de production compile sans erreur
npm run build

# Lancer la version de production en local (après un build)
npm run start

# Vérifier les erreurs TypeScript et ESLint
npm run lint
```

---

## 4. Debug dans VS Code

Le fichier `.vscode/launch.json` est configuré à la racine de `PROJET_PERSO`.

### Modes disponibles

| Configuration | Ce qu'elle fait |
|---|---|
| **Portfolio — dev** | Lance `npm run dev`, ouvre le navigateur automatiquement |
| **Portfolio — debug server** | Idem + active l'inspecteur Node.js (breakpoints côté serveur) |
| **Portfolio — debug Chrome** | Attache VS Code à Chrome pour les breakpoints React/frontend |
| **Portfolio — dev + Chrome** | Lance les deux en même temps (compound) |
| **Logger — demo** | Teste le module de log `outils/log` |

### Pour déboguer le frontend (composants React, animations)

1. Lance **"Portfolio — dev"** depuis l'onglet Run & Debug (`Ctrl+Shift+D`)
2. Une fois le serveur démarré, lance **"Portfolio — debug Chrome"**
3. Pose tes breakpoints directement dans les fichiers `.tsx` — VS Code s'arrête dessus dans Chrome

### Pour déboguer le serveur (API routes, Server Components)

Lance directement **"Portfolio — debug server"** — les breakpoints dans les fichiers serveur fonctionnent.

---

## 5. Structure du projet (rappel rapide)

```
src/
├── app/              → layout, page principale, CSS global
├── components/
│   ├── base/         → BaseSection (wrapper commun à toutes les sections)
│   ├── sections/     → Hero, ExperiencePro, Formation, Skills, etc.
│   ├── three/        → NeuralNetwork (fond Hero), Avatar3D (slot modèle)
│   └── ui/           → Navigation, CustomCursor
├── controllers/      → logique et données de chaque section (MVC)
└── lib/              → data.ts (CV), themes.ts (palettes), logger.ts
```

---

## 6. Ajouter un modèle 3D pour l'avatar

Le slot est prêt dans `src/components/three/Avatar3D.tsx`.

1. Place ton fichier `.glb` dans `public/models/avatar.glb`
2. Décommente le bloc `useGLTF` dans `Avatar3D.tsx` (indiqué par un commentaire `TODO`)
3. Sauvegarde — le modèle apparaît dans le Hero

---

## 7. Problèmes fréquents

**`npm install` échoue** → vérifie ta connexion et que Node ≥ 18 est installé

**Port 3000 déjà utilisé** → lance sur un autre port :
```bash
npm run dev -- -p 3001
```

**Erreur Three.js / WebGL** → ton navigateur doit supporter WebGL 2. Chrome ou Edge récent → ça passe. Firefox → normalement aussi.

**Les animations GSAP ne se déclenchent pas** → c'est normal si tu es sur un écran très petit ou si `prefers-reduced-motion` est activé dans ton OS.
