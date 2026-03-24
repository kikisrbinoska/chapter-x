import { create } from 'zustand'
import axios from 'axios'
import {
  Story,
  Chapter,
  Comment,
  Collaboration,
  AISuggestion,
  Genre,
  ReadingList,
  ReadingListItem,
  StoryStatus,
  PermissionLevel,
} from '../types'
import {
  mockStories,
  mockChapters,
  mockComments,
  mockCollaborations,
  mockAISuggestions,
  mockGenres,
  mockReadingLists,
} from '../data/mockData'

const API = 'https://localhost:7125/api'

function mapReadingList(l: any): ReadingList {
  return {
    list_id: l.id,
    user_id: l.userId,
    username: l.username ?? '',
    name: l.name,
    description: l.content ?? '',
    is_public: l.isPublic,
    created_at: l.createdAt,
    stories: (l.readingListItems ?? []).map((i: any) => ({
      item_id: i.listId ?? 0,
      list_id: l.id,
      story_id: i.storyId,
      story_title: i.storyTitle ?? `Story #${i.storyId}`,
      author_username: i.authorUsername ?? '',
      added_at: i.addedAt ?? new Date().toISOString(),
      genres: i.genres ?? [],
    })),
  }
}

function getAuthHeaders() {
  try {
    const token = JSON.parse(localStorage.getItem('chapterx-auth') || '{}')?.state?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}

interface LikeRecord {
  userId: number
  storyId: number
}

interface StoryStore {
  stories: Story[]
  chapters: Chapter[]
  comments: Comment[]
  collaborations: Collaboration[]
  aiSuggestions: AISuggestion[]
  genres: Genre[]
  readingLists: ReadingList[]
  likedStories: LikeRecord[]

  // Fetch from backend
  fetchStories: () => Promise<void>
  fetchChapters: () => Promise<void>
  fetchCollaborations: () => Promise<void>
  fetchReadingLists: () => Promise<void>
  fetchUserReadingLists: (userId: number) => Promise<void>
  fetchGenres: () => Promise<void>

  // Story actions
  addStory: (story: Story) => Promise<number>
  updateStory: (id: number, partial: Partial<Story>) => Promise<void>
  deleteStory: (id: number) => Promise<void>
  updateStoryStatus: (id: number, status: StoryStatus) => void

  // Chapter actions
  addChapter: (chapter: Chapter) => Promise<void>
  updateChapter: (id: number, partial: Partial<Chapter>) => Promise<void>
  deleteChapter: (id: number) => Promise<void>
  incrementViewCount: (chapterId: number) => void

  // Comment actions
  addComment: (comment: Comment) => void
  deleteComment: (id: number) => void

  // Like actions
  toggleLike: (userId: number, storyId: number) => void
  isLiked: (userId: number, storyId: number) => boolean

  // Collaboration actions
  addCollaboration: (collab: Collaboration) => Promise<void>
  updateCollaborationPermission: (userId: number, storyId: number, level: PermissionLevel) => void
  removeCollaboration: (userId: number, storyId: number) => Promise<void>

  // AI Suggestion actions
  fetchSuggestions: () => Promise<void>
  acceptSuggestion: (id: number) => Promise<void>
  rejectSuggestion: (id: number) => Promise<void>
  addSuggestion: (suggestion: Omit<AISuggestion, 'suggestion_id'>) => Promise<void>

  // Genre actions
  addGenre: (name: string) => Promise<void>
  deleteGenre: (id: number) => Promise<void>

  // Reading list actions
  createReadingList: (list: ReadingList) => Promise<number>
  addStoryToList: (listId: number, item: ReadingListItem) => Promise<void>
  removeStoryFromList: (listId: number, storyId: number) => Promise<void>
  deleteReadingList: (listId: number) => Promise<void>
}

export const useStoryStore = create<StoryStore>((set, get) => ({
  stories: [...mockStories],
  chapters: [...mockChapters],
  comments: [...mockComments],
  collaborations: [...mockCollaborations],
  aiSuggestions: [...mockAISuggestions],
  genres: [...mockGenres],
  readingLists: [],
  likedStories: [],

  fetchStories: async () => {
    try {
      const res = await axios.get(`${API}/stories`)
      const data: any[] = res.data?.stories ?? res.data ?? []
      const stories: Story[] = data.map((s: any) => ({
        story_id: s.id,
        user_id: s.userId,
        title: s.shortDescription,
        short_description: s.shortDescription,
        content: s.content,
        mature_content: s.matureContent,
        status: 'published' as StoryStatus,
        author_username: s.writer?.user?.username ?? '',
        created_at: s.createdAt,
        updated_at: s.updatedAt,
        total_likes: 0,
        total_comments: 0,
        total_chapters: 0,
        total_views: 0,
        genres: (s.hasGenres ?? []).map((hg: any) => hg.genre?.name ?? hg.name).filter(Boolean),
      }))
      if (stories.length > 0) set({ stories })
    } catch {
      // keep mock data on failure
    }
  },

  fetchChapters: async () => {
    try {
      const res = await axios.get(`${API}/chapters`)
      const data: any[] = res.data?.chapters ?? res.data ?? []
      const chapters: Chapter[] = data.map((c: any) => ({
        chapter_id: c.id,
        story_id: c.storyId,
        title: c.title ?? c.name,
        content: c.content,
        chapter_number: c.number,
        word_count: c.wordCount ?? 0,
        view_count: c.viewCount ?? 0,
        is_published: true,
        created_at: c.createdAt,
        updated_at: c.updatedAt,
      }))
      if (chapters.length > 0) set({ chapters })
    } catch {
      // keep mock data on failure
    }
  },

  fetchCollaborations: async () => {
    try {
      const res = await axios.get(`${API}/collaborations`)
      const data: any[] = res.data ?? []
      const collaborations: Collaboration[] = data.map((c: any) => ({
        collab_id: c.id,
        story_id: c.storyId,
        user_id: c.userId,
        username: c.username ?? '',
        name: c.name ?? c.username ?? '',
        story_title: '',
        role: 'editor' as any,
        permission_level: 3 as any,
        joined_at: c.createdAt,
      }))
      set({ collaborations })
    } catch {
      // keep existing
    }
  },

  addStory: async (story) => {
    set(state => ({ stories: [...state.stories, story] }))
    const res = await axios.post(`${API}/stories`, {
      matureContent: story.mature_content,
      shortDescription: story.short_description || story.title,
      image: null,
      content: story.content,
      userId: story.user_id,
      genres: story.genres ?? [],
    }, { headers: getAuthHeaders() })
    const backendId = res.data?.id ?? res.data
    if (backendId && backendId !== story.story_id) {
      set(state => ({
        stories: state.stories.map(s =>
          s.story_id === story.story_id ? { ...s, story_id: backendId } : s
        ),
        chapters: state.chapters.map(c =>
          c.story_id === story.story_id ? { ...c, story_id: backendId } : c
        ),
      }))
      return backendId
    }
    return story.story_id
  },

  updateStory: async (id, partial) => {
    set(state => ({
      stories: state.stories.map(s => (s.story_id === id ? { ...s, ...partial } : s)),
    }))
    try {
      const story = get().stories.find(s => s.story_id === id)
      if (!story) return
      await axios.put(`${API}/stories/${id}`, {
        id,
        matureContent: partial.mature_content ?? story.mature_content,
        shortDescription: partial.title ?? partial.short_description ?? story.title ?? story.short_description,
        image: null,
        content: partial.content ?? story.content,
      }, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic update on failure
    }
  },

  deleteStory: async (id) => {
    set(state => ({
      stories: state.stories.filter(s => s.story_id !== id),
      chapters: state.chapters.filter(c => c.story_id !== id),
      comments: state.comments.filter(c => c.story_id !== id),
      collaborations: state.collaborations.filter(c => c.story_id !== id),
    }))
    try {
      await axios.delete(`${API}/stories/${id}`, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic delete on failure
    }
  },

  updateStoryStatus: (id, status) =>
    set(state => ({
      stories: state.stories.map(s =>
        s.story_id === id ? { ...s, status, updated_at: new Date().toISOString() } : s
      ),
    })),

  addChapter: async (chapter) => {
    set(state => ({
      chapters: [...state.chapters, chapter],
      stories: state.stories.map(s =>
        s.story_id === chapter.story_id
          ? { ...s, total_chapters: s.total_chapters + 1 }
          : s
      ),
    }))
    const res = await axios.post(`${API}/chapters`, {
      number: chapter.chapter_number,
      name: chapter.title,
      title: chapter.title,
      content: chapter.content,
      storyId: chapter.story_id,
    }, { headers: getAuthHeaders() })
    const backendId = res.data?.id ?? res.data
    if (backendId && backendId !== chapter.chapter_id) {
      set(state => ({
        chapters: state.chapters.map(c =>
          c.chapter_id === chapter.chapter_id ? { ...c, chapter_id: backendId } : c
        ),
      }))
    }
  },

  updateChapter: async (id, partial) => {
    set(state => ({
      chapters: state.chapters.map(c =>
        c.chapter_id === id ? { ...c, ...partial, updated_at: new Date().toISOString() } : c
      ),
    }))
    try {
      const chapter = get().chapters.find(c => c.chapter_id === id)
      if (!chapter) return
      await axios.put(`${API}/chapters/${id}`, {
        id,
        number: partial.chapter_number ?? chapter.chapter_number,
        name: partial.title ?? chapter.title,
        title: partial.title ?? chapter.title,
        content: partial.content ?? chapter.content,
        wordCount: partial.word_count ?? chapter.word_count,
      }, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic update on failure
    }
  },

  deleteChapter: async (id) => {
    set(state => {
      const chapter = state.chapters.find(c => c.chapter_id === id)
      return {
        chapters: state.chapters.filter(c => c.chapter_id !== id),
        stories: chapter
          ? state.stories.map(s =>
              s.story_id === chapter.story_id
                ? { ...s, total_chapters: Math.max(0, s.total_chapters - 1) }
                : s
            )
          : state.stories,
      }
    })
    try {
      await axios.delete(`${API}/chapters/${id}`, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic delete on failure
    }
  },

  incrementViewCount: (chapterId) =>
    set(state => ({
      chapters: state.chapters.map(c =>
        c.chapter_id === chapterId ? { ...c, view_count: c.view_count + 1 } : c
      ),
    })),

  addComment: (comment) =>
    set(state => ({
      comments: [...state.comments, comment],
      stories: state.stories.map(s =>
        s.story_id === comment.story_id
          ? { ...s, total_comments: s.total_comments + 1 }
          : s
      ),
    })),

  deleteComment: (id) =>
    set(state => {
      const comment = state.comments.find(c => c.comment_id === id)
      return {
        comments: state.comments.filter(c => c.comment_id !== id),
        stories: comment
          ? state.stories.map(s =>
              s.story_id === comment.story_id
                ? { ...s, total_comments: Math.max(0, s.total_comments - 1) }
                : s
            )
          : state.stories,
      }
    }),

  toggleLike: (userId, storyId) =>
    set(state => {
      const exists = state.likedStories.some(
        l => l.userId === userId && l.storyId === storyId
      )
      return {
        likedStories: exists
          ? state.likedStories.filter(l => !(l.userId === userId && l.storyId === storyId))
          : [...state.likedStories, { userId, storyId }],
        stories: state.stories.map(s =>
          s.story_id === storyId
            ? { ...s, total_likes: exists ? s.total_likes - 1 : s.total_likes + 1 }
            : s
        ),
      }
    }),

  isLiked: (userId, storyId) =>
    get().likedStories.some(l => l.userId === userId && l.storyId === storyId),

  addCollaboration: async (collab) => {
    set(state => ({ collaborations: [...state.collaborations, collab] }))
    try {
      await axios.post(`${API}/collaborations`, {
        userId: collab.user_id,
        storyId: collab.story_id,
        role: collab.role,
      }, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic
    }
  },

  updateCollaborationPermission: (userId, storyId, level) =>
    set(state => ({
      collaborations: state.collaborations.map(c =>
        c.user_id === userId && c.story_id === storyId
          ? { ...c, permission_level: level }
          : c
      ),
    })),

  removeCollaboration: async (userId, storyId) => {
    set(state => ({
      collaborations: state.collaborations.filter(
        c => !(c.user_id === userId && c.story_id === storyId)
      ),
    }))
    try {
      await axios.delete(`${API}/collaborations/user/${userId}/story/${storyId}`, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic
    }
  },

  fetchSuggestions: async () => {
    try {
      const res = await axios.get(`${API}/aisuggestions`)
      const data = res.data.aiSuggestions ?? res.data
      const mapped: AISuggestion[] = data.map((s: any) => ({
        suggestion_id: s.id,
        chapter_id: s.storyId,
        story_id: s.storyId,
        original_text: s.originalText,
        suggested_text: s.suggestedText,
        suggestion_type: 'style' as const,
        accepted: s.accepted === true ? true : s.accepted === false ? false : null,
        applied_at: s.appliedAt ?? undefined,
      }))
      set({ aiSuggestions: mapped })
    } catch {
      // keep mock data on failure
    }
  },

  acceptSuggestion: async (id) => {
    const s = get().aiSuggestions.find(s => s.suggestion_id === id)
    if (!s) return
    // optimistic update
    set(state => ({
      aiSuggestions: state.aiSuggestions.map(s =>
        s.suggestion_id === id
          ? { ...s, accepted: true, applied_at: new Date().toISOString() }
          : s
      ),
    }))
    try {
      await axios.put(`${API}/aisuggestions/${id}`, {
        id,
        originalText: s.original_text,
        suggestedText: s.suggested_text,
        accepted: true,
      })
    } catch {
      // keep optimistic update even if backend fails
    }
  },

  rejectSuggestion: async (id) => {
    const s = get().aiSuggestions.find(s => s.suggestion_id === id)
    if (!s) return
    set(state => ({
      aiSuggestions: state.aiSuggestions.map(s =>
        s.suggestion_id === id ? { ...s, accepted: false } : s
      ),
    }))
    try {
      await axios.put(`${API}/aisuggestions/${id}`, {
        id,
        originalText: s.original_text,
        suggestedText: s.suggested_text,
        accepted: false,
      })
    } catch {
      // keep optimistic update even if backend fails
    }
  },

  addSuggestion: async (suggestion) => {
    // optimistic local add
    const tempId = Date.now()
    set(state => ({ aiSuggestions: [...state.aiSuggestions, { ...suggestion, suggestion_id: tempId }] }))
    try {
      const res = await axios.post('${API}/aisuggestions', {
        originalText: suggestion.original_text,
        suggestedText: suggestion.suggested_text,
        storyId: suggestion.chapter_id,
      })
      const newId = res.data.id ?? tempId
      set(state => ({
        aiSuggestions: state.aiSuggestions.map(s =>
          s.suggestion_id === tempId ? { ...s, suggestion_id: newId } : s
        ),
      }))
    } catch {
      // keep local suggestion on failure
    }
  },

  fetchGenres: async () => {
    try {
      const res = await axios.get(`${API}/genres`)
      const data: any[] = res.data?.genres ?? res.data ?? []
      const genres: Genre[] = data.map((g: any) => ({ genre_id: g.id, name: g.name }))
      if (genres.length > 0) set({ genres })
    } catch {
      // keep mock data on failure
    }
  },

  addGenre: async (name) => {
    const res = await axios.post(`${API}/genres`, { name }, { headers: getAuthHeaders() })
    const id = res.data?.id ?? res.data
    set(state => ({ genres: [...state.genres, { genre_id: id, name }] }))
  },

  deleteGenre: async (id) => {
    set(state => ({ genres: state.genres.filter(g => g.genre_id !== id) }))
    try {
      await axios.delete(`${API}/genres/${id}`, { headers: getAuthHeaders() })
    } catch {
      // optimistic delete already applied
    }
  },

  fetchReadingLists: async () => {
    try {
      const res = await axios.get(`${API}/readinglists`)
      const data: any[] = res.data ?? []
      const lists: ReadingList[] = data.map(mapReadingList)
      set({ readingLists: lists })
    } catch {
      // keep existing data on failure
    }
  },

  fetchUserReadingLists: async (userId) => {
    try {
      const res = await axios.get(`${API}/readinglists/user/${userId}`, { headers: getAuthHeaders() })
      const data: any[] = res.data ?? []
      const lists: ReadingList[] = data.map(mapReadingList)
      set(state => ({
        readingLists: [
          ...state.readingLists.filter(l => l.user_id !== userId),
          ...lists,
        ]
      }))
    } catch (err) {
      console.error('fetchUserReadingLists failed:', err)
    }
  },

  createReadingList: async (list) => {
    set(state => ({ readingLists: [...state.readingLists, list] }))
    const res = await axios.post(`${API}/readinglists`, {
      name: list.name,
      content: list.description ?? null,
      isPublic: list.is_public,
      userId: list.user_id,
    }, { headers: getAuthHeaders() })
    const backendId = res.data?.id ?? res.data
    if (backendId && backendId !== list.list_id) {
      set(state => ({
        readingLists: state.readingLists.map(l =>
          l.list_id === list.list_id ? { ...l, list_id: backendId } : l
        ),
      }))
      return backendId
    }
    return list.list_id
  },

  addStoryToList: async (listId, item) => {
    set(state => ({
      readingLists: state.readingLists.map(l =>
        l.list_id === listId ? { ...l, stories: [...l.stories, item] } : l
      ),
    }))
    await axios.post(`${API}/readinglistitems`, {
      readingListId: listId,
      storyId: item.story_id,
    }, { headers: getAuthHeaders() })
  },

  removeStoryFromList: async (listId, storyId) => {
    set(state => ({
      readingLists: state.readingLists.map(l =>
        l.list_id === listId
          ? { ...l, stories: l.stories.filter(s => s.story_id !== storyId) }
          : l
      ),
    }))
    try {
      await axios.delete(`${API}/readinglistitems/${listId}/story/${storyId}`, { headers: getAuthHeaders() })
    } catch {
      // optimistic update already applied
    }
  },

  deleteReadingList: async (listId) => {
    set(state => ({
      readingLists: state.readingLists.filter(l => l.list_id !== listId),
    }))
    await axios.delete(`${API}/readinglists/${listId}`, { headers: getAuthHeaders() })
  },
}))
