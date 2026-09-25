import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PlusCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Camera,
  MapPin,
  IndianRupee,
  Scale,
  Award,
  Sparkles,
  Tag,
  Eye,
  Check,
  Building2
} from 'lucide-react';
import { ActionSubHeader } from '../components/ActionSubHeader';

export const CreateLotPage = () => {
  const { t, createLot, comparisonParams, setCurrentView, profile, loginAs, setBuyerActiveTab } = useApp();

  const [step, setStep] = useState(1);
  const [publishedLotId, setPublishedLotId] = useState(null);

  // Form State across 7 steps
  const [lotData, setLotData] = useState({
    crop: comparisonParams?.crop || 'Onion',
    variety: 'Bhima Super (Red)',
    quantity: comparisonParams?.quantity || 100,
    bagsCount: 200,
    packaging: '50kg Mesh Bags',
    quality: 'Grade A (Export / High Brix)',
    moisture: 'Low (< 12%)',
    size: '55mm - 65mm Uniform',
    expectedPrice: comparisonParams?.expectedPrice || 3300,
    pickupLocation: `${profile.gutNumber}, ${profile.village}, ${profile.district}`,
    pincode: profile.pincode,
    landmark: 'Near Gram Panchayat Water Tank',
    photos: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80'
    ]
  });

  const cropsList = [
    { name: 'Onion', nameMr: 'कांदा', icon: '🧅', defaultPrice: 3300 },
    { name: 'Tomato', nameMr: 'टोमॅटो', icon: '🍅', defaultPrice: 2500 },
    { name: 'Wheat', nameMr: 'गहू', icon: '🌾', defaultPrice: 2850 },
    { name: 'Soybean', nameMr: 'सोयाबीन', icon: '🌱', defaultPrice: 4700 },
    { name: 'Cotton', nameMr: 'कापूस', icon: '☁️', defaultPrice: 7400 },
    { name: 'Grapes', nameMr: 'द्राक्षे', icon: '🍇', defaultPrice: 6600 },
    { name: 'Pomegranate', nameMr: 'डाळिंब', icon: '🍎', defaultPrice: 11200 },
    { name: 'Maize', nameMr: 'मका', icon: '🌽', defaultPrice: 2350 }
  ];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = () => {
    const lotId = createLot(lotData);
    setPublishedLotId(lotId);
  };

  const totalEstimatedValue = Number(lotData.quantity || 0) * Number(lotData.expectedPrice || 0);

  // Success Screen
  if (publishedLotId) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            LOT PUBLISHED SUCCESSFULLY
          </span>
          <h1 className="text-3xl font-black text-gray-900">
            {t('lotPublishedSuccess')}
          </h1>
          <p className="text-sm text-gray-600">
            Your lot is now visible to verified buyers across Maharashtra and Gujarat APMCs.
          </p>
        </div>

        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-6 text-left space-y-3 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
            <div>
              <span className="text-xs font-bold text-gray-500">Assigned Lot ID:</span>
              <div className="text-2xl font-black text-emerald-800">#{publishedLotId}</div>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-600 text-white rounded-full">
              Status: Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-gray-700">
            <div>Crop: <strong className="text-gray-900">{lotData.crop}</strong></div>
            <div>Volume: <strong className="text-gray-900">{lotData.quantity} Quintals</strong></div>
            <div>Expected Rate: <strong className="text-emerald-700">₹{lotData.expectedPrice}/q</strong></div>
            <div>Quality: <strong className="text-gray-900">{lotData.quality}</strong></div>
            <div>Pickup: <strong className="text-gray-900">{profile.village}, {profile.district}</strong></div>
            <div>Estimated Value: <strong className="text-emerald-700">₹{totalEstimatedValue.toLocaleString()}</strong></div>
          </div>

          <div className="pt-3 border-t border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>Simulated Instant Buyer Match: ABC Foods Pvt Ltd received an alert!</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              loginAs('buyer');
              if (setBuyerActiveTab) setBuyerActiveTab('browse-lots');
              setCurrentView('dashboard');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Switch to Merchant View to Browse Lot #{publishedLotId}</span>
          </button>

          <button
            onClick={() => setCurrentView('my-offers')}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Tag className="w-4 h-4" />
            <span>Check Offers ({t('myOffers')})</span>
          </button>

          <button
            onClick={() => {
              setPublishedLotId(null);
              setStep(1);
            }}
            className="w-full sm:w-auto px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-xl transition-all cursor-pointer"
          >
            <span>+ Create Another</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back to Action Hub Header */}
      <ActionSubHeader
        title={t('createLot')}
        category="🌾 Sell My Crop"
        relatedLinks={[
          { id: 'crops', label: 'My Crops' },
          { id: 'my-offers', label: 'My Offers' },
          { id: 'my-sales', label: 'My Sales' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {t('createLotTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Step {step} of 7 • Simple multi-step wizard for Indian farmers
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
          <span>Progress: Step {step} of 7</span>
          <span className="text-emerald-700 font-black">{Math.round((step / 7) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 7) * 100}%` }}
          ></div>
        </div>
        <div className="hidden sm:grid grid-cols-7 gap-1 mt-3 text-[10px] font-bold text-gray-400 text-center">
          <span className={step >= 1 ? 'text-emerald-700' : ''}>1. Crop</span>
          <span className={step >= 2 ? 'text-emerald-700' : ''}>2. Qty</span>
          <span className={step >= 3 ? 'text-emerald-700' : ''}>3. Quality</span>
          <span className={step >= 4 ? 'text-emerald-700' : ''}>4. Price</span>
          <span className={step >= 5 ? 'text-emerald-700' : ''}>5. Location</span>
          <span className={step >= 6 ? 'text-emerald-700' : ''}>6. Photos</span>
          <span className={step >= 7 ? 'text-emerald-700' : ''}>7. Review</span>
        </div>
      </div>

      {/* Wizard Step Content Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6">
        {/* STEP 1: SELECT CROP */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 1: Select Your Crop</h3>
              <p className="text-xs text-gray-500">Choose which harvested crop lot you want to sell today</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cropsList.map((c) => {
                const isSelected = lotData.crop.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setLotData({ ...lotData, crop: c.name, expectedPrice: c.defaultPrice })}
                    className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md scale-102'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="text-3xl mb-1">{c.icon}</div>
                    <div className="font-black text-sm">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.nameMr}</div>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop Variety / वाण</label>
              <input
                type="text"
                value={lotData.variety}
                onChange={(e) => setLotData({ ...lotData, variety: e.target.value })}
                placeholder="e.g. Bhima Super / Abhinav / Thompson"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: QUANTITY */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 2: Enter Lot Quantity</h3>
              <p className="text-xs text-gray-500">Specify volume in quintals and packaging method</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity in Quintals (क्विंटल)</label>
                <input
                  type="number"
                  min="1"
                  value={lotData.quantity}
                  onChange={(e) => setLotData({ ...lotData, quantity: e.target.value, bagsCount: Number(e.target.value) * 2 })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-black text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
                <div className="text-[11px] text-gray-500 mt-1">1 Quintal = 100 Kilograms (approx {(Number(lotData.quantity) / 10).toFixed(1)} Metric Tons)</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Packaging Method</label>
                <select
                  value={lotData.packaging}
                  onChange={(e) => setLotData({ ...lotData, packaging: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="50kg Mesh Bags">50kg Breathable Mesh / Leno Bags</option>
                  <option value="20kg Crates">20kg Plastic Crates (Tomato/Fruit)</option>
                  <option value="Loose Bulk Loading">Loose Bulk (Trolley / Truck)</option>
                  <option value="Gunny Jute Bags">Standard Jute Gunny Bags</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standard Truck Load: 100 quintals fills 1 Tata 407 / Eicher freight load</span>
            </div>
          </div>
        )}

        {/* STEP 3: QUALITY */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 3: Quality & Grading</h3>
              <p className="text-xs text-gray-500">Graded produce fetches up to 15% higher buyer bidding</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {['Grade A (Export / High Brix)', 'Grade B (Good Quality)', 'Grade C (Standard Mandi)'].map((g) => (
                <div
                  key={g}
                  onClick={() => setLotData({ ...lotData, quality: g })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    lotData.quality === g
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-black'
                      : 'border-gray-200 bg-white font-semibold text-gray-700'
                  }`}
                >
                  <Award className={`w-5 h-5 mb-2 ${lotData.quality === g ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div className="text-xs">{g}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Moisture Level</label>
                <select
                  value={lotData.moisture}
                  onChange={(e) => setLotData({ ...lotData, moisture: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                >
                  <option value="Low (< 12%)">Low / Fully Cured (&lt; 12%)</option>
                  <option value="Medium (12-15%)">Medium (12% - 15%)</option>
                  <option value="Fresh Wet Harvest">Freshly Dug (Wet)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Size Uniformity</label>
                <input
                  type="text"
                  value={lotData.size}
                  onChange={(e) => setLotData({ ...lotData, size: e.target.value })}
                  placeholder="e.g. 50-60mm medium uniform"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: EXPECTED PRICE */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 4: Expected Selling Price</h3>
              <p className="text-xs text-gray-500">Set your asking rate per quintal. Buyers will negotiate around this rate.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Expected Rate (₹/quintal)</label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  min="100"
                  value={lotData.expectedPrice}
                  onChange={(e) => setLotData({ ...lotData, expectedPrice: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xl font-black text-emerald-700 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span>Current Lasalgaon APMC Benchmark:</span>
                <span className="text-gray-900">₹3,250/q</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span>Total Expected Gross Value:</span>
                <span className="text-emerald-700 text-base font-black">₹{totalEstimatedValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PICKUP LOCATION */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 5: Farmgate Pickup Location</h3>
              <p className="text-xs text-gray-500">Where will buyer trucks collect the produce?</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farm / Gat Address</label>
              <input
                type="text"
                value={lotData.pickupLocation}
                onChange={(e) => setLotData({ ...lotData, pickupLocation: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pincode</label>
                <input
                  type="text"
                  value={lotData.pincode}
                  onChange={(e) => setLotData({ ...lotData, pincode: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nearby Landmark for Transporter</label>
                <input
                  type="text"
                  value={lotData.landmark}
                  onChange={(e) => setLotData({ ...lotData, landmark: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: CROP PHOTOS */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 6: Crop Photos</h3>
              <p className="text-xs text-gray-500">Actual photos build buyer trust and prevent weighbridge rejections</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {lotData.photos.map((p, idx) => (
                <div key={idx} className="relative h-36 rounded-2xl overflow-hidden border border-gray-200 shadow-xs">
                  <img src={p} alt="Crop sample" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    Sample Photo {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 text-center space-y-2 bg-emerald-50/40">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-900">Take Photo with Mobile Camera or Upload</div>
              <div className="text-[11px] text-gray-500">JPG, PNG up to 10MB (Simulated uploader active)</div>
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & PUBLISH */}
        {step === 7 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Step 7: Final Review & Publish</h3>
              <p className="text-xs text-gray-500">Verify your lot specifications before publishing to verified buyers</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Crop & Variety:</span>
                <span className="text-gray-900 font-black">{lotData.crop} ({lotData.variety})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Total Quantity:</span>
                <span className="text-gray-900 font-black">{lotData.quantity} Quintals ({lotData.packaging})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Grading / Quality:</span>
                <span className="text-gray-900 font-black">{lotData.quality}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Expected Asking Price:</span>
                <span className="text-emerald-700 font-black text-sm">₹{lotData.expectedPrice}/quintal</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Total Deal Value:</span>
                <span className="text-emerald-700 font-black text-base">₹{totalEstimatedValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Pickup Location:</span>
                <span className="text-gray-900 font-bold">{lotData.pickupLocation}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Publishing this lot will trigger instant matching with 1,250+ buyers and send real-time bids.</span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer scale-102 transition-transform"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('publishLot')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
