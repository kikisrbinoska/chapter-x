import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { Button } from '../../components/ui/Button'

export const ChapterReadPage: React.FC = () => {
  const { storyId, chapterId } = useParams<{ storyId: string; chapterId: string }>()
  const navigate = useNavigate()
  const { stories, chapters, incrementViewCount } = useStoryStore()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewed, setViewed] = useState(false)

  const story = stories.find(s => s.story_id === Number(storyId))
  const chapter = chapters.find(c => c.chapter_id === Number(chapterId))
  const storyChapters = chapters
    .filter(c => c.story_id === Number(storyId) && c.is_published)
    .sort((a, b) => a.chapter_number - b.chapter_number)

  const currentIndex = storyChapters.findIndex(c => c.chapter_id === Number(chapterId))
  const prevChapter = currentIndex > 0 ? storyChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < storyChapters.length - 1 ? storyChapters[currentIndex + 1] : null

  // Track scroll progress
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollProgress(Math.min(100, progress))
      // Increment view count when 30% read
      if (progress > 30 && !viewed) {
        setViewed(true)
        if (chapter) incrementViewCount(chapter.chapter_id)
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [chapter, viewed, incrementViewCount])

  if (!story || !chapter) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Chapter not found</h2>
        <Button onClick={() => navigate('/browse')}>Browse Stories</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top nav */}
      <div className="sticky top-1 z-40 glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(`/story/${story.story_id}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:block">{story.title}</span>
          </button>

          <div className="text-center">
            <p className="text-white text-sm font-medium">{chapter.title}</p>
            <p className="text-slate-500 text-xs">Chapter {chapter.chapter_number}</p>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Eye size={12} />
            {scrollProgress.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Chapter header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-medium mb-2 uppercase tracking-widest">
            Chapter {chapter.chapter_number}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {chapter.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1">
              <BookOpen size={13} />
              {chapter.word_count.toLocaleString()} words
            </span>
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {chapter.view_count.toLocaleString()} reads
            </span>
          </div>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Chapter content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {chapter.content.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="text-slate-300 leading-relaxed text-lg mb-6 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:mr-2 first-letter:mt-1"
              style={i !== 0 ? { textIndent: '2rem' } : undefined}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Chapter navigation */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex items-center justify-between gap-4">
            {prevChapter ? (
              <button
                onClick={() => navigate(`/story/${storyId}/chapter/${prevChapter.chapter_id}`)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500/50 transition-all group flex-1 max-w-[45%]"
              >
                <ChevronLeft size={18} className="text-slate-400 group-hover:text-indigo-400 flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-xs text-slate-500">Previous</p>
                  <p className="text-white text-sm truncate">{prevChapter.title}</p>
                </div>
              </button>
            ) : (
              <div className="flex-1" />
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/story/${story.story_id}`)}
            >
              Contents
            </Button>

            {nextChapter ? (
              <button
                onClick={() => navigate(`/story/${storyId}/chapter/${nextChapter.chapter_id}`)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500/50 transition-all group flex-1 max-w-[45%] justify-end"
              >
                <div className="text-right min-w-0">
                  <p className="text-xs text-slate-500">Next</p>
                  <p className="text-white text-sm truncate">{nextChapter.title}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-400 flex-shrink-0" />
              </button>
            ) : (
              <div className="flex-1 text-center">
                <p className="text-slate-500 text-sm">End of story</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
