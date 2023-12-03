import dayjs from "dayjs";
import Account from "../models/accountModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Entry from "../models/entryModel.js";

export const addAccount = asyncHandler(async (req, res) => {
  const { accountName, accountNumber, accountType, balance, color } = req.body;
  const userId = req.user._id;

  const account = await Account.create({
    userId,
    accountName,
    color,
    accountNumber,
    accountType,
    balance,
  });

  if (balance !== 0) {
    await Entry.create({
      userId,
      date: new Date().toISOString(),
      value: balance,
      accountId: account._id,
      category: "Account Initial Value",
      note: "",
    });
  }

  if (account) {
    res.status(201).json({
      _id: account._id,
      accountName: account.accountName,
      color: account.color,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      balance: account.balance,
    });
  } else {
    res.status(400).json({ message: "Invalid account data" });
  }
});

export const getAccounts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const accounts = await Account.find({ userId }).select(
    "accountName accountNumber accountType balance color"
  );
  res.status(201).json({
    accounts,
  });
});

export const getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id).select(
    "accountName accountNumber accountType balance color"
  );
  res.status(201).json({
    account,
  });
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { id, accountName, accountNumber, accountType, color } = req.body;
  const account = await Account.findById(id);

  if (account) {
    account.accountName = accountName || account.accountName;
    account.accountNumber = accountNumber || account.accountNumber;
    account.accountType = accountType || account.accountType;
    account.color = color || account.color;
    await account.save();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
  res.status(201).json({
    account,
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (account) {
    await Account.deleteOne({ _id: account._id });
    await Entry.deleteMany({ accountId: account._id });
  } else {
    res.status(404).json({ message: "Account not found" });
  }
  res.status(201).json({
    message: "Account deleted",
  });
});
