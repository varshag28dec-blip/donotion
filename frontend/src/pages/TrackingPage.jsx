import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, Search, ShieldCheck, CheckCircle2, Clock, User, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRTrackingModal from '../components/QRTrackingModal';

export default function TrackingPage() {
  const { code } = useParams();
  const { trackingData, donations } = useApp();
  const [inputCode, setInputCode] = useState(code || 'SC-TRK-78901');
  const [activeTrackingCode, setActiveTrackingCode] = useState(code || 'SC-TRK-78901');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trackingInfo = trackingData[activeTrackingCode];

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setActiveTrackingCode(inputCode.trim().toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center text-xs text-primary-light hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            QR Code Live Delivery Tracker
          </h1>
          <p className="text-sm text-[#A7B8CC]">
            Enter any donation tracking code to inspect its 7-stage verifiable custody timeline.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. SC-TRK-78901"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#0B1F38] border border-slate-700 text-sm font-mono text-white placeholder-slate-500 uppercase focus:outline-none focus:border-primary-light"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light shadow-glow-blue"
          >
            Track
          </button>
        </form>

        {/* Quick Demo Code Pills */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#A7B8CC]">
          <span>Try Demo Codes:</span>
          {['SC-TRK-78901', 'SC-TRK-88219'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setInputCode(c);
                setActiveTrackingCode(c);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#102A46] text-primary-light font-mono hover:bg-slate-700 transition"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tracking Card */}
        {trackingInfo ? (
          <div className="rounded-3xl bg-[#0B1F38] border border-primary-light/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs text-[#A7B8CC] uppercase font-bold tracking-wider">
                  Tracking Code
                </span>
                <h2 className="text-2xl font-extrabold text-primary-light font-mono mt-0.5">
                  {trackingInfo.trackingCode}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary-blue hover:bg-primary-hover shadow-glow-blue transition"
              >
                <QrCode className="w-4 h-4" />
                <span>Open Interactive QR Scanner Modal</span>
              </button>
            </div>

            {/* Stepper Display */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Handover Stages Progress
              </h3>

              {trackingInfo.stages.map((st) => {
                const isCompleted = st.stage <= trackingInfo.currentStage;
                const isCurrent = st.stage === trackingInfo.currentStage;
                return (
                  <div
                    key={st.stage}
                    className={`p-4 rounded-xl border flex items-start space-x-4 transition ${
                      isCurrent
                        ? 'bg-primary-blue/20 border-primary-light/60 shadow-glow-blue'
                        : isCompleted
                        ? 'bg-[#102A46] border-emerald-500/30'
                        : 'bg-[#102A46]/30 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isCompleted
                          ? 'bg-accent-green text-dark-bg font-extrabold'
                          : isCurrent
                          ? 'bg-primary-light text-dark-bg animate-pulse'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isCompleted ? '✓' : st.stage}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
                          Stage {st.stage}: {st.name}
                        </span>
                        {st.time && (
                          <span className="text-xs text-primary-light font-medium">{st.time}</span>
                        )}
                      </div>
                      {st.actor && (
                        <p className="text-xs text-slate-300 mt-1">Verified by: {st.actor}</p>
                      )}
                      {st.note && (
                        <p className="text-xs text-slate-400 italic mt-0.5">"{st.note}"</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl bg-[#0B1F38] border border-slate-800 text-[#A7B8CC] text-sm">
            Tracking code not found. Please verify the code and try again.
          </div>
        )}

      </div>

      {isModalOpen && (
        <QRTrackingModal
          trackingCode={activeTrackingCode}
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
