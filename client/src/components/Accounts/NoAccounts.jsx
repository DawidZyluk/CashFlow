import { Box, Typography } from "@mui/material";
import React from "react";

const NoAccounts = () => {
  return (
    <Box
      sx={{
        height: 60,
        pt: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>No accounts </Typography>
    </Box>
  );
};

export default NoAccounts;
