import Account from "../models/accountModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addAccount = asyncHandler(async (req, res) => {
  const { userId, name, accountNumber, accountType, initialBalance } = req.body;

  const account = await Account.create({
    userId,
    name,
    accountNumber,
    accountType,
    initialBalance,
  });

  if (account) {
    res.status(201).json({
      userId: account.userId,
      name: account.name,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      initialBalance: account.initialBalance,
    });
  } else {
    res.status(400).json({ message: "Invalid account data" });
  }
});
