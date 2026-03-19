import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Users, BookOpen, AlertTriangle, Settings, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useNotificationStore } from '../../store/notificationStore'
import { PlatformStats } from '../../components/admin/PlatformStats'
import { Button } from '../../components/ui/Button'
import { RoleBadge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'

function timeAgo(str: string): string {
  const diff = Date.now() - new Date(str).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { allUsers } = useAuthStore()
  const { stories } = useStoryStore()
  const { notifications } = useNotificationStore()

  const recentUsers = [...allUsers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
  const recentStories = [...stories].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)

  const adminLinks = [
    { to: '/admin/users', icon: <Users size={20} className="text-blue-400" />, label: 'Manage Users', desc: `${allUsers.length} registered users`, color: 'bg-blue-500/10 border-blue-500/20' },
    { to: '/admin/content', icon: <BookOpen size={20} className="text-violet-400" />, label: 'Content Moderation', desc: `${stories.length} total stories`, color: 'bg-violet-500/10 border-violet-500/20' },
    { to: '/admin/genres', icon: <Settings size={20} className="text-amber-400" />, label: 'Manage Genres', desc: 'Add or remove genres', color: 'bg-amber-500/10 border-amber-500/20' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
          <Shield size={20} className="text-rose-400" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Platform management and moderation</p>
        </div>
      </div>

      {/* Platform stats */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-bold text-white mb-4">Platform Overview</h2>
        <PlatformStats />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {adminLinks.map(link => (
          <button
            key={link.to}
            onClick={() => navigate(link.to)}
            className={`flex items-center gap-4 p-5 rounded-2xl border ${link.color} hover:scale-105 transition-all group text-left`}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
              {link.icon}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{link.label}</p>
              <p className="text-slate-400 text-sm">{link.desc}</p>
            </div>
            <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent users */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-white">Recent Users</h3>
            <Button size="sm" variant="ghost" onClick={() => navigate('/admin/users')}>
              View all <ChevronRight size={14} />
            </Button>
          </div>
          <div className="space-y-3">
            {recentUsers.map(user => (
              <div key={user.user_id} className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{user.name} {user.surname}</p>
                  <p className="text-slate-500 text-xs">@{user.username}</p>
                </div>
                <RoleBadge role={user.role} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent stories */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-white">Recent Stories</h3>
            <Button size="sm" variant="ghost" onClick={() => navigate('/admin/content')}>
              View all <ChevronRight size={14} />
            </Button>
          </div>
          <div className="space-y-3">
            {recentStories.map(story => (
              <div key={story.story_id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{story.title}</p>
                  <p className="text-slate-500 text-xs">by @{story.author_username}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  story.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : story.status === 'draft'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {story.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
