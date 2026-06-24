import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Lock } from 'lucide-react'
import { Story } from '../../types'
import { useAuthStore } from '../../store/authStore'
import { StatusBadge, GenreBadge } from './Badge'
import { getGenreGradient } from '../story/GenreBadge'

interface StoryCardProps {
  story: Story
  showStatus?: boolean
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, showStatus = false }) => {
  const navigate = useNavigate()
  const { currentUser, showMatureContent } = useAuthStore()

  const isMature = story.mature_content
  const isGuest = !currentUser
  const blurContent = isMature && isGuest && !showMatureContent

  const primaryGenre = story.genres[0] || 'Fantasy'
  const gradient = getGenreGradient(primaryGenre)

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10"
      onClick={() => navigate(`/story/${story.story_id}`)}
    >
      {/* Cover */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-end p-4`}>
        {/* Mature ribbon */}
        {isMature && (
          <div className="absolute top-2 right-2 bg-rose-500/90 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Lock size={10} />
            18+
          </div>
        )}
        {/* Status badge */}
        {showStatus && (
          <div className="absolute top-2 left-2">
            <StatusBadge status={story.status} />
          </div>
        )}
        {/* Blur overlay for mature on guest */}
        {blurContent && (
          <div className="absolute inset-0 backdrop-blur-md bg-slate-900/60 flex items-center justify-center">
            <div className="text-center">
              <Lock size={24} className="text-slate-400 mx-auto mb-1" />
              <p className="text-xs text-slate-400">Mature Content</p>
              <p className="text-xs text-slate-500">Login to view</p>
            </div>
          </div>
        )}
        {/* Genre decorative circles */}
        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />
        <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-white/5 blur-lg" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-white text-sm leading-tight mb-1 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {story.title}
        </h3>
        <p className="text-slate-500 text-xs mb-2">by {story.author_username}</p>
        <p className="text-slate-400 text-xs line-clamp-2 mb-3">{story.short_description}</p>

        {/* Genre badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {story.genres.slice(0, 2).map(g => (
            <GenreBadge key={g} genre={g} />
          ))}
          {story.genres.length > 2 && (
            <span className="text-xs text-slate-500">+{story.genres.length - 2}</span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-slate-500 text-xs">
          <span className="flex items-center gap-1">
            <Heart size={12} />
            {story.total_likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={12} />
            {story.total_comments}
          </span>
        </div>
      </div>
    </div>
  )
}
