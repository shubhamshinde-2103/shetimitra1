import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Building2, 
  Users, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Phone, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const LoginPage = () => {
  const { t, loginAs, addToast, setCurrentView } = useApp();
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [phone, setPhone] = useState('9822076543');
  const [password, setPassword] = useState('kisan123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const roles = [
    {
      id: 'farmer',
      title: t('farmer'),
      subtitle: 'शेतकरी / किसान',
      desc: 'List crops, compare mandis, get offers, book transport',
      icon: Sprout,
      color: 'emerald',
      demoPhone: '9822076543',
      demoName: 'Ramesh Patil (Nashik)'
    },
    {
      id: 'buyer',
      title: t('buyer'),
      subtitle: 'खरेदीदार / व्यापारी',
      desc: 'Source quality farm lots directly, send buying offers',
      icon: Building2,
      color: 'blue',
      demoPhone: '9822054321',
      demoName: 'ABC Foods Pvt Ltd'
    },
    {
      id: 'fpo',
      title: t('fpo'),
      subtitle: 'उत्पादक संस्था (FPO)',
      desc: 'Aggregate farmer lots, bulk supply contracts',
      icon: Users,
      color: 'purple',
      demoPhone: '9765432109',
      demoName: 'Sahyadri Bio-Farms FPO'
    },
    {
      id: 'admin',
      title: t('admin'),
      subtitle: 'प्रशासक (APMC)',
      desc: 'Monitor mandi auctions, verify buyers, settle grievances',
      icon: ShieldCheck,
      color: 'amber',
      demoPhone: '9422001122',
      demoName: 'Maharashtra APMC Board'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const found = roles.find(r => r.id === roleId);
    if (found) {
      setPhone(found.demoPhone);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!password || password.length < 4) {
      addToast('Please enter your password', 'error');
      return;
    }
    loginAs(selectedRole);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-emerald-50/40 via-white to-gray-50">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fast Hackathon Authentication</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Welcome to ShetiMitra
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Select your role to access your personalized agriculture portal
          </p>
        </div>

        {/* 1-Click Fast Role Selection / Login Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5 border border-emerald-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-700/60 pb-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fast Role Selection</span>
              <h3 className="text-xl font-black text-white">Choose Your Portal to Enter</h3>
            </div>
            <span className="text-xs text-gray-300">Click below for instant 1-click demo login</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Option 1: Farmer */}
            <div 
              onClick={() => { setSelectedRole('farmer'); setPhone('9822076543'); }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedRole === 'farmer' 
                  ? 'bg-emerald-900/90 border-emerald-400 shadow-lg shadow-emerald-900/50 scale-[1.01]' 
                  : 'bg-emerald-950/40 border-emerald-800/50 hover:bg-emerald-900/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  शेतकरी
                </span>
              </div>
              <h4 className="text-lg font-black text-white">🌾 Farmer Portal</h4>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                Sell harvested crops, check live mandi prices, get AI "Where Should I Sell?" advice, and book transport.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300">Demo: Ramesh Patil</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); loginAs('farmer'); }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>1-Click Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Option 2: Merchant / Buyer */}
            <div 
              onClick={() => { setSelectedRole('buyer'); setPhone('9822054321'); }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedRole === 'buyer' 
                  ? 'bg-blue-900/90 border-blue-400 shadow-lg shadow-blue-900/50 scale-[1.01]' 
                  : 'bg-blue-950/40 border-blue-800/50 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40">
                  खरेदीदार / व्यापारी
                </span>
              </div>
              <h4 className="text-lg font-black text-white">🏢 Merchant / Buyer Portal</h4>
              <p className="text-xs text-blue-200 mt-1 leading-relaxed">
                Browse farmer lots, post bulk requirements, make instant price offers, track purchases, and manage escrow payments.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-300">Demo: ABC Foods Pvt Ltd</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); loginAs('buyer'); }}
                  className="px-4 py-2 bg-blue-400 hover:bg-blue-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>1-Click Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Role Selector & Login Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 space-y-8">
          <div>
            <label className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-3">
              1. Choose User Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md scale-101'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="font-bold text-sm text-gray-900">{r.title}</div>
                    <div className="text-xs text-gray-500 font-medium">{r.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Registered Mobile Number (मोबाईल क्रमांक)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password / Passcode (पासवर्ड)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-600 font-medium">Remember on this device</span>
              </label>
              <button
                type="button"
                onClick={() => addToast('Demo Passcode: kisan123', 'info')}
                className="font-bold text-emerald-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-4 text-white font-extrabold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'buyer' 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25' 
                    : selectedRole === 'purple' 
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/25' 
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                }`}
              >
                <span>Login to {roles.find(r => r.id === selectedRole)?.title} Portal</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
