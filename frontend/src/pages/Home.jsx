import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake, Sparkles, ArrowRight, ShieldCheck, Clock, MapPin,
  Users, CheckCircle2, Package, Utensils, Shirt, BookOpen, GraduationCap,
  Home as HomeIcon, Sparkle, Heart, Flame, ChevronRight, Award, Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import UrgentNeedsSection from '../components/UrgentNeedsSection';
import QRTrackingModal from '../components/QRTrackingModal';

export default function Home() {
  const { donations, impactStats, feedbackList } = useApp();
  const [selectedDonationForQR, setSelectedDonationForQR] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'Food', icon: Utensils, count: '30+ Meals Available', color: 'from-amber-500 to-orange-500', desc: 'Surplus wedding catering, bakery bread, packaged grains.' },
    { name: 'Clothes', icon: Shirt, count: '45+ Items Available', color: 'from-blue-500 to-cyan-500', desc: 'Warm blankets, winter jackets, sanitized daily wear.' },
    { name: 'Books', icon: BookOpen, count: '80+ Books Listed', color: 'from-emerald-500 to-teal-500', desc: 'NCERT textbooks, exam guides, children literature.' },
    { name: 'School Supplies', icon: GraduationCap, count: '40+ Kits Available', color: 'from-purple-500 to-pink-500', desc: 'Geometry boxes, stationery sets, school bags.' },
    { name: 'Household Essentials', icon: HomeIcon, count: '25+ Items Available', color: 'from-indigo-500 to-blue-500', desc: 'Stainless cookware, drinking water cans, bedding.' },
    { name: 'Hygiene Essentials', icon: Sparkle, count: '60+ Packs Available', color: 'from-rose-500 to-red-500', desc: 'Sanitary napkins, soaps, dental kits, sanitizers.' },
  ];

  const recentDonations = donations.slice(0, 4);

  return (
    <div className="bg-[#071426] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-slate-800">
        {/* Glowing backdrop spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary-light/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#102A46] border border-primary-light/30 text-primary-light text-xs sm:text-sm font-semibold shadow-glow-blue animate-pulse">
              <Sparkles className="w-4 h-4 text-accent-amber" />
              <span>Small Acts. Big Impact. Together We Care.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Share What You Have. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-blue-400 to-accent-green">
                Change Someone's Life.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#A7B8CC] max-w-2xl mx-auto font-normal leading-relaxed">
              Chennai's premier smart donation ecosystem connecting generous donors, needy families, and volunteer couriers with transparent QR code delivery tracking and food waste rescue.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/donate"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-primary-blue via-blue-600 to-primary-light hover:from-primary-hover hover:to-primary-blue transition-all duration-200 shadow-xl shadow-primary-blue/35 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Donate Now</span>
              </Link>
              <Link
                to="/request-help"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#102A46] hover:bg-slate-800 border border-slate-700 hover:border-primary-light/50 transition-all duration-200 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>Request Help</span>
                <ArrowRight className="w-5 h-5 text-primary-light" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-accent-green" />
                <span>100% Free & Verified Non-Profit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary-light" />
                <span>Rapid Food Expiry Rescue</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-accent-amber" />
                <span>Chennai Hyper-Local Mapping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT STATISTICS BAR */}
      <section className="py-10 bg-[#0B1F38] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-[#102A46]/80 border border-slate-700/60 shadow-md">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-300">
                {impactStats.totalFoodPackets}+
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#A7B8CC] mt-1 block">
                Food Packets Shared
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#102A46]/80 border border-slate-700/60 shadow-md">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-blue-300">
                {impactStats.totalFamiliesAssisted}+
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#A7B8CC] mt-1 block">
                Families Assisted
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#102A46]/80 border border-slate-700/60 shadow-md">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-amber to-yellow-300">
                {impactStats.activeVolunteers}+
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#A7B8CC] mt-1 block">
                Active Volunteers
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#102A46]/80 border border-slate-700/60 shadow-md">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
                {impactStats.totalDeliveries}+
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#A7B8CC] mt-1 block">
                Completed Deliveries
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. URGENT NEEDS – NEED OF THE DAY (THE NEW BONUS CHALLENGE SECTION) */}
      <UrgentNeedsSection />

      {/* 4. DONATION CATEGORIES */}
      <section className="py-20 bg-[#071426] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2">
              Browse by Needs
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Donation Categories
            </h3>
            <p className="text-sm text-[#A7B8CC] mt-2">
              Select an item category to donate or request immediate neighborhood support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                  className="group p-6 rounded-2xl bg-[#102A46] border border-slate-700/80 hover:border-primary-light/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-primary-light font-semibold">
                    <span>{cat.count}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-[#0B1F38] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-accent-green uppercase tracking-widest mb-2">
              Transparent 4-Step Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              How SHARE & CARE Works
            </h3>
            <p className="text-sm text-[#A7B8CC] mt-2">
              A frictionless pathway from donor surplus to recipient hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="relative p-6 rounded-2xl bg-[#102A46] border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-blue text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-glow-blue">
                1
              </div>
              <h4 className="font-bold text-white text-base">List or Request</h4>
              <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">
                Donors list surplus food, clothes or books. Receivers lodge verified requests with urgency levels.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#102A46] border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-light text-dark-bg font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
                2
              </div>
              <h4 className="font-bold text-white text-base">Smart Need Matching</h4>
              <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">
                Rule-based algorithm correlates categories, quantities, and geographic proximity in real-time.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#102A46] border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-amber text-dark-bg font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-glow-amber">
                3
              </div>
              <h4 className="font-bold text-white text-base">Volunteer Dispatch</h4>
              <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">
                Nearby verified volunteers receive pickup notifications with optimized transit route sequence.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#102A46] border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-green text-dark-bg font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-glow-green">
                4
              </div>
              <h4 className="font-bold text-white text-base">QR Tracking & Delivery</h4>
              <p className="text-xs text-[#A7B8CC] mt-2 leading-relaxed">
                7-stage digital journey updated via QR scan. Final OTP sign-off guarantees legitimate delivery.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. RECENT DONATIONS SHOWCASE */}
      <section className="py-20 bg-[#071426] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2">
                Live Community Listings
              </h2>
              <h3 className="text-3xl font-extrabold text-white">
                Recent Available Donations
              </h3>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center text-sm font-bold text-primary-light hover:text-white transition"
            >
              <span>Explore All Listings in Marketplace</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentDonations.map((don) => (
              <div
                key={don.id}
                className="rounded-2xl bg-[#102A46] border border-slate-700/70 overflow-hidden flex flex-col justify-between hover:border-primary-light/50 transition duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={don.images[0]}
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
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base line-clamp-1">
                      {don.title}
                    </h4>
                    <p className="text-xs text-[#A7B8CC] mt-1.5 line-clamp-2">
                      {don.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold text-accent-green">
                        Quantity: {don.quantity} {don.unit}
                      </span>
                      <span className="capitalize px-2 py-0.5 rounded bg-emerald-500/20 text-accent-green text-[10px] font-bold">
                        {don.status}
                      </span>
                    </div>

                    <div className="flex items-center text-slate-400 truncate text-[11px]">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-primary-light flex-shrink-0" />
                      <span className="truncate">{don.pickupLocation}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setSelectedDonationForQR(don.trackingCode)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition"
                      >
                        Track QR
                      </button>
                      <Link
                        to={`/marketplace?search=${encodeURIComponent(don.title)}`}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light text-center transition"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SHARE BASKET & FOOD RESCUE SPOTLIGHT */}
      <section className="py-20 bg-[#0B1F38] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Share Basket Box */}
            <div className="p-8 rounded-3xl bg-[#102A46] border border-primary-light/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent-green uppercase tracking-wider bg-accent-green/10 px-3 py-1 rounded-full border border-accent-green/30">
                  Feature Spotlight
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  SHARE BASKET – Combine Small Donations
                </h3>
                <p className="text-sm text-[#A7B8CC] leading-relaxed">
                  One donor brings rice, another cooking oil, another lentils. Together, multiple small acts combine into a complete month-long grocery basket for a needy family.
                </p>
                <div className="p-4 rounded-2xl bg-[#071426] border border-slate-700/80 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Community Grocery Kit #104</span>
                    <span className="text-accent-green">75% Completed</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent-green to-teal-400 w-3/4 rounded-full"></div>
                  </div>
                  <span className="text-[11px] text-[#A7B8CC] block">
                    Contributions from Ananya S., Suresh K., Pooja M.
                  </span>
                </div>
              </div>
              <Link
                to="/share-basket"
                className="mt-6 inline-flex items-center text-sm font-bold text-accent-green hover:underline"
              >
                <span>Contribute to Open Baskets</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Food Rescue Box */}
            <div className="p-8 rounded-3xl bg-[#102A46] border border-red-500/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                  Zero Waste Initiative
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Food Expiry Rescue System
                </h3>
                <p className="text-sm text-[#A7B8CC] leading-relaxed">
                  Perishable banquet food and fresh bread are dispatched with priority countdown alerts. Never let safe, nutritious food go to waste.
                </p>
                <div className="p-4 rounded-2xl bg-[#071426] border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Fresh Bakery Loaves & Milk</span>
                    <span className="text-[11px] text-slate-400">Saidapet Market Center</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-1 rounded">
                      ⏳ 2h 30m Left
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/food-rescue"
                className="mt-6 inline-flex items-center text-sm font-bold text-red-400 hover:underline"
              >
                <span>View Real-Time Food Countdown Clocks</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & FEEDBACK */}
      <section className="py-20 bg-[#071426] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2">
              Community Voices
            </h2>
            <h3 className="text-3xl font-extrabold text-white">
              Success Stories & Testimonials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#102A46] border border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-accent-amber mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{item.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.userName}</span>
                    <span className="capitalize text-primary-light font-medium text-[11px]">{item.role}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. VOLUNTEER JOIN BANNER */}
      <section className="py-20 bg-gradient-to-r from-primary-blue via-blue-900 to-[#0B1F38] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Become a SHARE & CARE Volunteer
          </h2>
          <p className="text-base text-blue-100 max-w-2xl mx-auto">
            Got a bike, a few hours during weekends, or a passion to serve? Join our courier heroes delivering hope across Chennai neighborhoods.
          </p>
          <div className="pt-2">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3.5 rounded-2xl font-bold text-dark-bg bg-white hover:bg-slate-100 transition shadow-xl shadow-black/30 space-x-2"
            >
              <span>Join Volunteer Force</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tracking Modal */}
      {selectedDonationForQR && (
        <QRTrackingModal
          trackingCode={selectedDonationForQR}
          isOpen={true}
          onClose={() => setSelectedDonationForQR(null)}
        />
      )}

    </div>
  );
}
