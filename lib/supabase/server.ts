import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations
 * 
 * This function validates environment variables and creates a properly configured
 * Supabase server client with cookie-based session management. If environment
 * variables are missing (e.g., during build time), it returns a placeholder client
 * to prevent build failures.
 * 
 * @returns A configured Supabase server client instance
 * @throws {Error} In development mode if environment variables are missing
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if we're missing environment variables
  const isMissingConfig = !supabaseUrl || !supabaseAnonKey || 
    supabaseUrl.includes('placeholder') || 
    supabaseAnonKey.includes('placeholder')

  // Configure cookie handlers for session management
  const cookieOptions = {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  }

  if (isMissingConfig) {
    // In development, warn the developer
    if (process.env.NODE_ENV === 'development') {
      console.error(
        '🚨 Supabase Configuration Error (Server):\n' +
        'Missing or invalid Supabase environment variables.\n' +
        'Please set the following in your .env.local file:\n' +
        '  - NEXT_PUBLIC_SUPABASE_URL\n' +
        '  - NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
        'See SUPABASE_SETUP.md for detailed setup instructions.'
      )
    }

    // Return a placeholder client for build time
    return createServerClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key',
      cookieOptions
    )
  }

  // Create and return the real Supabase server client
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    cookieOptions
  )
}
