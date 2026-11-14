import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, User, Mail, Phone, Lock, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { loginAs, addNotification } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: 'Velachery, Chennai',
    role: 'donor',
    vehicle: 'Two Wheeler (Scooter)'
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      role: formData.role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      vehicle: formData.vehicle
    };

    loginAs(newUser);
    addNotification('Welcome to SHARE & CARE!', `Account successfully created as ${formData.role.toUpperCase()}.`, 'success');

    const redirectMap = {
      donor: '/donor/dashboard',
      receiver: '/receiver/dashboard',
      volunteer: '/volunteer/dashboard',
      admin: '/admin/dashboard'
    };
    navigate(redirectMap[formData.role] || '/');
  };

  return (
    <div className="min-h-screen bg-[#071426] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white relative">
      <div className="w-full max-w-lg space-y-8 relative z-10">
        
        {/* Brand */}
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
            Create Your Account
          </h2>
          <p className="text-xs text-[#A7B8CC]">
            Join Chennai's fastest-growing smart donation ecosystem
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/40">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1.5">
                Select Your Role *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'donor', label: 'Donor', desc: 'Donate items' },
                  { role: 'receiver', label: 'Receiver', desc: 'Seek aid' },
                  { role: 'volunteer', label: 'Volunteer', desc: 'Deliver aid' },
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: item.role }))}
                    className={`p-3 rounded-xl border text-center transition ${
                      formData.role === item.role
                        ? 'bg-primary-blue text-white border-primary-light shadow-glow-blue'
                        : 'bg-[#102A46] text-[#A7B8CC] border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="font-bold text-xs block">{item.label}</span>
                    <span className="text-[10px] opacity-80 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  name="phone"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                Location / Neighborhood *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Velachery, Chennai"
                value={formData.location}
                onChange={handleInputChange}
                name="location"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              />
            </div>

            {formData.role === 'volunteer' && (
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Mode of Delivery Transit
                </label>
                <input
                  type="text"
                  placeholder="e.g. Motorcycle / Scooter / Car"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  name="vehicle"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B8CC] mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A46] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue shadow-glow-blue transition mt-2"
            >
              Complete Registration
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-[#A7B8CC]">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-light font-bold hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
