import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Landmark,
  ShieldCheck,
  FileText,
  ExternalLink,
  CheckCircle2,
  PhoneCall,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const GovernmentPage = () => {
  const { t, governmentSchemes, addToast } = useApp();

  const [activeSection, setActiveSection] = useState('schemes'); // 'schemes' | 'policies' | 'updates'
  const [selectedScheme, setSelectedScheme] = useState(null);

  const policies = [
    {
      title: 'Maharashtra APMC Electronic Trading Policy 2026',
      department: 'Cooperation & Marketing Department, Mantralaya Mumbai',
      summary: 'Grants full legal recognition to direct farmgate digital trade contracts and single unified market licenses across all 305 APMCs in Maharashtra.',
      date: 'Updated: August 2026',
      badge: 'Active Gazette'
    },
    {
      title: 'Kisan Credit Card (KCC) Collateral-Free Limit Enhancement',
      department: 'Reserve Bank of India & NABARD',
      summary: 'Collateral-free agricultural loans extended up to ₹1.60 Lakh for prompt repaying small and marginal farmers with subsidized 4% net interest rate.',
      date: 'Effective: Kharif 2026',
      badge: 'RBI Guideline'
    }
  ];

  const updates = [
    {
      title: 'Export Duty Revised for Summer & Kharif Onion',
      source: 'Directorate General of Foreign Trade (DGFT)',
      date: '08 Sept 2026',
      summary: 'Export minimum price removed for Grade A Red Onion to facilitate smooth exports through Nhava Sheva port, benefiting Nashik and Ahmednagar farmers.'
    },
    {
      title: 'State MSP Procurement Windows Announced for Soybean & Maize',
      source: 'Maharashtra State Cooperative Marketing Federation',
      date: '04 Sept 2026',
      summary: 'Online registration for Minimum Support Price (MSP) centers commences from 15th Sept on e-Samridhi portal.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold">
            <Landmark className="w-3.5 h-3.5 text-emerald-300" />
            <span>शासकीय योजना व कृषी धोरणे • Govt Schemes Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {t('government')}
          </h1>
          <p className="text-emerald-100/90 text-sm max-w-2xl font-medium">
            Direct farmer welfare subsidies, crop insurance claim portals, and official agriculture department notices.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs space-y-1 shrink-0">
          <div className="text-emerald-300 font-bold uppercase">Kisan Call Center</div>
          <div className="text-xl font-black text-white flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>1800-180-1551</span>
          </div>
          <div className="text-emerald-200 text-[11px]">Toll-Free (24x7 in Marathi & Hindi)</div>
        </div>
      </div>

      {/* Section Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('schemes')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSection === 'schemes' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Central & State Schemes (योजना)
        </button>
        <button
          onClick={() => setActiveSection('policies')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSection === 'policies' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Agricultural Policies (धोरणे)
        </button>
        <button
          onClick={() => setActiveSection('updates')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSection === 'updates' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Daily Govt Updates (बातम्या)
        </button>
      </div>

      {/* SECTION 1: SCHEMES */}
      {activeSection === 'schemes' && (
        <div className="grid md:grid-cols-2 gap-6">
          {governmentSchemes.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{sch.name}</h3>
                    <p className="text-xs text-emerald-700 font-semibold">{sch.nameMr}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black shrink-0">
                    Active
                  </span>
                </div>

                <div className="bg-emerald-50/60 rounded-2xl p-4 space-y-2 text-xs border border-emerald-100">
                  <div>
                    <span className="text-gray-500 font-bold block">Financial Benefit:</span>
                    <strong className="text-emerald-900 text-sm font-black">{sch.financialBenefit}</strong>
                  </div>
                  <div className="pt-2 border-t border-emerald-200/50">
                    <span className="text-gray-500 font-bold block">Eligibility:</span>
                    <span className="text-gray-800">{sch.eligibility}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div>Required Documents: <strong>{sch.keyDocuments}</strong></div>
                  <div className="text-emerald-700 font-bold text-[11px] pt-1">Status: {sch.officialStatus}</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedScheme(sch)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Details & Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: POLICIES */}
      {activeSection === 'policies' && (
        <div className="space-y-4">
          {policies.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">{p.badge}</span>
                <span className="text-xs text-gray-400 font-semibold">{p.date}</span>
              </div>
              <h3 className="text-lg font-black text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-500 font-semibold">{p.department}</p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl">{p.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: UPDATES */}
      {activeSection === 'updates' && (
        <div className="space-y-4">
          {updates.map((u, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">{u.source}</span>
                <span className="text-xs text-gray-400">{u.date}</span>
              </div>
              <h3 className="text-base font-black text-gray-900">{u.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{u.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedScheme(null)}
          title={`Scheme Information: ${selectedScheme.name}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
              <div className="font-bold text-gray-700">Implementing Agency:</div>
              <div className="text-emerald-950 font-black">{selectedScheme.department}</div>
              <div className="pt-2 border-t border-emerald-200 font-bold text-gray-700">Financial Aid:</div>
              <div className="text-emerald-900 font-black">{selectedScheme.financialBenefit}</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">How to Apply (MahaDBT / PM-KISAN Portal):</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Keep your Aadhaar Card and linked mobile number handy for OTP verification.</li>
                <li>Ensure 7/12 & 8A land records are updated on digital e-Hakk portal.</li>
                <li>Submit application at local CSC / Aaple Sarkar Seva Kendra or portal.</li>
                <li>Taluka Agriculture Officer (तालुका कृषी अधिकारी) inspects and approves DBT disbursement.</li>
              </ol>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast('Redirecting to official MahaDBT Farmer Portal...', 'info');
                  setSelectedScheme(null);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Apply on MahaDBT
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
