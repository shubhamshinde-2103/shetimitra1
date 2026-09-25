import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  PlusCircle,
  Tag,
  ShoppingBag,
  TrendingUp,
  Scale,
  Users,
  Truck,
  Warehouse,
  IndianRupee,
  Sparkles,
  Landmark,
  AlertCircle,
  Sun,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  ChevronRight,
  PhoneCall,
  Clock,
  HelpCircle,
  FileText
} from 'lucide-react';

export const DashboardPage = () => {
  const { 
    t, 
    crops, 
    lots, 
    offers, 
    sales, 
    setCurrentView, 
    profile, 
    startComparisonForCrop,
    marketPrices
  } = useApp();

  const activeLots = lots.filter(l => l.status.includes('Active'));
  const pendingOffers = offers.filter(o => o.status === 'pending');
  const pendingSales = sales.filter(s => s.status === 'pending');

  const totalSalesAmount = sales
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + Number(s.totalAmount), 0);

  // The 8 Large Clickable Action Cards
  const actionCards = [
    {
      id: 'sell-my-crop',
      title: t('actionSellMyCrop'),
      desc: t('actionSellMyCropDesc'),
      icon: Sprout,
      emoji: '🌾',
      primaryAction: () => setCurrentView('create-lot'),
      primaryActionLabel: '+ Create Sale Lot',
      badge: `${activeLots.length} Lots Active • ${pendingOffers.length} Bids Waiting`,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      color: 'from-emerald-500/10 via-emerald-50/50 to-white border-emerald-200 hover:border-emerald-500',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      subActions: [
        { label: 'My Standing Crops', id: 'crops' },
        { label: 'Create New Lot', id: 'create-lot', highlight: true },
        { label: `My Offers (${pendingOffers.length})`, id: 'my-offers', count: pendingOffers.length },
        { label: 'Confirmed Sales', id: 'my-sales' }
      ]
    },
    {
      id: 'market-prices',
      title: t('actionMarketPrices'),
      desc: t('actionMarketPricesDesc'),
      icon: TrendingUp,
      emoji: '📈',
      primaryAction: () => setCurrentView('compare-markets'),
      primaryActionLabel: 'Compare Net Mandi Return',
      badge: 'Lasalgaon ₹3,250/q (Peak High)',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      color: 'from-blue-500/10 via-blue-50/50 to-white border-blue-200 hover:border-blue-500',
      iconBg: 'bg-blue-600 text-white shadow-blue-600/30',
      subActions: [
        { label: 'Latest Mandi Prices', id: 'market-prices' },
        { label: 'Price Trends (तेजी-मंदी)', id: 'market-prices' },
        { label: 'Compare Markets Calculator', id: 'compare-markets', highlight: true },
        { label: 'Govt MSP Rates', id: 'market-prices' },
        { label: 'Daily Market Arrivals', id: 'market-prices' }
      ]
    },
    {
      id: 'find-buyers',
      title: t('actionFindBuyers'),
      desc: t('actionFindBuyersDesc'),
      icon: Users,
      emoji: '🤝',
      primaryAction: () => setCurrentView('find-buyers'),
      primaryActionLabel: 'Browse 1,250+ Verified Buyers',
      badge: '100% KYC & Mandi Licensed',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      color: 'from-amber-500/10 via-amber-50/50 to-white border-amber-200 hover:border-amber-500',
      iconBg: 'bg-amber-600 text-white shadow-amber-600/30',
      subActions: [
        { label: 'Verified Buyers Directory', id: 'find-buyers' },
        { label: 'Bulk Buyer Requirements', id: 'find-buyers' },
        { label: 'Send Direct Counter-Offer', id: 'find-buyers', highlight: true }
      ]
    },
    {
      id: 'transport-storage',
      title: t('actionTransportStorage'),
      desc: t('actionTransportStorageDesc'),
      icon: Truck,
      emoji: '🚚',
      primaryAction: () => setCurrentView('transport'),
      primaryActionLabel: 'Book Transport / Shared Pool',
      badge: 'Save ₹1,200 on Shared Freight',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      color: 'from-purple-500/10 via-purple-50/50 to-white border-purple-200 hover:border-purple-500',
      iconBg: 'bg-purple-600 text-white shadow-purple-600/30',
      subActions: [
        { label: 'Book Farmgate Vehicle', id: 'transport' },
        { label: 'Shared Transport (Save ₹)', id: 'transport', highlight: true },
        { label: 'WDRA Cold Storage & Warehouses', id: 'storage' }
      ]
    },
    {
      id: 'payments',
      title: t('actionPayments'),
      desc: t('actionPaymentsDesc'),
      icon: IndianRupee,
      emoji: '💰',
      primaryAction: () => setCurrentView('payments'),
      primaryActionLabel: 'View Bank Settlements',
      badge: '100% Escrow Protection',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      color: 'from-teal-500/10 via-teal-50/50 to-white border-teal-200 hover:border-teal-500',
      iconBg: 'bg-teal-600 text-white shadow-teal-600/30',
      subActions: [
        { label: `Total Earnings: ₹${(totalSalesAmount || 124500).toLocaleString()}`, id: 'payments' },
        { label: 'Pending Payouts', id: 'payments' },
        { label: 'Download Tax Invoices', id: 'payments', highlight: true }
      ]
    },
    {
      id: 'smart-insights',
      title: t('actionSmartInsights'),
      desc: t('actionSmartInsightsDesc'),
      icon: Sparkles,
      emoji: '🤖',
      primaryAction: () => setCurrentView('ai-insights'),
      primaryActionLabel: 'Open AI Decision Tools',
      badge: '88% Algorithm Confidence',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      color: 'from-indigo-500/10 via-indigo-50/50 to-white border-indigo-200 hover:border-indigo-500',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-600/30',
      subActions: [
        { label: 'Where Should I Sell?', id: 'ai-insights', highlight: true },
        { label: '7-Day Price Forecast', id: 'ai-insights' },
        { label: 'What to Sow Next?', id: 'ai-insights' },
        { label: 'Market Pulse & Alerts', id: 'ai-insights' }
      ]
    },
    {
      id: 'government',
      title: t('actionGovernment'),
      desc: t('actionGovernmentDesc'),
      icon: Landmark,
      emoji: '🏛️',
      primaryAction: () => setCurrentView('government'),
      primaryActionLabel: 'Explore Govt Subsidies',
      badge: '₹1 Fasal Bima Active',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      color: 'from-rose-500/10 via-rose-50/50 to-white border-rose-200 hover:border-rose-500',
      iconBg: 'bg-rose-600 text-white shadow-rose-600/30',
      subActions: [
        { label: 'PM-KISAN ₹6,000 Installment', id: 'government' },
        { label: '₹1 Crop Insurance (PMFBY)', id: 'government', highlight: true },
        { label: 'Solar Pump (KUSUM) 95% Subsidy', id: 'government' },
        { label: 'MahaDBT Application Guides', id: 'government' }
      ]
    },
    {
      id: 'help-grievances',
      title: t('actionHelpGrievances'),
      desc: t('actionHelpGrievancesDesc'),
      icon: AlertCircle,
      emoji: '⚠️',
      primaryAction: () => setCurrentView('grievances'),
      primaryActionLabel: 'File Grievance / Get Support',
      badge: 'APMC Officer Assigned',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
      color: 'from-orange-500/10 via-orange-50/50 to-white border-orange-200 hover:border-orange-500',
      iconBg: 'bg-orange-600 text-white shadow-orange-600/30',
      subActions: [
        { label: 'Raise Mandi Dispute', id: 'grievances', highlight: true },
        { label: 'Track Dispute Status', id: 'grievances' },
        { label: 'Kisan Helpline: 1800-180-1551', id: 'grievances' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Greeting & Weather Widget Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/70 text-emerald-200 text-xs font-bold border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Digital Farmer Action Center • शेतीमित्र कृती केंद्र</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {t('greeting')} {profile.name.split(' ')[0]}ji
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl font-medium">
            📍 {profile.village}, {profile.district} • {profile.landHolding} Land • KCC & Aadhaar DBT Active
          </p>
        </div>

        {/* Weather & Market conditions */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
            <Sun className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">29°C</span>
              <span className="text-xs text-emerald-200 font-semibold">Nashik Mandi Zone</span>
            </div>
            <p className="text-xs text-emerald-100">Sunny • High Arrivals in Lasalgaon & Pune</p>
          </div>
        </div>
      </div>

      {/* Selling Alert Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/60 to-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  {t('recommendationTitle')}
                </span>
                <span className="text-xs font-semibold text-gray-500">Live APMC Alert</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
                {t('recommendationText')}
              </h3>
              <p className="text-xs text-gray-600">
                Lasalgaon price is <strong>₹3,250/q</strong> vs ₹2,950/q in Pune. Net advantage of approx <strong>+₹27,700</strong> on your 80 quintal lot!
              </p>
            </div>
          </div>

          <button
            onClick={() => startComparisonForCrop('Onion', 80)}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>{t('compareMarketsBtn')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main "What do you want to do today?" Action Hub Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
              <span>{t('whatToDoToday')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {t('actionHubSubtitle')}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            8 Direct Action Cards
          </span>
        </div>

        {/* 8 Big Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {actionCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 sm:p-7 border-2 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 hover:-translate-y-0.5`}
              >
                {/* Card Top Strip */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0 ${card.iconBg}`}>
                        <span>{card.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                          {card.title}
                        </h3>
                        <span className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border mt-1 ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Sub Actions Buttons */}
                <div className="space-y-3 pt-3 border-t border-gray-200/60">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    Quick Actions / वैशिष्ट्ये:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.subActions.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentView(sub.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          sub.highlight
                            ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 scale-101'
                            : 'bg-white hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 border border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {sub.count > 0 && (
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center">
                            {sub.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Primary card action */}
                  <button
                    onClick={card.primaryAction}
                    className="w-full mt-2 py-3.5 bg-gray-900 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>{card.primaryActionLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
