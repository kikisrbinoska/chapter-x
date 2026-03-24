import { create } from 'zustand'
import axios from 'axios'
import { Notification } from '../types'

const API = 'https://localhost:7125/api'

function getAuthHeaders() {
  try {
    const token = JSON.parse(localStorage.getItem('chapterx-auth') || '{}')?.state?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}

interface NotificationStore {
  notifications: Notification[]
  fetchUserNotifications: (userId: number) => Promise<void>
  addNotification: (n: { recipientUserId: number; type: string; content: string; link?: string }) => Promise<void>
  markAllRead: () => Promise<void>
  markRead: (id: number) => Promise<void>
  getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  fetchUserNotifications: async (userId) => {
    try {
      const res = await axios.get(`${API}/notifications/user/${userId}`, { headers: getAuthHeaders() })
      const data: any[] = res.data ?? []
      const notifications: Notification[] = data.map(n => ({
        notification_id: n.id,
        user_id: userId,
        type: n.type ?? 'info',
        title: n.type ?? 'Notification',
        message: n.content,
        link: n.link,
        is_read: n.isRead,
        created_at: n.createdAt,
      }))
      set({ notifications })
    } catch {
      // keep existing
    }
  },

  addNotification: async ({ recipientUserId, type, content, link }) => {
    try {
      await axios.post(`${API}/notifications`, {
        content,
        recipientUserId,
        type,
        link,
      }, { headers: getAuthHeaders() })
    } catch {
      // silent — notification is for recipient, not current user
    }
  },

  markAllRead: async () => {
    const unread = get().notifications.filter(n => !n.is_read)
    set(state => ({ notifications: state.notifications.map(n => ({ ...n, is_read: true })) }))
    try {
      await Promise.all(unread.map(n =>
        axios.put(`${API}/notifications/${n.notification_id}/read`, {}, { headers: getAuthHeaders() })
      ))
    } catch {
      // keep optimistic
    }
  },

  markRead: async (id) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.notification_id === id ? { ...n, is_read: true } : n
      ),
    }))
    try {
      await axios.put(`${API}/notifications/${id}/read`, {}, { headers: getAuthHeaders() })
    } catch {
      // keep optimistic
    }
  },

  getUnreadCount: () => get().notifications.filter(n => !n.is_read).length,
}))
