'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { FaMapMarkerAlt, FaBed, FaDollarSign } from 'react-icons/fa';

// Define the type for route parameters
type Params = {
  id: string;
};

interface Apartment {
  _id?: string;
  image: string;
  name: string;
  location: string;
  rentPrice: number;
  rentDuration: 'night' | 'month'; // Rent duration is set by the owner
  roomType: string;
  description: string; // Include description in the detailed view
}

const ApartmentPage = () => {
  const params = useParams() as Params;
  const { id } = params;
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [renterName, setRenterName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 

  useEffect(() => {
    if (id) {
      fetchApartmentDetails(id);
    }
  }, [id]);

  // Fetch apartment details based on the apartment ID
  const fetchApartmentDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/apartments/${id}`);
      setApartment(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Check if the error is an Axios error
        console.error('Failed to fetch apartment details:', error.response?.data);
      } else {
        // Handle any other type of error
        console.error('An unexpected error occurred:', error);
      }
    }
  };

// Handle the rent click, which now only includes renter's information
const handleRentClick = async () => {
  try {
    if (!apartment?._id) {
      console.error('Apartment ID is missing.');
      return;
    }

    if (!renterName || !phoneNumber) {
      alert('Please enter renter name and phone number.');
      return;
    }

    // Log the request data for debugging
    console.log('Sending Booking Request with Data:', {
      apartmentId: apartment._id,
      rentOption: apartment.rentDuration,
      renterName,
      phoneNumber
    });

    const response = await axios.post('/api/booked-apartments/', {
      apartmentId: apartment._id, // Send the apartment ID
      rentOption: apartment.rentDuration, // Rent option is set by the owner
      renterName: renterName, // Renter's name
      phoneNumber: phoneNumber // Renter's phone number
    });

    if (response.status === 201) {
      alert(`Apartment ${apartment.name} booked successfully!`);
    } else {
      console.error('Failed to book apartment:', response.data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        alert('This apartment is already booked for the selected duration.');
      } else {
        console.error('Failed to book apartment:', error.response?.data);
        alert(`Error: ${error.response?.data.error || 'An error occurred while booking the apartment.'}`);
      }
    } else {
      // Handle any other type of error
      console.error('An unexpected error occurred:', error);
    }
  }
};

  

  if (!apartment) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          {apartment.name}
        </h1>
        <button
          onClick={handleRentClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Rent for {apartment.rentDuration === 'night' ? 'Night' : 'Month'}
        </button>
      </div>

      {/* Apartment Image and Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={apartment.image}
            alt={apartment.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Apartment Details
            </h2>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-xl text-red-500" />
              <span>{apartment.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaDollarSign className="mr-2 text-xl text-green-500" />
              <span>${apartment.rentPrice} / {apartment.rentDuration}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaBed className="mr-2 text-xl text-blue-500" />
              <span>{apartment.roomType}</span>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
          </div>

          {/* Renter Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Renter Information</h3>
            <input
              type="text"
              placeholder="Renter Name"
              value={renterName}
              onChange={(e) => setRenterName(e.target.value)}
              className="block w-full p-3 border rounded-lg shadow-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentPage;
