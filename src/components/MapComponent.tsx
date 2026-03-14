'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapPin } from '@/types/game-data';

interface MapComponentProps {
  onMapClick: () => void;
  pins: MapPin[];
}

export default function MapComponent({ onMapClick, pins }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map-container').setView([50, 50], 5);

      // Add CartoDB dark tile layer
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; CartoDB',
          maxZoom: 18,
        }
      ).addTo(map);

      // Handle map clicks
      map.on('click', () => {
        onMapClick();
      });

      mapRef.current = map;
    }

    return () => {
      // Cleanup
    };
  }, [onMapClick]);

  // Add pins to map
  useEffect(() => {
    if (mapRef.current) {
      // Clear existing markers
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer);
        }
      });

      // Add new pins
      pins.forEach(pin => {
        const colors: Record<string, string> = {
          collectible: '#22c55e',
          boss: '#ef4444',
          npc: '#3b82f6',
          poi: '#eab308',
          custom: '#9ca3af',
        };

        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 8,
          fillColor: colors[pin.category] || '#9ca3af',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(mapRef.current!);

        marker.bindPopup(`<strong>${pin.label}</strong><br/>${pin.notes || ''}`);
      });
    }
  }, [pins]);

  return <div id="map-container" className="w-full h-[500px] rounded-lg" />;
}
