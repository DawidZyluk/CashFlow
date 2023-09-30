import OverallStats from "../models/OverallStats.js";
import Account from "../models/accountModel.js";
import Entry from "../models/entryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

export const addEntry = asyncHandler(async (req, res) => {
  const { accountId, date, value, category, note } = req.body;
  const userId = req.user._id;
  const entry = await Entry.create({
    userId,
    date,
    value,
    accountId,
    category,
    note,
  });

  const account = await Account.findOne({ _id: accountId });
  const { accountName } = account;
  account.balance += value;
  account.save();

  const year = dayjs(date).year();
  const month = dayjs(date).format("MMMM");
  const day = dayjs(date).format("DD/MM/YYYY");
  const stats = await OverallStats.findOne({ userId, year });

  if (!stats) {
    await OverallStats.create({
      userId,
      year,
      totalBalance: value,
      accounts: { [accountName]: value },
      monthlyData: {
        [month]: {
          totalBalance: value,
          accounts: { [accountName]: value },
        },
      },
      dailyData: {
        [day]: value,
      },
    });
  } else {
    let { accounts, monthlyData, dailyData } = stats;
    const currAccount = accounts.get(accountName);
    const currMonth = monthlyData.get(month);
    stats.totalBalance += value;
    if (currAccount)
      accounts.set(
        accountName,
        currAccount + value
      );
    else accounts.set(accountName, value);
    if (currMonth) {
      currMonth.totalBalance += value;
      if (currMonth.accounts.get(accountName)) {
        monthlyData
          .get(month)
          .accounts.set(
            accountName,
            currMonth.accounts.get(accountName) + value
          );
      } else currMonth.accounts.set(accountName, value);
    } else {
      monthlyData.set(month, {
        totalBalance: value,
        accounts: { [accountName]: value },
      });
    }
    if (dailyData.get(day)) dailyData.set(day, dailyData.get(day) + value);
    else dailyData.set(day, value);
    stats.save();
  }

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
  const { year, month } = req.params;
  let entries;

  if (year !== "All" && month !== "All") {
    const date = dayjs(`${year}, ${month}`);
    entries = await Entry.find({
      userId,
      date: {
        $gte: date.format(),
        $lt: dayjs(`${year}, ${dayjs(date).month() + 2}`).format(),
      },
    })
      .select(" -__v")
      .populate("accountId", "accountName");
  } else if (year !== "All") {
    entries = await Entry.find({
      userId,
      date: {
        $gte: new Date(year).toISOString(),
        $lt: new Date(year, 12, 1, 1).toISOString(),
      },
    })
      .select(" -__v")
      .populate("accountId", "accountName");
  } else {
    entries = await Entry.find({ userId })
      .select(" -__v")
      .populate("accountId", "accountName");
  }

  //const entries = await Entry.find({ userId }).sort('-updatedAt').limit(10).select("-createdAt -updatedAt -__v")
  res.status(201).json({
    entries,
  });
});
