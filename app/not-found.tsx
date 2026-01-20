import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { AnimatedLogo } from '@/components';

export default function NotFound() {
  return (
    <div className="inner-page min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: '#153057' }}></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: '#c69c6d' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: '#bec1c4' }}></div>

      <div className="text-center relative z-10 px-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <AnimatedLogo size="md" />
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold" style={{ color: '#153057' }}>
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#153057' }}>
          Page Not Found
        </h2>
        <p className="text-xl mb-8 max-w-md mx-auto" style={{ color: 'rgba(21, 48, 87, 0.7)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/"
            className="btn-secondary flex items-center justify-center gap-2 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Safety
          </Link>
        </div>
      </div>
    </div>
  );
}
