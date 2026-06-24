import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Heart, MessageCircle, BookOpen } from 'lucide-react'
import { Story } from '../../types'

interface Props {
  stories: Story[]
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({
  icon, label, value, color,
}) => (
  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    <p className="text-slate-400 text-sm mt-0.5">{label}</p>
  </div>
)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm">
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-white font-medium">
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export const StoryAnalytics: React.FC<Props> = ({ stories }) => {
  const published = stories.filter(s => s.status === 'published')

  const totalLikes = stories.reduce((a, s) => a + s.total_likes, 0)
  const totalComments = stories.reduce((a, s) => a + s.total_comments, 0)
  const totalChapters = stories.reduce((a, s) => a + s.total_chapters, 0)

  // Likes per story (sorted by created_at)
  const likesData = [...published]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map(s => ({
      date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      likes: s.total_likes,
      story: s.title,
    }))

  if (published.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>No published stories yet — analytics will appear here once you publish.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={<Heart size={18} className="text-rose-300" />} label="Total Likes" value={totalLikes} color="bg-rose-500/20" />
        <StatCard icon={<MessageCircle size={18} className="text-violet-300" />} label="Total Comments" value={totalComments} color="bg-violet-500/20" />
        <StatCard icon={<BookOpen size={18} className="text-emerald-300" />} label="Total Chapters" value={totalChapters} color="bg-emerald-500/20" />
      </div>

      {/* Likes chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={16} className="text-rose-400" />
          <h3 className="text-white font-semibold">Likes per Story</h3>
        </div>
        {likesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={likesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="likes" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Likes" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">No likes data yet</p>
        )}
      </div>

      {/* Per-story breakdown */}
      {published.length > 1 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Story Breakdown</h3>
          <div className="space-y-3">
            {[...published]
              .sort((a, b) => b.total_likes - a.total_likes)
              .map(s => (
                <div key={s.story_id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 truncate max-w-xs">{s.title}</span>
                  <div className="flex items-center gap-4 text-slate-400 flex-shrink-0">
                    <span className="flex items-center gap-1"><Heart size={12} /> {s.total_likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} /> {s.total_comments}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
