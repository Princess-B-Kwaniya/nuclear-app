// Dashboard model - Data types for dashboard statistics
export interface DashboardStats {
  activeShipments: StatCard
  pendingRequests: StatCard
  complianceStatus: StatCard
  monthlyTotal: StatCard
}

export interface StatCard {
  label: string
  value: string
  subtext: string
  color: string
  textColor: string
}

export interface Delivery {
  id?: string
  date: string
  time: string
  isotope: string
  destination: string
  status?: 'upcoming' | 'completed'
  scheduled_datetime?: Date
}
