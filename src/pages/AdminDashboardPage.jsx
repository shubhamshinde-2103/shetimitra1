import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Scale,
  Building2,
  Users,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Gavel,
  Landmark
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const AdminDashboardPage = () => {
  const { role, loginAs, setCurrentView, grievances, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('oversight');

  if (role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Restricted APMC Regulator Area</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          This portal is reserved strictly for APMC State Officers, Market Secretaries, and Arbitration Panels.
        </p>
        <button
          onClick={() => loginAs('admin')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
        >
          Login as Admin Demo (APMC Regulator)
        </button>
      </div>
    );
  }

  const adminStats = [
    { label: 'Registered APMCs (Maharashtra)', value: '305 Mandis', desc: 'Unified Electronic Trading Active' },
    { label: 'Pending Buyer KYC Approvals', value: '14 Traders', desc: 'Awaiting Mandi License Verification' },
    { label: 'Active Disputed Grievances', value: '2 Cases', desc: 'Escrow Withheld Pending Resolution' },
    { label: 'Mandi Cess Collected (Aug)', value: '₹14.2 Lakhs', desc: 'Auto-credited to State Treasury' },
  ];

  const adminActionCards = [
    {
      id: 'oversight',
      emoji: '⚖️',
      title: 'Mandi Auction Oversight',
      desc: 'Real-time surveillance of daily APMC bidding, detecting illegal price cartels and abnormal price deviations.',
      badge: 'Live APMC Feed Active',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      color: 'from-amber-500/10 via-amber-50/50 to-white border-amber-200 hover:border-amber-500',
      action: () => setCurrentView('market-prices'),
      actionLabel: 'Inspect State APMC Live Feeds'
    },
    {
      id: 'verification',
      emoji: '🛡️',
      title: 'Buyer KYC & License Approvals',
      desc: 'Verify corporate food processor documents, APEDA export registrations, and mandatory bank solvency guarantees.',
      badge: '14 Pending Verification',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      color: 'from-blue-500/10 via-blue-50/50 to-white border-blue-200 hover:border-blue-500',
      action: () => addToast('Displaying pending corporate buyer licenses...', 'info'),
      actionLabel: 'Review Pending Applications'
    },
    {
      id: 'arbitration',
      emoji: '⚠️',
      title: 'Dispute Arbitration Cell',
      desc: 'Resolve weighment differences, delivery delays, and quality grading disputes with legally binding APMC orders.',
      badge: `${grievances.length} Active Disputes`,
      badgeColor: 'bg-red-100 text-red-900 border-red-300',
      color: 'from-red-500/10 via-red-50/50 to-white border-red-200 hover:border-red-500',
      action: () => setCurrentView('grievances'),
      actionLabel: 'Open Grievance Arbitration Desk'
    },
    {
      id: 'cess',
      emoji: '💰',
      title: 'Mandi Cess & Escrow Audit',
      desc: 'Automated 1% mandi cess ledger, tax remittances, and daily escrow reconciliation for farmer payment safety.',
      badge: 'Escrow Audit: 100% Cleared',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      color: 'from-teal-500/10 via-teal-50/50 to-white border-teal-200 hover:border-teal-500',
      action: () => setCurrentView('payments'),
      actionLabel: 'View Cess Revenue Ledger'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-bold border border-amber-600/50">
            <Gavel className="w-3.5 h-3.5 text-amber-300" />
            <span>APMC State Regulatory Board • कृषी उत्पन्न बाजार समिती प्रशासक</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Maharashtra APMC Central Command
          </h1>
          <p className="text-amber-200 text-xs sm:text-sm max-w-xl font-medium">
            Ministry of Cooperation & Marketing, Govt of Maharashtra • Mantralaya Mumbai Central Portal
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs space-y-1 shrink-0">
          <div className="text-amber-300 font-bold uppercase">Escrow Vault Security</div>
          <div className="text-xl font-black text-white">₹4.82 Cr Safe</div>
          <div className="text-amber-200 text-[11px]">RBI Regulated Nodal Account</div>
        </div>
      </div>

      {/* Admin KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((st, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">{st.label}</span>
            <div className="text-2xl font-black text-amber-950">{st.value}</div>
            <div className="text-xs text-amber-800 font-semibold">{st.desc}</div>
          </div>
        ))}
      </div>

      {/* Admin Action Hub Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Regulator Action Hub: What do you want to do today?
            </h2>
            <p className="text-xs text-gray-500">Supervise mandi trading, verify corporate buyers, arbitrate disputes.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {adminActionCards.map((card) => (
            <div
              key={card.id}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 border-2 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                    {card.emoji}
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-900">{card.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">{card.desc}</p>
                </div>
              </div>

              <button
                onClick={card.action}
                className="w-full py-3 bg-amber-900 hover:bg-amber-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{card.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
