// src/api/api.js

// Replace these dummy URLs later with actual backend endpoints

const API_BASE_URL = 'https://dummyapi.io/toilet-monitoring';

export const fetchNearbyToilets = async (lat, lon, filters) => {
  try {
    // Simulate filtered URL
    const url = `${API_BASE_URL}/toilets?lat=${lat}&lon=${lon}&gender=${filters.gender}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching nearby toilets:', error);
    return [];
  }
};

export const fetchToiletDetails = async (toiletId) => {
  try {
    const url = `${API_BASE_URL}/toilets/${toiletId}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching toilet details:', error);
    return null;
  }
};

export const submitFeedback = async (toiletId, data) => {
  try {
    const url = `${API_BASE_URL}/toilets/${toiletId}/feedback`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return null;
  }
};

// Add more dummy APIs as needed

// utils/api.js
export const getNearbyToilets = async (lat, lon, filter) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const staticToilets = [
    {
      id: '1',
      name: 'Public Toilet - Main Bazaar',
      address: 'Main Bazaar, Kovilpatti',
      lat: 9.1741,
      lng: 77.8686,
      gender: 'Unisex',
      rating: 4.2,
      isAccessible: true,
      lastCleaned: '2025-07-15 09:30',
    },
    {
      id: '2',
      name: 'Toilet - Near Kovilpatti Bus Stand',
      address: 'Bus Stand Road, Kovilpatti',
      lat: 9.1678,
      lng: 77.8754,
      gender: 'Male',
      rating: 3.8,
      isAccessible: false,
      lastCleaned: '2025-07-15 08:00',
    },
    {
      id: '3',
      name: 'Ladies Toilet - Rajaji Nagar',
      address: 'Rajaji Nagar, Kovilpatti',
      lat: 9.1693,
      lng: 77.8721,
      gender: 'Female',
      rating: 4.5,
      isAccessible: true,
      lastCleaned: '2025-07-14 17:45',
    },
    {
      id: '4',
      name: 'Smart Toilet - Collector Office',
      address: 'Near Collector Office, Kovilpatti',
      lat: 9.1765,
      lng: 77.8702,
      gender: 'Unisex',
      rating: 4.8,
      isAccessible: true,
      lastCleaned: '2025-07-16 06:15',
    }
  ];

  if (filter === 'disabled') {
    return staticToilets.filter((t) => t.isAccessible);
  } else if (filter && filter !== 'All') {
    return staticToilets.filter((t) => t.gender.toLowerCase() === filter);
  }

  return staticToilets;
};
