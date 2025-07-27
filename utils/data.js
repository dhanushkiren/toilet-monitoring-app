// data.js
export const toilets = [
  {
    id: 'T101',
    location: {
      latitude: 9.167,
      longitude: 77.871,
      address: 'Main Bus Stand, Kovilpatti',
    },
    images: {
      before: 'https://example.com/images/t101-before.jpg',
      after: 'https://example.com/images/t101-after.jpg',
    },
    rating: 4.2,
    feedbacks: [
      'Clean and well-maintained.',
      'Need better lighting.',
    ],
    cleanerId: 'C101',
    cleanerName: 'Arun Kumar',
    inventoryNeeded: ['Soap', 'Bucket', 'Mug'],
    damageReports: ['Tap broken', 'Door lock issue'],
    lastCleaned: '2025-07-26 10:30 AM',
  },
  {
    id: 'T102',
    location: {
      latitude: 9.168,
      longitude: 77.872,
      address: 'Near Government Hospital, Kovilpatti',
    },
    images: {
      before: 'https://example.com/images/t102-before.jpg',
      after: 'https://example.com/images/t102-after.jpg',
    },
    rating: 3.6,
    feedbacks: ['Water pipe leaking.', 'Average hygiene.'],
    cleanerId: 'C102',
    cleanerName: 'Bala Devi',
    inventoryNeeded: ['Phenyl', 'Disinfectant'],
    damageReports: ['Mirror cracked'],
    lastCleaned: '2025-07-27 08:00 AM',
  },
  {
    id: 'T103',
    location: {
      latitude: 9.169,
      longitude: 77.873,
      address: 'Railway Station Exit Gate',
    },
    images: {
      before: 'https://example.com/images/t103-before.jpg',
      after: 'https://example.com/images/t103-after.jpg',
    },
    rating: 4.8,
    feedbacks: ['Very clean.', 'Smells fresh.'],
    cleanerId: 'C101',
    cleanerName: 'Arun Kumar',
    inventoryNeeded: [],
    damageReports: [],
    lastCleaned: '2025-07-27 11:45 AM',
  },
];

export const cleaners = [
  {
    id: 'C101',
    name: 'Arun Kumar',
    phone: '9876543210',
    toiletsAssigned: ['T101', 'T103'],
  },
  {
    id: 'C102',
    name: 'Bala Devi',
    phone: '8765432109',
    toiletsAssigned: ['T102'],
  },
];

export const dummyPendingTasks = [
  {
    id: 'T101',
    location: 'Bus Stand, Main Road',
    status: 'Cleaning Pending',
  },
  {
    id: 'T002',
    location: 'Govt School, Block B',
    status: 'Inventory Request',
  },
  {
    id: 'T002',
    location: 'Govt School, Block B',
    status: 'Inventory Request',
  },
];