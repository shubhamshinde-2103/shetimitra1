import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

export const ActionSubHeader = ({ title, category, relatedLinks = [] }) => {
  const { setCurrentView, t } = useApp();

  return (
    <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-xs sm:text-sm rounded-xl border border-emerald-200 transition-all cursor-pointer shadow-xs hover:scale-102"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
          <span className="text-gray-400">{category || 'Action'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-emerald-900 font-bold">{title}</span>
        </div>
      </div>

      {/* Quick Siblings Links */}
      {relatedLinks.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-gray-400 shrink-0 hidden lg:inline">Related:</span>
          {relatedLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentView(link.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                link.active
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
