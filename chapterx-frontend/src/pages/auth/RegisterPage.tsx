import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, PenLine, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/chapterX-removebg-preview.png'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'

type Role = 'regular' | 'writer'
type Step = 1 | 2

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const { addToast } = useUIStore()
  const [step, setStep] = useState<Step>(1)
  const [role, setRole] = useState<Role>('regular')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.username.trim()) e.username = 'Username is required'
    if (form.username.length < 3) e.username = 'Username must be at least 3 characters'
    if (!form.email.includes('@')) e.email = 'Enter a valid email address'
    if (!form.name.trim()) e.name = 'First name is required'
    if (!form.surname.trim()) e.surname = 'Last name is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register(
        { username: form.username, email: form.email, name: form.name, surname: form.surname, password: form.password },
        role
      )
      addToast('Account created! Welcome to ChapterX.')
      navigate('/')
    } catch (err: any) {
      addToast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const setField = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="ChapterX" className="h-20 w-20 object-contain" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-white">Create your account</h1>
          <p className="text-slate-400 text-sm mt-2">Step {step} of 2</p>

          {/* Progress */}
          <div className="flex gap-2 justify-center mt-4">
            <div className="h-1 w-16 rounded-full bg-indigo-600" />
            <div className={`h-1 w-16 rounded-full transition-colors ${step === 2 ? 'bg-indigo-600' : 'bg-slate-700'}`} />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <h2 className="text-white font-semibold text-center mb-6">I want to join as...</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setRole('regular')}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${
                  role === 'regular'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  role === 'regular' ? 'bg-indigo-500/30' : 'bg-slate-700'
                }`}>
                  <BookOpen size={20} className="text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Reader</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Browse stories, leave comments, build reading lists, and follow your favorite authors.
                  </p>
                </div>
              </button>
              <button
                onClick={() => setRole('writer')}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${
                  role === 'writer'
                    ? 'border-violet-500 bg-violet-500/10'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  role === 'writer' ? 'bg-violet-500/30' : 'bg-slate-700'
                }`}>
                  <PenLine size={20} className="text-violet-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Writer</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Publish stories, write chapters, collaborate with others, and get AI writing assistance.
                  </p>
                </div>
              </button>
            </div>
            <Button className="w-full mt-6" size="lg" onClick={() => setStep(2)}>
              Continue
            </Button>
            <p className="text-center text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-2"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">First Name</label>
                <input
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                  placeholder="Elena"
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${errors.name ? 'border-rose-500' : 'border-slate-700'}`}
                />
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Last Name</label>
                <input
                  value={form.surname}
                  onChange={e => setField('surname', e.target.value)}
                  placeholder="Dimitrova"
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${errors.surname ? 'border-rose-500' : 'border-slate-700'}`}
                />
                {errors.surname && <p className="text-rose-400 text-xs mt-1">{errors.surname}</p>}
              </div>
            </div>

            {[
              { field: 'username', label: 'Username', placeholder: 'elena_writes', type: 'text' },
              { field: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
            ].map(f => (
              <div key={f.field}>
                <label className="block text-sm text-slate-400 mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  value={(form as any)[f.field]}
                  onChange={e => setField(f.field, e.target.value)}
                  placeholder={f.placeholder}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${(errors as any)[f.field] ? 'border-rose-500' : 'border-slate-700'}`}
                />
                {(errors as any)[f.field] && <p className="text-rose-400 text-xs mt-1">{(errors as any)[f.field]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setField('password', e.target.value)}
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${errors.password ? 'border-rose-500' : 'border-slate-700'}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => setField('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-700'}`}
              />
              {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account as {role === 'writer' ? 'Writer' : 'Reader'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
