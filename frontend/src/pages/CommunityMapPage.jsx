import React from 'react';
import { MapPin, Shield, Layers, Navigation, Heart } from 'lucide-react';
import MapComponent from '../components/MapComponent';

export default function CommunityMapPage() {
  return (
    <div className="min-h-screen bg-[#071426] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-accent-green uppercase tracking-wider bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
              Hyper-Local Geo Visualizer
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              Community Donation & Relief Map
            </h1>
            <p className="text-xs sm:text-sm text-[#A7B8CC] mt-1">
              Real-time map visualizing active donations, urgent help requests, and collection hubs across Chennai.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#0B1F38] border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-accent-green flex-shrink-0" />
            <span>Exact residential door numbers are obfuscated for personal safety.</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="p-4 rounded-3xl bg-[#0B1F38] border border-slate-700/80 shadow-2xl">
          <MapComponent height="650px" showRoute={true} />
        </div>

      </div>
    </div>
  );
}
