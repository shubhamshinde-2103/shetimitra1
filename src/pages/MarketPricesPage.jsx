import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Scale,
  Calendar,
  MapPin,
  ArrowUpDown,
  Sparkles,
  Info,
  Award,
  Truck
} from 'lucide-react';
import { ActionSubHeader } from '../components/ActionSubHeader';

export const MarketPricesPage = () => {
  const { t, marketPrices, startComparisonForCrop, setCurrentView } = useApp();

  const [activeMarketTab, setActiveMarketTab] = useState('latest'); // 'latest' | 'trends' | 'msp' | 'arrivals'
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const cropsList = ['All', 'Onion', 'Tomato', 'Wheat', 'Soybean', 'Cotton', 'Grapes', 'Pomegranate', 'Maize'];
  const districtsList = ['All', 'Nashik', 'Pune', 'Sangli', 'Solapur', 'Kolhapur', 'Ahilyanagar'];

  const mspRates = [
    { crop: 'Soybean (सोयाबीन)', msp: 4892, marketAvg: 4680, status: 'Mandi below MSP by ₹212' },
    { crop: 'Cotton (कापूस - Medium Staple)', msp: 7121, marketAvg: 7420, status: 'Mandi above MSP by +₹299' },
    { crop: 'Wheat (गहू)', msp: 2275, marketAvg: 2890, status: 'Mandi above MSP by +₹615' },
    { crop: 'Maize (मका)', msp: 2090, marketAvg: 2320, status: 'Mandi above MSP by +₹230' },
    { crop: 'Paddy / Dhan (धान)', msp: 2300, marketAvg: 2450, status: 'Mandi above MSP' },
  ];

  const filteredPrices = marketPrices.filter((mp) => {
    const matchesCrop = selectedCrop === 'All' || mp.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesDistrict = selectedDistrict === 'All' || mp.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      mp.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mp.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mp.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesDistrict && matchesSearch;
  });

  const pricesArray = filteredPrices.map(p => p.modalPrice);
  const highestPrice = pricesArray.length ? Math.max(...pricesArray) : 0;
  const lowestPrice = pricesArray.length ? Math.min(...pricesArray) : 0;
  const avgPrice = pricesArray.length ? Math.round(pricesArray.reduce((a, b) => a + b, 0) / pricesArray.length) : 0;

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('marketPrices')}
        category="Market Intelligence"
        relatedLinks={[
          { id: 'compare-markets', label: '⚖️ Compare Markets Calculator' },
          { id: 'ai-insights', label: '🤖 AI Where to Sell' },
          { id: 'find-buyers', label: '🤝 Find Buyers' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('todaysPrices')}
          </h1>
          <p className="text-sm text-gray-500">
            Real-time APMC auction rates, daily arrivals, MSP support benchmarks, and price trends
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            Cards View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Sub Feature Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200">
        <button
          onClick={() => setActiveMarketTab('latest')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMarketTab === 'latest' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Latest APMC Prices
        </button>
        <button
          onClick={() => setActiveMarketTab('trends')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMarketTab === 'trends' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Price Trends (तेजी-मंदी)
        </button>
        <button
          onClick={() => setCurrentView('compare-markets')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Scale className="w-3.5 h-3.5 text-amber-700" />
          <span>Compare Markets Calculator</span>
        </button>
        <button
          onClick={() => setActiveMarketTab('msp')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMarketTab === 'msp' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          MSP Reference Rates
        </button>
        <button
          onClick={() => setActiveMarketTab('arrivals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMarketTab === 'arrivals' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Market Arrivals Tracker
        </button>
      </div>

      {/* MSP Section */}
      {activeMarketTab === 'msp' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-black text-gray-900">Minimum Support Price (MSP) 2026-27</h3>
              <p className="text-xs text-gray-500">Government assured baseline rates vs actual APMC spot auction prices</p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Cabinet Committee on Economic Affairs (CCEA)
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mspRates.map((m, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs">
                <div className="font-black text-sm text-gray-900">{m.crop}</div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Govt MSP Rate:</span>
                  <strong className="text-emerald-800 text-base font-black">₹{m.msp.toLocaleString()}/q</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Mandi Spot Avg:</span>
                  <strong className="text-gray-900">₹{m.marketAvg.toLocaleString()}/q</strong>
                </div>
                <div className="pt-2 border-t border-gray-200/60 font-bold text-[11px] text-emerald-700">
                  {m.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t('highestPrice')}</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">₹{highestPrice.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Peak APMC Rate</span>
        </div>

        <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">{t('averagePrice')}</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">₹{avgPrice.toLocaleString()}</div>
          <span className="text-[11px] text-blue-700 font-semibold">State Modal Average</span>
        </div>

        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{t('lowestPrice')}</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">₹{lowestPrice.toLocaleString()}</div>
          <span className="text-[11px] text-amber-700 font-semibold">Floor Mandi Rate</span>
        </div>

        <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200">
          <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">{t('priceTrend')}</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-950 mt-1 flex items-center gap-1">
            <span>+4.2%</span>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-[11px] text-purple-700 font-semibold">Upward demand curve</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search market, crop, or district..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Crop filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="All">All Crops (सर्व पिके)</option>
              {cropsList.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* District filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="All">All Districts (सर्व जिल्हे)</option>
              {districtsList.filter(d => d !== 'All').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Crop Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-gray-400 font-bold shrink-0">Quick Filter:</span>
          {cropsList.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                selectedCrop === c
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.map((mp) => (
            <div
              key={mp.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                      {mp.crop}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">({mp.cropMr})</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    mp.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {mp.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{mp.change}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{mp.district} District</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mt-0.5">{mp.market} APMC</h3>
                </div>

                <div className="mt-4 bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-gray-500">{t('modalPrice')}</span>
                    <div className="text-2xl font-black text-emerald-700">
                      ₹{mp.modalPrice.toLocaleString()}<span className="text-xs font-normal text-gray-500">{t('perQuintal')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60 text-[11px] font-semibold text-gray-600">
                    <div>Min: <strong className="text-gray-900">₹{mp.minPrice}</strong></div>
                    <div className="text-right">Max: <strong className="text-gray-900">₹{mp.maxPrice}</strong></div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-medium px-1">
                  <span>{t('arrivals')}: <strong className="text-gray-800">{mp.arrivals.toLocaleString()} q</strong></span>
                  <span>{mp.date}</span>
                </div>
              </div>

              <button
                onClick={() => startComparisonForCrop(mp.crop)}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs rounded-xl border border-emerald-200 hover:border-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t('compareThis')}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-50/70 border-b border-emerald-100 text-emerald-950 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Crop</th>
                  <th className="px-6 py-3.5">Mandi / APMC</th>
                  <th className="px-6 py-3.5">District</th>
                  <th className="px-6 py-3.5">Modal Price (₹/q)</th>
                  <th className="px-6 py-3.5">Price Range</th>
                  <th className="px-6 py-3.5">Arrivals</th>
                  <th className="px-6 py-3.5">Trend</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredPrices.map((mp) => (
                  <tr key={mp.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{mp.crop}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{mp.market}</td>
                    <td className="px-6 py-4 text-gray-500">{mp.district}</td>
                    <td className="px-6 py-4 font-black text-emerald-700 text-sm">₹{mp.modalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500">₹{mp.minPrice} - ₹{mp.maxPrice}</td>
                    <td className="px-6 py-4">{mp.arrivals.toLocaleString()} q</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        mp.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {mp.trend === 'up' ? '↑' : '↓'} {mp.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => startComparisonForCrop(mp.crop)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors"
                      >
                        Compare
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
