'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUpload from '@/pages/api/upload'; // Adjust this path to where your ImageUpload component is located

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

const NestYourHome = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [editingApartment, setEditingApartment] = useState<Partial<Apartment> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [newApartment, setNewApartment] = useState<Partial<Apartment>>({
    image: '',
    name: '',
    location: '',
    rentPrice: 0,
    rentDuration: 'night',
    roomType: '',
    description: '',
  });

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    const response = await axios.get('/api/apartments');
    setApartments(response.data);
  };

  const addApartment = async () => {
    try {
      await axios.post('/api/apartments', newApartment);
      alert('Apartment added successfully!');
      setNewApartment({
        image: '',
        name: '',
        location: '',
        rentPrice: 0,
        rentDuration: 'night',
        roomType: '',
        description: '',
      });
      fetchApartments();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Failed to add apartment:', error);
    }
  };

  const updateApartment = async () => {
    if (!editingApartment?._id) return;

    try {
      await axios.put(`/api/apartments/${editingApartment._id}`, editingApartment);
      alert('Apartment updated successfully!');
      setIsEditMode(false);
      setEditingApartment(null);
      fetchApartments();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Failed to update apartment:', error);
    }
  };

  const deleteApartment = async (id: string) => {
    try {
      await axios.delete(`/api/apartments?id=${id}`);
      alert('Apartment deleted successfully!');
      fetchApartments();
    } catch (error) {
      console.error('Failed to delete apartment:', error);
    }
  };

  const onEditClick = (apartment: Apartment) => {
    setIsEditMode(true);
    setEditingApartment({ ...apartment });
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    if (isEditMode) {
      updateApartment();
    } else {
      addApartment();
    }
  };

  const handleAddEditButtonClick = () => {
    setIsEditMode(false);
    setEditingApartment(null);
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-rose-500 text-2xl mb-4">Nest Your Home</h1>
      <button onClick={handleAddEditButtonClick} className="px-4 py-2 bg-green-500 text-white rounded">
        {isFormVisible ? 'Cancel' : isEditMode ? 'Edit Apartment' : 'Add Apartment'}
      </button>

      {isFormVisible && (
        <div className="mt-8">
          <h3 className="text-xl mb-2">{isEditMode ? 'Edit Apartment' : 'Add New Apartment'}</h3>
          <ImageUpload
            value={isEditMode && editingApartment ? editingApartment.image : newApartment.image}
            onChange={(url) => {
              isEditMode ?
                setEditingApartment(prev => ({ ...prev, image: url })) :
                setNewApartment(prev => ({ ...prev, image: url }));
            }}
          />
          <input
            type="text"
            placeholder="Name"
            value={isEditMode && editingApartment ? editingApartment.name : newApartment.name}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, name: e.target.value })) :
              setNewApartment(prev => ({ ...prev, name: e.target.value }))
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={isEditMode && editingApartment ? editingApartment.location : newApartment.location}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, location: e.target.value })) :
              setNewApartment(prev => ({ ...prev, location: e.target.value }))
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Rent Price"
            value={isEditMode && editingApartment ? editingApartment.rentPrice : newApartment.rentPrice}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, rentPrice: parseFloat(e.target.value) })) :
              setNewApartment(prev => ({ ...prev, rentPrice: parseFloat(e.target.value) }))
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <select
            value={isEditMode && editingApartment ? editingApartment.rentDuration : newApartment.rentDuration}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, rentDuration: e.target.value as 'night' | 'month' })) :
              setNewApartment(prev => ({ ...prev, rentDuration: e.target.value as 'night' | 'month' }))
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
            value={isEditMode && editingApartment ? editingApartment.roomType : newApartment.roomType}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, roomType: e.target.value })) :
              setNewApartment(prev => ({ ...prev, roomType: e.target.value }))
            }
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={isEditMode && editingApartment ? editingApartment.description : newApartment.description}
            onChange={(e) => isEditMode ?
              setEditingApartment(prev => ({ ...prev, description: e.target.value })) :
              setNewApartment(prev => ({ ...prev, description: e.target.value }))
            }
            className="block w-full p-2 border mb-4 rounded"
            required
          />
          <button onClick={handleFormSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            {isEditMode ? 'Update Apartment' : 'Add Apartment'}
          </button>
        </div>
      )}

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
              <p>{apartment.description}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => onEditClick(apartment)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteApartment(apartment._id)}
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
