// src/lib/db.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("Please define MONGO_URI in .env");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,       
      connectTimeoutMS: 10000,     
      socketTimeoutMS: 45000,      
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // Reset promise on failure
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
