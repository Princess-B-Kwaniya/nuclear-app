'use client';

import { useEffect, useState } from 'react';

export interface AnimatedLogoProps {
  /**
   * Size variant for the logo
   * - sm: Small (mobile-friendly)
   * - md: Medium (default)
   * - lg: Large (hero sections)
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Custom className for additional styling
   */
  className?: string;
  /**
   * Optional click handler for making logo clickable
   */
  onClick?: () => void;
}

export function AnimatedLogo({ size = 'md', className = '', onClick }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const text = 'NuClear';
  const letters = text.split('');

  useEffect(() => {
    // Reset animation on mount or navigation
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Size classes
  const sizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl',
  };

  const WrapperTag = onClick ? 'button' : 'div';
  const wrapperProps = onClick
    ? {
        onClick,
        className: `flex items-center gap-2 ${sizeClasses[size]} ${className} cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md`,
      }
    : {
        className: `flex items-center gap-2 ${sizeClasses[size]} ${className}`,
      };

  return (
    <WrapperTag {...wrapperProps}>
      <span className="font-semibold flex tracking-tight" aria-label="NuClear">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`inline-block ${
              isAnimating ? 'animate-letter-reveal' : ''
            }`}
            style={{
              // Right-to-left stagger: last letter animates first
              animationDelay: `${(letters.length - 1 - index) * 100}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>

      <style jsx>{`
        @keyframes letterReveal {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInSymbol {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-letter-reveal {
          animation: letterReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .animate-fade-in-symbol {
          animation: fadeInSymbol 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Respect user preference for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-letter-reveal,
          .animate-fade-in-symbol {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </WrapperTag>
  );
}
