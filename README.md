# Portfolio — Guide de déploiement

Ce dossier contient la feuille de route du portfolio (`portfolio-plan.md`), le guide de lancement local (`README-LOCAL.md`) et ce guide de déploiement.

> **Deux dépôts, une seule source.** Le code vit dans `Siteweb/portfolio/` du monorepo privé [PROJET_PERSO](https://github.com/SilenceWolf/PROJET_PERSO). À chaque push sur `main` qui touche ce dossier, le workflow `.github/workflows/sync-portfolio.yml` extrait son historique (`git subtree split`) et le pousse dans le dépôt [portfolio](https://github.com/SilenceWolf/portfolio), que Vercel suit. On ne commite jamais directement dans `portfolio` : il serait écrasé à la synchro suivante. Synchro manuelle depuis le monorepo : `git subtree push --prefix=Siteweb/portfolio https://github.com/SilenceWolf/portfolio.git main`.

---

## Table des matières

1. [Prérequis](#1-prérequis)
2. [Déploiement gratuit sur Vercel (recommandé)](#2-déploiement-gratuit-sur-vercel-recommandé)
3. [Déploiement gratuit sur Netlify (alternative)](#3-déploiement-gratuit-sur-netlify-alternative)
4. [Hébergement sur ta propre machine avec Docker](#4-hébergement-sur-ta-propre-machine-avec-docker)
5. [Nom de domaine gratuit](#5-nom-de-domaine-gratuit)

---

## 1. Prérequis

Avant de commencer, installe :

| Outil | Version minimale | Lien |
|---|---|---|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 12+ | https://pnpm.io/installation — npm est refusé par le dépôt, voir [Sécurité des dépendances](#sécurité-des-dépendances) |
| Git | tout | https://git-scm.com |
| Docker (optionnel) | 24+ | https://www.docker.com |

Vérifie les versions installées :
```bash
node -v
pnpm -v
git --version
docker --version   # si Docker installé
```

---

### Sécurité des dépendances

Depuis les vers npm **Shai-Hulud / ChainDrop** (août 2026 : plus de 1 300 versions piégées, dont `keyv`, `flat-cache`, `file-entry-cache`, `cacheable`), le dépôt n'utilise plus `npm` mais **pnpm 12** avec un durcissement supply-chain. Le ver s'exécutait via un script `preinstall` au moment du `npm install`, volait les jetons (npm, GitHub, cloud, clés SSH, IA) et republiait des versions infectées de tous les paquets du mainteneur compromis.

Ce que fait la config (`pnpm-workspace.yaml` dans chaque projet Node) :

| Garde-fou | Effet |
|---|---|
| `minimumReleaseAge: 10080` | Aucune version publiée depuis moins de 7 jours n'est installée, dépendances transitives comprises. Les versions piégées sont retirées en quelques heures. |
| `strictDepBuilds` + `allowBuilds` | Aucun script `preinstall` / `postinstall` de dépendance ne s'exécute. L'install échoue si un nouveau paquet à script apparaît sans décision explicite. |
| `blockExoticSubdeps` | Les dépendances transitives doivent venir du registre npm (pas de git / tarball). |
| `trustPolicy: no-downgrade` | Refuse une version dont la provenance / signature a disparu par rapport aux précédentes (symptôme d'un compte mainteneur piraté). |
| `packageManager` + `engines.npm` + `.npmrc` | Version de pnpm épinglée avec son hash ; `npm install` est refusé (`engine-strict`), et s'il passe quand même, scripts désactivés + carence de 7 jours. |

Conséquences pratiques :

- `pnpm install` suffit ; `pnpm dev`, `pnpm build`, `pnpm lint` remplacent `npm run …`.
- Une version sortie il y a moins de 7 jours est refusée : attendre, ou l'ajouter à `minimumReleaseAgeExclude` en connaissance de cause.
- Si un paquet ajouté déclare un script d'installation, pnpm échoue avec `ERR_PNPM_IGNORED_BUILDS` : vérifier le paquet, puis le déclarer dans `allowBuilds` (`false` s'il fonctionne sans, `true` seulement si indispensable).
- Vercel et Netlify détectent `pnpm-lock.yaml` et utilisent pnpm automatiquement.
- Vérification périodique : `pnpm audit` dans chaque projet.

Références : [CSA AD-2026-009](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-009/) · [Elastic Security Labs](https://www.elastic.co/security-labs/shai-hulud-chaindrop-npm-supply-chain) · [pnpm — supply chain security](https://pnpm.io/supply-chain-security)

---

## 2. Déploiement gratuit sur Vercel (recommandé)

Vercel est la plateforme officielle de Next.js. Hébergement gratuit, HTTPS automatique, CDN mondial.

### Étape 1 — Préparer le projet Next.js

```bash
# Créer le projet (depuis le dossier parent)
pnpm create next-app@latest portfolio --typescript --tailwind --app

cd portfolio
```

### Étape 2 — Pousser sur GitHub

```bash
git init
git add .
git commit -m "init: portfolio Next.js"

# Créer un repo sur github.com puis :
git remote add origin https://github.com/TON_USERNAME/portfolio.git
git push -u origin main
```

### Étape 3 — Connecter Vercel

1. Va sur [vercel.com](https://vercel.com) → **Sign up** avec ton compte GitHub
2. Clique **New Project** → sélectionne ton repo `portfolio`
3. Vercel détecte Next.js automatiquement → clique **Deploy**
4. Ton site est en ligne à `https://portfolio-xxx.vercel.app`

### Étape 4 — Déploiements automatiques

À chaque `git push` sur `main`, Vercel redéploie automatiquement. Rien à faire.

```bash
# Workflow quotidien
git add .
git commit -m "feat: ajout section projets"
git push   # → déploiement automatique en ~30 secondes
```

### Variables d'environnement

Dans Vercel → Settings → Environment Variables, ajoute :
```
NEXT_PUBLIC_SITE_URL=https://ton-domaine.com
# Ajouter ici les clés API si formulaire de contact (Resend, EmailJS, etc.)
```

---

## 3. Déploiement gratuit sur Netlify (alternative)

Alternative si tu préfères ne pas utiliser Vercel.

### Build & déploiement

```bash
# Installer le CLI Netlify
pnpm add -g netlify-cli

# Builder le projet
pnpm build

# Se connecter et déployer
netlify login
netlify init
netlify deploy --prod
```

### Via interface web

1. Va sur [netlify.com](https://netlify.com) → **New site from Git**
2. Connecte ton repo GitHub
3. Build command : `pnpm build`
4. Publish directory : `.next`
5. Clique **Deploy site**

> ⚠️ Netlify nécessite le plugin `@netlify/plugin-nextjs` pour Next.js App Router :
> ```bash
> pnpm add -D @netlify/plugin-nextjs
> ```
> Et dans `netlify.toml` :
> ```toml
> [[plugins]]
> package = "@netlify/plugin-nextjs"
> ```

---

## 4. Hébergement sur ta propre machine avec Docker

Cette option te permet d'héberger le portfolio sur **n'importe quelle machine** (ton PC, un Raspberry Pi, un VPS) sans dépendre d'une plateforme externe.

### 4.1 — Dockerfile (à placer à la racine du projet Next.js)

```dockerfile
# Dockerfile
FROM node:22-alpine AS base

# === Étape 1 : installation des dépendances ===
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN corepack enable && pnpm install --frozen-lockfile

# === Étape 2 : build de l'application ===
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# === Étape 3 : image de production (légère) ===
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

> ⚠️ Pour que le build standalone fonctionne, ajoute dans `next.config.ts` :
> ```ts
> const nextConfig = {
>   output: 'standalone',
> }
> export default nextConfig
> ```

### 4.2 — docker-compose.yml (à placer à la racine du projet)

```yaml
# docker-compose.yml
services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: portfolio
    ports:
      - "3000:3000"      # accès local : http://localhost:3000
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
    restart: unless-stopped
```

### 4.3 — Commandes Docker

```bash
# Construire l'image
docker compose build

# Lancer le container en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f portfolio

# Stopper le container
docker compose down

# Reconstruire après des modifications
docker compose down && docker compose build && docker compose up -d
```

### 4.4 — Accès depuis l'extérieur (optionnel)

Pour rendre ton site accessible depuis internet via ta propre machine :

**Option A — Tunnel Cloudflare (gratuit, sans ouvrir de port)**
```bash
# Installer cloudflared
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

# Créer un tunnel temporaire (sans compte)
cloudflared tunnel --url http://localhost:3000
# → génère une URL publique temporaire type https://xxx.trycloudflare.com
```

**Option B — Ngrok (gratuit avec limitations)**
```bash
pnpm add -g ngrok
ngrok http 3000
# → génère une URL publique type https://xxxx.ngrok.io
```

**Option C — VPS (Contabo, Hetzner ~4€/mois)**
```bash
# Sur le VPS :
git clone https://github.com/TON_USERNAME/portfolio.git
cd portfolio
docker compose up -d

# Configurer Nginx comme reverse proxy :
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name ton-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS gratuit avec Let's Encrypt :
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ton-domaine.com
```

---

## 5. Nom de domaine gratuit

| Option | Domaine | Durée | Lien |
|---|---|---|---|
| Vercel | `ton-pseudo.vercel.app` | Illimité | gratuit avec Vercel |
| Netlify | `ton-pseudo.netlify.app` | Illimité | gratuit avec Netlify |
| GitHub Pages | `username.github.io` | Illimité | gratuit |
| Freenom | `.tk` `.ml` `.ga` | 1 an renouvelable | freenom.com |
| Cloudflare | sous-domaine custom | Illimité | avec compte gratuit |

> Pour un domaine `.fr` ou `.com` professionnel : OVH (~7€/an), Namecheap (~10€/an).

---

## Récap — Quelle option choisir ?

| Situation | Solution recommandée |
|---|---|
| Je veux juste mettre en ligne rapidement | **Vercel** (5 minutes, gratuit) |
| Je veux héberger sur mon PC perso | **Docker + Cloudflare Tunnel** |
| Je veux un serveur dédié pas cher | **Docker + VPS Hetzner + Nginx + Let's Encrypt** |
| Je veux tester localement | `pnpm dev` ou `docker compose up` |
