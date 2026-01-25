import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for browser-side operations
 * 
 * This function validates environment variables and creates a properly configured
 * Supabase client. If environment variables are missing (e.g., during build time),
 * it returns a placeholder client to prevent build failures.
 * 
 * @returns A configured Supabase client instance
 * @throws {Error} In development mode if environment variables are missing
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if we're missing environment variables
  const isMissingConfig = !supabaseUrl || !supabaseAnonKey || 
    supabaseUrl.includes('placeholder') || 
    supabaseAnonKey.includes('placeholder')

  if (isMissingConfig) {
    // In development, warn the developer
    if (process.env.NODE_ENV === 'development') {
      console.error(
        '🚨 Supabase Configuration Error:\n' +
        'Missing or invalid Supabase environment variables.\n' +
        'Please set the following in your .env.local file:\n' +
        '  - NEXT_PUBLIC_SUPABASE_URL\n' +
        '  - NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
        'See SUPABASE_SETUP.md for detailed setup instructions.'
      )
    }

    // Return a placeholder client for build time
    // This allows the build to succeed even without credentials
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    )
  }

  // Create and return the real Supabase client
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
