import React, { useState } from 'react';
import {
  PlusCircle, Package, CheckCircle2, Clock, MapPin, QrCode,
  Edit2, Trash2, AlertTriangle, Sparkles, X, Utensils, Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRTrackingModal from '../components/QRTrackingModal';

export default function DonorDashboard() {
  const { donations, addDonation, deleteDonation, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('my-donations');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food',
    description: '',
    quantity: 10,
    unit: 'Packets',
    pickupLocation: currentUser?.location || 'Velachery, Chennai',
    pickupOrDrop: 'pickup',
    instructions: '',
    isFood: true,
    prepHoursAgo: 1,
    useByHoursLater: 6,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'
  });

  const [formSuccess, setFormSuccess] = useState('');

  const myDonations = donations.filter(d => d.donorId === (currentUser?.id || 1));

  const stats = {
    total: myDonations.length,
    approved: myDonations.filter(d => d.status === 'approved').length,
    assigned: myDonations.filter(d => d.status === 'assigned' || d.status === 'picked_up' || d.status === 'out_for_delivery').length,
    completed: myDonations.filter(d => d.status === 'completed' || d.status === 'delivered').length,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      isFood: name === 'category' ? value === 'Food' : prev.isFood
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const now = Date.now();
    const newDonation = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      pickupLocation: formData.pickupLocation,
      pickupOrDrop: formData.pickupOrDrop,
      instructions: formData.instructions,
      isFood: formData.isFood,
      images: [formData.imageUrl],
      prepDate: formData.isFood ? new Date(now - formData.prepHoursAgo * 3600 * 1000).toISOString() : null,
      useByDate: formData.isFood ? new Date(now + formData.useByHoursLater * 3600 * 1000).toISOString() : null,
      latitude: 12.9750,
      longitude: 80.2200
    };

    const created = addDonation(newDonation);
    setIsAddModalOpen(false);
    setFormSuccess(`Donation "${created.title}" listed successfully with QR Tracking Code: ${created.trackingCode}!`);
    setTimeout(() => setFormSuccess(''), 7000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-accent-green uppercase tracking-wider bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                Donor Dashboard
              </span>
              <span className="text-xs text-[#A7B8CC] font-medium">
                Signed in as {currentUser?.name || 'Ananya Sharma'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              My Donations & Impact
            </h1>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Donation</span>
          </button>
        </div>

        {/* Success Alert */}
        {formSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
              <span className="text-sm font-semibold">{formSuccess}</span>
            </div>
            <button onClick={() => setFormSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-[#A7B8CC] font-medium">Total Listings</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white mt-1">{stats.total}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-accent-green font-medium">Available</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent-green mt-1">{stats.approved}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-primary-light font-medium">In Transit</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-light mt-1">{stats.assigned}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <span className="text-xs text-accent-amber font-medium">Completed</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-accent-amber mt-1">{stats.completed}</span>
          </div>
        </div>

        {/* My Donations Table / Cards */}
        <div className="rounded-2xl bg-[#0B1F38] border border-slate-700/80 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Your Listed Items</h2>
            <span className="text-xs text-[#A7B8CC]">{myDonations.length} records</span>
          </div>

          <div className="space-y-4">
            {myDonations.map((don) => (
              <div
                key={don.id}
                className="p-5 rounded-xl bg-[#102A46] border border-slate-700/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-500 transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={don.images[0]}
                    alt={don.title}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-primary-light px-2 py-0.5 rounded bg-primary-blue/20">
                        {don.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {don.trackingCode}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base mt-1">{don.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-[#A7B8CC] mt-1">
                      <span>Quantity: <b className="text-white">{don.quantity} {don.unit}</b></span>
                      <span>📍 {don.pickupLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-0 border-slate-800">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    don.status === 'completed' ? 'bg-emerald-500/20 text-accent-green' :
                    don.status === 'assigned' || don.status === 'picked_up' ? 'bg-cyan-500/20 text-primary-light' :
                    'bg-amber-500/20 text-accent-amber'
                  }`}>
                    {don.status}
                  </span>

                  <button
                    onClick={() => setSelectedQR(don.trackingCode)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#071426] hover:bg-slate-800 text-primary-light border border-primary-light/40 flex items-center space-x-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR Tracker</span>
                  </button>

                  <button
                    onClick={() => deleteDonation(don.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Cancel Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Donation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1F38] border border-primary-light/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-extrabold text-white mb-6">
              Create New Donation Listing
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Donation Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g., 20 Veg Meal Packets, 10 School Uniforms"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                  >
                    <option value="Food">Food (Perishable & Non-perishable)</option>
                    <option value="Clothes">Clothes & Warm Wear</option>
                    <option value="Books">Books & Educational</option>
                    <option value="School Supplies">School Supplies</option>
                    <option value="Household Essentials">Household Essentials</option>
                    <option value="Hygiene Essentials">Hygiene Essentials</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      required
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                      Unit *
                    </label>
                    <input
                      type="text"
                      name="unit"
                      required
                      placeholder="Packets, kg, pcs"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                    />
                  </div>
                </div>
              </div>

              {/* Food Expiry Parameters if Food */}
              {formData.isFood && (
                <div className="p-4 rounded-xl bg-[#071426] border border-red-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-red-400">
                    <Utensils className="w-4 h-4" />
                    <span>Food Safety & Expiry Rescue Parameters</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Prepared How Many Hours Ago?</label>
                      <input
                        type="number"
                        name="prepHoursAgo"
                        min="0"
                        max="24"
                        value={formData.prepHoursAgo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#102A46] border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Must Be Consumed Within (Hours)?</label>
                      <input
                        type="number"
                        name="useByHoursLater"
                        min="1"
                        max="48"
                        value={formData.useByHoursLater}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#102A46] border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Pickup Location / Address *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  required
                  placeholder="Street name, landmark, area in Chennai"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Item Description
                </label>
                <textarea
                  rows="3"
                  name="description"
                  placeholder="Details regarding condition, packaging, or dietary info..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Special Pickup Instructions
                </label>
                <input
                  type="text"
                  name="instructions"
                  placeholder="e.g. Call upon arrival, bring insulated carry box"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue"
                >
                  Publish Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {selectedQR && (
        <QRTrackingModal
          trackingCode={selectedQR}
          isOpen={true}
          onClose={() => setSelectedQR(null)}
        />
      )}
    </div>
  );
}
