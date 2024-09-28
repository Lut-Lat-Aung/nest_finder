import { NextResponse } from 'next/server';
import clientPromise from '../../libs/mongodb';
import { ObjectId } from 'mongodb';
import { Apartment } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET apartments
export async function GET() {
  const client = await clientPromise;
  const db = client.db('test');
  const apartments = await db.collection<Apartment>('apartments').find({}).toArray();
  return NextResponse.json(apartments);
}

// POST new apartment
export async function POST(request: Request) {
  try {
    const { image, name, location, rentPrice, rentDuration, roomType, description } = await request.json();

    // Validate received data
    if (!image || !name || !location || !rentPrice || !rentDuration || !roomType || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test'); 

    // Insert the new apartment
    const result = await db.collection('apartments').insertOne({
      image,
      name,
      location,
      rentPrice,
      rentDuration,
      roomType,
      description,
      createdAt: new Date()
    });

    const newApartment = await db.collection('apartments').findOne({ _id: result.insertedId });
    return NextResponse.json({ message: 'Apartment added successfully', apartment: newApartment }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/apartments:', error);
    return NextResponse.json({ error: 'An error occurred while adding the apartment' }, { status: 500 });
  }
}


// PUT (update) apartment
export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db('test');
  const { _id, ...updatedApartment } = await request.json();
  await db.collection('apartments').updateOne({ _id: new ObjectId(_id) }, { $set: updatedApartment });
  return NextResponse.json({ message: 'Apartment updated' });
}

// DELETE apartment
export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db('test');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await db.collection('apartments').deleteOne({ _id: new ObjectId(id!) });
  return NextResponse.json({ message: 'Apartment deleted' });
}
