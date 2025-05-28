import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'test', // optional but recommended
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
