import Entry from "../models/entryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addEntry = asyncHandler(async (req, res) => {
  const { userId, accountId, date, value, category } = req.body;

  const entry = await Entry.create({
    userId,
    accountId,
    date,
    value,
    category,
  });

  if (entry) {
    res.status(201).json({
      userId: entry.userId,
      accountId: entry.accountId,
      date: entry.date,
      value: entry.value,
      category: entry.category,
    });
  } else {
    res.status(400).json({ message: "Invalid entry data" });
  }
});
