import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { sendContactMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sentSuccess, setSentSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sendContactMessage(formData.name, formData.email, formData.subject, formData.message);
    setSentSuccess('Thank you! Your inquiry has been dispatched to our community support desk.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSentSuccess(''), 6000);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider bg-primary-blue/20 px-3 py-1 rounded-full border border-primary-light/40">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Contact SHARE & CARE
          </h1>
          <p className="text-sm text-[#A7B8CC] max-w-xl mx-auto">
            Have surplus bulk rations from a wedding hall? Looking to register a college volunteer club? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Info Side */}
          <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-6">
            <h2 className="text-xl font-bold text-white">Contact Information</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-[#102A46] text-accent-green">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Toll-Free Helpline</span>
                  <span className="text-sm font-bold text-white">+91 44 2888 8888</span>
                  <span className="text-[11px] text-accent-green block">24/7 Available</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-[#102A46] text-primary-light">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email Desk</span>
                  <span className="text-sm font-bold text-white">care@sharecare.org</span>
                  <span className="text-[11px] text-slate-400 block">Response within 2 hours</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-[#102A46] text-red-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Chennai Main Operations Hub</span>
                  <span className="text-sm font-bold text-white">42 Anna Salai, T. Nagar, Chennai</span>
                  <span className="text-[11px] text-slate-400 block">Tamil Nadu 600017</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 shadow-2xl">
            {sentSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-accent-green text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{sentSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Bulk Surplus Food Donation / Volunteer Club Partnership"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">Message *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your query or partnership request..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
