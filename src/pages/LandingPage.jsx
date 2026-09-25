import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  Scale,
  Truck,
  Warehouse,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  ChevronRight,
  Sprout,
  PhoneCall,
  MapPin,
  IndianRupee,
  Award
} from 'lucide-react';

export const LandingPage = () => {
  const { t, setCurrentView, loginAs, marketPrices } = useApp();

  const features = [
    {
      icon: TrendingUp,
      title: "Better Prices",
      titleMr: "पारदर्शक व उच्च दर",
      titleHi: "पारदर्शी और बेहतर दाम",
      desc: "Eliminate middlemen cartels. Direct access to 1,250+ verified bulk buyers and APMC daily auction rates.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      icon: ShieldCheck,
      title: "Verified Buyers",
      titleMr: "नोंदणीकृत व सत्यापित खरेदीदार",
      titleHi: "सत्यापित खरीदार व व्यापारी",
      desc: "100% KYC verified food processors, exporters, and Mandi traders with Escrow payment protection.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: Scale,
      title: "Market Comparison",
      titleMr: "बाजारपेठ तुलना (निव्वळ नफा)",
      titleHi: "मंडी तुलना (शुद्ध लाभ)",
      desc: "Compare net take-home profit between Lasalgaon, Pune, Nashik after deducting distance and freight costs.",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      icon: Truck,
      title: "Transport Support",
      titleMr: "कृषी वाहतूक व शेअरिंग",
      titleHi: "कृषि परिवहन और शेयरिंग",
      desc: "Instant booking of Tata 407, Bolero Maxi, and cost-saving Shared Transport pooling with neighboring farmers.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      icon: Warehouse,
      title: "Storage Support",
      titleMr: "शितगृहे व सुरक्षित वखार",
      titleHi: "कोल्ड स्टोरेज व वेयरहाउस",
      desc: "Prevent distress selling. Book WDRA certified cold storages and warehouses with warehouse receipt loans.",
      color: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      icon: Sparkles,
      title: "Smart Insights",
      titleMr: "कृत्रिम बुद्धिमत्ता शेती सल्ला",
      titleHi: "एआई कृषि विश्लेषण व सलाह",
      desc: "AI recommendations on 'Where to Sell', 7-day price forecasts, and soil-based sowing suggestions.",
      color: "bg-teal-50 text-teal-600 border-teal-200"
    }
  ];

  const steps = [
    { step: "01", title: "Add Your Crop", desc: "List your standing or harvested crop with expected yield and grade." },
    { step: "02", title: "Compare Markets", desc: "Check live APMC prices and calculate net earnings across mandis." },
    { step: "03", title: "Create Your Lot", desc: "Publish your crop lot to verified buyers in a 2-minute simple form." },
    { step: "04", title: "Receive Offers", desc: "Get competitive buying bids, negotiate, or accept the best price." },
    { step: "05", title: "Sell Your Crop", desc: "Close the deal with guaranteed 100% Escrow digital payment protection." },
    { step: "06", title: "Arrange Transport", desc: "Book farmgate vehicle or join a shared pooling truck to the mandi." }
  ];

  const stats = [
    { value: "45,000+", label: "Farmers Connected", labelMr: "जोडलेले शेतकरी", icon: Users },
    { value: "1,250+", label: "Verified Buyers", labelMr: "नोंदणीकृत खरेदीदार", icon: ShieldCheck },
    { value: "180+", label: "FPOs Onboarded", labelMr: "सहभागी एफपीओ", icon: Building2 },
    { value: "₹42 Cr+", label: "Trade Volume", labelMr: "एकूण कृषी उलाढाल", icon: Award }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-emerald-50/80 via-emerald-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-extrabold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>डिजिटल शेती • पारदर्शक बाजार भाव • हमखास नफा</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
                Sell Your Crop at the <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                  Right Price.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl font-normal leading-relaxed">
                Compare markets, find verified buyers, arrange farmgate transport and make smarter selling decisions without middleman deductions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => loginAs('farmer')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-black rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:scale-102 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sprout className="w-5 h-5" />
                  <span>Start Selling (Farmer Demo)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentView('market-prices')}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 text-base sm:text-lg font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>{t('checkPrices')}</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free for Farmers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>APMC Lasalgaon, Pune, Nashik Live</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct DBT Escrow Payment</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-xl opacity-30"></div>

                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Mandi Compare</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Onion (कांदा)
                    </span>
                  </div>

                  {/* Highlight card demo */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 rounded-2xl p-4 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-extrabold uppercase text-emerald-800 tracking-wide">⭐ Recommended APMC</span>
                        <h4 className="text-xl font-black text-gray-900">Lasalgaon Mandi</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-700">₹3,250<span className="text-xs font-semibold text-gray-600">/q</span></div>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-sm">↑ ₹180 High</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="text-gray-500">Distance</div>
                        <div className="font-bold text-gray-800">42 km</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Transport</div>
                        <div className="font-bold text-gray-800">₹1,800</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Net Return</div>
                        <div className="font-black text-emerald-700">₹3,23,200</div>
                      </div>
                    </div>
                  </div>

                  {/* Competitor mandi comparison */}
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900">Pune Gultekdi APMC</div>
                      <div className="text-gray-500">165 km • Transport ₹4,500</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">₹2,950/q</div>
                      <div className="text-gray-500">Net: ₹2,90,500</div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs flex items-center justify-between text-amber-900 font-bold">
                    <span>💡 Selling at Lasalgaon earns you ₹32,700 more!</span>
                  </div>

                  <button
                    onClick={() => { loginAs('farmer'); setCurrentView('compare-markets'); }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Test Market Calculator</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-emerald-950/15">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-emerald-700/60">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`space-y-2 ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                  <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-700/80 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ShetiMitra? 6 Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why ShetiMitra?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Designed specifically for Indian farmers to solve real grassroots problems in crop marketing, pricing, and freight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-xs font-semibold text-emerald-700">{feature.titleMr}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (6 Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase text-emerald-700 tracking-wider">Simple 6-Step Selling Process</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-gray-600">
              From farm gate to verified payment in your bank account, simple enough for any mobile user.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-3 relative overflow-hidden group">
                <div className="text-3xl font-black text-emerald-200 group-hover:text-emerald-500 transition-colors">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-gray-900">{st.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => loginAs('farmer')}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Experience The Farmer Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Live Market Prices Snippet on Landing Page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Today's Key Market Rates (महाराष्ट्र APMC)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">Live auction prices from Lasalgaon, Pune, Nashik, Sangli, and Solapur</p>
          </div>
          <button
            onClick={() => setCurrentView('market-prices')}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All APMCs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPrices.slice(0, 4).map((mp) => (
            <div key={mp.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">{mp.crop}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${mp.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {mp.change}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mt-1">{mp.market}</h3>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-black text-gray-900">₹{mp.modalPrice.toLocaleString()}<span className="text-xs font-normal text-gray-500">/q</span></div>
                <div className="text-xs text-gray-400">Range: ₹{mp.minPrice} - ₹{mp.maxPrice}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-12 mt-16 bg-white text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900">Sheti<span className="text-emerald-600">Mitra</span></span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                A farmer-first digital platform empowering Indian agriculturists with price discovery, mandi comparison, verified buyers, and transport logistics.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-900 tracking-wider mb-3">Key Features</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('compare-markets')} className="hover:text-emerald-700">Market Net Profit Comparison</button></li>
                <li><button onClick={() => setCurrentView('market-prices')} className="hover:text-emerald-700">Live APMC Mandi Rates</button></li>
                <li><button onClick={() => setCurrentView('find-buyers')} className="hover:text-emerald-700">Verified Buyer Network</button></li>
                <li><button onClick={() => setCurrentView('transport')} className="hover:text-emerald-700">Shared Transport Pooling</button></li>
                <li><button onClick={() => setCurrentView('storage')} className="hover:text-emerald-700">Cold Storage & Warehouses</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-900 tracking-wider mb-3">Farmer Support</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('government')} className="hover:text-emerald-700">Government Schemes & PM-KISAN</button></li>
                <li><button onClick={() => setCurrentView('grievances')} className="hover:text-emerald-700">APMC Grievance Redressal</button></li>
                <li><button onClick={() => setCurrentView('ai-insights')} className="hover:text-emerald-700">AI Sowing & Price Advisory</button></li>
                <li className="text-emerald-700 font-bold flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Kisan Helpline: 1800-180-1551</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-900 tracking-wider mb-3">Hackathon Demo Access</h4>
              <p className="text-xs text-gray-500 mb-3">Instant role testing for judges and evaluators:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loginAs('farmer')}
                  className="px-2 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-200"
                >
                  🌾 Farmer
                </button>
                <button
                  onClick={() => loginAs('buyer')}
                  className="px-2 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold hover:bg-blue-200"
                >
                  🏢 Buyer
                </button>
                <button
                  onClick={() => loginAs('fpo')}
                  className="px-2 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold hover:bg-purple-200"
                >
                  👥 FPO
                </button>
                <button
                  onClick={() => loginAs('admin')}
                  className="px-2 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold hover:bg-amber-200"
                >
                  ⚖️ Admin
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
            © 2026 ShetiMitra • Developed with pride for Indian Farmers (अन्नदाता) • Frontend Prototype
          </div>
        </div>
      </footer>
    </div>
  );
};
