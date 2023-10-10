export const User = {
  _id: "6512c2cbd9fa5c0d9b1c3016",
  verified: true,
  name: "John Doe",
  email: "user@email.com",
  password: "password",
};
export const accounts = [
  {
    _id: "89c412695922ce100125a714",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountName: "Sincere Happiness",
    accountNumber: "",
    accountType: "main",
    balance: 0,
    createdAt: "2023-08-06T15:08:42.388Z",
    updatedAt: "2023-02-23T02:56:33.940Z",
    color: "#f6bf26",
  },
  {
    _id: "16d216812d7697942bc2a3d7",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountName: "Mysterious Adventure",
    accountNumber: "bd0dbb40036ccb2bcd3b7499",
    accountType: "debit card",
    balance: 0,
    createdAt: "2023-06-15T09:25:19.279Z",
    updatedAt: "2023-05-26T16:21:44.019Z",
    color: "#8e24aa",
  },
  {
    _id: "e20670f80d3df0ae04f49cb0",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountName: "Wise Prosperity",
    accountNumber: "",
    accountType: "debit card",
    balance: 0,
    createdAt: "2023-07-06T06:13:23.372Z",
    updatedAt: "2023-08-18T13:02:41.194Z",
    color: "#0b8043",
  },
  {
    _id: "7eb8059b310d79b29bcf64f5",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountName: "Grateful Serenity",
    accountNumber: "",
    accountType: "main",
    balance: 0,
    createdAt: "2023-08-24T21:08:45.962Z",
    updatedAt: "2023-09-08T15:26:36.950Z",
    color: "#f6bf26",
  },
];
export const entries = [
  {
    _id: "cce3dc3093875b33479c8991",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "7eb8059b310d79b29bcf64f5",
    date: "2023-06-03T08:55:16.755Z",
    value: 212.13,
    category: "Groceries",
    note: "",
    createdAt: "2023-06-03T16:02:47.363Z",
    updatedAt: "2023-08-11T15:38:05.298Z",
  },
  {
    _id: "c1e2546150b1c32685214244",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "16d216812d7697942bc2a3d7",
    date: "2023-04-11T09:54:16.277Z",
    value: 230.33,
    category: "Dining Out",
    note: "Non qui proident anim quis aliqua ut irure tempor ad.",
    createdAt: "2023-02-16T04:04:40.151Z",
    updatedAt: "2023-03-18T08:25:05.512Z",
  },
  {
    _id: "3fca0ff394aa0e02e1dee63e",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "16d216812d7697942bc2a3d7",
    date: "2023-08-07T14:33:38.984Z",
    value: 309.88,
    category: "Investment Dividends",
    note: "",
    createdAt: "2023-04-09T19:17:01.142Z",
    updatedAt: "2023-06-12T17:48:53.382Z",
  },
  {
    _id: "6cd26730f5cdeafaf802b9d5",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "89c412695922ce100125a714",
    date: "2023-08-31T05:37:06.324Z",
    value: 329.42,
    category: "Rent",
    note: "",
    createdAt: "2023-08-14T03:19:07.617Z",
    updatedAt: "2023-03-08T18:50:43.414Z",
  },
  {
    _id: "8d217acd309587f9ed40f60c",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "7eb8059b310d79b29bcf64f5",
    date: "2023-02-01T16:42:29.456Z",
    value: 59.33,
    category: "Dining Out",
    note: "",
    createdAt: "2023-05-23T07:30:04.707Z",
    updatedAt: "2023-05-01T04:39:47.673Z",
  },
  {
    _id: "6698891b21d10a22554ea780",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "e20670f80d3df0ae04f49cb0",
    date: "2023-08-11T04:40:21.455Z",
    value: 87.05,
    category: "Dining Out",
    note: "Est ex nulla ex enim consectetur anim aliquip reprehenderit incididunt nulla eu.",
    createdAt: "2023-03-01T02:28:44.461Z",
    updatedAt: "2023-06-10T13:28:31.381Z",
  },
  {
    _id: "ee42dc5cde06f3624ea79552",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "7eb8059b310d79b29bcf64f5",
    date: "2023-05-26T21:39:10.712Z",
    value: 103.52,
    category: "Transportation",
    note: "",
    createdAt: "2023-09-18T11:08:36.145Z",
    updatedAt: "2023-05-29T22:01:17.949Z",
  },
  {
    _id: "c67dfa35f1750b11e06ce3c3",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "16d216812d7697942bc2a3d7",
    date: "2023-02-20T09:33:59.861Z",
    value: 236.93,
    category: "Salary",
    note: "",
    createdAt: "2023-03-05T00:12:55.561Z",
    updatedAt: "2023-02-20T15:58:27.894Z",
  },
  {
    _id: "98326a69f510d8468e1ef918",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "89c412695922ce100125a714",
    date: "2023-04-22T01:37:11.967Z",
    value: 94.97,
    category: "Salary",
    note: "Et quis dolor ut do ea eu ut.",
    createdAt: "2023-05-02T23:07:25.006Z",
    updatedAt: "2023-06-26T13:33:43.383Z",
  },
  {
    _id: "4d0423ea0d6fc2cab997a6ae",
    userId: "6512c2cbd9fa5c0d9b1c3016",
    accountId: "16d216812d7697942bc2a3d7",
    date: "2023-04-06T11:42:29.494Z",
    value: 440.91,
    category: "Rent",
    note: "",
    createdAt: "2023-02-10T18:24:05.850Z",
    updatedAt: "2023-04-03T18:37:21.718Z",
  },
];
export const overallStats = [
  {
    userId: "6512c2cbd9fa5c0d9b1c3016",
    year: 2023,
    totalBalance: 2104.47,
    accounts: {
      "Sincere Happiness": 424.39,
      "Mysterious Adventure": 1218.0500000000002,
      "Wise Prosperity": 87.05,
      "Grateful Serenity": 374.97999999999996,
    },
    monthlyData: {
      August: {
        totalBalance: 726.3499999999999,
        accounts: {
          "Sincere Happiness": 329.42,
          "Grateful Serenity": 0,
          "Mysterious Adventure": 309.88,
          "Wise Prosperity": 87.05,
        },
      },
      June: {
        totalBalance: 212.13,
        accounts: { "Mysterious Adventure": 0, "Grateful Serenity": 212.13 },
      },
      July: { totalBalance: 0, accounts: { "Wise Prosperity": 0 } },
      April: {
        totalBalance: 766.21,
        accounts: {
          "Mysterious Adventure": 671.24,
          "Sincere Happiness": 94.97,
        },
      },
      February: {
        totalBalance: 296.26,
        accounts: {
          "Grateful Serenity": 59.33,
          "Mysterious Adventure": 236.93,
        },
      },
      May: { totalBalance: 103.52, accounts: { "Grateful Serenity": 103.52 } },
    },
    dailyData: {
      "03/06/2023": 212.13,
      "11/04/2023": 230.33,
      "07/08/2023": 309.88,
      "31/08/2023": 329.42,
      "01/02/2023": 59.33,
      "11/08/2023": 87.05,
      "26/05/2023": 103.52,
      "20/02/2023": 236.93,
      "22/04/2023": 94.97,
      "06/04/2023": 440.91,
    },
  },
];
