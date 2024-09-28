import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('test'); 
  const apartments = await db.collection('apartments').find({}).toArray();
  res.status(200).json(apartments);
}
