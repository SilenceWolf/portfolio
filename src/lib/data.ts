// ============================================================
// © 2026 Louis Guillory (Silence Wolf) — Tous droits réservés
// Licence : PROPRIETARY — voir fichier LICENSE
// ============================================================

// Toutes les données du CV centralisées ici.
// Si quelque chose change (nouvelle expérience, diplôme, etc.), c'est ici qu'on touche,
// nulle part ailleurs. Les sections ne hardcodent rien.

export const identity = {
  name: 'Louis Guillory',
  alias: 'Silence Wolf',
  tagline: 'Apprenti Ingénieur · Dev & Créatif · CY Tech',
  location: 'Roissy-en-France (95)',
  phone: '06.59.34.62.14',
  email: 'louis.guillory@edu.esiee-it.fr',
}

export interface ExperienceItem {
  id: string
  company: string
  location: string
  period: string
  role: string
  tasks: string[]
  tags: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: 'thales',
    company: 'Thales AVS',
    location: 'Osny',
    period: '2025 – 2026',
    role: 'Apprenti Ingénieur IVVQ',
    tasks: [
      "Système de test automatique ATK (no code)",
      "Développement IHM pour ATK",
      "Intégration, maintenance",
    ],
    tags: ['Python', 'Tests', 'No-code', 'IHM'],
  },
  {
    id: 'agglo-roissy',
    company: 'Agglomération Roissy-pays-de-France',
    location: 'Roissy',
    period: 'Jan – Mars 2024',
    role: 'Stage technicien support',
    tasks: [
      'Déploiement postes réseau',
      'Gestion serveurs physiques et virtuels',
      'Support IT, téléphonie locale',
    ],
    tags: ['Réseau', 'Windows Server', 'Support', 'Virtualisation'],
  },
  {
    id: 'ibis',
    company: 'Hôtel Ibis Paris CDG',
    location: 'Roissy',
    period: 'Juil – Août 2023',
    role: 'Stage service technique',
    tasks: ["Plan de sobriété énergétique"],
    tags: ['Gestion technique', 'Énergie'],
  },
  {
    id: 'mairie',
    company: 'Mairie de Roissy-en-France',
    location: 'Roissy',
    period: 'Août 2022',
    role: "Job d'été",
    tasks: ['Service technique municipal'],
    tags: ['Technique'],
  },
  {
    id: 'fsi',
    company: 'Flight Safety International',
    location: 'Le Bourget',
    period: 'Stage de 3ème',
    role: 'Stagiaire découverte',
    tasks: ["Simulateur de vol, échanges internationaux"],
    tags: ['Aéronautique', 'International'],
  },
]

export interface ProjectItem {
  id: string
  name: string
  description: string
  tags: string[]
}

export const projects: ProjectItem[] = [
  {
    id: 'chip8',
    name: 'Interpréteur Chip-8',
    description: 'Émulateur de la machine virtuelle Chip-8 écrit en Python.',
    tags: ['Python', 'Émulation'],
  },
  {
    id: 'recrutement',
    name: 'Plateforme de recrutement web',
    description: 'Auth avec hachage, base de données relationnelle, upload de fichiers.',
    tags: ['Web', 'Auth', 'BDD', 'Upload'],
  },
]

export interface FormationItem {
  id: string
  period: string
  school: string
  diploma: string
  details: string[]
}

export const formations: FormationItem[] = [
  {
    id: 'cytech',
    period: '2026 – 2029',
    school: 'CY Tech',
    diploma: 'Ingénieur — Spécialité Informatique (en cours)',
    details: ['Web', 'C++', 'Intelligence Artificielle'],
  },
  {
    id: 'esiee',
    period: '2023 – 2026',
    school: 'ESIEE-IT + Licence CNAM',
    diploma: 'Bachelor — Développeur solutions numériques sécurisées',
    details: [],
  },
  {
    id: 'polytech',
    period: '2022 – 2023',
    school: 'Polytech Nancy',
    diploma: 'Prépa intégrée',
    details: [],
  },
  {
    id: 'bac',
    period: '2019 – 2022',
    school: 'Lycée Léonard de Vinci, Saint-Witz',
    diploma: 'Bac Maths / Physique-Chimie — Mention Bien',
    details: [],
  },
]

