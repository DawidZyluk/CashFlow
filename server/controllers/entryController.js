import Entry from "../models/entryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addEntry = asyncHandler(async (req, res) => {
  const { userId, value, category, account, label } = req.body;

  const entry = await Entry.create({
    userId,
    label,
    value,
    category,
    account,
  });

  if (entry) {
    res.status(201).json({
      userId: entry.userId,
      label: entry.label,
      value: entry.value,
      category: entry.category,
      account: entry.account,
    });
  } else {
    res.status(400).json({ message: "Invalid entry data" });
  }
});
