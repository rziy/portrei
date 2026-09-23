export interface ArchiveItem {
  slug: string
  title: string
  year: number
  type: string
  image: string
}

// Standalone from projects.ts on purpose — Archive is old / one-off work,
// not an alternate view of what's in Works. Not tied to Works in count,
// order, or content, and doesn't route to a /project/ page since there's
// no case study behind these.
export const archiveItems: ArchiveItem[] = [
  {
    slug: 'the-ruins',
    title: 'the ruins',
    year: 2025,
    type: 'Poster Manip',
    image: '/images/archive/the-ruins.webp',
  },
  {
    slug: 'castorice',
    title: 'castorice',
    year: 2025,
    type: 'Poster Manip',
    image: '/images/archive/castorice.webp',
  },
  {
    slug: 'danjin',
    title: 'danjin',
    year: 2025,
    type: 'Poster Manip',
    image: '/images/archive/danjin.webp',
  },
  {
    slug: 'iuno',
    title: 'iuno',
    year: 2025,
    type: 'Poster Manip',
    image: '/images/archive/iuno.webp',
  },
  {
    slug: 'porsche-911',
    title: 'porsche 911',
    year: 2025,
    type: 'Poster Manip',
    image: '/images/archive/porsche-911.webp',
  },
]
