import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, BookOpen, Lock, Globe, Trash2, X } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { GenreBadge } from '../../components/ui/Badge'

export const ReadingListPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { readingLists, fetchReadingLists, createReadingList, deleteReadingList, removeStoryFromList } = useStoryStore()

  useEffect(() => {
    fetchReadingLists()
  }, [])
  const { addToast } = useUIStore()
  const [createOpen, setCreateOpen] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListDesc, setNewListDesc] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-slate-600" />
        <h2 className="text-2xl text-white mb-2">Sign in to view your reading lists</h2>
        <Button onClick={() => navigate('/login')} className="mt-4">Sign In</Button>
      </div>
    )
  }

  const myLists = readingLists.filter(l => l.user_id === currentUser.user_id)

  const handleCreate = async () => {
    if (!newListName.trim()) return
    try {
      await createReadingList({
        list_id: Date.now(),
        user_id: currentUser.user_id,
        username: currentUser.username,
        name: newListName.trim(),
        description: newListDesc.trim() || undefined,
        is_public: isPublic,
        created_at: new Date().toISOString(),
        stories: [],
      })
      addToast(`"${newListName}" created!`)
    } catch (err: any) {
      addToast(err?.response?.data?.message || 'Failed to create list.', 'error')
      return
    }
    setNewListName('')
    setNewListDesc('')
    setIsPublic(false)
    setCreateOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">My Reading Lists</h1>
          <p className="text-slate-400 mt-1">{myLists.length} list{myLists.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} />
          New List
        </Button>
      </div>

      {myLists.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-slate-500">
          <BookOpen size={48} className="mb-4 opacity-40" />
          <h3 className="text-lg font-medium text-white mb-2">No reading lists yet</h3>
          <p className="text-sm mb-4">Create your first list to save stories you love.</p>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={14} />
            Create Reading List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myLists.map(list => (
            <div key={list.list_id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all">
              {/* Header */}
              <div className="p-5 border-b border-slate-700">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{list.name}</h3>
                      {list.is_public ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <Globe size={11} /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Lock size={11} /> Private
                        </span>
                      )}
                    </div>
                    {list.description && (
                      <p className="text-slate-400 text-sm">{list.description}</p>
                    )}
                    <p className="text-slate-500 text-xs mt-1">{list.stories.length} stories</p>
                  </div>
                  <button
                    onClick={async () => { try { await deleteReadingList(list.list_id); addToast('List deleted', 'info') } catch { addToast('Failed to delete list.', 'error') } }}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Stories */}
              <div className="p-4">
                {list.stories.length === 0 ? (
                  <p className="text-slate-600 text-sm text-center py-4">No stories yet.</p>
                ) : (
                  <div className="space-y-2">
                    {list.stories.slice(0, 4).map(item => (
                      <div key={item.item_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 group">
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => navigate(`/story/${item.story_id}`)}
                            className="text-white text-sm font-medium hover:text-indigo-300 transition-colors truncate block text-left"
                          >
                            {item.story_title}
                          </button>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-slate-500 text-xs">by {item.author_username}</span>
                            {item.genres.slice(0, 1).map(g => <GenreBadge key={g} genre={g} />)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeStoryFromList(list.list_id, item.story_id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {list.stories.length > 4 && (
                      <p className="text-slate-500 text-xs text-center pt-1">
                        +{list.stories.length - 4} more stories
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => navigate('/browse')}
                  className="w-full mt-3 py-2 text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 transition-colors border border-dashed border-slate-700 rounded-lg hover:border-indigo-500/50"
                >
                  <Plus size={12} />
                  Add stories
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Reading List">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">List Name *</label>
            <input
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder="My Fantasy Favorites..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Description <span className="text-slate-600">(optional)</span></label>
            <textarea
              value={newListDesc}
              onChange={e => setNewListDesc(e.target.value)}
              placeholder="What's this list about?"
              rows={2}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`w-10 h-6 rounded-full transition-colors ${isPublic ? 'bg-indigo-600' : 'bg-slate-600'} relative`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isPublic ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
            <div>
              <p className="text-white text-sm">{isPublic ? 'Public' : 'Private'}</p>
              <p className="text-slate-500 text-xs">{isPublic ? 'Anyone can see this list' : 'Only you can see this list'}</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleCreate} disabled={!newListName.trim()}>Create List</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
