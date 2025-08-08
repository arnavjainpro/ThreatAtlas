// src/pages/Login.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function signInWithPassword() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)
      
      if (!email || !password) {
        throw new Error('Please enter both email and password')
      }

      console.log('Attempting to sign in with:', { email, supabaseUrl: import.meta.env.VITE_SUPABASE_URL })
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      
      console.log('Sign in response:', { data, error })
      
      if (error) {
        console.error('Supabase auth error:', error)
        throw error
      }
      
      setMessage('Signed in successfully')
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    } catch (e: any) {
      console.error('Login error:', e)
      setError(e.message || 'An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  async function sendMagicLink() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)
      
      if (!email) {
        throw new Error('Please enter your email address')
      }

      console.log('Sending magic link to:', email)
      
      const { data, error } = await supabase.auth.signInWithOtp({ 
        email, 
        options: { emailRedirectTo: window.location.origin } 
      })
      
      console.log('Magic link response:', { data, error })
      
      if (error) {
        console.error('Magic link error:', error)
        throw error
      }
      
      setMessage('Magic link sent. Check your email')
    } catch (e: any) {
      console.error('Magic link error:', e)
      setError(e.message || 'An error occurred sending magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>

        {error && <div className="mb-3 rounded bg-red-600/20 p-2 text-red-300">{error}</div>}
        {message && <div className="mb-3 rounded bg-emerald-600/20 p-2 text-emerald-300">{message}</div>}

        <label className="block mb-3">
          <div className="text-sm text-slate-300 mb-1">Email</div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 outline-none"
            type="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm text-slate-300 mb-1">Password</div>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 outline-none"
            type="password"
            placeholder="••••••••"
          />
        </label>

        <div className="flex items-center gap-2">
          <button onClick={signInWithPassword} disabled={loading}
                  className="rounded-lg bg-indigo-600 px-4 py-2 disabled:opacity-50">Sign in</button>
          <button onClick={sendMagicLink} disabled={loading}
                  className="rounded-lg border border-slate-700 px-4 py-2">Email me a magic link</button>
        </div>
      </div>
    </div>
  )
}
