import mongoose from "mongoose";

export let connected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) return console.log("Missing connection string");
  if (connected) return console.log("Database already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devflow",
    });
    connected = true;
    console.log("Connected to the DB successfully...");
  } catch (error) {
    console.log("DATABASE_CONNECTION_ERROR: ", error);
  }
};
