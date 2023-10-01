import mongoose from "mongoose";
import Account from "../models/accountModel.js";
import Entry from "../models/entryModel.js";
import UserModel from "../models/userModel.js";
import { User, accounts, entries } from "../data/data.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`)


    // console.log("Seeding database...")
    // Entry.collection.drop()
    // Account.collection.drop()
    // Account.insertMany(accounts)
    // //UserModel.create(User);
    // Entry.insertMany(entries)
    // console.log("Database has beed seeded.")

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}