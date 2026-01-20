'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutGrid, 
  ShoppingCart, 
  Truck, 
  Shield, 
  Link2, 
  BarChart3, 
  Settings, 
  Search, 
  ChevronLeft,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import type { NavigationItem, DashboardPage } from '@/models'
import { useAuth } from '@/contexts'
import { ProtectedRoute, NotificationsDropdown, SupportDropdown } from '@/components/shared'
import { AnimatedLogo } from '@/components'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { id: 'procurement', label: 'Procurement', icon: ShoppingCart, href: '/dashboard/procurement' },
  { id: 'shipments', label: 'Shipments', icon: Truck, href: '/dashboard/shipments' },
  { id: 'compliance', label: 'Compliance', icon: Shield, href: '/dashboard/compliance' },
  { id: 'traceability', label: 'Traceability', icon: Link2, href: '/dashboard/traceability' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  // Mobile menu handlers
  const openMobileMenu = () => setMobileMenuOpen(true)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)
  const toggleSearch = () => setSearchOpen(!searchOpen)
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    if (query?.trim()) {
      // TODO: Implement full search functionality with backend API
      // This should search across shipments, procurement, and compliance data
      console.log('Searching for:', query)
    }
  }
  const handleMobileSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(e)
    toggleSearch()
  }
  const handleNavigateToSettings = () => {
    router.push('/dashboard/settings')
  }
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Determine current page from pathname
  const getCurrentPage = (): DashboardPage => {
    if (pathname === '/dashboard') return 'dashboard'
    const segment = pathname.split('/').pop()
    if (segment && ['procurement', 'shipments', 'compliance', 'traceability', 'reports', 'settings'].includes(segment)) {
      return segment as DashboardPage
    }
    return 'dashboard'
  }

  const currentPage = getCurrentPage()

  const getPageTitle = (): string => {
    if (currentPage === 'dashboard') return 'Dashboard'
    return currentPage.charAt(0).toUpperCase() + currentPage.slice(1)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Get user display info
  const userInitials = user?.initials || 'U'
  const userName = user?.name || 'User'
  const userRole = user?.role || 'Guest'

  return (
    <ProtectedRoute>
      <div className="inner-page flex h-screen overflow-hidden">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`${
            sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-[280px]'
          } w-[280px] max-w-[85vw] bg-card border-r flex flex-col transition-all duration-300 ease-out
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          safe-area-inset-top safe-area-inset-bottom safe-area-inset-left
          `}
          style={{ borderColor: 'var(--border)' }}
          role="navigation"
          aria-label="Main navigation"
        >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 sm:px-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {sidebarCollapsed ? (
              <Link href="/" className="text-2xl flex items-center justify-center p-1 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md" aria-label="Go to home">
                <div className="w-6 h-6 text-black">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)" />
                    <circle cx="22" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="6.5" cy="3.4" r="1.5" fill="currentColor" />
                    <circle cx="6.5" cy="20.6" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </Link>
            ) : (
              <Link href="/" className="block">
                <AnimatedLogo size="sm" />
              </Link>
            )}
          </div>
          {/* Close button for mobile - only visible when menu is open */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 sm:py-6 px-2 sm:px-3 overflow-y-auto touch-scroll">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative touch-manipulation min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground hover:bg-muted active:bg-muted'
                    }`}
                    style={isActive ? { backgroundColor: 'rgba(21, 48, 87, 0.08)' } : {}}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r" style={{ backgroundColor: 'var(--primary)' }}></div>
                    )}
                    <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Settings & User Profile */}
        <div className="border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/dashboard/settings"
            onClick={closeMobileMenu}
            className={`w-full flex items-center gap-3 px-4 sm:px-6 py-4 transition-all touch-manipulation min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
              currentPage === 'settings'
                ? 'text-primary'
                : 'text-foreground hover:bg-muted active:bg-muted'
            }`}
            style={currentPage === 'settings' ? { backgroundColor: 'rgba(21, 48, 87, 0.08)' } : {}}
            aria-current={currentPage === 'settings' ? 'page' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>

          {!sidebarCollapsed && (
            <div className="p-3 sm:p-4 border-t safe-area-inset-bottom" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--accent))' }}>
                  {userInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate font-medium" style={{ color: 'var(--foreground)' }}>{userName}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{userRole}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors touch-manipulation min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted active:bg-muted"
                style={{ color: 'var(--foreground)' }}
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Collapse Toggle - Hidden on mobile */}
        <button
          onClick={toggleSidebarCollapse}
          className="hidden lg:flex absolute top-20 -right-3 w-6 h-6 bg-card border rounded-full items-center justify-center transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted"
          style={{ borderColor: 'var(--border)' }}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 sm:h-16 bg-card border-b flex items-center justify-between px-3 sm:px-4 lg:px-8 flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          {/* Mobile Menu Button & Page Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-initial">
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted active:bg-muted"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-sidebar"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <h1 className="font-heading text-base sm:text-lg lg:text-2xl font-semibold capitalize truncate" style={{ color: 'var(--primary)' }}>{getPageTitle()}</h1>
          </div>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} aria-hidden="true" />
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 min-h-[44px] bg-background"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Search button for mobile */}
            <button 
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted active:bg-muted"
              aria-label="Search"
            >
              <Search className="w-5 h-5" style={{ color: 'var(--foreground)' }} aria-hidden="true" />
            </button>
            <NotificationsDropdown />
            <SupportDropdown />
            <button 
              onClick={handleNavigateToSettings}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--accent))' }}
              aria-label={`User menu for ${userName}`}
            >
              {userInitials}
            </button>
          </div>
        </header>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background p-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
              <form onSubmit={handleMobileSearchSubmit} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-background text-foreground"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-auto touch-scroll" style={{ backgroundColor: 'var(--background)' }}>
          <div className="w-full p-3 sm:p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      </div>
    </ProtectedRoute>
  )
}
