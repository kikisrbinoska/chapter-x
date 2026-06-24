import React, { useEffect } from 'react'
import { Users, BookOpen, Heart, MessageCircle, Eye } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'

export const PlatformStats: React.FC = () => {
  const { allUsers, fetchAllUsers } = useAuthStore()
  const { stories, fetchStories } = useStoryStore()

  useEffect(() => { fetchStories(); fetchAllUsers() }, [])

  const totalLikes = stories.reduce((acc, s) => acc + s.total_likes, 0)
  const totalComments = stories.reduce((acc, s) => acc + s.total_comments, 0)
  const totalViews = stories.reduce((acc, s) => acc + s.total_views, 0)
  const published = stories.filter(s => s.status === 'published').length

  const stats = [
    { icon: <Users size={24} className="text-blue-300" />, label: 'Total Users', value: allUsers.length, color: 'bg-blue-500/20', change: `${allUsers.filter(u => u.role === 'writer').length} writers` },
    { icon: <BookOpen size={24} className="text-violet-300" />, label: 'Total Stories', value: stories.length, color: 'bg-violet-500/20', change: `${published} published` },
    { icon: <Eye size={24} className="text-cyan-300" />, label: 'Total Views', value: totalViews.toLocaleString(), color: 'bg-cyan-500/20', change: 'Chapter reads' },
    { icon: <Heart size={24} className="text-rose-300" />, label: 'Total Likes', value: totalLikes.toLocaleString(), color: 'bg-rose-500/20', change: 'Across all stories' },
    { icon: <MessageCircle size={24} className="text-emerald-300" />, label: 'Total Comments', value: totalComments.toLocaleString(), color: 'bg-emerald-500/20', change: 'Platform-wide' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
            {stat.icon}
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
          <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
          <p className="text-slate-600 text-xs mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
