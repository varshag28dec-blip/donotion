import React, { useState } from 'react';
import {
  HeartHandshake, Sparkles, PlusCircle, CheckCircle2, Clock,
  MapPin, Shield, AlertTriangle, ArrowRight, X, UserX, Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRTrackingModal from '../components/QRTrackingModal';

export default function ReceiverDashboard() {
  const { requests, addRequest, getSmartMatches, claimMatch, currentUser, donations } = useApp();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [trackingCodeToView, setTrackingCodeToView] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    category: 'Food',
    quantity: 5,
    unit: 'Packets',
    description: '',
    location: currentUser?.location || 'Guindy, Chennai',
    urgency: 'high',
    isAnonymous: false,
    contactPhone: currentUser?.phone || '+91 98765 43211',
    supportingInfo: ''
  });

  const matches = getSmartMatches();
  const myRequests = requests.filter(r => r.receiverId === (currentUser?.id || 2));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!formData.description) return;

    addRequest({
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      description: formData.description,
      location: formData.location,
      urgency: formData.urgency,
      isAnonymous: formData.isAnonymous,
      contactPhone: formData.contactPhone,
      supportingInfo: formData.supportingInfo
    });

    setIsRequestModalOpen(false);
    setActionSuccess('Your assistance request was lodged successfully. Our matching algorithm is connecting local donors.');
    setTimeout(() => setActionSuccess(''), 7000);
  };

  const handleClaimMatch = (match) => {
    claimMatch(match.donationId, match.requestId);
    setActionSuccess(`Matched donation "${match.donationTitle}" claimed! A volunteer courier will pick it up.`);
    setTimeout(() => setActionSuccess(''), 7000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-accent-amber uppercase tracking-wider bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40">
                Receiver Dashboard
              </span>
              <span className="text-xs text-[#A7B8CC]">
                Signed in as {currentUser?.name || 'Murugan R.'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              Beneficiary Support Portal
            </h1>
          </div>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Request Assistance</span>
          </button>
        </div>

        {/* Success Alert */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
              <span className="text-sm font-semibold">{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 1. SMART NEED MATCHING CARDS SECTION */}
        <div className="p-6 rounded-3xl bg-[#0B1F38] border border-primary-light/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-primary-light animate-pulse" />
                <h2 className="text-lg font-bold text-white">
                  Smart Need Matching System
                </h2>
              </div>
              <p className="text-xs text-[#A7B8CC] mt-0.5">
                Rule-based algorithmic matches correlating category, requested quantity, and nearby GPS coordinates.
              </p>
            </div>
            <span className="text-xs font-bold text-primary-light bg-primary-blue/20 px-3 py-1 rounded-full border border-primary-light/40">
              {matches.length} Matches Found
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="py-8 text-center text-[#A7B8CC] text-xs">
              No matching donations found yet for your current requests. Check back shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#102A46] border border-primary-light/40 hover:border-primary-light transition flex flex-col justify-between space-y-4 shadow-lg shadow-primary-blue/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-accent-green border border-emerald-500/40">
                        {m.matchPercentage}% Compatibility Match
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Category: <b className="text-white">{m.category}</b>
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">
                      {m.donationTitle}
                    </h3>
                    <p className="text-xs text-[#A7B8CC] mt-1">
                      Matched to your request: "{m.requestTitle}"
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-[#071426] border border-slate-800 space-y-1.5 text-xs">
                      <div className="text-slate-300">
                        Available: <b className="text-accent-green">{m.availableQty} {m.unit}</b> (You asked for {m.requestedQty})
                      </div>
                      <div className="text-slate-400 truncate">
                        📍 Proximity: <span className="text-slate-200">{m.location}</span>
                      </div>
                      <ul className="text-[11px] text-[#A7B8CC] list-disc list-inside pt-1">
                        {m.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaimMatch(m)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition flex items-center justify-center space-x-1.5"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Claim Matched Donation</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. MY REQUESTS & TRACKING */}
        <div className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">
              My Help Requests ({myRequests.length})
            </h2>
            <span className="text-xs text-[#A7B8CC]">
              Confidential & Protected
            </span>
          </div>

          <div className="space-y-4">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-[#102A46] border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-primary-light px-2.5 py-0.5 rounded bg-primary-blue/20">
                      {req.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      req.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                      req.urgency === 'high' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      Urgency: {req.urgency}
                    </span>
                    {req.isAnonymous && (
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center">
                        <UserX className="w-3 h-3 mr-0.5" /> Anonymous
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base mt-1.5">{req.description}</h3>
                  
                  <div className="flex items-center space-x-4 text-xs text-[#A7B8CC] mt-1">
                    <span>Quantity: <b className="text-white">{req.quantity} {req.unit}</b></span>
                    <span>📍 {req.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-0 border-slate-800">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    req.status === 'completed' || req.status === 'delivered' ? 'bg-emerald-500/20 text-accent-green' :
                    req.status === 'matched' || req.status === 'assigned' ? 'bg-cyan-500/20 text-primary-light' :
                    'bg-amber-500/20 text-accent-amber'
                  }`}>
                    {req.status}
                  </span>

                  <button
                    onClick={() => setTrackingCodeToView('SC-TRK-78901')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition"
                  >
                    Track Courier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Help Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0B1F38] border border-primary-light/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-extrabold text-white mb-2">
              Request Community Assistance
            </h2>
            <p className="text-xs text-[#A7B8CC] mb-6">
              Your details are kept private and never exposed to unauthorized entities.
            </p>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  >
                    <option value="Food">Food / Rations</option>
                    <option value="Clothes">Clothes / Blankets</option>
                    <option value="Books">Books / Study Material</option>
                    <option value="School Supplies">School Supplies</option>
                    <option value="Household Essentials">Household Essentials</option>
                    <option value="Hygiene Essentials">Hygiene Essentials</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      required
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Unit *</label>
                    <input
                      type="text"
                      name="unit"
                      required
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Describe the Need *</label>
                <textarea
                  rows="3"
                  name="description"
                  required
                  placeholder="e.g. 5 meals for evening dinner for daily wage laborers family"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Approximate Location / Area *</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Area / landmark (e.g. Guindy Station Road)"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Urgency Level *</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  >
                    <option value="low">Low (Next few days)</option>
                    <option value="medium">Medium (Within 24-48 hours)</option>
                    <option value="high">High (Within today)</option>
                    <option value="critical">Critical Emergency (Immediate)</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-primary-blue bg-[#102A46] border-slate-700"
                    />
                    <span>Post Anonymously (Hide Name)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light shadow-glow-blue"
                >
                  Submit Help Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Tracking Modal */}
      {trackingCodeToView && (
        <QRTrackingModal
          trackingCode={trackingCodeToView}
          isOpen={true}
          onClose={() => setTrackingCodeToView(null)}
        />
      )}
    </div>
  );
}
