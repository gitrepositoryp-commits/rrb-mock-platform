import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, GraduationCap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
            <LogIn className="h-6 w-6" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-center text-white tracking-tight">Welcome back, Aspirant</h2>
        <p className="text-slate-400 text-xs text-center mt-1 mb-6">Enter your credentials to enter the simulation exam zone</p>
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Registered Email Address</label>
            <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="student@rrbprep.in" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Account Password</label>
            <input type="password" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition text-white font-bold py-3 rounded-lg text-sm shadow-lg shadow-blue-500/20 mt-2">
            Secure Sign In
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          New to the portal? <Link to="/signup" className="text-amber-400 hover:underline font-medium">Create a profile profile</Link>
        </p>
      </div>
    </div>
  );
}