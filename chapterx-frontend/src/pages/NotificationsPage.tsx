import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Heart, MessageCircle, Users, Settings, Check, ExternalLink } from 'lucide-react'
import { useNotificationStore } from '../store/notificationStore'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { NotificationType } from '../types'

const typeIcon = (type: NotificationType) => {
  switch (type) {
    case 'like': return <Heart size={16} className="text-rose-400" />
    case 'comment': return <MessageCircle size={16} className="text-blue-400" />
    case 'collaboration': return <Users size={16} className="text-violet-400" />
    case 'system': return <Settings size={16} className="text-slate-400" />
    default: return <Bell size={16} className="text-slate-400" />
  }
}

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { notifications, markAllRead, markRead } = useNotificationStore()

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Bell size={48} className="mx-auto mb-4 text-slate-600" />
        <h2 className="text-2xl text-white mb-4">Sign in to view notifications</h2>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    )
  }

  const userNotifications = notifications
  const unread = userNotifications.filter(n => !n.is_read)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Notifications</h1>
          {unread.length > 0 && (
            <p className="text-slate-400 text-sm mt-1">{unread.length} unread</p>
          )}
        </div>
        {unread.length > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            <Check size={14} />
            Mark all read
          </Button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Bell size={48} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No notifications yet</p>
          <p className="text-sm mt-1">You'll see activity here when readers interact with your content.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {userNotifications.map(n => (
            <div
              key={n.notification_id}
              className={`flex gap-4 p-4 rounded-2xl border transition-colors cursor-pointer ${
                !n.is_read
                  ? 'bg-indigo-500/5 border-indigo-500/20 hover:bg-indigo-500/10'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700/50'
              }`}
              onClick={() => {
                markRead(n.notification_id)
                if (n.link) navigate(n.link)
              }}
            >
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                {typeIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white text-sm font-medium">{n.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!n.is_read && (
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    )}
                    {n.link && (
                      <ExternalLink size={12} className="text-slate-600" />
                    )}
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-slate-600 text-xs mt-2">{formatDate(n.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
