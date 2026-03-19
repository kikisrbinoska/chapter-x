export type UserRole = 'admin' | 'writer' | 'regular' | 'guest'
export type StoryStatus = 'draft' | 'published' | 'archived'
export type PermissionLevel = 1 | 2 | 3 | 4 | 5
export type CollaboratorRole = 'co-author' | 'editor' | 'proofreader' | 'beta-reader'
export type SuggestionType = 'grammar' | 'style' | 'plot' | 'character' | 'pacing'
export type NotificationType = 'like' | 'comment' | 'collaboration' | 'system' | 'follow' | 'story_update'

export interface User {
  user_id: number
  username: string
  email: string
  name: string
  surname: string
  role: UserRole
  bio?: string
  avatar?: string
  created_at: string
  follower_count: number
  following_count: number
}

export interface Story {
  story_id: number
  title: string
  short_description: string
  content: string
  mature_content: boolean
  user_id: number
  author_username: string
  status: StoryStatus
  genres: string[]
  created_at: string
  updated_at: string
  total_likes: number
  total_comments: number
  total_chapters: number
  total_views: number
  cover_image?: string
}

export interface Chapter {
  chapter_id: number
  story_id: number
  title: string
  content: string
  chapter_number: number
  word_count: number
  view_count: number
  created_at: string
  updated_at: string
  is_published: boolean
}

export interface Comment {
  comment_id: number
  story_id: number
  user_id: number
  username: string
  content: string
  created_at: string
}

export interface ReadingList {
  list_id: number
  user_id: number
  username: string
  name: string
  description?: string
  is_public: boolean
  created_at: string
  stories: ReadingListItem[]
}

export interface ReadingListItem {
  item_id: number
  list_id: number
  story_id: number
  story_title: string
  author_username: string
  added_at: string
  genres: string[]
}

export interface Collaboration {
  collab_id: number
  story_id: number
  story_title: string
  user_id: number
  username: string
  name: string
  role: CollaboratorRole
  permission_level: PermissionLevel
  joined_at: string
}

export interface AISuggestion {
  suggestion_id: number
  chapter_id: number
  suggestion_type: SuggestionType
  original_text: string
  suggested_text: string
  explanation: string
  accepted: boolean | null
  created_at: string
  applied_at?: string
}

export interface Notification {
  notification_id: number
  user_id: number
  type: NotificationType
  title: string
  message: string
  is_read: boolean
  created_at: string
  link?: string
}

export interface Genre {
  genre_id: number
  name: string
  story_count: number
}

export interface StoryAnalytics {
  story_id: number
  views_over_time: { date: string; views: number }[]
  likes_over_time: { date: string; likes: number }[]
  total_views: number
  total_likes: number
  total_comments: number
  avg_read_time: number
  completion_rate: number
}

export interface AuthState {
  token: string | null
  currentUser: User | null
  showMatureContent: boolean
}
