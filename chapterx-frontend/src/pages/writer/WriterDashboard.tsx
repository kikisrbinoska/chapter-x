import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, BookOpen, Heart, MessageCircle, TrendingUp, Bell } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useNotificationStore } from '../../store/notificationStore'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/Badge'
import { StoryAnalytics } from '../../components/writer/StoryAnalytics'

function timeAgo(str: string): string {
  const diff = Date.now() - new Date(str).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export const WriterDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { stories, collaborations, fetchStories } = useStoryStore()
  const { notifications } = useNotificationStore()

  useEffect(() => { fetchStories() }, [])

  if (!currentUser) return null

  const ownedStories = stories.filter(s => s.user_id === currentUser.user_id)
  const collabStoryIds = new Set(collaborations.filter(c => c.user_id === currentUser.user_id).map(c => c.story_id))
  const collabStories = stories.filter(s => collabStoryIds.has(s.story_id))
  const myStories = ownedStories
  const allDashboardStories = [...ownedStories, ...collabStories]
  const published = myStories.filter(s => s.status === 'published')
  const drafts = myStories.filter(s => s.status === 'draft')
  const totalLikes = myStories.reduce((acc, s) => acc + s.total_likes, 0)

  const recentNotifs = notifications.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-slate-400 mt-1">Here's how your stories are performing</p>
        </div>
        <Button onClick={() => navigate('/writer/create-story')}>
          <Plus size={16} />
          New Story
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <BookOpen size={20} className="text-indigo-300" />, label: 'Total Stories', value: myStories.length, sub: `${published.length} published`, color: 'bg-indigo-500/20' },
          { icon: <Heart size={20} className="text-rose-300" />, label: 'Total Likes', value: totalLikes.toLocaleString(), sub: 'Across all stories', color: 'bg-rose-500/20' },
          { icon: <TrendingUp size={20} className="text-emerald-300" />, label: 'Drafts', value: drafts.length, sub: 'In progress', color: 'bg-emerald-500/20' },
        ].map(s => (
          <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-slate-400 text-sm mt-0.5">{s.label}</p>
            <p className="text-slate-600 text-xs mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My stories */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-white">My Stories</h2>
          </div>
          {allDashboardStories.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
              <BookOpen size={40} className="mx-auto mb-4 text-slate-600" />
              <h3 className="text-white font-medium mb-2">No stories yet</h3>
              <p className="text-slate-500 text-sm mb-4">Start your writing journey today!</p>
              <Button onClick={() => navigate('/writer/create-story')}>
                <Plus size={14} />
                Create Your First Story
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {allDashboardStories.map(story => {
                const isCollab = collabStoryIds.has(story.story_id)
                return (
                  <div key={story.story_id} className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium text-sm truncate">{story.title}</h3>
                        <StatusBadge status={story.status} />
                        {isCollab && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                            Collaborator
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        {isCollab && <span className="text-slate-500">by {story.author_username}</span>}
                        <span className="flex items-center gap-1"><Heart size={11} /> {story.total_likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={11} /> {story.total_comments}</span>
                        <span>{story.total_chapters} chapters</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/story/${story.story_id}`)}>View</Button>
                      <Button size="sm" variant="secondary" onClick={() => navigate(`/writer/edit-story/${story.story_id}`)}>Edit</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent notifications */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-amber-400" />
            <h2 className="font-serif text-xl font-bold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            {recentNotifs.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">No recent activity</div>
            ) : (
              recentNotifs.map(n => (
                <div key={n.notification_id} className={`p-3 rounded-xl border text-sm ${
                  !n.is_read ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-slate-800 border-slate-700'
                }`}>
                  <p className="text-white text-xs font-medium">{n.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-slate-600 text-xs mt-1">{timeAgo(n.created_at)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Analytics */}
      {myStories.some(s => s.status === 'published') && (
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-indigo-400" />
            <h2 className="font-serif text-xl font-bold text-white">Analytics</h2>
          </div>
          <StoryAnalytics stories={myStories} />
        </div>
      )}
    </div>
  )
}
