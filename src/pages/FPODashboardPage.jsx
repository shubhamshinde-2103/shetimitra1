import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Building2,
  Sprout,
  Truck,
  IndianRupee,
  Sparkles,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Scale,
  Award,
  Calendar,
  FileCheck
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const FPODashboardPage = () => {
  const { t, setCurrentView, addToast } = useApp();

  const [aggregateModalOpen, setAggregateModalOpen] = useState(false);
  const [fpoLotForm, setFpoLotForm] = useState({
    crop: 'Onion (Grade A Export)',
    memberCount: 42,
    totalVolume: 500, // quintal
    targetPrice: 3400
  });

  const fpoStats = [
    { label: 'Registered Farmer Members', value: '284', desc: 'Dindori & Niphad Talukas' },
    { label: 'Collective Cultivation', value: '1,420 Acres', desc: 'Onion, Grapes, Tomato' },
    { label: 'Active Bulk Contracts', value: '₹1.84 Cr', desc: 'ITC & AgroExport India' },
    { label: 'Member Payouts Settled', value: '100% On-Time', desc: 'Direct DBT Bank Transfer' },
  ];

  const fpoActionCards = [
    {
      id: 'fpo-aggregate',
      emoji: '🌾',
      title: 'Collective Lot Aggregation',
      desc: 'Pool produce from 280+ member farmers to form 500+ quintal uniform lots that attract premium institutional buyers.',
      badge: '42 Farmers Ready to Pool',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      color: 'from-emerald-500/10 via-emerald-50/50 to-white border-emerald-200 hover:border-emerald-500',
      action: () => setAggregateModalOpen(true),
      actionLabel: '+ Create FPO Collective Lot',
      subActions: [
        { label: 'Member Harvest Forecast', action: () => setCurrentView('crops') },
        { label: 'Grade Standardization', action: () => setCurrentView('create-lot') },
        { label: 'Village Collection Centers', action: () => setCurrentView('storage') }
      ]
    },
    {
      id: 'fpo-buyers',
      emoji: '🏢',
      title: 'Institutional Bulk Buyers',
      desc: 'Negotiate bulk supply agreements directly with retail supermarket chains, food processing companies, and exporters.',
      badge: '6 Active Procurement Tenders',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      color: 'from-blue-500/10 via-blue-50/50 to-white border-blue-200 hover:border-blue-500',
      action: () => setCurrentView('find-buyers'),
      actionLabel: 'Explore Institutional Buyers',
      subActions: [
        { label: 'Corporate Buyer Directory', action: () => setCurrentView('find-buyers') },
        { label: 'Tender Bids & Offers', action: () => setCurrentView('my-offers') },
        { label: 'Long-term Supply Contracts', action: () => setCurrentView('my-sales') }
      ]
    },
    {
      id: 'fpo-logistics',
      emoji: '🚚',
      title: 'FPO Shared Fleet Logistics',
      desc: 'Deploy 16-ton multi-axle trucks and optimize farmgate collection routes across all member villages.',
      badge: '3 Heavy Trucks En Route',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      color: 'from-purple-500/10 via-purple-50/50 to-white border-purple-200 hover:border-purple-500',
      action: () => setCurrentView('transport'),
      actionLabel: 'Manage FPO Transport Fleet',
      subActions: [
        { label: 'Heavy Truck Marketplace', action: () => setCurrentView('transport') },
        { label: 'Shared Transport Pooling', action: () => setCurrentView('transport') },
        { label: 'FPO Cold Chain Facility', action: () => setCurrentView('storage') }
      ]
    },
    {
      id: 'fpo-finance',
      emoji: '💰',
      title: 'Member Farmer Payouts',
      desc: 'Transparent digital disbursement of bulk sales proceeds to individual farmer bank accounts under APMC escrow audit.',
      badge: 'Zero Default Record',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      color: 'from-teal-500/10 via-teal-50/50 to-white border-teal-200 hover:border-teal-500',
      action: () => setCurrentView('payments'),
      actionLabel: 'View Member Settlement Ledger',
      subActions: [
        { label: 'Escrow Payout Statements', action: () => setCurrentView('payments') },
        { label: 'FPO Commission Ledger', action: () => setCurrentView('payments') },
        { label: 'Digital GST Invoices', action: () => setCurrentView('my-sales') }
      ]
    },
    {
      id: 'fpo-schemes',
      emoji: '🏛️',
      title: 'FPO Grants & Subsidies',
      desc: 'Access SFAC Central Equity Matching Grant up to ₹15 Lakhs and World Bank funded SMART Maharashtra FPO infrastructure.',
      badge: 'SMART Project Approved',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      color: 'from-rose-500/10 via-rose-50/50 to-white border-rose-200 hover:border-rose-500',
      action: () => setCurrentView('government'),
      actionLabel: 'View FPO Schemes & Grants',
      subActions: [
        { label: 'SFAC Equity Grant', action: () => setCurrentView('government') },
        { label: 'Cold Storage 50% Subsidy', action: () => setCurrentView('storage') },
        { label: 'NABARD FPO Credit Line', action: () => setCurrentView('government') }
      ]
    },
    {
      id: 'fpo-ai',
      emoji: '🤖',
      title: 'Cluster Sowing & AI Market Intel',
      desc: 'Prevent market glut. Distribute crop sowing patterns across member acreage based on projected 6-month APMC demand.',
      badge: 'Cluster Yield Optimized',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      color: 'from-indigo-500/10 via-indigo-50/50 to-white border-indigo-200 hover:border-indigo-500',
      action: () => setCurrentView('ai-insights'),
      actionLabel: 'Run Cluster Advisory Engine',
      subActions: [
        { label: 'Where Should FPO Sell?', action: () => setCurrentView('compare-markets') },
        { label: 'Price Forecast Radar', action: () => setCurrentView('ai-insights') },
        { label: 'Crop Diversification Model', action: () => setCurrentView('ai-insights') }
      ]
    }
  ];

  const handleCreateFpoLot = (e) => {
    e.preventDefault();
    addToast(`Collective Lot of ${fpoLotForm.totalVolume}q Onion published on behalf of ${fpoLotForm.memberCount} member farmers!`, 'success');
    setAggregateModalOpen(false);
    setCurrentView('find-buyers');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-purple-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/80 text-purple-200 text-xs font-bold border border-purple-600/50">
            <Users className="w-3.5 h-3.5 text-purple-300" />
            <span>FPO Producer Hub • शेतकरी उत्पादक संस्था कक्ष</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Sahyadri Bio-Farms FPO (सह्याद्री ॲग्रो)
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm max-w-xl font-medium">
            Nashik & Niphad Cluster • 284 Active Member Farmers • Ministry of Corporate Affairs CIN: U01111MH2021PTC368921
          </p>
        </div>

        <button
          onClick={() => setAggregateModalOpen(true)}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Collective Lot</span>
        </button>
      </div>

      {/* FPO KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fpoStats.map((st, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">{st.label}</span>
            <div className="text-2xl font-black text-purple-950">{st.value}</div>
            <div className="text-xs text-purple-700 font-semibold">{st.desc}</div>
          </div>
        ))}
      </div>

      {/* What do you want to do today? Action Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              FPO Action Center: What do you want to do today?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Aggregated procurement, bulk corporate tendering, member payments, and subsidized logistics.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            6 FPO Core Modules
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fpoActionCards.map((card) => (
            <div
              key={card.id}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 border-2 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-0.5`}
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
                  <h3 className="text-lg font-black text-gray-900">{card.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">{card.desc}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-200/60">
                <div className="flex flex-wrap gap-1.5">
                  {card.subActions.map((sub, i) => (
                    <button
                      key={i}
                      onClick={sub.action}
                      className="px-2.5 py-1.5 bg-white hover:bg-purple-50 text-gray-800 hover:text-purple-900 border border-gray-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={card.action}
                  className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{card.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aggregate Lot Modal */}
      {aggregateModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAggregateModalOpen(false)}
          title="Create FPO Collective Bulk Lot"
        >
          <form onSubmit={handleCreateFpoLot} className="space-y-4">
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 text-xs space-y-1 text-purple-950">
              <div className="font-bold">FPO Aggregation Mode:</div>
              <p>Aggregates produce across verified member farms into a single commercial batch for bulk institutional sales.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop & Grade</label>
              <input
                type="text"
                required
                value={fpoLotForm.crop}
                onChange={(e) => setFpoLotForm({ ...fpoLotForm, crop: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contributing Farmers</label>
                <input
                  type="number"
                  required
                  value={fpoLotForm.memberCount}
                  onChange={(e) => setFpoLotForm({ ...fpoLotForm, memberCount: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Volume (Quintals)</label>
                <input
                  type="number"
                  required
                  value={fpoLotForm.totalVolume}
                  onChange={(e) => setFpoLotForm({ ...fpoLotForm, totalVolume: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-purple-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">FPO Reserve Price (₹/quintal)</label>
              <input
                type="number"
                required
                value={fpoLotForm.targetPrice}
                onChange={(e) => setFpoLotForm({ ...fpoLotForm, targetPrice: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-lg font-black text-emerald-700"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setAggregateModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md"
              >
                Publish Collective Lot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
