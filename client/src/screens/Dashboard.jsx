import React from "react";
import { useSelector } from "react-redux";
import Verification from "../components/Verification";
import { Container } from "@mui/material";

const Dashboard = () => {
  const { verified } = useSelector((state) => state.auth.userInfo);
  
  return (
    <Container>
      <h1>Dashboard</h1>
      {!verified && <Verification />}
    </Container>
  );
};

export default Dashboard;
