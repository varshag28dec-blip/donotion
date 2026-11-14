import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, Filter, MapPin, Package, Clock, Eye, HeartHandshake,
  CheckCircle2, AlertTriangle, ArrowUpDown, X, Sparkles, Utensils,
  Shirt, BookOpen, GraduationCap, Home as HomeIcon, Sparkle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRTrackingModal from '../components/QRTrackingModal';

export default function Marketplace() {
  const { donations, currentUser, claimMatch, addNotification } = useApp();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [trackingCodeToView, setTrackingCodeToView] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState('');

  const categories = ['All', 'Food', 'Clothes', 'Books', 'School Supplies', 'Household Essentials', 'Hygiene Essentials'];
  const locations = ['All', 'Velachery', 'Adyar', 'Guindy', 'Mylapore', 'Anna Nagar', 'Saidapet', 'Tambaram'];

  const filteredDonations = useMemo(() => {
    return donations.filter(don => {
      if (don.status === 'cancelled') return false;
      if (searchParams.get('is_emergency') === '1' && !don.isEmergency) return false;

      // Search match
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = don.title.toLowerCase().includes(q);
        const matchesDesc = don.description?.toLowerCase().includes(q);
        const matchesLoc = don.pickupLocation?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc) return false;
      }

      // Category match
      if (selectedCategory !== 'All' && don.category !== selectedCategory) {
        return false;
      }

      // Location match
      if (selectedLocation !== 'All' && !don.pickupLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'quantity') return b.quantity - a.quantity;
      return 0;
    });
  }, [donations, searchQuery, selectedCategory, selectedLocation, sortBy, searchParams]);

  const handleRequestItem = (donation) => {
    claimMatch(donation.id, null);
    setRequestSuccess(`You have successfully requested "${donation.title}". Our volunteers have been notified!`);
    addNotification('Donation Requested', `You requested ${donation.quantity} ${donation.unit} of ${donation.title}.`, 'success');
    setSelectedDonation(null);
    setTimeout(() => setRequestSuccess(''), 6000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider bg-primary-blue/20 px-3 py-1 rounded-full border border-primary-light/30">
            Open Community Sharing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Donation Marketplace
          </h1>
          <p className="text-sm text-[#A7B8CC] mt-1">
            Browse verified available food, clothing, educational kits, and household items across Chennai.
          </p>
        </div>

        {/* Success Alert */}
        {requestSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green" />
              <span className="text-sm font-semibold">{requestSuccess}</span>
            </div>
            <button onClick={() => setRequestSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="p-6 rounded-2xl bg-[#0B1F38] border border-slate-700/80 shadow-xl space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search items, meals, clothes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-light"
              />
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              >
                <option value="All">All Locations in Chennai</option>
                {locations.filter(l => l !== 'All').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              >
                <option value="latest">Sort by: Recently Listed</option>
                <option value="quantity">Sort by: Highest Quantity</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-xs text-[#A7B8CC] font-medium mr-1">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-primary-blue text-white shadow-glow-blue border border-primary-light'
                    : 'bg-[#102A46] text-[#A7B8CC] hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((don) => (
            <div
              key={don.id}
              className="rounded-2xl bg-[#102A46] border border-slate-700/80 overflow-hidden flex flex-col justify-between hover:border-primary-light/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={don.images[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'}
                  alt={don.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#071426]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-primary-light border border-primary-light/30">
                  {don.category}
                </div>
                {don.isFood && (
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    FOOD RESCUE
                  </div>
                )}
                {don.isEmergency && (
                  <div className="absolute bottom-3 left-3 bg-amber-500/90 text-dark-bg font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                    EMERGENCY AID
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Donor: {don.donorName}</span>
                    <span className="capitalize font-semibold text-accent-green px-2 py-0.5 rounded bg-emerald-500/10">
                      {don.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-1 hover:text-primary-light transition">
                    {don.title}
                  </h3>
                  <p className="text-xs text-[#A7B8CC] mt-2 line-clamp-2 leading-relaxed">
                    {don.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-accent-green">
                      Available: {don.quantity} {don.unit}
                    </span>
                    <span className="text-slate-400">
                      {don.pickupOrDrop === 'pickup' ? '🛵 Volunteer Pickup' : '📦 Donor Drop-off'}
                    </span>
                  </div>

                  <div className="flex items-center text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-primary-light flex-shrink-0" />
                    <span className="truncate">{don.pickupLocation}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      onClick={() => setTrackingCodeToView(don.trackingCode)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                      title="Inspect 7-Stage QR Tracking"
                    >
                      Track QR
                    </button>
                    <button
                      onClick={() => setSelectedDonation(don)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1F38] hover:bg-slate-700 border border-slate-600 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRequestItem(don)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue transition shadow-md shadow-primary-blue/30"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-20 bg-[#0B1F38] rounded-2xl border border-slate-800">
            <Package className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No donations found</h3>
            <p className="text-xs text-[#A7B8CC] mt-1">Try relaxing your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1F38] border border-primary-light/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedDonation(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-blue/20 text-primary-light border border-primary-light/30">
                {selectedDonation.category}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {selectedDonation.title}
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs bg-[#102A46] p-4 rounded-xl border border-slate-700">
                <div>
                  <span className="text-slate-400 block">Quantity Available</span>
                  <span className="text-base font-bold text-accent-green">{selectedDonation.quantity} {selectedDonation.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pickup Location</span>
                  <span className="text-sm font-semibold text-white">{selectedDonation.pickupLocation}</span>
                </div>
                {selectedDonation.isFood && (
                  <>
                    <div>
                      <span className="text-slate-400 block">Prepared At</span>
                      <span className="text-xs text-white">{new Date(selectedDonation.prepDate).toLocaleTimeString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Must Use By</span>
                      <span className="text-xs text-amber-400 font-bold">{new Date(selectedDonation.useByDate).toLocaleTimeString()}</span>
                    </div>
                  </>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#A7B8CC] uppercase mb-1">Item Description</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#102A46]/50 p-3 rounded-xl border border-slate-800">
                  {selectedDonation.description}
                </p>
              </div>

              {selectedDonation.instructions && (
                <div>
                  <h4 className="text-xs font-bold text-[#A7B8CC] uppercase mb-1">Donor Instructions</h4>
                  <p className="text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    {selectedDonation.instructions}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRequestItem(selectedDonation)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light shadow-glow-blue"
                >
                  Confirm Request for Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
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
