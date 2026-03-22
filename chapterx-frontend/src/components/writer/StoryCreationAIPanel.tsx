import React, { useMemo, useImperativeHandle, forwardRef } from 'react'
import { Sparkles, Lightbulb } from 'lucide-react'

interface StoryCreationAIPanelProps {
  title: string
  description: string
  content: string
  genres: string[]
}

export interface StoryCreationAIPanelRef {
  getSuggestions: () => Array<{ originalText: string; suggestedText: string }>
}

interface Tip {
  type: 'plot' | 'style' | 'character' | 'grammar' | 'pacing'
  label: string
  original: string
  suggested: string
}

const typeColors: Record<Tip['type'], string> = {
  plot: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  style: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  character: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  grammar: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  pacing: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

function buildTips(title: string, description: string, content: string, genres: string[]): Tip[] {
  const tips: Tip[] = []
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  if (!title.trim()) {
    tips.push({ type: 'style', label: 'Title', original: '(no title)', suggested: 'Add a title that hints at the core conflict or world without giving it away.' })
  } else if (title.length < 5) {
    tips.push({ type: 'style', label: 'Title', original: title, suggested: 'Consider a more evocative title — even 3–4 punchy words can create intrigue.' })
  }

  if (!description.trim()) {
    tips.push({ type: 'plot', label: 'Description', original: '(no description)', suggested: 'Introduce the protagonist, hint at the conflict, and end with a hook that makes readers want more.' })
  } else if (description.length < 60) {
    tips.push({ type: 'plot', label: 'Description', original: description, suggested: 'Expand your description — give readers a taste of the stakes and what your protagonist stands to lose.' })
  }

  if (!content.trim()) {
    tips.push({ type: 'character', label: 'Opening', original: '(no content)', suggested: 'Start in the middle of action or a compelling character moment. Avoid opening with backstory dumps.' })
  } else if (wordCount < 50) {
    tips.push({ type: 'pacing', label: 'Content length', original: `${wordCount} words`, suggested: 'Give readers more to engage with — the opening sets tone and world before the story begins.' })
  } else if (wordCount > 200) {
    tips.push({ type: 'pacing', label: 'Pacing', original: content.slice(0, 80) + '...', suggested: 'Great start! Keep momentum — each paragraph should make the reader want to continue.' })
  }

  if (genres.length === 0) {
    tips.push({ type: 'plot', label: 'Genres', original: '(none selected)', suggested: 'Select genres to help readers discover your story. Pick the ones that best match tone and setting.' })
  }

  if (genres.includes('Fantasy') || genres.includes('Sci-Fi')) {
    tips.push({ type: 'character', label: 'World-building', original: content.slice(0, 60) || '(content)', suggested: 'Weave world-building into scenes naturally — show the world through your character\'s eyes, not info-dumps.' })
  }

  if (genres.includes('Romance')) {
    tips.push({ type: 'character', label: 'Chemistry', original: description || '(description)', suggested: 'Establish your characters\' desires and flaws early so their connection feels earned.' })
  }

  if (genres.includes('Thriller') || genres.includes('Mystery')) {
    tips.push({ type: 'plot', label: 'Tension', original: content.slice(0, 60) || '(opening)', suggested: 'Plant an unanswered question in your opening. Thriller/mystery readers stay for the unresolved "why".' })
  }

  if (genres.includes('Horror')) {
    tips.push({ type: 'pacing', label: 'Atmosphere', original: content.slice(0, 60) || '(opening)', suggested: 'Build dread gradually — horror works best when the reader senses something is wrong before the characters do.' })
  }

  return tips.slice(0, 5)
}

export const StoryCreationAIPanel = forwardRef<StoryCreationAIPanelRef, StoryCreationAIPanelProps>(
  ({ title, description, content, genres }, ref) => {
    const tips = useMemo(
      () => buildTips(title, description, content, genres),
      [title, description, content, genres.join(',')]
    )

    useImperativeHandle(ref, () => ({
      getSuggestions: () => tips.map(t => ({ originalText: t.original, suggestedText: t.suggested })),
    }))

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 sticky top-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-violet-400" />
          <h3 className="text-white font-semibold text-sm">AI Writing Tips</h3>
          <span className="ml-auto text-xs text-slate-500">{tips.length} suggestions</span>
        </div>

        {tips.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm">
            <Sparkles size={28} className="mx-auto mb-2 opacity-30" />
            <p>Looking great! No suggestions right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
                <Lightbulb size={15} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeColors[tip.type]}`}>
                      {tip.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{tip.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 italic mb-1 truncate">"{tip.original}"</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{tip.suggested}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
