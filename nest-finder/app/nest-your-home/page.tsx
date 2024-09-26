'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUpload from '../../app/components/ImageUpload/ImageUpload';

interface Apartment {
  _id?: string;
  image: string;
  name: string;
  location: string;
  rentPrice: number;
  rentDuration: 'night' | 'month';
  roomType: string;
  description: string; // Added description field
}

const NestYourHome = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [editingApartment, setEditingApartment] = useState<Partial<Apartment> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // State for editing mode
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false); // State for form visibility
  const [newApartment, setNewApartment] = useState<Partial<Apartment>>({
    image: '',
    name: '',
    location: '',
    rentPrice: 0,
    rentDuration: 'night',
    roomType: '',
    description: '', // Initialize description
  });

  useEffect(() => {
    fetchApartments();
  }, []);

  // Fetch apartments from the API
  const fetchApartments = async () => {
    try {
      const response = await axios.get('/api/apartments');
      setApartments(response.data);
    } catch (error) {
      console.error('Failed to fetch apartments:', error);
    }
  };

  // Add a new apartment to the database
  const addApartment = async () => {
    try {

      if (!newApartment.image || !newApartment.name || !newApartment.location || !newApartment.rentPrice || !newApartment.roomType || !newApartment.description) {
        alert('Please enter every infomation to add an apartment.');
        return;
      }
      
      await axios.post('/api/apartments', newApartment);
      alert('Apartment added successfully!');
      setNewApartment({
        image: '',
        name: '',
        location: '',
        rentPrice: 0,
        rentDuration: 'night',
        roomType: '',
        description: '', // Reset description
      });
      fetchApartments(); // Refresh the list
      setIsFormVisible(false); // Hide the form after adding
    } catch (error) {
      console.error('Failed to add apartment:', error);
    }
  };

  // Update an existing apartment in the database
  const updateApartment = async () => {
    if (!editingApartment?._id) return;

    try {
      
      

      await axios.put('/api/apartments', editingApartment);
      alert('Apartment updated successfully!');
      setIsEditMode(false); // Exit edit mode
      setEditingApartment(null); // Clear editing state
      fetchApartments(); // Refresh the list
      setIsFormVisible(false); // Hide the form after updating
    } catch (error) {
      console.error('Failed to update apartment:', error);
    }
  };

  // Delete an apartment from the database
  const deleteApartment = async (id: string) => {
    try {
      await axios.delete(`/api/apartments?id=${id}`);
      alert('Apartment deleted successfully!');
      fetchApartments(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete apartment:', error);
    }
  };

  // Set the apartment to be edited
  const onEditClick = (apartment: Apartment) => {
    setIsEditMode(true);
    setEditingApartment({ ...apartment });
    setIsFormVisible(true); // Show form in edit mode
  };

  // Handle form submission based on mode
  const handleFormSubmit = () => {
    if (isEditMode) {
      updateApartment();
    } else {
      addApartment();
    }
  };

  // Handle Add/Edit button click to show/hide form
  const handleAddEditButtonClick = () => {
    if (isEditMode) {
      // If in edit mode, reset state and hide form
      setIsEditMode(false);
      setEditingApartment(null);
    }
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-rose-500 text-2xl mb-4">Nest Your Home</h1>

      {/* Button to Add/Edit Apartment */}
      <button
        onClick={handleAddEditButtonClick}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {isFormVisible ? 'Cancel' : isEditMode ? 'Edit Apartment' : 'Add Apartment'}
      </button>

      {/* Form for adding or editing apartment, visible when form is toggled */}
      {isFormVisible && (
        <div className="mt-8" >
          <h3 className="text-xl mb-2">{isEditMode ? 'Edit Apartment' : 'Add New Apartment'}</h3>
          
          <ImageUpload
            value={isEditMode && editingApartment ? editingApartment.image || '' : newApartment.image || ''}
            onChange={(url) => {
              isEditMode ?
                setEditingApartment(prev => ({ ...prev, image: url })) :
                setNewApartment(prev => ({ ...prev, image: url }));
            }}
          />


          <input
            type="text"
            placeholder="Name"
            value={isEditMode ? editingApartment?.name : newApartment.name}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, name: e.target.value })
              : setNewApartment({ ...newApartment, name: e.target.value })
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={isEditMode ? editingApartment?.location : newApartment.location}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, location: e.target.value })
              : setNewApartment({ ...newApartment, location: e.target.value })
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Rent Price"
            value={isEditMode ? editingApartment?.rentPrice : newApartment.rentPrice}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, rentPrice: parseFloat(e.target.value) })
              : setNewApartment({ ...newApartment, rentPrice: parseFloat(e.target.value) })
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <select
            value={isEditMode ? editingApartment?.rentDuration : newApartment.rentDuration}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, rentDuration: e.target.value as 'night' | 'month' })
              : setNewApartment({ ...newApartment, rentDuration: e.target.value as 'night' | 'month' })
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          >
            <option value="night">Per Night</option>
            <option value="month">Per Month</option>
          </select>
          <input
            type="text"
            placeholder="Room Type"
            value={isEditMode ? editingApartment?.roomType : newApartment.roomType}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, roomType: e.target.value })
              : setNewApartment({ ...newApartment, roomType: e.target.value })
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <textarea
            placeholder="Apartment Description"
            value={isEditMode ? editingApartment?.description : newApartment.description}
            onChange={(e) => isEditMode
              ? setEditingApartment({ ...editingApartment, description: e.target.value })
              : setNewApartment({ ...newApartment, description: e.target.value })
            }
            className="block w-full p-2 border mb-4 rounded"
            required
          />
          <button
            onClick={handleFormSubmit} // Handle submission based on mode
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditMode ? 'Update Apartment' : 'Add Apartment'}
          </button>
          {isEditMode && (
            <button
              onClick={() => {
                setIsEditMode(false);
                setEditingApartment(null);
                setIsFormVisible(false); // Hide form
              }} // Cancel editing mode
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* List of apartments with edit and delete options */}
      <div className="mt-8">
        <h3 className="text-xl mb-4">My Apartments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {apartments.map((apartment) => (
            <div key={apartment._id} className="border p-4 rounded shadow-md">
              <img src={apartment.image} alt={apartment.name} className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="text-lg font-bold">{apartment.name}</h2>
              <p>{apartment.location}</p>
              <p>${apartment.rentPrice} / {apartment.rentDuration}</p>
              <p>Room Type: {apartment.roomType}</p>
              <p>{apartment.description}</p> {/* Display description */}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => onEditClick(apartment)} // Set edit mode
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteApartment(apartment._id!)} // Delete apartment
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NestYourHome;
