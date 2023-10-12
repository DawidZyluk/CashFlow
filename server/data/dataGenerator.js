import fs from "fs";
import crypto from "crypto";
import * as url from "url";
import { LoremIpsum } from "lorem-ipsum";
import dayjs from "dayjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 12,
    min: 4,
  },
});

const adjectives = [
  "Adventurous",
  "Ambitious",
  "Brilliant",
  "Cautious",
  "Charming",
  "Creative",
  "Daring",
  "Elegant",
  "Enthusiastic",
  "Fierce",
  "Generous",
  "Gentle",
  "Grateful",
  "Honest",
  "Inventive",
  "Joyful",
  "Kind",
  "Lively",
  "Magical",
  "Mysterious",
  "Optimistic",
  "Passionate",
  "Patient",
  "Peaceful",
  "Powerful",
  "Radiant",
  "Resourceful",
  "Sincere",
  "Spirited",
  "Thoughtful",
  "Tranquil",
  "Unique",
  "Vibrant",
  "Wise",
  "Wonderful",
  "Zealous",
  "Adorable",
  "Benevolent",
  "Charismatic",
  "Courageous",
];

const nouns = [
  "Adventure",
  "Achievement",
  "Beauty",
  "Dream",
  "Freedom",
  "Harmony",
  "Inspiration",
  "Journey",
  "Laughter",
  "Miracle",
  "Passion",
  "Prosperity",
  "Purpose",
  "Serenity",
  "Success",
  "Triumph",
  "Unity",
  "Victory",
  "Wisdom",
  "Abundance",
  "Bliss",
  "Destiny",
  "Elegance",
  "Friendship",
  "Happiness",
  "Imagination",
  "Justice",
  "Love",
  "Nature",
  "Peace",
  "Radiance",
  "Simplicity",
  "Transformation",
  "Vitality",
  "Wonder",
  "Zeal",
  "Blessing",
  "Creativity",
  "Growth",
  "Honor",
];

function rand(from, to) {
  return Math.random() * (to - from) + from;
}

function randBool() {
  return Math.random() > 0.5 ? true : false;
}

function genId() {
  return crypto.randomBytes(12).toString("hex");
}

function arrayRand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(
  start = new Date(2020, 1, 1),
  end = new Date(),
  startHour = 0,
  endHour = 24
) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date.toISOString();
}

function randomAccountName() {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

const categories = [
  "Salary",
  "Freelance Income",
  "Investment Dividends",
  "Rent",
  "Utilities",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Entertainment",
  "Healthcare",
];

const colors = [
  "#d50000",
  "#e67c73",
  "#f4511e",
  "#f6bf26",
  "#33b679",
  "#0b8043",
  "#039be5",
  "#3f51b5",
  "#7986cb",
  "#8e24aa",
  "#616161",
];

const accountTypes = [
  "main",
  "cash",
  "credit card",
  "debit card",
  "savings",
  "investment",
];

const file = fs.createWriteStream(__dirname + "/data.js");
const accounts = [];
const entries = [];
const overallStats = [];

file.write(
  `export const User = {
    _id: "6512c2cbd9fa5c0d9b1c3016",
    verified: true,
    name: "John Doe",
    email: "user@email.com",
    password: "password",
  };`
);

file.write("export const accounts = [");
for (let i = 1; i <= 40; i++) {
  const currId = genId();
  const accountName = randomAccountName();
  accounts.push({ id: currId, name: accountName });
  const accountNumber = Math.random() > 0.5 ? genId() : "";
  const accountType = arrayRand(accountTypes);
  const balance =
    Math.random() > 0.5 ? parseFloat(rand(100, 2000).toFixed(2)) : 0;
  const createdAt = randomDate();
  const updatedAt = randomDate();
  const color = arrayRand(colors);

  file.write(
    `{
      _id: "${currId}",
      userId: "6512c2cbd9fa5c0d9b1c3016",
      accountName: "${accountName}",
      accountNumber: "${accountNumber}",
      accountType: "${accountType}",
      balance: ${balance},
      createdAt: "${createdAt}",
      updatedAt: "${updatedAt}",
      color: "${color}",
    },`
  );

  if (balance) {
    entries.push({
      _id: genId(),
      userId: "6512c2cbd9fa5c0d9b1c3016",
      accountId: currId,
      date: createdAt,
      value: balance,
      category: "Initial Balance",
      note: "Account Initialization",
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  }

  const year = dayjs(createdAt).year();
  const month = dayjs(createdAt).format("MMMM");
  let stats = overallStats.find((stat) => stat.year === year);
  if (!stats) {
    stats = {
      userId: "6512c2cbd9fa5c0d9b1c3016",
      year: year,
      totalBalance: 0,
      accounts: {},
      monthlyData: {},
      dailyData: {},
    };
    overallStats.push(stats);
  }

  stats.totalBalance += balance;
  stats.accounts[accountName] = (stats.accounts[accountName] || 0) + balance;

  if (!stats.monthlyData[month]) {
    stats.monthlyData[month] = {
      totalBalance: 0,
      accounts: {},
    };
  }

  stats.monthlyData[month].totalBalance += balance;
  stats.monthlyData[month].accounts[accountName] =
    (stats.monthlyData[month].accounts[accountName] || 0) + balance;
}
file.write("];");

for (let i = 1; i <= 500; i++) {
  const randAccount = arrayRand(accounts);
  const date = randomDate();
  const value = parseFloat(rand(-50, 500).toFixed(2));

  entries.push({
    _id: genId(),
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: randAccount.id,
    date: date,
    value: value,
    category: arrayRand(categories),
    note: Math.random() > 0.5 ? lorem.generateSentences(1) : "",
    createdAt: randomDate(),
    updatedAt: randomDate(),
  });

  const year = dayjs(date).year();
  const month = dayjs(date).format("MMMM");
  const day = dayjs(date).format("DD/MM/YYYY");
  let stats = overallStats.find((stat) => stat.year === year);
  if (!stats) {
    stats = {
      userId: "6512c2cbd9fa5c0d9b1c3016",
      year: year,
      totalBalance: 0,
      accounts: {},
      monthlyData: {},
      dailyData: {},
    };
    overallStats.push(stats);
  }

  stats.totalBalance += value;
  stats.accounts[randAccount.name] =
    (stats.accounts[randAccount.name] || 0) + value;

  if (!stats.monthlyData[month]) {
    stats.monthlyData[month] = {
      totalBalance: 0,
      accounts: {},
    };
  }

  stats.monthlyData[month].totalBalance += value;
  stats.monthlyData[month].accounts[randAccount.name] =
    (stats.monthlyData[month].accounts[randAccount.name] || 0) + value;

  stats.dailyData[day] = (stats.dailyData[day] || 0) + value;
}

file.write("export const entries = [");
for (let entry of entries) file.write(JSON.stringify(entry) + ",");
file.write("];");

file.write("export const overallStats = [");
for (let stat of overallStats) file.write(JSON.stringify(stat) + ",");
file.write("];");

file.close();
