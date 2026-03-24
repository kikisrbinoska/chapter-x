import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'

const API = 'https://localhost:7125/api'

function getAuthHeaders() {
  try {
    const token = JSON.parse(localStorage.getItem('chapterx-auth') || '{}')?.state?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch { return {} }
}

interface LikeButtonProps {
  storyId: number
  authorUserId: number
  totalLikes: number
  onCountChange?: (count: number) => void
}

export const LikeButton: React.FC<LikeButtonProps> = ({ storyId, authorUserId, totalLikes, onCountChange }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(totalLikes)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${API}/likes/story/${storyId}`)
      .then(res => {
        const c = res.data?.count ?? totalLikes
        setCount(c)
        onCountChange?.(c)
        if (currentUser) {
          setLiked((res.data?.userIds ?? []).includes(currentUser.user_id))
        }
      })
      .catch(() => {})
  }, [storyId, currentUser?.user_id])

  const handleClick = async () => {
    if (!currentUser) {
      addToast('Please sign in to like stories.', 'info')
      navigate('/login')
      return
    }
    if (loading) return
    setLoading(true)
    try {
      if (liked) {
        await axios.delete(`${API}/likes/user/${currentUser.user_id}/story/${storyId}`, { headers: getAuthHeaders() })
        setLiked(false)
        setCount(c => { const n = c - 1; onCountChange?.(n); return n })
        addToast('Removed from likes', 'info')
      } else {
        await axios.post(`${API}/likes`, { userId: currentUser.user_id, storyId }, { headers: getAuthHeaders() })
        setLiked(true)
        setCount(c => { const n = c + 1; onCountChange?.(n); return n })
        if (currentUser.user_id !== authorUserId) {
          await addNotification({
            recipientUserId: authorUserId,
            type: 'like',
            content: `${currentUser.username} liked your story.`,
            link: `/story/${storyId}`,
          })
        }
        addToast('Added to likes!', 'success')
      }
    } catch {
      addToast('Something went wrong.', 'error')
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
        liked
          ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-rose-500/40 hover:text-rose-400 hover:bg-rose-500/10'
      }`}
    >
      <Heart size={16} className={liked ? 'fill-rose-400' : ''} />
      <span className="text-sm font-medium">{count.toLocaleString()}</span>
    </button>
  )
}
