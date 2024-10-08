'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import axios from 'axios';

interface BookedApartment {
  id: string;
  apartment: {
    image: string;
    name: string;
    location: string;
  };
  rentOption: string;
  bookedAt: string;
  renterName: string;
  phoneNumber: string;
}


const BookedApartmentsPage = () => {
  const [bookedApartments, setBookedApartments] = useState<BookedApartment[]>([]);
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    fetchBookedApartments();
  }, []);

  
  const fetchBookedApartments = async () => {
    try {
      const response = await axios.get('/api/booked-apartments');
      setBookedApartments(response.data);
    } catch (error) {
      console.error('Failed to fetch booked apartments:', error);
    }
  };




  // Delete booking
  const handleDelete = async (id: string) => {
    try {
      if (!id) {
        alert('Invalid booking ID.');
        return;
      }
  
      // Log the ID to verify
      console.log('Booking ID to delete:', id);
  
      const response = await axios.delete(`/api/booked-apartments?id=${id}`);
      if (response.status === 200) {
        alert('Booking deleted successfully.');
        fetchBookedApartments(); // Refresh the list after deletion
      } else {
        alert('Failed to delete booking.');
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
      alert('An error occurred while deleting the booking.');
    }
  };

  
  
  
// Navigate to the update booking page
const handleUpdate = (id: string) => {
  router.push(`/update-booking?id=${id}`); // Pass the booking ID as a query parameter
};

  if (bookedApartments.length === 0) return <div>No booked apartments found.</div>;

  return (
    <div className=" mx-auto p-4">
      
      <h1 className="Title text-3xl font-bold text-gray-800 mb-6">Booked Apartments</h1>
      <div className="apartments-container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {bookedApartments.map((booking) => (
  <div><div key={booking.id} className="apartment-card border p-4 rounded-lg shadow-lg">
  <img
    src={booking.apartment.image}
    alt={booking.apartment.name}
    className="apartment-image w-full h-48 object-cover rounded mb-4"
  />
  <h2 className="apartment-name text-xl font-semibold">{booking.apartment.name}</h2>
  <p className="apartment-location">{booking.apartment.location}</p>
  <p>{booking.rentOption} rental</p>
  
  <p>Booked on: {new Date(booking.bookedAt).toLocaleDateString()}</p>

<br></br>
  <p className="apartment-description">Booked by: {booking.renterName || 'Unknown'}</p>
  <p className="apartment-description">Contact Number: {booking.phoneNumber || 'Unknown'}</p>


  <div className="flex space-x-4 mt-4">
    <button
      onClick={() => handleDelete(booking.id)} // Ensure this is the correct ID
      className="delete-button px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
    <button
      onClick={() => handleUpdate(booking.id)} // Ensure this navigates to the correct apartment ID
      className="rent-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Update Information
    </button>
    
  </div>
</div></div>
))}


      </div>
    </div>
  );
};

export default BookedApartmentsPage;
