import React, { useState, useEffect } from 'react';
import { Clock, Utensils, AlertTriangle, ShieldCheck, CheckCircle2, MapPin, Sparkles, X, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function FoodRescuePage() {
  const { donations, claimMatch, currentUser } = useApp();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [claimSuccess, setClaimSuccess] = useState('');

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const foodItems = donations.filter(d => d.isFood && d.status !== 'cancelled');

  const getTimeLeft = (useByDateStr) => {
    if (!useByDateStr) return { hours: 5, minutes: 30, isExpired: false, totalHours: 5.5 };
    const diffMs = new Date(useByDateStr).getTime() - currentTime;
    if (diffMs <= 0) return { hours: 0, minutes: 0, isExpired: true, totalHours: 0 };
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, isExpired: false, totalHours: diffMs / 3600000 };
  };

  const handleClaim = (foodDonation) => {
    claimMatch(foodDonation.id, null);
    setClaimSuccess(`Priority Food Rescue Dispatched! Courier notified to pick up ${foodDonation.title}.`);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setClaimSuccess(''), 6000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Zero Waste Priority Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Food Expiry Rescue System
          </h1>
          <p className="text-sm text-[#A7B8CC] leading-relaxed">
            Nutritious surplus cooked meals and fresh bakery items nearing their use-by limit are prioritized for rapid delivery to local shelters.
          </p>
        </div>

        {/* Safety Guidelines Banner */}
        <div className="p-4 rounded-2xl bg-[#0B1F38] border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-accent-green flex-shrink-0" />
            <span><b>Food Safety Standard:</b> All items undergo prep-time verification. Listings are automatically blocked when past use-by time.</span>
          </div>
          <span className="text-primary-light font-semibold whitespace-nowrap">Hygienic foil packaging required</span>
        </div>

        {/* Success Alert */}
        {claimSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
              <span className="text-sm font-semibold">{claimSuccess}</span>
            </div>
            <button onClick={() => setClaimSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => {
            const timeLeft = getTimeLeft(food.useByDate);
            if (timeLeft.isExpired) return null; // Auto-block expired food

            const isUrgent = timeLeft.totalHours < 6;

            return (
              <div
                key={food.id}
                className={`rounded-3xl bg-[#0B1F38] border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isUrgent ? 'border-red-500/50 shadow-xl shadow-red-950/40' : 'border-slate-700/80 shadow-lg'
                }`}
              >
                {/* Image & Badges */}
                <div className="relative h-48 bg-slate-900">
                  <img
                    src={food.images[0]}
                    alt={food.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-md animate-pulse">
                    ⏳ {timeLeft.hours}h {timeLeft.minutes}m Left
                  </div>
                  <div className="absolute top-3 left-3 bg-[#071426]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-accent-green border border-accent-green/30">
                    {isUrgent ? '🔥 CRITICAL RESCUE' : 'SAFETY VERIFIED'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white line-clamp-1">{food.title}</h3>
                    <p className="text-xs text-[#A7B8CC] mt-2 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>

                    {/* Timeline Box */}
                    <div className="mt-4 p-3 rounded-xl bg-[#102A46] border border-slate-700/80 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-[#A7B8CC]">Prepared:</span>
                        <span className="font-semibold text-white">{new Date(food.prepDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-[#A7B8CC]">Use-by Limit:</span>
                        <span className="font-bold text-red-400">{new Date(food.useByDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-700">
                        <span className="text-[#A7B8CC]">Available Qty:</span>
                        <span className="font-bold text-accent-green">{food.quantity} {food.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-slate-300 truncate mt-3">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-red-400 flex-shrink-0" />
                      <span className="truncate">{food.pickupLocation}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaim(food)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-red-900/30 transition flex items-center justify-center space-x-1.5"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Claim & Dispatch Food Rescue</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
