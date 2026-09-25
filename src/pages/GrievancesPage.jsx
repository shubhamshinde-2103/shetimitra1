import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Upload,
  Send,
  FileText,
  UserCheck
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const GrievancesPage = () => {
  const { t, grievances, submitGrievance, sales } = useApp();

  const [formData, setFormData] = useState({
    category: 'Payment Delay',
    subject: '',
    description: '',
    relatedTransaction: sales[0]?.id || 'Order #sale-904',
    photoName: 'weighbridge_slip.jpg'
  });

  const categories = [
    'Payment Delay (पेमेंट विलंब)',
    'Weighment Discrepancy (वजनात तफावत)',
    'Quality & Grade Dispute (प्रतवारी वाद)',
    'Transporter Delay / Damage (वाहतूक नुकसान)',
    'Buyer Unresponsive (खरेदीदार संपर्क नसणे)',
    'Other APMC Issue (इतर समस्या)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) return;
    submitGrievance(formData);
    setFormData({
      category: 'Payment Delay',
      subject: '',
      description: '',
      relatedTransaction: sales[0]?.id || 'General',
      photoName: 'receipt.jpg'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {t('grievancesTitle')}
        </h1>
        <p className="text-sm text-gray-500">
          Official APMC Dispute & Redressal Cell. Escrow payments are locked during active dispute resolution.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Form to Raise Grievance */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <ShieldAlert className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-black text-gray-900">{t('raiseGrievance')}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('relatedTransaction')}
              </label>
              <select
                value={formData.relatedTransaction}
                onChange={(e) => setFormData({ ...formData, relatedTransaction: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              >
                {sales.map((s) => (
                  <option key={s.id} value={`${s.id} (${s.crop} - ${s.buyerName})`}>
                    Sale #{s.id} • {s.crop} ({s.buyerName})
                  </option>
                ))}
                <option value="General Mandi Dispute">General APMC Weighbridge Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('subject')}
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary of dispute"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {t('description')}
              </label>
              <textarea
                rows="4"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide details of dates, weighbridge receipts, or communication"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-hidden focus:border-emerald-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Attach Proof / Weighbridge Slip
              </label>
              <div className="border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50 flex items-center justify-between text-xs text-gray-600">
                <span className="truncate">📎 {formData.photoName}</span>
                <span className="text-[11px] font-bold text-emerald-700">Uploaded</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t('submitGrievance')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Active Grievances Tracker */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-lg font-black text-gray-900">{t('activeGrievances')}</h3>
            <span className="text-xs text-gray-500 font-bold">{grievances.length} Registered</span>
          </div>

          <div className="space-y-4">
            {grievances.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-gray-400">#{g.id}</span>
                  <StatusBadge status={g.status} />
                </div>

                <div>
                  <h4 className="text-base font-black text-gray-900">{g.subject}</h4>
                  <p className="text-xs text-gray-500 font-semibold">{g.category} • {g.relatedTransaction}</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
                  {g.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Officer: <strong>{g.officerAssigned}</strong></span>
                  </div>
                  {g.resolutionNotes && (
                    <div className="text-emerald-800 bg-emerald-50 p-2.5 rounded-lg text-[11px] font-bold">
                      Resolution: {g.resolutionNotes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
