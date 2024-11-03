'use server';

import { connectToDatabase } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";

export async function deleteData(actionId: string) {
  const { userId } = auth();
  const { db } = await connectToDatabase();
  if (!userId) throw new Error('User not found');

  try {
    switch (actionId) {
      case 'history':
        // Delete all history documents associated with the user
        await db.collection('videoData').deleteMany({ userId });
        return { success: true, message: 'History deleted successfully' };

      case 'apiKeys':
        // Delete all API keys associated with the user
        await db.collection('apiKeys').deleteMany({ userId });
        return { success: true, message: 'API Keys deleted successfully' };

      case 'video':
        // Delete all video data associated with the user
        await db.collection('videocards').deleteMany({ userId });
        return { success: true, message: 'Processed video data deleted successfully' };

      default:
        throw new Error('Invalid action ID');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    throw new Error('Failed to delete data');
  }
}
