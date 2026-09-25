import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  Scale,
  Users,
  PlusCircle,
  Tag,
  ShoppingBag,
  Truck,
  Warehouse,
  IndianRupee,
  AlertCircle,
  Sparkles,
  Landmark,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { 
    t, 
    currentView, 
    setCurrentView, 
    offers, 
    sales, 
    logout,
    profile,
    role,
    loginAs,
    buyerActiveTab,
    setBuyerActiveTab,
    lots
  } = useApp();

  const pendingOffersCount = offers.filter(o => o.status === 'pending').length;
  const pendingSalesCount = sales.filter(s => s.status === 'pending').length;

  const farmerMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'crops', label: t('myCrops'), icon: Sprout },
    { id: 'market-prices', label: t('marketPrices'), icon: TrendingUp },
    { 
      id: 'compare-markets', 
      label: t('compareMarkets'), 
      icon: Scale, 
      highlight: true, 
      badge: 'ROI' 
    },
    { id: 'find-buyers', label: t('findBuyers'), icon: Users },
    { 
      id: 'create-lot', 
      label: t('createLot'), 
      icon: PlusCircle, 
      special: true 
    },
    { 
      id: 'my-offers', 
      label: t('myOffers'), 
      icon: Tag, 
      count: pendingOffersCount 
    },
    { 
      id: 'my-sales', 
      label: t('mySales'), 
      icon: ShoppingBag, 
      count: pendingSalesCount 
    },
    { id: 'transport', label: t('transport'), icon: Truck },
    { id: 'storage', label: t('storage'), icon: Warehouse },
    { id: 'payments', label: t('payments'), icon: IndianRupee },
    { id: 'grievances', label: t('grievances'), icon: AlertCircle },
    { 
      id: 'ai-insights', 
      label: t('aiInsights'), 
      icon: Sparkles, 
      aiBadge: true 
    },
    { id: 'government', label: t('government'), icon: Landmark },
    { id: 'profile', label: t('profile'), icon: User },
  ];

  const buyerMenuItems = [
    { id: 'buyer-overview', tab: 'browse-lots', label: 'Buyer Action Center', icon: LayoutDashboard },
    { id: 'buyer-lots', tab: 'browse-lots', label: 'Browse Farmer Lots', icon: PlusCircle, badge: `${lots.length} Lots`, special: true },
    { id: 'buyer-post-req', tab: 'post-req', label: 'Post Requirement', icon: TrendingUp },
    { id: 'buyer-offers', tab: 'make-offer', label: 'Make Offer / Sent Bids', icon: Tag, count: offers.length },
    { id: 'buyer-purchases', tab: 'my-purchases', label: 'My Purchases', icon: ShoppingBag, count: sales.length },
    { id: 'buyer-payments', tab: 'payments', label: 'Escrow & Payments', icon: IndianRupee },
    { id: 'transport', label: 'Logistics Fleet', icon: Truck },
    { id: 'government', label: 'APMC Compliance', icon: Landmark },
    { id: 'profile', label: 'Buyer Profile', icon: User },
  ];

  const handleSelect = (item) => {
    if (role === 'buyer') {
      if (item.tab) {
        setBuyerActiveTab(item.tab);
        setCurrentView('dashboard');
      } else {
        setCurrentView(item.id);
      }
    } else {
      setCurrentView(item.id);
    }
    if (setMobileOpen) setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBuyer = role === 'buyer';
  const menuItems = isBuyer ? buyerMenuItems : farmerMenuItems;

  const content = (
    <div className={`flex flex-col h-full bg-white border-r shadow-xs ${isBuyer ? 'border-blue-100' : 'border-emerald-100'}`}>
      {/* Profile snippet header */}
      <div className={`p-4 border-b ${isBuyer ? 'border-blue-100/60 bg-gradient-to-br from-blue-50/70 to-indigo-50/30' : 'border-emerald-100/60 bg-gradient-to-br from-emerald-50/70 to-green-50/30'}`}>
        <div 
          onClick={() => { setCurrentView('profile'); if (setMobileOpen) setMobileOpen(false); }} 
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-all border border-transparent ${isBuyer ? 'hover:border-blue-200' : 'hover:border-emerald-200'}`}
        >
          {isBuyer ? (
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-black ring-2 ring-blue-400 shadow-xs text-base">
              ABC
            </div>
          ) : (
            <img 
              src={profile.avatar} 
              alt="Farmer avatar" 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500 shadow-xs" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 truncate">
              {isBuyer ? 'ABC Foods Pvt Ltd' : profile.name}
            </h4>
            <p className={`text-xs font-medium truncate flex items-center gap-1 ${isBuyer ? 'text-blue-800' : 'text-emerald-800'}`}>
              <span>{isBuyer ? '🏢 Food Processor • Nashik' : `📍 ${profile.village}, ${profile.district}`}</span>
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={`px-3 pb-1 text-[11px] font-extrabold uppercase tracking-wider ${isBuyer ? 'text-blue-900/60' : 'text-emerald-900/60'}`}>
          {isBuyer ? 'Merchant / Buyer Portal' : `${t('farmer')} Portal`}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isBuyer 
            ? (currentView === 'dashboard' && item.tab === buyerActiveTab) || currentView === item.id
            : currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? isBuyer
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : item.special
                  ? isBuyer
                    ? 'bg-blue-50/70 text-blue-900 hover:bg-blue-100 border border-blue-200'
                    : 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  : item.highlight
                  ? 'text-emerald-950 hover:bg-emerald-50 font-extrabold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${
                  isActive 
                    ? 'text-white' 
                    : item.special 
                    ? isBuyer ? 'text-blue-600' : 'text-emerald-600'
                    : item.aiBadge 
                    ? 'text-purple-600' 
                    : 'text-gray-500'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    isActive ? 'bg-white text-gray-900' : 'bg-amber-500 text-white animate-pulse'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                    isBuyer 
                      ? 'bg-blue-100 text-blue-900 border-blue-300' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.aiBadge && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-700 border border-purple-200">
                    AI
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Quick Portal Switcher */}
        <div className="pt-3 mt-2 border-t border-gray-100">
          <button
            onClick={() => loginAs(isBuyer ? 'farmer' : 'buyer')}
            className={`w-full p-2.5 rounded-xl border text-xs font-bold text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isBuyer 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <span>{isBuyer ? '🌾 Switch to Farmer Portal' : '🏢 Switch to Merchant Portal'}</span>
          </button>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className={`p-3 border-t bg-gray-50/50 ${isBuyer ? 'border-blue-100' : 'border-emerald-100'}`}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-[calc(100vh-5rem)] sticky top-20 overflow-hidden">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
