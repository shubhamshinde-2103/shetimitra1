import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  Sparkles,
  MapPin,
  Truck,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const CompareMarketsPage = () => {
  const { 
    t, 
    comparisonParams, 
    setComparisonParams, 
    setCurrentView, 
    createLot, 
    addToast 
  } = useApp();

  const [crop, setCrop] = useState(comparisonParams?.crop || 'Onion');
  const [quantity, setQuantity] = useState(comparisonParams?.quantity || 100);
  const [location, setLocation] = useState(comparisonParams?.farmerLocation || 'Dindori, Nashik');
  const [showFormula, setShowFormula] = useState(false);

  const cropOptions = [
    { name: 'Onion', nameMr: 'कांदा', basePrice: 3250 },
    { name: 'Tomato', nameMr: 'टोमॅटो', basePrice: 2600 },
    { name: 'Wheat', nameMr: 'गहू', basePrice: 2900 },
    { name: 'Soybean', nameMr: 'सोयाबीन', basePrice: 4700 },
    { name: 'Cotton', nameMr: 'कापूस', basePrice: 7400 },
    { name: 'Grapes', nameMr: 'द्राक्षे', basePrice: 6800 },
    { name: 'Pomegranate', nameMr: 'डाळिंब', basePrice: 11000 },
    { name: 'Maize', nameMr: 'मका', basePrice: 2300 }
  ];

  // Mandi database with realistic parameters relative to Dindori/Nashik
  const mandis = [
    {
      id: 'lasalgaon',
      name: 'Lasalgaon APMC',
      nameMr: 'लासलगाव बाजार समिती',
      district: 'Nashik',
      priceMultiplier: 1.0, // Benchmark
      distanceKm: 42,
      transportBase: 1200,
      transportPerKm: 14,
      mandiFeeRate: 0.01,
      demand: 'Very High (Exporters & North India Buyers)',
      isRecommended: true,
      badgeText: '⭐ Recommended Market - Best Estimated Net Return'
    },
    {
      id: 'nashik',
      name: 'Nashik City APMC',
      nameMr: 'नाशिक शहर बाजार समिती',
      district: 'Nashik',
      priceMultiplier: 0.954, // ₹3,100 vs ₹3,250
      distanceKm: 28,
      transportBase: 800,
      transportPerKm: 12,
      mandiFeeRate: 0.01,
      demand: 'Moderate Local Retail Demand',
      isRecommended: false
    },
    {
      id: 'pune',
      name: 'Pune Gultekdi APMC',
      nameMr: 'पुणे गुलटेकडी बाजार समिती',
      district: 'Pune',
      priceMultiplier: 0.923, // ₹3,000 vs ₹3,250
      distanceKm: 165,
      transportBase: 2500,
      transportPerKm: 12,
      mandiFeeRate: 0.012,
      demand: 'High Consumer Volume, Saturated Arrivals',
      isRecommended: false
    },
    {
      id: 'sangli',
      name: 'Sangli Vasantdada APMC',
      nameMr: 'सांगली बाजार समिती',
      district: 'Sangli',
      priceMultiplier: 0.969, // ₹3,150
      distanceKm: 280,
      transportBase: 4200,
      transportPerKm: 13,
      mandiFeeRate: 0.01,
      demand: 'South Maharashtra & Karnataka Gateway',
      isRecommended: false
    },
    {
      id: 'solapur',
      name: 'Solapur APMC',
      nameMr: 'सोलापूर बाजार समिती',
      district: 'Solapur',
      priceMultiplier: 0.892, // ₹2,900
      distanceKm: 320,
      transportBase: 4800,
      transportPerKm: 13,
      mandiFeeRate: 0.01,
      demand: 'Local Industrial Processing',
      isRecommended: false
    }
  ];

  const currentCropObj = cropOptions.find(c => c.name.toLowerCase() === crop.toLowerCase()) || cropOptions[0];
  const qNum = Number(quantity) || 1;

  // Calculate net returns for each mandi
  const calculatedMandis = mandis.map(mandi => {
    const unitPrice = Math.round(currentCropObj.basePrice * mandi.priceMultiplier);
    const grossIncome = unitPrice * qNum;
    
    // Freight calculation based on distance, quantity brackets (capacity factor)
    const capacityLoads = Math.ceil(qNum / 100); // 1 truck per 100q
    const transportCost = Math.round((mandi.transportBase + (mandi.distanceKm * mandi.transportPerKm)) * capacityLoads);
    const mandiCess = Math.round(grossIncome * mandi.mandiFeeRate);
    const netIncome = grossIncome - transportCost - mandiCess;

    return {
      ...mandi,
      unitPrice,
      grossIncome,
      transportCost,
      mandiCess,
      netIncome
    };
  }).sort((a, b) => b.netIncome - a.netIncome);

  const bestMandi = calculatedMandis[0];
  const worstMandi = calculatedMandis[calculatedMandis.length - 1];
  const profitAdvantage = bestMandi.netIncome - worstMandi.netIncome;

  const handleSellHere = (mandi) => {
    addToast(`Selected ${mandi.name}. Proceeding to Create Lot with prefilled data.`, 'success');
    setComparisonParams({
      crop,
      quantity: qNum,
      farmerLocation: location,
      targetMandi: mandi.name,
      expectedPrice: mandi.unitPrice
    });
    setCurrentView('create-lot');
  };

  return (
    <div className="space-y-8">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title="Compare Markets Calculator"
        category="📈 Market Prices"
        relatedLinks={[
          { id: 'market-prices', label: 'Latest Mandi Prices' },
          { id: 'ai-insights', label: 'AI Where to Sell' },
          { id: 'find-buyers', label: 'Find Verified Buyers' }
        ]}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold">
            <Scale className="w-3.5 h-3.5 text-emerald-300" />
            <span>स्मार्ट बाजारपेठ तुलना • Accurate Net Profit Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {t('compareTitle')}
          </h1>
          <p className="text-emerald-100/90 text-sm max-w-2xl font-medium">
            {t('compareSubtitle')}
          </p>
        </div>

        {/* Highlight badge */}
        <div className="bg-emerald-600/50 border border-emerald-400/40 rounded-2xl p-4 text-center shrink-0">
          <div className="text-xs font-bold text-emerald-200 uppercase">Max Additional Return</div>
          <div className="text-2xl sm:text-3xl font-black text-white">+₹{profitAdvantage.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-200">by choosing {bestMandi.name.split(' ')[0]}</div>
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
            <span>Enter Harvest Details for Comparison</span>
          </h3>
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showFormula ? 'Hide Calculation Formula' : 'View Calculation Formula'}</span>
            {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showFormula && (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1 text-emerald-950 animate-in fade-in">
            <div className="font-bold">Transparent Profit Formula:</div>
            <p><strong>Net Take-Home Cash</strong> = (APMC Modal Price × Quantity) - (Vehicle Freight Cost based on km) - (APMC Mandi Cess 1%)</p>
            <p className="text-gray-600 text-[11px]">Freight incorporates local commercial rates (Tata 407 / Bolero / Eicher per km load factor).</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              {t('selectCrop')}
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
            >
              {cropOptions.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.nameMr})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              {t('enterQuantity')}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
            />
            {/* Quick quantity chips */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] text-gray-400 font-bold">Quick:</span>
              {[25, 50, 80, 100, 200].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuantity(q)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    Number(quantity) === q
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {q}q
                </button>
              ))}
            </div>
          </div>

          {/* Farmer Location */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              {t('farmerLocation')}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dindori, Nashik"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Comparison Results ({calculatedMandis.length} Mandis Evaluated)
          </h2>
          <span className="text-xs text-gray-500 font-semibold">Sorted by Highest Net Income</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatedMandis.map((mandi, idx) => {
            const isTop = idx === 0;

            return (
              <div
                key={mandi.id}
                className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isTop
                    ? 'bg-white border-2 border-emerald-500 shadow-2xl shadow-emerald-600/15 ring-2 ring-emerald-500/20'
                    : 'bg-white border border-gray-200 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Top Recommended Market Header */}
                {isTop && (
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-1.5 -mx-6 -mt-6 mb-5 text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('recommendedMarket')}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Mandi Title & Price */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{mandi.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold">📍 {mandi.district} District ({mandi.distanceKm} km away)</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black text-gray-900">
                        ₹{mandi.unitPrice.toLocaleString()}
                        <span className="text-xs font-semibold text-gray-500">{t('perQuintal')}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Gross: ₹{mandi.grossIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Deductions breakdown */}
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 text-xs font-semibold">
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-gray-400" />
                        <span>{t('transportCost')} ({mandi.distanceKm} km):</span>
                      </span>
                      <span className="text-red-600 font-bold">-₹{mandi.transportCost.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>{t('mandiCess')} (1% fee):</span>
                      <span className="text-red-600 font-bold">-₹{mandi.mandiCess.toLocaleString()}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200/80 flex items-baseline justify-between text-emerald-950 font-black">
                      <span className="text-xs uppercase tracking-wide">{t('netIncome')}:</span>
                      <span className="text-xl font-black text-emerald-700">₹{mandi.netIncome.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Demand reason badge */}
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-gray-700">Market Demand: </span>
                    <span>{mandi.demand}</span>
                  </div>

                  {isTop && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('bestNetReturn')} (+₹{profitAdvantage.toLocaleString()} extra)</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleSellHere(mandi)}
                    className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isTop
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 scale-101'
                        : 'bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 border border-gray-200'
                    }`}
                  >
                    <span>{t('sellHere')}</span>
                    <ArrowRight className="w-4 h-4" />
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
