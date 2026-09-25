import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

export const LanguageSelector = ({ compact = false }) => {
  const { language, setLanguage } = useApp();

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी', short: 'मरा' },
    { code: 'hi', label: 'हिंदी', short: 'हिं' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-lg p-0.5">
        <Globe className="w-3.5 h-3.5 text-emerald-700 ml-1.5" />
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
              language === lang.code
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            {lang.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-emerald-200 rounded-xl p-1 shadow-xs">
      <div className="flex items-center gap-1.5 px-2 text-emerald-800">
        <Globe className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Lang:</span>
      </div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            language === lang.code
              ? 'bg-emerald-600 text-white shadow-sm scale-102'
              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
