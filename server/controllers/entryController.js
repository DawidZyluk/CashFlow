import OverallStats from "../models/overallStatsModel.js";
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

  if (entry) {
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
      if (currAccount) accounts.set(accountName, currAccount + value);
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
  const userId = req.user._id;

  const entry = await Entry.findById(id);

  if (entry) {
    let account = await Account.findOne({ _id: entry.accountId });
    let { accountName } = account;
    account.balance -= entry.value;
    account.save();

    let year = dayjs(entry.date).year();
    let month = dayjs(entry.date).format("MMMM");
    let day = dayjs(entry.date).format("DD/MM/YYYY");
    let stats = await OverallStats.findOne({ userId, year });

    let { accounts, monthlyData, dailyData } = stats;
    let currAccount = accounts.get(accountName);
    let currMonth = monthlyData.get(month);
    stats.totalBalance -= entry.value;
    accounts.set(accountName, currAccount - entry.value);
    currMonth.totalBalance -= entry.value;
    monthlyData
      .get(month)
      .accounts.set(accountName, currMonth.accounts.get(accountName) - entry.value);
    dailyData.set(day, dailyData.get(day) - entry.value);
    if (dailyData.get(day) == 0) dailyData.delete(day);
    stats.save();

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

    year = dayjs(updatedEntry.date).year();
    month = dayjs(updatedEntry.date).format("MMMM");
    day = dayjs(updatedEntry.date).format("DD/MM/YYYY");
    stats = await OverallStats.findOne({ userId, year });

    if (!stats) {
      await OverallStats.create({
        userId,
        year,
        totalBalance: updatedEntry.value,
        accounts: { [accountName]: updatedEntry.value },
        monthlyData: {
          [month]: {
            totalBalance: updatedEntry.value,
            accounts: { [accountName]: updatedEntry.value },
          },
        },
        dailyData: {
          [day]: updatedEntry.value,
        },
      });
    } else {
      accounts = stats.accounts;
      monthlyData = stats.monthlyData;
      dailyData = stats.dailyData;
      const currAccount = accounts.get(accountName);
      const currMonth = monthlyData.get(month);
      stats.totalBalance += updatedEntry.value;
      if (currAccount) accounts.set(accountName, currAccount + updatedEntry.value);
      else accounts.set(accountName, updatedEntry.value);
      if (currMonth) {
        currMonth.totalBalance += updatedEntry.value;
        if (currMonth.accounts.get(accountName)) {
          monthlyData
            .get(month)
            .accounts.set(
              accountName,
              currMonth.accounts.get(accountName) + updatedEntry.value
            );
        } else currMonth.accounts.set(accountName, updatedEntry.value);
      } else {
        monthlyData.set(month, {
          totalBalance: updatedEntry.value,
          accounts: { [accountName]: updatedEntry.value },
        });
      }
      if (dailyData.get(day)) dailyData.set(day, dailyData.get(day) + updatedEntry.value);
      else dailyData.set(day, updatedEntry.value);
      stats.save();
    }

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
  const userId = req.user._id;

  const entry = await Entry.findById(req.params.id);
  const { date, value } = entry;

  if (entry) {
    const account = await Account.findOne({ _id: entry.accountId });
    const { accountName } = account;
    account.balance -= value;
    account.save();

    const year = dayjs(date).year();
    const month = dayjs(date).format("MMMM");
    const day = dayjs(date).format("DD/MM/YYYY");
    const stats = await OverallStats.findOne({ userId, year });

    let { accounts, monthlyData, dailyData } = stats;
    const currAccount = accounts.get(accountName);
    const currMonth = monthlyData.get(month);
    stats.totalBalance -= value;
    accounts.set(accountName, currAccount - value);
    currMonth.totalBalance -= value;
    monthlyData
      .get(month)
      .accounts.set(accountName, currMonth.accounts.get(accountName) - value);
    dailyData.set(day, dailyData.get(day) - value);
    if (dailyData.get(day) == 0) dailyData.delete(day);
    stats.save();

    await Entry.deleteOne({ _id: entry._id });
    res.status(200).json({ message: "Entry deleted" });
  } else {
    res.status(400).json({ message: "Can't delete entry" });
  }
});
