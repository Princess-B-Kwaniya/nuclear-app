import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Auth callback route handler
 * 
 * This route handles the OAuth callback from Supabase after email confirmation
 * or other authentication flows. It exchanges the authorization code for a session
 * and redirects the user appropriately.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors from Supabase
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    
    // Provide user-friendly error messages
    let errorMessage = 'auth_callback_error'
    
    if (error === 'access_denied') {
      errorMessage = 'access_denied'
    } else if (errorDescription?.includes('expired')) {
      errorMessage = 'link_expired'
    }
    
    return NextResponse.redirect(`${origin}/login?error=${errorMessage}`)
  }

  // If no code is provided, redirect to login
  if (!code) {
    console.warn('Auth callback called without code parameter')
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  try {
    const supabase = await createClient()
    
    // Exchange the authorization code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      
      // Handle specific error types
      if (exchangeError.message.includes('expired')) {
        return NextResponse.redirect(`${origin}/login?error=link_expired`)
      }
      
      if (exchangeError.message.includes('invalid')) {
        return NextResponse.redirect(`${origin}/login?error=invalid_link`)
      }
      
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
    }

    // Verify we got a valid session
    if (!data?.session) {
      console.warn('Code exchange succeeded but no session returned')
      return NextResponse.redirect(`${origin}/login?error=no_session`)
    }

    // Log successful authentication (for monitoring)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Auth callback successful for user:', data.user?.email)
    }

    // Redirect to the requested page or dashboard
    return NextResponse.redirect(`${origin}${next}`)
    
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/login?error=unexpected_error`)
  }
}
