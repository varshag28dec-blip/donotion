import React, { useState } from 'react';
import {
  ShieldAlert, Users, Package, CheckCircle2, XCircle, AlertTriangle,
  Flame, BarChart3, Activity, Clock, Sliders, Check, PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const {
    donations, updateDonationStatus, requests, updateRequestStatus,
    emergencyMode, setEmergencyMode, demoUsers, impactStats
  } = useApp();

  const [activeTab, setActiveTab] = useState('approvals');
  const [emergencyAlertText, setEmergencyAlertText] = useState(emergencyMode.alertMessage);

  const pendingDonations = donations.filter(d => d.status === 'pending');
  const pendingRequests = requests.filter(r => r.status === 'under_review' || r.status === 'pending');

  const handleToggleEmergency = () => {
    setEmergencyMode(prev => ({
      ...prev,
      isActive: !prev.isActive,
      alertMessage: emergencyAlertText
    }));
  };

  return (
    <div className="min-h-screen bg-[#071426] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40">
                Central Admin Console
              </span>
              <span className="text-xs text-[#A7B8CC]">
                Full Governance & Moderation Access
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              Platform Administration
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center p-1 rounded-2xl bg-[#0B1F38] border border-slate-700/80 gap-1">
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'approvals' ? 'bg-primary-blue text-white shadow-glow-blue' : 'text-[#A7B8CC] hover:text-white'
              }`}
            >
              Approvals ({pendingDonations.length + pendingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                activeTab === 'emergency' ? 'bg-red-600 text-white shadow-lg' : 'text-red-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Emergency Mode</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'users' ? 'bg-primary-blue text-white shadow-glow-blue' : 'text-[#A7B8CC] hover:text-white'
              }`}
            >
              User Directory
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'analytics' ? 'bg-primary-blue text-white shadow-glow-blue' : 'text-[#A7B8CC] hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-[#A7B8CC] font-medium">Registered Users</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white mt-1">1,428</span>
            <span className="text-[10px] text-accent-green">↑ 14% this week</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-primary-light font-medium">Active Donations</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-light mt-1">{donations.length}</span>
            <span className="text-[10px] text-slate-400">100% verified</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-accent-amber font-medium">Community Requests</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent-amber mt-1">{requests.length}</span>
            <span className="text-[10px] text-accent-amber">92% matched</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-red-400 font-medium">Emergency Status</span>
            <span className={`block text-xl sm:text-2xl font-extrabold mt-1 ${emergencyMode.isActive ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
              {emergencyMode.isActive ? 'ACTIVE RELIEF' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Tab 1: Approvals & Moderation */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Donation Listing Approvals</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-primary-blue/20 text-primary-light">
                  {donations.length} active listings
                </span>
              </h2>

              <div className="space-y-3">
                {donations.map((don) => (
                  <div
                    key={don.id}
                    className="p-4 rounded-xl bg-[#102A46] border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{don.title}</span>
                        <span className="px-2 py-0.5 rounded bg-primary-blue/20 text-primary-light font-semibold">
                          {don.category}
                        </span>
                        <span className="capitalize px-2 py-0.5 rounded bg-emerald-500/20 text-accent-green font-bold">
                          {don.status}
                        </span>
                      </div>
                      <p className="text-slate-400 mt-1">
                        Donor: <b className="text-slate-200">{don.donorName}</b> | Qty: {don.quantity} {don.unit} | Location: {don.pickupLocation}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateDonationStatus(don.id, 'approved')}
                        className="px-3 py-1.5 rounded-lg font-bold text-dark-bg bg-accent-green hover:bg-emerald-400 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateDonationStatus(don.id, 'rejected')}
                        className="px-3 py-1.5 rounded-lg font-bold text-white bg-red-600 hover:bg-red-500 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
              <h2 className="text-lg font-bold text-white">
                Help Request Verifications
              </h2>

              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl bg-[#102A46] border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{req.description}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                          {req.category}
                        </span>
                        <span className="text-slate-400 font-semibold">
                          Urgency: {req.urgency}
                        </span>
                      </div>
                      <p className="text-slate-400 mt-1">
                        Beneficiary: <b className="text-slate-200">{req.receiverName}</b> | Need: {req.quantity} {req.unit} | Location: {req.location}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateRequestStatus(req.id, 'approved')}
                        className="px-3 py-1.5 rounded-lg font-bold text-dark-bg bg-accent-green hover:bg-emerald-400 transition"
                      >
                        Verify & Approve
                      </button>
                      <button
                        onClick={() => updateRequestStatus(req.id, 'rejected')}
                        className="px-3 py-1.5 rounded-lg font-bold text-white bg-slate-800 hover:bg-slate-700 transition"
                      >
                        Flag / Hold
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Emergency Mode Management */}
        {activeTab === 'emergency' && (
          <div className="p-8 rounded-3xl bg-[#0B1F38] border border-red-500/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-red-500 animate-bounce" />
                  <h2 className="text-2xl font-extrabold text-white">
                    Emergency Help Mode Control Center
                  </h2>
                </div>
                <p className="text-xs text-[#A7B8CC] mt-1">
                  When active, broadcasts a high-priority red alert banner across the entire platform and prioritizes life-saving supply logistics.
                </p>
              </div>

              <button
                onClick={handleToggleEmergency}
                className={`px-6 py-3 rounded-2xl text-sm font-extrabold transition shadow-xl ${
                  emergencyMode.isActive
                    ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {emergencyMode.isActive ? 'DEACTIVATE EMERGENCY MODE' : 'ACTIVATE EMERGENCY MODE NOW'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Active Emergency Title
                </label>
                <input
                  type="text"
                  value={emergencyMode.title}
                  onChange={(e) => setEmergencyMode(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Public Emergency Advisory Message
                </label>
                <textarea
                  rows="3"
                  value={emergencyAlertText}
                  onChange={(e) => setEmergencyAlertText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                    Affected Low-Lying Zones
                  </label>
                  <input
                    type="text"
                    value={emergencyMode.affectedAreas}
                    onChange={(e) => setEmergencyMode(prev => ({ ...prev, affectedAreas: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                    Emergency Hotline Number
                  </label>
                  <input
                    type="text"
                    value={emergencyMode.emergencyHelpline}
                    onChange={(e) => setEmergencyMode(prev => ({ ...prev, emergencyHelpline: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
            <h2 className="text-lg font-bold text-white">Registered Persona Directory</h2>
            <div className="divide-y divide-slate-800">
              {Object.values(demoUsers).map((u) => (
                <div key={u.id} className="py-4 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{u.name}</h4>
                      <p className="text-slate-400">{u.email} | 📍 {u.location}</p>
                    </div>
                  </div>
                  <span className="capitalize px-3 py-1 rounded-full text-xs font-bold bg-primary-blue/20 text-primary-light border border-primary-light/40">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-white text-base">Category Fulfillment Rate</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Food Rescue Distribution</span>
                    <span className="text-accent-green font-bold">96%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-accent-green w-[96%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Clothes & Blanket Relief</span>
                    <span className="text-primary-light font-bold">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-primary-light w-[88%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Books & Educational Kits</span>
                    <span className="text-accent-amber font-bold">91%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-accent-amber w-[91%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-white text-base">Audit Activity Log</h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                  <span>[18:04] Emergency Rain Inundation Mode config synchronized.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-primary-light"></span>
                  <span>[17:30] Donation #1 (Fresh Veg Meals) auto-verified and routed to courier.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent-amber"></span>
                  <span>[16:15] Volunteer Karthik Raja accepted delivery task #1.</span>
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
