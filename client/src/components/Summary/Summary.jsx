import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Widget from "./Widget";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";
import { currencyFormat } from "../../utils/numbers";
import { sortStats } from "../Overview Chart/sortingFunctions";
import { useGetEntriesQuery } from "../../store/entriesApiSlice";

const Summary = () => {
  const isNonLaptopL = useMediaQuery("(min-width:1640px)");
  const isNonSmallMobile = useMediaQuery("(min-width:910px)");
  const { data, refetch, isFetching } = useGetEntriesQuery();
  const {
    data: stats,
    refetch: accRefetch,
    isFetching: accIsFetching,
  } = useGetAccountsQuery();
  const entries = useSelector((state) => state.auth.entries);

  let oldest = "No entries";
  let latest = "No entries";
  if (data?.entries.length) {
    const sortedDays = Object.entries(sortStats(data.entries));
    console.log(sortedDays)
    oldest = sortedDays[0][0];
    latest = sortedDays[sortedDays.length - 1][0];
  }

  let totalBalance = 0;
  if (stats) {
    totalBalance = stats.accounts.reduce((acc, curr) => acc + curr.balance, 0);
  }

  return (
    <Box
      sx={{
        gridColumn: isNonSmallMobile
          ? isNonLaptopL
            ? "span 2"
            : "1 / 4"
          : "span 6",
        gridRow: "3 / 5",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          height: "100%",
          gridTemplateColumns: isNonSmallMobile ? "repeat(2, 1fr)" : undefined,
          gridTemplateRows: isNonSmallMobile ? "1fr 1fr" : undefined,
          // gridTemplateColumns: "repeat(2, 1fr)",
          // gridTemplateRows: "1fr 1fr",
        }}
      >
        <Widget label="Total Balance:" value={currencyFormat(totalBalance)} />
        <Widget label="Entries:" value={entries?.length} />
        <Widget label="Oldest Entry:" value={oldest} />
        <Widget label="Latest Entry:" value={latest} />
      </Box>
    </Box>
  );
};

export default Summary;
