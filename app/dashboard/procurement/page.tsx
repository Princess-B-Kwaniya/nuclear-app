'use client';

import { Plus, Filter, Search, Eye, Edit, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MobileOnly, DesktopOnly, MobileTableCard, MobileTableCardRow } from '@/components/responsive';

export default function ProcurementPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get('view');
  const [view, setView] = useState<'list' | 'form' | 'quotes'>('list');
  // Remove multi-step form for 1-step creation
  const [editingRequest, setEditingRequest] = useState<any>(null);

  // Handle URL parameter on mount
  useEffect(() => {
    if (viewParam === 'form') {
      setView('form');
    }
  }, [viewParam]);

  const procurementRequests = [
    { 
      id: 'PR-2847', 
      isotope: 'Tc-99m', 
      quantity: '500 mCi', 
      deliveryDate: '2026-01-10', 
      status: 'Quotes Received',
      matchedManufacturers: 3,
      statusColor: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'PR-2846', 
      isotope: 'F-18 FDG', 
      quantity: '250 mCi', 
      deliveryDate: '2026-01-08', 
      status: 'PO Approved',
      matchedManufacturers: 2,
      statusColor: 'bg-green-100 text-green-700'
    },
    { 
      id: 'PR-2845', 
      isotope: 'I-131', 
      quantity: '100 mCi', 
      deliveryDate: '2026-01-12', 
      status: 'Pending Quotes',
      matchedManufacturers: 4,
      statusColor: 'bg-amber-100 text-amber-700'
    },
    { 
      id: 'PR-2844', 
      isotope: 'Lu-177', 
      quantity: '75 mCi', 
      deliveryDate: '2026-01-15', 
      status: 'Draft',
      matchedManufacturers: 0,
      statusColor: 'bg-gray-100 text-gray-700'
    },
  ];

  if (view === 'form') {
    return (
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl">
                {editingRequest ? 'Edit Procurement Request' : 'New Procurement Request'}
              </h2>
              <button 
                onClick={() => {
                  setView('list');
                  setEditingRequest(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors self-start"
              >
                Cancel
              </button>
            </div>
            <div className="bg-card rounded-xl p-4 sm:p-6 lg:p-8 border border-border">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Isotope Type</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
                      defaultValue={editingRequest?.isotope || ''}
                    >
                      <option>Select isotope...</option>
                      <option>Tc-99m (Half-life: 6 hours)</option>
                      <option>F-18 FDG (Half-life: 110 minutes)</option>
                      <option>I-131 (Half-life: 8 days)</option>
                      <option>Lu-177 (Half-life: 6.7 days)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-foreground">Activity Required</label>
                    <input 
                      type="number" 
                      placeholder="500"
                      defaultValue={editingRequest ? parseInt(editingRequest.quantity) : ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-foreground">Unit</label>
                    <select className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-input-background text-foreground">
                      <option>mCi</option>
                      <option>GBq</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Clinical Indication (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter clinical indication..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm mb-2">Attach Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-colors cursor-pointer">
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, DOC (max. 10MB)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Delivery Date</label>
                  <input 
                    type="date"
                    defaultValue={editingRequest?.deliveryDate || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Preferred Time Window</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Morning', 'Afternoon', 'Evening'].map((time) => (
                      <button 
                        key={time}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Delivery Location</label>
                  <input 
                    type="text" 
                    defaultValue="City Hospital, 123 Medical Ave, Cape Town"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Special Instructions</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter any special handling or delivery instructions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button 
                    onClick={() => {
                      setView('list');
                      setEditingRequest(null);
                    }}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors order-1 sm:order-2"
                  >
                    Submit Request
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-3">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }


  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="font-heading text-xl sm:text-2xl text-foreground">Procurement Requests</h2>
        <button 
          onClick={() => setView('form')}
          className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 self-start font-sans"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          New Request
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card rounded-lg p-3 sm:p-4 mb-6 border border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search requests..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-input-background text-foreground"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <select className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed opacity-60" disabled>
            <option>All Statuses</option>
            <option>Draft</option>
            <option>Pending Quotes</option>
            <option>Quotes Received</option>
            <option>PO Approved</option>
          </select>
          <select className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed opacity-60" disabled>
            <option>All Isotopes</option>
            <option>Tc-99m</option>
            <option>F-18 FDG</option>
            <option>I-131</option>
          </select>
          <button className="px-4 py-2 border border-input rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 flex items-center justify-center gap-2" disabled>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Desktop Table View */}
        <DesktopOnly>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Request ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Isotope</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Quantity</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Delivery Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Manufacturers</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-mono">{request.id}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{request.isotope}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{request.quantity}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {new Date(request.deliveryDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${request.statusColor}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-foreground">{request.matchedManufacturers}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => request.status === 'Quotes Received' && setView('quotes')}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button 
                        onClick={() => handleEdit(request)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(request.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" 
                        title="Delete"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </DesktopOnly>

        {/* Mobile Card View */}
        <MobileOnly>
          <div className="p-4 space-y-3">
            {requests.map((request) => (
              <MobileTableCard key={request.id}>
                <MobileTableCardRow 
                  label="ID" 
                  value={<span className="font-mono text-xs">{request.id}</span>} 
                />
                <MobileTableCardRow 
                  label="Isotope" 
                  value={request.isotope} 
                />
                <MobileTableCardRow 
                  label="Quantity" 
                  value={request.quantity} 
                />
                <MobileTableCardRow 
                  label="Delivery" 
                  value={new Date(request.deliveryDate).toLocaleDateString()} 
                />
                <MobileTableCardRow 
                  label="Status" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs ${request.statusColor}`}>
                      {request.status}
                    </span>
                  } 
                />
                <MobileTableCardRow 
                  label="Manufacturers" 
                  value={request.matchedManufacturers} 
                />
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => request.status === 'Quotes Received' && setView('quotes')}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm min-h-[44px] font-sans"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleEdit(request)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm min-h-[44px]"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(request.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center min-h-[44px]"
                    aria-label="Delete request"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </MobileTableCard>
            ))}
          </div>
        </MobileOnly>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-end gap-3">
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-1 border border-input rounded bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 text-sm min-h-[44px]" disabled>Previous</button>
            <button type="button" className="px-3 py-1 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 rounded text-sm min-h-[44px]" disabled>1</button>
            <button type="button" className="px-3 py-1 border border-input rounded bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 text-sm min-h-[44px]" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
