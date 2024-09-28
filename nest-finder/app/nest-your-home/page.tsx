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
    try {
      const response = await axios.get('/api/apartments');
      setApartments(response.data);
    } catch (error) {
      console.error('Failed to fetch apartments:', error);
    }
  };

  const addApartment = async () => {
    try {
      if (!newApartment.image || !newApartment.name || !newApartment.location || !newApartment.rentPrice || !newApartment.roomType || !newApartment.description) {
        alert('Please enter every information to add an apartment.');
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
      await axios.put('/api/apartments', editingApartment);
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
    if (isEditMode) {
      setIsEditMode(false);
      setEditingApartment(null);
    }
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className=" mx-auto p-4">
      <div className=" flex justify-between items-center mb-8">
        <h1 className="Title text-4xl font-bold text-gray-800">Nest Your Home</h1>
        <button
          onClick={handleAddEditButtonClick}
          className="Title add-button"
        >
          {isFormVisible ? 'Cancel' : isEditMode ? 'Edit Apartment' : 'Add Apartment'}
        </button>
      </div>

      {isFormVisible && (
  <div className="fixed inset-0 z-30 flex items-center justify-center ">
    <div className="form-modal-container ">
      <h3 className="form-title ">
        {isEditMode ? 'Edit Apartment' : 'Add New Apartment'}
      </h3 >
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
        className="input-field mb-4"
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
        className="input-field mb-4"
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
        className="input-field mb-4"
        required
      />
      <select
        value={isEditMode ? editingApartment?.rentDuration : newApartment.rentDuration}
        onChange={(e) => isEditMode
          ? setEditingApartment({ ...editingApartment, rentDuration: e.target.value as 'night' | 'month' })
          : setNewApartment({ ...newApartment, rentDuration: e.target.value as 'night' | 'month' })
        }
        className="input-field mb-4"
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
        className="input-field mb-4"
        required
      />
      <textarea
        placeholder="Apartment Description"
        value={isEditMode ? editingApartment?.description : newApartment.description}
        onChange={(e) => isEditMode
          ? setEditingApartment({ ...editingApartment, description: e.target.value })
          : setNewApartment({ ...newApartment, description: e.target.value })
        }
        className="input-field mb-4"
        required
      />
      <div className="form-button-group flex justify-end mt-6">
        <button
          onClick={handleFormSubmit}
          className="submit-button px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition mr-4"
        >
          {isEditMode ? 'Update Apartment' : 'Add Apartment'}
        </button>
        {isFormVisible &&  (
          <button
            onClick={() => {
              setIsEditMode(false);
              setEditingApartment(null);
              setIsFormVisible(false);
            }}
            className="cancel-button px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
)}


      <div className="apartments-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {apartments.map((apartment) => (
          <div key={apartment._id} className="apartment-card border p-4 rounded shadow-md bg-white">
            <img src={apartment.image} alt={apartment.name} className="apartment-image w-full h-48 object-cover rounded mb-4" />
            <h2 className="apartment-name text-lg font-bold mb-2">{apartment.name}</h2>
            <p className="apartment-location text-gray-600 mb-2">{apartment.location}</p>
            <p className="apartment-price text-gray-800 mb-2">${apartment.rentPrice} / {apartment.rentDuration}</p>
            <p className="apartment-room-type text-gray-600 mb-2">Room Type: {apartment.roomType}</p>
            <p className="apartment-description text-gray-600 mb-4">{apartment.description}</p>
            <div className="flex justify-between">
              <button
                onClick={() => onEditClick(apartment)}
                className="rent-button px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteApartment(apartment._id!)}
                className="delete-button px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestYourHome;
