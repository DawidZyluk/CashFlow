import dayjs from "dayjs";
import Account from "../models/accountModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OverallStats from "../models/overallStatsModel.js";

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

  const year = dayjs().year();
  const month = dayjs().format('MMMM');

  const stats = await OverallStats.findOne({ userId, year });

  if (!stats) {
    await OverallStats.create({
      userId,
      year,
      totalBalance: balance,
      accounts: { [accountName]: balance },
      monthlyData: {
        [month]: {
          totalBalance: balance,
          accounts: { [accountName]: balance },
        },
      },
      dailyData: {},
    });
  } else {
    let { accounts, monthlyData } = stats;
    const currAccount = accounts.get(accountName);
    const currMonth = monthlyData.get(month);
    stats.totalBalance += balance;
    if (currAccount) accounts.set(accountName, currAccount + balance);
    else accounts.set(accountName, balance);
    if (currMonth) {
      currMonth.totalBalance += balance;
      if (currMonth.accounts.get(accountName)) {
        monthlyData
          .get(month)
          .accounts.set(
            accountName,
            currMonth.accounts.get(accountName) + balance
          );
      } else currMonth.accounts.set(accountName, balance);
    } else {
      monthlyData.set(month, {
        totalBalance: balance,
        accounts: { [accountName]: balance },
      });
    }
    stats.save();
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
