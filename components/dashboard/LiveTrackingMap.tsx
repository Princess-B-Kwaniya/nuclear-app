'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Note: This component now uses react-leaflet for actual map tiles and GPS coordinates

interface Shipment {
  id: string;
  lat: number;
  lng: number;
  status: 'active' | 'warning' | 'success';
  isotope: string;
}

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    )
  }
);

export function LiveTrackingMap() {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: 'SH-2851', lat: -33.9249, lng: 18.4241, status: 'active', isotope: 'Tc-99m' },
    { id: 'SH-2850', lat: -26.2041, lng: 28.0473, status: 'warning', isotope: 'F-18 FDG' },
    { id: 'SH-2849', lat: -25.7479, lng: 28.2293, status: 'active', isotope: 'I-131' },
    { id: 'SH-2848', lat: -29.8587, lng: 31.0218, status: 'success', isotope: 'Lu-177' },
  ]);

  // Mock real-time updates - simulate slight movement
  useEffect(() => {
    const interval = setInterval(() => {
      setShipments(prev => prev.map(s => ({
        ...s,
        lat: s.lat + (Math.random() - 0.5) * 0.01, // Smaller movements for realism
        lng: s.lng + (Math.random() - 0.5) * 0.01,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <MapComponent shipments={shipments} />;
}
