import { NextResponse } from 'next/server';
import clientPromise from '../../libs/mongodb'; // Adjust this path based on your project structure
import { ObjectId } from 'mongodb';



export async function GET(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test'); // Replace 'test' with your database name
      const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    
      // Fetch and transform booked apartments data
      const bookedApartments = await db.collection('bookedApartments').aggregate([
        {
          $lookup: {
            from: 'apartments',
            localField: 'apartmentId',
            foreignField: '_id',
            as: 'apartmentDetails'
          }
        },
        { $unwind: '$apartmentDetails' },
        {
          $project: {
            _id: 1,
            apartmentId: 1,
            rentOption: 1,
            bookedAt: 1,
            apartment: '$apartmentDetails' // Include apartment details in response
          }
        }
      ]).toArray();
  
      // Transform _id to string if necessary for frontend compatibility
      const response = bookedApartments.map((booking) => ({
        ...booking,
        id: booking._id.toString() // Convert _id to string
      }));
  
      return NextResponse.json(response);
    } catch (error) {
      console.error('Failed to fetch booked apartments:', error);
      return NextResponse.json({ message: 'Failed to fetch booked apartments', error }, { status: 500 });
    }
  }

// POST new booked apartment
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Replace 'test' with your database name
    const requestBody = await request.json();

    // Log the incoming request body
    console.log('Received Request Body:', requestBody);

    const { apartmentId, rentOption, renterName, phoneNumber } = requestBody;

    // Validate request data
    if (!apartmentId || !rentOption || !renterName || !phoneNumber) {
      console.error('Missing required fields:', { apartmentId, rentOption, renterName, phoneNumber });
      return NextResponse.json({ message: 'Apartment ID, rent option, renter name, and phone number are required.' }, { status: 400 });
    }

    if (!ObjectId.isValid(apartmentId)) {
      console.error('Invalid apartmentId format.');
      return NextResponse.json({ message: 'Invalid apartment ID format.' }, { status: 400 });
    }

    // Check if there is already a booking with the same apartmentId and rentOption
    const existingBooking = await db.collection('bookedApartments').findOne({
      apartmentId: new ObjectId(apartmentId),
      rentOption: rentOption,
    });

    if (existingBooking) {
      console.error('Duplicate booking.');
      return NextResponse.json({ message: 'This apartment is already booked for the selected duration.' }, { status: 409 });
    }

    // Find the apartment by ID to ensure it exists
    const apartment = await db.collection('apartments').findOne({ _id: new ObjectId(apartmentId) });

    if (!apartment) {
      console.error('Apartment not found.');
      return NextResponse.json({ message: 'Apartment not found.' }, { status: 404 });
    }

    // Create the booking object
    const booking = {
      apartmentId: new ObjectId(apartmentId),
      rentOption: rentOption,
      bookedAt: new Date(),
      renterName: renterName, // Add renter name
      phoneNumber: phoneNumber // Add phone number
    };

    // Log the booking object to be inserted
    console.log('Booking Object to be Inserted:', booking);

    const result = await db.collection('bookedApartments').insertOne(booking);

    // Check if insertion was successful
    if (!result || !result.insertedId) {
      console.error('Failed to insert booking.');
      return NextResponse.json({ message: 'Failed to book apartment.' }, { status: 500 });
    }

    // Log the inserted booking for verification
    console.log('Booking created successfully:', result.ops ? result.ops[0] : booking);
    return NextResponse.json({ message: 'Apartment booked successfully.', booking: result.ops ? result.ops[0] : booking }, { status: 201 });
  } catch (error) {
    console.error('Failed to book apartment:', error);
    return NextResponse.json({ message: 'Failed to book apartment', error }, { status: 500 });
  }
}
  
// PUT (update) booked apartment
export async function PUT(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test');
      const { _id, renterName, phoneNumber, rentOption } = await request.json();
  
      if (!_id) {
        return NextResponse.json({ message: 'Booking ID is required.' }, { status: 400 });
      }
  
      const updateFields: any = {};
      if (renterName) updateFields.renterName = renterName;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      if (rentOption) updateFields.rentOption = rentOption;
  
      const result = await db.collection('bookedApartments').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateFields }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'Booking not found.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Booking updated' });
    } catch (error) {
      console.error('Failed to update booking:', error);
      return NextResponse.json({ message: 'Failed to update booking', error }, { status: 500 });
    }
  }
  
  

// DELETE booked apartment
export async function DELETE(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test'); // Replace 'test' with your database name
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      // Log the received ID for debugging
      console.log('Received ID for deletion:', id);
  
      // Validate the id before using it
      if (!id || !ObjectId.isValid(id)) {
        console.error('Invalid booking ID:', id);
        return NextResponse.json({ message: 'Invalid booking ID.' }, { status: 400 });
      }
  
      const result = await db.collection('bookedApartments').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: 'Booking not found.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Booking deleted' });
    } catch (error) {
      console.error('Failed to delete booking:', error);
      return NextResponse.json({ message: 'Failed to delete booking', error }, { status: 500 });
    }
  }