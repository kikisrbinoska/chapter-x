import React, { useState, useEffect } from 'react'
import { Sparkles, Check, X, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { AISuggestion, SuggestionType } from '../../types'
import { Button } from '../ui/Button'

interface AISuggestionPanelProps {
  chapterId: number
  storyId?: number
}

const typeColors: Record<SuggestionType, string> = {
  grammar: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  style: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  plot: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  character: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  pacing: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

const SuggestionCard: React.FC<{
  suggestion: AISuggestion
  onAccept: () => void
  onReject: () => void
}> = ({ suggestion, onAccept, onReject }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeColors[suggestion.suggestion_type]}`}>
            {suggestion.suggestion_type}
          </span>
          {suggestion.accepted === true && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Check size={12} /> Accepted
            </span>
          )}
          {suggestion.accepted === false && (
            <span className="flex items-center gap-1 text-xs text-rose-400">
              <X size={12} /> Rejected
            </span>
          )}
          {suggestion.accepted === null && (
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <Clock size={12} /> Pending
            </span>
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Original:</p>
          <p className="text-sm text-slate-400 bg-slate-900 rounded-lg p-3 italic border border-slate-700">
            "{suggestion.original_text}"
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Suggested:</p>
          <p className="text-sm text-emerald-300 bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/20">
            "{suggestion.suggested_text}"
          </p>
        </div>

        {expanded && (
          <div>
            <p className="text-xs text-slate-500 mb-1">Explanation:</p>
            <p className="text-sm text-slate-400">{suggestion.explanation}</p>
            {suggestion.applied_at && (
              <p className="text-xs text-slate-600 mt-2">
                Applied: {new Date(suggestion.applied_at).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {suggestion.accepted === null && (
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={onAccept} className="flex-1">
              <Check size={14} />
              Accept
            </Button>
            <Button size="sm" variant="danger" onClick={onReject} className="flex-1">
              <X size={14} />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export const AISuggestionPanel: React.FC<AISuggestionPanelProps> = ({ chapterId, storyId }) => {
  const { aiSuggestions, acceptSuggestion, rejectSuggestion, fetchSuggestions } = useStoryStore()
  const { addToast } = useUIStore()
  const [tab, setTab] = useState<'pending' | 'accepted' | 'rejected'>('pending')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchSuggestions().finally(() => setLoading(false))
  }, [chapterId])

  // Filter by storyId if available (backend), else fall back to chapterId (mock)
  const chapterSuggestions = aiSuggestions.filter(s =>
    storyId ? (s as any).story_id === storyId : s.chapter_id === chapterId
  )
  const pending = chapterSuggestions.filter(s => s.accepted === null)
  const accepted = chapterSuggestions.filter(s => s.accepted === true)
  const rejected = chapterSuggestions.filter(s => s.accepted === false)

  const currentList = tab === 'pending' ? pending : tab === 'accepted' ? accepted : rejected

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-violet-400" />
        <h3 className="text-white font-semibold">AI Writing Suggestions</h3>
        <span className="ml-auto text-xs text-slate-500">{chapterSuggestions.length} total</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-800 rounded-xl mb-4">
        {([
          { key: 'pending', label: 'Pending', count: pending.length },
          { key: 'accepted', label: 'Accepted', count: accepted.length },
          { key: 'rejected', label: 'Rejected', count: rejected.length },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              tab === t.key ? 'bg-indigo-500' : 'bg-slate-700'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            <Sparkles size={32} className="mx-auto mb-2 opacity-30 animate-pulse" />
            Loading suggestions...
          </div>
        ) : currentList.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            <Sparkles size={32} className="mx-auto mb-2 opacity-30" />
            No {tab} suggestions
          </div>
        ) : (
          currentList.map(s => (
            <SuggestionCard
              key={s.suggestion_id}
              suggestion={s}
              onAccept={async () => { await acceptSuggestion(s.suggestion_id); addToast('Suggestion accepted!') }}
              onReject={async () => { await rejectSuggestion(s.suggestion_id); addToast('Suggestion rejected', 'info') }}
            />
          ))
        )}
      </div>
    </div>
  )
}
