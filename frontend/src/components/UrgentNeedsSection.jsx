import React, { useState } from 'react';
import { HeartHandshake, AlertCircle, MapPin, Package, CheckCircle2, X, Sparkles, Filter, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function UrgentNeedsSection() {
  const { urgentNeeds, respondToUrgentNeed, currentUser, switchUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const categories = ['All', 'Food', 'Clothes', 'Medicines'];

  const filteredNeeds = urgentNeeds.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleHelpNowClick = (need) => {
    setSelectedNeed(need);
    setNote('');
    setIsModalOpen(true);
  };

  const handleConfirmHelp = () => {
    if (!currentUser) {
      // Auto login as donor for smooth demo
      switchUser('donor');
    }

    const success = respondToUrgentNeed(selectedNeed.id, note);
    if (success) {
      setIsModalOpen(false);
      setSuccessToast("Thank you for helping! Your kindness matters.");
      
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setSuccessToast('');
      }, 5000);
    }
  };

  return (
    <section id="urgent-needs" className="py-16 bg-[#071426] relative overflow-hidden border-y border-red-500/20">
      {/* Background ambient red-cyan glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></span>
            Critical Community Assistance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            URGENT NEEDS – <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-rose-400">NEED OF THE DAY</span>
          </h2>
          <p className="mt-3 text-base text-[#A7B8CC]">
            These high-priority requests come from families, elders, and shelters facing critical emergencies today. Your immediate response saves lives.
          </p>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mb-8 max-w-xl mx-auto p-4 rounded-xl bg-gradient-to-r from-emerald-950/90 to-teal-900/90 border border-emerald-500 text-emerald-100 flex items-center justify-between shadow-glow-green animate-bounce">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-accent-green flex-shrink-0" />
              <p className="font-semibold text-sm sm:text-base">{successToast}</p>
            </div>
            <button onClick={() => setSuccessToast('')} className="text-emerald-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Category Filter Pills (Food, Clothes, Medicines mandatory) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <div className="flex items-center text-xs font-medium text-[#A7B8CC] mr-2">
            <Filter className="w-3.5 h-3.5 mr-1 text-primary-light" />
            <span>Filter by Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary-blue to-primary-light text-white border-transparent shadow-glow-blue scale-105'
                  : 'bg-[#102A46]/80 text-[#A7B8CC] border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              {cat === 'Food' && '🍲 '}
              {cat === 'Clothes' && '👕 '}
              {cat === 'Medicines' && '💊 '}
              {cat === 'All' && '✨ '}
              {cat}
            </button>
          ))}
        </div>

        {/* Urgent Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeeds.map((need) => {
            const isRedUrgent = need.urgencyLevel === 'urgent';
            return (
              <div
                key={need.id}
                className="group relative rounded-2xl bg-[#102A46] border border-slate-700/60 p-6 flex flex-col justify-between hover:border-red-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/40"
              >
                {/* Top Row: Urgency Badge and Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${
                        isRedUrgent
                          ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {need.urgencyBadge}
                    </span>
                    <span className="text-xs font-semibold text-primary-light bg-primary-blue/20 px-2.5 py-0.5 rounded-md border border-primary-blue/30">
                      {need.category}
                    </span>
                  </div>

                  {/* Required Item Heading */}
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors line-clamp-2">
                    {need.requiredItem}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-sm text-[#A7B8CC] line-clamp-3 leading-relaxed">
                    {need.shortDescription}
                  </p>
                </div>

                {/* Details Meta */}
                <div className="mt-6 pt-4 border-t border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#A7B8CC]">
                    <span className="flex items-center text-amber-300 font-semibold">
                      <Package className="w-3.5 h-3.5 mr-1" />
                      Needed: {need.quantityNeeded}
                    </span>
                    <span className="flex items-center text-slate-400">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {need.postedTime}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-red-400 flex-shrink-0" />
                    <span className="truncate">{need.location}</span>
                  </div>

                  {need.isHelped ? (
                    <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Aid Pledged by {need.helperAssigned || 'You'}</span>
                    </div>
                  ) : (
                    /* HELP NOW Button */
                    <button
                      onClick={() => handleHelpNowClick(need)}
                      className="mt-4 w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-red-900/30 flex items-center justify-center space-x-2 group-hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <HeartHandshake className="w-4 h-4 animate-pulse" />
                      <span>HELP NOW</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredNeeds.length === 0 && (
          <div className="text-center py-12 text-[#A7B8CC]">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-base">No urgent requests found in this category right now.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && selectedNeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1F38] border border-red-500/40 p-6 sm:p-8 shadow-2xl shadow-red-950/50">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Emergency Community Action
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Are You Ready to Help?
                </h3>
              </div>
            </div>

            {/* Request Summary Box */}
            <div className="my-4 p-4 rounded-xl bg-[#102A46] border border-slate-700/80 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{selectedNeed.requiredItem}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                  {selectedNeed.category}
                </span>
              </div>
              <p className="text-xs text-[#A7B8CC]">{selectedNeed.shortDescription}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                <span className="text-amber-300 font-medium">Quantity: {selectedNeed.quantityNeeded}</span>
                <span className="text-slate-300 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-red-400" />
                  {selectedNeed.location}
                </span>
              </div>
            </div>

            {/* Prompt Message */}
            <p className="text-sm sm:text-base text-slate-200 font-medium mb-4">
              "Your contribution can make a difference in someone's life. Do you want to help with this request?"
            </p>

            {/* User status check */}
            {!currentUser && (
              <div className="mb-4 p-3 rounded-xl bg-primary-blue/20 border border-primary-light/30 text-xs text-primary-light flex items-center space-x-2">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>You are currently a guest. Confirming will automatically sign you in as community donor to fulfill this aid.</span>
              </div>
            )}

            {/* Optional Note */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-[#A7B8CC] mb-1.5">
                Note / Estimated Delivery Time (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., I have 10 packets ready, can drop off in 45 mins"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071426] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-400"
              />
            </div>

            {/* Confirm & Cancel Buttons */}
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#A7B8CC] bg-slate-800 hover:bg-slate-700 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmHelp}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition shadow-lg shadow-red-900/40 flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
