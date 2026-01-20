import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// 1. Load Environment Variables
console.log('Loading environment variables...')
try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8')
        envConfig.split('\n').forEach(line => {
            const parts = line.split('=')
            if (parts.length >= 2) {
                const key = parts[0].trim()
                const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '') // remove quotes
                process.env[key] = value
            }
        })
    }
} catch (e) {
    console.log('Warning: Could not read .env.local directly')
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Error: Missing Supabase Environment Variables!')
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function createTestUser() {
    const email = 'admin@nuclearflow.com'
    const password = 'nuclear-password-2024'

    console.log(`\nAttempting to create test user:`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Test Administrator',
                role: 'Hospital Administrator',
                initials: 'TA'
            }
        }
    })

    if (error) {
        console.error('\n❌ Sign Up Failed:')
        console.error(error.message)
        if (error.message.includes('already registered')) {
            console.log('\n✅ Good news: usage already exists. You can try logging in with these credentials.')
        }
        return
    }

    if (data.user) {
        console.log('\n✅ Sign Up Successful!')
        console.log(`User ID: ${data.user.id}`)

        if (data.user.identities && data.user.identities.length === 0) {
            console.log('⚠️  User created but identity missing (Auth issue?)')
        } else if (!data.user.confirmed_at) {
            console.log('\n⚠️  ACTION REQUIRED: Email Confirmation')
            console.log('A confirmation email has been sent to ' + email)
            console.log('Please check your email (or use Supabase Dashboard > Users to confirm manually).')
        } else {
            console.log('\n✅ User is auto-confirmed! You can login immediately.')
        }
    }
}

createTestUser()
