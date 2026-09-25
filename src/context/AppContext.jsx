import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import {
  initialCrops,
  initialMarketPrices,
  initialBuyers,
  initialLots,
  initialOffers,
  initialSales,
  transportVehicles,
  sharedTransports,
  storageFacilities,
  initialGrievances,
  governmentSchemes,
  userProfile
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language state
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('shetimitra_lang') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('shetimitra_lang', lang);
    addToast(
      lang === 'mr' ? 'भाषा मराठीत बदलली आहे' : lang === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English',
      'info'
    );
  };

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  // Auth & Role
  const [role, setRoleState] = useState(() => {
    return localStorage.getItem('shetimitra_role') || 'farmer';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('shetimitra_auth') === 'true';
  });
  const [currentView, setCurrentView] = useState(() => {
    const isAuth = localStorage.getItem('shetimitra_auth') === 'true';
    return isAuth ? 'dashboard' : 'landing';
  });

  // Buyer active tab state (browse-lots, post-req, make-offer, my-purchases, payments)
  const [buyerActiveTab, setBuyerActiveTab] = useState('browse-lots');

  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem('shetimitra_role', newRole);
  };

  const loginAs = (demoRole) => {
    setRole(demoRole);
    setIsAuthenticated(true);
    localStorage.setItem('shetimitra_auth', 'true');
    setCurrentView('dashboard');
    const roleNames = {
      farmer: 'Farmer Ramesh Patil',
      buyer: 'Buyer ABC Foods Pvt Ltd',
      fpo: 'Sahyadri Bio-Farms FPO',
      admin: 'APMC State Administrator'
    };
    addToast(`Logged in as ${roleNames[demoRole] || demoRole}`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('shetimitra_auth', 'false');
    setCurrentView('landing');
    addToast('Logged out successfully', 'info');
  };

  // Persisted Crops
  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('shetimitra_crops');
    return saved ? JSON.parse(saved) : initialCrops;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_crops', JSON.stringify(crops));
  }, [crops]);

  const addCrop = (newCrop) => {
    const cropWithId = {
      ...newCrop,
      id: `crop-${Date.now()}`,
      image: newCrop.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80"
    };
    setCrops([cropWithId, ...crops]);
    addToast(`Added crop: ${newCrop.name}`, 'success');
  };

  const updateCrop = (updatedCrop) => {
    setCrops(crops.map(c => c.id === updatedCrop.id ? updatedCrop : c));
    addToast(`Updated crop: ${updatedCrop.name}`, 'success');
  };

  const deleteCrop = (cropId) => {
    setCrops(crops.filter(c => c.id !== cropId));
    addToast('Crop removed', 'info');
  };

  // Persisted Lots
  const [lots, setLots] = useState(() => {
    const saved = localStorage.getItem('shetimitra_lots');
    return saved ? JSON.parse(saved) : initialLots;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_lots', JSON.stringify(lots));
  }, [lots]);

  // Persisted Offers
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('shetimitra_offers');
    return saved ? JSON.parse(saved) : initialOffers;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_offers', JSON.stringify(offers));
  }, [offers]);

  // Persisted Sales
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('shetimitra_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_sales', JSON.stringify(sales));
  }, [sales]);

  // Create Lot Flow + Auto-generate simulated offer for realism
  const createLot = (lotData) => {
    const lotId = `SM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLot = {
      ...lotData,
      id: lotId,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      photosCount: lotData.photos ? lotData.photos.length : 1,
      offersCount: 1
    };
    setLots([newLot, ...lots]);

    // Auto generate a simulated offer from an interested verified buyer
    const matchingBuyer = initialBuyers.find(b => b.cropRequirement.toLowerCase() === lotData.crop.toLowerCase()) || initialBuyers[0];
    const generatedOfferPrice = Math.round(lotData.expectedPrice * 1.03); // slightly higher or close
    const simulatedOffer = {
      id: `off-${Date.now()}`,
      lotId: lotId,
      crop: lotData.crop,
      quantity: Number(lotData.quantity),
      buyerName: matchingBuyer.name,
      buyerRating: matchingBuyer.rating,
      buyerLocation: matchingBuyer.location,
      offerPrice: generatedOfferPrice,
      totalAmount: generatedOfferPrice * Number(lotData.quantity),
      transportTerms: "Farmgate pickup arranged by Buyer (Free transport)",
      paymentTerms: "100% Escrow secured bank transfer",
      status: "pending",
      receivedAt: "Just now",
      notes: "High quality grade inspected. Ready to dispatch truck upon acceptance."
    };

    setOffers([simulatedOffer, ...offers]);
    addToast(`Lot #${lotId} published successfully! An instant offer was received.`, 'success');
    return lotId;
  };

  const acceptOffer = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    // Update offer status
    setOffers(offers.map(o => o.id === offerId ? { ...o, status: 'accepted' } : o));

    // Create corresponding sale
    const newSale = {
      id: `sale-${Math.floor(1000 + Math.random() * 9000)}`,
      lotId: offer.lotId,
      crop: offer.crop,
      buyerName: offer.buyerName,
      quantity: offer.quantity,
      pricePerQuintal: offer.offerPrice,
      totalAmount: offer.totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentStatus: 'Payment Pending via Escrow',
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      pickupDate: 'Scheduled in 24 hrs'
    };
    setSales([newSale, ...sales]);

    // Update lot status
    setLots(lots.map(l => l.id === offer.lotId ? { ...l, status: 'Deal Closed' } : l));

    addToast(`Offer from ${offer.buyerName} accepted! Created Sale #${newSale.id}`, 'success');
  };

  const rejectOffer = (offerId) => {
    setOffers(offers.map(o => o.id === offerId ? { ...o, status: 'rejected' } : o));
    addToast('Offer rejected', 'info');
  };

  const counterOffer = (offerId, counterPrice, message) => {
    setOffers(offers.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          status: 'countered',
          counterPrice: Number(counterPrice),
          totalAmount: Number(counterPrice) * o.quantity,
          counterMessage: message
        };
      }
      return o;
    }));
    addToast(`Counter offer of ₹${counterPrice}/q sent to buyer!`, 'success');
  };

  // Buyer Specific Functions
  const makeBuyerOffer = (lotId, offerData) => {
    const lot = lots.find(l => l.id === lotId) || { crop: offerData.crop || 'Crop', quantity: offerData.quantity || 100 };
    const offerPrice = Number(offerData.offerPrice);
    const quantity = Number(lot.quantity || offerData.quantity || 100);
    const newOffer = {
      id: `off-${Date.now()}`,
      lotId: lotId,
      crop: lot.crop,
      quantity: quantity,
      buyerName: offerData.buyerName || "ABC Foods Pvt Ltd",
      buyerRating: 4.9,
      buyerLocation: "Nashik / Navi Mumbai",
      offerPrice: offerPrice,
      totalAmount: offerPrice * quantity,
      transportTerms: offerData.transportTerms || "Farmgate pickup arranged by Buyer (Free transport)",
      paymentTerms: offerData.paymentTerms || "100% Escrow secured bank transfer within 24h",
      status: "pending",
      receivedAt: "Just now",
      notes: offerData.notes || "Official procurement offer submitted via Buyer Portal."
    };

    setOffers([newOffer, ...offers]);
    setLots(lots.map(l => l.id === lotId ? { ...l, offersCount: (l.offersCount || 0) + 1 } : l));
    addToast(`Offer of ₹${offerPrice.toLocaleString()}/q sent to farmer for Lot #${lotId}!`, 'success');
    return newOffer.id;
  };

  // Buyer Requirements
  const initialBuyerRequirements = [
    {
      id: "req-1",
      crop: "Onion",
      variety: "Export Red / Bhima Super",
      quantity: 500,
      priceMin: 3100,
      priceMax: 3450,
      location: "Nashik, Ahmednagar",
      paymentTerms: "100% Escrow Bank Transfer within 24h",
      status: "Active",
      datePosted: "2026-09-20"
    },
    {
      id: "req-2",
      crop: "Tomato",
      variety: "Abhinav 1505 Firm",
      quantity: 200,
      priceMin: 2400,
      priceMax: 2700,
      location: "Pune, Junnar",
      paymentTerms: "50% Farmgate Advance, 50% Unloading",
      status: "Active",
      datePosted: "2026-09-21"
    }
  ];

  const [buyerRequirements, setBuyerRequirements] = useState(() => {
    const saved = localStorage.getItem('shetimitra_buyer_requirements');
    return saved ? JSON.parse(saved) : initialBuyerRequirements;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_buyer_requirements', JSON.stringify(buyerRequirements));
  }, [buyerRequirements]);

  const postBuyerRequirement = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Active',
      datePosted: new Date().toISOString().split('T')[0]
    };
    setBuyerRequirements([newReq, ...buyerRequirements]);
    addToast(`Procurement requirement for ${reqData.quantity}q ${reqData.crop} published!`, 'success');
  };

  // Escrow balance
  const [escrowBalance, setEscrowBalance] = useState(() => {
    const saved = localStorage.getItem('shetimitra_escrow_balance');
    return saved ? Number(saved) : 4250000;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_escrow_balance', escrowBalance.toString());
  }, [escrowBalance]);

  const depositEscrow = (amount) => {
    const addAmt = Number(amount);
    setEscrowBalance(prev => prev + addAmt);
    addToast(`₹${addAmt.toLocaleString()} successfully deposited into ShetiMitra Escrow!`, 'success');
  };

  const releaseEscrow = (saleId) => {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;
    setSales(sales.map(s => s.id === saleId ? { ...s, paymentStatus: 'Paid via Escrow (Settled)' } : s));
    addToast(`Escrow payment of ₹${sale.totalAmount.toLocaleString()} released to ${sale.buyerName || 'Farmer'}!`, 'success');
  };

  // Grievances
  const [grievances, setGrievances] = useState(() => {
    const saved = localStorage.getItem('shetimitra_grievances');
    return saved ? JSON.parse(saved) : initialGrievances;
  });

  useEffect(() => {
    localStorage.setItem('shetimitra_grievances', JSON.stringify(grievances));
  }, [grievances]);

  const submitGrievance = (grievanceData) => {
    const newGrievance = {
      ...grievanceData,
      id: `GRV-${Math.floor(400 + Math.random() * 200)}`,
      status: 'Submitted',
      officerAssigned: 'Assigned to APMC Grievance Officer',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    setGrievances([newGrievance, ...grievances]);
    addToast('Grievance filed successfully. APMC tracking number generated.', 'success');
  };

  // Transport & Shared
  const [sharedRides, setSharedRides] = useState(sharedTransports);
  const joinSharedRide = (rideId, farmerName, cargoQuintal) => {
    setSharedRides(sharedRides.map(r => {
      if (r.id === rideId) {
        return {
          ...r,
          farmersJoined: r.farmersJoined + 1,
          occupiedCapacity: r.occupiedCapacity + Number(cargoQuintal),
          availableCapacity: Math.max(0, r.availableCapacity - Number(cargoQuintal)),
          farmerNames: [...r.farmerNames, farmerName || 'You (Ramesh Patil)']
        };
      }
      return r;
    }));
    addToast(`Successfully joined shared transport! Saved freight costs.`, 'success');
  };

  // Storage bookings
  const [storages, setStorages] = useState(storageFacilities);
  const bookStorage = (storageId, quantityMT, durationDays) => {
    setStorages(storages.map(s => {
      if (s.id === storageId) {
        return {
          ...s,
          availableSpace: Math.max(0, s.availableSpace - Number(quantityMT))
        };
      }
      return s;
    }));
    addToast(`Storage space of ${quantityMT} MT reserved successfully!`, 'success');
  };

  // Profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('shetimitra_profile');
    return saved ? JSON.parse(saved) : userProfile;
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('shetimitra_profile', JSON.stringify(newProfile));
    addToast('Profile details updated successfully', 'success');
  };

  // Compare markets preselection helper
  const [comparisonParams, setComparisonParams] = useState({
    crop: 'Onion',
    quantity: 100,
    farmerLocation: 'Dindori, Nashik'
  });

  const startComparisonForCrop = (cropName, quantity = 100) => {
    setComparisonParams({
      crop: cropName,
      quantity: quantity,
      farmerLocation: profile.village + ', ' + profile.district
    });
    setCurrentView('compare-markets');
  };

  // Toast System
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      role,
      setRole,
      isAuthenticated,
      loginAs,
      logout,
      currentView,
      setCurrentView,
      buyerActiveTab,
      setBuyerActiveTab,
      crops,
      addCrop,
      updateCrop,
      deleteCrop,
      marketPrices: initialMarketPrices,
      buyers: initialBuyers,
      lots,
      createLot,
      offers,
      acceptOffer,
      rejectOffer,
      counterOffer,
      makeBuyerOffer,
      buyerRequirements,
      postBuyerRequirement,
      escrowBalance,
      depositEscrow,
      releaseEscrow,
      sales,
      transportVehicles,
      sharedRides,
      joinSharedRide,
      storages,
      bookStorage,
      grievances,
      submitGrievance,
      governmentSchemes,
      profile,
      updateProfile,
      comparisonParams,
      setComparisonParams,
      startComparisonForCrop,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
