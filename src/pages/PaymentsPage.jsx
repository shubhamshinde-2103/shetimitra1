import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Building2,
  Calendar,
  CreditCard,
  Lock
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const PaymentsPage = () => {
  const { t, sales, profile, addToast } = useApp();

  const [receiptTxn, setReceiptTxn] = useState(null);

  const transactions = [
    {
      id: 'TXN-984210',
      buyer: 'ABC Foods Pvt Ltd',
      crop: 'Onion',
      amount: 335000,
      status: 'Paid',
      method: 'IMPS Direct Bank Transfer',
      utr: 'MAHB2624910291',
      date: '2026-09-08'
    },
    {
      id: 'TXN-984188',
      buyer: 'FreshMart Retail Ltd',
      crop: 'Tomato',
      amount: 85000,
      status: 'Pending',
      method: 'Escrow Lock (Clearing in 24 hrs)',
      utr: 'Pending Mandi Weighment Stamp',
      date: '2026-09-06'
    },
    {
      id: 'TXN-983944',
      buyer: 'AgroExport India Ltd',
      crop: 'Grapes',
      amount: 520000,
      status: 'Paid',
      method: 'RTGS Electronic Transfer',
      utr: 'HDFC0001928472',
      date: '2026-08-29'
    },
    {
      id: 'TXN-983602',
      buyer: 'Maharashtra Agro Traders',
      crop: 'Soybean',
      amount: 188000,
      status: 'Paid',
      method: 'IMPS Fast Transfer',
      utr: 'SBIN9928172641',
      date: '2026-09-03'
    }
  ];

  const totalEarnings = transactions
    .filter(t => t.status === 'Paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingPayments = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('paymentsTitle')}
        category="💰 Payments & Accounts"
        relatedLinks={[
          { id: 'my-sales', label: 'My Sales Orders' },
          { id: 'my-offers', label: 'Buyer Offers' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('paymentsTitle')}
          </h1>
          <p className="text-sm text-gray-500">
            Escrow-protected direct bank transfers, settlement receipts, and pending clearance status
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 shrink-0">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>{t('guaranteedEscrow')}</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-3xl p-6 text-white shadow-xl space-y-2">
          <span className="text-xs font-bold uppercase text-emerald-200 tracking-wider">
            {t('totalEarnings')} (जमा झालेली रक्कम)
          </span>
          <div className="text-3xl sm:text-4xl font-black tracking-tight">
            ₹{totalEarnings.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-200 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Credited directly to Bank of Maharashtra</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
            {t('pendingPayouts')} (प्रलंबित)
          </span>
          <div className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">
            ₹{pendingPayments.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Held in ShetiMitra Escrow (Safe)</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
            Linked Settlement Account
          </span>
          <div className="text-lg font-black text-gray-900 tracking-tight">
            {profile.bankName}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            A/C: *******{profile.accountNumber.slice(-4)} • IFSC: {profile.ifscCode}
          </div>
          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            Aadhaar NPCI Seeded
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-lg font-black text-gray-900">Transaction History</h3>
          <span className="text-xs text-gray-500 font-semibold">{transactions.length} Total Settlements</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Transaction ID</th>
                <th className="p-3.5">Buyer</th>
                <th className="p-3.5">Crop</th>
                <th className="p-3.5">Amount (₹)</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-gray-900">{txn.id}</td>
                  <td className="p-3.5 font-bold text-gray-900">{txn.buyer}</td>
                  <td className="p-3.5">{txn.crop}</td>
                  <td className="p-3.5 font-black text-emerald-700 text-sm">₹{txn.amount.toLocaleString()}</td>
                  <td className="p-3.5 text-gray-500">{txn.date}</td>
                  <td className="p-3.5">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setReceiptTxn(txn)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      {receiptTxn && (
        <Modal
          isOpen={true}
          onClose={() => setReceiptTxn(null)}
          title={`Settlement Voucher #${receiptTxn.id}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Payment Status:</span>
                <span className="font-black text-emerald-800">{receiptTxn.status} via Escrow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">UTR Reference:</span>
                <span className="font-mono font-bold text-gray-900">{receiptTxn.utr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Transfer Channel:</span>
                <span className="font-bold text-gray-900">{receiptTxn.method}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Payer (Buyer):</span>
                <strong className="text-gray-900">{receiptTxn.buyer}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Beneficiary (Farmer):</span>
                <strong className="text-gray-900">{profile.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Crop Lot:</span>
                <strong className="text-gray-900">{receiptTxn.crop}</strong>
              </div>
              <div className="flex justify-between text-base font-black pt-2 border-t border-gray-200">
                <span>Total Settled Amount:</span>
                <span className="text-emerald-700">₹{receiptTxn.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => setReceiptTxn(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => addToast('Receipt downloaded to device storage', 'success')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('downloadReceipt')}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
