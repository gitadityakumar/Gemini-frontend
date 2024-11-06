import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use global variable in development mode to preserve client across HMR (Hot Module Replacement).
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, avoid using a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a MongoClient promise, so the client can be shared across functions.
export default clientPromise;

// Helper function to get the MongoDB database instance.
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise;
  const db = client.db("videoDataDB"); // Optionally use a database name from environment
  return { client, db };
}
