import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from '../types'
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
  updateUser: (userId: number, data: { username: string; email: string; name: string; surname: string }) => Promise<void>
  addUser: (user: User) => void
  fetchAllUsers: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      token: null,
      showMatureContent: true,
      allUsers: [],

      login: async (emailOrUsername, password) => {
        // Try backend first
        try {
          const email = emailOrUsername.includes('@')
            ? emailOrUsername
            : get().allUsers.find(u => u.username === emailOrUsername)?.email || emailOrUsername
          const res = await axios.post(`${API_BASE}/auth/login`, { email, password }, { timeout: 3000 })
          const { token, userId, username, name, surname, role } = res.data
          const user: User = {
            user_id: userId,
            username,
            email,
            name: name ?? username,
            surname: surname ?? '',
            role: role ?? 'regular',
            created_at: new Date().toISOString(),
            follower_count: 0,
            following_count: 0,
          }
          set({ currentUser: user, token })
          return
        } catch (err: any) {
          // Only fall through to mock if the backend is unreachable (network/timeout)
          // If the backend responded with an error (4xx/5xx), surface it to the user
          if (err?.response) {
            const message = err.response.data?.message || err.response.data || 'Incorrect email or password. Please try again.'
            throw new Error(typeof message === 'string' ? message : 'Incorrect email or password. Please try again.')
          }
          // Network error / timeout — fall through to mock login
        }

        // Fallback to mock
        const user = get().allUsers.find(
          u => u.username === emailOrUsername || u.email === emailOrUsername
        )
        if (!user) throw new Error('No account found with this email. Please register first.')
        set({ currentUser: user, token: null })
      },

      logout: () => set({ currentUser: null, token: null }),

      register: async (data, role) => {
        try {
          await axios.post(`${API_BASE}/auth/register`, data, { timeout: 3000 })
          // Register doesn't return a token — auto-login to get one
          const loginRes = await axios.post(`${API_BASE}/auth/login`, { email: data.email, password: data.password }, { timeout: 3000 })
          const { token, userId, username } = loginRes.data
          const newUser: User = {
            user_id: userId,
            username,
            email: data.email,
            name: data.name,
            surname: data.surname,
            role,
            created_at: new Date().toISOString(),
            follower_count: 0,
            following_count: 0,
          }
          set(state => ({ allUsers: [...state.allUsers, newUser], currentUser: newUser, token }))
          return
        } catch (err: any) {
          if (err?.response) {
            const message = err.response.data?.message || err.response.data || 'Registration failed.'
            throw new Error(typeof message === 'string' ? message : 'Registration failed.')
          }
          // Network error / timeout — fall through to mock register
          console.warn('Backend unreachable during register, using mock:', err?.message)
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
          token: null,
        }))
      },

      switchUser: (userId: number) => {
        if (userId === 0) {
          set({ currentUser: null, token: null })
          return
        }
        const user = get().allUsers.find(u => u.user_id === userId)
        if (user) set({ currentUser: user, token: null })
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

      updateUser: async (userId, data) => {
        const { token } = get()
        await axios.put(`${API_BASE}/users/${userId}`, { id: userId, ...data }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        set(state => ({
          allUsers: state.allUsers.map(u => u.user_id === userId ? { ...u, ...data } : u),
          currentUser: state.currentUser?.user_id === userId ? { ...state.currentUser, ...data } : state.currentUser,
        }))
      },

      addUser: (user: User) =>
        set(state => ({ allUsers: [...state.allUsers, user] })),

      fetchAllUsers: async () => {
        try {
          const res = await axios.get(`${API_BASE}/users`)
          const data: any[] = res.data?.users ?? res.data ?? []
          const existing = get().allUsers
          const users: User[] = data.map((u: any) => ({
            user_id: u.id,
            username: u.username,
            email: u.email ?? '',
            name: u.name ?? u.username,
            surname: u.surname ?? '',
            role: (u.role ?? 'regular') as UserRole,
            created_at: u.createdAt ?? new Date().toISOString(),
            follower_count: 0,
            following_count: 0,
            bio: existing.find(e => e.user_id === u.id)?.bio,
          }))
          set({ allUsers: users })
        } catch {
          // keep existing
        }
      },
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
