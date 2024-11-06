'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';

export async function getQuota() {
  // Get the userId from Clerk authentication
  const { userId } =  auth();
  
  // If userId is not found, throw an error
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const { db } = await connectToDatabase();

    const quota = await db.collection('user_quota').findOne({ userId });

    if (!quota) {
      throw new Error('No quota data found for the user');
    }

    return {
      _id: quota._id.toHexString(),
      userId: quota.userId,
      date: quota.date,
      count: quota.count
    };
  } catch (error) {
    console.error('Error fetching quota:', error);
    throw error;
  }
}