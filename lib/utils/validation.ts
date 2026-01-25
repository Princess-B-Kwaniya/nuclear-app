/**
 * Input validation utilities for the Nuclear application
 */

/**
 * Validates email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  return { valid: true }
}

/**
 * Validates password strength
 */
export function validatePassword(password: string): { 
  valid: boolean
  error?: string
  strength?: 'weak' | 'medium' | 'strong'
} {
  if (!password || password.length === 0) {
    return { valid: false, error: 'Password is required' }
  }
  
  if (password.length < 6) {
    return { 
      valid: false, 
      error: 'Password must be at least 6 characters long',
      strength: 'weak'
    }
  }
  
  // Check password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak'
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
    .filter(Boolean).length
  
  if (password.length >= 8 && criteriaCount >= 3) {
    strength = 'strong'
  } else if (password.length >= 6 && criteriaCount >= 2) {
    strength = 'medium'
  }
  
  return { valid: true, strength }
}

/**
 * Validates password confirmation
 */
export function validatePasswordMatch(
  password: string, 
  confirmPassword: string
): { valid: boolean; error?: string } {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' }
  }
  return { valid: true }
}

/**
 * Validates signup form data
 */
export function validateSignupForm(data: {
  email: string
  password: string
  confirmPassword: string
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  
  const emailValidation = validateEmail(data.email)
  if (!emailValidation.valid) {
    errors.email = emailValidation.error!
  }
  
  const passwordValidation = validatePassword(data.password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.error!
  }
  
  const matchValidation = validatePasswordMatch(data.password, data.confirmPassword)
  if (!matchValidation.valid) {
    errors.confirmPassword = matchValidation.error!
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validates login form data
 */
export function validateLoginForm(data: {
  email: string
  password: string
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  
  const emailValidation = validateEmail(data.email)
  if (!emailValidation.valid) {
    errors.email = emailValidation.error!
  }
  
  if (!data.password || data.password.length === 0) {
    errors.password = 'Password is required'
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validates Supabase environment variables
 */
export function validateSupabaseEnv(): { valid: boolean; missing: string[] } {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
  
  const missing = required.filter(varName => {
    const value = process.env[varName]
    return !value || value.trim().length === 0 || value.includes('placeholder')
  })
  
  return {
    valid: missing.length === 0,
    missing
  }
}
