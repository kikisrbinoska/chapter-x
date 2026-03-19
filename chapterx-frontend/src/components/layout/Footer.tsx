import React from 'react'
import { Link } from 'react-router-dom'
import { Feather } from 'lucide-react'

export const Footer: React.FC = () => (
  <footer className="border-t border-slate-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Feather size={14} className="text-white" />
            </div>
            <span className="font-serif font-bold text-white">ChapterX</span>
          </Link>
          <p className="text-slate-500 text-sm">
            A collaborative storytelling platform for writers and readers.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Explore</h4>
          <ul className="space-y-2 text-slate-500 text-sm">
            <li><Link to="/browse" className="hover:text-white transition-colors">Browse Stories</Link></li>
            <li><Link to="/genres" className="hover:text-white transition-colors">Genres</Link></li>
            <li><Link to="/community-lists" className="hover:text-white transition-colors">Reading Lists</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Create</h4>
          <ul className="space-y-2 text-slate-500 text-sm">
            <li><Link to="/register" className="hover:text-white transition-colors">Start Writing</Link></li>
            <li><Link to="/writer" className="hover:text-white transition-colors">Writer Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Account</h4>
          <ul className="space-y-2 text-slate-500 text-sm">
            <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-6 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} ChapterX. All rights reserved.
      </div>
    </div>
  </footer>
)
