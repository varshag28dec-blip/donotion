import React, { useState } from 'react';
import { Package, Utensils, BookOpen, Home, ShieldAlert, Shirt, CheckCircle2, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function DonationKitsPage() {
  const { kits, pledgeKitItem, currentUser } = useApp();
  const [pledgeSuccess, setPledgeSuccess] = useState('');

  const iconMap = {
    Utensils: Utensils,
    BookOpen: BookOpen,
    Home: Home,
    ShieldAlert: ShieldAlert,
    Shirt: Shirt
  };

  const handlePledge = (kitId, itemIndex, itemName) => {
    pledgeKitItem(kitId, itemIndex, 2);
    setPledgeSuccess(`Thank you! Pledged 2 units toward "${itemName}".`);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setPledgeSuccess(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-blue/20 text-primary-light border border-primary-light/40 text-xs font-semibold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>Structured Community Kits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Donation Kit Builder
          </h1>
          <p className="text-sm text-[#A7B8CC] leading-relaxed">
            Pre-assembled relief kits addressing wholesome family, education, and disaster relief needs. Pledge specific items to complete kits.
          </p>
        </div>

        {/* Success Alert */}
        {pledgeSuccess && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
              <span className="text-sm font-semibold">{pledgeSuccess}</span>
            </div>
            <button onClick={() => setPledgeSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => {
            const Icon = iconMap[kit.iconName] || Package;
            const totalRequired = kit.items.reduce((acc, i) => acc + i.required, 0);
            const totalPledged = kit.items.reduce((acc, i) => acc + i.pledged, 0);
            const progress = Math.min(100, Math.round((totalPledged / totalRequired) * 100));

            return (
              <div
                key={kit.id}
                className="rounded-3xl bg-[#0B1F38] border border-slate-700/80 p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-primary-light/40 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-blue to-primary-light flex items-center justify-center text-white shadow-glow-blue">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-accent-green bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                      {progress}% Pledged
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{kit.name}</h3>
                  <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">{kit.description}</p>

                  {/* Progress Bar */}
                  <div className="mt-4 p-3 rounded-xl bg-[#102A46] border border-slate-700/80 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Goal: {kit.beneficiariesTarget} Kits</span>
                      <span className="text-primary-light font-bold">{kit.beneficiariesReached} Delivered</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#071426] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-blue to-accent-green rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-5 space-y-2">
                    <span className="text-[11px] font-bold text-[#A7B8CC] uppercase tracking-wider block">
                      Pledge Kit Components
                    </span>
                    {kit.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#102A46]/70 border border-slate-700/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">
                            Pledged: {item.pledged} / {item.required} {item.unit}
                          </span>
                        </div>
                        <button
                          onClick={() => handlePledge(kit.id, idx, item.name)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-primary-blue hover:bg-primary-hover transition"
                        >
                          + Pledge 2
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
                  Beneficiaries target: Displaced families & shelter children.
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
