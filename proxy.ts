import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Main proxy for the Nuclear application
 * 
 * This proxy:
 * 1. Validates environment variables on startup (development only)
 * 2. Handles Supabase session management
 * 3. Protects authenticated routes
 * 4. Redirects authenticated users from login page
 */

// Validate environment variables on startup (development only)
if (process.env.NODE_ENV === 'development') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const isMissingConfig = !supabaseUrl || !supabaseAnonKey || 
    supabaseUrl.includes('placeholder') || 
    supabaseAnonKey.includes('placeholder')
  
  if (isMissingConfig) {
    console.warn(
      '\n' +
      '⚠️  Warning: Supabase environment variables are not configured!\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      'The application will run with limited functionality.\n' +
      '\n' +
      'To enable full authentication features:\n' +
      '  1. Copy .env.example to .env.local\n' +
      '  2. Add your Supabase credentials\n' +
      '  3. See SUPABASE_SETUP.md for detailed instructions\n' +
      '\n' +
      'Demo mode is still available with:\n' +
      '  Email: demo@nuclear.app\n' +
      '  Password: demo123456\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    )
  }
}

export async function proxy(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
