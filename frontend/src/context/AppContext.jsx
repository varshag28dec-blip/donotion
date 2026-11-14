import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_USERS = {
  donor: {
    id: 1,
    name: 'Ananya Sharma',
    email: 'donor@sharecare.org',
    role: 'donor',
    phone: '+91 98765 43210',
    location: 'Velachery, Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    bio: 'Active community donor passionate about zero food waste and neighborhood support.'
  },
  receiver: {
    id: 2,
    name: 'Murugan R.',
    email: 'receiver@sharecare.org',
    role: 'receiver',
    phone: '+91 98765 43211',
    location: 'Guindy, Chennai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Father of two school-going children seeking educational and kitchen essential aid.'
  },
  volunteer: {
    id: 3,
    name: 'Karthik Raja',
    email: 'volunteer@sharecare.org',
    role: 'volunteer',
    phone: '+91 98765 43212',
    location: 'Adyar, Chennai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    bio: 'Two-wheeler owner available evenings and weekends for pickup & deliveries.',
    vehicle: 'Honda Activa (TN 07 BM 4291)',
    availableDays: 'Mon, Wed, Fri, Sat, Sun'
  },
  admin: {
    id: 4,
    name: 'Priya Venkat',
    email: 'admin@sharecare.org',
    role: 'admin',
    phone: '+91 98765 43213',
    location: 'T. Nagar, Chennai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bio: 'Platform Administrator & Community Support Coordinator.'
  }
};

const INITIAL_DONATIONS = [
  {
    id: 1,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Freshly Cooked Veg Meals (Pulao & Curd Rice)',
    category: 'Food',
    description: 'Freshly prepared hygienic meals packed in eco-friendly aluminium foil boxes. Untouched surplus from a family gathering, prepared in commercial kitchen.',
    quantity: 25,
    unit: 'Packets',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600'],
    pickupLocation: 'Velachery Main Road, Chennai',
    latitude: 12.9750,
    longitude: 80.2200,
    prepDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    useByDate: new Date(Date.now() + 5.5 * 3600 * 1000).toISOString(),
    isFood: true,
    pickupOrDrop: 'pickup',
    instructions: 'Please transport in thermal/insulated bag before 9:00 PM.',
    status: 'assigned',
    isEmergency: false,
    trackingCode: 'SC-TRK-78901',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  },
  {
    id: 2,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Winter Jackets, Sweaters & Woolen Blankets',
    category: 'Clothes',
    description: 'Assorted clean, sanitized winter clothes in excellent condition (Sizes M to XL), plus 10 double-bed thick warm blankets.',
    quantity: 20,
    unit: 'Pieces',
    images: ['https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600'],
    pickupLocation: 'Adyar Canal Bank, Chennai',
    latitude: 13.0012,
    longitude: 80.2565,
    isFood: false,
    pickupOrDrop: 'drop_off',
    instructions: 'Packed in transparent protective bags.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-88219',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 3,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'NCERT Class 6-10 Textbooks & Reference Dictionaries',
    category: 'Books',
    description: 'Complete set of CBSE Class 6 to 10 textbooks including Mathematics, Science, and Social Studies, plus children storybooks.',
    quantity: 45,
    unit: 'Books',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600'],
    pickupLocation: 'Guindy Industrial Estate, Chennai',
    latitude: 13.0067,
    longitude: 80.2030,
    isFood: false,
    pickupOrDrop: 'pickup',
    instructions: 'Packaged in two sturdy cardboard boxes.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-90142',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: 4,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Student Stationery Kits (Pencils, Geometry, Notebooks)',
    category: 'School Supplies',
    description: 'Each kit contains geometry box, pencils, pens, erasers, sharpeners, and 5 unruled long notebooks.',
    quantity: 30,
    unit: 'Kits',
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
    pickupLocation: 'Mylapore Luz Corner, Chennai',
    latitude: 13.0368,
    longitude: 80.2676,
    isFood: false,
    pickupOrDrop: 'pickup',
    instructions: 'Ready for distribution to students in tutoring centers.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-11234',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: 5,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Stainless Steel Cookware & Utensil Family Sets',
    category: 'Household Essentials',
    description: 'Induction-compatible stainless steel kadai, pressure cooker, plates, spoons, and water jugs for displaced or underprivileged families.',
    quantity: 12,
    unit: 'Sets',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600'],
    pickupLocation: 'Anna Nagar 2nd Avenue, Chennai',
    latitude: 13.0850,
    longitude: 80.2100,
    isFood: false,
    pickupOrDrop: 'pickup',
    instructions: 'Sturdy packaging, handle with care.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-33451',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 6,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Sanitary Pads, Antiseptic Soaps & Hygiene Kits',
    category: 'Hygiene Essentials',
    description: 'Biodegradable sanitary napkins, Dettol handwashes, bathing soaps, toothpaste, and soft toothbrushes.',
    quantity: 60,
    unit: 'Packs',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'],
    pickupLocation: 'Velachery Bypass Road, Chennai',
    latitude: 12.9780,
    longitude: 80.2180,
    isFood: false,
    pickupOrDrop: 'pickup',
    instructions: 'Sealed moisture-proof cartons.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-44562',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 7,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Surplus Bakery Whole Wheat Bread & Fresh Milk',
    category: 'Food',
    description: 'Surplus organic bakery loaves (400g) and sealed toned milk pouches from local organic bakery.',
    quantity: 15,
    unit: 'Loaves',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'],
    pickupLocation: 'Saidapet Market, Chennai',
    latitude: 13.0200,
    longitude: 80.2220,
    prepDate: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    useByDate: new Date(Date.now() + 2.5 * 3600 * 1000).toISOString(),
    isFood: true,
    pickupOrDrop: 'pickup',
    instructions: 'Urgent food rescue! High nutritional value.',
    status: 'approved',
    isEmergency: false,
    trackingCode: 'SC-TRK-55673',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 8,
    donorId: 1,
    donorName: 'Ananya Sharma',
    title: 'Packaged Drinking Water Bubbletop Cans (20L Cans)',
    category: 'Household Essentials',
    description: 'Sealed ISI certified drinking water cans for water-logged flood relief shelters and communities.',
    quantity: 25,
    unit: 'Cans',
    images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600'],
    pickupLocation: 'Tambaram Sanatorium, Chennai',
    latitude: 12.9249,
    longitude: 80.1000,
    isFood: false,
    pickupOrDrop: 'pickup',
    instructions: 'Priority emergency relief supply.',
    status: 'approved',
    isEmergency: true,
    trackingCode: 'SC-TRK-66784',
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  }
];

