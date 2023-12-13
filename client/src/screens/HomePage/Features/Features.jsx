import React from "react";
import { Box, Card, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FaRegChartBar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import { useTheme } from "@emotion/react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 5,
        px: 15,
        height: "50rem",
      }}
    >
      <Typography variant="h2">Key Features</Typography>
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: "light",
          color: theme.palette.grey[800],
          mt: 2,
        }}
      >
        Unlock the full potential of CashFlow with these essential features:
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "85%",
          justifyContent: "space-around",
          mt: 10,
        }}
      >
        <FeatureCard
          icon={<FaRegChartBar />}
          title="Streamlined Expense Tracking"
          description="Effortlessly track your cash flow with our streamlined and intuitive
            interfaces."
        />
        <FeatureCard
          icon={<PiHandCoins />}
          title="Intelligent Budgeting"
          description="Plan and manage your budget effectively, guiding you towards
            financial milestones."
        />
        <FeatureCard
          icon={<IoTimeOutline />}
          title="Real-time Analytics"
          description="Gain valuable insights into your spending patterns, investment
            performance, and overall financial health through real-time
            analytics."
        />
        <FeatureCard
          icon={<FaRegUser />}
          title="User-Centric Design"
          description="Enjoy a seamless user experience with our responsive design tailored
            to adapt to your preferred devices."
        />
      </Box>
    </Box>
  );
};

export default Features;
