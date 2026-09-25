import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyCropsPage } from './pages/MyCropsPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { CompareMarketsPage } from './pages/CompareMarketsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { FindBuyersPage } from './pages/FindBuyersPage';
import { CreateLotPage } from './pages/CreateLotPage';
import { MyOffersPage } from './pages/MyOffersPage';
import { MySalesPage } from './pages/MySalesPage';
import { TransportPage } from './pages/TransportPage';
import { StoragePage } from './pages/StoragePage';
import { PaymentsPage } from './pages/PaymentsPage';
import { GrievancesPage } from './pages/GrievancesPage';
import { GovernmentPage } from './pages/GovernmentPage';
import { ProfilePage } from './pages/ProfilePage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { FPODashboardPage } from './pages/FPODashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import {
  LayoutDashboard,
  Sprout,
  Scale,
  Tag,
  Menu,
  Sparkles
} from 'lucide-react';

const MainLayout = () => {
  const { currentView, setCurrentView, isAuthenticated, offers, role } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOffersCount = offers.filter(o => o.status === 'pending').length;

  // Non-authenticated standalone pages
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <LoginPage />
        </main>
      </div>
    );
  }

  // Authenticated Portal Views
  const renderView = () => {
    if (currentView === 'dashboard') {
      if (role === 'buyer') return <BuyerDashboardPage />;
      if (role === 'fpo') return <FPODashboardPage />;
      if (role === 'admin') return <AdminDashboardPage />;
      return <DashboardPage />;
    }

    switch (currentView) {
      case 'buyer-dashboard':
        return <BuyerDashboardPage />;
      case 'fpo-dashboard':
        return <FPODashboardPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'crops':
        return <MyCropsPage />;
      case 'market-prices':
        return <MarketPricesPage />;
      case 'compare-markets':
        return <CompareMarketsPage />;
      case 'ai-insights':
        return <AIInsightsPage />;
      case 'find-buyers':
        return <FindBuyersPage />;
      case 'create-lot':
        return <CreateLotPage />;
      case 'my-offers':
        return <MyOffersPage />;
      case 'my-sales':
        return <MySalesPage />;
      case 'transport':
        return <TransportPage />;
      case 'storage':
        return <StoragePage />;
      case 'payments':
        return <PaymentsPage />;
      case 'grievances':
        return <GrievancesPage />;
      case 'government':
        return <GovernmentPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return role === 'buyer' ? <BuyerDashboardPage /> : <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 lg:pb-0">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar
            mobileOpen={mobileSidebarOpen}
            setMobileOpen={setMobileSidebarOpen}
          />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {renderView()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Quick Navigation Bar for Easy Thumb Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentView === 'dashboard' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentView('crops')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentView === 'crops' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <Sprout className="w-5 h-5" />
          <span>Crops</span>
        </button>

        <button
          onClick={() => setCurrentView('compare-markets')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentView === 'compare-markets' ? 'text-emerald-700 font-extrabold' : 'text-gray-500'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center -mt-4 shadow-md shadow-emerald-600/30">
            <Scale className="w-4 h-4" />
          </div>
          <span>Compare</span>
        </button>

        <button
          onClick={() => setCurrentView('my-offers')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold relative ${
            currentView === 'my-offers' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span>Offers</span>
          {pendingOffersCount > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
              {pendingOffersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-emerald-700"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
      <Toast />
    </AppProvider>
  );
}
