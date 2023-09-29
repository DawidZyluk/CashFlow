import fs from "fs";
import crypto from "crypto";
import * as url from "url";
import { LoremIpsum } from "lorem-ipsum";

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
  start = new Date(2020, 0, 1),
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

const accountType = [
  "main",
  "cash",
  "credit card",
  "debit card",
  "savings",
  "investment",
];

const entries = {
  userId: "6512c2cbd9fa5c0d9b1c3016",
  accountId: {
    $oid: "64f9b3cc3102cb74934e6401",
  },
  date: "2023-09-01T13:53:12+02:00",
  value: 12,
  category: "Salary",
  note: "",
  createdAt: {
    $date: "2023-09-07T11:54:09.052Z",
  },
  updatedAt: {
    $date: "2023-09-07T11:54:09.052Z",
  },
  __v: 0,
};

const file = fs.createWriteStream(__dirname + "/data.js");
const accountIds = [];

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
  accountIds.push(currId);
  file.write(
    `{
      _id: "${currId}",
      userId: "6512c2cbd9fa5c0d9b1c3016",
      accountName: "${randomAccountName()}",
      accountNumber: "${Math.random() > 0.5 ? genId() : ""}",
      accountType: "${arrayRand(accountType)}",
      balance: ${Math.random() > 0.5 ? rand(100, 2000).toFixed(2) : 0},
      createdAt: "${randomDate()}",
      updatedAt: "${randomDate()}",
      color: "${arrayRand(colors)}",
    },`
  );
}
file.write("];");

file.write("export const entries = [");
for (let i = 1; i <= 3000; i++) {
  const currId = arrayRand(accountIds);
  file.write(
    `{
      _id: "${genId()}",
      userId: "6512c2cbd9fa5c0d9b1c3016",
      accountId: "${currId}",
      date: "${randomDate()}",
      value: ${rand(-50, 500).toFixed(2)},
      category: "${arrayRand(categories)}",
      note: "${Math.random() > 0.5 ? lorem.generateSentences(1) : ""}",
      createdAt: "${randomDate()}",
      updatedAt: "${randomDate()}",
    },`
  );
}
file.write("];");

file.close();
