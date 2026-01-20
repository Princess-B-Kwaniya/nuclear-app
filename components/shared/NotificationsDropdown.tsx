'use client';

import { Bell, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Shipment Delayed',
      message: 'SH-2851 is experiencing customs delay',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'success',
      title: 'Delivery Completed',
      message: 'SH-2847 delivered successfully',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Quote Available',
      message: 'PR-2847 has 3 new quotes ready for review',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Compliance Alert',
      message: 'Document expiring in 7 days',
      time: '3 hours ago',
      read: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Package className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    if (read) return 'bg-gray-50';
    switch (type) {
      case 'urgent':
        return 'bg-red-50';
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-amber-50';
      default:
        return 'bg-blue-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell className="w-5 h-5 text-gray-600" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium" aria-hidden="true">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:right-0 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      getNotificationBg(notification.type, notification.read)
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