const INITIAL_URGENT_NEEDS = [
  {
    id: 101,
    requiredItem: 'Critical Pediatric Antibiotics & Fever Syrups',
    shortDescription: 'Emergency medical supplies required for 12 children suffering from seasonal viral fever at shelter home.',
    category: 'Medicines',
    quantityNeeded: '15 Bottles',
    location: 'Saidapet Relief Camp, Chennai',
    urgencyBadge: '🔴 URGENT',
    urgencyLevel: 'urgent',
    postedTime: '30 mins ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'Dr. Sudha (Camp Medic)'
  },
  {
    id: 102,
    requiredItem: 'Fresh Cooked Evening Meals for 40 Displaced Persons',
    shortDescription: 'Families evacuated from waterlogged hutments need cooked meals and clean water by 8:00 PM tonight.',
    category: 'Food',
    quantityNeeded: '40 Packets',
    location: 'Velachery Low-lying Sector 4, Chennai',
    urgencyBadge: '🔴 URGENT',
    urgencyLevel: 'urgent',
    postedTime: '1 hour ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'Ravi Kumar (Community Lead)'
  },
  {
    id: 103,
    requiredItem: 'Dry Clothes, Sarees & Warm Woolens for Elderly',
    shortDescription: 'Elderly residents in local community shelter lost clothing due to flooding; urgent need of warm clothes.',
    category: 'Clothes',
    quantityNeeded: '25 Sets',
    location: 'Tambaram East Flood Camp, Chennai',
    urgencyBadge: '🟠 HIGH PRIORITY',
    urgencyLevel: 'high_priority',
    postedTime: '2 hours ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'Meenakshi Ammal'
  },
  {
    id: 104,
    requiredItem: 'Diabetic Insulin & BP Medication Refills',
    shortDescription: 'Prescribed medicines depleted for 5 senior citizens stranded in local neighborhood center.',
    category: 'Medicines',
    quantityNeeded: '5 Prescription Kits',
    location: 'Guindy Station Colony, Chennai',
    urgencyBadge: '🔴 URGENT',
    urgencyLevel: 'urgent',
    postedTime: '3 hours ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'K. Narayanan'
  },
  {
    id: 105,
    requiredItem: 'Baby Formula Milk & Infant Porridge',
    shortDescription: 'Nutritional food needed for 8 infants and nursing mothers in temporary flood evacuation center.',
    category: 'Food',
    quantityNeeded: '12 Cans',
    location: 'Adyar Canal Relief Hub, Chennai',
    urgencyBadge: '🟠 HIGH PRIORITY',
    urgencyLevel: 'high_priority',
    postedTime: '4 hours ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'Sister Philomena'
  },
  {
    id: 106,
    requiredItem: 'Raincoats, Waterproof Tarpaulins & Blankets',
    shortDescription: 'Severe continuous rain; protection needed for outdoor makeshift relief camp shelters.',
    category: 'Clothes',
    quantityNeeded: '30 Pieces',
    location: 'Mudichur Lake Area, Chennai',
    urgencyBadge: '🔴 URGENT',
    urgencyLevel: 'urgent',
    postedTime: '5 hours ago',
    helperAssigned: null,
    isHelped: false,
    contactPerson: 'V. Balaji (Rescue Volunteer)'
  }
];

