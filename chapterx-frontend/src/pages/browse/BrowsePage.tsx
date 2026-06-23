import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useAuthStore } from '../../store/authStore'
import { StoryGrid } from '../../components/story/StoryGrid'
import { GenreBadge } from '../../components/ui/Badge'

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'views', label: 'Most Viewed' },
]

const allGenres = ['Fantasy', 'Sci-Fi', 'Romance', 'Historical Fiction', 'Adventure', 'Thriller', 'Mystery', 'Horror', 'Contemporary', 'Poetry']

export const BrowsePage: React.FC = () => {
  const { stories } = useStoryStore()
  const { currentUser, showMatureContent, setShowMatureContent } = useAuthStore()
  const [search, setSearch] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sort, setSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = stories.filter(s => s.status === 'published')

    if (!showMatureContent) {
      list = list.filter(s => !s.mature_content)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.short_description.toLowerCase().includes(q) ||
        s.author_username.toLowerCase().includes(q)
      )
    }

    if (selectedGenres.length > 0) {
      list = list.filter(s => selectedGenres.some(g => s.genres.includes(g)))
    }

    switch (sort) {
      case 'popular': return [...list].sort((a, b) => b.total_likes - a.total_likes)
      case 'recent': return [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case 'views': return [...list].sort((a, b) => b.total_views - a.total_views)
default: return list
    }
  }, [stories, search, selectedGenres, sort, showMatureContent, currentUser])

  const toggleGenre = (g: string) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Browse Stories</h1>
        <p className="text-slate-400">Discover your next favorite read</p>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search titles, authors, descriptions..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500 text-sm"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
            showFilters || selectedGenres.length > 0
              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
              : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {selectedGenres.length > 0 && (
            <span className="bg-indigo-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {selectedGenres.length}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Filter by Genre</h3>
            {selectedGenres.length > 0 && (
              <button onClick={() => setSelectedGenres([])} className="text-xs text-slate-400 hover:text-white">
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {allGenres.map(g => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`transition-transform hover:scale-105 ${selectedGenres.includes(g) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              >
                <GenreBadge genre={g} />
              </button>
            ))}
          </div>
          {currentUser && (
            <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setShowMatureContent(!showMatureContent)}
                  className={`w-10 h-6 rounded-full transition-colors ${showMatureContent ? 'bg-indigo-600' : 'bg-slate-600'} relative`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${showMatureContent ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
                <span className="text-sm text-slate-400">Show mature content (18+)</span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Result count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-500 text-sm">{filtered.length} stories found</p>
        {selectedGenres.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Active filters:</span>
            {selectedGenres.map(g => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-colors"
              >
                {g} <X size={10} />
              </button>
            ))}
          </div>
        )}
      </div>

      <StoryGrid stories={filtered} emptyMessage="No stories match your filters." />
    </div>
  )
}
