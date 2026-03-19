import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { UserTable } from '../../components/admin/UserTable'
import { Button } from '../../components/ui/Button'

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate()
  const { allUsers } = useAuthStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">{allUsers.length} registered users</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users size={18} className="text-blue-400" />
          <h2 className="text-white font-semibold">All Users</h2>
        </div>
        <UserTable />
      </div>
    </div>
  )
}
