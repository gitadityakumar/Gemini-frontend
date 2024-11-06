"use server"
import { format } from 'date-fns';
import { connectToDatabase } from '@/lib/mongodb';
import { UserQuota } from '@/types/userQuota';

const DAILY_QUOTA = 5; // Set your daily limit here

// Function to update the count for a user for today
export async function incrementQuotaCount(userId: string, date: string): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<UserQuota>('user_quota');

  await collection.updateOne(
    { userId, date },
    { $inc: { count: 1 } }
  );
}

// Function to check if a user is under their daily quota
export const checkDailyQuota = async (userId: string): Promise<boolean> => {
  const today = format(new Date(), 'yyyy-MM-dd');

  const { db } = await connectToDatabase();
  const collection = db.collection<UserQuota>('user_quota');

  // Check if there is a record for today's quota
  const record = await collection.findOne({ userId, date: today });

  if (!record) {
    // No record for today, create a new one with count set to 1
    await collection.insertOne({ userId, date: today, count: 1 });
    return true;
  }

  if (record.count >= DAILY_QUOTA) {
    // User has reached their daily limit
    return false;
  }

  // If under the limit, increment the count using the separate function
  // await incrementQuotaCount(userId, today);

  return true;
};
