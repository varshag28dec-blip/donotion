import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Phone, Mail, MapPin, ShieldCheck, Globe, Share2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1F38] border-t border-slate-800 text-[#A7B8CC] text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-blue to-accent-green flex items-center justify-center text-dark-bg font-extrabold">
                <HeartHandshake className="w-5 h-5 text-dark-bg" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                SHARE & CARE
              </span>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              "Small Acts. Big Impact. Together We Care."
            </p>
            <p className="text-xs text-[#A7B8CC] leading-relaxed">
              Making donations smarter, faster, safer, and more meaningful. Connecting donors, receivers, and volunteers with transparent QR tracking.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#community" className="w-8 h-8 rounded-lg bg-[#102A46] hover:bg-primary-blue text-slate-300 hover:text-white flex items-center justify-center transition" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#share" className="w-8 h-8 rounded-lg bg-[#102A46] hover:bg-primary-light text-slate-300 hover:text-white flex items-center justify-center transition" title="Share Impact">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ecosystem Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/#urgent-needs" className="hover:text-primary-light transition flex items-center"><span className="text-red-400 mr-1.5">●</span>Urgent Needs (Need of the Day)</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary-light transition">Browse All Donations</Link></li>
              <li><Link to="/share-basket" className="hover:text-primary-light transition">Share Basket (Combined Aid)</Link></li>
              <li><Link to="/food-rescue" className="hover:text-primary-light transition">Food Expiry Rescue</Link></li>
              <li><Link to="/kits" className="hover:text-primary-light transition">Ready-Made Donation Kits</Link></li>
              <li><Link to="/map" className="hover:text-primary-light transition">Interactive Community Map</Link></li>
            </ul>
          </div>

          {/* User Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dashboards & Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/donor/dashboard" className="hover:text-primary-light transition">Donor Portal</Link></li>
              <li><Link to="/receiver/dashboard" className="hover:text-primary-light transition">Receiver Portal & Smart Matching</Link></li>
              <li><Link to="/volunteer/dashboard" className="hover:text-primary-light transition">Volunteer Dispatch & Smart Route</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-primary-light transition">Admin Governance & Approvals</Link></li>
              <li><Link to="/impact" className="hover:text-primary-light transition">Social Impact Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-primary-light transition">About Our Mission</Link></li>
            </ul>
          </div>

          {/* Contact & Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Emergency & Support
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Toll-Free 24x7 Helpline:</span>
                  <span>+91 44 2888 8888 / 1077</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Direct Support:</span>
                  <span>care@sharecare.org</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Coordination Center:</span>
                  <span>Anna Salai, T. Nagar, Chennai, TN</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center space-x-1.5 p-2 rounded-xl bg-[#102A46] text-accent-green text-[11px] font-semibold border border-accent-green/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Verified Community Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SHARE & CARE Ecosystem. All rights reserved.</p>
          <p className="flex items-center">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 mx-1 fill-red-400" /> for community welfare and zero wastage.
          </p>
        </div>
      </div>
    </footer>
  );
}
