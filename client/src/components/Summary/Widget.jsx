import { useTheme } from "@emotion/react";
import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Widget = ({ label, value }) => {
  const theme = useTheme();
  const isNonSmallMobile = useMediaQuery("(min-width:910px)");

  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        flexDirection: isNonSmallMobile ? "column" : "row",
        // flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      <Typography
        sx={{
          alignSelf: isNonSmallMobile ? "flex-start" : undefined,
          color: theme.palette.grey[800],
          mr: isNonSmallMobile ? 0 : 2
        }}
      >
        {label}
      </Typography>
      <Box sx={{ my: "auto" }}>
        <Typography
          variant={isNonSmallMobile ? "h4" : "h6"}
          sx={{ color: theme.palette.grey[800] }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export default Widget;
