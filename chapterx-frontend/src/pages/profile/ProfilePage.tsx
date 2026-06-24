import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Heart, Calendar, MessageCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useStoryStore } from '../../store/storyStore'
import { useUIStore } from '../../store/uiStore'
import { Avatar } from '../../components/ui/Avatar'
import { RoleBadge, StatusBadge } from '../../components/ui/Badge'
import { StoryCard } from '../../components/ui/StoryCard'
import { GenreBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'

type Tab = 'stories' | 'about'

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { allUsers, currentUser, fetchAllUsers, updateUser } = useAuthStore()
  const { stories, fetchStories } = useStoryStore()
  const { addToast } = useUIStore()
  const [tab, setTab] = useState<Tab>('stories')
  const [loading, setLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({ username: '', email: '', name: '', surname: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchStories()
    if (allUsers.length === 0) {
      setLoading(true)
      fetchAllUsers().finally(() => setLoading(false))
    }
  }, [])

  const user = allUsers.find(u => u.username === username)

  const openEdit = () => {
    if (!user) return
    setEditForm({ username: user.username, email: user.email, name: user.name, surname: user.surname })
    setEditOpen(true)
  }

  const handleEditSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      await updateUser(user.user_id, editForm)
      addToast('Profile updated successfully!')
      setEditOpen(false)
      navigate(`/profile/${editForm.username}`, { replace: true })
    } catch (err: any) {
      addToast(err.response?.data?.message ?? 'Failed to update profile.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">User not found</h2>
      </div>
    )
  }

  const userStories = stories.filter(s => s.user_id === user.user_id && s.status === 'published')
  const totalLikes = userStories.reduce((acc, s) => acc + s.total_likes, 0)
  const totalComments = userStories.reduce((acc, s) => acc + s.total_comments, 0)
  const allGenres = [...new Set(userStories.flatMap(s => s.genres))]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile header */}
      <div className="relative mb-8">
        {/* Cover */}
        <div className="h-32 sm:h-48 rounded-2xl bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 mb-16 sm:mb-20 overflow-hidden">
          <div className="absolute inset-0 rounded-2xl opacity-40">
            <div className="absolute top-4 left-16 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-2 right-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />
          </div>
        </div>

        {/* Avatar + info */}
        <div className="absolute bottom-0 left-0 right-0 px-6 flex items-end justify-between">
          <Avatar name={`${user.name} ${user.surname}`} size="xl" className="ring-4 ring-slate-950" />
          {currentUser?.user_id === user.user_id && (
            <button onClick={openEdit} className="mb-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* User info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-serif text-2xl font-bold text-white">
            {user.name} {user.surname}
          </h1>
          <RoleBadge role={user.role} />
        </div>
        <p className="text-slate-400">@{user.username}</p>
        {user.bio && <p className="text-slate-300 mt-3 max-w-xl">{user.bio}</p>}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span className="flex items-center gap-1 text-slate-400 text-sm">
            <Calendar size={14} />
            Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: <BookOpen size={16} className="text-indigo-400" />, value: userStories.length, label: 'Stories' },
          { icon: <Heart size={16} className="text-rose-400" />, value: totalLikes.toLocaleString(), label: 'Likes' },
          { icon: <MessageCircle size={16} className="text-amber-400" />, value: totalComments, label: 'Comments' },
        ].map(s => (
          <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-slate-500 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-800 rounded-xl mb-6 w-fit">
        {(['stories', 'about'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'stories' ? (
        <div>
          {userStories.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
              <p>No published stories yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userStories.map(story => (
                <StoryCard key={story.story_id} story={story} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {allGenres.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-3">Writes In</h3>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(g => <GenreBadge key={g} genre={g} />)}
              </div>
            </div>
          )}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Role</span>
                <RoleBadge role={user.role} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Member since</span>
                <span className="text-white">{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Published stories</span>
                <span className="text-white">{userStories.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
        <div className="space-y-4">
          {[
            { label: 'First Name', key: 'name' },
            { label: 'Last Name', key: 'surname' },
            { label: 'Username', key: 'username' },
            { label: 'Email', key: 'email' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={editForm[key as keyof typeof editForm]}
                onChange={e => setEditForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button className="flex-1" loading={saving} onClick={handleEditSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
