import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Save, Globe, Archive, Trash2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { ChapterList } from '../../components/story/ChapterList'
import { CollaboratorManager } from '../../components/writer/CollaboratorManager'
import { Modal } from '../../components/ui/Modal'

const ALL_GENRES = ['Fantasy', 'Sci-Fi', 'Romance', 'Historical Fiction', 'Adventure', 'Thriller', 'Mystery', 'Horror', 'Contemporary', 'Poetry']

export const EditStoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { stories, chapters, updateStory, deleteStory, updateStoryStatus } = useStoryStore()
  const { addToast } = useUIStore()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [saving, setSaving] = useState(false)

  const story = stories.find(s => s.story_id === Number(id))

  const [form, setForm] = useState({
    title: '',
    short_description: '',
    content: '',
    genres: [] as string[],
    mature_content: false,
  })

  useEffect(() => {
    if (story) {
      setForm({
        title: story.title,
        short_description: story.short_description,
        content: story.content,
        genres: [...story.genres],
        mature_content: story.mature_content,
      })
    }
  }, [story?.story_id])

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Story not found</h2>
        <Button onClick={() => navigate('/writer')}>Back to Dashboard</Button>
      </div>
    )
  }

  const canEdit = currentUser?.user_id === story.user_id || currentUser?.role === 'admin'
  if (!canEdit) navigate('/writer')

  const storyChapters = chapters.filter(c => c.story_id === story.story_id)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 400))
    updateStory(story.story_id, { ...form, updated_at: new Date().toISOString() })
    addToast('Story updated!')
    setSaving(false)
  }

  const handleDelete = () => {
    deleteStory(story.story_id)
    addToast('Story deleted', 'info')
    navigate('/writer')
  }

  const toggleGenre = (g: string) =>
    setForm(f => ({
      ...f,
      genres: f.genres.includes(g) ? f.genres.filter(x => x !== g) : [...f.genres, g],
    }))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/writer')} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Edit Story</h1>
            <p className="text-slate-400 text-sm mt-0.5">Status: <span className="capitalize text-white">{story.status}</span></p>
          </div>
        </div>
        <div className="flex gap-2">
          {story.status === 'draft' && (
            <Button size="sm" variant="secondary" onClick={() => { updateStoryStatus(story.story_id, 'published'); addToast('Story published!') }}>
              <Globe size={14} />
              Publish
            </Button>
          )}
          {story.status === 'published' && (
            <Button size="sm" variant="ghost" onClick={() => { updateStoryStatus(story.story_id, 'archived'); addToast('Story archived', 'info') }}>
              <Archive size={14} />
              Archive
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => setDeleteConfirm(true)}>
            <Trash2 size={14} />
          </Button>
          <Button size="sm" onClick={handleSave} loading={saving}>
            <Save size={14} />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Title</label>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-serif text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Short Description</label>
            <textarea
              value={form.short_description}
              onChange={e => setForm(f => ({ ...f, short_description: e.target.value }))}
              rows={3}
              maxLength={280}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Story Content</label>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-y font-serif"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Genres</label>
            <div className="flex flex-wrap gap-2">
              {ALL_GENRES.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    form.genres.includes(g)
                      ? 'bg-indigo-500/30 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, mature_content: !f.mature_content }))}
              className={`w-11 h-6 rounded-full transition-colors ${form.mature_content ? 'bg-rose-500' : 'bg-slate-600'} relative`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.mature_content ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className="text-sm text-slate-300">Mature Content (18+)</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chapters */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Chapters</h3>
              <Button size="sm" onClick={() => navigate(`/writer/create-chapter/${story.story_id}`)}>
                <Plus size={13} />
                Add
              </Button>
            </div>
            <ChapterList
              chapters={storyChapters}
              storyId={story.story_id}
              showEditLinks
              onEdit={cid => navigate(`/writer/edit-chapter/${cid}`)}
            />
          </div>

          {/* Collaborators */}
          <CollaboratorManager
            storyId={story.story_id}
            storyTitle={story.title}
            ownerId={story.user_id}
          />
        </div>
      </div>

      {/* Delete confirm */}
      <Modal isOpen={deleteConfirm} onClose={() => setDeleteConfirm(false)} title="Delete Story" size="sm">
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Are you sure you want to permanently delete "{story.title}"? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1" onClick={handleDelete}>
              <Trash2 size={14} />
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
