'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User, AuthResult, UserRole } from '@/models'

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

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    // Simple demo authentication - check against demo credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demoUser = createDemoUser()
      setUser(demoUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser))
      return { success: true, user: demoUser }
    }
    
    return { success: false, error: 'Invalid credentials. Please use the demo account.' }
  }, [])

  const signUp = useCallback(async (email: string, password: string = ''): Promise<AuthResult> => {
    // In demo mode, sign up only requires email
    // Create a user account without password requirement
    const name = email.split('@')[0].split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ')
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || 'User',
      role: 'Hospital Administrator',
      initials: generateInitials(name || 'User')
    }
    
    setUser(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    return { success: true, user: newUser }
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    // Password reset is not supported in demo mode
    return { success: false, error: 'Password reset is not available in demo mode. Please use the demo credentials.' }
  }, [])

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
