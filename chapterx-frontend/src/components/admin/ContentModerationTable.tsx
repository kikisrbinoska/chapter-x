import React, { useState } from 'react'
import { Trash2, Eye, AlertTriangle } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'
import { Story } from '../../types'
import { StatusBadge, GenreBadge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { useNavigate } from 'react-router-dom'

export const ContentModerationTable: React.FC = () => {
  const { stories, deleteStory } = useStoryStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()
  const navigate = useNavigate()
  const [confirmStory, setConfirmStory] = useState<Story | null>(null)

  const handleDelete = (story: Story) => {
    deleteStory(story.story_id)
    addNotification({
      user_id: story.user_id,
      type: 'system',
      title: 'Story Removed',
      message: `Your story "${story.title}" has been removed by an administrator.`,
    })
    addToast(`"${story.title}" removed from platform`, 'info')
    setConfirmStory(null)
  }

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">Story</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Author</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Genres</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden sm:table-cell">Published</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {stories.map(story => (
              <tr key={story.story_id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-white font-medium line-clamp-1">{story.title}</p>
                    {story.mature_content && (
                      <span className="text-xs text-rose-400">18+</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400 hidden md:table-cell">@{story.author_username}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {story.genres.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={story.status} /></td>
                <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{formatDate(story.created_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/story/${story.story_id}`)}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmStory(story)}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stories.length === 0 && (
          <div className="text-center py-10 text-slate-500">No stories to moderate.</div>
        )}
      </div>

      {/* Confirm modal */}
      <Modal
        isOpen={!!confirmStory}
        onClose={() => setConfirmStory(null)}
        title="Remove Story"
        size="sm"
      >
        {confirmStory && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
              <AlertTriangle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">"{confirmStory.title}"</p>
                <p className="text-slate-400 text-xs mt-1">
                  This will permanently remove the story and notify the author. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirmStory(null)}>
                Cancel
              </Button>
              <Button variant="danger" className="flex-1" onClick={() => handleDelete(confirmStory)}>
                <Trash2 size={14} />
                Remove Story
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
