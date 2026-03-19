import React, { useState } from 'react'
import { MessageCircle, Trash2, Send } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'
import { Comment } from '../../types'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'

interface CommentSectionProps {
  storyId: number
  authorUserId: number
}

function timeAgo(str: string): string {
  const diff = Date.now() - new Date(str).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export const CommentSection: React.FC<CommentSectionProps> = ({ storyId, authorUserId }) => {
  const { currentUser } = useAuthStore()
  const { comments, addComment, deleteComment } = useStoryStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const storyComments = comments
    .filter(c => c.story_id === storyId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const handleSubmit = async () => {
    if (!text.trim() || !currentUser) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 300))
    const comment: Comment = {
      comment_id: Date.now(),
      story_id: storyId,
      user_id: currentUser.user_id,
      username: currentUser.username,
      content: text.trim(),
      created_at: new Date().toISOString(),
    }
    addComment(comment)
    if (currentUser.user_id !== authorUserId) {
      addNotification({
        user_id: authorUserId,
        type: 'comment',
        title: 'New Comment',
        message: `${currentUser.username} commented: "${text.trim().slice(0, 60)}..."`,
        link: `/story/${storyId}`,
      })
    }
    setText('')
    setSubmitting(false)
    addToast('Comment posted!')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} className="text-indigo-400" />
        <h3 className="text-white font-semibold">Comments ({storyComments.length})</h3>
      </div>

      {/* Input */}
      {currentUser ? (
        <div className="flex gap-3">
          <Avatar name={currentUser.name} size="sm" />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button
                size="sm"
                onClick={handleSubmit}
                loading={submitting}
                disabled={!text.trim()}
              >
                <Send size={14} />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-slate-400 text-sm">
            <a href="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</a> to leave a comment.
          </p>
        </div>
      )}

      {/* Comment list */}
      <div className="space-y-3">
        {storyComments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          storyComments.map(comment => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              canDelete={currentUser?.user_id === comment.user_id || currentUser?.role === 'admin'}
              onDelete={() => { deleteComment(comment.comment_id); addToast('Comment deleted', 'info') }}
            />
          ))
        )}
      </div>
    </div>
  )
}

const CommentCard: React.FC<{
  comment: Comment
  canDelete: boolean
  onDelete: () => void
}> = ({ comment, canDelete, onDelete }) => (
  <div className="flex gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
    <Avatar name={comment.username} size="sm" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{comment.username}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{timeAgo(comment.created_at)}</span>
          {canDelete && (
            <button onClick={onDelete} className="text-slate-500 hover:text-rose-400 transition-colors">
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
      <p className="text-slate-300 text-sm mt-1 leading-relaxed">{comment.content}</p>
    </div>
  </div>
)
