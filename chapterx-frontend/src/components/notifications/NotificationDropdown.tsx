import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Users, Bell, Settings, Check } from 'lucide-react'
import { useNotificationStore } from '../../store/notificationStore'
import { NotificationType } from '../../types'

const typeIcon = (type: NotificationType) => {
  const props = { size: 14 }
  switch (type) {
    case 'like': return <Heart {...props} className="text-rose-400" />
    case 'comment': return <MessageCircle {...props} className="text-blue-400" />
    case 'collaboration': return <Users {...props} className="text-violet-400" />
    case 'follow': return <Bell {...props} className="text-amber-400" />
    case 'system': return <Settings {...props} className="text-slate-400" />
    default: return <Bell {...props} className="text-slate-400" />
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

interface Props {
  onClose: () => void
}

export const NotificationDropdown: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate()
  const { notifications, markAllRead, markRead } = useNotificationStore()
  const recent = notifications.slice(0, 5)

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <span className="text-sm font-semibold text-white">Notifications</span>
        <button
          onClick={markAllRead}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <Check size={12} />
          Mark all read
        </button>
      </div>
      <div className="divide-y divide-slate-800">
        {recent.length === 0 ? (
          <div className="px-4 py-8 text-center text-slate-500 text-sm">
            No notifications yet
          </div>
        ) : (
          recent.map(n => (
            <div
              key={n.notification_id}
              className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors ${
                !n.is_read ? 'bg-indigo-500/5 hover:bg-indigo-500/10' : 'hover:bg-slate-800'
              }`}
              onClick={() => {
                markRead(n.notification_id)
                if (n.link) { navigate(n.link); onClose() }
              }}
            >
              <div className="mt-0.5 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                {typeIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white">{n.title}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{n.message}</p>
                <p className="text-xs text-slate-600 mt-0.5">{timeAgo(n.created_at)}</p>
              </div>
              {!n.is_read && (
                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
      <div className="border-t border-slate-700 p-2">
        <button
          onClick={() => { navigate('/notifications'); onClose() }}
          className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          View all notifications
        </button>
      </div>
    </div>
  )
}
