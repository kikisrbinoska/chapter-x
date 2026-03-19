import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/chapterX-removebg-preview.png'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { RoleBadge } from '../../components/ui/Badge'

const quickUsers = [
  { username: 'admin_alex', name: 'Alex Admin', role: 'admin' as const },
  { username: 'elena_writes', name: 'Elena Dimitrova', role: 'writer' as const },
  { username: 'boris_writer', name: 'Boris Nikolov', role: 'writer' as const },
  { username: 'sara_reader', name: 'Sara Petkovska', role: 'regular' as const },
]

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, switchUser } = useAuthStore()
  const { addToast } = useUIStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email.trim()) e.email = 'Email or username is required'
    if (!password.trim()) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(email, password)
      addToast('Welcome back!')
      navigate('/')
    } catch (err: any) {
      addToast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = (username: string) => {
    const { allUsers } = useAuthStore.getState()
    const user = allUsers.find(u => u.username === username)
    if (user) {
      switchUser(user.user_id)
      addToast(`Signed in as ${user.name}`)
      navigate('/')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="ChapterX" className="h-20 w-20 object-contain" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* Quick login */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 text-center mb-3">Quick demo login</p>
          <div className="grid grid-cols-2 gap-2">
            {quickUsers.map(u => (
              <button
                key={u.username}
                onClick={() => handleQuickLogin(u.username)}
                className="flex items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500/50 hover:bg-slate-700/50 transition-all group"
              >
                <Avatar name={u.name} size="sm" />
                <div className="text-left min-w-0">
                  <p className="text-white text-xs font-medium truncate">{u.name}</p>
                  <RoleBadge role={u.role} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-600 text-xs">or sign in with email</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                errors.email ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                  errors.password ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
