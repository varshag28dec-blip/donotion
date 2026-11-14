import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/AppContext';

// Custom Map pin icon creator using SVG
const createCustomIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        color: #071426;
        font-weight: 800;
        font-size: 11px;
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px ${color};
        border: 2px solid #ffffff;
      ">
        <span style="transform: rotate(45deg);">${label}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export default function MapComponent({ height = '500px', showRoute = false }) {
  const { donations, requests, volunteerTasks } = useApp();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered at Chennai (approx 13.00, 80.22)
      const map = L.map(mapContainerRef.current, {
        center: [13.0067, 80.2200],
        zoom: 12,
        zoomControl: true
      });

      // Dark style tile layer from CartoDB or OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old marker layers if any
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const routeCoords = [];

    // 1. Add Donations markers (Green pin)
    donations.forEach(don => {
      if (don.latitude && don.longitude) {
        const marker = L.marker([don.latitude, don.longitude], {
          icon: createCustomIcon('#34D399', '🍲')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Poppins, sans-serif; min-width: 200px; color: #071426;">
            <div style="background: #2563EB; color: white; padding: 4px 8px; font-weight: bold; font-size: 11px; border-radius: 4px; display: inline-block; margin-bottom: 4px;">
              DONATION AVAILABLE
            </div>
            <h4 style="margin: 4px 0; font-size: 14px; font-weight: 700;">${don.title}</h4>
            <p style="margin: 2px 0; font-size: 12px; color: #4B5563;">Category: <b>${don.category}</b></p>
            <p style="margin: 2px 0; font-size: 12px; color: #4B5563;">Quantity: <b>${don.quantity} ${don.unit}</b></p>
            <p style="margin: 4px 0; font-size: 11px; color: #6B7280;">📍 ${don.pickupLocation}</p>
          </div>
        `);
      }
    });

    // 2. Add Requests markers (Red/Amber pin)
    requests.forEach(req => {
      if (req.latitude && req.longitude) {
        const isEmergency = req.isEmergency || req.urgency === 'critical';
        const color = isEmergency ? '#EF4444' : '#FBBF24';
        const marker = L.marker([req.latitude, req.longitude], {
          icon: createCustomIcon(color, isEmergency ? '🚨' : '✋')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Poppins, sans-serif; min-width: 200px; color: #071426;">
            <div style="background: ${color}; color: white; padding: 4px 8px; font-weight: bold; font-size: 11px; border-radius: 4px; display: inline-block; margin-bottom: 4px;">
              ${isEmergency ? 'CRITICAL EMERGENCY REQUEST' : 'HELP REQUEST'}
            </div>
            <h4 style="margin: 4px 0; font-size: 14px; font-weight: 700;">${req.description}</h4>
            <p style="margin: 2px 0; font-size: 12px; color: #4B5563;">Category: <b>${req.category}</b> (${req.quantity} ${req.unit})</p>
            <p style="margin: 2px 0; font-size: 12px; color: #4B5563;">Requester: <b>${req.receiverName}</b></p>
            <p style="margin: 4px 0; font-size: 11px; color: #6B7280;">📍 ${req.location}</p>
          </div>
        `);
      }
    });

    // 3. Add Volunteer Distribution Centers & Waypoint Polyline if showRoute
    if (showRoute) {
      volunteerTasks.forEach(task => {
        if (task.pickupLat && task.pickupLng) {
          routeCoords.push([task.pickupLat, task.pickupLng]);
        }
        if (task.deliveryLat && task.deliveryLng) {
          routeCoords.push([task.deliveryLat, task.deliveryLng]);
        }
      });

      if (routeCoords.length > 1) {
        const polyline = L.polyline(routeCoords, {
          color: '#38BDF8',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8'
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }
    }

  }, [donations, requests, volunteerTasks, showRoute]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
      <div ref={mapContainerRef} style={{ height }} className="w-full" />
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-[#0B1F38]/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-xs text-white space-y-1.5 shadow-lg">
        <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-1">
          Map Legend
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-accent-green inline-block shadow-glow-green"></span>
          <span>Available Donation</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-accent-amber inline-block shadow-glow-amber"></span>
          <span>Community Help Request</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span>Critical Emergency / Relief</span>
        </div>
        {showRoute && (
          <div className="flex items-center space-x-2">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-primary-light inline-block"></span>
            <span>Volunteer Route Path</span>
          </div>
        )}
      </div>
    </div>
  );
}
