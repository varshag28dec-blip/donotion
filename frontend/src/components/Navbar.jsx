import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HeartHandshake, Bell, User, LogOut, ChevronDown, Menu, X,
  Shield, CheckCircle, AlertCircle, Sparkles, MapPin, Gift, Clock,
  Layers, Package, Navigation, Users, Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { currentUser, switchUser, logout, notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Urgent Needs', path: '/#urgent-needs', badge: 'LIVE', isHot: true },
    { name: 'Find Donations', path: '/marketplace' },
    { name: 'Donate', path: '/donate' },
    { name: 'Request Help', path: '/request-help' },
    { name: 'Share Basket', path: '/share-basket' },
    { name: 'Food Rescue', path: '/food-rescue' },
    { name: 'Kits', path: '/kits' },
    { name: 'Map', path: '/map' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Impact', path: '/impact' },
  ];

  const roleColors = {
    donor: 'bg-emerald-500/20 text-accent-green border-emerald-500/40',
    receiver: 'bg-amber-500/20 text-accent-amber border-amber-500/40',
    volunteer: 'bg-cyan-500/20 text-primary-light border-cyan-500/40',
    admin: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  };

  const getDashboardPath = (role) => {
    switch (role) {
      case 'donor': return '/donor/dashboard';
      case 'receiver': return '/receiver/dashboard';
      case 'volunteer': return '/volunteer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-blue via-primary-light to-accent-green flex items-center justify-center shadow-glow-blue group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-6 h-6 text-dark-bg font-extrabold" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-primary-light transition-colors">
                  SHARE & CARE
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary-blue/30 text-primary-light border border-primary-light/40">
                  SMART
                </span>
              </div>
              <p className="text-[10px] text-[#A7B8CC] tracking-wider uppercase hidden sm:block">
                Smart Donation Ecosystem
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-[#102A46] border border-primary-light/30 shadow-glow-blue'
                      : 'text-[#A7B8CC] hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    {link.isHot && <Flame className="w-3 h-3 text-red-400 animate-pulse inline mr-0.5" />}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-red-500 text-white animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Role Switcher & Notifications & User */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Role Switcher Pill */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    roleColors[currentUser.role] || 'bg-slate-800 text-white border-slate-700'
                  }`}
                  title="Switch Role Demo Persona"
                >
                  <span className="capitalize">{currentUser.role}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B1F38] border border-slate-700 shadow-2xl p-2 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[11px] text-[#A7B8CC] border-b border-slate-800 font-semibold uppercase tracking-wider">
                      Switch Role (Demo Switcher)
                    </div>
                    {['donor', 'receiver', 'volunteer', 'admin'].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          switchUser(role);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between transition mt-1 ${
                          currentUser.role === role ? 'bg-primary-blue text-white' : 'text-[#A7B8CC] hover:bg-[#102A46] hover:text-white'
                        }`}
                      >
                        <span className="capitalize">{role}</span>
                        {currentUser.role === role && <CheckCircle className="w-3.5 h-3.5 text-accent-green" />}
                      </button>
                    ))}
                    <div className="border-t border-slate-800 mt-2 pt-1">
                      <Link
                        to={getDashboardPath(currentUser.role)}
                        onClick={() => setIsRoleDropdownOpen(false)}
                        className="w-full block px-3 py-2 rounded-xl text-primary-light font-bold hover:bg-[#102A46] transition"
                      >
                        Go to My Dashboard →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 rounded-xl bg-[#102A46] border border-slate-700/80 text-[#A7B8CC] hover:text-white hover:border-primary-light/40 transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center animate-pulse shadow-md">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0B1F38] border border-slate-700 shadow-2xl p-4 z-50 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-white text-sm">Notifications ({notifications.length})</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-primary-light hover:underline text-[11px] font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800 my-2">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-[#A7B8CC]">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 rounded-xl cursor-pointer transition ${
                            n.isRead ? 'opacity-70 hover:opacity-100 hover:bg-[#102A46]' : 'bg-[#102A46]/90 border border-primary-light/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-white">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[#A7B8CC] text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={getDashboardPath(currentUser.role)}
                  className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#102A46] border border-slate-700 hover:border-primary-light/40 transition"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-primary-light/50"
                  />
                  <span className="text-xs font-semibold text-white hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-red-400 transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue transition shadow-md shadow-primary-blue/30"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#102A46] text-[#A7B8CC] hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#071426] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#A7B8CC] hover:text-white hover:bg-[#102A46]"
            >
              {link.name}
            </Link>
          ))}
          {currentUser && (
            <div className="pt-3 border-t border-slate-800">
              <Link
                to={getDashboardPath(currentUser.role)}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block py-2.5 text-center rounded-xl bg-gradient-to-r from-primary-blue to-primary-light text-white font-bold text-sm"
              >
                Go to {currentUser.role.toUpperCase()} Dashboard
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
