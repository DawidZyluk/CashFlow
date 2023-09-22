import Account from "../models/accountModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
