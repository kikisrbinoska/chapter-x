import React, { useState, useEffect } from 'react'
import { Story } from '../../types'
import { StoryCard } from '../ui/StoryCard'
import { BookOpen } from 'lucide-react'

interface StoryGridProps {
  stories: Story[]
  showStatus?: boolean
  emptyMessage?: string
  loading?: boolean
}

const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden bg-slate-800 border border-slate-700 animate-pulse">
    <div className="h-40 bg-slate-700" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-slate-700 rounded w-3/4" />
      <div className="h-3 bg-slate-700 rounded w-1/3" />
      <div className="h-3 bg-slate-700 rounded w-full" />
      <div className="h-3 bg-slate-700 rounded w-5/6" />
      <div className="flex gap-2 mt-2">
        <div className="h-5 bg-slate-700 rounded-full w-16" />
        <div className="h-5 bg-slate-700 rounded-full w-16" />
      </div>
    </div>
  </div>
)

export const StoryGrid: React.FC<StoryGridProps> = ({
  stories,
  showStatus = false,
  emptyMessage = 'No stories found.',
  loading: externalLoading,
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const isLoading = externalLoading !== undefined ? externalLoading : loading

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <BookOpen size={48} className="mb-4 opacity-40" />
        <p className="text-lg font-medium">{emptyMessage}</p>
        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stories.map(story => (
        <StoryCard key={story.story_id} story={story} showStatus={showStatus} />
      ))}
    </div>
  )
}
