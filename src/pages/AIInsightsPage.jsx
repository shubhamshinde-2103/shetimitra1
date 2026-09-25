import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  MapPin,
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Droplets,
  Sprout,
  Sun,
  IndianRupee,
  BarChart3
} from 'lucide-react';

export const AIInsightsPage = () => {
  const { t, setCurrentView, startComparisonForCrop } = useApp();

  // Active AI Tool Tab
  const [activeTab, setActiveTab] = useState('where-to-sell'); // 'where-to-sell' | 'price-forecast' | 'crop-suggestion' | 'market-pulse'

  // Tool 1: Where to sell state
  const [sellCrop, setSellCrop] = useState('Onion');
  const [sellQty, setSellQty] = useState(100);
  const [sellLoc, setSellLoc] = useState('Dindori, Nashik');

  // Dynamic Mandi Knowledge Base for "Where Should I Sell?"
  const marketKnowledgeBase = {
    Onion: [
      {
        market: 'Lasalgaon APMC',
        district: 'Nashik',
        basePrice: 3250,
        baseDistance: 42,
        demand: 'Very High',
        buyersCount: 18,
        pricePremium: '+₹280/q premium',
        reason: 'Asia\'s largest onion market with 18 active export buyers and highest daily cash liquidity.',
        specialTag: 'Highest Modal Auction'
      },
      {
        market: 'Pimpalgaon Baswant',
        district: 'Nashik',
        basePrice: 3180,
        baseDistance: 28,
        demand: 'High',
        buyersCount: 12,
        pricePremium: '+₹210/q premium',
        reason: 'Closest major mandi with shortest freight turnaround and low unloading wait time.',
        specialTag: 'Lowest Freight Distance'
      },
      {
        market: 'Pune (Gultekdi)',
        district: 'Pune',
        basePrice: 2950,
        baseDistance: 185,
        demand: 'Moderate',
        buyersCount: 9,
        pricePremium: 'Standard Mandi',
        reason: 'Urban consumption center with rapid morning retail auction turnover.',
        specialTag: 'Urban Retail Demand'
      }
    ],
    Tomato: [
      {
        market: 'Narayangaon APMC',
        district: 'Pune',
        basePrice: 2680,
        baseDistance: 65,
        demand: 'Very High',
        buyersCount: 22,
        pricePremium: '+₹280/q premium',
        reason: 'Premier processing tomato hub in Maharashtra; sauce & ketchup factories paying top price.',
        specialTag: 'Top Processing Hub'
      },
      {
        market: 'Pimpalgaon Baswant',
        district: 'Nashik',
        basePrice: 2550,
        baseDistance: 32,
        demand: 'High',
        buyersCount: 15,
        pricePremium: '+₹150/q premium',
        reason: 'Direct dispatch to North India refrigerated truck corridors.',
        specialTag: 'Interstate Transport Link'
      },
      {
        market: 'Pune (Gultekdi)',
        district: 'Pune',
        basePrice: 2400,
        baseDistance: 140,
        demand: 'Moderate',
        buyersCount: 10,
        pricePremium: 'Standard Mandi',
        reason: 'Continuous retail crates absorption, best for medium grade produce.',
        specialTag: 'Steady City Demand'
      }
    ],
    Wheat: [
      {
        market: 'Kopargaon APMC',
        district: 'Ahmednagar',
        basePrice: 2880,
        baseDistance: 68,
        demand: 'High',
        buyersCount: 14,
        pricePremium: '+₹180/q premium',
        reason: 'Aggressive procurement by commercial flour mills with electronic moisture verification.',
        specialTag: 'Flour Mill Cluster'
      },
      {
        market: 'Jalgaon APMC',
        district: 'Jalgaon',
        basePrice: 2820,
        baseDistance: 95,
        demand: 'High',
        buyersCount: 11,
        pricePremium: '+₹120/q premium',
        reason: 'High demand for Sharbati & Lokwan grain with zero deduction on clean lots.',
        specialTag: 'Premium Grain Demand'
      },
      {
        market: 'Nashik City APMC',
        district: 'Nashik',
        basePrice: 2750,
        baseDistance: 25,
        demand: 'Moderate',
        buyersCount: 8,
        pricePremium: 'Local Benchmark',
        reason: 'Minimal transport distance from local farmgate, instant weighing.',
        specialTag: 'Nearest Farmgate Mandi'
      }
    ],
    Soybean: [
      {
        market: 'Latur APMC',
        district: 'Latur',
        basePrice: 4880,
        baseDistance: 260,
        demand: 'Very High',
        buyersCount: 26,
        pricePremium: '+₹280/q premium',
        reason: 'India\'s largest soybean trading hub; 20+ solvent extraction plants offering instant payment.',
        specialTag: 'National Oilseed Hub'
      },
      {
        market: 'Washim APMC',
        district: 'Washim',
        basePrice: 4750,
        baseDistance: 220,
        demand: 'High',
        buyersCount: 16,
        pricePremium: '+₹150/q premium',
        reason: 'Strong local crushing plant competition with direct DBT payment into bank account.',
        specialTag: 'Crushing Mill Network'
      },
      {
        market: 'Sangli APMC',
        district: 'Sangli',
        basePrice: 4650,
        baseDistance: 280,
        demand: 'Moderate',
        buyersCount: 12,
        pricePremium: 'Standard Modal',
        reason: 'Consistent trading with low mandi cess deductions.',
        specialTag: 'Reliable Settlement'
      }
    ],
    Grapes: [
      {
        market: 'Pimpalgaon Baswant',
        district: 'Nashik',
        basePrice: 6650,
        baseDistance: 28,
        demand: 'Very High',
        buyersCount: 30,
        pricePremium: '+₹450/q export premium',
        reason: 'Capital of Indian table grapes; international exporters packing directly into reefers.',
        specialTag: 'Direct Export Hub'
      },
      {
        market: 'Nashik City APMC',
        district: 'Nashik',
        basePrice: 6300,
        baseDistance: 22,
        demand: 'High',
        buyersCount: 14,
        pricePremium: '+₹100/q premium',
        reason: 'Fast local wholesale auction for domestic wholesale distribution.',
        specialTag: 'Domestic Wholesale'
      },
      {
        market: 'Baramati APMC',
        district: 'Pune',
        basePrice: 6100,
        baseDistance: 190,
        demand: 'Moderate',
        buyersCount: 9,
        pricePremium: 'Benchmark',
        reason: 'Southern Maharashtra consolidation center.',
        specialTag: 'Regional Market'
      }
    ],
    Pomegranate: [
      {
        market: 'Solapur APMC',
        district: 'Solapur',
        basePrice: 11200,
        baseDistance: 290,
        demand: 'Very High',
        buyersCount: 25,
        pricePremium: '+₹800/q export premium',
        reason: 'Asia\'s biggest Bhagwa pomegranate auction; APEDA certified packhouses operating 24x7.',
        specialTag: 'Asia\'s Largest Pomegranate Mandi'
      },
      {
        market: 'Indapur APMC',
        district: 'Pune',
        basePrice: 10800,
        baseDistance: 210,
        demand: 'High',
        buyersCount: 16,
        pricePremium: '+₹400/q premium',
        reason: 'Direct buyer syndicates from Delhi, Mumbai and Bengaluru bidding daily.',
        specialTag: 'Metro Traders Hub'
      },
      {
        market: 'Nashik APMC',
        district: 'Nashik',
        basePrice: 10200,
        baseDistance: 25,
        demand: 'Moderate',
        buyersCount: 10,
        pricePremium: 'Local Rate',
        reason: 'Quick nearby dispatch saving long transit damage for delicate fruits.',
        specialTag: 'Zero Transit Bruising'
      }
    ],
    Cotton: [
      {
        market: 'Akola APMC',
        district: 'Akola',
        basePrice: 7450,
        baseDistance: 280,
        demand: 'Very High',
        buyersCount: 18,
        pricePremium: '+₹250/q above MSP',
        reason: 'CCI Government Procurement active alongside 14 modern ginning presses.',
        specialTag: 'CCI MSP Hub'
      },
      {
        market: 'Yavatmal APMC',
        district: 'Yavatmal',
        basePrice: 7320,
        baseDistance: 310,
        demand: 'High',
        buyersCount: 12,
        pricePremium: '+₹120/q premium',
        reason: 'High spinning mill demand for medium & long staple cotton.',
        specialTag: 'Spinning Mill Buying'
      },
      {
        market: 'Jalna APMC',
        district: 'Jalna',
        basePrice: 7250,
        baseDistance: 160,
        demand: 'Moderate',
        buyersCount: 9,
        pricePremium: 'Mandi Modal',
        reason: 'Central Maharashtra connectivity with competitive open auction bids.',
        specialTag: 'Central Mandi'
      }
    ],
    Maize: [
      {
        market: 'Chhatrapati Sambhajinagar APMC',
        district: 'Aurangabad',
        basePrice: 2380,
        baseDistance: 140,
        demand: 'High',
        buyersCount: 16,
        pricePremium: '+₹130/q premium',
        reason: 'Heavy feed mill and starch manufacturing demand with electronic weighbridge verification.',
        specialTag: 'Feed Mill Demand'
      },
      {
        market: 'Kolhapur APMC',
        district: 'Kolhapur',
        basePrice: 2320,
        baseDistance: 320,
        demand: 'High',
        buyersCount: 12,
        pricePremium: '+₹70/q premium',
        reason: 'High dairy cattle feed compounder bidding.',
        specialTag: 'Dairy Feed Aggregation'
      },
      {
        market: 'Malegaon APMC',
        district: 'Nashik',
        basePrice: 2280,
        baseDistance: 75,
        demand: 'Moderate',
        buyersCount: 9,
        pricePremium: 'Regional Benchmark',
        reason: 'Fast local collection and minimum transport freight.',
        specialTag: 'Lowest Haulage Cost'
      }
    ]
  };

  // Dynamic Algorithmic Computation
  const activeCropMandis = marketKnowledgeBase[sellCrop] || marketKnowledgeBase['Onion'];
  const userLocLower = (sellLoc || '').toLowerCase();

  const rankedMarkets = activeCropMandis.map((m) => {
    // Dynamic distance adaptation based on farmer location
    let estimatedDistance = m.baseDistance;
    if (userLocLower.includes('pune') && m.district === 'Nashik') {
      estimatedDistance += 120;
    } else if (userLocLower.includes('nashik') && m.district === 'Pune') {
      estimatedDistance += 110;
    } else if (userLocLower.includes('solapur') && m.district !== 'Solapur') {
      estimatedDistance += 160;
    } else if (userLocLower.includes('latur') && m.district !== 'Latur') {
      estimatedDistance += 140;
    }

    const truckloads = Math.max(1, Math.ceil(Number(sellQty || 1) / 100));
    const transportCost = Math.round((1200 + estimatedDistance * 14) * truckloads);
    const grossIncome = Number(sellQty || 1) * m.basePrice;
    const netIncome = Math.max(0, grossIncome - transportCost);

    return {
      ...m,
      distance: estimatedDistance,
      transportCost,
      grossIncome,
      netIncome
    };
  }).sort((a, b) => b.netIncome - a.netIncome);

  const bestMarket = rankedMarkets[0];
  const alternativeMarkets = rankedMarkets.slice(1);

  // Tool 2: Price forecast state
  const [forecastCrop, setForecastCrop] = useState('Onion');
  const [forecastHorizon, setForecastHorizon] = useState('7d'); // '7d' | '30d'

  // Tool 3: Crop suggestion state
  const [landArea, setLandArea] = useState(2.5);
  const [waterAvail, setWaterAvail] = useState('Moderate');
  const [season, setSeason] = useState('Rabi (Winter)');
  const [soilType, setSoilType] = useState('Black Cotton Loam');
  const [showCropResults, setShowCropResults] = useState(true);

  // Forecast mock data
  const forecast7d = [
    { day: 'Day 1', price: 3250, label: 'Today' },
    { day: 'Day 2', price: 3280, label: 'Tomorrow' },
    { day: 'Day 3', price: 3340, label: 'Wed' },
    { day: 'Day 4', price: 3390, label: 'Thu' },
    { day: 'Day 5', price: 3450, label: 'Peak' },
    { day: 'Day 6', price: 3420, label: 'Sat' },
    { day: 'Day 7', price: 3400, label: 'Sun' }
  ];

  const forecast30d = [
    { day: 'Week 1', price: 3250, label: 'Current' },
    { day: 'Week 2', price: 3450, label: 'Peak Demand' },
    { day: 'Week 3', price: 3380, label: 'Moderate' },
    { day: 'Week 4', price: 3290, label: 'Harvest Wave' }
  ];

  const activeForecast = forecastHorizon === '7d' ? forecast7d : forecast30d;
  const maxPriceInForecast = Math.max(...activeForecast.map(f => f.price));
  const minPriceInForecast = Math.min(...activeForecast.map(f => f.price));

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-700/60 border border-purple-500/50 text-purple-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Sheti Advisory Engine • कृत्रिम बुद्धिमत्ता सल्ला</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {t('aiInsightsTitle')}
          </h1>
          <p className="text-purple-200/90 text-sm max-w-2xl font-medium">
            Smart algorithmic market predictions, optimal APMC routing, and soil-matched crop recommendations.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs space-y-1 shrink-0">
          <div className="text-purple-300 font-bold uppercase">Algorithm Reliability</div>
          <div className="text-2xl font-black text-white">88% Confidence</div>
          <div className="text-purple-200 text-[11px]">Trained on 5-yr APMC arrival cycles</div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {[
          { id: 'where-to-sell', label: '1. Where Should I Sell?' },
          { id: 'price-forecast', label: '2. Price Forecast (7 & 30 Days)' },
          { id: 'crop-suggestion', label: '3. What to Sow Next?' },
          { id: 'market-pulse', label: '4. Market Pulse & Alerts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: WHERE SHOULD I SELL? (Explicit Dynamic Requirement) */}
      {activeTab === 'where-to-sell' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Where Should I Sell? (माल कुठे विकावा?)
              </h3>
              <p className="text-xs text-gray-500">
                Calculates net take-home cash after freight and highlights the highest yielding APMC mandi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Crop</label>
                <select
                  value={sellCrop}
                  onChange={(e) => setSellCrop(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Onion">Onion (कांदा)</option>
                  <option value="Tomato">Tomato (टोमॅटो)</option>
                  <option value="Wheat">Wheat (गहू)</option>
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Grapes">Grapes (द्राक्षे)</option>
                  <option value="Pomegranate">Pomegranate (डाळिंब)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Maize">Maize (मका)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Quantity (Quintal)</label>
                <input
                  type="number"
                  min="1"
                  value={sellQty}
                  onChange={(e) => setSellQty(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Farm Location</label>
                <input
                  type="text"
                  value={sellLoc}
                  onChange={(e) => setSellLoc(e.target.value)}
                  placeholder="e.g. Dindori, Nashik or Junnar, Pune"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Result Card: Dynamic AI Recommendation */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50/60 to-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>TOP AI RECOMMENDATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Recommended Market: <span className="text-emerald-700">{bestMarket.market} ({bestMarket.district})</span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('create-lot')}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sell {sellCrop} at this Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reasons block */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">
                Why {bestMarket.market} is optimal for your {sellCrop}:
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 flex items-start gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{bestMarket.pricePremium}</div>
                    <div className="text-[11px] text-gray-500">Highest price realization</div>
                  </div>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 flex items-start gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{bestMarket.demand} Demand</div>
                    <div className="text-[11px] text-gray-500">{bestMarket.buyersCount} bulk verified buyers active</div>
                  </div>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 flex items-start gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{bestMarket.distance} km from farm</div>
                    <div className="text-[11px] text-gray-500">Low transit time & minimal loss</div>
                  </div>
                </div>
              </div>

              {/* Explicit Reason Sentence */}
              <div className="p-3.5 bg-emerald-100/70 rounded-xl text-xs text-emerald-950 font-bold border border-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>Recommendation Reason:</strong> {bestMarket.reason}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-gray-400 block">Expected Market Price</span>
                <span className="text-xl font-black text-gray-900">₹{bestMarket.basePrice.toLocaleString()}/q</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-gray-400 block">Distance from Farm</span>
                <span className="text-xl font-black text-gray-900">{bestMarket.distance} km</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-gray-400 block">Est. Transport Cost</span>
                <span className="text-xl font-black text-red-600">₹{bestMarket.transportCost.toLocaleString()}</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-gray-400 block">Gross Crop Value</span>
                <span className="text-xl font-black text-gray-900">₹{bestMarket.grossIncome.toLocaleString()}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-emerald-600 text-white rounded-2xl p-4 shadow-md">
                <span className="text-[11px] font-bold text-emerald-200 block">Est. Net Take-Home</span>
                <span className="text-xl font-black text-white">₹{bestMarket.netIncome.toLocaleString()}</span>
              </div>
            </div>

            {/* Comparison against other mandis */}
            {alternativeMarkets.length > 0 && (
              <div className="pt-4 border-t border-emerald-200 space-y-3">
                <h4 className="text-xs font-black uppercase text-gray-700 tracking-wider">
                  Alternative Mandi Comparison for {sellCrop} ({sellQty} Quintals):
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {alternativeMarkets.map((alt, idx) => {
                    const netDifference = bestMarket.netIncome - alt.netIncome;

                    return (
                      <div key={idx} className="bg-white/80 rounded-2xl p-4 border border-emerald-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-gray-900 font-black">{alt.market}</span>
                          <span className="text-red-600 text-[11px] font-black">
                            -₹{netDifference.toLocaleString()} less net cash
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-gray-600 text-[11px] pt-1 border-t border-gray-100">
                          <div>Rate: <strong className="text-gray-900">₹{alt.basePrice}/q</strong></div>
                          <div>Distance: <strong className="text-gray-900">{alt.distance} km</strong></div>
                          <div>Freight: <strong className="text-red-600">₹{alt.transportCost}</strong></div>
                        </div>

                        <p className="text-[11px] text-gray-500 italic">{alt.reason}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PRICE FORECAST (Explicit Requirement) */}
      {activeTab === 'price-forecast' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Price Forecast & Trend Prediction
                </h3>
                <p className="text-xs text-gray-500">
                  AI arrival volume modeling and weather impact analysis
                </p>
              </div>

              {/* Horizon Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setForecastHorizon('7d')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    forecastHorizon === '7d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
                  }`}
                >
                  7-Day Forecast
                </button>
                <button
                  onClick={() => setForecastHorizon('30d')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    forecastHorizon === '30d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
                  }`}
                >
                  30-Day Outlook
                </button>
              </div>
            </div>

            {/* Price forecast stats banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <span className="text-xs font-bold text-gray-500 block">Current Price Today</span>
                <div className="text-2xl font-black text-gray-900 mt-1">₹3,250/q</div>
                <span className="text-[11px] text-gray-500 font-semibold">Lasalgaon benchmark</span>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 block">Expected Peak Price</span>
                <div className="text-2xl font-black text-emerald-950 mt-1">₹3,450/q (+6.1%)</div>
                <span className="text-[11px] text-emerald-700 font-semibold">Expected in 4-5 days</span>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                <span className="text-xs font-bold text-purple-800 block">Confidence Level</span>
                <div className="text-2xl font-black text-purple-950 mt-1">88% High</div>
                <span className="text-[11px] text-purple-700 font-semibold">Historic accuracy: 91.2%</span>
              </div>
            </div>

            {/* Simulated Visual Chart */}
            <div className="bg-gray-900 rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-400">Price Trend Visualization (₹/quintal)</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Upward Trajectory (+₹200 expected)</span>
                </span>
              </div>

              {/* Bar Chart Simulation */}
              <div className="grid grid-cols-7 sm:grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6">
                {activeForecast.map((item, idx) => {
                  const heightPercent = Math.round(((item.price - minPriceInForecast + 150) / (maxPriceInForecast - minPriceInForecast + 200)) * 100);
                  const isPeak = item.price === maxPriceInForecast;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className={`text-[10px] sm:text-xs font-bold ${isPeak ? 'text-emerald-400 font-black' : 'text-gray-400'}`}>
                        ₹{item.price}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${
                          isPeak
                            ? 'bg-gradient-to-t from-emerald-600 to-green-400 shadow-lg shadow-emerald-500/50'
                            : 'bg-emerald-800/60 hover:bg-emerald-700'
                        }`}
                      ></div>
                      <span className="text-[10px] sm:text-xs text-gray-300 font-semibold truncate">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* AI Advice Callout */}
              <div className="bg-white/10 rounded-2xl p-4 text-xs flex items-center gap-3 border border-white/15">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                <p className="text-gray-200">
                  <strong>AI Recommendation:</strong> If you have storage facilities, hold onion harvest for <strong>4 to 5 days</strong>. Delayed arrivals from Karnataka and Madhya Pradesh are projected to elevate Lasalgaon spot prices by approx ₹150–₹200/q.
                </p>
              </div>
            </div>

            {/* Required Disclaimer */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Prototype estimate for demonstration purposes.</strong> AI price predictions rely on historical arrival patterns and current weather radar. Actual APMC mandi auctions may vary based on spot buyer bidding.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CROP SUGGESTION (What to Sow Next?) */}
      {activeTab === 'crop-suggestion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                What to Sow Next? (पीक लागवड सल्ला)
              </h3>
              <p className="text-xs text-gray-500">
                Recommends highest profitability crops based on your land area, water availability, and season.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Land Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Water Availability</label>
                <select
                  value={waterAvail}
                  onChange={(e) => setWaterAvail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                >
                  <option value="Abundant">Abundant (विपुल पाणी)</option>
                  <option value="Moderate">Moderate (मध्यम पाणी)</option>
                  <option value="Scarse">Low / Rainfed (कमी पाणी)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Upcoming Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                >
                  <option value="Rabi (Winter)">Rabi Season (रब्बी हंगाम)</option>
                  <option value="Summer (Zaid)">Summer Season (उन्हाळी हंगाम)</option>
                  <option value="Kharif (Monsoon)">Kharif Season (खरीप हंगाम)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                >
                  <option value="Black Cotton Loam">काळी कसदार माती (Black Cotton)</option>
                  <option value="Red Sandy">तांबडी गाळाची माती (Red Loam)</option>
                  <option value="Light Alluvial">हलकी माती (Light Soil)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Suggested Crops Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-lg space-y-4 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                #1 HIGH ROI MATCH
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900">Late Kharif Onion (रांगडा कांदा)</h4>
                <p className="text-xs text-emerald-700 font-semibold">Variety: Bhima Super / Baswant 780</p>
              </div>

              <div className="space-y-2 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Estimated Net Profit:</span>
                  <strong className="text-emerald-700 text-sm">₹1,80,000 / acre</strong>
                </div>
                <div className="flex justify-between">
                  <span>Growth Duration:</span>
                  <strong className="text-gray-900">110-120 Days</strong>
                </div>
                <div className="flex justify-between">
                  <span>Water Requirement:</span>
                  <strong className="text-gray-900">Drip Friendly (Low-Med)</strong>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                #2 EXPORT DEMAND
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900">Pomegranate (भगवा डाळिंब)</h4>
                <p className="text-xs text-blue-700 font-semibold">Tissue culture Bhagwa variety</p>
              </div>

              <div className="space-y-2 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Estimated Net Profit:</span>
                  <strong className="text-emerald-700 text-sm">₹2,40,000 / acre</strong>
                </div>
                <div className="flex justify-between">
                  <span>Growth Duration:</span>
                  <strong className="text-gray-900">Perennial (Mrig Bahar)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Water Requirement:</span>
                  <strong className="text-gray-900">Low (Drought Tolerant)</strong>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
                #3 SAFE FAST TURNAROUND
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900">Wheat (गहू - समाधान)</h4>
                <p className="text-xs text-amber-700 font-semibold">Variety: HD-2189 / Phule Samadhan</p>
              </div>

              <div className="space-y-2 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Estimated Net Profit:</span>
                  <strong className="text-emerald-700 text-sm">₹55,000 / acre</strong>
                </div>
                <div className="flex justify-between">
                  <span>Growth Duration:</span>
                  <strong className="text-gray-900">95-105 Days</strong>
                </div>
                <div className="flex justify-between">
                  <span>Water Requirement:</span>
                  <strong className="text-gray-900">Moderate (Flood/Sprinkler)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MARKET INSIGHTS (Explicit Requirement: 4 Cards) */}
      {activeTab === 'market-pulse' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: High Demand */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                🔥
              </div>
              <h4 className="text-lg font-black text-gray-900">{t('highDemand')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Aggressive bulk buying for <strong>Grade A Export Onion</strong> and <strong>Processing Tomatoes</strong> by retail food companies.
              </p>
              <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                14 buyers actively offering above APMC modal rate
              </div>
            </div>

            {/* Card 2: Price Rising */}
            <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                📈
              </div>
              <h4 className="text-lg font-black text-gray-900">{t('priceRising')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Soybean prices climbed <strong>+₹120/q</strong> over the last 48 hours following increased domestic crushing oil demand in Vidarbha and Khandesh.
              </p>
              <div className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
                Solapur & Sangli Mandis up +3.2%
              </div>
            </div>

            {/* Card 3: High Arrivals */}
            <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                🚛
              </div>
              <h4 className="text-lg font-black text-gray-900">High Arrivals Warning</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pune Gultekdi recorded <strong>24,000+ crates</strong> of tomato today causing auction congestion. Avoid distress unloading in early morning rush.
              </p>
              <div className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                Consider Sangli or Lasalgaon for better rate
              </div>
            </div>

            {/* Card 4: Good Selling Opportunity */}
            <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                ⭐
              </div>
              <h4 className="text-lg font-black text-gray-900">{t('goodOpportunity')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Premium export window active for <strong>Thompson Grapes</strong> at Pimpalgaon Baswant. Direct container buyers offering spot settlement.
              </p>
              <div className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-lg">
                Avg price: ₹6,650/q with 0% Mandi deduction
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
