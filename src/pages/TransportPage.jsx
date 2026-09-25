import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck,
  Users,
  Star,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Sparkles,
  IndianRupee
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { ActionSubHeader } from '../components/ActionSubHeader';


export const TransportPage = () => {
  const { 
    t, 
    transportVehicles, 
    sharedRides, 
    joinSharedRide, 
    addToast,
    profile 
  } = useApp();

  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'shared'
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [joiningRide, setJoiningRide] = useState(null);

  // Booking modal form
  const [bookingForm, setBookingForm] = useState({
    pickupDate: 'Tomorrow Morning (06:00 AM)',
    pickupLocation: `${profile.village}, ${profile.district}`,
    cargoQuintals: 80,
    destinationMandi: 'Lasalgaon APMC'
  });

  // Shared modal form
  const [sharedForm, setSharedForm] = useState({
    farmerName: profile.name,
    cargoQuintals: 40,
    cropName: 'Onion (कांदा)'
  });

  const handleBookVehicleSubmit = (e) => {
    e.preventDefault();
    addToast(`Transport booked with ${bookingVehicle.driverName} (${bookingVehicle.vehicleType})! Driver notified.`, 'success');
    setBookingVehicle(null);
  };

  const handleJoinSharedSubmit = (e) => {
    e.preventDefault();
    if (Number(sharedForm.cargoQuintals) > joiningRide.availableCapacity) {
      addToast(`Requested quintals exceed available space of ${joiningRide.availableCapacity}q`, 'error');
      return;
    }
    joinSharedRide(joiningRide.id, sharedForm.farmerName, sharedForm.cargoQuintals);
    setJoiningRide(null);
  };

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('transportMarketplace')}
        category="🚚 Transport & Storage"
        relatedLinks={[
          { id: 'storage', label: 'Cold Storage & Silos' },
          { id: 'my-sales', label: 'My Sales' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('transportMarketplace')}
          </h1>
          <p className="text-sm text-gray-500">
            Book verified farmgate trucks or split costs with fellow farmers via Shared Transport pooling
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'marketplace' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600'
            }`}
          >
            Vehicle Marketplace
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'shared' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-emerald-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shared Transport (Save ₹)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VEHICLE MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transportVehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-gray-400 block">{v.vehicleNo}</span>
                    <h3 className="text-lg font-black text-gray-900">{v.vehicleType}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{v.rating}</span>
                    <span className="text-gray-400 text-[10px]">({v.completedTrips})</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">{t('capacity')}:</span>
                    <strong className="text-gray-900 font-black">{v.capacity} Quintals (approx {(v.capacity/10)} Tons)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">{t('driverName')}:</span>
                    <strong className="text-gray-900">{v.driverName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">{t('route')}:</span>
                    <strong className="text-gray-900">{v.route}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-200/60">
                    <span className="text-gray-500 font-bold">{t('cost')}:</span>
                    <strong className="text-emerald-700 font-black text-base">₹{v.cost.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 italic">
                  Features: {v.features}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setBookingVehicle(v)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('bookTransportBtn')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SHARED TRANSPORT (Required Feature) */}
      {activeTab === 'shared' && (
        <div className="space-y-6">
          {/* Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-emerald-300">Cost-Saving Feature</span>
              <h2 className="text-2xl font-black">{t('sharedTransport')}</h2>
              <p className="text-xs text-emerald-100 max-w-xl">
                Pool freight with nearby farmers travelling to the same mandi. Reduce empty miles and save up to ₹1,200 per trip!
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 text-center shrink-0">
              <div className="text-xs font-bold text-emerald-200">Average Savings</div>
              <div className="text-2xl font-black text-white">40% Less Freight</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sharedRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-md space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{ride.farmersJoined} farmers travelling together</span>
                    </span>
                    <span className="text-xs text-gray-500 font-bold">{ride.date}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-gray-900">{ride.route}</h3>
                    <p className="text-xs text-emerald-700 font-semibold">{ride.vehicleType} • Driver: {ride.driverName}</p>
                  </div>

                  {/* Progress Bar of Capacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-600">Available Capacity:</span>
                      <span className="text-emerald-700 font-black">{ride.availableCapacity} quintals left</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${(ride.occupiedCapacity / ride.totalCapacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Occupied: {ride.occupiedCapacity}q / Total {ride.totalCapacity}q
                    </div>
                  </div>

                  {/* Joined Farmers */}
                  <div className="bg-gray-50 rounded-2xl p-3.5 text-xs space-y-1.5">
                    <div className="font-bold text-gray-700">Farmers already onboard:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {ride.farmerNames.map((name, i) => (
                        <span key={i} className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-gray-800">
                          🧑‍🌾 {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Savings calculation badge */}
                  <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-500 block">Your Shared Split Cost:</span>
                      <strong className="text-emerald-800 font-black text-base">₹{ride.sharedCostPerFarmer}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 block">Estimated Saving:</span>
                      <strong className="text-emerald-600 font-black text-base flex items-center gap-0.5 justify-end">
                        <TrendingDown className="w-4 h-4" />
                        <span>Save ₹{ride.estimatedSaving}</span>
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setJoiningRide(ride)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>{t('joinSharedBtn')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Transport Modal */}
      {bookingVehicle && (
        <Modal
          isOpen={true}
          onClose={() => setBookingVehicle(null)}
          title={`Book Transport: ${bookingVehicle.vehicleType}`}
        >
          <form onSubmit={handleBookVehicleSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Driver:</span>
                <strong className="font-bold text-gray-900">{bookingVehicle.driverName} ({bookingVehicle.driverPhone})</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Route Freight:</span>
                <strong className="font-black text-emerald-800">₹{bookingVehicle.cost.toLocaleString()}</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pickup Date & Time</label>
              <input
                type="text"
                required
                value={bookingForm.pickupDate}
                onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farm Pickup Address</label>
              <input
                type="text"
                required
                value={bookingForm.pickupLocation}
                onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cargo Volume (Quintal)</label>
                <input
                  type="number"
                  required
                  value={bookingForm.cargoQuintals}
                  onChange={(e) => setBookingForm({ ...bookingForm, cargoQuintals: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Destination Mandi</label>
                <input
                  type="text"
                  required
                  value={bookingForm.destinationMandi}
                  onChange={(e) => setBookingForm({ ...bookingForm, destinationMandi: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setBookingVehicle(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Vehicle Booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Join Shared Ride Modal */}
      {joiningRide && (
        <Modal
          isOpen={true}
          onClose={() => setJoiningRide(null)}
          title={`Join Shared Transport to ${joiningRide.route.split('→')[1]}`}
        >
          <form onSubmit={handleJoinSharedSubmit} className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-600 font-bold">Route & Date:</span>
                <strong className="text-gray-900">{joiningRide.route} ({joiningRide.date})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-bold">Available Space:</span>
                <strong className="text-emerald-700 font-black">{joiningRide.availableCapacity} Quintals available</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-bold">Standard Cost vs Shared Split:</span>
                <strong className="text-emerald-800">Only ₹{joiningRide.sharedCostPerFarmer} (Save ₹{joiningRide.estimatedSaving}!)</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name / Farm ID</label>
              <input
                type="text"
                required
                value={sharedForm.farmerName}
                onChange={(e) => setSharedForm({ ...sharedForm, farmerName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop</label>
                <input
                  type="text"
                  required
                  value={sharedForm.cropName}
                  onChange={(e) => setSharedForm({ ...sharedForm, cropName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quintals to Load</label>
                <input
                  type="number"
                  max={joiningRide.availableCapacity}
                  required
                  value={sharedForm.cargoQuintals}
                  onChange={(e) => setSharedForm({ ...sharedForm, cargoQuintals: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-700"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setJoiningRide(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Shared Pool Slot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
