'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
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

const HomePage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const router = useRouter(); // Use useRouter from next/navigation

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

  // Navigate to apartment details page
  const handleApartmentClick = (id: string) => {
    router.push(`/apartments/${id}`); // Use push method from next/navigation's useRouter
  };

  return (
    <div className="">
      <h1 className="Title">Available Nests</h1>
      
      <div className="apartments-container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <div><div
            key={apartment._id}
            className="apartment-card border p-4 rounded-lg shadow-lg"
            onClick={() => handleApartmentClick(apartment._id!)} // Navigate to details page
          >
            <img src={apartment.image} alt={apartment.name} className="apartment-image w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-lg font-bold">{apartment.name}</h2>
            <p>{apartment.location}</p>
            <p>${apartment.rentPrice} / {apartment.rentDuration}</p>
            <p>Room Type: {apartment.roomType}</p>
          </div></div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
