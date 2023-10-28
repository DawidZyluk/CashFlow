import React from "react";
import { useSelector } from "react-redux";
import Verification from "../components/Verification";
import { Box, Container, Typography } from "@mui/material";
import AccountsList from "../components/Accounts/AccountsList";
import RecentEntriesList from "../components/Recent Entries/RecentEntriesList";
import AddEntry from "../components/Recent Entries/AddEntry";
import { LineChart } from "../components/Overview Chart/LineChart";
import { PieChart } from "../components/Overview Chart/PieChart";

const Dashboard = () => {
  const { verified } = useSelector((state) => state.auth.userInfo);

  return (
    <Box sx={{mx: 17, my: 5, mb: 10}}>
      <Typography sx={{ my: 2, }} variant="h4">
        Dashboard
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridGap: '20px',
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(8,120px)",
        }}
      >
        {!verified && <Verification />}
        <AccountsList />
        <LineChart allowControls={false}/>
        <RecentEntriesList />
        <PieChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
