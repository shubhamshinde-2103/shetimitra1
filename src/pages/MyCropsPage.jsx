import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  Plus,
  Calendar,
  MapPin,
  Scale,
  Award,
  Edit2,
  Trash2,
  PlusCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { ActionSubHeader } from '../components/ActionSubHeader';

export const MyCropsPage = () => {
  const { 
    t, 
    crops, 
    addCrop, 
    updateCrop, 
    deleteCrop, 
    setCurrentView,
    startComparisonForCrop
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);

  const initialFormState = {
    name: 'Onion',
    variety: '',
    area: '',
    expectedYield: '',
    harvestDate: '',
    quality: 'Grade A (Export)',
    location: 'Dindori, Nashik',
    status: 'growing'
  };

  const [formData, setFormData] = useState(initialFormState);

  const cropOptions = [
    'Onion',
    'Tomato',
    'Wheat',
    'Soybean',
    'Cotton',
    'Grapes',
    'Pomegranate',
    'Maize'
  ];

  const handleOpenAddModal = () => {
    setEditingCrop(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name,
      variety: crop.variety,
      area: crop.area,
      expectedYield: crop.expectedYield,
      harvestDate: crop.harvestDate,
      quality: crop.quality,
      location: crop.location,
      status: crop.status || 'growing'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCrop) {
      updateCrop({
        ...editingCrop,
        ...formData,
        area: Number(formData.area),
        expectedYield: Number(formData.expectedYield)
      });
    } else {
      addCrop({
        ...formData,
        area: Number(formData.area),
        expectedYield: Number(formData.expectedYield)
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (cropId) => {
    if (window.confirm('Are you sure you want to delete this crop record?')) {
      deleteCrop(cropId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('myCrops')}
        category="🌾 Sell My Crop"
        relatedLinks={[
          { id: 'create-lot', label: '+ Create Lot' },
          { id: 'my-offers', label: 'My Offers' },
          { id: 'my-sales', label: 'My Sales' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t('myCrops')}
          </h1>
          <p className="text-sm text-gray-500">
            Manage your standing crops, forecast harvest volume, and create direct market lots
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>{t('addCrop')}</span>
        </button>
      </div>

      {/* Crops Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Crop Image & Badges */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <StatusBadge status={crop.status === 'ready' ? t('ready') : t('growing')} />
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-xl font-black">{crop.name}</h3>
                  <p className="text-xs text-emerald-200 font-semibold">{crop.variety}</p>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(crop)}
                    className="p-2 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-emerald-700 transition-colors shadow-xs"
                    title={t('edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(crop.id)}
                    className="p-2 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 transition-colors shadow-xs"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specs */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-emerald-50/60 rounded-xl p-2.5">
                    <span className="text-[11px] font-bold text-gray-500 block">{t('area')}</span>
                    <span className="text-base font-black text-gray-900">{crop.area} {t('acres')}</span>
                  </div>
                  <div className="bg-emerald-50/60 rounded-xl p-2.5">
                    <span className="text-[11px] font-bold text-gray-500 block">{t('expectedYield')}</span>
                    <span className="text-base font-black text-emerald-700">{crop.expectedYield} {t('quintal')}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{t('harvestDate')}: <strong className="text-gray-900">{crop.harvestDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{t('qualityGrade')}: <strong className="text-gray-900">{crop.quality}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{t('location')}: <strong className="text-gray-900">{crop.location}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => startComparisonForCrop(crop.name, crop.expectedYield)}
                className="py-2.5 px-3 bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 font-bold text-xs rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compare Mandis</span>
              </button>
              <button
                onClick={() => setCurrentView('create-lot')}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Lot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Crop Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCrop ? `${t('edit')}: ${editingCrop.name}` : t('addCrop')}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('cropName')}</label>
              <select
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              >
                {cropOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('variety')}</label>
              <input
                type="text"
                required
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                placeholder="e.g. Bhima Super / 1505"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('area')}</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 2.5"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('expectedYield')}</label>
              <input
                type="number"
                required
                value={formData.expectedYield}
                onChange={(e) => setFormData({ ...formData, expectedYield: e.target.value })}
                placeholder="e.g. 100"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('harvestDate')}</label>
              <input
                type="date"
                required
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('qualityGrade')}</label>
              <select
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Grade A (Export)">Grade A (Export / Premium)</option>
                <option value="Grade B (Good)">Grade B (Good Quality)</option>
                <option value="Grade C (Standard)">Grade C (Standard Mandi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t('location')}</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Dindori, Nashik"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              {editingCrop ? t('save') : t('addCrop')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
