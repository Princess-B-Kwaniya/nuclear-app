# Supabase Setup Guide for Nuclear App

This guide will walk you through setting up Supabase authentication for the Nuclear Supply Chain Management application.

## Prerequisites

- A Supabase account (create one at [https://supabase.com](https://supabase.com))
- Node.js 20.9.0 or higher
- Basic knowledge of environment variables

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click on "New Project"
3. Fill in the project details:
   - **Project name**: nuclear-app (or your preferred name)
   - **Database password**: Choose a strong password
   - **Region**: Select the region closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (this can take a few minutes)

## Step 2: Get Your Project Credentials

1. Once your project is ready, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Copy these values - you'll need them in the next step

## Step 3: Configure Environment Variables

1. In the root of your project, create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Configure Authentication Settings

### Email Authentication Setup

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Ensure "Email" provider is enabled
3. Configure email settings:
   - **Enable email confirmations**: Toggle based on your needs (see below)
   - **Secure email change**: Enabled (recommended)
   - **Secure password change**: Enabled (recommended)

### Email Confirmation Options

You have two options for email confirmation:

#### Option A: Disable Email Confirmation (Recommended for Development)

1. Go to **Authentication** → **Providers** → **Email**
2. **Disable** "Enable email confirmations"
3. This allows users to sign up and log in immediately without email verification
4. ⚠️ **Not recommended for production environments**

#### Option B: Enable Email Confirmation (Recommended for Production)

1. Go to **Authentication** → **Providers** → **Email**
2. **Enable** "Enable email confirmations"
3. Configure the email template (see Email Templates section below)
4. Users will need to click a confirmation link in their email before they can log in

### Site URL Configuration

1. Go to **Authentication** → **URL Configuration**
2. Set your **Site URL**:
   - For local development: `http://localhost:3000`
   - For production: Your actual domain (e.g., `https://nuclear-app.com`)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (for local development)
   - `https://your-domain.com/auth/callback` (for production)

## Step 5: Configure Email Templates (Optional)

If you enabled email confirmations, you can customize the email templates:

1. Go to **Authentication** → **Email Templates**
2. Select "Confirm signup"
3. Customize the template:
   ```html
   <h2>Welcome to Nuclear App!</h2>
   <p>Click the link below to confirm your account:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
   ```

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Try creating a new account:
   - Enter a valid email and password
   - Click "Create Account"
   - If email confirmation is disabled, you should be logged in immediately
   - If email confirmation is enabled, check your email for a confirmation link

## Demo Mode

The app supports demo credentials that work without Supabase:
- **Email**: demo@nuclear.app
- **Password**: demo123456

These credentials are useful for:
- Quick demonstrations
- Testing without setting up Supabase
- Offline development

## Troubleshooting

### Issue: "Supabase environment variables are not set"

**Solution**: Make sure you've created `.env.local` with the correct credentials. Restart your development server after creating the file.

### Issue: "Invalid login credentials" after signup

**Possible causes**:
1. Email confirmation is enabled, and you haven't confirmed your email yet
2. Check your spam folder for the confirmation email
3. Verify your Supabase credentials are correct

**Solution**: 
- Disable email confirmation for testing (see Step 4)
- Or check your email and click the confirmation link

### Issue: "An account with this email already exists"

**Solution**: This email is already registered. Try:
1. Logging in with the existing account
2. Using the password reset feature
3. Using a different email address

### Issue: Signup works but email is never received

**Possible causes**:
1. Email confirmation is enabled but emails aren't being sent
2. Supabase has restrictions on email sending in the free tier

**Solution**:
1. Check Supabase dashboard → **Authentication** → **Logs** for email sending errors
2. For production, configure a custom SMTP server:
   - Go to **Settings** → **Auth** → **SMTP Settings**
   - Configure your email provider (SendGrid, Mailgun, etc.)
3. For development, disable email confirmation (see Step 4)

### Issue: "Auth callback error" after clicking confirmation link

**Possible causes**:
1. The redirect URL is not configured correctly
2. The confirmation link has expired (they expire after 24 hours)

**Solution**:
1. Verify redirect URLs in Supabase dashboard (see Step 4)
2. Request a new confirmation email
3. Disable email confirmation for testing

### Issue: Console shows errors about placeholder Supabase client

**Solution**: Your environment variables are not being loaded. Make sure:
1. `.env.local` exists in the root directory
2. Variable names are correct: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. You've restarted the development server after creating `.env.local`

## Security Best Practices

### For Development:
- ✅ Use `.env.local` for local credentials
- ✅ Never commit `.env.local` to version control
- ✅ Disable email confirmation for faster testing
- ✅ Use demo credentials when demonstrating features

### For Production:
- ✅ Enable email confirmation
- ✅ Configure custom SMTP for reliable email delivery
- ✅ Enable RLS (Row Level Security) policies in Supabase
- ✅ Set up rate limiting for authentication endpoints
- ✅ Configure proper redirect URLs
- ✅ Use strong password requirements
- ✅ Enable MFA (Multi-Factor Authentication) if needed
- ✅ Monitor authentication logs regularly

## Additional Configuration

### Password Requirements

By default, Supabase requires:
- Minimum 6 characters

You can customize this in **Authentication** → **Policies**.

### Rate Limiting

Supabase has built-in rate limiting for authentication. For custom rate limiting:
1. Go to **Authentication** → **Rate Limits**
2. Adjust limits based on your needs
3. For production, consider implementing additional rate limiting at the application level

### Social Authentication (Optional)

To enable Google, GitHub, or other OAuth providers:

1. Go to **Authentication** → **Providers**
2. Enable the provider (e.g., Google, GitHub)
3. Follow the provider-specific setup instructions
4. Add OAuth credentials from the provider
5. Update your app to use the provider (see component documentation)

## Next Steps

After setting up Supabase:

1. ✅ Test the signup flow with a real email
2. ✅ Test the login flow
3. ✅ Test the password reset flow
4. ✅ Configure RLS policies for your data tables
5. ✅ Set up monitoring and alerts
6. ✅ Review and adjust security settings

## Support and Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Nuclear App Repository Issues](https://github.com/scaleaiforafrica/nuclear-app/issues)

## Common Supabase Dashboard Locations

For quick reference:

- **API Keys**: Settings → API
- **Auth Settings**: Authentication → Settings
- **Email Templates**: Authentication → Email Templates
- **URL Configuration**: Authentication → URL Configuration
- **Auth Logs**: Authentication → Logs
- **Rate Limits**: Authentication → Rate Limits
- **Providers**: Authentication → Providers

---

**Last Updated**: January 2026

**Questions or Issues?** Please open an issue on our [GitHub repository](https://github.com/scaleaiforafrica/nuclear-app/issues).
