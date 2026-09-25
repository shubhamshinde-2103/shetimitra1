import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Landmark,
  ShieldCheck,
  CreditCard,
  Edit2,
  Phone,
  Droplets,
  Sprout,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const ProfilePage = () => {
  const { t, profile, updateProfile, addToast } = useApp();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aadhaar & KCC Verified Farmer</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">{profile.name}</h2>
            <p className="text-xs text-gray-500 font-semibold">
              📍 {profile.village}, {profile.taluka}, {profile.district} • {profile.phone}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({ ...profile });
            setIsEditOpen(true);
          }}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Grid of Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Land & Farm Holding */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-black text-gray-900">Land & Cultivation Record (७/१२ उतारा)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Total Land Area:</span>
              <strong className="text-gray-900 font-black">{profile.landHolding}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Gut Numbers:</span>
              <strong className="text-gray-900 font-black">{profile.gutNumber}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Soil Profile:</span>
              <strong className="text-gray-900 font-black">{profile.soilType}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Irrigation Sources:</span>
              <strong className="text-gray-900 font-black">{profile.irrigation}</strong>
            </div>
          </div>
        </div>

        {/* Banking & Credit Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Landmark className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-black text-gray-900">Direct Benefit Transfer (DBT) Bank</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Bank Name:</span>
              <strong className="text-gray-900 font-black">{profile.bankName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Account Number:</span>
              <strong className="text-gray-900 font-mono font-black">{profile.accountNumber}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">IFSC Code:</span>
              <strong className="text-gray-900 font-mono font-black">{profile.ifscCode}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-bold">Kisan Credit Card (KCC):</span>
              <strong className="text-emerald-700 font-black">{profile.kccLimit} Approved</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsEditOpen(false)}
          title="Edit Farmer Profile"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Village / Town</label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">District</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Land Holding</label>
                <input
                  type="text"
                  required
                  value={formData.landHolding}
                  onChange={(e) => setFormData({ ...formData, landHolding: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Save Profile
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
