2; // install (please try to align the version of installed @nivo packages)
import { Box, Card, Typography } from "@mui/material";
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { useGetStatsQuery } from "../../store/statsApiSlice";
import { sortStats } from "./sortingFunctions";
import { useState } from "react";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";

const tooltip = ({ datum }) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: "white", px: 1.2, py: 0.7 }}>
      <Box sx={{display: 'flex', alignItems: 'center', mb: .7}}>
        <Box sx={{ height: 15, width: 15, bgcolor: datum.color, mr: 1, borderRadius: '2px' }}></Box>
        <Typography>{datum.label}</Typography>
      </Box>
      <Typography>${datum.value}</Typography>
    </Card>
  );
};

export const PieChart = () => {
  const { data: stats, refetch, isFetching } = useGetAccountsQuery();

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

  return (
    <Card
      sx={{
        gridColumn: "span 2",
        gridRow: "span 4",
        p: 2,
        position: "relative",
      }}
    >
      <Typography sx={{ my: 0 }} variant="h5">
        Overview Chart
      </Typography>
      <ResponsivePie
        data={formatedData || []}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
        arcLabelsTextColor="#fafafa"
        arcLinkLabel={(e) => e.label}
        colors={({ id, data }) => data.color}
        enableArcLabels={false}
      />
      {/* <Box sx={{bgcolor: 'red', position: 'absolute', top: 0}}>
        <Typography >{totalBalance}</Typography>
      </Box> */}
    </Card>
  );
};
