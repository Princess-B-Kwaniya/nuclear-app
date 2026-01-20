'use client';

import { List, Map, LayoutGrid, Search, Filter, Download, Phone, MapPin, Clock, Activity } from 'lucide-react';
import { useState } from 'react';
import { MobileOnly, DesktopOnly, MobileTableCard, MobileTableCardRow } from '@/components/responsive';

export default function ShipmentsPage() {
  const [viewType, setViewType] = useState<'list' | 'map' | 'kanban'>('list');
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('tracking');

  const shipments = [
    { 
      id: 'SH-2851', 
      isotope: 'Tc-99m', 
      batch: 'TC-2026-001', 
      origin: 'Johannesburg', 
      destination: 'Cape Town', 
      carrier: 'NucTransport', 
      status: 'In Transit', 
      activity: 85,
      eta: '2 hours',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'SH-2850', 
      isotope: 'F-18 FDG', 
      batch: 'FDG-2026-015', 
      origin: 'Nairobi', 
      destination: 'Mombasa', 
      carrier: 'MedLogistics', 
      status: 'At Customs', 
      activity: 78,
      eta: '4 hours',
      statusColor: 'bg-amber-100 text-amber-700'
    },
    { 
      id: 'SH-2849', 
      isotope: 'I-131', 
      batch: 'I131-2026-008', 
      origin: 'Lagos', 
      destination: 'Accra', 
      carrier: 'AfricaCargo', 
      status: 'In Transit', 
      activity: 92,
      eta: '6 hours',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'SH-2848', 
      isotope: 'Lu-177', 
      batch: 'LU-2026-003', 
      origin: 'Cairo', 
      destination: 'Alexandria', 
      carrier: 'NileExpress', 
      status: 'Dispatched', 
      activity: 98,
      eta: '1 hour',
      statusColor: 'bg-green-100 text-green-700'
    },
  ];

  const trackingEvents = [
    { time: '10:30 AM', location: 'Paarl Checkpoint', status: 'In Transit', completed: true },
    { time: '09:45 AM', location: 'Worcester Junction', status: 'Passed', completed: true },
    { time: '08:30 AM', location: 'N1 Highway Entry', status: 'Departed', completed: true },
    { time: '08:00 AM', location: 'Johannesburg Facility', status: 'Dispatched', completed: true },
    { time: '12:00 PM (Est)', location: 'Cape Town Hospital', status: 'Expected Delivery', completed: false },
  ];


  if (selectedShipment) {
    const shipment = shipments.find(s => s.id === selectedShipment);
    if (!shipment) return null;

    return (
      <div>
        <button 
          onClick={() => setSelectedShipment(null)}
          className="mb-6 text-primary hover:text-primary/90 flex items-center gap-2"
        >
          ← Back to Shipments
        </button>

        {/* Header Section */}
        <div className="bg-card rounded-xl p-4 sm:p-6 border border-border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-mono mb-2 text-foreground">{shipment.id}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <span><strong>Isotope:</strong> {shipment.isotope}</span>
                <span><strong>Batch:</strong> {shipment.batch}</span>
                <span className={`px-3 py-1 rounded-full ${shipment.statusColor} self-start`}>
                  {shipment.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 border border-input rounded-lg hover:bg-muted transition-colors text-sm">
                Re-route
              </button>
              <button className="px-4 py-2 border border-input rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                Contact Carrier
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Documents
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-xl border border-border">
          <div className="border-b border-border px-4 sm:px-6 overflow-x-auto">
            <div className="flex gap-4 sm:gap-6 min-w-max">
              {[
                { id: 'tracking', label: 'Tracking' },
                { id: 'decay', label: 'Decay Curve' },
                { id: 'documents', label: 'Documents' },
                { id: 'sensors', label: 'Sensor Data' },
                { id: 'blockchain', label: 'Blockchain' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'tracking' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map */}
                <div className="bg-gradient-to-br from-blue-50 to-primary/10 rounded-xl h-64 sm:h-80 lg:h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <path 
                        d="M 100,100 L 150,120 L 200,150 L 250,140 L 300,100" 
                        fill="none" 
                        stroke="#7C3AED" 
                        strokeWidth="3"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <MapPin className="w-16 h-16 text-primary" fill="currentColor" />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {trackingEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-4 h-4 rounded-full ${
                            event.completed ? 'bg-green-600' : 'bg-secondary'
                          }`}
                        ></div>
                        {index < trackingEvents.length - 1 && (
                          <div className={`w-0.5 h-full mt-2 ${
                            event.completed ? 'bg-green-600' : 'bg-secondary'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-foreground">{event.status}</span>
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {activeTab === 'decay' && (
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg mb-1">Activity Decay Curve</h3>
                      <p className="text-sm text-gray-600">Real-time activity monitoring</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl text-primary">{shipment.activity}%</div>
                      <div className="text-sm text-gray-600">Current Activity</div>
                    </div>
                  </div>
                  
                  {/* Decay Chart Visualization */}
                  <div className="h-64 flex items-end gap-2">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const height = 100 - (i * 3.5);
                      const isCurrentPosition = i === 8;
                      return (
                        <div key={i} className="flex-1 flex flex-col justify-end relative">
                          <div 
                            className={`${
                              isCurrentPosition ? 'bg-purple-600' : 'bg-blue-400'
                            } rounded-t transition-all hover:opacity-80`}
                            style={{ height: `${height}%` }}
                          ></div>
                          {isCurrentPosition && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                              Current: {shipment.activity}%
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>Dispatch</span>
                    <span>Current Time</span>
                    <span>Delivery</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Initial Activity</div>
                    <div className="text-2xl">500 mCi</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Current Activity</div>
                    <div className="text-2xl text-primary">425 mCi</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Expected at Arrival</div>
                    <div className="text-2xl text-green-600">380 mCi</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                {[
                  { name: 'Certificate of Analysis', status: 'Complete', color: 'text-green-600' },
                  { name: 'Transport Permit', status: 'Complete', color: 'text-green-600' },
                  { name: 'Customs Declaration', status: 'In Progress', color: 'text-amber-600' },
                  { name: 'Insurance Certificate', status: 'Complete', color: 'text-green-600' },
                  { name: 'Radiation Safety Report', status: 'Complete', color: 'text-green-600' },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className={`text-sm ${doc.color}`}>{doc.status}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-input rounded-lg hover:bg-muted transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}


            {activeTab === 'sensors' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">Temperature</h3>
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-4xl mb-2 text-blue-600">2.4°C</div>
                  <div className="text-sm text-green-600 mb-4">Within safe range (0-8°C)</div>
                  <div className="h-32 flex items-end gap-1">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const height = 40 + Math.random() * 30;
                      return (
                        <div key={i} className="flex-1 flex flex-col justify-end">
                          <div 
                            className="bg-blue-400 rounded-t hover:bg-blue-600 transition-colors"
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">Radiation Level</h3>
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-4xl mb-2 text-primary">0.12 mSv</div>
                  <div className="text-sm text-green-600 mb-4">Normal levels</div>
                  <div className="h-32 flex items-end gap-1">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const height = 30 + Math.random() * 20;
                      return (
                        <div key={i} className="flex-1 flex flex-col justify-end">
                          <div 
                            className="bg-purple-400 rounded-t hover:bg-purple-600 transition-colors"
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <div className="space-y-4">
                <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
                  <h3 className="text-lg mb-2">Immutable Event Log</h3>
                  <p className="text-sm text-gray-400">All events are recorded on Hyperledger blockchain</p>
                </div>
                
                {[
                  { event: 'Shipment Created', hash: '0x4f3a...8b2c', time: '08:00 AM', user: 'System' },
                  { event: 'Dispatched from Facility', hash: '0x7d2e...4a1f', time: '08:00 AM', user: 'Warehouse Manager' },
                  { event: 'Loaded on Vehicle', hash: '0x9b1c...6d3e', time: '08:15 AM', user: 'Driver: J. Smith' },
                  { event: 'Temperature Check', hash: '0x2e4f...7c8a', time: '09:30 AM', user: 'IoT Sensor' },
                  { event: 'Checkpoint Passed', hash: '0x5a6b...9d2f', time: '10:30 AM', user: 'Driver: J. Smith' },
                ].map((log, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium mb-1">{log.event}</div>
                        <div className="text-sm text-gray-600">{log.user}</div>
                      </div>
                      <div className="text-sm text-gray-500">{log.time}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{log.hash}</code>
                      <button className="text-sm text-primary hover:text-primary/90">
                        Verify on Chain →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="font-heading text-xl sm:text-2xl text-foreground">Shipments & Logistics</h2>
        <div className="flex items-center gap-2 opacity-60 pointer-events-none select-none">
          <button 
            className={`p-2 rounded-lg transition-colors bg-gray-100 text-gray-400`}
          >
            <List className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded-lg transition-colors bg-gray-100 text-gray-400`}
          >
            <Map className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded-lg transition-colors bg-gray-100 text-gray-400`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mb-6 border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 opacity-60 pointer-events-none select-none">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search shipments..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400"
            disabled
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <select className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400" disabled>
            <option>All Statuses</option>
            <option>Dispatched</option>
            <option>In Transit</option>
            <option>At Customs</option>
            <option>Delivered</option>
          </select>
          <select className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400" disabled>
            <option>All Isotopes</option>
          </select>
          <button className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center gap-2" disabled>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <DesktopOnly>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Shipment ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Isotope</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Batch #</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Carrier</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shipments.map((shipment) => (
                <tr 
                  key={shipment.id} 
                  className={`hover:bg-muted transition-colors cursor-pointer ${shipment.id === 'SH-2851' ? 'opacity-60 pointer-events-none select-none bg-gray-100' : ''}`}
                  onClick={shipment.id === 'SH-2851' ? undefined : () => setSelectedShipment(shipment.id)}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-mono text-primary">
                    {shipment.id}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{shipment.isotope}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-mono">{shipment.batch}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-foreground">
                    {shipment.origin} → {shipment.destination}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-foreground">{shipment.carrier}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${shipment.statusColor} opacity-60 bg-gray-100 text-gray-400`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px] sm:max-w-[80px]">
                        <div 
                          className={`h-2 rounded-full ${
                            shipment.activity >= 90 ? 'bg-green-600' :
                            shipment.activity >= 70 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${shipment.activity}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm">{shipment.activity}%</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-foreground">{shipment.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </DesktopOnly>

        {/* Mobile Card View */}
        <MobileOnly>
          <div className="p-4 space-y-3">
            {shipments.map((shipment) => (
              <MobileTableCard 
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment.id)}
              >
                <MobileTableCardRow 
                  label="ID" 
                  value={<span className="font-mono text-xs text-primary">{shipment.id}</span>} 
                />
                <MobileTableCardRow 
                  label="Isotope" 
                  value={shipment.isotope} 
                />
                <MobileTableCardRow 
                  label="Batch" 
                  value={<span className="font-mono text-xs">{shipment.batch}</span>} 
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
                  label="Carrier" 
                  value={shipment.carrier} 
                />
                <MobileTableCardRow 
                  label="Status" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs ${shipment.statusColor}`}>
                      {shipment.status}
                    </span>
                  } 
                />
                <MobileTableCardRow 
                  label="Activity" 
                  value={
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                        <div 
                          className={`h-2 rounded-full ${
                            shipment.activity >= 90 ? 'bg-green-600' :
                            shipment.activity >= 70 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${shipment.activity}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{shipment.activity}%</span>
                    </div>
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
    </div>
  );
}
