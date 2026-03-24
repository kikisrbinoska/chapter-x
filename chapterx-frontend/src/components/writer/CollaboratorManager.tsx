import React, { useState } from 'react'
import { Users, Trash2, UserPlus, Shield } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useUIStore } from '../../store/uiStore'
import { Collaboration, CollaboratorRole, PermissionLevel } from '../../types'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { Modal } from '../ui/Modal'

interface CollaboratorManagerProps {
  storyId: number
  storyTitle: string
  ownerId: number
}

const roles: CollaboratorRole[] = ['co-author', 'editor', 'proofreader', 'beta-reader']

const permissionLabels: Record<PermissionLevel, string> = {
  1: 'View Only',
  2: 'Comment',
  3: 'Edit Chapters',
  4: 'Manage Story',
  5: 'Full Access',
}

export const CollaboratorManager: React.FC<CollaboratorManagerProps> = ({
  storyId,
  storyTitle,
  ownerId,
}) => {
  const { collaborations, addCollaboration, removeCollaboration, updateCollaborationPermission } = useStoryStore()
  const { allUsers, fetchAllUsers } = useAuthStore()
  const { addNotification } = useNotificationStore()
  const { addToast } = useUIStore()

  const [inviteOpen, setInviteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedRole, setSelectedRole] = useState<CollaboratorRole>('editor')
  const [selectedLevel, setSelectedLevel] = useState<PermissionLevel>(3)

  const storyCollabs = collaborations.filter(c => c.story_id === storyId)
  const collabUserIds = new Set(storyCollabs.map(c => c.user_id))
  const availableUsers = allUsers.filter(u => u.user_id !== ownerId && !collabUserIds.has(u.user_id) && (u.role === 'writer' || u.role === 'admin'))

  const handleInvite = () => {
    const user = availableUsers.find(u => u.username === selectedUser)
    if (!user) { addToast('User not found', 'error'); return }

    const newCollab: Collaboration = {
      collab_id: Date.now(),
      story_id: storyId,
      story_title: storyTitle,
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      role: selectedRole,
      permission_level: selectedLevel,
      joined_at: new Date().toISOString(),
    }
    addCollaboration(newCollab)
    addNotification({
      recipientUserId: user.user_id,
      type: 'collaboration',
      content: `You've been invited to collaborate on "${storyTitle}" as ${selectedRole}.`,
      link: `/story/${storyId}`,
    })
    addToast(`${user.username} added as collaborator!`)
    setInviteOpen(false)
    setSelectedUser('')
  }

  const handleRemove = (collab: Collaboration) => {
    removeCollaboration(collab.user_id, storyId)
    addToast(`${collab.username} removed from collaborators`, 'info')
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-violet-400" />
          <h3 className="text-white font-semibold">Collaborators</h3>
          <span className="text-xs text-slate-500">({storyCollabs.length})</span>
        </div>
        <Button size="sm" onClick={() => { fetchAllUsers(); setInviteOpen(true) }}>
          <UserPlus size={14} />
          Invite
        </Button>
      </div>

      {storyCollabs.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          <Users size={32} className="mx-auto mb-2 opacity-30" />
          No collaborators yet
        </div>
      ) : (
        <div className="space-y-3">
          {storyCollabs.map(collab => (
            <div key={collab.collab_id} className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <Avatar name={collab.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">@{collab.username}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-violet-400">{collab.role}</span>
                  <span className="text-slate-600">·</span>
                  <Shield size={11} className="text-slate-500" />
                  <span className="text-xs text-slate-500">Level {collab.permission_level}: {permissionLabels[collab.permission_level]}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={collab.permission_level}
                  onChange={e => {
                    updateCollaborationPermission(collab.user_id, storyId, Number(e.target.value) as PermissionLevel)
                    addToast('Permission updated')
                  }}
                  className="bg-slate-700 border border-slate-600 text-slate-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                >
                  {([1, 2, 3, 4, 5] as PermissionLevel[]).map(l => (
                    <option key={l} value={l}>Level {l}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleRemove(collab)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      <Modal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite Collaborator">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Select User</label>
            <select
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Choose a user --</option>
              {availableUsers.map(u => (
                <option key={u.user_id} value={u.username}>
                  @{u.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Role</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as CollaboratorRole)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Permission Level</label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(Number(e.target.value) as PermissionLevel)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
            >
              {([1, 2, 3, 4, 5] as PermissionLevel[]).map(l => (
                <option key={l} value={l}>Level {l} – {permissionLabels[l]}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleInvite} disabled={!selectedUser}>
              Send Invite
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
