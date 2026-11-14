import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EmergencyBanner() {
  const { emergencyMode } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!emergencyMode || !emergencyMode.isActive || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-950 via-red-900 to-rose-950 border-b border-red-500/40 text-white relative z-40 emergency-pulse">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <div className="flex items-center space-x-2">
            <span className="bg-red-600/90 text-white font-bold text-xs uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-red-400">
              EMERGENCY RELIEF ACTIVE
            </span>
            <span className="font-medium text-red-100 hidden sm:inline">
              {emergencyMode.title}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs text-red-200 bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800">
            <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span className="font-semibold">{emergencyMode.emergencyHelpline}</span>
          </div>
          <Link
            to="/marketplace?is_emergency=1"
            className="inline-flex items-center text-xs font-semibold text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md transition shadow-sm"
          >
            <span>View Critical Needs</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-red-300 hover:text-white p-0.5 transition"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
