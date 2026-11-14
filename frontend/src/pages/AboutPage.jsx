import React from 'react';
import { HeartHandshake, ShieldCheck, Clock, MapPin, Award, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#071426] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider bg-primary-blue/20 px-3.5 py-1.5 rounded-full border border-primary-light/40">
            About SHARE & CARE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Smart Donation Ecosystem
          </h1>
          <p className="text-base text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-green font-bold">
            "Small Acts. Big Impact. Together We Care."
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent-green" />
              <span>Our Core Mission</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B8CC] leading-relaxed">
              To eliminate edible food waste and ensure essential clothing, books, and hygiene supplies reach families facing hardship in our city within hours. We turn everyday surplus into dignified sustenance.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-primary-light" />
              <span>Transparent Governance</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B8CC] leading-relaxed">
              Every donation on SHARE & CARE is secured with a unique 7-stage verifiable QR code tracking custody from donor doorstep to final beneficiary handover with zero middleman diversion.
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-6">
          <h3 className="text-xl font-bold text-white text-center">
            The Four Pillars of Our Ecosystem
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#102A46] border border-slate-700 space-y-2">
              <span className="text-accent-green font-bold text-sm block">1. Donors</span>
              <p className="text-xs text-[#A7B8CC] leading-relaxed">
                Individuals, wedding caterers, bakeries, and colleges contributing clean surplus.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#102A46] border border-slate-700 space-y-2">
              <span className="text-accent-amber font-bold text-sm block">2. Receivers</span>
              <p className="text-xs text-[#A7B8CC] leading-relaxed">
                Families, daily wage workers, orphanages, and student study centers receiving aid.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#102A46] border border-slate-700 space-y-2">
              <span className="text-primary-light font-bold text-sm block">3. Volunteers</span>
              <p className="text-xs text-[#A7B8CC] leading-relaxed">
                Dedicated couriers utilizing two-wheelers for rapid, GPS-optimized pickups.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#102A46] border border-slate-700 space-y-2">
              <span className="text-purple-400 font-bold text-sm block">4. Platform Admin</span>
              <p className="text-xs text-[#A7B8CC] leading-relaxed">
                Moderating food safety standards, verifying urgent requests, and managing disaster relief.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
