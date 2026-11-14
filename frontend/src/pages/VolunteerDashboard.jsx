import React, { useState } from 'react';
import {
  Navigation, CheckCircle2, Clock, MapPin, Phone, AlertTriangle,
  Sparkles, Check, ArrowRight, ShieldCheck, Bike, Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import MapComponent from '../components/MapComponent';

export default function VolunteerDashboard() {
  const { volunteerTasks, acceptVolunteerTask, updateVolunteerTaskStatus, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'smart-route'

  const myTasks = volunteerTasks.filter(t => t.volunteerId === (currentUser?.id || 3));
  const availableTasks = volunteerTasks.filter(t => t.status === 'available');

  const handleAccept = (taskId) => {
    acceptVolunteerTask(taskId);
  };

  const handleStatusChange = (taskId, status) => {
    updateVolunteerTaskStatus(taskId, status);
  };

  return (
    <div className="min-h-screen bg-[#071426] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-primary-light uppercase tracking-wider bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/40">
                Volunteer Dispatch Station
              </span>
              <span className="text-xs text-[#A7B8CC]">
                Courier: {currentUser?.name || 'Karthik Raja'} ({currentUser?.vehicle || 'Two Wheeler'})
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              Field Operations & Navigation
            </h1>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-[#0B1F38] border border-slate-700/80">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'tasks' ? 'bg-primary-blue text-white shadow-glow-blue' : 'text-[#A7B8CC] hover:text-white'
              }`}
            >
              Task Queue
            </button>
            <button
              onClick={() => setActiveTab('smart-route')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                activeTab === 'smart-route' ? 'bg-primary-blue text-white shadow-glow-blue' : 'text-[#A7B8CC] hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Smart Route Map</span>
            </button>
          </div>
        </div>

        {activeTab === 'tasks' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. My Assigned Tasks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>My Active Tasks</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-blue/30 text-primary-light">
                    {myTasks.length}
                  </span>
                </h2>
              </div>

              {myTasks.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0B1F38] border border-slate-700/80 text-center text-xs text-[#A7B8CC]">
                  You have no active tasks right now. Claim an available task from the right queue!
                </div>
              ) : (
                myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-5 rounded-2xl bg-[#102A46] border border-primary-light/40 space-y-4 shadow-lg shadow-primary-blue/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        task.priority === 'emergency' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                        task.priority === 'urgent' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-xs font-semibold text-accent-green capitalize">
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">
                      {task.taskTitle}
                    </h3>

                    <div className="space-y-2 text-xs bg-[#071426] p-3 rounded-xl border border-slate-800">
                      <div className="flex items-start space-x-2 text-emerald-400">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Pickup:</span>
                          <span className="text-white font-medium">{task.pickupAddress}</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 text-primary-light pt-2 border-t border-slate-800">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Deliver to:</span>
                          <span className="text-white font-medium">{task.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-amber-300/90 italic">
                        Note: {task.notes}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      {task.status === 'assigned' && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'in_progress')}
                          className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-primary-blue hover:bg-primary-hover shadow-glow-blue transition"
                        >
                          Mark Picked Up (In Transit)
                        </button>
                      )}
                      {task.status === 'in_progress' && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'completed')}
                          className="w-full py-2.5 rounded-xl text-xs font-bold text-dark-bg bg-accent-green hover:bg-emerald-400 shadow-glow-green transition"
                        >
                          Confirm Delivery & Recipient Handover ✓
                        </button>
                      )}
                      {task.status === 'completed' && (
                        <div className="w-full py-2 text-center text-xs font-bold text-accent-green bg-accent-green/10 rounded-xl border border-accent-green/30">
                          ✓ Delivery Completed & Verified
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 2. Available Tasks Queue */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>Available Tasks in Chennai</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-accent-green">
                    {availableTasks.length} Available
                  </span>
                </h2>
              </div>

              {availableTasks.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0B1F38] border border-slate-700/80 text-center text-xs text-[#A7B8CC]">
                  All tasks are currently claimed! Great job community!
                </div>
              ) : (
                availableTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-5 rounded-2xl bg-[#0B1F38] border border-slate-700/80 space-y-3 hover:border-slate-500 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        task.priority === 'emergency' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'urgent' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-xs text-slate-400">Open for Claim</span>
                    </div>

                    <h3 className="font-bold text-white text-base">
                      {task.taskTitle}
                    </h3>

                    <div className="text-xs text-slate-300 space-y-1">
                      <p className="truncate">📍 Pickup: {task.pickupAddress}</p>
                      <p className="truncate">🎯 Drop: {task.deliveryAddress}</p>
                    </div>

                    <button
                      onClick={() => handleAccept(task.id)}
                      className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold text-white bg-[#102A46] hover:bg-primary-blue border border-slate-600 hover:border-primary-light transition flex items-center justify-center space-x-1.5"
                    >
                      <Bike className="w-4 h-4 text-primary-light" />
                      <span>Accept This Delivery Task</span>
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        ) : (
          /* Smart Route View */
          <div className="p-6 rounded-3xl bg-[#0B1F38] border border-primary-light/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-primary-light" />
                  <span>Smart Volunteer Route & Waypoints</span>
                </h2>
                <p className="text-xs text-[#A7B8CC] mt-0.5">
                  Calculated sequence connecting your current starting position in Adyar to pending pickups & drops.
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="p-2 rounded-xl bg-[#102A46] border border-slate-700 text-primary-light font-bold">
                  Total Waypoints: 4 Stops
                </span>
                <span className="p-2 rounded-xl bg-[#102A46] border border-slate-700 text-accent-green font-bold">
                  Est. 14.2 km (~35 mins)
                </span>
              </div>
            </div>

            <MapComponent height="550px" showRoute={true} />
          </div>
        )}

      </div>
    </div>
  );
}
