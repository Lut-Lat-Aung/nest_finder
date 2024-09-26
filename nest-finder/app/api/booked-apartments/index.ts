import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    
    case 'GET':
      try {
        const bookedApartments = await prisma.bookedApartment.findMany(); // Use the correct model name
        res.status(200).json(bookedApartments);
      } catch (error) {
        console.error('Failed to fetch booked apartments:', error);
        res.status(500).json({ message: 'Failed to fetch booked apartments', error });
      }
      break;

    case 'POST':
      try {
        const { apartmentId, rentOption } = req.body;

        // Log the received request body for debugging
        console.log('Received Request Body:', req.body);

        // Validate request body
        if (!apartmentId || !rentOption) {
          console.error('Missing apartmentId or rentOption.');
          return res.status(400).json({ message: 'Apartment ID and rent option are required.' });
        }

        // Validate apartmentId format (for MongoDB ObjectId)
        if (!ObjectId.isValid(apartmentId)) {
          console.error('Invalid apartmentId format.');
          return res.status(400).json({ message: 'Invalid apartment ID format.' });
        }

        // Find the apartment by ID
        const apartment = await prisma.apartment.findUnique({
          where: { id: apartmentId }
        });

        if (!apartment) {
          console.error('Apartment not found.');
          return res.status(404).json({ message: 'Apartment not found.' });
        }

        // Create the booking
        const booking = await prisma.bookedApartment.create({
          data: {
            apartmentId: apartmentId,
            rentOption: rentOption,
            bookedAt: new Date(),
          },
        });

        console.log('Booking created:', booking);
        res.status(201).json({ message: 'Apartment booked successfully.', booking });
      } catch (error) {
        console.error('Failed to book apartment:', error);
        res.status(500).json({ message: 'Failed to book apartment', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
