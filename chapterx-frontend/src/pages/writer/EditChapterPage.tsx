import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Globe, BookOpen } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { AISuggestionPanel } from '../../components/writer/AISuggestionPanel'

export const EditChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>()
  const navigate = useNavigate()
  const { stories, chapters, updateChapter } = useStoryStore()
  const { addToast } = useUIStore()
  const [saving, setSaving] = useState(false)

  const chapter = chapters.find(c => c.chapter_id === Number(chapterId))
  const story = chapter ? stories.find(s => s.story_id === chapter.story_id) : null

  const [form, setForm] = useState({ title: '', content: '' })

  useEffect(() => {
    if (chapter) {
      setForm({ title: chapter.title, content: chapter.content })
    }
  }, [chapter?.chapter_id])

  if (!chapter || !story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Chapter not found</h2>
        <Button onClick={() => navigate('/writer')}>Back</Button>
      </div>
    )
  }

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length

  const handleSave = async (publish?: boolean) => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 400))
    updateChapter(chapter.chapter_id, {
      ...form,
      word_count: wordCount,
      is_published: publish !== undefined ? publish : chapter.is_published,
    })
    addToast('Chapter saved!')
    setSaving(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/writer/edit-story/${story.story_id}`)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-slate-400 text-sm">{story.title} · Chapter {chapter.chapter_number}</p>
            <h1 className="font-serif text-2xl font-bold text-white">Edit Chapter</h1>
          </div>
        </div>
        <div className="flex gap-2">
          {!chapter.is_published && (
            <Button size="sm" variant="secondary" onClick={() => handleSave(true)} loading={saving}>
              <Globe size={14} />
              Publish
            </Button>
          )}
          <Button size="sm" onClick={() => handleSave()} loading={saving}>
            <Save size={14} />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Chapter Title</label>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-serif text-lg"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-300">Content</label>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <BookOpen size={12} />
                {wordCount.toLocaleString()} words
              </span>
            </div>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={24}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-y font-serif text-base leading-relaxed"
            />
          </div>

          <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
            chapter.is_published
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {chapter.is_published ? 'Published — visible to readers' : 'Draft — not visible to readers'}
          </div>
        </div>

        {/* AI Suggestions panel */}
        <div>
          <AISuggestionPanel chapterId={chapter.chapter_id} storyId={chapter.story_id} />
        </div>
      </div>
    </div>
  )
}
