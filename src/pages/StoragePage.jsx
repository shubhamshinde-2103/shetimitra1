import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Warehouse,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Thermometer,
  FileCheck,
  CheckCircle2,
  IndianRupee,
  Phone
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { ActionSubHeader } from '../components/ActionSubHeader';

export const StoragePage = () => {
  const { t, storages, bookStorage } = useApp();

  const [bookingStorageItem, setBookingStorageItem] = useState(null);
  const [reserveForm, setReserveForm] = useState({
    crop: 'Onion (कांदा)',
    quantityMT: 10,
    durationDays: 30
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    bookStorage(bookingStorageItem.id, reserveForm.quantityMT, reserveForm.durationDays);
    setBookingStorageItem(null);
  };

  const estimatedStorageFee = bookingStorageItem
    ? Number(reserveForm.quantityMT || 0) * 10 * Number(reserveForm.durationDays || 0) * bookingStorageItem.pricePerDayPerQuintal
    : 0;

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('storageTitle')}
        category="🚚 Transport & Storage"
        relatedLinks={[
          { id: 'transport', label: 'Book Transport Vehicle' },
          { id: 'my-crops', label: 'My Standing Crops' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('storageTitle')}
          </h1>
          <p className="text-sm text-gray-500">
            WDRA-registered cold chains and warehouses. Avoid distress selling and avail electronic warehouse receipt (e-NWR) bank loans.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 shrink-0">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>70% Pledge Loan Eligible via e-NWR</span>
        </div>
      </div>

      {/* Storage Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storages.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-black text-gray-900">{st.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold">{st.nameMr}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{st.rating}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">{t('totalCapacity')}:</span>
                  <strong className="text-gray-900">{st.totalCapacity.toLocaleString()} MT</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">{t('availableSpace')}:</span>
                  <strong className="text-emerald-700 font-black text-sm">{st.availableSpace.toLocaleString()} MT</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Distance:</span>
                  <strong className="text-gray-900">{st.distance} km from your farm</strong>
                </div>

                <div className="flex justify-between pt-1 border-t border-gray-200/60 items-baseline">
                  <span className="text-gray-500 font-bold">{t('storageRate')}:</span>
                  <strong className="text-emerald-800 font-black text-base">
                    ₹{st.pricePerDayPerQuintal} <span className="text-xs font-normal text-gray-500">/day/quintal</span>
                  </strong>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{st.tempRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{st.certifications}</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Suitable for: <strong className="text-gray-800">{st.suitableFor}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setBookingStorageItem(st)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Warehouse className="w-4 h-4" />
                <span>{t('bookStorageBtn')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingStorageItem && (
        <Modal
          isOpen={true}
          onClose={() => setBookingStorageItem(null)}
          title={`Reserve Space: ${bookingStorageItem.name}`}
        >
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Available Space:</span>
                <strong className="text-gray-900">{bookingStorageItem.availableSpace} MT</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Daily Rate:</span>
                <strong className="text-emerald-800 font-black">₹{bookingStorageItem.pricePerDayPerQuintal} /day/quintal</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop to Store</label>
              <input
                type="text"
                required
                value={reserveForm.crop}
                onChange={(e) => setReserveForm({ ...reserveForm, crop: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity (Metric Tons)</label>
                <input
                  type="number"
                  min="1"
                  max={bookingStorageItem.availableSpace}
                  required
                  value={reserveForm.quantityMT}
                  onChange={(e) => setReserveForm({ ...reserveForm, quantityMT: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900"
                />
                <div className="text-[10px] text-gray-400 mt-1">= {Number(reserveForm.quantityMT) * 10} Quintals</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={reserveForm.durationDays}
                  onChange={(e) => setReserveForm({ ...reserveForm, durationDays: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex justify-between items-baseline text-xs">
              <span className="text-gray-600 font-bold">Estimated Storage Bill:</span>
              <span className="text-lg font-black text-emerald-700">₹{estimatedStorageFee.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setBookingStorageItem(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Storage Slot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
