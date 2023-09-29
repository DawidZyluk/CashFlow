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
  let sum = 0
  groupedEntries = Object.keys(groupedEntries).map((date) => {
    return {
      x: date,
      y: sum += groupedEntries[date].total,
    };
  });

  return [
    {
      id: "Overall",
      color: "hsl(23, 70%, 50%)",
      data: groupedEntries,
    },
  ];
}
