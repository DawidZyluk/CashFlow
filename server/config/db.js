import mongoose from "mongoose";
import Account from "../models/accountModel.js";
import Entry from "../models/entryModel.js";
import UserModel from "../models/userModel.js";
import { User, accounts, entries, overallStats } from "../data/data.js";
import OverallStats from "../models/overallStatsModel.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`)


    // console.log("Seeding database...")
    // await Account.collection.drop()
    // await OverallStats.collection.drop();
    // await Entry.collection.drop()
    // await Account.insertMany(accounts)
    // //await UserModel.create(User);
    // await Entry.insertMany(entries)
    // await OverallStats.insertMany(overallStats);
    // console.log("Database has beed seeded.")

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}