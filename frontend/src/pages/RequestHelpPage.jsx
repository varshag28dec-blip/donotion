import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, UserX, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function RequestHelpPage() {
  const { addRequest, currentUser } = useApp();
  const navigate = useNavigate();

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

  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) return;

    addRequest(formData);
    setSuccessMsg('Your assistance request has been submitted. Our smart matching algorithm is correlating local donations.');
    setTimeout(() => {
      navigate('/receiver/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-accent-green uppercase tracking-wider bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
            Dignified Community Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Request Help / Essential Items
          </h1>
          <p className="text-sm text-[#A7B8CC] leading-relaxed">
            Whether for your family, neighborhood shelter, or flood relief, let us connect you with available surplus donations. Your privacy is safeguarded.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 flex items-center space-x-3 shadow-glow-green">
            <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
            <span className="text-sm font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Required Item Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                >
                  <option value="Food">Food / Packed Meals / Grains</option>
                  <option value="Clothes">Warm Clothes / Blankets</option>
                  <option value="Books">Books / Study Textbooks</option>
                  <option value="School Supplies">School Supplies & Stationery</option>
                  <option value="Household Essentials">Household Essentials & Utensils</option>
                  <option value="Hygiene Essentials">Hygiene & Sanitary Packs</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Quantity Needed *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Unit *</label>
                  <input
                    type="text"
                    required
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Description of Need *
              </label>
              <textarea
                rows="3"
                required
                name="description"
                placeholder="Briefly explain who needs this item and any specific requirements..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Neighborhood / Area *
              </label>
              <input
                type="text"
                required
                name="location"
                placeholder="e.g. Guindy Station Road, Velachery Sector 2"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                >
                  <option value="low">Low (Next few days)</option>
                  <option value="medium">Medium (Within 24-48 hours)</option>
                  <option value="high">High (Within today)</option>
                  <option value="critical">Critical (Immediate rescue)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Contact Phone (Private)
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#071426] border border-slate-800 flex items-center justify-between">
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-primary-blue bg-[#102A46] border-slate-700"
                />
                <span className="font-semibold">Submit Anonymously</span>
              </label>
              <span className="text-[11px] text-slate-400">Protects your identity publicly</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition"
            >
              Submit Assistance Request
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
