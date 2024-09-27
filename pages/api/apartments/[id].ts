import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../app/libs/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ message: 'Invalid apartment ID' });
    return;
  }

  const client = await clientPromise;
  const db = client.db('test'); // Replace 'test' with your database name

  try {
    const apartment = await db.collection('apartments').findOne({ _id: new ObjectId(id) });
    if (!apartment) {
      res.status(404).json({ message: 'Apartment not found' });
      return;
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch apartment details', error });
  }
}
