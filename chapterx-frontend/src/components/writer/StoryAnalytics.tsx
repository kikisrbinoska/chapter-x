import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Eye, Heart, MessageCircle, TrendingUp, Clock, BarChart2 } from 'lucide-react'
import { mockAnalytics } from '../../data/mockData'

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({
  icon, label, value, color,
}) => (
  <div className={`p-4 bg-slate-800 rounded-xl border border-slate-700`}>
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
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

export const StoryAnalytics: React.FC = () => {
  const analytics = mockAnalytics
  const viewsData = analytics.views_over_time.filter((_, i) => i % 5 === 0)
  const likesData = analytics.likes_over_time.filter((_, i) => i % 5 === 0)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<Eye size={18} className="text-blue-300" />} label="Total Views" value={analytics.total_views} color="bg-blue-500/20" />
        <StatCard icon={<Heart size={18} className="text-rose-300" />} label="Total Likes" value={analytics.total_likes} color="bg-rose-500/20" />
        <StatCard icon={<MessageCircle size={18} className="text-violet-300" />} label="Comments" value={analytics.total_comments} color="bg-violet-500/20" />
        <StatCard icon={<Clock size={18} className="text-amber-300" />} label="Avg Read (min)" value={analytics.avg_read_time} color="bg-amber-500/20" />
        <StatCard icon={<BarChart2 size={18} className="text-emerald-300" />} label="Completion %" value={`${analytics.completion_rate}%`} color="bg-emerald-500/20" />
      </div>

      {/* Views chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-blue-400" />
          <h3 className="text-white font-semibold">Views Over Time</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} name="Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Likes chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={16} className="text-rose-400" />
          <h3 className="text-white font-semibold">Likes Over Time</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={likesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="likes" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Likes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
