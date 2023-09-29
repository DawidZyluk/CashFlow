import React from "react";
import { useSelector } from "react-redux";
import Verification from "../components/Verification";
import { Container, Typography } from "@mui/material";
import AccountsList from "../components/Accounts/AccountsList";
import RecentEntriesList from "../components/Recent Entries/RecentEntriesList";
import AddEntry from "../components/Recent Entries/AddEntry";
import { LineChart } from "../components/Overview Chart/LineChart";

const Dashboard = () => {
  const { verified } = useSelector((state) => state.auth.userInfo);
  
  return (
    <Container>
      <Typography sx={{my: 2}} variant="h4">Dashboard</Typography>
      {!verified && <Verification />}
      <AccountsList />
      <LineChart />
      <RecentEntriesList />
    </Container>
  );
};

export default Dashboard;
