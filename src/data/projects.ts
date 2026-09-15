export interface Project {
  slug: string
  title: string
  year: number
  tags: string[]
  cover: string
  description: string
  role?: string
  tools?: string[]
  credits?: string
  images: string[]
  /** Shown on the Archive page instead of the finished cover — a rougher,
   * behind-the-scenes note + crop, so Archive isn't just a re-list of Works. */
  archive: { note: string; preview: string }
}

export const projects: Project[] = [
  {
    slug: 'project-01',
    title: 'LUCIA',
    year: 2026,
    tags: ['Poster'],
    cover: '/images/projects/project-01/cover.jpg',
    description:
      'Eksplorasi visual poster yang menampilkan karakter bernama Lucia.',
    role: 'Poster / Graphic Design',
    tools: ['Figma'],
    credits: 'Zhafran A Syafiq — concept',
    images: [
      '/images/projects/project-01/01.webp',
      '/images/projects/project-01/02.webp',
      '/images/projects/project-01/03.webp',
    ],
    archive: { note: 'unused type experiment', preview: '/images/projects/project-01/02.webp' },
  },
  {
    slug: 'project-02',
    title: 'FILM POSTER',
    year: 2026,
    tags: ['Poster', 'Typography'],
    cover: '/images/projects/project-02/cover.jpg',
    description:
      'Eksperimen visual untuk poster film Chances, mengeksplorasi kemungkinan, pilihan, dan ketidakpastian dalam satu komposisi.',
    role: 'Graphic Design',
    tools: ['Affinity Designer'],
    credits: 'Zhafran A Syafiq — design',
    images: [
      '/images/projects/project-02/01.webp',
      '/images/projects/project-02/02.webp',
    ],
    archive: { note: 'early crop, before the type pass', preview: '/images/projects/project-02/01.webp' },
  },
  {
    slug: 'project-03',
    title: 'PRODUCT POSTER',
    year: 2026,
    tags: ['Poster'],
    cover: '/images/projects/project-03/cover.jpg',
    description:
      'Eksperimen visual untuk poster produk Air Jordan Retro High OG, memadukan tipografi tegas dan komposisi dinamis untuk menonjolkan karakter ikonik serta energi dari siluet klasiknya.',
    role: 'Graphic Design',
    tools: ['Affinity Designer'],
    credits: 'Zhafran A Syafiq — illustration, design',
    images: [
      '/images/projects/project-03/01.webp',
      '/images/projects/project-03/02.webp',
    ],
    archive: { note: 'alternate silhouette, didn\u2019t make the cut', preview: '/images/projects/project-03/01.webp' },
  },
  {
    slug: 'project-04',
    title: 'PACKAGE DESIGN',
    year: 2026,
    tags: ['Package Design'],
    cover: '/images/projects/project-04/cover.jpg',
    description:
      'Eksplorasi desain kemasan untuk minuman kaleng ARCADE, memadukan elemen visual dan tipografi berani untuk menciptakan identitas yang playful, energik, dan mudah dikenali.',
    role: 'Package Design',
    tools: ['Affinity Designer'],
    credits: 'Zhafran A Syafiq — design',
    images: [
      '/images/projects/project-04/01.webp',
      '/images/projects/project-04/02.webp',
    ],
    archive: { note: 'first can mockup, before the retro pass', preview: '/images/projects/project-04/01.webp' },
  },
]
