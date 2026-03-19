import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from '../types'
import { mockUsers } from '../data/mockData'
import axios from 'axios'

const API_BASE = 'https://localhost:7125/api'

interface AuthStore {
  currentUser: User | null
  token: string | null
  showMatureContent: boolean
  allUsers: User[]
  login: (emailOrUsername: string, password: string) => Promise<void>
  logout: () => void
  register: (data: { username: string; email: string; name: string; surname: string; password: string }, role: 'regular' | 'writer') => Promise<void>
  switchUser: (userId: number) => void
  setShowMatureContent: (show: boolean) => void
  updateUserRole: (userId: number, role: UserRole) => void
  addUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      token: null,
      showMatureContent: true,
      allUsers: [...mockUsers],

      login: async (emailOrUsername, password) => {
        // Try backend first
        try {
          const email = emailOrUsername.includes('@')
            ? emailOrUsername
            : get().allUsers.find(u => u.username === emailOrUsername)?.email || emailOrUsername
          const res = await axios.post(`${API_BASE}/auth/login`, { email, password }, { timeout: 3000 })
          const { token, userId, username } = res.data
          const user = get().allUsers.find(u => u.user_id === userId) ||
            get().allUsers.find(u => u.username === username) || {
              user_id: userId,
              username,
              email,
              name: username,
              surname: '',
              role: 'regular' as const,
              created_at: new Date().toISOString(),
              follower_count: 0,
              following_count: 0,
            }
          set({ currentUser: user, token })
          return
        } catch {
          // Fall through to mock login
        }

        // Fallback to mock
        const user = get().allUsers.find(
          u => u.username === emailOrUsername || u.email === emailOrUsername
        )
        if (!user) throw new Error('User not found. Try using a quick-login option.')
        set({ currentUser: user, token: 'mock-token' })
      },

      logout: () => set({ currentUser: null, token: null }),

      register: async (data, role) => {
        // Try backend first
        try {
          await axios.post(`${API_BASE}/auth/register`, data, { timeout: 3000 })
        } catch {
          // Fall through to mock register
        }

        const newUser: User = {
          user_id: Date.now(),
          ...data,
          role,
          created_at: new Date().toISOString(),
          follower_count: 0,
          following_count: 0,
        }
        set(state => ({
          allUsers: [...state.allUsers, newUser],
          currentUser: newUser,
          token: 'mock-token',
        }))
      },

      switchUser: (userId: number) => {
        if (userId === 0) {
          set({ currentUser: null, token: null })
          return
        }
        const user = get().allUsers.find(u => u.user_id === userId)
        if (user) set({ currentUser: user, token: 'mock-token' })
      },

      setShowMatureContent: (show: boolean) => set({ showMatureContent: show }),

      updateUserRole: (userId: number, role: UserRole) =>
        set(state => ({
          allUsers: state.allUsers.map(u => (u.user_id === userId ? { ...u, role } : u)),
          currentUser:
            state.currentUser?.user_id === userId
              ? { ...state.currentUser, role }
              : state.currentUser,
        })),

      addUser: (user: User) =>
        set(state => ({ allUsers: [...state.allUsers, user] })),
    }),
    {
      name: 'chapterx-auth',
      partialize: s => ({
        currentUser: s.currentUser,
        token: s.token,
        showMatureContent: s.showMatureContent,
      }),
    }
  )
)