export interface LanguageItem {
  name: string
  level: string
  score: number // score sur 100 pour la barre de progression
  detail?: string
}

export const languages: LanguageItem[] = [
  { name: 'Anglais', level: 'B2', score: 83, detail: 'TOEIC 830' },
  { name: 'Allemand', level: 'A2', score: 25 },
  { name: 'Japonais', level: 'Notions orales', score: 10 },
]

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'langages',
    label: 'Langages',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'PowerShell'],
  },
  {
    id: 'web',
    label: 'Web',
    skills: ['HTML', 'CSS', 'React', 'Node.js'],
  },
  {
    id: 'outils',
    label: 'Outils',
    skills: ['Git', 'Docker', 'Azure', 'Figma', 'Trello', 'Miro'],
  },
  {
    id: 'bdd',
    label: 'Bases de données',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    id: 'infra',
    label: 'Infra / Réseau',
    skills: ['TCP/IP', 'DNS', 'SSH', 'VPN', 'Firewall', 'Virtualisation'],
  },
  {
    id: 'ia',
    label: 'IA / ML',
    skills: ['TensorFlow', 'PyTorch', 'Machine Learning'],
  },
  {
    id: 'securite',
    label: 'Sécurité',
    skills: ['Hashing', 'Cryptographie', 'Pentesting (notions)'],
  },
  {
    id: 'domaines',
    label: 'Domaines',
    skills: ['VR/AR', 'Cybersécurité', 'CI/CD', 'Cloud'],
  },
]

export const musicData = {
  // Exactement ce qui est sur le CV — rien de plus
  instruments: [
    { name: 'Piano', years: null, icon: '🎹' },
    { name: 'Orgue', years: 6, icon: '🎼' },
    { name: 'Saxophone', years: 5, icon: '🎷' },
  ],
  activities: [
    'Composition',
    'Éducation musicale — 6 ans',
  ],
}

export interface SportItem {
  id: string
  name: string
  name_jp: string
  detail: string
  belt_color: string | null
  belt_label: string | null
  icon: string
}

export const sportData: SportItem[] = [
  {
    id: 'judo',
    name: 'Judo',
    name_jp: '柔道',
    detail: 'Ceinture verte — Compétition',
    belt_color: '#2d6a4f',
    belt_label: 'Ceinture verte',
    icon: '🥋',
  },
  {
    id: 'tennis-table',
    name: 'Tennis de table',
    name_jp: '卓球',
    detail: '2 ans — Compétition',
    belt_color: null,
    belt_label: null,
    icon: '🏓',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    name_jp: 'テニス',
    detail: '1 an',
    belt_color: null,
    belt_label: null,
    icon: '🎾',
  },
  {
    id: 'tir',
    name: 'Tir en stand',
    name_jp: '射撃',
    detail: '1 an',
    belt_color: null,
    belt_label: null,
    icon: '🎯',
  },
]

export interface InterestItem {
  id: string
  title: string
  title_jp: string
  // Sous-éléments tels qu'écrits sur le CV
  items: string[]
  icon: string
  preview?: string // chemin vers une image d'illustration (optionnel)
}

export const interestData: InterestItem[] = [
  {
    id: 'japon',
    title: 'Culture Japonaise',
    title_jp: '日本文化',
    items: ['Animé', 'Manga', 'Autre'],
    icon: '⛩️',
  },
  {
    id: 'dessin',
    title: 'Dessin',
    title_jp: '絵画',
    items: [],
    icon: '✏️',
    preview: '/StarNaute.png',
  },
]
