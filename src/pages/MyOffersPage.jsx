import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Tag,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Building2,
  Calendar,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
  Truck,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const MyOffersPage = () => {
  const { 
    t, 
    offers, 
    acceptOffer, 
    rejectOffer, 
    counterOffer, 
    setCurrentView 
  } = useApp();

  const [negotiatingOffer, setNegotiatingOffer] = useState(null);
  const [counterPrice, setCounterPrice] = useState('');
  const [counterMsg, setCounterMsg] = useState('');

  const handleOpenNegotiate = (offer) => {
    setNegotiatingOffer(offer);
    setCounterPrice(offer.offerPrice + 100);
    setCounterMsg(`Our produce is Grade A cured with dry outer skin. Can you meet at ₹${offer.offerPrice + 100}/q?`);
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    if (!counterPrice) return;
    counterOffer(negotiatingOffer.id, counterPrice, counterMsg);
    setNegotiatingOffer(null);
  };

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('myOffers')}
        category="🌾 Sell My Crop"
        relatedLinks={[
          { id: 'crops', label: 'My Crops' },
          { id: 'create-lot', label: '+ Create Lot' },
          { id: 'my-sales', label: 'My Sales' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('myOffers')}
          </h1>
          <p className="text-sm text-gray-500">
            Review incoming bids from verified buyers, negotiate counter prices, or accept to create instant sale contracts
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Legally Binding Digital Sale Contracts</span>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Tag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No offers received yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Publish your first crop lot so verified food processors and exporters can send competitive bids.
            </p>
            <button
              onClick={() => setCurrentView('create-lot')}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Create Lot Now
            </button>
          </div>
        ) : (
          offers.map((offer) => {
            const isPending = offer.status === 'pending';
            const isAccepted = offer.status === 'accepted';
            const isCountered = offer.status === 'countered';
            const isRejected = offer.status === 'rejected';

            return (
              <div
                key={offer.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-xs hover:shadow-md space-y-4 ${
                  isAccepted
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : isPending
                    ? 'border-gray-200 ring-1 ring-emerald-500/20'
                    : 'border-gray-200 opacity-80'
                }`}
              >
                {/* Top Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-400">Lot #{offer.lotId}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-black px-2.5 py-0.5 rounded-lg">
                      {offer.crop} • {offer.quantity} Quintals
                    </span>
                    <span className="text-xs text-gray-400">({offer.receivedAt})</span>
                  </div>
                  <StatusBadge status={offer.status} />
                </div>

                {/* Main Offer Body */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  {/* Buyer details */}
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-black text-gray-900">{offer.buyerName}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-gray-500">📍 {offer.buyerLocation} • ★ {offer.buyerRating} Rating</p>
                    <p className="text-xs text-gray-600 italic">"{offer.notes}"</p>
                  </div>

                  {/* Pricing Details */}
                  <div className="md:col-span-4 bg-gray-50 rounded-2xl p-4 space-y-1 border border-gray-100">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">{t('offerPrice')}</span>
                    <div className="text-2xl font-black text-emerald-700">
                      ₹{offer.offerPrice.toLocaleString()}<span className="text-xs font-semibold text-gray-500">{t('perQuintal')}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-700">
                      {t('totalAmount')}: <span className="text-emerald-800 font-black">₹{offer.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="md:col-span-4 space-y-2 text-xs font-semibold text-gray-600">
                    <div className="flex items-start gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                      <span>{offer.transportTerms}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{offer.paymentTerms}</span>
                    </div>
                  </div>
                </div>

                {/* Counter Details if already countered */}
                {isCountered && (
                  <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-200 text-xs flex items-center justify-between text-purple-950">
                    <div>
                      <span className="font-bold">Your Counter Offer Sent: </span>
                      <strong>₹{offer.counterPrice}/q</strong> (Total: ₹{offer.totalAmount.toLocaleString()})
                      <div className="text-purple-700 italic mt-0.5">"{offer.counterMessage}"</div>
                    </div>
                    <span className="text-purple-600 font-bold text-[11px] bg-purple-100 px-2.5 py-1 rounded-md">
                      Awaiting Buyer Reply
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                {isPending && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => rejectOffer(offer.id)}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {t('reject')}
                    </button>
                    <button
                      onClick={() => handleOpenNegotiate(offer)}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t('negotiate')}</span>
                    </button>
                    <button
                      onClick={() => acceptOffer(offer.id)}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('accept')}</span>
                    </button>
                  </div>
                )}

                {isAccepted && (
                  <div className="flex items-center justify-between pt-3 border-t border-emerald-200 text-xs">
                    <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Sale confirmed! Sale contract generated.</span>
                    </span>
                    <button
                      onClick={() => setCurrentView('my-sales')}
                      className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <span>View in My Sales</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Counter Offer Modal */}
      {negotiatingOffer && (
        <Modal
          isOpen={true}
          onClose={() => setNegotiatingOffer(null)}
          title={`Negotiate with ${negotiatingOffer.buyerName}`}
        >
          <form onSubmit={handleCounterSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Buyer's Initial Offer:</span>
                <strong className="text-gray-900 font-black">₹{negotiatingOffer.offerPrice}/q</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Lot & Volume:</span>
                <strong className="text-gray-900">{negotiatingOffer.crop} ({negotiatingOffer.quantity}q)</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('counterPrice')}
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  required
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-black text-emerald-700 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('counterMessage')}
              </label>
              <textarea
                rows="3"
                value={counterMsg}
                onChange={(e) => setCounterMsg(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-hidden focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setNegotiatingOffer(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md"
              >
                {t('submitCounter')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
