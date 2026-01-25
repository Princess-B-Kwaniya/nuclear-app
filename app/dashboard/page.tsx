import {
  ArrowRight
} from 'lucide-react'
import {
  getDashboardStats,
  getRecentActivity,
  getUpcomingDeliveries,
  getCompletedDeliveries,
  getComplianceAlerts,
  getActiveShipments
} from '@/lib/api'
import DashboardGreeting from '@/components/DashboardGreeting'
import UpcomingDeliveries from '@/components/shared/UpcomingDeliveries'
import RecentActivity from '@/components/shared/RecentActivity'
import { LiveTrackingMap } from '@/components/dashboard'
import { 
  MobileOnly, 
  DesktopOnly, 
  MobileTableCard, 
  MobileTableCardRow 
} from '@/components/responsive'

export default async function DashboardPage() {

  // MOCK DATA FOR DASHBOARD
  const recentActivity = [
    { id: 1, event: 'Shipment SH-2851 dispatched from Johannesburg', time: '5 min ago' },
    { id: 2, event: 'Compliance alert issued for SH-2850', time: '30 min ago' },
    { id: 3, event: 'New procurement request submitted', time: '1 hour ago' },
    { id: 4, event: 'Delivery completed for SH-2849', time: '2 hours ago' },
    { id: 5, event: 'Quote received for PR-2847', time: '3 hours ago' },
  ];

  const activeShipments = [
    { id: 'SH-2851', isotope: 'Tc-99m', origin: 'Johannesburg', destination: 'Cape Town', status: 'In Transit', eta: '2 hours' },
    { id: 'SH-2850', isotope: 'F-18', origin: 'Nairobi', destination: 'Mombasa', status: 'At Customs', eta: '4 hours' },
    { id: 'SH-2849', isotope: 'I-131', origin: 'Lagos', destination: 'Accra', status: 'Dispatched', eta: '6 hours' },
    { id: 'SH-2848', isotope: 'FDG', origin: 'Durban', destination: 'Pretoria', status: 'In Transit', eta: '3 hours' },
    { id: 'SH-2847', isotope: 'Tc-99m', origin: 'Gaborone', destination: 'Windhoek', status: 'Delivered', eta: 'Delivered' },
  ];

  const complianceAlerts = [
    { id: 1, title: 'Missing Certificate', description: 'Shipment SH-2850 is missing a compliance certificate.', severity: 'warning' },
  ];

  const upcomingDeliveries = [
    { id: 'DEL-1001', date: '2026-01-21', time: '09:00', isotope: 'Tc-99m', destination: 'Cape Town', status: 'upcoming' as const },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 text-blue-700'
      case 'At Customs':
        return 'bg-amber-100 text-amber-700'
      case 'Dispatched':
        return 'bg-green-100 text-green-700'
      case 'Delivered':
        return 'bg-gray-100 text-gray-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Banner + Quick Actions */}
      <DashboardGreeting />

      {/* Live Shipment Map + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
        {/* Live Shipment Map */}
        <div className="lg:col-span-3 dashboard-card p-4 sm:p-6 border">
          <h3 className="dashboard-title text-lg sm:text-xl mb-4">Live Shipment Tracking</h3>
          <div className="h-64 sm:h-80 lg:h-96">
            <LiveTrackingMap />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 dashboard-card p-4 sm:p-6 border">
          <h3 className="dashboard-title text-lg sm:text-xl mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--color-text-main)' }}>{activity.event}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{activity.time}</p>
                </div>
              </div>
            ))}
            {/* Show more button on mobile */}
            <button type="button" className="md:hidden w-full text-center text-sm py-2 transition-colors" style={{ color: 'var(--color-primary)' }}>
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Active Shipments Table Preview */}
      <div className="dashboard-card border">
        <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="dashboard-title text-lg sm:text-xl">Active Shipments</h3>
          <button className="flex items-center gap-1 text-sm self-start sm:self-auto transition-colors" style={{ color: 'var(--color-primary)' }}>
            View All Shipments
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Desktop Table View */}
        <DesktopOnly>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b" style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs uppercase tracking-wider font-sans" style={{ color: 'var(--color-text-muted)' }}>ID</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs uppercase tracking-wider font-sans" style={{ color: 'var(--color-text-muted)' }}>Isotope</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs uppercase tracking-wider font-sans" style={{ color: 'var(--color-text-muted)' }}>Route</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs uppercase tracking-wider font-sans" style={{ color: 'var(--color-text-muted)' }}>Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs uppercase tracking-wider font-sans" style={{ color: 'var(--color-text-muted)' }}>ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: 'var(--color-bg-white)', borderColor: 'var(--color-border)' }}>
                {activeShipments.slice(0, 5).map((shipment) => (
                  <tr key={shipment.id} className="dashboard-table-row">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-mono" style={{ color: 'var(--color-text-main)' }}>{shipment.id}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm" style={{ color: 'var(--color-text-main)' }}>{shipment.isotope}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm" style={{ color: 'var(--color-text-main)' }}>
                      {shipment.origin} → {shipment.destination}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm" style={{ color: 'var(--color-text-main)' }}>{shipment.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DesktopOnly>

        {/* Mobile Card View */}
        <MobileOnly>
          <div className="p-4 space-y-3">
            {activeShipments.slice(0, 5).map((shipment) => (
              <MobileTableCard key={shipment.id}>
                <MobileTableCardRow 
                  label="ID" 
                  value={<span className="font-mono text-xs">{shipment.id}</span>} 
                />
                <MobileTableCardRow 
                  label="Isotope" 
                  value={shipment.isotope} 
                />
                <MobileTableCardRow 
                  label="Route" 
                  value={
                    <span className="text-xs">
                      {shipment.origin} → {shipment.destination}
                    </span>
                  } 
                />
                <MobileTableCardRow 
                  label="Status" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  } 
                />
                <MobileTableCardRow 
                  label="ETA" 
                  value={shipment.eta} 
                />
              </MobileTableCard>
            ))}
          </div>
        </MobileOnly>
      </div>

      {/* Compliance Alerts + Upcoming Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Compliance Alerts */}
        <div className="dashboard-card p-4 sm:p-6 border">
          <h3 className="dashboard-title text-lg sm:text-xl mb-4">Compliance Alerts</h3>
          <div className="space-y-3">
            {complianceAlerts.length > 0 ? (
              complianceAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${alert.severity === 'warning'
                      ? 'bg-amber-50 border-amber-200'
                      : alert.severity === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${alert.severity === 'warning'
                      ? 'bg-amber-600'
                      : alert.severity === 'error'
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                    }`}></div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-main)' }}>{alert.title}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{alert.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-success-bg)', borderColor: 'var(--color-success)', border: '1px solid' }}>
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-success)' }}></div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-text-main)' }}>All Clear</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>No compliance issues at this time</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deliveries */}
        <UpcomingDeliveries 
          initialDeliveries={upcomingDeliveries}
        />
      </div>
    </div>
  )
}
