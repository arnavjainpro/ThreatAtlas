// src/auth/AuthProvider.tsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextShape {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for demo authentication first
    const checkAuth = async () => {
      // Always check demo auth first since it's more reliable
      const demoAuth = localStorage.getItem('demo_authenticated')
      const demoUser = localStorage.getItem('demo_user')
      
      if (demoAuth === 'true' && demoUser) {
        const user = JSON.parse(demoUser)
        const mockSession = {
          user: {
            id: user.id,
            email: user.email,
            aud: 'authenticated',
            role: 'authenticated',
            app_metadata: {},
            user_metadata: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          access_token: 'demo-token',
          refresh_token: 'demo-refresh',
          expires_in: 3600,
          expires_at: Date.now() + 3600000,
          token_type: 'bearer'
        } as Session
        setSession(mockSession)
        setLoading(false)
        return // Don't check Supabase if demo auth exists
      }

      // Only try Supabase if no demo auth
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          setSession(data.session)
        }
      } catch (error) {
        console.log('Supabase auth check failed:', error)
      }
      
      setLoading(false)
    }

    checkAuth()

    // Don't set up Supabase listener if we're in demo mode
    const demoAuth = localStorage.getItem('demo_authenticated')
    if (demoAuth === 'true') {
      return // Skip Supabase listener in demo mode
    }

    // Set up Supabase auth listener only for real auth
    try {
      const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
        setSession(sess)
      })
      return () => sub.subscription.unsubscribe()
    } catch (error) {
      console.log('Supabase auth listener failed')
    }
  }, [])

  const value = useMemo(() => ({
    user: session?.user ?? null,
    session,
    loading,
    signOut: async () => {
      try {
        await supabase.auth.signOut()
      } catch (error) {
        console.log('Supabase signOut failed, using demo mode')
      }
      // Always clear demo auth
      localStorage.removeItem('demo_authenticated')
      localStorage.removeItem('demo_user')
      setSession(null)
      window.location.assign('/login')
    }
  }), [session, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
