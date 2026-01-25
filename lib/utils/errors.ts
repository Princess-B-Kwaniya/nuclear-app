/**
 * Custom error classes for the Nuclear application
 */

/**
 * Base error class for authentication errors
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode: number = 400
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

/**
 * Error thrown when environment variables are missing or invalid
 */
export class ConfigurationError extends Error {
  constructor(
    message: string,
    public missingVars?: string[]
  ) {
    super(message)
    this.name = 'ConfigurationError'
  }
}

/**
 * Error thrown when user input validation fails
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Error thrown when email confirmation is required
 */
export class EmailConfirmationRequiredError extends AuthError {
  constructor(message: string = 'Please check your email to confirm your account.') {
    super(message, 'email_confirmation_required', 200)
    this.name = 'EmailConfirmationRequiredError'
  }
}

/**
 * Error thrown when an account already exists
 */
export class AccountExistsError extends AuthError {
  constructor(message: string = 'An account with this email already exists.') {
    super(message, 'account_exists', 409)
    this.name = 'AccountExistsError'
  }
}

/**
 * Sanitizes error messages to avoid leaking sensitive information
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    return error.message
  }
  
  if (error instanceof Error) {
    // Known Supabase error messages that are safe to show
    const safeMessages = [
      'invalid login credentials',
      'email not confirmed',
      'user already registered',
      'password should be at least',
      'invalid email',
      'email rate limit exceeded',
    ]
    
    const lowerMessage = error.message.toLowerCase()
    if (safeMessages.some(msg => lowerMessage.includes(msg))) {
      return error.message
    }
  }
  
  // Return a generic error message for unknown errors
  return 'An unexpected error occurred. Please try again.'
}

/**
 * Checks if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('network') ||
      error.message.includes('fetch') ||
      error.message.includes('timeout') ||
      error.message.toLowerCase().includes('failed to fetch')
    )
  }
  return false
}

/**
 * Error message mapping for auth callback URL parameters
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth_callback_error': 'Authentication failed. Please try again.',
  'access_denied': 'Access was denied. Please try signing up again.',
  'link_expired': 'This link has expired. Please request a new one.',
  'missing_code': 'Invalid authentication link. Please try again.',
  'invalid_link': 'Invalid or expired authentication link.',
  'no_session': 'Could not create session. Please try logging in.',
  'unexpected_error': 'An unexpected error occurred. Please try again.',
}
