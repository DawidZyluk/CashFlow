import dayjs from "dayjs";

export function groupByDate(entries) {
  let sortedEntries;
  let groupedEntries = [];

  sortedEntries = [...entries];
  sortedEntries.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  for (let entry of sortedEntries) {
    const key = entry.date.split("T")[0];
    if (!groupedEntries[key]) {
      groupedEntries[key] = {
        total: entry.value,
        entries: [entry],
      };
    } else {
      groupedEntries[key].total += entry.value;
      groupedEntries[key].entries.push(entry);
    }
  }
  let sum = 0;
  groupedEntries = Object.keys(groupedEntries).map((date) => {
    return {
      x: date,
      y: (sum += groupedEntries[date].total),
    };
  });

  let bundleSize = 40;
  let res = [];
  if (groupedEntries.length > 1200) {
    for (let i = 0; i < groupedEntries.length; i += bundleSize) {
      const slice = groupedEntries.slice(i, i + bundleSize);
      res.push({
        x: slice[slice.length - 1].x,
        y: slice[slice.length - 1].y,
      });
    }
  }
  //console.log(res)
  return [
    {
      id: "Overall",
      color: "hsl(23, 70%, 50%)",
      data: groupedEntries,
    },
  ];
}

export function sortStats(stats) {
  const sortedStats = [];
  const mergedDays = {};

  stats.forEach((stat) => {
    Object.assign(mergedDays, stat.dailyData);
    const sortedDailyData = Object.fromEntries(
      Object.entries(stat.dailyData).sort(function (a, b) {
        return (
          new Date(dayjs(a[0], "DD/MM/YYYY")) -
          new Date(dayjs(b[0], "DD/MM/YYYY"))
        );
      })
    );
    const sortedMonthlyData = Object.fromEntries(
      Object.entries(stat.monthlyData).sort(function (a, b) {
        return (
          new Date(dayjs(`${a[0]}/${stat.year}`, "MMMM/YYYY")) -
          new Date(dayjs(`${b[0]}/${stat.year}`, "MMMM/YYYY"))
        );
      })
    );
    sortedStats.push({
      year: stat.year,
      totalBalance: stat.totalBalance,
      accounts: stat.accounts,
      monthlyData: sortedMonthlyData,
      dailyData: sortedDailyData,
    });
  });
  sortedStats.sort(function (a, b) {
    return new Date(b.year) - new Date(a.year);
  });

  const sortedMergedDays = Object.fromEntries(
    Object.entries(mergedDays).sort(function (a, b) {
      return (
        new Date(dayjs(a[0], "DD/MM/YYYY")) -
        new Date(dayjs(b[0], "DD/MM/YYYY"))
      );
    })
  );

  return [sortedMergedDays, sortedStats];
}

export function calculateBalance(sortedStats, year, month) {
  const chosenYear = sortedStats.filter((stats) => stats.year == year)[0];
  const yearsBefore = sortedStats.filter((stats) => stats.year < year);
  const previousBalance = yearsBefore.reduce(
    (acc, curr) => acc + curr.totalBalance,
    0
  );
  let sum = previousBalance;
  if (month !== "All") {
    const goalMonth = dayjs(`${month}, ${chosenYear.year}`).format(
      "DD/MM/YYYY"
    );

    const monthsBefore = Object.entries(chosenYear.monthlyData).filter(
      ([curr]) => {
        const currMonth = dayjs(`${curr}, ${chosenYear.year}`).format(
          "DD/MM/YYYY"
        );

        return currMonth < goalMonth;
      }
    );
    const previousMonthsBalance = monthsBefore.reduce(
      (acc, curr) => acc + curr[1].totalBalance,
      0
    );

    sum = previousBalance + previousMonthsBalance;
  }

  return sum;
}

export function getData(sortedStats, year, month) {
  const chosenYear = sortedStats.filter((stats) => stats.year == year)[0];
  let res = Object.entries(chosenYear.dailyData);

  if (month !== "All") {
    const goalMonth = dayjs(`${month}, ${chosenYear.year}`).format(
      "DD/MM/YYYY"
    );

    res = Object.entries(chosenYear.dailyData).filter(([date]) => {
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
    for (let i = 0; i < formatedData.length; i++) {
      if (i % step == 0) {
        withStep.push({ x: formatedData[i].x, y: formatedData[i].y });
      }
    }
    formatedData = withStep;
  }

  return formatedData;
}

export function pieFormat(data) {
  

  return formatedData;
}
