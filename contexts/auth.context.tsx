'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, AuthResult } from '@/models'

// Demo credentials
const DEMO_EMAIL = 'demo@nuclear.app'
const DEMO_PASSWORD = 'demo123456'
const AUTH_STORAGE_KEY = 'nuclear_auth_user'

interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

function createDemoUser(): User {
  const name = 'Demo User'
  return {
    id: 'demo-user-id',
    name,
    role: 'Hospital Administrator',
    initials: generateInitials(name)
  }
}

function createUserFromEmail(email: string, id: string): User {
  const name = email.split('@')[0].split('.').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join(' ')
  
  return {
    id,
    name: name || 'User',
    role: 'Hospital Administrator',
    initials: generateInitials(name || 'User')
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First check localStorage for demo user
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser)
            // Check if it's a demo user
            if (parsed.id === 'demo-user-id') {
              setUser(parsed)
              // Set cookie for middleware
              document.cookie = `nuclear_demo_user=true; path=/; max-age=86400` // 24 hours
              setIsLoading(false)
              return
            }
          } catch (error) {
            console.error('Failed to parse stored user:', error)
            localStorage.removeItem(AUTH_STORAGE_KEY)
          }
        }

        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const appUser = createUserFromEmail(session.user.email || '', session.user.id)
          setUser(appUser)
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const appUser = createUserFromEmail(session.user.email || '', session.user.id)
        setUser(appUser)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser))
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    // Check for demo credentials first
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demoUser = createDemoUser()
      setUser(demoUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser))
      // Set a cookie to indicate demo user for middleware
      document.cookie = `nuclear_demo_user=true; path=/; max-age=86400` // 24 hours
      return { success: true, user: demoUser }
    }
    
    // Try Supabase authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        const appUser = createUserFromEmail(data.user.email || '', data.user.id)
        setUser(appUser)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser))
        return { success: true, user: appUser }
      }

      return { success: false, error: 'Login failed. Please try again.' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred. Please try again.' }
    }
  }, [supabase.auth])

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          return { success: false, error: 'An account with this email already exists.' }
        }
        
        // If email confirmation is required, inform the user
        if (!data.session) {
          return { 
            success: true, 
            user: createUserFromEmail(email, data.user.id),
            message: 'Please check your email to confirm your account.'
          }
        }

        const appUser = createUserFromEmail(data.user.email || '', data.user.id)
        setUser(appUser)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser))
        return { success: true, user: appUser }
      }

      return { success: false, error: 'Sign up failed. Please try again.' }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: 'An unexpected error occurred. Please try again.' }
    }
  }, [supabase.auth])

  const logout = useCallback(async () => {
    // Check if it's a demo user
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed.id === 'demo-user-id') {
          setUser(null)
          localStorage.removeItem(AUTH_STORAGE_KEY)
          // Remove demo cookie
          document.cookie = `nuclear_demo_user=; path=/; max-age=0`
          return
        }
      } catch (error) {
        // Continue with Supabase logout
      }
    }

    // Sign out from Supabase
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    // Remove demo cookie
    document.cookie = `nuclear_demo_user=; path=/; max-age=0`
  }, [supabase.auth])

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: 'An unexpected error occurred. Please try again.' }
    }
  }, [supabase.auth])

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      isLoading,
      login,
      signUp,
      logout,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export { AuthContext }
