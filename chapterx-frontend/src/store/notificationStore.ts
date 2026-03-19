import { create } from 'zustand'
import { Notification } from '../types'
import { mockNotifications } from '../data/mockData'

interface NotificationStore {
  notifications: Notification[]
  addNotification: (n: Omit<Notification, 'notification_id' | 'created_at' | 'is_read'>) => void
  markAllRead: () => void
  markRead: (id: number) => void
  getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [...mockNotifications],

  addNotification: (n) =>
    set(state => ({
      notifications: [
        {
          ...n,
          notification_id: Date.now(),
          created_at: new Date().toISOString(),
          is_read: false,
        },
        ...state.notifications,
      ],
    })),

  markAllRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, is_read: true })),
    })),

  markRead: (id) =>
    set(state => ({
      notifications: state.notifications.map(n =>
        n.notification_id === id ? { ...n, is_read: true } : n
      ),
    })),

  getUnreadCount: () => get().notifications.filter(n => !n.is_read).length,
}))
