import { NextResponse } from 'next/server';
import clientPromise from '../../libs/mongodb';
import { ObjectId } from 'mongodb';
import { Apartment } from '../../models/Apartment';

// GET apartments
export async function GET() {
  const client = await clientPromise;
  const db = client.db('test'); // Replace 'test' with your database name
  const apartments = await db.collection<Apartment>('apartments').find({}).toArray();
  return NextResponse.json(apartments);
}

// POST new apartment
export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db('test');
  const newApartment = await request.json();
  await db.collection('apartments').insertOne(newApartment);
  return NextResponse.json(newApartment);
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
