import Account from "../models/accountModel.js";
import Entry from "../models/entryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addEntry = asyncHandler(async (req, res) => {
  const { accountId, date, value, category, note } = req.body;
  const userId = req.user._id;

  const account = await Account.findOne({ _id: accountId });
  if (!account) return res.status(400).json({ message: "Account Not Found" });

  const entry = await Entry.create({
    userId,
    date,
    value,
    accountId,
    category,
    note,
  });

  if (entry) {
    account.balance += value;
    account.save();

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

  let entries = await Entry.find({ userId })
    .select(" -__v")
    .populate("accountId", "accountName");

  res.status(201).json({
    entries,
  });
});

export const getEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id)
    .select(" -__v")
    .populate("accountId", "accountName");

  res.status(201).json({
    entry,
  });
});

export const updateEntry = asyncHandler(async (req, res) => {
  const { id, accountId, date, value, category, note } = req.body;

  const entry = await Entry.findById(id);

  if (entry) {
    let account = await Account.findOne({ _id: entry.accountId });
    if (!account) return res.status(400).json({ message: "Account Not Found" });
    let { accountName } = account;
    account.balance -= entry.value;
    account.save();

    entry.accountId = accountId || entry.accountId;
    entry.date = date || entry.date;
    entry.value = value || entry.value;
    entry.category = category || entry.category;
    entry.note = note || entry.note;

    const updatedEntry = await entry.save();

    account = await Account.findOne({ _id: updatedEntry.accountId });
    accountName = account.accountName;
    account.balance += updatedEntry.value;
    account.save();

    res.status(201).json({
      _id: updatedEntry._id,
      userId: updatedEntry.userId,
      accountId: updatedEntry.accountId,
      date: updatedEntry.date,
      value: updatedEntry.value,
      category: updatedEntry.category,
      note: updatedEntry.note,
    });
  } else {
    res.status(404).json({ message: "Entry not found" });
  }
});

export const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (entry) {
    const { value } = entry;
    const account = await Account.findOne({ _id: entry.accountId });
    if (!account) return res.status(400).json({ message: "Account Not Found" });
    account.balance -= value;
    account.save();

    await Entry.deleteOne({ _id: entry._id });
    res.status(200).json({ message: "Entry deleted" });
  } else {
    res.status(400).json({ message: "Can't delete entry" });
  }
});
