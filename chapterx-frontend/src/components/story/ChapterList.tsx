import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, BookOpen, Lock } from 'lucide-react'
import { Chapter } from '../../types'

interface ChapterListProps {
  chapters: Chapter[]
  storyId: number
  showEditLinks?: boolean
  onEdit?: (chapterId: number) => void
}

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const ChapterList: React.FC<ChapterListProps> = ({ chapters, storyId, showEditLinks, onEdit }) => {
  const navigate = useNavigate()
  const sorted = [...chapters].sort((a, b) => a.chapter_number - b.chapter_number)

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center py-10 text-slate-500">
        <BookOpen size={36} className="mb-3 opacity-40" />
        <p>No chapters yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sorted.map(chapter => (
        <div
          key={chapter.chapter_id}
          className={`flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700 transition-all ${
            chapter.is_published
              ? 'hover:border-indigo-500/40 hover:bg-slate-700/50 cursor-pointer'
              : 'opacity-60'
          }`}
          onClick={() => {
            if (chapter.is_published) navigate(`/story/${storyId}/chapter/${chapter.chapter_id}`)
          }}
        >
          {/* Number */}
          <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-indigo-400 font-semibold text-sm flex-shrink-0">
            {chapter.chapter_number}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-white text-sm font-medium truncate">{chapter.title}</h4>
              {!chapter.is_published && (
                <span className="flex items-center gap-1 text-amber-400 text-xs">
                  <Lock size={11} />
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-xs mt-0.5">
              <span>{chapter.word_count.toLocaleString()} words</span>
              <span>{formatDate(chapter.created_at)}</span>
            </div>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 text-slate-500 text-xs flex-shrink-0">
            <Eye size={12} />
            {chapter.view_count.toLocaleString()}
          </div>

          {/* Edit button */}
          {showEditLinks && onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(chapter.chapter_id) }}
              className="text-indigo-400 hover:text-indigo-300 text-xs px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors flex-shrink-0"
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
