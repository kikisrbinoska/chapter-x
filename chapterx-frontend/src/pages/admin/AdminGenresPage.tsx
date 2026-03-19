import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Tag } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Genre } from '../../types'

export const AdminGenresPage: React.FC = () => {
  const navigate = useNavigate()
  const { genres, addGenre, deleteGenre } = useStoryStore()
  const { addToast } = useUIStore()
  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Genre | null>(null)

  const handleAdd = () => {
    if (!newName.trim()) return
    if (genres.some(g => g.name.toLowerCase() === newName.trim().toLowerCase())) {
      addToast('Genre already exists', 'error')
      return
    }
    addGenre({ genre_id: Date.now(), name: newName.trim(), story_count: 0 })
    addToast(`Genre "${newName.trim()}" added!`)
    setNewName('')
    setAddOpen(false)
  }

  const handleDelete = (genre: Genre) => {
    if (genre.story_count > 0) {
      addToast('Cannot delete genre with associated stories', 'error')
      return
    }
    deleteGenre(genre.genre_id)
    addToast(`Genre "${genre.name}" deleted`, 'info')
    setDeleteTarget(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Manage Genres</h1>
            <p className="text-slate-400 text-sm mt-0.5">{genres.length} genres</p>
          </div>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus size={16} />
          Add Genre
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
          <Tag size={18} className="text-amber-400" />
          <h2 className="text-white font-semibold">All Genres</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {genres.map(genre => (
            <div key={genre.genre_id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-white font-medium">{genre.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm">{genre.story_count} stories</span>
                <button
                  onClick={() => setDeleteTarget(genre)}
                  className={`transition-colors p-1 rounded ${
                    genre.story_count > 0
                      ? 'text-slate-700 cursor-not-allowed'
                      : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10'
                  }`}
                  disabled={genre.story_count > 0}
                  title={genre.story_count > 0 ? 'Cannot delete genre with stories' : 'Delete genre'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Genre" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Genre Name</label>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="e.g., Dystopia..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAdd} disabled={!newName.trim()}>Add Genre</Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Genre" size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-slate-300 text-sm">
              Delete the genre <strong className="text-white">"{deleteTarget.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={() => handleDelete(deleteTarget)}>Delete</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
