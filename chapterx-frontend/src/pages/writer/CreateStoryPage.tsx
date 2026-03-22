import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Feather, ArrowLeft, X } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { StoryCreationAIPanel, StoryCreationAIPanelRef } from '../../components/writer/StoryCreationAIPanel'
import { Story } from '../../types'

const ALL_GENRES = ['Fantasy', 'Sci-Fi', 'Romance', 'Historical Fiction', 'Adventure', 'Thriller', 'Mystery', 'Horror', 'Contemporary', 'Poetry']

export const CreateStoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { addStory, addSuggestion } = useStoryStore()
  const { addToast } = useUIStore()
  const aiPanelRef = useRef<StoryCreationAIPanelRef>(null)
  const [form, setForm] = useState({
    title: '',
    short_description: '',
    content: '',
    genres: [] as string[],
    mature_content: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.short_description.trim()) e.short_description = 'Description is required'
    if (form.short_description.length > 280) e.short_description = 'Max 280 characters'
    if (!form.content.trim()) e.content = 'Story content is required'
    if (form.genres.length === 0) e.genres = 'Select at least one genre'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validate() || !currentUser) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const story: Story = {
      story_id: Date.now(),
      ...form,
      user_id: currentUser.user_id,
      author_username: currentUser.username,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_likes: 0,
      total_comments: 0,
      total_chapters: 0,
      total_views: 0,
    }
    let realId: number
    try {
      realId = await addStory(story)
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save story.'
      addToast(msg, 'error')
      setLoading(false)
      return
    }

    addToast(status === 'published' ? 'Story published!' : 'Draft saved!')
    navigate(`/writer/edit-story/${realId}`)
    setLoading(false)
  }

  const toggleGenre = (g: string) => {
    setForm(f => ({
      ...f,
      genres: f.genres.includes(g) ? f.genres.filter(x => x !== g) : [...f.genres, g],
    }))
    setErrors(e => ({ ...e, genres: '' }))
  }

  const setField = (field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/writer')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Create New Story</h1>
          <p className="text-slate-400 text-sm mt-0.5">Tell your story to the world</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Story Title *</label>
            <input
              value={form.title}
              onChange={e => setField('title', e.target.value)}
              placeholder="The Chronicles of Eldoria..."
              className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-lg font-serif ${errors.title ? 'border-rose-500' : 'border-slate-700'}`}
            />
            {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Short description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Short Description * <span className="text-slate-500 font-normal">(shown on story cards)</span></label>
            <textarea
              value={form.short_description}
              onChange={e => setField('short_description', e.target.value)}
              placeholder="When the last dragon awakens..."
              rows={3}
              maxLength={280}
              className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none ${errors.short_description ? 'border-rose-500' : 'border-slate-700'}`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.short_description ? <p className="text-rose-400 text-xs">{errors.short_description}</p> : <span />}
              <span className="text-slate-600 text-xs">{form.short_description.length}/280</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Story Content *</label>
            <textarea
              value={form.content}
              onChange={e => setField('content', e.target.value)}
              placeholder="Begin your story here. This is the introduction that readers will see..."
              rows={8}
              className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y font-serif ${errors.content ? 'border-rose-500' : 'border-slate-700'}`}
            />
            {errors.content && <p className="text-rose-400 text-xs mt-1">{errors.content}</p>}
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Genres * <span className="text-slate-500 font-normal">(select 1-3)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
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
                  {form.genres.includes(g) && <span className="mr-1">✓</span>}
                  {g}
                </button>
              ))}
            </div>
            {form.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {form.genres.map(g => (
                  <span key={g} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full">
                    {g}
                    <button onClick={() => toggleGenre(g)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            )}
            {errors.genres && <p className="text-rose-400 text-xs mt-1">{errors.genres}</p>}
          </div>

          {/* Mature content */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setField('mature_content', !form.mature_content)}
              className={`w-11 h-6 rounded-full transition-colors ${form.mature_content ? 'bg-rose-500' : 'bg-slate-600'} relative flex-shrink-0`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.mature_content ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <div>
              <p className="text-white text-sm font-medium">Mature Content (18+)</p>
              <p className="text-slate-500 text-xs">Enable for stories with adult themes</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <Button variant="secondary" className="flex-1" onClick={() => handleSubmit('draft')} loading={loading}>
              Save as Draft
            </Button>
            <Button className="flex-1" onClick={() => handleSubmit('published')} loading={loading}>
              <Feather size={16} />
              Publish Story
            </Button>
          </div>
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="lg:col-span-1">
          <StoryCreationAIPanel
            ref={aiPanelRef}
            title={form.title}
            description={form.short_description}
            content={form.content}
            genres={form.genres}
          />
        </div>
      </div>
    </div>
  )
}
