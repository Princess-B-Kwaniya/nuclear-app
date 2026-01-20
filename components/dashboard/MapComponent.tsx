'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';

interface Shipment {
  id: string;
  lat: number;
  lng: number;
  status: 'active' | 'warning' | 'success';
  isotope: string;
}

interface MapComponentProps {
  shipments: Shipment[];
}

// Fix Leaflet default icon issue with Next.js
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="position: relative;">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: ${color};
          border-radius: 50%;
          opacity: 0.3;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Auto-fit bounds to show all markers
function FitBounds({ shipments }: { shipments: Shipment[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (shipments.length > 0) {
      const bounds = L.latLngBounds(shipments.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, shipments]);
  
  return null;
}

export default function MapComponent({ shipments }: MapComponentProps) {
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#2563eb'; // blue-600
      case 'warning':
        return '#d97706'; // amber-600
      case 'success':
        return '#16a34a'; // green-600
      default:
        return '#6b7280'; // gray-600
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'In Transit';
      case 'warning':
        return 'At Customs';
      case 'success':
        return 'Dispatched';
      default:
        return status;
    }
  };

  // Calculate center based on shipments
  const center = useMemo(() => {
    if (shipments.length === 0) return { lat: -28.5, lng: 24.5 }; // Center of South Africa
    const avgLat = shipments.reduce((sum, s) => sum + s.lat, 0) / shipments.length;
    const avgLng = shipments.reduce((sum, s) => sum + s.lng, 0) / shipments.length;
    return { lat: avgLat, lng: avgLng };
  }, [shipments]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FitBounds shipments={shipments} />
        
        {shipments.map((shipment) => (
          <Marker
            key={shipment.id}
            position={[shipment.lat, shipment.lng]}
            icon={createCustomIcon(getMarkerColor(shipment.status))}
          >
            <Popup>
              <div className="p-2">
                <div className="text-xs font-mono text-purple-600 mb-1 font-semibold">
                  {shipment.id}
                </div>
                <div className="text-sm font-medium mb-1">{shipment.isotope}</div>
                <div className="text-xs text-gray-600">
                  Status: <span className="capitalize font-medium">{getStatusLabel(shipment.status)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Lat: {shipment.lat.toFixed(4)}, Lng: {shipment.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend - Positioned over the map */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <div className="text-xs font-medium mb-2 text-gray-700">Live Tracking</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">In Transit</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
            <span className="text-gray-600">At Customs</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">Dispatched</span>
          </div>
        </div>
      </div>

      {/* Real-time Indicator */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700">Live</span>
        </div>
      </div>

      {/* Add ping animation styles */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
