import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { StoryGrid } from '../../components/story/StoryGrid'
import { getGenreGradient } from '../../components/story/GenreBadge'

function toTitleCase(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export const GenrePage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>()
  const navigate = useNavigate()
  const { stories } = useStoryStore()

  const genreName = toTitleCase(genre || '')
  const gradient = getGenreGradient(genreName)
  const filtered = stories.filter(
    s => s.status === 'published' && s.genres.some(g => g.toLowerCase() === genreName.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className={`relative rounded-2xl overflow-hidden mb-8 h-40 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <button
            onClick={() => navigate('/genres')}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-3 transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            All Genres
          </button>
          <h1 className="font-serif text-3xl font-bold text-white">{genreName}</h1>
          <p className="text-white/70 text-sm mt-1">{filtered.length} stories</p>
        </div>
        <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
      </div>

      <StoryGrid
        stories={filtered}
        emptyMessage={`No ${genreName} stories published yet.`}
      />
    </div>
  )
}

export const GenresListPage: React.FC = () => {
  const navigate = useNavigate()
  const { genres } = useStoryStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Explore Genres</h1>
        <p className="text-slate-400">Find stories by your favorite genre</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {genres.map(genre => {
          const gradient = getGenreGradient(genre.name)
          return (
            <button
              key={genre.genre_id}
              onClick={() => navigate(`/genres/${genre.name.toLowerCase().replace(' ', '-')}`)}
              className={`relative rounded-2xl overflow-hidden h-32 bg-gradient-to-br ${gradient} hover:scale-105 transition-transform group`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <p className="font-serif font-semibold text-white text-center">{genre.name}</p>
                <p className="text-white/60 text-xs mt-1">{genre.story_count} stories</p>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
