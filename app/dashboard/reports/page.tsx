'use client';

import { useState } from 'react';
import { subDays } from 'date-fns';
import { TrendingUp, Download, FileText, Loader2 } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const REPORT_GENERATION_DELAY_MS = 1500;
const EXPORT_DELAY_MS = 1000;

// Demo data for charts
const shipmentStatusData = [
  { name: 'Delivered', value: 85, count: 120 },
  { name: 'In Transit', value: 65, count: 92 },
  { name: 'At Customs', value: 35, count: 49 },
  { name: 'Dispatched', value: 45, count: 64 },
];

const isotopeDistributionData = [
  { name: 'Tc-99m', value: 42, color: '#7C3AED' },
  { name: 'F-18 FDG', value: 28, color: '#3B82F6' },
  { name: 'I-131', value: 18, color: '#10B981' },
  { name: 'Lu-177', value: 12, color: '#F59E0B' },
];

// Generate activity trends data with fixed values for consistency
const activityTrendsData = [
  { day: 1, shipments: 45 }, { day: 2, shipments: 52 }, { day: 3, shipments: 61 },
  { day: 4, shipments: 58 }, { day: 5, shipments: 72 }, { day: 6, shipments: 68 },
  { day: 7, shipments: 75 }, { day: 8, shipments: 82 }, { day: 9, shipments: 79 },
  { day: 10, shipments: 88 }, { day: 11, shipments: 85 }, { day: 12, shipments: 91 },
  { day: 13, shipments: 87 }, { day: 14, shipments: 94 }, { day: 15, shipments: 89 },
  { day: 16, shipments: 96 }, { day: 17, shipments: 92 }, { day: 18, shipments: 85 },
  { day: 19, shipments: 78 }, { day: 20, shipments: 82 }, { day: 21, shipments: 76 },
  { day: 22, shipments: 81 }, { day: 23, shipments: 74 }, { day: 24, shipments: 79 },
  { day: 25, shipments: 83 }, { day: 26, shipments: 88 }, { day: 27, shipments: 92 },
  { day: 28, shipments: 86 }, { day: 29, shipments: 90 }, { day: 30, shipments: 95 },
];


export default function ReportsPage() {
  const [reportType, setReportType] = useState('Shipment Performance');
  const [timePeriod, setTimePeriod] = useState('Last 7 Days');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Handle time period change
  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
    
    const today = new Date();
    
    if (value === 'Last 7 Days') {
      setStartDate(subDays(today, 7));
      setEndDate(today);
    } else if (value === 'Last 30 Days') {
      setStartDate(subDays(today, 30));
      setEndDate(today);
    } else if (value === 'Last 90 Days') {
      setStartDate(subDays(today, 90));
      setEndDate(today);
    } else if (value === 'Custom Range') {
      // Don't auto-set dates for custom range
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  // Handle start date change with validation
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    
    // If end date exists and is before new start date, clear end date
    if (date && endDate && endDate < date) {
      setEndDate(undefined);
      toast.error('End date cannot be before start date');
    }
  };

  // Handle end date change with validation
  const handleEndDateChange = (date: Date | undefined) => {
    if (date && startDate && date < startDate) {
      toast.error('End date cannot be before start date');
      return;
    }
    setEndDate(date);
  };

  // Check if generate button should be disabled
  const isGenerateDisabled = !reportType || !timePeriod || !startDate || !endDate;

  // Handle generate report
  const handleGenerateReport = async () => {
    if (isGenerateDisabled) return;
    
    setIsLoading(true);
    
    // Mock delay for report generation
    await new Promise(resolve => setTimeout(resolve, REPORT_GENERATION_DELAY_MS));
    
    setIsLoading(false);
    toast.success('Report generated successfully!');
  };

  // Handle export report
  const handleExportReport = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select date range before exporting');
      return;
    }
    
    setIsExporting(true);
    
    // Mock export delay
    await new Promise(resolve => setTimeout(resolve, EXPORT_DELAY_MS));
    
    setIsExporting(false);
    toast.success('Report exported successfully!');
  };

  // Check if date pickers should be enabled
  const isDatePickerEnabled = timePeriod === 'Custom Range';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 opacity-60 pointer-events-none select-none">
        <h2 className="dashboard-title text-xl sm:text-2xl">Reports & Analytics</h2>
        <button 
          className="px-4 py-2 flex items-center justify-center gap-2 self-start text-sm"
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-muted)',
            borderRadius: 'var(--radius-md)'
          }}
          disabled
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Report Filters */}
      <div className="dashboard-card p-4 sm:p-6 border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-2" style={{ color: 'var(--color-text-main)' }}>Report Type</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none focus:ring-2"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-white)',
                color: 'var(--color-text-main)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <option>Shipment Performance</option>
              <option>Compliance Overview</option>
              <option>Financial Summary</option>
              <option>Activity Decay Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">Time Period</label>
            <select 
              value={timePeriod}
              onChange={(e) => handleTimePeriodChange(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-input-background text-foreground"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">Start Date</label>
            <DatePicker 
              date={startDate}
              onDateChange={handleStartDateChange}
              disabled={!isDatePickerEnabled}
              placeholder="Pick a date"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">End Date</label>
            <DatePicker 
              date={endDate}
              onDateChange={handleEndDateChange}
              disabled={!isDatePickerEnabled}
              placeholder="Pick a date"
            />
          </div>
        </div>
        
        {/* Generate Report Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerateDisabled || isLoading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {[
          { label: 'Total Shipments', value: '142', change: '+12%', color: 'blue' },
          { label: 'On-Time Delivery', value: '98.7%', change: '+2.3%', color: 'green' },
          { label: 'Avg Transit Time', value: '18.5h', change: '-1.2h', color: 'purple' },
          { label: 'Compliance Rate', value: '100%', change: '0%', color: 'green' },
        ].map((metric, index) => (
          <div key={index} className="bg-card rounded-xl p-4 sm:p-6 border border-border">
            <div className="text-xs sm:text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-2xl sm:text-3xl mb-2">{metric.value}</div>
            <div className={`text-xs sm:text-sm ${metric.change.startsWith('+') ? 'text-green-600' : metric.change.startsWith('-') && metric.label === 'Avg Transit Time' ? 'text-green-600' : 'text-gray-600'} flex items-center gap-1`}>
              <TrendingUp className="w-4 h-4" />
              {metric.change} from last period
            </div>
          </div>
        ))}
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg mb-4">Shipments by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="count" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg mb-4">Isotope Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={isotopeDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={{ stroke: '#6B7280', strokeWidth: 1 }}
              >
                {isotopeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {isotopeDistributionData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-gray-500 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Trends */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
        <h3 className="text-base sm:text-lg mb-4">Shipment Activity Trends (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityTrendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              label={{ value: 'Days', position: 'insideBottom', offset: -5, fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Shipments', angle: -90, position: 'insideLeft', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelFormatter={(value) => `Day ${value}`}
            />
            <Line 
              type="monotone" 
              dataKey="shipments" 
              stroke="#7C3AED" 
              strokeWidth={2}
              dot={{ fill: '#7C3AED', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
