import React, { Suspense, lazy, ReactNode, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useUIStore } from './store/uiStore'
import { useStoryStore } from './store/storyStore'
import { UserRole } from './types'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ToastContainer } from './components/ui/Toast'
import { Spinner } from './components/ui/Spinner'

// Lazy imports
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })))
const BrowsePage = lazy(() => import('./pages/browse/BrowsePage').then(m => ({ default: m.BrowsePage })))
const GenrePage = lazy(() => import('./pages/browse/GenrePage').then(m => ({ default: m.GenrePage })))
const GenresListPage = lazy(() => import('./pages/browse/GenrePage').then(m => ({ default: m.GenresListPage })))
const StoryDetailPage = lazy(() => import('./pages/story/StoryDetailPage').then(m => ({ default: m.StoryDetailPage })))
const ChapterReadPage = lazy(() => import('./pages/story/ChapterReadPage').then(m => ({ default: m.ChapterReadPage })))
const WriterDashboard = lazy(() => import('./pages/writer/WriterDashboard').then(m => ({ default: m.WriterDashboard })))
const CreateStoryPage = lazy(() => import('./pages/writer/CreateStoryPage').then(m => ({ default: m.CreateStoryPage })))
const EditStoryPage = lazy(() => import('./pages/writer/EditStoryPage').then(m => ({ default: m.EditStoryPage })))
const CreateChapterPage = lazy(() => import('./pages/writer/CreateChapterPage').then(m => ({ default: m.CreateChapterPage })))
const EditChapterPage = lazy(() => import('./pages/writer/EditChapterPage').then(m => ({ default: m.EditChapterPage })))
const ReadingListPage = lazy(() => import('./pages/reading-list/ReadingListPage').then(m => ({ default: m.ReadingListPage })))
const CommunityListsPage = lazy(() => import('./pages/reading-list/CommunityListsPage').then(m => ({ default: m.CommunityListsPage })))
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage').then(m => ({ default: m.AdminContentPage })))
const AdminGenresPage = lazy(() => import('./pages/admin/AdminGenresPage').then(m => ({ default: m.AdminGenresPage })))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })))

const SuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Spinner size="lg" />
  </div>
)

// Protected route component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: ReactNode
  requiredRole?: UserRole | UserRole[]
}) => {
  const { currentUser } = useAuthStore()
  const { addToast } = useUIStore()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!roles.includes(currentUser.role)) {
      addToast('You do not have permission to access this page.', 'error')
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

function App() {
  const { fetchStories, fetchChapters, fetchCollaborations, fetchReadingLists } = useStoryStore()

  useEffect(() => {
    fetchStories()
    fetchChapters()
    fetchCollaborations()
    fetchReadingLists()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/genres" element={<GenresListPage />} />
            <Route path="/genres/:genre" element={<GenrePage />} />
            <Route path="/story/:id" element={<StoryDetailPage />} />
            <Route path="/story/:storyId/chapter/:chapterId" element={<ChapterReadPage />} />
            <Route path="/community-lists" element={<CommunityListsPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Authenticated */}
            <Route
              path="/reading-lists"
              element={
                <ProtectedRoute>
                  <ReadingListPage />
                </ProtectedRoute>
              }
            />

            {/* Writer routes */}
            <Route
              path="/writer"
              element={
                <ProtectedRoute requiredRole={['writer', 'admin']}>
                  <WriterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/writer/create-story"
              element={
                <ProtectedRoute requiredRole={['writer', 'admin']}>
                  <CreateStoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/writer/edit-story/:id"
              element={
                <ProtectedRoute requiredRole={['writer', 'admin']}>
                  <EditStoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/writer/create-chapter/:storyId"
              element={
                <ProtectedRoute requiredRole={['writer', 'admin']}>
                  <CreateChapterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/writer/edit-chapter/:chapterId"
              element={
                <ProtectedRoute requiredRole={['writer', 'admin']}>
                  <EditChapterPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminContentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/genres"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminGenresPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
