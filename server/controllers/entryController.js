import Entry from "../models/entryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addEntry = asyncHandler(async (req, res) => {
  const { accountId, date, value, category, note } = req.body;
  const userId = req.user._id;
  const entry = await Entry.create({
    userId,
    date,
    value,
    accountId,
    category,
    note
  });

  if (entry) {
    res.status(201).json({
      _id: entry._id,
      userId: entry.userId,
      accountId: entry.accountId,
      date: entry.date,
      value: entry.value,
      category: entry.category,
      note: entry.note,
    });
  } else {
    res.status(400).json({ message: "Invalid entry data" });
  }
});

export const getEntries = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const entries = await Entry.find({ userId }).select("-createdAt -updatedAt -__v")
  res.status(201).json({
    entries,
  });
});
