import React, { useState } from 'react';
import { ShoppingBag, PlusCircle, CheckCircle2, Users, HeartHandshake, Sparkles, X, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function ShareBasketPage() {
  const { shareBaskets, contributeToBasket, currentUser } = useApp();
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [contribQty, setContribQty] = useState(2);
  const [contribSuccess, setContribSuccess] = useState('');

  const handleOpenContribute = (basket, itemName) => {
    setSelectedBasket(basket);
    setSelectedItemName(itemName || basket.targetItems[0]?.name || '');
    setContribQty(2);
  };

  const handleSubmitContribution = (e) => {
    e.preventDefault();
    if (!selectedBasket || !selectedItemName) return;

    contributeToBasket(selectedBasket.id, selectedItemName, contribQty);
    setContribSuccess(`Thank you! You contributed ${contribQty} units of ${selectedItemName} toward "${selectedBasket.title}".`);
    setSelectedBasket(null);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => setContribSuccess(''), 6000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crowdsourced Micro-Donations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            SHARE BASKET – Combine Small Acts
          </h1>
          <p className="text-sm text-[#A7B8CC] leading-relaxed">
            No single donor needs to bear the whole burden. Multiple donors contribute different essential kitchen staples toward one needy family's grocery kit.
          </p>
        </div>

        {/* Success Alert */}
        {contribSuccess && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center justify-between shadow-glow-green">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
              <span className="text-sm font-semibold">{contribSuccess}</span>
            </div>
            <button onClick={() => setContribSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Baskets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {shareBaskets.map((basket) => {
            const totalRequired = basket.targetItems.reduce((acc, cur) => acc + cur.requiredQty, 0);
            const totalCollected = basket.targetItems.reduce((acc, cur) => acc + Math.min(cur.collectedQty, cur.requiredQty), 0);
            const progress = Math.min(100, Math.round((totalCollected / totalRequired) * 100));

            return (
              <div
                key={basket.id}
                className="rounded-3xl bg-[#0B1F38] border border-primary-light/30 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary-light bg-primary-blue/20 px-3 py-1 rounded-full border border-primary-light/40">
                      {basket.category}
                    </span>
                    <span className="text-xs text-[#A7B8CC]">📍 {basket.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{basket.title}</h3>
                  <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">{basket.description}</p>

                  {/* Progress Bar */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#102A46] border border-slate-700/80 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">Basket Completion Status</span>
                      <span className="text-accent-green">{progress}% Completed</span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-[#071426] overflow-hidden p-0.5 border border-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-green via-teal-400 to-primary-light transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Target Items Checklist */}
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-bold text-[#A7B8CC] uppercase tracking-wider">
                      Required Staples & Current Contributions
                    </h4>

                    {basket.targetItems.map((item, idx) => {
                      const isFilled = item.collectedQty >= item.requiredQty;
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#102A46]/70 border border-slate-700/60 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <span className={isFilled ? 'text-accent-green font-bold' : 'text-slate-400 font-bold'}>
                              {isFilled ? '✓' : '○'}
                            </span>
                            <span className="text-white font-medium">{item.name}</span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="text-[#A7B8CC]">
                              Collected: <b className={isFilled ? 'text-accent-green' : 'text-amber-400'}>{item.collectedQty}</b> / {item.requiredQty} {item.unit}
                            </span>
                            {!isFilled && (
                              <button
                                onClick={() => handleOpenContribute(basket, item.name)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-primary-blue hover:bg-primary-hover transition"
                              >
                                Contribute
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent contributors */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Users className="w-4 h-4 text-primary-light" />
                    <span>{basket.contributions.length} generous contributions logged</span>
                  </div>
                  <button
                    onClick={() => handleOpenContribute(basket, '')}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-green to-teal-500 hover:opacity-90 shadow-glow-green transition"
                  >
                    + Add Items to Basket
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Contribute Modal */}
      {selectedBasket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0B1F38] border border-primary-light/40 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedBasket(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              Contribute to Basket
            </h3>
            <p className="text-xs text-[#A7B8CC] mb-6">
              {selectedBasket.title}
            </p>

            <form onSubmit={handleSubmitContribution} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Select Item to Contribute</label>
                <select
                  value={selectedItemName}
                  onChange={(e) => setSelectedItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                >
                  {selectedBasket.targetItems.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name} ({item.collectedQty}/{item.requiredQty} {item.unit} already collected)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Quantity You Are Donating</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={contribQty}
                  onChange={(e) => setContribQty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-700 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedBasket(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-green to-teal-500 shadow-glow-green"
                >
                  Confirm Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
