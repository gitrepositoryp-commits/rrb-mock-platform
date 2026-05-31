import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-amber-400 mb-2">RRB ASPIRANT PORTAL</h1>
        <p className="text-slate-400 text-sm mb-8">Welcome back, Candidate! Select an online practice set below to begin.</p>
        
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex justify-between items-center shadow-xl">
          <div>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Live Exam</span>
            <h3 className="text-xl font-bold mt-2 text-white">RRB NTPC Stage-1 Full Length Mock Test</h3>
            <p className="text-slate-400 text-xs mt-1">90 Minutes Duration • 100 Questions • TCS iON Interface Simulation Mode</p>
          </div>
          <Link to="/exam/1" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition shadow-lg shadow-blue-950">
            Launch Test Console
          </Link>
        </div>
      </div>
    </div>
  );
}