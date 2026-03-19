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

  // Story actions
  addStory: (story: Story) => void
  updateStory: (id: number, partial: Partial<Story>) => void
  deleteStory: (id: number) => void
  updateStoryStatus: (id: number, status: StoryStatus) => void

  // Chapter actions
  addChapter: (chapter: Chapter) => void
  updateChapter: (id: number, partial: Partial<Chapter>) => void
  deleteChapter: (id: number) => void
  incrementViewCount: (chapterId: number) => void

  // Comment actions
  addComment: (comment: Comment) => void
  deleteComment: (id: number) => void

  // Like actions
  toggleLike: (userId: number, storyId: number) => void
  isLiked: (userId: number, storyId: number) => boolean

  // Collaboration actions
  addCollaboration: (collab: Collaboration) => void
  updateCollaborationPermission: (userId: number, storyId: number, level: PermissionLevel) => void
  removeCollaboration: (userId: number, storyId: number) => void

  // AI Suggestion actions
  fetchSuggestions: () => Promise<void>
  acceptSuggestion: (id: number) => Promise<void>
  rejectSuggestion: (id: number) => Promise<void>
  addSuggestion: (suggestion: Omit<AISuggestion, 'suggestion_id'>) => Promise<void>

  // Genre actions
  addGenre: (genre: Genre) => void
  deleteGenre: (id: number) => void

  // Reading list actions
  createReadingList: (list: ReadingList) => void
  addStoryToList: (listId: number, item: ReadingListItem) => void
  removeStoryFromList: (listId: number, storyId: number) => void
  deleteReadingList: (listId: number) => void
}

export const useStoryStore = create<StoryStore>((set, get) => ({
  stories: [...mockStories],
  chapters: [...mockChapters],
  comments: [...mockComments],
  collaborations: [...mockCollaborations],
  aiSuggestions: [...mockAISuggestions],
  genres: [...mockGenres],
  readingLists: [...mockReadingLists],
  likedStories: [],

  addStory: (story) =>
    set(state => ({ stories: [...state.stories, story] })),

  updateStory: (id, partial) =>
    set(state => ({
      stories: state.stories.map(s => (s.story_id === id ? { ...s, ...partial } : s)),
    })),

  deleteStory: (id) =>
    set(state => ({
      stories: state.stories.filter(s => s.story_id !== id),
      chapters: state.chapters.filter(c => c.story_id !== id),
      comments: state.comments.filter(c => c.story_id !== id),
      collaborations: state.collaborations.filter(c => c.story_id !== id),
    })),

  updateStoryStatus: (id, status) =>
    set(state => ({
      stories: state.stories.map(s =>
        s.story_id === id ? { ...s, status, updated_at: new Date().toISOString() } : s
      ),
    })),

  addChapter: (chapter) =>
    set(state => ({
      chapters: [...state.chapters, chapter],
      stories: state.stories.map(s =>
        s.story_id === chapter.story_id
          ? { ...s, total_chapters: s.total_chapters + 1 }
          : s
      ),
    })),

  updateChapter: (id, partial) =>
    set(state => ({
      chapters: state.chapters.map(c =>
        c.chapter_id === id ? { ...c, ...partial, updated_at: new Date().toISOString() } : c
      ),
    })),

  deleteChapter: (id) =>
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
    }),

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

  addCollaboration: (collab) =>
    set(state => ({ collaborations: [...state.collaborations, collab] })),

  updateCollaborationPermission: (userId, storyId, level) =>
    set(state => ({
      collaborations: state.collaborations.map(c =>
        c.user_id === userId && c.story_id === storyId
          ? { ...c, permission_level: level }
          : c
      ),
    })),

  removeCollaboration: (userId, storyId) =>
    set(state => ({
      collaborations: state.collaborations.filter(
        c => !(c.user_id === userId && c.story_id === storyId)
      ),
    })),

  fetchSuggestions: async () => {
    try {
      const res = await axios.get('https://localhost:7125/api/aisuggestions')
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
      await axios.put(`https://localhost:7125/api/aisuggestions/${id}`, {
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
      await axios.put(`https://localhost:7125/api/aisuggestions/${id}`, {
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
      const res = await axios.post('https://localhost:7125/api/aisuggestions', {
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

  addGenre: (genre) =>
    set(state => ({ genres: [...state.genres, genre] })),

  deleteGenre: (id) =>
    set(state => ({ genres: state.genres.filter(g => g.genre_id !== id) })),

  createReadingList: (list) =>
    set(state => ({ readingLists: [...state.readingLists, list] })),

  addStoryToList: (listId, item) =>
    set(state => ({
      readingLists: state.readingLists.map(l =>
        l.list_id === listId
          ? { ...l, stories: [...l.stories, item] }
          : l
      ),
    })),

  removeStoryFromList: (listId, storyId) =>
    set(state => ({
      readingLists: state.readingLists.map(l =>
        l.list_id === listId
          ? { ...l, stories: l.stories.filter(s => s.story_id !== storyId) }
          : l
      ),
    })),

  deleteReadingList: (listId) =>
    set(state => ({
      readingLists: state.readingLists.filter(l => l.list_id !== listId),
    })),
}))
