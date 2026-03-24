import React, { useEffect, useState } from 'react'
import { MessageCircle, Trash2, Send } from 'lucide-react'
import axios from 'axios'
import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'

const API = 'https://localhost:7125/api'

function getAuthHeaders() {
  try {
    const token = JSON.parse(localStorage.getItem('chapterx-auth') || '{}')?.state?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch { return {} }
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

interface BackendComment {
  id: number
  content: string
  userId: number
  storyId: number
  username: string
  createdAt: string
}

interface CommentSectionProps {
  storyId: number
  authorUserId: number
  onCountChange?: (count: number) => void
}

export const CommentSection: React.FC<CommentSectionProps> = ({ storyId, authorUserId, onCountChange }) => {
  const { currentUser } = useAuthStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()
  const [comments, setComments] = useState<BackendComment[]>([])
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios.get(`${API}/comments/story/${storyId}`)
      .then(res => {
        const data = res.data ?? []
        setComments(data)
        onCountChange?.(data.length)
      })
      .catch(() => {})
  }, [storyId])

  const handleSubmit = async () => {
    if (!text.trim() || !currentUser) return
    setSubmitting(true)
    try {
      const res = await axios.post(`${API}/comments`, {
        content: text.trim(),
        userId: currentUser.user_id,
        storyId,
      }, { headers: getAuthHeaders() })
      const newComment: BackendComment = {
        id: res.data?.id ?? Date.now(),
        content: text.trim(),
        userId: currentUser.user_id,
        storyId,
        username: currentUser.username,
        createdAt: new Date().toISOString(),
      }
      setComments(prev => { const next = [newComment, ...prev]; onCountChange?.(next.length); return next })
      if (currentUser.user_id !== authorUserId) {
        await addNotification({
          recipientUserId: authorUserId,
          type: 'comment',
          content: `${currentUser.username} commented: "${text.trim().slice(0, 60)}${text.length > 60 ? '...' : ''}"`,
          link: `/story/${storyId}`,
        })
      }
      setText('')
      addToast('Comment posted!')
    } catch {
      addToast('Failed to post comment.', 'error')
    }
    setSubmitting(false)
  }

  const handleDelete = async (commentId: number) => {
    try {
      await axios.delete(`${API}/comments/${commentId}`, { headers: getAuthHeaders() })
      setComments(prev => { const next = prev.filter(c => c.id !== commentId); onCountChange?.(next.length); return next })
      addToast('Comment deleted', 'info')
    } catch {
      addToast('Failed to delete comment.', 'error')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} className="text-indigo-400" />
        <h3 className="text-white font-semibold">Comments ({comments.length})</h3>
      </div>

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
              <Button size="sm" onClick={handleSubmit} loading={submitting} disabled={!text.trim()}>
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

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
              <Avatar name={comment.username} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{comment.username}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{timeAgo(comment.createdAt)}</span>
                    {(currentUser?.user_id === comment.userId || currentUser?.role === 'admin') && (
                      <button onClick={() => handleDelete(comment.id)} className="text-slate-500 hover:text-rose-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-1 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
