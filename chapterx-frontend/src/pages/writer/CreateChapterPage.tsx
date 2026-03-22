import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { Chapter } from '../../types'

export const CreateChapterPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { stories, chapters, addChapter } = useStoryStore()
  const { addToast } = useUIStore()
  const [form, setForm] = useState({ title: '', content: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const story = stories.find(s => s.story_id === Number(storyId))
  const storyChapters = chapters.filter(c => c.story_id === Number(storyId))
  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Story not found</h2>
        <Button onClick={() => navigate('/writer')}>Back</Button>
      </div>
    )
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Chapter title is required'
    if (!form.content.trim()) e.content = 'Chapter content is required'
    if (wordCount < 10) e.content = 'Chapter must be at least 10 words'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (isPublished: boolean) => {
    if (!validate() || !currentUser) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const chapter: Chapter = {
      chapter_id: Date.now(),
      story_id: Number(storyId),
      title: form.title.trim(),
      content: form.content.trim(),
      chapter_number: storyChapters.length + 1,
      word_count: wordCount,
      view_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_published: isPublished,
    }
    try {
      await addChapter(chapter)
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save chapter.'
      addToast(msg, 'error')
      setLoading(false)
      return
    }
    addToast(isPublished ? 'Chapter published!' : 'Chapter saved as draft!')
    navigate(isPublished ? `/story/${storyId}` : `/writer/edit-story/${storyId}`)
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(`/writer/edit-story/${storyId}`)} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-slate-400 text-sm">{story.title}</p>
          <h1 className="font-serif text-2xl font-bold text-white">New Chapter</h1>
          <p className="text-slate-500 text-xs mt-0.5">Chapter {storyChapters.length + 1}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Chapter Title *</label>
          <input
            value={form.title}
            onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(e => ({ ...e, title: '' })) }}
            placeholder="The Awakening..."
            className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-serif text-lg ${errors.title ? 'border-rose-500' : 'border-slate-700'}`}
          />
          {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-300">Chapter Content *</label>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen size={12} />
              <span className={wordCount > 100 ? 'text-emerald-400' : wordCount > 50 ? 'text-amber-400' : 'text-slate-500'}>
                {wordCount.toLocaleString()} words
              </span>
            </div>
          </div>
          <textarea
            value={form.content}
            onChange={e => { setForm(f => ({ ...f, content: e.target.value })); setErrors(e => ({ ...e, content: '' })) }}
            placeholder="Begin your chapter here..."
            rows={20}
            className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y font-serif text-base leading-relaxed ${errors.content ? 'border-rose-500' : 'border-slate-700'}`}
          />
          {errors.content && <p className="text-rose-400 text-xs mt-1">{errors.content}</p>}
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button variant="secondary" className="flex-1" onClick={() => handleSubmit(false)} loading={loading}>
            Save as Draft
          </Button>
          <Button className="flex-1" onClick={() => handleSubmit(true)} loading={loading}>
            Publish Chapter
          </Button>
        </div>
      </div>
    </div>
  )
}
