import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe, BookOpen, User } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { ReadingList } from '../../types'
import { Modal } from '../../components/ui/Modal'
import { GenreBadge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'

export const CommunityListsPage: React.FC = () => {
  const navigate = useNavigate()
  const { readingLists } = useStoryStore()
  const [selectedList, setSelectedList] = useState<ReadingList | null>(null)

  const publicLists = readingLists.filter(l => l.is_public)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={20} className="text-indigo-400" />
          <h1 className="font-serif text-3xl font-bold text-white">Community Reading Lists</h1>
        </div>
        <p className="text-slate-400">Discover curated lists from the ChapterX community</p>
      </div>

      {publicLists.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-slate-500">
          <Globe size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No public lists yet</p>
          <p className="text-sm mt-1">Be the first to share your reading list!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicLists.map(list => (
            <div
              key={list.list_id}
              className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all cursor-pointer group"
              onClick={() => setSelectedList(list)}
            >
              {/* Cover preview */}
              <div className="h-24 bg-gradient-to-br from-indigo-900/50 via-violet-900/30 to-slate-900 p-4 flex items-end">
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(3, list.stories.length) }).map((_, i) => (
                    <div key={i} className={`w-10 h-14 rounded bg-slate-700 border border-slate-600 -ml-${i > 0 ? '2' : '0'}`} style={{ transform: `rotate(${(i - 1) * 5}deg)` }} />
                  ))}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">
                    {list.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-emerald-400 flex-shrink-0">
                    <Globe size={11} /> Public
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Avatar name={list.username} size="sm" />
                  <span className="text-slate-400 text-sm">@{list.username}</span>
                </div>

                {list.description && (
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">{list.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {list.stories.length} stories
                  </span>
                  <button
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    onClick={e => { e.stopPropagation(); setSelectedList(list) }}
                  >
                    View list →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List detail modal */}
      {selectedList && (
        <Modal
          isOpen={!!selectedList}
          onClose={() => setSelectedList(null)}
          title={selectedList.name}
          size="lg"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Avatar name={selectedList.username} size="sm" />
              <div>
                <p className="text-white text-sm font-medium">@{selectedList.username}</p>
                <p className="text-slate-500 text-xs">{selectedList.stories.length} stories</p>
              </div>
            </div>
            {selectedList.description && (
              <p className="text-slate-400 text-sm mb-4">{selectedList.description}</p>
            )}

            {selectedList.stories.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">This list is empty.</p>
            ) : (
              <div className="space-y-3">
                {selectedList.stories.map(item => (
                  <div
                    key={item.item_id}
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-indigo-500/40 cursor-pointer transition-colors"
                    onClick={() => { navigate(`/story/${item.story_id}`); setSelectedList(null) }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{item.story_title}</p>
                      <p className="text-slate-500 text-xs">by {item.author_username}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.genres.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
