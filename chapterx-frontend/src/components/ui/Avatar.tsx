import React from 'react'

interface AvatarProps {
  name: string
  image?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-3xl',
}

const colors = [
  'from-indigo-500 to-violet-500',
  'from-violet-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-500',
]

function getColorIndex(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % colors.length
}

export const Avatar: React.FC<AvatarProps> = ({ name, image, size = 'md', className = '' }) => {
  const initials = name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const colorClass = colors[getColorIndex(name)]

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-slate-700 ${className}`}
      />
    )
  }

  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center font-semibold text-white ring-2 ring-slate-700 flex-shrink-0 ${className}`}
    >
      {initials}
    </div>
  )
}
