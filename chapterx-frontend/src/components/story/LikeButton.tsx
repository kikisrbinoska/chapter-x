import React from 'react'
import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'

interface LikeButtonProps {
  storyId: number
  authorUserId: number
  totalLikes: number
}

export const LikeButton: React.FC<LikeButtonProps> = ({ storyId, authorUserId, totalLikes }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { toggleLike, isLiked } = useStoryStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()

  const liked = currentUser ? isLiked(currentUser.user_id, storyId) : false

  const handleClick = () => {
    if (!currentUser) {
      addToast('Please sign in to like stories.', 'info')
      navigate('/login')
      return
    }
    toggleLike(currentUser.user_id, storyId)
    if (!liked && currentUser.user_id !== authorUserId) {
      addNotification({
        user_id: authorUserId,
        type: 'like',
        title: 'New Like',
        message: `${currentUser.username} liked your story.`,
        link: `/story/${storyId}`,
      })
    }
    addToast(liked ? 'Removed from likes' : 'Added to likes!', liked ? 'info' : 'success')
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
        liked
          ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-rose-500/40 hover:text-rose-400 hover:bg-rose-500/10'
      }`}
    >
      <Heart size={16} className={liked ? 'fill-rose-400' : ''} />
      <span className="text-sm font-medium">{totalLikes.toLocaleString()}</span>
    </button>
  )
}
