import { NextResponse } from 'next/server';
import clientPromise from '../../libs/mongodb';
import { ObjectId } from 'mongodb';

// GET apartments
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Replace 'test' with your database name

    // Fetch all apartments from the database
    const apartments = await db.collection('apartments').find({}).toArray();

    return NextResponse.json(apartments);
  } catch (error) {
    console.error('Failed to fetch apartments:', error);
    return NextResponse.json({ message: 'Failed to fetch apartments', error }, { status: 500 });
  }
}

// POST a new apartment
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const { image, name, location, rentPrice, rentDuration, roomType, description } = await request.json();

    // Create a new apartment document
    const newApartment = {
      image,
      name,
      location,
      rentPrice,
      rentDuration,
      roomType,
      description,
      createdAt: new Date(),
    };

    const result = await db.collection('apartments').insertOne(newApartment);

    return NextResponse.json({ message: 'Apartment added successfully.', apartment: newApartment }, { status: 201 });
  } catch (error) {
    console.error('Failed to add apartment:', error);
    return NextResponse.json({ message: 'Failed to add apartment', error }, { status: 500 });
  }
}

// PUT (update) an apartment
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const { _id, ...updatedApartment } = await request.json();

    const result = await db.collection('apartments').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedApartment }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Apartment not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Apartment updated.' });
  } catch (error) {
    console.error('Failed to update apartment:', error);
    return NextResponse.json({ message: 'Failed to update apartment', error }, { status: 500 });
  }
}

// DELETE an apartment
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid apartment ID.' }, { status: 400 });
    }

    const result = await db.collection('apartments').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Apartment not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Apartment deleted.' });
  } catch (error) {
    console.error('Failed to delete apartment:', error);
    return NextResponse.json({ message: 'Failed to delete apartment', error }, { status: 500 });
  }
}
