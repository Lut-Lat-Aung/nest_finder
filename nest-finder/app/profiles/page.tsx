'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Profile {
  _id?: string;
  name: string;
  email: string;
  role: 'renter' | 'guest'; // Define roles for profiles
  phoneNumber: string;
}

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfile, setNewProfile] = useState<Partial<Profile>>({
    name: '',
    email: '',
    role: 'guest',
    phoneNumber: '',
  });
  const [editingProfile, setEditingProfile] = useState<Partial<Profile> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch profiles on page load
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fetch profiles from API
  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    }
  };

  // Add a new profile
  const addProfile = async () => {
    try {
      if (!newProfile.name || !newProfile.email || !newProfile.role || !newProfile.phoneNumber) {
        alert('Please fill all fields.');
        return;
      }
      
      await axios.post('/api/profiles', newProfile);
      alert('Profile added successfully!');
      setNewProfile({
        name: '',
        email: '',
        role: 'guest',
        phoneNumber: '',
      });
      fetchProfiles(); // Refresh the list
    } catch (error) {
      console.error('Failed to add profile:', error);
    }
  };

  
  // Function to update profile
const updateProfile = async () => {
  try {
    if (!editingProfile || !editingProfile._id) {
      alert('Profile ID is missing.');
      return;
    }

    const response = await axios.put('/api/profiles', editingProfile);
    if (response.status === 200) {
      alert('Profile updated successfully!');
      setEditingProfile(null); // Clear editing state
      fetchProfiles(); // Refresh the list
    } else {
      alert('Failed to update profile.');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('An error occurred while updating the profile.');
  }
};


const deleteProfile = async (id: string) => {
  try {
    const response = await axios.delete(`/api/profiles?id=${id}`);
    if (response.status === 200) {
      alert('Profile deleted successfully!');
      fetchProfiles(); // Refresh the list
    } else {
      alert('Failed to delete profile.');
    }
  } catch (error) {
    console.error('Failed to delete profile:', error);
    alert('An error occurred while deleting the profile.');
  }
};


  // Handle form submission
  const handleFormSubmit = () => {
    if (isEditMode) {
      updateProfile();
    } else {
      addProfile();
    }
  };

  // Set profile for editing
  const onEditClick = (profile: Profile) => {
    setIsEditMode(true);
    setEditingProfile(profile);
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="Title text-2xl font-bold mb-4">Profiles</h1>
      <h3 className="container text-xl mb-2">{isEditMode ? 'Edit Profile' : 'Add New Profile'}</h3>
      {/* Form for adding/editing profiles */}
      <div className="container mb-6">
        
        <input
          type="text"
          placeholder="Name"
          value={isEditMode ? editingProfile?.name : newProfile.name}
          onChange={(e) => isEditMode
            ? setEditingProfile({ ...editingProfile, name: e.target.value })
            : setNewProfile({ ...newProfile, name: e.target.value })}
          className="input-field block w-full p-2 border mb-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={isEditMode ? editingProfile?.email : newProfile.email}
          onChange={(e) => isEditMode
            ? setEditingProfile({ ...editingProfile, email: e.target.value })
            : setNewProfile({ ...newProfile, email: e.target.value })}
          className="input-field block w-full p-2 border mb-2 rounded"
          required
        />
        <select
          value={isEditMode ? editingProfile?.role : newProfile.role}
          onChange={(e) => isEditMode
            ? setEditingProfile({ ...editingProfile, role: e.target.value as 'renter' | 'guest' })
            : setNewProfile({ ...newProfile, role: e.target.value as 'renter' | 'guest' })}
          className="input-field block w-full p-2 border mb-2 rounded"
          required
        >
          <option value="guest">Guest</option>
          <option value="renter">Renter</option>
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={isEditMode ? editingProfile?.phoneNumber : newProfile.phoneNumber}
          onChange={(e) => isEditMode
            ? setEditingProfile({ ...editingProfile, phoneNumber: e.target.value })
            : setNewProfile({ ...newProfile, phoneNumber: e.target.value })}
          className="input-field block w-full p-2 border mb-4 rounded"
          required
        />
      </div>
      
      <button
          onClick={handleFormSubmit}
          className="input-field px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditMode ? 'Update Profile' : 'Add Profile'}
        </button>
        {isEditMode && (
          <button
            onClick={() => {
              setIsEditMode(false);
              setEditingProfile(null);
            }}
            className="input-field ml-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        )}

      {/* List of profiles */}
      <div className="apartments-container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile._id} className="apartment-card border p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{profile.name}</h2>
            <p>{profile.email}</p>
            <p>Role: {profile.role}</p>
            <p>{profile.phoneNumber}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => onEditClick(profile)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProfile(profile._id!)}
                className="px-4 py-2 bg-red-500 text-white rounded"
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

export default ProfilesPage;
