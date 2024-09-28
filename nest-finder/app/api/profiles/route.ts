import { NextResponse } from 'next/server';
import clientPromise from '../../libs/mongodb';
import { ObjectId } from 'mongodb';

// GET all profiles
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test'); 

    const profiles = await db.collection('profiles').find({}).toArray();
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Failed to fetch profiles:', error);
    return NextResponse.json({ message: 'Failed to fetch profiles', error }, { status: 500 });
  }
}

// POST new profile
export async function POST(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test'); 
      const { name, email, role, phoneNumber } = await request.json();
  
      if (!name || !email || !role || !phoneNumber) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }
  
      const result = await db.collection('profiles').insertOne({
        name,
        email,
        role,
        phoneNumber,
      });
  
      // Check if the insert operation was successful
      if (!result.acknowledged || !result.insertedId) {
        return NextResponse.json({ message: 'Failed to create profile.' }, { status: 500 });
      }
  
      // Respond with the created profile
      const createdProfile = await db.collection('profiles').findOne({ _id: result.insertedId });
      return NextResponse.json({ message: 'Profile created', profile: createdProfile }, { status: 201 });
    } catch (error) {
      console.error('Failed to create profile:', error);
      return NextResponse.json({ message: 'Failed to create profile', error }, { status: 500 });
    }
  }

  
  export async function PUT(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test');
      const { _id, ...updatedProfile } = await request.json();
  
      if (!_id || !ObjectId.isValid(_id)) {
        return NextResponse.json({ message: 'Invalid profile ID.' }, { status: 400 });
      }
  
      const result = await db.collection('profiles').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updatedProfile }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'Profile not found.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Profile updated successfully.' });
    } catch (error) {
      console.error('Failed to update profile:', error);
      return NextResponse.json({ message: 'Failed to update profile', error }, { status: 500 });
    }
  }
  
  // DELETE profile
  export async function DELETE(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('test');
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid profile ID.' }, { status: 400 });
      }
  
      const result = await db.collection('profiles').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: 'Profile not found.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Profile deleted successfully.' });
    } catch (error) {
      console.error('Failed to delete profile:', error);
      return NextResponse.json({ message: 'Failed to delete profile', error }, { status: 500 });
    }
  }
