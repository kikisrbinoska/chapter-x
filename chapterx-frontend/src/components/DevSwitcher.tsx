import React, { useState } from 'react'
import { Code2, X, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { Avatar } from './ui/Avatar'
import { RoleBadge } from './ui/Badge'
import { useUIStore } from '../store/uiStore'

const DEV_USERS = [
  { user_id: 0, username: 'Guest', name: 'Guest', role: 'guest' as const },
  { user_id: 1, username: 'admin_alex', name: 'Alex Admin', role: 'admin' as const },
  { user_id: 2, username: 'elena_writes', name: 'Elena Dimitrova', role: 'writer' as const },
  { user_id: 3, username: 'marco_author', name: 'Marco Rossi', role: 'writer' as const },
  { user_id: 4, username: 'sara_reader', name: 'Sara Petkovska', role: 'regular' as const },
  { user_id: 9, username: 'boris_writer', name: 'Boris Nikolov', role: 'writer' as const },
]

export const DevSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { currentUser, switchUser } = useAuthStore()
  const { addToast } = useUIStore()

  const handleSwitch = (userId: number, name: string, role: string) => {
    switchUser(userId)
    addToast(`Switched to ${name} (${role})`)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 left-6 z-[90]">
      {open && (
        <div className="absolute bottom-12 left-0 w-64 bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-indigo-500/10">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-indigo-400" />
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Dev Switcher</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          </div>
          <div className="p-2">
            {DEV_USERS.map(u => (
              <button
                key={u.user_id}
                onClick={() => handleSwitch(u.user_id, u.name, u.role)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  (currentUser?.user_id === u.user_id) || (!currentUser && u.user_id === 0)
                    ? 'bg-indigo-600/20 border border-indigo-500/40'
                    : 'hover:bg-slate-800 border border-transparent'
                }`}
              >
                {u.user_id === 0 ? (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={14} className="text-slate-400" />
                  </div>
                ) : (
                  <Avatar name={u.name} size="sm" />
                )}
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">{u.name}</p>
                  <p className="text-slate-500 text-xs">@{u.username}</p>
                </div>
                <RoleBadge role={u.role} />
              </button>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-slate-700 text-center">
            <p className="text-slate-600 text-xs">Development only</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-110 border border-indigo-500"
        title="Dev User Switcher"
      >
        <Code2 size={16} />
      </button>
    </div>
  )
}
