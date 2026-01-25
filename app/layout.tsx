import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import '../styles/inner-pages.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'NUCLEAR - Nuclear Supply Chain Management',
  description: 'Comprehensive nuclear supply chain management platform for radiopharmaceutical delivery',
  keywords: ['nuclear medicine', 'logistics', 'radiopharmaceutical', 'supply chain', 'compliance'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* NuClear Design System Fonts */}
        {/* Playfair Display - Elegant headings */}
        {/* Plus Jakarta Sans - Modern body text */}
        {/* JetBrains Mono - Technical/monospace display */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
