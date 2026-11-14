import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { switchUser, currentUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('donor@sharecare.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const getDashboardPath = (role) => {
    switch (role) {
      case 'donor': return '/donor/dashboard';
      case 'receiver': return '/receiver/dashboard';
      case 'volunteer': return '/volunteer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  const handleDemoLogin = (role) => {
    switchUser(role);
    navigate(getDashboardPath(role));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Match demo accounts or default to donor
    let role = 'donor';
    if (email.includes('receiver')) role = 'receiver';
    else if (email.includes('volunteer')) role = 'volunteer';
    else if (email.includes('admin')) role = 'admin';

    switchUser(role);
    navigate(getDashboardPath(role));
  };

  return (
    <div className="min-h-screen bg-[#071426] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-blue/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-blue to-accent-green flex items-center justify-center text-dark-bg font-extrabold shadow-glow-blue">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              SHARE & CARE
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-[#A7B8CC]">
            Access your personalized role dashboard
          </p>
        </div>

        {/* 1-Click Fast Demo Login Switcher */}
        <div className="p-4 rounded-2xl bg-[#0B1F38] border border-primary-light/30 shadow-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-primary-light">
            <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1" /> Quick One-Click Demo Sign-In:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('donor')}
              className="p-2.5 rounded-xl bg-[#102A46] hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition"
            >
              Donor Demo
            </button>
            <button
              onClick={() => handleDemoLogin('receiver')}
              className="p-2.5 rounded-xl bg-[#102A46] hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
            >
              Receiver Demo
            </button>
            <button
              onClick={() => handleDemoLogin('volunteer')}
              className="p-2.5 rounded-xl bg-[#102A46] hover:bg-cyan-600/30 border border-cyan-500/40 text-primary-light font-bold text-xs transition"
            >
              Volunteer Demo
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="p-2.5 rounded-xl bg-[#102A46] hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs transition"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary-blue bg-[#102A46] border-slate-700"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-primary-light hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-[#A7B8CC]">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary-light font-bold hover:underline">
              Create New Account
            </Link>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0B1F38] border border-primary-light/40 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Reset Password</h3>
            <p className="text-xs text-[#A7B8CC]">
              Enter your registered email address and we will dispatch a verification link.
            </p>
            <input
              type="email"
              placeholder="name@sharecare.org"
              defaultValue={email}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Reset instructions dispatched to your email address.");
                  setShowForgotModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary-blue"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
