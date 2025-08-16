// src/pages/Login.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function signInWithPassword() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)
      
      if (!email || !password) {
        throw new Error('Please enter both email and password')
      }

      console.log('Attempting to log in with:', { email, supabaseUrl: import.meta.env.VITE_SUPABASE_URL })
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      
      console.log('Log in response:', { data, error })
      
      if (error) {
        console.error('Supabase auth error:', error)
        throw error
      }
      
      setMessage('Logged in successfully')
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    } catch (e: any) {
      console.error('Login error:', e)
      setError(e.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  async function signInWithGoogle() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) {
        console.error('Google auth error:', error)
        throw error
      }
    } catch (e: any) {
      console.error('Google login error:', e)
      setError(e.message || 'An error occurred during Google login')
    } finally {
      setLoading(false)
    }
  }

  async function signInWithFacebook() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) {
        console.error('Facebook auth error:', error)
        throw error
      }
    } catch (e: any) {
      console.error('Facebook login error:', e)
      setError(e.message || 'An error occurred during Facebook login')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password clicked')
  }

  const handleSignUp = () => {
    // Handle sign up navigation here
    console.log('Sign up clicked')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="login-header">
            <div className="brand-logo">
              <div className="logo-icon">🛡️</div>
              <span className="brand-name">ThreatAtlas</span>
            </div>
            <h1 className="login-title">Log in to your account.</h1>
            <p className="login-subtitle">Enter your email address and password to log in.</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={(e) => { e.preventDefault(); signInWithPassword(); }}>
            <div className="form-group">
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <button type="button" className="forgot-link" onClick={handleForgotPassword}>
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-buttons">
            <button 
              className="social-button google" 
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <span className="social-icon">🇬</span>
              Google
            </button>
            <button 
              className="social-button facebook" 
              onClick={signInWithFacebook}
              disabled={loading}
            >
              <span className="social-icon">📘</span>
              Facebook
            </button>
          </div>

          <div className="signup-link">
            Don't you have an account? <button className="link-button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">📊</div>
            <h2 className="hero-title">The easiest way to manage your security portfolio.</h2>
            <p className="hero-subtitle">Join the ThreatAtlas community now!</p>
          </div>
          
          <div className="dashboard-preview">
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-tabs">
                  <div className="tab active">Overview</div>
                  <div className="tab">Reports</div>
                  <div className="tab">Settings</div>
                </div>
              </div>
              <div className="preview-content">
                <div className="chart-placeholder">
                  <svg className="chart-svg" viewBox="0 0 300 60">
                    <path d="M0,40 Q75,20 150,30 T300,25" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none"/>
                    <circle cx="50" cy="35" r="3" fill="rgba(255,255,255,0.9)"/>
                    <circle cx="150" cy="30" r="3" fill="rgba(255,255,255,0.9)"/>
                    <circle cx="250" cy="25" r="3" fill="rgba(255,255,255,0.9)"/>
                  </svg>
                </div>
                <div className="stats-row">
                  <div className="stat-item">
                    <div className="stat-value">125,762.98</div>
                    <div className="stat-label">Total Vulnerabilities</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">+0.134900</div>
                    <div className="stat-label">+0.39%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
