'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedLogo } from '@/components'

// Demo credentials for testing
const DEMO_EMAIL = 'demo@nuclear.app'
const DEMO_PASSWORD = 'demo123456'

export default function LoginPage() {
  const router = useRouter()
  const { login, signUp } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)
    
    if (isSignUp) {
      // Validate password match
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }
      
      // Validate password strength
      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      const result = await signUp(email, password)
      
      if (result.success) {
        if (result.message) {
          setMessage(result.message)
          setIsSignUp(false) // Switch to login view
        } else {
          router.push('/dashboard')
        }
      } else {
        setError(result.error || 'Sign up failed')
      }
    } else {
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
                className="min-h-[44px] touch-manipulation text-base"
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
                className="min-h-[44px] touch-manipulation text-base"
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
                  className="min-h-[44px] touch-manipulation text-base"
                />
              </div>
            )}
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            {message && <p className="text-sm text-green-600 font-medium">{message}</p>}
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
                className="text-primary hover:underline font-medium min-h-[32px] touch-manipulation"
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
