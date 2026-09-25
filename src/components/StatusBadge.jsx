import React from 'react';

export const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';

  if (s.includes('grow') || s.includes('वाढ') || s.includes('बढ़')) {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium';
  } else if (s.includes('ready') || s.includes('तयार') || s.includes('सक्रिय') || s.includes('active')) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
  } else if (s.includes('paid') || s.includes('resolved') || s.includes('complete') || s.includes('स्वीकार') || s.includes('निवारण')) {
    colorClasses = 'bg-green-50 text-green-800 border-green-200 font-bold';
  } else if (s.includes('pending') || s.includes('review') || s.includes('प्रलंबित') || s.includes('तपासणी') || s.includes('समीक्षा')) {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
  } else if (s.includes('reject') || s.includes('cancel') || s.includes('रद्द') || s.includes('नाकार')) {
    colorClasses = 'bg-red-50 text-red-800 border-red-200 font-medium';
  } else if (s.includes('counter') || s.includes('बोलणी')) {
    colorClasses = 'bg-purple-50 text-purple-800 border-purple-200 font-medium';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${colorClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
};
