import React, { useState } from 'react';
import { Award, Heart, Users, Utensils, Shirt, BookOpen, CheckCircle2, Star, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SocialImpactPage() {
  const { impactStats, feedbackList, addFeedback, currentUser } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!comment) return;

    addFeedback(rating, comment);
    setComment('');
    setFeedbackSuccess('Thank you for sharing your experience! Your testimonial inspires our city.');
    setTimeout(() => setFeedbackSuccess(''), 6000);
  };

  const metrics = [
    { title: 'Food Packets Shared', value: impactStats.totalFoodPackets, icon: Utensils, color: 'from-amber-500 to-orange-500' },
    { title: 'Clothes & Blankets Donated', value: impactStats.totalClothes, icon: Shirt, color: 'from-blue-500 to-cyan-500' },
    { title: 'Essential Items Distributed', value: impactStats.totalEssentials, icon: Award, color: 'from-emerald-500 to-teal-500' },
    { title: 'Families Supported', value: impactStats.totalFamiliesAssisted, icon: Heart, color: 'from-rose-500 to-red-500' },
    { title: 'Students Empowered', value: impactStats.totalStudentsSupported, icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { title: 'Verified Deliveries Completed', value: impactStats.totalDeliveries, icon: CheckCircle2, color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-accent-green border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audited & Verified Metrics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Community Social Impact Dashboard
          </h1>
          <p className="text-sm text-[#A7B8CC] leading-relaxed">
            Transparently computed strictly from confirmed donation records and verified courier deliveries across Chennai.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0B1F38] border border-slate-700/80 hover:border-primary-light/40 transition duration-300 shadow-xl flex items-center space-x-4"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-white">
                    {m.value.toLocaleString()}+
                  </span>
                  <span className="text-xs text-[#A7B8CC] font-medium block mt-0.5">
                    {m.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Showcase */}
        <div className="p-8 rounded-3xl bg-[#0B1F38] border border-slate-700/80 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Beneficiary & Volunteer Reviews</h2>
            <p className="text-xs text-[#A7B8CC] mt-1">Verified reflections from community members.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="p-5 rounded-2xl bg-[#102A46] border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-accent-amber mb-2">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{fb.comment}"</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 text-xs flex justify-between text-[#A7B8CC]">
                  <span className="font-bold text-white">{fb.userName}</span>
                  <span className="capitalize text-primary-light font-semibold">{fb.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review box */}
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#102A46] border border-primary-light/30 space-y-4">
            <h3 className="font-bold text-white text-base text-center">Share Your Experience</h3>
            
            {feedbackSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-accent-green text-xs font-semibold text-center">
                {feedbackSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitFeedback} className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'text-accent-amber fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>

              <textarea
                rows="3"
                required
                placeholder="Write your brief testimonial..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071426] border border-slate-700 text-sm text-white focus:outline-none focus:border-primary-light"
              ></textarea>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:opacity-90 shadow-glow-blue"
              >
                Post Community Feedback
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
