'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'; // Use useSearchParams for getting query params
import { FaMapMarkerAlt, FaBed, FaDollarSign } from 'react-icons/fa'; // Import icons for visual appeal
import { Suspense } from 'react';

interface Apartment {
  _id?: string;
  image: string;
  name: string;
  location: string;
  rentPrice: number;
  rentDuration: 'night' | 'month';
  roomType: string;
  description: string;
}

interface Booking {
  _id: string;
  apartment: Apartment;
  renterName: string;
  phoneNumber: string;
}

const UpdateBookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');


  const [booking, setBooking] = useState<Booking | null>(null);
  const [renterName, setRenterName] = useState(''); // State for renter's name
  const [phoneNumber, setPhoneNumber] = useState(''); // State for renter's phone number
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    if (bookingId) {
      // Fetch existing booking data
      fetchBookingData();
    } else {
      setLoading(false); // Set loading to false if there's no booking ID
    }
  }, [bookingId]);

  // Fetch booking data and pre-fill form fields
  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`/api/booked-apartments?id=${bookingId}`);
      const bookingData = response.data;

      // Set the booking data in the state
      setBooking(bookingData);

      // Pre-fill the renter information in the form fields
      setRenterName(bookingData.renterName || '');
      setPhoneNumber(bookingData.phoneNumber || '');
      
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Failed to fetch booking information:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Handle update booking information
  const handleUpdate = async () => {
    try {

      if (!renterName || !phoneNumber) {
        alert('Please enter renter name and phone number.');
        return;
      }
      
      await axios.put(`/api/booked-apartments`, {
        _id: bookingId,
        renterName: renterName,
        phoneNumber: phoneNumber
      });
      alert('Booking updated successfully!');
      router.push('/booked-apartments'); // Redirect to booked apartments page
    } catch (error) {
      console.error('Failed to update booking:', error);
      alert('An error occurred while updating the booking.');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push('/booked-apartments'); // Navigate back to booked apartments page
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Booking Information</h1>
      
      {/* Display apartment details similar to apartment page */}
      {booking && booking.apartment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Apartment Image */}
          <div className="flex justify-center">
            <img
              src={booking.apartment.image}
              alt={booking.apartment.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Apartment Details */}
          <div className="flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {booking.apartment.name}
              </h2>
              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2 text-xl text-red-500" />
                <span>{booking.apartment.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <FaDollarSign className="mr-2 text-xl text-green-500" />
                <span>${booking.apartment.rentPrice} / {booking.apartment.rentDuration}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <FaBed className="mr-2 text-xl text-blue-500" />
                <span>{booking.apartment.roomType}</span>
              </div>
            </div>
            {/* Apartment Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{booking.apartment.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form for updating renter information */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Renter Name</label>
        <input
          type="text"
          placeholder="Renter Name"
          value={renterName}
          onChange={(e) => setRenterName(e.target.value)}
          className="block w-full p-3 border rounded-lg shadow-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateBookingPage;
