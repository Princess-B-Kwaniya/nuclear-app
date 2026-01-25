'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedLogo } from '@/components'
import { validateEmail, validatePassword, validatePasswordMatch } from '@/lib/utils/validation'
import { AUTH_ERROR_MESSAGES } from '@/lib/utils/errors'

// Demo credentials for testing
const DEMO_EMAIL = 'demo@nuclear.app'
const DEMO_PASSWORD = 'demo123456'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signUp } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  // Check for error or success messages in URL
  useEffect(() => {
    const errorParam = searchParams.get('error')
    const successParam = searchParams.get('success')
    
    if (errorParam && AUTH_ERROR_MESSAGES[errorParam]) {
      setError(AUTH_ERROR_MESSAGES[errorParam])
    }
    
    if (successParam === 'email_confirmed') {
      setMessage('Email confirmed successfully! You can now log in.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)
    
    if (isSignUp) {
      // Client-side validation for signup
      const emailValidation = validateEmail(email)
      if (!emailValidation.valid) {
        setError(emailValidation.error!)
        setIsLoading(false)
        return
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        setError(passwordValidation.error!)
        setIsLoading(false)
        return
      }

      const matchValidation = validatePasswordMatch(password, confirmPassword)
      if (!matchValidation.valid) {
        setError(matchValidation.error!)
        setIsLoading(false)
        return
      }

      // Attempt signup
      const result = await signUp(email, password)
      
      if (result.success) {
        if (result.message) {
          // Email confirmation required
          setMessage(result.message)
          setIsSignUp(false) // Switch to login view
        } else {
          // Logged in immediately
          router.push('/dashboard')
        }
      } else {
        setError(result.error || 'Sign up failed')
      }
    } else {
      // Client-side validation for login
      const emailValidation = validateEmail(email)
      if (!emailValidation.valid) {
        setError(emailValidation.error!)
        setIsLoading(false)
        return
      }

      if (!password || password.trim().length === 0) {
        setError('Password is required')
        setIsLoading(false)
        return
      }

      // Attempt login
      const result = await login(email, password)
      
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    }
    setIsLoading(false)
  }

  const useDemoCredentials = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setConfirmPassword('')
    setError('')
    setMessage('')
    setIsSignUp(false)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setMessage('')
    setConfirmPassword('')
  }

  return (
    <div className="inner-page min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center mb-2">
            <AnimatedLogo size="md" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl">{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription className="text-sm sm:text-base">Nuclear Supply Chain Management</CardDescription>
          </div>
        </CardHeader>
        
        {/* Demo Credentials Info - Only show on login */}
        {!isSignUp && (
          <div className="mx-4 mb-4 p-3 sm:p-4 bg-muted rounded-lg border">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Demo Credentials</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                  <span className="font-medium">Email:</span> {DEMO_EMAIL}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  <span className="font-medium">Password:</span> {DEMO_PASSWORD}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full min-h-[44px] touch-manipulation"
                  onClick={useDemoCredentials}
                  type="button"
                >
                  Use Demo Credentials
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isSignUp ? 'At least 6 characters' : ''}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  aria-describedby={error ? "error-message" : undefined}
                />
              </div>
            )}
            {error && (
              <div 
                id="error-message"
                className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md"
                role="alert"
              >
                {error}
              </div>
            )}
            {message && (
              <div 
                className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md"
                role="status"
              >
                {message}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 sm:p-6 pt-2">
            <Button type="submit" className="w-full min-h-[48px] text-base touch-manipulation" disabled={isLoading}>
              {isLoading 
                ? (isSignUp ? 'Creating account...' : 'Signing in...') 
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:underline font-medium"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="inner-page min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <AnimatedLogo size="md" />
            </div>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Nuclear Supply Chain Management</CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
