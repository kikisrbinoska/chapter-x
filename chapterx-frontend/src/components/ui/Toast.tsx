import React from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

const icons = {
  success: <CheckCircle size={18} className="text-emerald-400" />,
  error: <XCircle size={18} className="text-rose-400" />,
  warning: <AlertTriangle size={18} className="text-amber-400" />,
  info: <Info size={18} className="text-blue-400" />,
}

const styles = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  error: 'border-rose-500/30 bg-rose-500/10',
  warning: 'border-amber-500/30 bg-amber-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
}

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border glass shadow-xl min-w-[280px] max-w-sm ${styles[toast.type]} animate-pulse-once`}
        >
          {icons[toast.type]}
          <p className="text-sm text-slate-100 flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors ml-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
