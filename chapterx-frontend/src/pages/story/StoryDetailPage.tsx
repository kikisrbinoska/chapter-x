import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Eye, Users, Calendar, Plus, BookmarkPlus } from 'lucide-react'
import { useStoryStore } from '../../store/storyStore'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { GenreBadge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { ChapterList } from '../../components/story/ChapterList'
import { CommentSection } from '../../components/story/CommentSection'
import { LikeButton } from '../../components/story/LikeButton'
import { Modal } from '../../components/ui/Modal'
import { getGenreGradient } from '../../components/story/GenreBadge'
import { ReadingListItem } from '../../types'

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { stories, chapters, collaborations, readingLists, addStoryToList, createReadingList } = useStoryStore()
  const { currentUser } = useAuthStore()
  const { addToast } = useUIStore()
  const [listModalOpen, setListModalOpen] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [liveLikes, setLiveLikes] = useState<number | null>(null)
  const [liveComments, setLiveComments] = useState<number | null>(null)

  const story = stories.find(s => s.story_id === Number(id))
  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Story not found</h2>
        <Button onClick={() => navigate('/browse')}>Browse Stories</Button>
      </div>
    )
  }

  const storyChapters = chapters.filter(c => c.story_id === story.story_id)
  const storyCollabs = collaborations.filter(c => c.story_id === story.story_id)
  const gradient = getGenreGradient(story.genres[0])
  const myLists = currentUser ? readingLists.filter(l => l.user_id === currentUser.user_id) : []

  const handleAddToList = async (listId: number) => {
    const list = readingLists.find(l => l.list_id === listId)
    if (!list) return
    if (list.stories.some(s => s.story_id === story.story_id)) {
      addToast('Already in this list', 'info')
      return
    }
    const item: ReadingListItem = {
      item_id: Date.now(),
      list_id: listId,
      story_id: story.story_id,
      story_title: story.title,
      author_username: story.author_username,
      added_at: new Date().toISOString(),
      genres: story.genres,
    }
    try {
      await addStoryToList(listId, item)
      addToast(`Added to "${list.name}"!`)
    } catch (err: any) {
      const msg = err?.response?.data?.message || ''
      if (msg.includes('already') || msg.includes('duplicate') || err?.response?.status === 400) {
        addToast('Already in this list', 'info')
      } else {
        addToast('Failed to add to list.', 'error')
      }
    }
    setListModalOpen(false)
  }

  const handleCreateList = async () => {
    if (!newListName.trim() || !currentUser) return
    const newList = {
      list_id: Date.now(),
      user_id: currentUser.user_id,
      username: currentUser.username,
      name: newListName.trim(),
      is_public: false,
      created_at: new Date().toISOString(),
      stories: [],
    }
    try {
      const realListId = await createReadingList(newList)
      await addStoryToList(realListId, {
        item_id: Date.now() + 1,
        list_id: realListId,
        story_id: story.story_id,
        story_title: story.title,
        author_username: story.author_username,
        added_at: new Date().toISOString(),
        genres: story.genres,
      })
      addToast(`Created "${newListName}" and added story!`)
    } catch {
      addToast('Failed to create list.', 'error')
    }
    setNewListName('')
    setListModalOpen(false)
  }

  const isOwner = currentUser?.user_id === story.user_id

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Hero */}
      <div className={`relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="relative p-8 sm:p-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {story.genres.map(g => <GenreBadge key={g} genre={g} />)}
            {story.mature_content && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-rose-500/20 text-rose-400 border-rose-500/30">
                18+
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">{story.title}</h1>
          <p className="text-slate-300 text-lg mb-6 leading-relaxed max-w-2xl">{story.short_description}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Avatar name={story.author_username} size="sm" />
              <span className="text-white text-sm font-medium">{story.author_username}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Eye size={14} />
              {story.total_views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <BookOpen size={14} />
              {story.total_chapters} chapters
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Calendar size={14} />
              {new Date(story.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <LikeButton storyId={story.story_id} authorUserId={story.user_id} totalLikes={story.total_likes} onCountChange={setLiveLikes} />
            {currentUser && (
              <Button variant="secondary" size="sm" onClick={() => setListModalOpen(true)}>
                <BookmarkPlus size={14} />
                Save to List
              </Button>
            )}
            {isOwner && (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/writer/edit-story/${story.story_id}`)}>
                Edit Story
              </Button>
            )}
          </div>

          {/* Chapters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-white">Chapters</h2>
              {isOwner && (
                <Button size="sm" onClick={() => navigate(`/writer/create-chapter/${story.story_id}`)}>
                  <Plus size={14} />
                  Add Chapter
                </Button>
              )}
            </div>
            <ChapterList chapters={storyChapters} storyId={story.story_id} />
          </div>

          {/* Comments */}
          <div className="border-t border-slate-700 pt-8">
            <CommentSection storyId={story.story_id} authorUserId={story.user_id} onCountChange={setLiveComments} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Story info */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Story Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>
                <span className="text-white capitalize">{story.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Chapters</span>
                <span className="text-white">{story.total_chapters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Likes</span>
                <span className="text-white">{(liveLikes ?? story.total_likes).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Views</span>
                <span className="text-white">{story.total_views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Comments</span>
                <span className="text-white">{liveComments ?? story.total_comments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Published</span>
                <span className="text-white">{new Date(story.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Collaborators */}
          {storyCollabs.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-violet-400" />
                <h3 className="text-white font-semibold">Collaborators</h3>
              </div>
              <div className="space-y-3">
                {storyCollabs.map(c => (
                  <div key={c.collab_id} className="flex items-center gap-2">
                    <Avatar name={c.name} size="sm" />
                    <div>
                      <p className="text-white text-sm">@{c.username}</p>
                      <p className="text-slate-500 text-xs">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reading list modal */}
      <Modal isOpen={listModalOpen} onClose={() => setListModalOpen(false)} title="Save to Reading List">
        <div className="space-y-3">
          {myLists.length > 0 ? (
            <>
              <p className="text-slate-400 text-sm mb-3">Select a list:</p>
              {myLists.map(list => (
                <button
                  key={list.list_id}
                  onClick={() => handleAddToList(list.list_id)}
                  className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors"
                >
                  <span className="text-white text-sm">{list.name}</span>
                  <span className="text-slate-500 text-xs">{list.stories.length} stories</span>
                </button>
              ))}
              <div className="border-t border-slate-700 pt-3">
                <p className="text-slate-400 text-sm mb-2">Or create a new list:</p>
                <div className="flex gap-2">
                  <input
                    value={newListName}
                    onChange={e => setNewListName(e.target.value)}
                    placeholder="List name..."
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <Button size="sm" onClick={handleCreateList} disabled={!newListName.trim()}>
                    Create
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p className="text-slate-400 text-sm mb-3">You don't have any reading lists yet. Create one:</p>
              <div className="flex gap-2">
                <input
                  value={newListName}
                  onChange={e => setNewListName(e.target.value)}
                  placeholder="My Favorites..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <Button size="sm" onClick={handleCreateList} disabled={!newListName.trim()}>
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
