import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, UserPlus, Mail, Lock } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // In production, your axios registration post request goes here
    alert(`Account provisioned successfully for ${name}! Redirecting...`);
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
        
        <div className="flex justify-center mb-4">
          <div className="bg-amber-400/10 p-3 rounded-xl border border-amber-400/20 text-amber-400">
            <UserPlus className="h-6 w-6" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-center text-white tracking-tight">Create Free Account</h2>
        <p className="text-slate-400 text-xs text-center mt-1 mb-6">Gain access to national scheduling mocks and live rankings</p>
        
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-1 flex items-center gap-1">
              Full Name
            </label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400 transition" placeholder="Rahul Kumar" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400 transition" placeholder="rahul@gmail.com" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Choose Secret Password</label>
            <input type="password" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400 transition" placeholder="••••••••" />
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>By clicking submit, you unlock 2 complementary full-length trial mocks.</span>
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] transition text-slate-950 font-bold py-3 rounded-lg text-sm shadow-lg shadow-amber-500/10 mt-2">
            Register & Open Dashboard
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already registered? <Link to="/login" className="text-amber-400 hover:underline font-medium">Sign In here</Link>
        </p>
      </div>
    </div>
  );
}