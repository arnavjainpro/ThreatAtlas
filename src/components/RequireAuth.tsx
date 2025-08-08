// src/components/RequireAuth.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="p-6 text-slate-200">Loading…</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
