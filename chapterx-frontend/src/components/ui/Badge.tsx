import React from 'react'
import { UserRole, StoryStatus } from '../../types'

interface RoleBadgeProps {
  role: UserRole
}

interface StatusBadgeProps {
  status: StoryStatus
}

interface GenreBadgeProps {
  genre: string
  onClick?: () => void
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const styles = {
    admin: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    writer: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    regular: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    guest: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  const labels = { admin: 'Admin', writer: 'Writer', regular: 'Reader', guest: 'Guest' }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[role]}`}>
      {labels[role]}
    </span>
  )
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    draft: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    archived: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  }
  const labels = { draft: 'Draft', published: 'Published', archived: 'Archived' }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genre, onClick }) => {
  const colors: Record<string, string> = {
    Fantasy: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    'Sci-Fi': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30',
    Romance: 'bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30',
    'Historical Fiction': 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
    Adventure: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30',
    Thriller: 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
    Mystery: 'bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30',
    Horror: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
    Contemporary: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    Poetry: 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30',
  }
  const style = colors[genre] || 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30'
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full border transition-colors ${style} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {genre}
    </span>
  )
}
