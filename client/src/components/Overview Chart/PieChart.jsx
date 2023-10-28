2; // install (please try to align the version of installed @nivo packages)
import { Box, Card, CircularProgress, Typography } from "@mui/material";
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { useGetStatsQuery } from "../../store/statsApiSlice";
import { sortStats } from "./sortingFunctions";
import { useState } from "react";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";
import { useTheme } from "@emotion/react";

export const PieChart = () => {
  const { data: stats, refetch, isFetching } = useGetAccountsQuery();
  const theme = useTheme();

  let totalBalance = 0;
  let formatedData = [];

  if (stats) {
    totalBalance = stats.accounts.reduce((acc, curr) => acc + curr.balance, 0);

    formatedData = stats.accounts.reduce((filtered, account) => {
      if (account.balance > 0)
        filtered.push({
          id: `${account.accountName}${Math.random()}`,
          label: account.accountName,
          value: account.balance.toFixed(2),
          color: account.color,
        });
      return filtered;
    }, []);
  }

  const tooltip = ({ datum }) => {
    return (
      <Card variant="outlined" sx={{ bgcolor: "white", px: 1.2, py: 0.7 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.7 }}>
          <Box
            sx={{
              height: 15,
              width: 15,
              bgcolor: datum.color,
              mr: 1,
              borderRadius: "2px",
            }}
          ></Box>
          <Typography>{datum.label}</Typography>
        </Box>
        <Typography>${datum.value}</Typography>
        <Typography>
          {((datum.value / totalBalance) * 100).toFixed(2)}%
        </Typography>
      </Card>
    );
  };

  return (
    <Card
      sx={{
        gridColumn: "span 2",
        gridRow: "span 4",
        p: 2,
      }}
    >
      <Typography sx={{ my: 0 }} variant="h5">
        Balance Structure
      </Typography>
      <Typography>Total balance: $1,234,567.89</Typography>

      {!isFetching ? (
        <ResponsivePie
          data={formatedData || []}
          margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
          sortByValue={true}
          innerRadius={0.55}
          padAngle={2}
          tooltip={tooltip}
          cornerRadius={6}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={15}
          arcLinkLabelsStraightLength={7}
          arcLinkLabelsDiagonalLength={15}
          arcLinkLabelsTextOffset={4}
          arcLabelsTextColor="#fafafa"
          arcLinkLabel={(e) => e.label}
          arcLabel={(e) => `${((e.value / totalBalance) * 100).toFixed(2)}%`}
          colors={({ data }) => data.color}
          enableArcLabels={false}
          enableArcLinkLabels={false}
        />
      ) : (
        <CircularProgress />
      )}
    </Card>
  );
};
