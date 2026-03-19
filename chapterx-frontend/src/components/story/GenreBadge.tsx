import React from 'react'
import { GenreBadge as GenreBadgeUI } from '../ui/Badge'

interface GenreBadgeProps {
  genre: string
  onClick?: () => void
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genre, onClick }) => (
  <GenreBadgeUI genre={genre} onClick={onClick} />
)

export function getGenreGradient(genre: string): string {
  const gradients: Record<string, string> = {
    Fantasy: 'from-purple-900 via-indigo-900 to-indigo-800',
    'Sci-Fi': 'from-cyan-900 via-blue-900 to-blue-800',
    Romance: 'from-pink-900 via-rose-900 to-rose-800',
    'Historical Fiction': 'from-amber-900 via-orange-900 to-orange-800',
    Adventure: 'from-green-900 via-emerald-900 to-emerald-800',
    Thriller: 'from-gray-900 via-slate-800 to-slate-700',
    Mystery: 'from-violet-900 via-purple-900 to-purple-800',
    Horror: 'from-red-900 via-rose-900 to-slate-900',
    Contemporary: 'from-blue-900 via-indigo-900 to-slate-800',
    Poetry: 'from-rose-900 via-pink-900 to-pink-800',
  }
  return gradients[genre] || 'from-indigo-900 via-violet-900 to-violet-800'
}
