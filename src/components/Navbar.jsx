import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Sprout, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Landmark,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { 
    t, 
    isAuthenticated, 
    role, 
    loginAs, 
    logout, 
    currentView, 
    setCurrentView,
    profile 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { label: t('home'), view: 'landing' },
    { label: t('marketPrices'), view: 'market-prices' },
    { label: t('howItWorks'), view: 'landing', anchor: '#how-it-works' },
    { label: t('government'), view: 'government' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    setCurrentView(link.view);
    if (link.anchor) {
      setTimeout(() => {
        const el = document.querySelector(link.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const roleLabels = {
    farmer: { label: t('farmer'), color: 'bg-emerald-600 text-white' },
    buyer: { label: t('buyer'), color: 'bg-blue-600 text-white' },
    fpo: { label: t('fpo'), color: 'bg-purple-600 text-white' },
    admin: { label: t('admin'), color: 'bg-amber-600 text-white' }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Sheti<span className="text-emerald-600">Mitra</span></span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">2026</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide hidden sm:block">
                शेतीमित्र • भारताचा डिजिटल शेतकरी मंच
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentView === link.view && !link.anchor
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSelector />

            {isAuthenticated ? (
              <div className="relative">
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  {/* Switch Demo Role Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-800 transition-colors"
                      title="Switch Demo Role"
                    >
                      <span className={`w-2 h-2 rounded-full ${role === 'farmer' ? 'bg-emerald-500' : role === 'buyer' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                      <span>{roleLabels[role]?.label || role}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>

                    {roleDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
                        <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Demo Switcher
                        </div>
                        <button
                          onClick={() => { loginAs('farmer'); setRoleDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                        >
                          <span>🌾 {t('farmerDemo')}</span>
                          {role === 'farmer' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                        </button>
                        <button
                          onClick={() => { loginAs('buyer'); setRoleDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                        >
                          <span>🏢 {t('buyerDemo')}</span>
                          {role === 'buyer' && <ShieldCheck className="w-4 h-4 text-blue-600" />}
                        </button>
                        <button
                          onClick={() => { loginAs('fpo'); setRoleDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between"
                        >
                          <span>👥 {t('fpoDemo')}</span>
                          {role === 'fpo' && <ShieldCheck className="w-4 h-4 text-purple-600" />}
                        </button>
                        <button
                          onClick={() => { loginAs('admin'); setRoleDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                        >
                          <span>⚖️ {t('adminDemo')}</span>
                          {role === 'admin' && <ShieldCheck className="w-4 h-4 text-amber-600" />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dashboard link button */}
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer ${
                      role === 'buyer' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t('dashboard')}</span>
                  </button>

                  {/* Profile avatar */}
                  <button
                    onClick={() => setCurrentView('profile')}
                    className="w-8 h-8 rounded-full overflow-hidden border border-emerald-300 hover:ring-2 hover:ring-emerald-400 transition-all"
                    title={profile.name}
                  >
                    <img src={profile.avatar} alt="User" className="w-full h-full object-cover" />
                  </button>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title={t('logout')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 rounded-xl transition-all"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => loginAs('farmer')}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('getStarted')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <img src={profile.avatar} alt="User" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">{profile.name}</div>
                      <div className="text-xs text-emerald-700 font-medium capitalize">{role}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    {t('dashboard')}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => { loginAs('farmer'); setMobileMenuOpen(false); }}
                    className={`p-2 rounded-lg border text-xs font-bold text-center ${role === 'farmer' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-50 border-gray-200'}`}
                  >
                    🌾 Farmer Demo
                  </button>
                  <button
                    onClick={() => { loginAs('buyer'); setMobileMenuOpen(false); }}
                    className={`p-2 rounded-lg border text-xs font-bold text-center ${role === 'buyer' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-200'}`}
                  >
                    🏢 Buyer Demo
                  </button>
                </div>

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setCurrentView('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center font-bold text-gray-700 bg-gray-100 rounded-xl"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => { loginAs('farmer'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center font-bold text-white bg-emerald-600 rounded-xl shadow-sm"
                >
                  {t('farmerDemo')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
