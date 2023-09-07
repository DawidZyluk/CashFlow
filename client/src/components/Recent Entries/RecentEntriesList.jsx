import { Box, Card, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddEntry from "./AddEntry";
import { useGetEntriesQuery } from "../../store/entriesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEntries } from "../../store/authSlice";
import dayjs from "dayjs";

// import 'dayjs/locale/pl'
// dayjs.locale("pl")

const RecentEntriesList = () => {
  const { data, refetch } = useGetEntriesQuery();
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.auth.entries);

  useEffect(() => {
    refetch();
    let sortedEntries;
    let groupedEntries = [];
    if (data) {
      sortedEntries = [...data.entries];
      sortedEntries.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
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

      groupedEntries = Object.keys(groupedEntries).map((date) => {
        return {
          date,
          data: groupedEntries[date],
        };
      });
    }
    if (groupedEntries) dispatch(setEntries({ entries: groupedEntries }));
  }, [data]);

  return (
    <Card sx={{ p: 2, my: 1 }}>
      <Typography sx={{ my: 0 }} variant="h5">
        Recent Entries
      </Typography>
      
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
      <AddEntry />
        {entries.map((entryGroup) => (
          <Card
            variant="outlined"
            key={entryGroup.date}
            sx={{
              mb: 2,
              width: "50%",
            }}
          >
            <Box
              sx={{ display: "flex", p: 1, bgcolor: "rgba(120,120,120,.2)" }}
            >
              <Typography
                sx={{
                  fontSize: 32,
                  mr: 2,
                }}
              >
                {dayjs(entryGroup.date).format("DD")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography fontWeight="light" fontSize={14}>
                  {dayjs(entryGroup.date).format("dddd")}
                </Typography>
                <Typography fontWeight="bold" fontSize={14}>
                  {dayjs(entryGroup.date).format("MMMM, YYYY")}
                </Typography>
              </Box>
              <Typography sx={{ ml: "auto", alignSelf: "center" }}>
                ${entryGroup.data.total.toFixed(2)}
              </Typography>
            </Box>
            <Divider />
            {entryGroup.data.entries.map((entry) => (
              <Box
                key={entry._id}
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{entry.category}</Typography>
                <Typography>${entry.value.toFixed(2)}</Typography>
              </Box>
            ))}
            {/* <Box sx={{ mr: 2 }}>
              <Typography fontWeight="bold">
                {dayjs(entry.date).format("D MMMM, YYYY")}
              </Typography>
              <Typography fontWeight="light">
                {dayjs(entry.date).format("dddd, HH:mm")}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography fontWeight="light">{entry.category}</Typography>
              <Typography>${entry.value.toFixed(2)}</Typography>
            </Box> */}
            {/* <Typography>{entry.note && entry.note}</Typography> */}
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default RecentEntriesList;
