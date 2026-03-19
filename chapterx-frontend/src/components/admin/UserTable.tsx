import React, { useState } from 'react'
import { Search, Shield, UserX, UserCheck } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'
import { User, UserRole } from '../../types'
import { Avatar } from '../ui/Avatar'
import { RoleBadge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

export const UserTable: React.FC = () => {
  const { allUsers, updateUserRole, currentUser } = useAuthStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()
  const [search, setSearch] = useState('')
  const [confirmUser, setConfirmUser] = useState<User | null>(null)
  const [confirmAction, setConfirmAction] = useState<'promote' | 'demote' | null>(null)

  const filtered = allUsers.filter(
    u =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  )

  const handlePromote = (user: User) => {
    const newRole: UserRole = user.role === 'regular' ? 'writer' : user.role === 'writer' ? 'admin' : 'admin'
    updateUserRole(user.user_id, newRole)
    addNotification({
      user_id: user.user_id,
      type: 'system',
      title: 'Role Updated',
      message: `Your account has been promoted to ${newRole}.`,
    })
    addToast(`${user.username} promoted to ${newRole}`)
    setConfirmUser(null)
  }

  const handleDemote = (user: User) => {
    const newRole: UserRole = user.role === 'admin' ? 'writer' : 'regular'
    updateUserRole(user.user_id, newRole)
    addToast(`${user.username} role changed to ${newRole}`, 'info')
    setConfirmUser(null)
  }

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800">
              <th className="text-left px-4 py-3 text-slate-400 font-medium">User</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Email</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">Role</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium hidden sm:table-cell">Joined</th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map(user => (
              <tr key={user.user_id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <div>
                      <p className="text-white font-medium">{user.name} {user.surname}</p>
                      <p className="text-slate-500 text-xs">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{user.email}</td>
                <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{formatDate(user.created_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {user.user_id !== currentUser?.user_id && user.role !== 'admin' && (
                      <button
                        onClick={() => { setConfirmUser(user); setConfirmAction('promote') }}
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                      >
                        <UserCheck size={12} />
                        Promote
                      </button>
                    )}
                    {user.user_id !== currentUser?.user_id && user.role !== 'regular' && (
                      <button
                        onClick={() => { setConfirmUser(user); setConfirmAction('demote') }}
                        className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
                      >
                        <UserX size={12} />
                        Demote
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500">No users found.</div>
        )}
      </div>

      {/* Confirm modal */}
      <Modal
        isOpen={!!confirmUser && !!confirmAction}
        onClose={() => { setConfirmUser(null); setConfirmAction(null) }}
        title={confirmAction === 'promote' ? 'Promote User' : 'Demote User'}
        size="sm"
      >
        {confirmUser && (
          <div className="space-y-4">
            <p className="text-slate-300 text-sm">
              {confirmAction === 'promote'
                ? `Promote @${confirmUser.username} to the next role tier?`
                : `Demote @${confirmUser.username} to a lower role?`}
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => { setConfirmUser(null); setConfirmAction(null) }}>
                Cancel
              </Button>
              <Button
                variant={confirmAction === 'promote' ? 'primary' : 'danger'}
                className="flex-1"
                onClick={() => confirmAction === 'promote' ? handlePromote(confirmUser) : handleDemote(confirmUser)}
              >
                <Shield size={14} />
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
