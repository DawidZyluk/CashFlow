import dayjs from "dayjs";

export function sortStats(entries) {
  const mergedDays = {};

  entries.forEach((entry) => {
    const date = dayjs(entry.date).format("DD/MM/YYYY");
    if (!mergedDays[date]) mergedDays[date] = 0;
    mergedDays[date] += entry.value;
  });

  const sortedMergedDays = Object.fromEntries(
    Object.entries(mergedDays).sort(function (a, b) {
      return (
        new Date(dayjs(a[0], "DD/MM/YYYY")) -
        new Date(dayjs(b[0], "DD/MM/YYYY"))
      );
    })
  );

  return sortedMergedDays;
}

export function createStats(days) {
  const stats = {};
  days = Object.entries(days);
  for (let [date, value] of days) {
    const year = dayjs(date, "DD/MM/YYYY").format("YYYY");
    const month = dayjs(date, "DD/MM/YYYY").format("MMMM");
    if (!stats[year])
      stats[year] = {
        totalBalance: 0,
        monthlyData: {},
        dailyData: {},
      };
    stats[year].totalBalance += value;
    stats[year].monthlyData[month]
      ? (stats[year].monthlyData[month] += value)
      : (stats[year].monthlyData[month] = value);
    stats[year].dailyData[date] = value;
  }

  return stats;
}

export function calculateBalance(sortedStats, year, month) {
  sortedStats = Object.entries(sortedStats);
  const chosenYear = sortedStats.filter(([sYear]) => sYear == year)[0];
  const yearsBefore = sortedStats.filter(([sYear]) => sYear < year);
  const previousBalance = yearsBefore.reduce(
    (acc, [_, data]) => acc + data.totalBalance,
    0
  );
  const [_, data] = chosenYear;
  let sum = previousBalance;

  if (month !== "All") {
    const goalMonth = dayjs(`${month}, ${year}`).format("DD/MM/YYYY");
    const monthsBefore = Object.entries(data.monthlyData).filter(([curr]) => {
      const currMonth = dayjs(`${curr}, ${year}`).format("DD/MM/YYYY");

      return currMonth < goalMonth;
    });
    const previousMonthsBalance = monthsBefore.reduce(
      (acc, curr) => acc + curr[1],
      0
    );

    sum = previousBalance + previousMonthsBalance;
  }

  return sum;
}

export function getData(sortedStats, year, month) {
  sortedStats = Object.entries(sortedStats);
  const chosenYear = sortedStats.filter(([sYear]) => sYear == year)[0];
  const [_, data] = chosenYear;
  let res = Object.entries(data.dailyData);

  if (month !== "All") {
    const goalMonth = dayjs(`${month}, ${year}`).format("DD/MM/YYYY");

    res = Object.entries(data.dailyData).filter(([date]) => {
      const formatedMonth = dayjs(goalMonth, "DD/MM/YYYY").format();
      const formatedDay = dayjs(date, "DD/MM/YYYY").format();

      return dayjs(formatedDay).isSame(formatedMonth, "month");
    });
  }

  return res;
}

export function formatData(data, sum, step = 1) {
  let formatedData = data.map(([date, value], i) => {
    return {
      x: date,
      y: (sum += value),
    };
  });

  if (step !== 1) {
    let withStep = [];
    for (let i = 0; i < formatedData.length; i += step) {
      const slice = formatedData.slice(i, i + step);
      const sum = slice.reduce((acc, curr) => acc + curr.y, 0);
      withStep.push({ x: formatedData[i].x, y: sum / slice.length });
    }
    formatedData = withStep;
  }

  return formatedData;
}
