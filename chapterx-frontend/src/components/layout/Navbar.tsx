import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Menu, X, ChevronDown, BookOpen, PenLine, Shield, List } from 'lucide-react'
import logo from '../../assets/chapterX-removebg-preview.png'
import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { Avatar } from '../ui/Avatar'
import { RoleBadge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { NotificationDropdown } from '../notifications/NotificationDropdown'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, logout } = useAuthStore()
  const { notifications } = useNotificationStore()
  const unread = notifications.filter(n => !n.is_read).length

  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { to: '/browse', label: 'Browse', icon: <BookOpen size={16} /> },
    { to: '/genres', label: 'Genres', icon: null },
    { to: '/community-lists', label: 'Reading Lists', icon: <List size={16} /> },
  ]

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img src={logo} alt="ChapterX" className="h-14 w-14 object-contain group-hover:scale-110 transition-transform" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {currentUser?.role === 'writer' || currentUser?.role === 'admin' ? (
              <Link
                to="/writer"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/writer')
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <PenLine size={16} />
                Write
              </Link>
            ) : null}
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/admin')
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Shield size={16} />
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                {/* Notification bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false) }}
                    className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Bell size={18} />
                    {unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {unread > 9 ? '9+' : unread}
                      </span>
                    )}
                  </button>
                  {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
                </div>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false) }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <Avatar name={currentUser.name} size="sm" />
                    <span className="hidden sm:block text-sm text-slate-300">{currentUser.username}</span>
                    <ChevronDown size={14} className="text-slate-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden py-1">
                      <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-medium text-white">{currentUser.name} {currentUser.surname}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-slate-500">@{currentUser.username}</p>
                          <RoleBadge role={currentUser.role} />
                        </div>
                      </div>
                      <div className="py-1">
                        <button onClick={() => { navigate(`/profile/${currentUser.username}`); setUserMenuOpen(false) }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                          My Profile
                        </button>
                        <button onClick={() => { navigate('/reading-lists'); setUserMenuOpen(false) }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                          My Reading Lists
                        </button>
                        {(currentUser.role === 'writer' || currentUser.role === 'admin') && (
                          <button onClick={() => { navigate('/writer'); setUserMenuOpen(false) }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Writer Dashboard
                          </button>
                        )}
                        {currentUser.role === 'admin' && (
                          <button onClick={() => { navigate('/admin'); setUserMenuOpen(false) }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Admin Panel
                          </button>
                        )}
                      </div>
                      <div className="border-t border-slate-700 py-1">
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); navigate('/') }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800 mt-2 pt-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(link.to)
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => { navigate('/login'); setMobileOpen(false) }} className="flex-1">
                  Sign In
                </Button>
                <Button size="sm" onClick={() => { navigate('/register'); setMobileOpen(false) }} className="flex-1">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
