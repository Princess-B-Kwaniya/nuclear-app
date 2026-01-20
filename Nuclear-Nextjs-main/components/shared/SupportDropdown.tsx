'use client';

import { HelpCircle, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function SupportDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const supportContacts = [
    {
      icon: Mail,
      label: 'Email Support',
      value: 'support@nuclear.app',
      action: () => window.location.href = 'mailto:support@nuclear.app',
    },
    {
      icon: Phone,
      label: 'Phone Support',
      value: '+27 (0) 21 123 4567',
      action: () => window.location.href = 'tel:+27211234567',
    },
    {
      icon: MessageSquare,
      label: 'Live Chat',
      value: 'Available 24/7',
      action: () => {
        // Placeholder for live chat integration
        alert('Live chat feature coming soon!');
      },
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Help and Support"
      >
        <HelpCircle className="w-5 h-5 text-gray-600" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Support & Help</h3>
            <p className="text-xs text-gray-600 mt-1">
              We're here to help you 24/7
            </p>
          </div>

          {/* Support Options */}
          <div className="p-2">
            {supportContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    contact.action();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {contact.label}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {contact.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">Emergency Contact</p>
              <p>For urgent radiation safety concerns:</p>
              <p className="text-red-600 font-semibold mt-1">+27 (0) 21 999 8888</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
