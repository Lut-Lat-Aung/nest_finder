import React, { useState } from 'react';
import Modal from '../Modal'; // Import the newly created Modal component
import { useForm } from 'react-hook-form';

interface AddApartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddApartmentModal: React.FC<AddApartmentModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            // Call your API to add apartment here
            // e.g., await axios.post('/api/apartments', data);
            console.log('Apartment added:', data);
            reset(); // Reset form fields after submission
        } catch (error) {
            console.error('Failed to add apartment:', error);
        } finally {
            setLoading(false);
            onClose(); // Close the modal after submission
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Apartment">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <input
                        {...register('image', { required: true })}
                        placeholder="Image URL"
                        className="border p-2 rounded"
                    />
                    <input
                        {...register('name', { required: true })}
                        placeholder="Name"
                        className="border p-2 rounded"
                    />
                    <input
                        {...register('location', { required: true })}
                        placeholder="Location"
                        className="border p-2 rounded"
                    />
                    <input
                        {...register('rentPrice', { required: true })}
                        placeholder="Rent Price"
                        type="number"
                        className="border p-2 rounded"
                    />
                    <select
                        {...register('rentDuration', { required: true })}
                        className="border p-2 rounded"
                    >
                        <option value="night">Per Night</option>
                        <option value="month">Per Month</option>
                    </select>
                    <input
                        {...register('roomType', { required: true })}
                        placeholder="Room Type"
                        className="border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Apartment'}
                </button>
            </form>
        </Modal>
    );
};

export default AddApartmentModal;
