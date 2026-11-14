import React, { useState, useEffect, useRef } from 'react';
import { QrCode, CheckCircle2, Clock, MapPin, User, ChevronRight, X, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';

export default function QRTrackingModal({ trackingCode, isOpen, onClose }) {
  const { trackingData, advanceTrackingStage, currentUser } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [selectedStageToAdvance, setSelectedStageToAdvance] = useState(null);
  const [updateNote, setUpdateNote] = useState('');

  const trackingInfo = trackingData[trackingCode] || {
    trackingCode,
    currentStage: 2,
    stages: [
      { stage: 1, name: 'Donation Created', status: 'completed', time: '1h ago', actor: 'Donor', note: 'Created' },
      { stage: 2, name: 'Admin Verified', status: 'completed', time: '45m ago', actor: 'Admin', note: 'Verified' },
      { stage: 3, name: 'Volunteer Assigned', status: 'pending', time: null, actor: null, note: null },
      { stage: 4, name: 'Donation Picked Up', status: 'pending', time: null, actor: null, note: null },
      { stage: 5, name: 'Out for Delivery', status: 'pending', time: null, actor: null, note: null },
      { stage: 6, name: 'Successfully Delivered', status: 'pending', time: null, actor: null, note: null },
      { stage: 7, name: 'Receiver Confirmation', status: 'pending', time: null, actor: null, note: null },
    ]
  };

  useEffect(() => {
    if (trackingCode) {
      QRCode.toDataURL(`https://sharecare.org/track/${trackingCode}`, {
        width: 220,
        margin: 2,
        color: {
          dark: '#071426',
          light: '#F8FAFC'
        }
      }).then(url => {
        setQrDataUrl(url);
      }).catch(err => {
        console.error(err);
      });
    }
  }, [trackingCode]);

  if (!isOpen) return null;

  const currentStageNum = trackingInfo.currentStage || 1;

  const handleAdvance = () => {
    if (currentStageNum < 7) {
      advanceTrackingStage(trackingCode, currentStageNum + 1, updateNote || 'Stage status confirmed and signed off.');
      setUpdateNote('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1F38] border border-primary-light/30 p-6 sm:p-8 shadow-2xl shadow-primary-blue/30 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A7B8CC] hover:text-white p-2 rounded-xl bg-[#102A46] hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-primary-light bg-primary-blue/20 px-3 py-1 rounded-full border border-primary-light/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
              <span>Verified Blockchain-Style Tracking Journey</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Donation Journey & QR Code
            </h2>
            <p className="text-sm text-[#A7B8CC] font-mono mt-1">
              Tracking Code: <span className="text-primary-light font-bold">{trackingCode}</span>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-[#A7B8CC] block">Current Progress</span>
            <span className="text-lg font-bold text-accent-green">
              Stage {currentStageNum} of 7 ({Math.round((currentStageNum / 7) * 100)}%)
            </span>
          </div>
        </div>

        {/* Content: QR Code & Journey Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          
          {/* QR Code Panel */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#102A46] border border-slate-700 text-center">
            <div className="p-3 bg-white rounded-2xl shadow-glow-blue mb-4">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Donation QR Code" className="w-40 h-40 object-contain rounded-lg" />
              ) : (
                <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-500 text-xs">
                  Generating QR...
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-white tracking-wide">
              SCAN TO VERIFY OR UPDATE
            </span>
            <p className="text-[11px] text-[#A7B8CC] mt-1">
              Volunteer & Recipient tamper-proof digital handover
            </p>

            {/* Stage Advance Action */}
            {currentStageNum < 7 && (
              <div className="mt-5 w-full pt-4 border-t border-slate-700/60">
                <input
                  type="text"
                  placeholder="Optional scan/handover note..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  className="w-full mb-2 px-3 py-1.5 text-xs rounded-lg bg-[#071426] border border-slate-700 text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleAdvance}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-hover hover:to-primary-blue transition shadow-md shadow-primary-blue/30 flex items-center justify-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Advance to Stage {currentStageNum + 1}</span>
                </button>
              </div>
            )}
            {currentStageNum === 7 && (
              <div className="mt-4 p-2 rounded-xl bg-accent-green/20 border border-accent-green/40 text-accent-green text-xs font-bold">
                ✓ Full Journey Completed!
              </div>
            )}
          </div>

          {/* 7-Stage Visual Journey Stepper */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              7-Step Transparent Handover Timeline
            </h4>

            {trackingInfo.stages.map((stage) => {
              const isCompleted = stage.stage <= currentStageNum;
              const isCurrent = stage.stage === currentStageNum;
              return (
                <div
                  key={stage.stage}
                  className={`p-3.5 rounded-xl border transition-all duration-200 flex items-start space-x-3.5 ${
                    isCurrent
                      ? 'bg-primary-blue/20 border-primary-light/50 shadow-glow-blue'
                      : isCompleted
                      ? 'bg-[#102A46]/70 border-accent-green/30'
                      : 'bg-[#102A46]/30 border-slate-800 text-slate-500'
                  }`}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-accent-green text-dark-bg font-extrabold'
                        : isCurrent
                        ? 'bg-primary-light text-dark-bg animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : stage.stage}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
                        Stage {stage.stage}: {stage.name}
                      </span>
                      {stage.time && (
                        <span className="text-[11px] text-primary-light/80 font-medium">
                          {stage.time}
                        </span>
                      )}
                    </div>
                    {stage.actor && (
                      <p className="text-xs text-[#A7B8CC] mt-0.5">
                        Handled by: <span className="text-white font-medium">{stage.actor}</span>
                      </p>
                    )}
                    {stage.note && (
                      <p className="text-xs text-slate-300 italic mt-0.5">
                        "{stage.note}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-[#A7B8CC]">
          <span>Receiver sign-off protected by OTP & GPS geo-verification.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
