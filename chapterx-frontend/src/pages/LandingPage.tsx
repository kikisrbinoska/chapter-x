import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Feather, Star, BookOpen, Users, Sparkles, ArrowRight, ChevronRight } from 'lucide-react'
import logo from '../assets/chapterX-removebg-preview.png'
import { useStoryStore } from '../store/storyStore'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { StoryCard } from '../components/ui/StoryCard'
import { GenreBadge } from '../components/ui/Badge'

const features = [
  { icon: <BookOpen size={24} className="text-indigo-400" />, title: 'Read & Discover', desc: 'Explore thousands of stories across every genre. From fantasy epics to contemporary fiction.' },
  { icon: <Feather size={24} className="text-violet-400" />, title: 'Write & Publish', desc: 'Share your stories with a passionate community. Get feedback, likes, and readers from day one.' },
  { icon: <Users size={24} className="text-amber-400" />, title: 'Collaborate', desc: 'Invite co-authors, editors, and beta readers. Build stories together with real-time collaboration.' },
  { icon: <Sparkles size={24} className="text-emerald-400" />, title: 'AI Assistance', desc: 'Get intelligent writing suggestions for grammar, style, plot, and pacing to improve your craft.' },
]

const genres = ['Fantasy', 'Sci-Fi', 'Romance', 'Historical Fiction', 'Adventure', 'Thriller', 'Mystery', 'Horror']

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { stories } = useStoryStore()
  const { currentUser } = useAuthStore()

  const trending = stories.filter(s => s.status === 'published').slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-violet-950/30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-8 border border-indigo-500/20">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            The collaborative storytelling platform
          </div>

          <div className="flex justify-center mb-6">
            <img src={logo} alt="ChapterX" className="h-32 w-32 object-contain" />
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Write Your Own Story.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Anyone Could Be Shakespeare.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            ChapterX is where writers and readers connect. Publish your stories, collaborate with others,
            and discover your next great read.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {currentUser ? (
              <>
                <Button size="lg" onClick={() => navigate('/browse')}>
                  <BookOpen size={18} />
                  Browse Stories
                  <ArrowRight size={16} />
                </Button>
                {(currentUser.role === 'writer' || currentUser.role === 'admin') && (
                  <Button size="lg" variant="secondary" onClick={() => navigate('/writer/create-story')}>
                    <Feather size={18} />
                    Start Writing
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button size="lg" onClick={() => navigate('/register')}>
                  Get Started Free
                  <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="ghost" onClick={() => navigate('/browse')}>
                  Browse Stories
                </Button>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A complete platform for creative writing and reading.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-serif font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-white">Explore Genres</h2>
            <button onClick={() => navigate('/genres')} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              See all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => navigate(`/genres/${g.toLowerCase().replace(' ', '-')}`)}
                className="transition-transform hover:scale-105"
              >
                <GenreBadge genre={g} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending stories */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Trending Stories</h2>
            <p className="text-slate-500 text-sm mt-1">Most popular right now</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/browse')}>
            View all
            <ChevronRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map(story => (
            <StoryCard key={story.story_id} story={story} />
          ))}
        </div>
      </section>

      {/* CTA */}
      {!currentUser && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="glass rounded-3xl p-12 border border-indigo-500/20">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                Ready to Begin Your Story?
              </h2>
              <p className="text-slate-400 mb-8">
                Join thousands of writers and readers on ChapterX today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/register')}>
                  <Feather size={18} />
                  Start Writing
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate('/browse')}>
                  <BookOpen size={18} />
                  Just Browse
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
