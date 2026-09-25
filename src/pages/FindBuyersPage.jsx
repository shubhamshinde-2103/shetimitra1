import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Star,
  MapPin,
  Building2,
  Phone,
  Search,
  CheckCircle2,
  ArrowRight,
  Filter,
  IndianRupee,
  Calendar,
  Send
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const FindBuyersPage = () => {
  const { t, buyers, addToast, setCurrentView } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeReqModal, setActiveReqModal] = useState(null);
  const [activeOfferModal, setActiveOfferModal] = useState(null);

  // Offer form state
  const [offerForm, setOfferForm] = useState({
    crop: 'Onion',
    quantity: 100,
    askingPrice: 3350,
    pickupDate: 'Tomorrow Morning',
    message: 'Grade A produce ready in mesh bags at farmgate. Farm has concrete truck approach road.'
  });

  const cropFilterList = ['All', 'Onion', 'Tomato', 'Grapes', 'Soybean', 'Pomegranate'];
  const locationsList = ['All', 'Nashik', 'Pune', 'Mumbai', 'Solapur', 'Kolhapur'];

  const filteredBuyers = buyers.filter((buyer) => {
    const matchesCrop = selectedCrop === 'All' || buyer.cropRequirement.toLowerCase() === selectedCrop.toLowerCase();
    const matchesLoc = selectedLocation === 'All' || buyer.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesPrice = !minPrice || buyer.maxPrice >= Number(minPrice);
    const matchesSearch = !searchQuery || 
      buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.cropRequirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.buyerType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCrop && matchesLoc && matchesPrice && matchesSearch;
  });

  const handleSendOfferSubmit = (e) => {
    e.preventDefault();
    addToast(`Offer sent to ${activeOfferModal.name}! They typically respond within 2 hours.`, 'success');
    setActiveOfferModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('findBuyers')}
        category="🤝 Find Buyers"
        relatedLinks={[
          { id: 'create-lot', label: '+ Create Lot' },
          { id: 'my-offers', label: 'My Offers' },
          { id: 'compare-markets', label: 'Compare Mandis' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('buyerDirectory')}
          </h1>
          <p className="text-sm text-gray-500">
            Directly connect with 1,250+ KYC-verified corporate buyers, food processors, exporters, and Mandi traders
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Escrow Protected Contracts</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or crop..."
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
              {cropFilterList.map(c => (
                <option key={c} value={c}>Crop: {c}</option>
              ))}
            </select>
          </div>

          {/* Location filter */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            >
              {locationsList.map(l => (
                <option key={l} value={l}>Location: {l}</option>
              ))}
            </select>
          </div>

          {/* Min price filter */}
          <div>
            <input
              type="number"
              placeholder="Min Offering Price (₹/q)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {/* Buyer top header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black text-gray-900">{buyer.name}</h3>
                    {buyer.verified && (
                      <span title="KYC & APMC Verified Buyer">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold">{buyer.buyerType}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{buyer.rating}</span>
                  <span className="text-gray-400 text-[10px]">({buyer.dealsCompleted})</span>
                </div>
              </div>

              {/* Requirement highlights */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">{t('lookingFor')}:</span>
                  <strong className="text-gray-900 font-black text-sm">
                    {buyer.requiredQuantity} quintal {buyer.cropRequirement}
                  </strong>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-gray-500 font-bold">{t('offeringPrice')}:</span>
                  <strong className="text-emerald-700 font-black text-base">
                    {buyer.priceRange}
                  </strong>
                </div>

                <div className="flex justify-between pt-1 border-t border-gray-200/60">
                  <span className="text-gray-500 font-bold">Location:</span>
                  <span className="text-gray-800 font-semibold">{buyer.location} ({buyer.distance})</span>
                </div>
              </div>

              {/* Payment terms tag */}
              <div className="text-[11px] text-gray-600 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{buyer.paymentTerms}</span>
              </div>
            </div>

            {/* Actions buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActiveReqModal(buyer)}
                className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {t('viewRequirement')}
              </button>
              <button
                onClick={() => {
                  setActiveOfferModal(buyer);
                  setOfferForm({
                    ...offerForm,
                    crop: buyer.cropRequirement,
                    askingPrice: buyer.maxPrice
                  });
                }}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {t('makeOffer')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal 1: View Requirement */}
      {activeReqModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveReqModal(null)}
          title={`Buyer Profile: ${activeReqModal.name}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-600">Company Type:</span>
                <span className="font-black text-gray-900">{activeReqModal.buyerType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-600">Verification Status:</span>
                <span className="text-emerald-700 font-black flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% KYC & Mandi License Verified</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-600">Deals Settled:</span>
                <span className="font-black text-gray-900">{activeReqModal.dealsCompleted} successful farmer purchases</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-gray-900 text-sm">Produce Specifications Required:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Crop: <strong>{activeReqModal.cropRequirement}</strong></li>
                <li>Batch Volume: <strong>{activeReqModal.requiredQuantity} Quintals</strong> (partial lots accepted)</li>
                <li>Acceptable Price: <strong>{activeReqModal.priceRange}</strong></li>
                <li>Grade Standard: Grade A / Export specifications (low moisture, uniform size)</li>
                <li>Packaging: 50 kg breathable leno mesh bags or plastic crates</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-gray-900 text-sm">Procurement Contact Desk:</h4>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <div>Person: <strong>{activeReqModal.contactPerson}</strong></div>
                <div>Phone: <strong>{activeReqModal.phone}</strong></div>
                <div>Hub: <strong>{activeReqModal.location}</strong></div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveReqModal(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const b = activeReqModal;
                  setActiveReqModal(null);
                  setActiveOfferModal(b);
                  setOfferForm({
                    ...offerForm,
                    crop: b.cropRequirement,
                    askingPrice: b.maxPrice
                  });
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Make Direct Offer
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 2: Make Offer to Buyer */}
      {activeOfferModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveOfferModal(null)}
          title={`Make Offer to ${activeOfferModal.name}`}
        >
          <form onSubmit={handleSendOfferSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 font-semibold">
              Buyer is offering <strong>{activeOfferModal.priceRange}</strong> for <strong>{activeOfferModal.cropRequirement}</strong>. Submit your farm lot proposal below:
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Crop</label>
                <input
                  type="text"
                  readOnly
                  value={offerForm.crop}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Quantity (Quintal)</label>
                <input
                  type="number"
                  required
                  value={offerForm.quantity}
                  onChange={(e) => setOfferForm({ ...offerForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Asking Price (₹/q)</label>
                <input
                  type="number"
                  required
                  value={offerForm.askingPrice}
                  onChange={(e) => setOfferForm({ ...offerForm, askingPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-700 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Ready for Pickup</label>
                <input
                  type="text"
                  required
                  value={offerForm.pickupDate}
                  onChange={(e) => setOfferForm({ ...offerForm, pickupDate: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Deal Value</label>
              <div className="text-xl font-black text-emerald-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                ₹{(Number(offerForm.askingPrice || 0) * Number(offerForm.quantity || 0)).toLocaleString()}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message / Quality Details</label>
              <textarea
                rows="3"
                value={offerForm.message}
                onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-hidden focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveOfferModal(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Offer to Buyer</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
