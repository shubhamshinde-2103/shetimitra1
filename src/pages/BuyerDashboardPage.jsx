import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Search,
  PlusCircle,
  Truck,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Send,
  Calendar,
  FileText,
  BadgePercent,
  Star,
  Tag,
  ShoppingBag,
  Clock,
  Sparkles,
  MapPin,
  Filter,
  Check,
  X,
  CreditCard,
  Download,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const BuyerDashboardPage = () => {
  const {
    t,
    setCurrentView,
    lots,
    addToast,
    offers,
    sales,
    makeBuyerOffer,
    buyerRequirements,
    postBuyerRequirement,
    escrowBalance,
    depositEscrow,
    releaseEscrow,
    buyerActiveTab,
    setBuyerActiveTab,
    loginAs
  } = useApp();

  // Active Tab: 'browse-lots' | 'post-req' | 'make-offer' | 'my-purchases' | 'payments'
  const activeTab = buyerActiveTab || 'browse-lots';
  const setActiveTab = (tab) => setBuyerActiveTab(tab);

  // Search & Filter state for Browse Lots
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');

  // Make Offer Modal State
  const [makeOfferModalOpen, setMakeOfferModalOpen] = useState(false);
  const [selectedLotForOffer, setSelectedLotForOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({
    offerPrice: '',
    transportTerms: 'Buyer arranges farmgate pickup (Free transport)',
    paymentTerms: '100% Escrow secured bank transfer within 24h',
    notes: 'Official procurement bid. Ready for immediate weighbridge pickup.'
  });

  // Post Requirement Modal / Form State
  const [postReqModalOpen, setPostReqModalOpen] = useState(false);
  const [reqForm, setReqForm] = useState({
    crop: 'Onion',
    variety: 'Export Red / Bhima Super',
    quantity: 500,
    priceMin: 3100,
    priceMax: 3450,
    location: 'Nashik / Ahmednagar',
    paymentTerms: '100% Escrow Bank Transfer within 24h of weighbridge'
  });

  // Deposit Escrow Modal State
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(500000);

  // Invoice / Bill Modal State
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Crop list for filter pills
  const cropFilters = ['All', 'Onion', 'Tomato', 'Grapes', 'Wheat', 'Soybean', 'Pomegranate', 'Cotton', 'Maize'];

  // Filtered lots
  const filteredLots = lots.filter((lot) => {
    const matchesCrop = selectedCropFilter === 'All' || lot.crop?.toLowerCase() === selectedCropFilter.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      lot.crop?.toLowerCase().includes(query) ||
      lot.variety?.toLowerCase().includes(query) ||
      lot.pickupLocation?.toLowerCase().includes(query) ||
      lot.id?.toLowerCase().includes(query);
    return matchesCrop && matchesSearch;
  });

  // Handle Opening Make Offer for a specific lot
  const handleOpenMakeOffer = (lot) => {
    setSelectedLotForOffer(lot);
    setOfferForm({
      offerPrice: lot.expectedPrice || '',
      transportTerms: 'Buyer arranges farmgate pickup (Free transport)',
      paymentTerms: '100% Escrow secured bank transfer within 24h',
      notes: `Procurement bid for ${lot.quantity}q ${lot.crop}. Ready for immediate dispatch.`
    });
    setMakeOfferModalOpen(true);
  };

  // Submit Make Offer
  const handleMakeOfferSubmit = (e) => {
    e.preventDefault();
    if (!selectedLotForOffer) return;
    if (!offerForm.offerPrice || Number(offerForm.offerPrice) <= 0) {
      addToast('Please enter a valid offer price per quintal', 'error');
      return;
    }

    makeBuyerOffer(selectedLotForOffer.id, {
      offerPrice: offerForm.offerPrice,
      transportTerms: offerForm.transportTerms,
      paymentTerms: offerForm.paymentTerms,
      notes: offerForm.notes
    });

    setMakeOfferModalOpen(false);
    setActiveTab('make-offer');
  };

  // Submit Post Requirement
  const handlePostReqSubmit = (e) => {
    e.preventDefault();
    postBuyerRequirement(reqForm);
    setPostReqModalOpen(false);
  };

  // Submit Deposit Escrow
  const handleDepositSubmit = (e) => {
    e.preventDefault();
    depositEscrow(depositAmount);
    setDepositModalOpen(false);
  };

  const buyerStats = [
    { label: 'Available Escrow Balance', value: `₹${escrowBalance.toLocaleString()}`, desc: '100% Protected via ShetiMitra' },
    { label: 'Active Farmgate Lots Live', value: `${lots.length} Lots`, desc: 'Direct from Maharashtra Farmers' },
    { label: 'Confirmed Purchases', value: `${sales.length} Orders`, desc: 'Weighbridge verified' },
    { label: 'Sent Offers / Bids', value: `${offers.length} Active Bids`, desc: 'Live farmer negotiations' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold border border-blue-600/50">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Corporate Buyer & Merchant Desk • व्यापारी व खरेदीदार पोर्टल</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            ABC Foods Pvt Ltd (नाशिक)
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm max-w-xl font-medium">
            Food Processing & Mandi Aggregator • APMC Unified License: MH-NSK-2021-9982 • Trust Rating 4.9 ★
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setPostReqModalOpen(true)}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post Requirement</span>
          </button>

          <button
            onClick={() => loginAs('farmer')}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-blue-100 font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Switch to Farmer Interface"
          >
            <span>🌾 Switch to Farmer View</span>
          </button>
        </div>
      </div>

      {/* Buyer KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {buyerStats.map((st, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-blue-100 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">{st.label}</span>
            <div className="text-2xl font-black text-blue-950">{st.value}</div>
            <div className="text-xs text-blue-700 font-semibold">{st.desc}</div>
          </div>
        ))}
      </div>

      {/* Module Navigation Tabs (5 Core Modules requested by user) */}
      <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'browse-lots', label: '1. Browse Farmer Lots', icon: Search, badge: `${lots.length}` },
          { id: 'post-req', label: '2. Post Requirement', icon: PlusCircle },
          { id: 'make-offer', label: '3. Make Offer / Sent Bids', icon: Tag, count: offers.length },
          { id: 'my-purchases', label: '4. My Purchases', icon: ShoppingBag, count: sales.length },
          { id: 'payments', label: '5. Payments & Escrow', icon: IndianRupee },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-white text-blue-900' : 'bg-blue-100 text-blue-900'
                }`}>
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-white text-blue-900' : 'bg-amber-500 text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* MODULE 1: BROWSE FARMER LOTS */}
      {/* ======================================================== */}
      {activeTab === 'browse-lots' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search lots by crop (कांदा, टोमॅटो), variety, location, or Lot ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-600 shrink-0">
                <span>Showing <strong>{filteredLots.length}</strong> farmgate lots available</span>
              </div>
            </div>

            {/* Crop Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
              {cropFilters.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCropFilter(crop)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCropFilter === crop
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Lots Grid */}
          {filteredLots.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
              <Search className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No matching lots found</h3>
              <p className="text-xs text-gray-500">Try changing your search term or select another crop filter.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCropFilter('All'); }}
                className="px-4 py-2 bg-blue-100 text-blue-900 rounded-xl text-xs font-bold hover:bg-blue-200 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot) => {
                const totalValue = Number(lot.quantity || 0) * Number(lot.expectedPrice || 0);
                const isNewLot = lot.status === 'Active' || lot.createdAt === new Date().toISOString().split('T')[0];

                return (
                  <div
                    key={lot.id}
                    className="bg-white rounded-3xl border-2 border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-6 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            #{lot.id}
                          </span>
                          {isNewLot && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              <span>Farm Lot</span>
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-bold text-gray-500">
                          {lot.createdAt || 'Recent'}
                        </span>
                      </div>

                      {/* Crop & Variety */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-900 transition-colors">
                            {lot.crop}
                          </h3>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {lot.quality || 'Grade A'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold mt-0.5">
                          Variety: {lot.variety || 'Standard Commercial'}
                        </p>
                      </div>

                      {/* Specs Matrix */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs">
                        <div className="bg-gray-50 p-2.5 rounded-xl space-y-0.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Available Volume</span>
                          <div className="text-base font-black text-gray-900">{lot.quantity} Quintals</div>
                          <span className="text-[10px] text-gray-500">{lot.packaging || '50kg Bags'}</span>
                        </div>

                        <div className="bg-emerald-50/70 p-2.5 rounded-xl space-y-0.5 border border-emerald-100">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase">Asking Rate</span>
                          <div className="text-base font-black text-emerald-800">₹{Number(lot.expectedPrice || 0).toLocaleString()}/q</div>
                          <span className="text-[10px] text-emerald-700">Gross: ₹{totalValue.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Farmgate Location */}
                      <div className="flex items-start gap-2 text-xs text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 font-medium">
                          {lot.pickupLocation || 'Farmgate, Maharashtra'}
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                      <div className="text-xs text-gray-500 font-bold">
                        <span>{lot.offersCount || 1} bids active</span>
                      </div>

                      <button
                        onClick={() => handleOpenMakeOffer(lot)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Make Offer</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 2: POST REQUIREMENT */}
      {/* ======================================================== */}
      {activeTab === 'post-req' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Post Corporate Procurement Requirement
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Publish your bulk demand tender. Over 45,000+ farmers and FPOs in Maharashtra receive automated SMS & app notifications.
              </p>
            </div>

            <form onSubmit={handlePostReqSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Crop Name</label>
                  <select
                    value={reqForm.crop}
                    onChange={(e) => setReqForm({ ...reqForm, crop: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Onion">Onion (कांदा)</option>
                    <option value="Tomato">Tomato (टोमॅटो)</option>
                    <option value="Grapes">Grapes (द्राक्षे)</option>
                    <option value="Wheat">Wheat (गहू)</option>
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                    <option value="Pomegranate">Pomegranate (डाळिंब)</option>
                    <option value="Cotton">Cotton (कापूस)</option>
                    <option value="Maize">Maize (मका)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Variety / Specifications</label>
                  <input
                    type="text"
                    required
                    value={reqForm.variety}
                    onChange={(e) => setReqForm({ ...reqForm, variety: e.target.value })}
                    placeholder="e.g. Export Red 55mm+ / Sauce Grade"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Target Volume (Quintals)</label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={reqForm.quantity}
                    onChange={(e) => setReqForm({ ...reqForm, quantity: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 focus:outline-hidden focus:border-blue-500"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">approx {(Number(reqForm.quantity || 0) / 10).toFixed(1)} MT</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Min Offer Price (₹/q)</label>
                  <input
                    type="number"
                    required
                    value={reqForm.priceMin}
                    onChange={(e) => setReqForm({ ...reqForm, priceMin: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Max Offer Price (₹/q)</label>
                  <input
                    type="number"
                    required
                    value={reqForm.priceMax}
                    onChange={(e) => setReqForm({ ...reqForm, priceMax: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-emerald-700 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Preferred Sourcing Districts / Mandis</label>
                  <input
                    type="text"
                    required
                    value={reqForm.location}
                    onChange={(e) => setReqForm({ ...reqForm, location: e.target.value })}
                    placeholder="e.g. Nashik, Ahmednagar, Pune"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Escrow & Settlement Terms</label>
                  <input
                    type="text"
                    required
                    value={reqForm.paymentTerms}
                    onChange={(e) => setReqForm({ ...reqForm, paymentTerms: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Procurement Requirement</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Requirements List */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-900">Your Active Procurement Demands</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {buyerRequirements.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h4 className="font-black text-base text-gray-900">{req.crop}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      Active Demand
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-medium">Specs: {req.variety}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-xl font-semibold">
                    <div>Volume: <strong className="text-gray-900">{req.quantity} Quintals</strong></div>
                    <div>Price Range: <strong className="text-emerald-700">₹{req.priceMin} - ₹{req.priceMax}/q</strong></div>
                    <div className="col-span-2">Districts: <strong className="text-gray-900">{req.location}</strong></div>
                  </div>

                  <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
                    <span>Terms: {req.paymentTerms}</span>
                    <span className="text-blue-700 font-bold">Posted: {req.datePosted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 3: MAKE OFFER / SENT BIDS */}
      {/* ======================================================== */}
      {activeTab === 'make-offer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  Offers & Bids Management Desk
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Review bids submitted to farmers, track counter-offers, and sign purchase commitments.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('browse-lots')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Make New Offer on a Lot</span>
              </button>
            </div>

            {/* Offers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Lot ID</th>
                    <th className="py-3 px-4">Crop & Volume</th>
                    <th className="py-3 px-4">Offer Rate (₹/q)</th>
                    <th className="py-3 px-4">Total Contract Value</th>
                    <th className="py-3 px-4">Transport & Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {offers.map((off) => {
                    const isPending = off.status === 'pending';
                    const isAccepted = off.status === 'accepted';
                    const isCountered = off.status === 'countered';

                    return (
                      <tr key={off.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-black text-blue-900">
                          #{off.lotId}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-black text-gray-900">{off.crop}</div>
                          <div className="text-gray-500 text-[11px]">{off.quantity} Quintals</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-black text-emerald-800 text-sm">
                            ₹{Number(off.offerPrice).toLocaleString()}/q
                          </div>
                          {off.counterPrice && (
                            <div className="text-amber-700 text-[11px] font-bold">
                              Farmer Counter: ₹{off.counterPrice}/q
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-black text-gray-900 text-sm">
                          ₹{Number(off.totalAmount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="truncate text-gray-700 font-medium">{off.transportTerms}</div>
                          <div className="truncate text-gray-500 text-[10px]">{off.paymentTerms}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            isAccepted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : isCountered
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}>
                            {off.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {isAccepted ? (
                            <button
                              onClick={() => setActiveTab('my-purchases')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              View Purchase
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs font-medium">Awaiting Farmer</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 4: MY PURCHASES */}
      {/* ======================================================== */}
      {activeTab === 'my-purchases' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  Confirmed Purchases & Farmgate Orders
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Verified electronic APMC contracts, weighbridge passes, and dispatch release status.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <span>Total Purchases: <strong className="text-blue-900">{sales.length} Deals Closed</strong></span>
              </div>
            </div>

            <div className="grid gap-4">
              {sales.map((sale) => {
                const isSettled = sale.paymentStatus?.includes('Paid');

                return (
                  <div
                    key={sale.id}
                    className="p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all bg-white shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            #{sale.id}
                          </span>
                          <span className="text-xs font-bold text-gray-400">• Invoice: {sale.invoiceNo}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 mt-1">
                          {sale.crop} ({sale.quantity} Quintals)
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${
                          isSettled
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {sale.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Farmer / Supplier</span>
                        <div className="text-gray-900 font-bold">{sale.buyerName || 'Farmer Ramesh Patil'}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Agreed Rate</span>
                        <div className="text-gray-900 font-bold">₹{Number(sale.pricePerQuintal).toLocaleString()}/q</div>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Total Contract Amount</span>
                        <div className="text-emerald-800 font-black text-sm">₹{Number(sale.totalAmount).toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Pickup Schedule</span>
                        <div className="text-gray-900 font-bold">{sale.pickupDate || 'Scheduled in 24 hrs'}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedInvoice(sale)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View E-Invoice & APMC Pass</span>
                      </button>

                      {!isSettled && (
                        <button
                          onClick={() => releaseEscrow(sale.id)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Release Escrow to Farmer</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 5: PAYMENTS & ESCROW */}
      {/* ======================================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  ShetiMitra Corporate Escrow Ledger
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Zero-default escrow guarantees: Funds are locked when offer is accepted and released immediately upon digital weighbridge slip.
                </p>
              </div>

              <button
                onClick={() => setDepositModalOpen(true)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Deposit Funds to Escrow</span>
              </button>
            </div>

            {/* Escrow Balances Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md space-y-1">
                <span className="text-[11px] font-bold text-blue-200 uppercase">Available Escrow Float</span>
                <div className="text-3xl font-black">₹{escrowBalance.toLocaleString()}</div>
                <p className="text-[11px] text-blue-300">Ready for instant contract backing</p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Total Settled to Farmers</span>
                <div className="text-3xl font-black text-emerald-950">₹18,40,000</div>
                <p className="text-[11px] text-emerald-700 font-semibold">100% on-time weighbridge settlements</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 space-y-1">
                <span className="text-[11px] font-bold text-purple-800 uppercase">Active In-Transit Locked</span>
                <div className="text-3xl font-black text-purple-950">₹4,20,000</div>
                <p className="text-[11px] text-purple-700 font-semibold">Protected under escrow custody</p>
              </div>
            </div>

            {/* Payment Vouchers Table */}
            <div className="space-y-3 pt-4">
              <h3 className="text-base font-black text-gray-900">Recent Escrow Vouchers & Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-black uppercase text-[10px]">
                      <th className="py-3 px-4">Voucher / UTR</th>
                      <th className="py-3 px-4">Beneficiary</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">UTR-2026-9921</td>
                      <td className="py-3 px-4 font-bold text-gray-900">Ramesh Patil (Farmer)</td>
                      <td className="py-3 px-4 text-gray-600">Onion Lot #SM-1024 Weighbridge Settlement</td>
                      <td className="py-3 px-4 font-black text-emerald-700">₹3,35,000</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Settled via DBT</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">UTR-2026-8814</td>
                      <td className="py-3 px-4 font-bold text-gray-900">Santosh Jadhav (Farmer)</td>
                      <td className="py-3 px-4 text-gray-600">Tomato Lot #SM-1019 Advance Deposit</td>
                      <td className="py-3 px-4 font-black text-emerald-700">₹65,000</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Settled via DBT</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">DEP-2026-4401</td>
                      <td className="py-3 px-4 font-bold text-gray-900">ShetiMitra Escrow Pool</td>
                      <td className="py-3 px-4 text-gray-600">HDFC Corporate Bank Float Top-up</td>
                      <td className="py-3 px-4 font-black text-blue-700">+₹10,00,000</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">Credited</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: MAKE OFFER MODAL */}
      {/* ======================================================== */}
      {makeOfferModalOpen && selectedLotForOffer && (
        <Modal
          isOpen={true}
          onClose={() => setMakeOfferModalOpen(false)}
          title={`Make Official Price Bid for Lot #${selectedLotForOffer.id}`}
        >
          <form onSubmit={handleMakeOfferSubmit} className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-xs space-y-2">
              <div className="font-bold text-blue-950">Target Lot Details:</div>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>Crop: <strong className="text-gray-900">{selectedLotForOffer.crop} ({selectedLotForOffer.variety})</strong></div>
                <div>Volume: <strong className="text-gray-900">{selectedLotForOffer.quantity} Quintals</strong></div>
                <div>Farmer Asking Price: <strong className="text-emerald-700">₹{selectedLotForOffer.expectedPrice}/q</strong></div>
                <div>Quality: <strong className="text-gray-900">{selectedLotForOffer.quality}</strong></div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Offer Price (₹ per Quintal)
              </label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="number"
                  required
                  min="100"
                  value={offerForm.offerPrice}
                  onChange={(e) => setOfferForm({ ...offerForm, offerPrice: e.target.value })}
                  placeholder="Enter bidding rate per quintal"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-black text-emerald-800 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs flex justify-between font-bold">
              <span>Total Contract Bidding Value:</span>
              <span className="text-emerald-800 text-sm font-black">
                ₹{(Number(offerForm.offerPrice || 0) * Number(selectedLotForOffer.quantity || 0)).toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Transport Terms</label>
              <select
                value={offerForm.transportTerms}
                onChange={(e) => setOfferForm({ ...offerForm, transportTerms: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900"
              >
                <option value="Buyer arranges farmgate pickup (Free transport)">Buyer arranges farmgate pickup (Free transport for farmer)</option>
                <option value="Farmer delivers to APMC Mandi warehouse">Farmer delivers to APMC Mandi warehouse (+₹150/q freight bonus)</option>
                <option value="Shared logistics vehicle via ShetiMitra fleet">Shared logistics vehicle via ShetiMitra fleet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Payment & Escrow Terms</label>
              <select
                value={offerForm.paymentTerms}
                onChange={(e) => setOfferForm({ ...offerForm, paymentTerms: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900"
              >
                <option value="100% Escrow secured bank transfer within 24h">100% Escrow secured bank transfer within 24h of weighbridge</option>
                <option value="50% Advance on dispatch, 50% on weighbridge inspection">50% Advance on dispatch, 50% on weighbridge inspection</option>
                <option value="Instant spot RTGS transfer at farmgate loading">Instant spot RTGS transfer at farmgate loading</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Notes / Special Instructions for Farmer</label>
              <textarea
                rows="2"
                value={offerForm.notes}
                onChange={(e) => setOfferForm({ ...offerForm, notes: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setMakeOfferModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                Submit Official Offer
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: POST REQUIREMENT MODAL */}
      {/* ======================================================== */}
      {postReqModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setPostReqModalOpen(false)}
          title="Post Corporate Buying Requirement"
        >
          <form onSubmit={handlePostReqSubmit} className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-xs text-blue-950 space-y-1">
              <div className="font-bold">Broadcast Procurement Tender:</div>
              <p>Your procurement alert will be sent directly to 45,000+ farmers and FPOs meeting your crop and location specs.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop</label>
                <input
                  type="text"
                  required
                  value={reqForm.crop}
                  onChange={(e) => setReqForm({ ...reqForm, crop: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Volume (Quintals)</label>
                <input
                  type="number"
                  required
                  value={reqForm.quantity}
                  onChange={(e) => setReqForm({ ...reqForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Offering Price Min (₹/q)</label>
                <input
                  type="number"
                  required
                  value={reqForm.priceMin}
                  onChange={(e) => setReqForm({ ...reqForm, priceMin: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Offering Price Max (₹/q)</label>
                <input
                  type="number"
                  required
                  value={reqForm.priceMax}
                  onChange={(e) => setReqForm({ ...reqForm, priceMax: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Sourcing Districts</label>
              <input
                type="text"
                required
                value={reqForm.location}
                onChange={(e) => setReqForm({ ...reqForm, location: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setPostReqModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                Broadcast Requirement
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: DEPOSIT ESCROW MODAL */}
      {/* ======================================================== */}
      {depositModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setDepositModalOpen(false)}
          title="Top-Up ShetiMitra Escrow Balance"
        >
          <form onSubmit={handleDepositSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="font-bold">Instant Bank Float Deposit:</div>
              <p>Escrow balances remain 100% your company property until you digitally approve weighbridge settlements to farmers.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Deposit Amount (₹ INR)</label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="number"
                  step="50000"
                  min="10000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-black text-gray-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Corporate Source Account</label>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800">
                HDFC Bank Current A/C ••••••9921 (ABC Foods Pvt Ltd)
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDepositModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                Confirm Deposit
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: INVOICE / WEIGHBRIDGE PASS MODAL */}
      {/* ======================================================== */}
      {selectedInvoice && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInvoice(null)}
          title={`APMC Electronic Tax Invoice: ${selectedInvoice.invoiceNo}`}
        >
          <div className="space-y-4 text-xs">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">Invoice Number:</span>
                <span className="font-black text-gray-900">{selectedInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">Order Ref:</span>
                <span className="font-black text-blue-900">#{selectedInvoice.id}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">Produce:</span>
                <span className="font-black text-gray-900">{selectedInvoice.crop} ({selectedInvoice.quantity} Quintals)</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">Rate per Quintal:</span>
                <span className="font-bold text-gray-900">₹{selectedInvoice.pricePerQuintal}/q</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">Total Contract Value:</span>
                <span className="font-black text-emerald-800 text-sm">₹{Number(selectedInvoice.totalAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-500">APMC Cess (0.8%):</span>
                <span className="font-bold text-gray-900">₹{Math.round(selectedInvoice.totalAmount * 0.008).toLocaleString()} (Exempt via ShetiMitra Portal)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Payment Status:</span>
                <span className="font-black text-emerald-700">{selectedInvoice.paymentStatus}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  addToast('E-Invoice PDF downloaded for tax accounting', 'success');
                  setSelectedInvoice(null);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download APMC Tax PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
