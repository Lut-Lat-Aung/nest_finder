'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Apartment {
  _id?: string;
  image: string;
  name: string;
  location: string;
  rentPrice: number;
  rentDuration: 'night' | 'month';
  roomType: string;
}

const FindNests = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get('/api/apartments');
      setApartments(response.data);
    } catch (error) {
      console.error('Failed to fetch apartments:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-rose-500 text-2xl mb-4">Available Nests</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <div key={apartment._id} className="border p-4 rounded shadow-md">
            <img src={apartment.image} alt={apartment.name} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-lg font-bold">{apartment.name}</h2>
            <p>{apartment.location}</p>
            <p>${apartment.rentPrice} / {apartment.rentDuration}</p>
            <p>Room Type: {apartment.roomType}</p> {/* Display roomType */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindNests;
