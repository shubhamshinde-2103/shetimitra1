import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  FileText,
  Truck,
  IndianRupee,
  CheckCircle2,
  Clock,
  Printer,
  QrCode,
  ShieldCheck,
  Calendar,
  Building2
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const MySalesPage = () => {
  const { t, sales, setCurrentView, profile } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'completed' | 'cancelled'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredSales = sales.filter((s) => {
    if (activeTab === 'all') return true;
    return s.status === activeTab;
  });

  const pendingCount = sales.filter(s => s.status === 'pending').length;
  const completedCount = sales.filter(s => s.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('mySales')}
        category="🌾 Sell My Crop"
        relatedLinks={[
          { id: 'crops', label: 'My Crops' },
          { id: 'create-lot', label: '+ Create Lot' },
          { id: 'my-offers', label: 'My Offers' },
          { id: 'payments', label: 'Payments' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('salesTitle')}
          </h1>
          <p className="text-sm text-gray-500">
            Track confirmed sale contracts, dispatch statuses, and digital tax invoices
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            All ({sales.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pending' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            {t('pendingSales')} ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'completed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            {t('completedSales')} ({completedCount})
          </button>
        </div>
      </div>

      {/* Sales Cards */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Order #{sale.id}</span>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md">
                  {sale.crop} • {sale.quantity} Quintals
                </span>
                <span className="text-xs text-gray-400">Lot: {sale.lotId}</span>
              </div>
              <StatusBadge status={sale.status === 'completed' ? 'Delivered & Paid' : 'Payment Pending via Escrow'} />
            </div>

            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 space-y-1">
                <div className="text-xs text-gray-400 font-bold uppercase">{t('buyerName')}</div>
                <h4 className="text-base font-black text-gray-900">{sale.buyerName}</h4>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Sale Date: {sale.date}</span>
                </div>
              </div>

              <div className="md:col-span-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Agreed Price:</span>
                  <strong className="text-gray-900">₹{sale.pricePerQuintal.toLocaleString()}/q</strong>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Total Value:</span>
                  <strong className="text-emerald-700 text-base font-black">₹{sale.totalAmount.toLocaleString()}</strong>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-gray-200/60 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{sale.paymentStatus}</span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedInvoice(sale)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span>{t('viewInvoice')}</span>
                </button>

                {sale.status === 'pending' && (
                  <button
                    onClick={() => setCurrentView('transport')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{t('bookTransportForSale')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInvoice(null)}
          title={`Official Mandi Sale Slip #${selectedInvoice.invoiceNo}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs sm:text-sm text-gray-800">
            {/* Printable Header */}
            <div className="text-center pb-4 border-b border-gray-200 space-y-1">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-black text-lg">
                <span>ShetiMitra Agricultural Trade Slip</span>
              </div>
              <p className="text-[11px] text-gray-500">Government of Maharashtra APMC Unified Electronic Contract</p>
              <div className="text-xs font-mono font-bold text-gray-600">Invoice: {selectedInvoice.invoiceNo} | Date: {selectedInvoice.date}</div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase">Seller (Farmer):</span>
                <div className="font-black text-gray-900">{profile.name}</div>
                <div className="text-[11px] text-gray-600">{profile.village}, {profile.district}</div>
                <div className="text-[11px] text-gray-600">Gat: {profile.gutNumber}</div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase">Buyer:</span>
                <div className="font-black text-gray-900">{selectedInvoice.buyerName}</div>
                <div className="text-[11px] text-gray-600">GST / APMC Lic: 27AABCS8891P1ZV</div>
                <div className="text-[11px] text-emerald-700 font-semibold">100% Escrow Secured</div>
              </div>
            </div>

            {/* Itemized table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50 text-emerald-950 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Produce Description</th>
                    <th className="p-3">Weight (Quintals)</th>
                    <th className="p-3">Rate (₹/q)</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-bold">{selectedInvoice.crop} (Grade A)</td>
                    <td className="p-3">{selectedInvoice.quantity} q</td>
                    <td className="p-3">₹{selectedInvoice.pricePerQuintal.toLocaleString()}</td>
                    <td className="p-3 text-right font-black text-gray-900">₹{selectedInvoice.totalAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Summary & QR */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                  <QrCode className="w-10 h-10 text-gray-700" />
                </div>
                <div className="text-[11px] text-gray-500 space-y-0.5">
                  <div className="font-bold text-gray-800">DigiLocker & APMC Verified</div>
                  <div>Scan to verify authenticity</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 font-bold">Total Payout:</span>
                <div className="text-2xl font-black text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
