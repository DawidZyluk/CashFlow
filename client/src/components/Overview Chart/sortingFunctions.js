export function groupByDate(entries) {
  console.log(entries.length);
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
        x: slice[slice.length-1].x,
        y: slice[slice.length-1].y
      });
    }
  }
  //console.log(res)
  return [
    {
      id: "Overall",
      color: "hsl(23, 70%, 50%)",
      data: res,
    },
  ];
}