const INITIAL_REQUESTS = [
  {
    id: 1,
    receiverId: 2,
    receiverName: 'Murugan R.',
    isAnonymous: false,
    category: 'Food',
    quantity: 5,
    unit: 'Packets',
    description: 'Need evening food packets for 5 members of my family including elderly parents and young daughter.',
    location: 'Velachery 100ft Road, Chennai',
    latitude: 12.9790,
    longitude: 80.2210,
    urgency: 'high',
    status: 'approved',
    isEmergency: false,
    contactPhone: '+91 98765 43211',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 2,
    receiverId: 2,
    receiverName: 'Murugan R.',
    isAnonymous: false,
    category: 'Books',
    quantity: 10,
    unit: 'Books',
    description: 'NCERT Class 7 & 9 study books and geometry sets for my daughter and son in government school.',
    location: 'Guindy Station Road, Chennai',
    latitude: 13.0080,
    longitude: 80.2050,
    urgency: 'medium',
    status: 'approved',
    isEmergency: false,
    contactPhone: '+91 98765 43211',
    createdAt: new Date(Date.now() - 15 * 3600 * 1000).toISOString()
  },
  {
    id: 3,
    receiverId: 2,
    receiverName: 'Shelter Coordinator',
    isAnonymous: true,
    category: 'Clothes',
    quantity: 4,
    unit: 'Pieces',
    description: 'Warm clothes and blankets for elderly persons suffering from cold weather conditions.',
    location: 'Adyar Gandhi Nagar, Chennai',
    latitude: 13.0050,
    longitude: 80.2520,
    urgency: 'high',
    status: 'approved',
    isEmergency: false,
    contactPhone: 'Protected (Anonymous)',
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
  },
  {
    id: 4,
    receiverId: 2,
    receiverName: 'Tambaram Relief Center',
    isAnonymous: false,
    category: 'Household Essentials',
    quantity: 10,
    unit: 'Cans',
    description: 'Clean drinking water urgently required for 15 displaced families due to localized water pipeline breakage.',
    location: 'Tambaram West, Chennai',
    latitude: 12.9280,
    longitude: 80.1050,
    urgency: 'critical',
    status: 'approved',
    isEmergency: true,
    contactPhone: '+91 98765 43299',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
];

const INITIAL_SHARE_BASKETS = [
  {
    id: 1,
    title: 'Community Grocery Kit #104 – Support for 5-Member Family',
    description: 'Combining staple ingredients to furnish a complete 1-month kitchen kit for Murugan’s family.',
    category: 'Family Grocery Basket',
    location: 'Velachery, Chennai',
    status: 'open',
    targetItems: [
      { name: 'Ponni Rice', requiredQty: 10, collectedQty: 10, unit: 'kg' },
      { name: 'Toor Dal / Pulses', requiredQty: 4, collectedQty: 4, unit: 'kg' },
      { name: 'Sunflower Cooking Oil', requiredQty: 3, collectedQty: 2, unit: 'liters' },
      { name: 'Whole Wheat Atta', requiredQty: 5, collectedQty: 3, unit: 'kg' },
      { name: 'Potatoes & Onions', requiredQty: 6, collectedQty: 0, unit: 'kg' }
    ],
    contributions: [
      { id: 1, donorName: 'Ananya S.', itemName: 'Ponni Rice', quantity: 10, unit: 'kg', time: '2 hours ago' },
      { id: 2, donorName: 'Suresh Kumar', itemName: 'Toor Dal', quantity: 4, unit: 'kg', time: '1 hour ago' },
      { id: 3, donorName: 'Pooja M.', itemName: 'Sunflower Cooking Oil', quantity: 2, unit: 'liters', time: '30 mins ago' },
      { id: 4, donorName: 'Kavitha R.', itemName: 'Whole Wheat Atta', quantity: 3, unit: 'kg', time: '10 mins ago' }
    ]
  },
  {
    id: 2,
    title: 'Bright Future School Stationery Basket #202',
    description: 'Gathering school supplies for 25 underprivileged kids in Guindy Community Center.',
    category: 'Student Education Basket',
    location: 'Guindy, Chennai',
    status: 'open',
    targetItems: [
      { name: 'Ruled Notebooks', requiredQty: 50, collectedQty: 38, unit: 'pieces' },
      { name: 'Blue & Black Pens Pack', requiredQty: 20, collectedQty: 16, unit: 'packs' },
      { name: 'Geometry Boxes', requiredQty: 15, collectedQty: 12, unit: 'boxes' },
      { name: 'Colour Pencil Sets', requiredQty: 20, collectedQty: 7, unit: 'sets' }
    ],
    contributions: [
      { id: 5, donorName: 'Deepak V.', itemName: 'Ruled Notebooks', quantity: 38, unit: 'pieces', time: '3 hours ago' },
      { id: 6, donorName: 'Maya Sen', itemName: 'Geometry Boxes', quantity: 12, unit: 'boxes', time: '2 hours ago' }
    ]
  }
];

const INITIAL_KITS = [
  {
    id: 1,
    name: 'Family Grocery Kit',
    category: 'Food',
    description: 'Provides monthly grains, pulses, cooking oil, spices, and tea for a family of 4-5 members.',
    iconName: 'Utensils',
    items: [
      { name: 'Rice (10kg)', required: 50, pledged: 42, unit: 'bags' },
      { name: 'Cooking Oil (2L)', required: 50, pledged: 46, unit: 'cans' },
      { name: 'Dal / Lentils (3kg)', required: 50, pledged: 39, unit: 'packs' },
      { name: 'Salt & Spices Kit', required: 50, pledged: 48, unit: 'kits' }
    ],
    beneficiariesTarget: 50,
    beneficiariesReached: 38
  },
  {
    id: 2,
    name: 'Student Education Kit',
    category: 'School Supplies',
    description: 'Empowers school children with bags, notebooks, geometry kits, and steel water bottles.',
    iconName: 'BookOpen',
    items: [
      { name: 'School Bag', required: 40, pledged: 35, unit: 'bags' },
      { name: 'Notebook Set (6 pcs)', required: 40, pledged: 40, unit: 'sets' },
      { name: 'Stationery Pouch', required: 40, pledged: 32, unit: 'pouches' },
      { name: 'Steel Water Bottle', required: 40, pledged: 28, unit: 'bottles' }
    ],
    beneficiariesTarget: 40,
    beneficiariesReached: 31
  },
  {
    id: 3,
    name: 'Household Essentials Kit',
    category: 'Household Essentials',
    description: 'Basic kitchen cookware, dinner plates, tumblers, and thermal bedding essentials.',
    iconName: 'Home',
    items: [
      { name: 'Stainless Steel Cooker', required: 25, pledged: 22, unit: 'pieces' },
      { name: 'Dinner Set (4 Plates/Bowls)', required: 25, pledged: 20, unit: 'sets' },
      { name: 'Thermal Bed Blanket', required: 25, pledged: 24, unit: 'pieces' }
    ],
    beneficiariesTarget: 25,
    beneficiariesReached: 21
  },
  {
    id: 4,
    name: 'Emergency Support Kit',
    category: 'Emergency',
    description: 'Rapid disaster response kit with drinking water, dry rations, first aid, torch, and power bank.',
    iconName: 'ShieldAlert',
    items: [
      { name: 'Drinking Water (10L)', required: 60, pledged: 57, unit: 'units' },
      { name: 'High Energy Biscuits & Bars', required: 60, pledged: 60, unit: 'packs' },
      { name: 'First Aid & Antiseptic Kit', required: 60, pledged: 52, unit: 'kits' },
      { name: 'LED Torch with Batteries', required: 60, pledged: 45, unit: 'pieces' }
    ],
    beneficiariesTarget: 60,
    beneficiariesReached: 51
  },
  {
    id: 5,
    name: 'Clothing Kit',
    category: 'Clothes',
    description: 'Assortment of fresh sanitized clothes for adults and kids including shirts, trousers, and raincoats.',
    iconName: 'Shirt',
    items: [
      { name: 'Men/Women Casual Pack', required: 30, pledged: 26, unit: 'packs' },
      { name: 'Kids Wear Set', required: 30, pledged: 29, unit: 'sets' },
      { name: 'Raincoat / Windcheater', required: 30, pledged: 24, unit: 'pieces' }
    ],
    beneficiariesTarget: 30,
    beneficiariesReached: 25
  }
];

const INITIAL_VOLUNTEER_TASKS = [
  {
    id: 1,
    volunteerId: 3,
    donationId: 1,
    requestId: 1,
    taskTitle: 'Pick up 25 Veg Meals from Velachery and Deliver to Guindy Center',
    taskType: 'both',
    pickupAddress: 'Velachery Main Road, Chennai (Near Apollo Clinic)',
    pickupLat: 12.9750,
    pickupLng: 80.2200,
    deliveryAddress: 'Guindy Station Road, Chennai (Near Community Hall)',
    deliveryLat: 13.0080,
    deliveryLng: 80.2050,
    priority: 'urgent',
    status: 'in_progress',
    notes: 'Urgent food delivery before 8:30 PM. Recipient contact: +91 98765 43211',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 2,
    volunteerId: null,
    donationId: 3,
    requestId: 2,
    taskTitle: 'Deliver 45 NCERT Textbooks to Guindy Study Center',
    taskType: 'delivery',
    pickupAddress: 'Guindy Industrial Estate, Chennai',
    pickupLat: 13.0067,
    pickupLng: 80.2030,
    deliveryAddress: 'Saidapet Municipal Library, Chennai',
    deliveryLat: 13.0210,
    deliveryLng: 80.2240,
    priority: 'normal',
    status: 'available',
    notes: 'Requires small vehicle or bag with shoulder straps. Open until 6 PM.',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 3,
    volunteerId: 3,
    donationId: 4,
    requestId: null,
    taskTitle: 'Stationery Kits Collection & Drop at Mylapore Orphanage',
    taskType: 'pickup',
    pickupAddress: 'Mylapore Luz Corner, Chennai',
    pickupLat: 13.0368,
    pickupLng: 80.2676,
    deliveryAddress: 'Adyar Youth Welfare Hub, Chennai',
    deliveryLat: 13.0012,
    deliveryLng: 80.2565,
    priority: 'normal',
    status: 'assigned',
    notes: 'Contact Person: Sister Maria. Call before arrival.',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  },
  {
    id: 4,
    volunteerId: null,
    donationId: 8,
    requestId: 4,
    taskTitle: 'CRITICAL: Emergency Drinking Water Cans to Flooded Tambaram Shelters',
    taskType: 'both',
    pickupAddress: 'Tambaram Sanatorium, Chennai',
    pickupLat: 12.9249,
    pickupLng: 80.1000,
    deliveryAddress: 'Tambaram West Relief Camp, Chennai',
    deliveryLat: 12.9280,
    deliveryLng: 80.1050,
    priority: 'emergency',
    status: 'available',
    notes: 'Emergency alert: Transport 20 water cans. Pickup vehicle with carrier needed.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    volunteerId: 3,
    donationId: 6,
    requestId: null,
    taskTitle: 'Hygiene Essentials Distribution at Velachery Community',
    taskType: 'delivery',
    pickupAddress: 'Velachery Bypass Road, Chennai',
    pickupLat: 12.9780,
    pickupLng: 80.2180,
    deliveryAddress: 'Velachery Slum Board Tenements, Chennai',
    deliveryLat: 12.9810,
    deliveryLng: 80.2230,
    priority: 'normal',
    status: 'completed',
    notes: 'Successfully handed over 50 hygiene packs to women representatives.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
];

const INITIAL_TRACKING_DATA = {
  'SC-TRK-78901': {
    donationId: 1,
    trackingCode: 'SC-TRK-78901',
    currentStage: 4,
    recipientConfirmation: 'Pending Arrival',
    stages: [
      { stage: 1, name: 'Donation Created', status: 'completed', time: '3 hours ago', actor: 'Ananya S. (Donor)', note: 'Listing created with meal details & hygiene certification.' },
      { stage: 2, name: 'Admin Verified', status: 'completed', time: '2.5 hours ago', actor: 'Priya V. (Admin)', note: 'Food prep inspection passed.' },
      { stage: 3, name: 'Volunteer Assigned', status: 'completed', time: '2 hours ago', actor: 'System Match', note: 'Volunteer Karthik Raja accepted delivery task.' },
      { stage: 4, name: 'Donation Picked Up', status: 'completed', time: '1 hour ago', actor: 'Karthik Raja (Volunteer)', note: 'Collected 25 sealed meal boxes in thermal carrier.' },
      { stage: 5, name: 'Out for Delivery', status: 'in_progress', time: '20 mins ago', actor: 'Karthik Raja (Volunteer)', note: 'En route to Guindy community distribution center.' },
      { stage: 6, name: 'Successfully Delivered', status: 'pending', time: null, actor: null, note: 'Pending delivery completion.' },
      { stage: 7, name: 'Receiver Confirmation', status: 'pending', time: null, actor: null, note: 'Digital signature / OTP pending.' }
    ]
  },
  'SC-TRK-88219': {
    donationId: 2,
    trackingCode: 'SC-TRK-88219',
    currentStage: 2,
    recipientConfirmation: 'Awaiting Assignment',
    stages: [
      { stage: 1, name: 'Donation Created', status: 'completed', time: '1 day ago', actor: 'Ananya S. (Donor)', note: '20 warm winter clothes & blankets listed.' },
      { stage: 2, name: 'Admin Verified', status: 'completed', time: '20 hours ago', actor: 'Priya V. (Admin)', note: 'Quality verification completed.' },
      { stage: 3, name: 'Volunteer Assigned', status: 'pending', time: null, actor: null, note: 'Looking for nearby volunteer.' },
      { stage: 4, name: 'Donation Picked Up', status: 'pending', time: null, actor: null, note: null },
      { stage: 5, name: 'Out for Delivery', status: 'pending', time: null, actor: null, note: null },
      { stage: 6, name: 'Successfully Delivered', status: 'pending', time: null, actor: null, note: null },
      { stage: 7, name: 'Receiver Confirmation', status: 'pending', time: null, actor: null, note: null }
    ]
  }
};

const INITIAL_FEEDBACK = [
  {
    id: 1,
    userName: 'Murugan R.',
    role: 'receiver',
    rating: 5,
    comment: 'The food packets arrived hot, fresh and on time. My family was deeply touched by the kindness of the donor and the volunteer. Thank you SHARE & CARE!',
    date: 'Yesterday'
  },
  {
    id: 2,
    userName: 'Ananya Sharma',
    role: 'donor',
    rating: 5,
    comment: 'Transparent QR tracking gave me real-time peace of mind knowing my surplus wedding food reached families in Velachery within 2 hours. Truly revolutionary!',
    date: '2 days ago'
  },
  {
    id: 3,
    userName: 'Karthik Raja',
    role: 'volunteer',
    rating: 5,
    comment: 'The smart route mapping and QR scan verification makes my delivery tasks so effortless. Proud to serve my city during weekend evenings.',
    date: '3 days ago'
  },
  {
    id: 4,
    userName: 'Kavitha S.',
    role: 'receiver',
    rating: 5,
    comment: 'Received NCERT books and stationery kit for my 8th grade son. Saved us over ₹3,000 this school term. Bless the donors and volunteers!',
    date: '4 days ago'
  }
];

export const AppProvider = ({ children }) => {
  // Current user defaults to donor for immediate rich experience
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sharecare_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS.donor;
  });

  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [urgentNeeds, setUrgentNeeds] = useState(INITIAL_URGENT_NEEDS);
  const [urgentHelpResponses, setUrgentHelpResponses] = useState([]);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [shareBaskets, setShareBaskets] = useState(INITIAL_SHARE_BASKETS);
  const [kits, setKits] = useState(INITIAL_KITS);
  const [volunteerTasks, setVolunteerTasks] = useState(INITIAL_VOLUNTEER_TASKS);
  const [trackingData, setTrackingData] = useState(INITIAL_TRACKING_DATA);
  const [feedbackList, setFeedbackList] = useState(INITIAL_FEEDBACK);
  const [theme, setTheme] = useState('dark');

  const [emergencyMode, setEmergencyMode] = useState({
    isActive: true,
    title: 'Chennai Low-Lying Rain Inundation Relief Mode',
    alertMessage: 'Severe rainfall reported in low-lying zones (Velachery, Tambaram, Mudichur). Immediate supply of drinking water, ready-to-eat dry rations, and blankets is prioritized with emergency express dispatch.',
    affectedAreas: 'Velachery, Tambaram, Mudichur, Pallavaram, Saidapet',
    emergencyHelpline: '+91 44 2888 8888 / Toll Free 1077',
    suppliesNeeded: ['20L Drinking Water Cans', 'Ready-to-Eat Food Packets', 'Woolen Blankets', 'First Aid Kits', 'Baby Formula Milk']
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Donation Verified', message: 'Your donation "Freshly Cooked Veg Meals" has been approved & verified.', type: 'success', isRead: false, time: '10m ago' },
    { id: 2, title: 'Volunteer Dispatched', message: 'Volunteer Karthik Raja is en route for pickup.', type: 'info', isRead: false, time: '25m ago' },
    { id: 3, title: 'Smart Match Found', message: '95% match found for 5 meal packets in Velachery.', type: 'match', isRead: false, time: '1h ago' },
    { id: 4, title: 'Food Rescue Countdown', message: '2.5 hours remaining for surplus bakery bread rescue.', type: 'warning', isRead: true, time: '2h ago' },
    { id: 5, title: 'Emergency Relief Active', message: 'Emergency support mode is active in Tambaram & Velachery.', type: 'emergency', isRead: true, time: '3h ago' }
  ]);

  // Keep localStorage in sync
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sharecare_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sharecare_user');
    }
  }, [currentUser]);

  // Demo user quick switcher
  const switchUser = (role) => {
    if (INITIAL_USERS[role]) {
      setCurrentUser(INITIAL_USERS[role]);
      addNotification('Switched Account Role', `Now interacting as ${INITIAL_USERS[role].name} (${role.toUpperCase()})`, 'info');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const loginAs = (userData) => {
    setCurrentUser(userData);
  };

  // Notification helper
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      isRead: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Donation actions
  const addDonation = (newDonation) => {
    const id = Date.now();
    const trackingCode = `SC-TRK-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullDonation = {
      ...newDonation,
      id,
      donorId: currentUser ? currentUser.id : 1,
      donorName: currentUser ? currentUser.name : 'Generous Donor',
      status: 'approved',
      trackingCode,
      createdAt: new Date().toISOString()
    };

    setDonations(prev => [fullDonation, ...prev]);

    // Create tracking timeline
    setTrackingData(prev => ({
      ...prev,
      [trackingCode]: {
        donationId: id,
        trackingCode,
        currentStage: 2,
        recipientConfirmation: 'Awaiting Volunteer',
        stages: [
          { stage: 1, name: 'Donation Created', status: 'completed', time: 'Just now', actor: fullDonation.donorName, note: 'Listing submitted.' },
          { stage: 2, name: 'Admin Verified', status: 'completed', time: 'Just now', actor: 'Instant Safety Check', note: 'Verification approved.' },
          { stage: 3, name: 'Volunteer Assigned', status: 'pending', time: null, actor: null, note: 'Searching available volunteers.' },
          { stage: 4, name: 'Donation Picked Up', status: 'pending', time: null, actor: null, note: null },
          { stage: 5, name: 'Out for Delivery', status: 'pending', time: null, actor: null, note: null },
          { stage: 6, name: 'Successfully Delivered', status: 'pending', time: null, actor: null, note: null },
          { stage: 7, name: 'Receiver Confirmation', status: 'pending', time: null, actor: null, note: null }
        ]
      }
    }));

    // Auto add volunteer task
    const newTask = {
      id: Date.now() + 1,
      volunteerId: null,
      donationId: id,
      requestId: null,
      taskTitle: `Pick up ${fullDonation.quantity} ${fullDonation.unit} of ${fullDonation.title}`,
      taskType: 'pickup',
      pickupAddress: fullDonation.pickupLocation,
      pickupLat: fullDonation.latitude || 12.9750,
      pickupLng: fullDonation.longitude || 80.2200,
      deliveryAddress: 'Central Community Distribution Hub',
      deliveryLat: 13.0067,
      deliveryLng: 80.2030,
      priority: fullDonation.isEmergency ? 'emergency' : (fullDonation.isFood ? 'urgent' : 'normal'),
      status: 'available',
      notes: fullDonation.instructions || 'Handle with care.',
      createdAt: new Date().toISOString()
    };
    setVolunteerTasks(prev => [newTask, ...prev]);

    addNotification('Donation Published!', `Your donation "${fullDonation.title}" is live with QR tracking code ${trackingCode}.`, 'success');
    return fullDonation;
  };

  const updateDonationStatus = (donationId, newStatus) => {
    setDonations(prev => prev.map(d => d.id === donationId ? { ...d, status: newStatus } : d));
    addNotification('Donation Status Updated', `Donation #${donationId} status changed to ${newStatus}.`, 'info');
  };

  const deleteDonation = (donationId) => {
    setDonations(prev => prev.map(d => d.id === donationId ? { ...d, status: 'cancelled' } : d));
    addNotification('Donation Cancelled', `Donation #${donationId} has been cancelled.`, 'warning');
  };

  // Help Request actions
  const addRequest = (newReq) => {
    const id = Date.now();
    const fullReq = {
      ...newReq,
      id,
      receiverId: currentUser ? currentUser.id : 2,
      receiverName: newReq.isAnonymous ? 'Anonymous Resident' : (currentUser ? currentUser.name : 'Requester'),
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    setRequests(prev => [fullReq, ...prev]);
    addNotification('Help Request Received', `Your request for ${fullReq.quantity} ${fullReq.unit} of ${fullReq.category} is active.`, 'success');
    return fullReq;
  };

  const updateRequestStatus = (reqId, newStatus) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r));
    addNotification('Request Status Updated', `Help request #${reqId} is now ${newStatus}.`, 'info');
  };

  // Rule-based Smart Matching
  const getSmartMatches = () => {
    const activeDonations = donations.filter(d => ['approved', 'assigned'].includes(d.status));
    const activeRequests = requests.filter(r => ['approved', 'pending', 'under_review'].includes(r.status));
    const results = [];

    activeRequests.forEach(req => {
      const reqTokens = req.location.toLowerCase().replace(/,/g, ' ').split(/\s+/);
      activeDonations.forEach(don => {
        if (req.category.toLowerCase() !== don.category.toLowerCase()) return;
        
        let score = 40; // exact category match
        const donTokens = don.pickupLocation.toLowerCase().replace(/,/g, ' ').split(/\s+/);
        const commonLoc = reqTokens.filter(t => t.length > 3 && donTokens.includes(t));
        score += commonLoc.length > 0 ? 30 : 15;

        // quantity compatibility
        const reqQty = Number(req.quantity) || 1;
        const donQty = Number(don.quantity) || 1;
        const ratio = Math.min(reqQty, donQty) / Math.max(reqQty, donQty);
        score += Math.round(ratio * 20);

        // urgency
        const urgencyScores = { critical: 10, high: 8, medium: 5, low: 2 };
        score += urgencyScores[req.urgency] || 5;

        const matchPct = Math.min(100, score);
        if (matchPct >= 60) {
          results.push({
            requestId: req.id,
            requestTitle: req.description,
            receiverName: req.receiverName,
            receiverId: req.receiverId,
            donationId: don.id,
            donationTitle: don.title,
            donorName: don.donorName,
            category: don.category,
            availableQty: don.quantity,
            requestedQty: req.quantity,
            unit: don.unit,
            location: don.pickupLocation,
            urgency: req.urgency,
            matchPercentage: matchPct,
            reasons: [
              `Direct category alignment: ${don.category}`,
              `Compatible quantity: ${don.quantity} ${don.unit} available for ${req.quantity} ${req.unit} needed`,
              `Location proximity overlap: ${req.location}`
            ]
          });
        }
      });
    });

    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const claimMatch = (donationId, requestId) => {
    setDonations(prev => prev.map(d => d.id === donationId ? { ...d, status: 'assigned' } : d));
    if (requestId) {
      setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'matched' } : r));
    }
    addNotification('Match Confirmed!', 'Donation reserved. Volunteer dispatch initiated.', 'success');
  };

  // Share Basket actions
  const contributeToBasket = (basketId, itemName, qty, unit = 'kg') => {
    const donorName = currentUser ? currentUser.name : 'Generous Donor';
    setShareBaskets(prev => prev.map(basket => {
      if (basket.id !== basketId) return basket;

      const updatedItems = basket.targetItems.map(item => {
        if (item.name.toLowerCase() === itemName.toLowerCase()) {
          return { ...item, collectedQty: item.collectedQty + Number(qty) };
        }
        return item;
      });

      const newContribution = {
        id: Date.now(),
        donorName,
        itemName,
        quantity: Number(qty),
        unit,
        time: 'Just now'
      };

      return {
        ...basket,
        targetItems: updatedItems,
        contributions: [newContribution, ...basket.contributions]
      };
    }));

    addNotification('Basket Contribution Added!', `Thank you ${donorName} for contributing ${qty} ${unit} of ${itemName}!`, 'success');
  };

  // Kits pledge
  const pledgeKitItem = (kitId, itemIndex, qty = 1) => {
    setKits(prev => prev.map(kit => {
      if (kit.id !== kitId) return kit;
      const newItems = [...kit.items];
      if (newItems[itemIndex]) {
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          pledged: newItems[itemIndex].pledged + Number(qty)
        };
      }
      return { ...kit, items: newItems };
    }));
    addNotification('Kit Contribution Pledged!', `Pledged ${qty} units toward this kit. Thank you!`, 'success');
  };

  // Volunteer Task actions
  const acceptVolunteerTask = (taskId) => {
    const volId = currentUser ? currentUser.id : 3;
    setVolunteerTasks(prev => prev.map(t => t.id === taskId ? { ...t, volunteerId: volId, status: 'assigned' } : t));
    addNotification('Task Claimed!', 'Task assigned to you. Navigation route updated in dashboard.', 'success');
  };

  const updateVolunteerTaskStatus = (taskId, newStatus) => {
    setVolunteerTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // Also advance QR tracking if linked
        if (newStatus === 'in_progress' && t.donationId) {
          advanceTrackingStageByDonationId(t.donationId, 5, 'Picked up by volunteer. In transit.');
        } else if (newStatus === 'completed' && t.donationId) {
          advanceTrackingStageByDonationId(t.donationId, 6, 'Delivered to destination.');
        }
        return { ...t, status: newStatus };
      }
      return t;
    }));
    addNotification('Task Status Updated', `Task is now marked as ${newStatus.replace('_', ' ')}.`, 'info');
  };

  // QR Tracking actions
  const advanceTrackingStage = (trackingCode, newStage, note = '') => {
    const actorName = currentUser ? `${currentUser.name} (${currentUser.role})` : 'Authorized User';
    setTrackingData(prev => {
      const trk = prev[trackingCode];
      if (!trk) return prev;

      const updatedStages = trk.stages.map(s => {
        if (s.stage < newStage) return { ...s, status: 'completed' };
        if (s.stage === newStage) {
          return {
            ...s,
            status: 'completed',
            time: 'Just now',
            actor: actorName,
            note: note || s.note || `Stage ${newStage} reached.`
          };
        }
        if (s.stage === newStage + 1) return { ...s, status: 'in_progress' };
        return { ...s, status: 'pending' };
      });

      // Update donation status matching stage
      const stageToStatus = {
        1: 'pending', 2: 'approved', 3: 'assigned',
        4: 'picked_up', 5: 'out_for_delivery', 6: 'delivered', 7: 'completed'
      };
      const donStatus = stageToStatus[newStage] || 'approved';
      if (trk.donationId) {
        setDonations(dList => dList.map(d => d.id === trk.donationId ? { ...d, status: donStatus } : d));
      }

      return {
        ...prev,
        [trackingCode]: {
          ...trk,
          currentStage: newStage,
          stages: updatedStages
        }
      };
    });

    addNotification('Tracking Advanced', `Tracking code ${trackingCode} moved to Stage ${newStage}!`, 'success');
  };

  const advanceTrackingStageByDonationId = (donationId, stage, note) => {
    const don = donations.find(d => d.id === donationId);
    if (don && don.trackingCode) {
      advanceTrackingStage(don.trackingCode, stage, note);
    }
  };

  // Urgent Needs Help Action
  const respondToUrgentNeed = (urgentNeedId, note = '') => {
    if (!currentUser) return false;

    const responseRecord = {
      id: Date.now(),
      urgentNeedId,
      helperId: currentUser.id,
      helperName: currentUser.name,
      helperPhone: currentUser.phone,
      helperRole: currentUser.role,
      note,
      timestamp: new Date().toISOString()
    };

    setUrgentHelpResponses(prev => [responseRecord, ...prev]);

    setUrgentNeeds(prev => prev.map(item => {
      if (item.id === urgentNeedId) {
        return {
          ...item,
          isHelped: true,
          helperAssigned: currentUser.name
        };
      }
      return item;
    }));

    addNotification(
      'Urgent Aid Response Registered',
      `You pledged to help with "${urgentNeeds.find(u => u.id === urgentNeedId)?.requiredItem}". Our coordination team has been informed.`,
      'success'
    );

    return true;
  };

  // Feedback action
  const addFeedback = (rating, comment) => {
    const newFb = {
      id: Date.now(),
      userName: currentUser ? currentUser.name : 'Community Supporter',
      role: currentUser ? currentUser.role : 'donor',
      rating: Number(rating),
      comment,
      date: 'Just now'
    };
    setFeedbackList(prev => [newFb, ...prev]);
    addNotification('Review Submitted', 'Thank you for your valuable feedback!', 'success');
  };

  // Contact message
  const sendContactMessage = (name, email, subject, message) => {
    addNotification('Message Sent', 'Thank you! Our community coordination team will respond shortly.', 'success');
  };

  // Dynamic Impact Stats computed live
  const impactStats = {
    totalFoodPackets: donations.filter(d => d.isFood).reduce((acc, cur) => acc + (Number(cur.quantity) || 0), 0),
    totalClothes: donations.filter(d => d.category === 'Clothes').reduce((acc, cur) => acc + (Number(cur.quantity) || 0), 0),
    totalEssentials: donations.filter(d => ['Household Essentials', 'Hygiene Essentials'].includes(d.category)).reduce((acc, cur) => acc + (Number(cur.quantity) || 0), 0),
    totalDeliveries: volunteerTasks.filter(t => t.status === 'completed').length + 28,
    activeVolunteers: 18,
    totalFamiliesAssisted: requests.length * 4 + 42,
    totalStudentsSupported: donations.filter(d => ['Books', 'School Supplies'].includes(d.category)).reduce((acc, cur) => acc + (Number(cur.quantity) || 0), 0)
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      demoUsers: INITIAL_USERS,
      switchUser,
      loginAs,
      logout,
      donations,
      addDonation,
      updateDonationStatus,
      deleteDonation,
      urgentNeeds,
      respondToUrgentNeed,
      urgentHelpResponses,
      requests,
      addRequest,
      updateRequestStatus,
      getSmartMatches,
      claimMatch,
      shareBaskets,
      contributeToBasket,
      kits,
      pledgeKitItem,
      volunteerTasks,
      acceptVolunteerTask,
      updateVolunteerTaskStatus,
      trackingData,
      advanceTrackingStage,
      emergencyMode,
      setEmergencyMode,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      addNotification,
      feedbackList,
      addFeedback,
      sendContactMessage,
      impactStats,
      theme,
      setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
