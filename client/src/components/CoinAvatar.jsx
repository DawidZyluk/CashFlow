import { useTheme } from "@emotion/react";
import { Avatar } from "@mui/material";
import React from "react";

const CoinAvatar = ({children}) => {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        border: 3,
        borderColor: theme.palette.gold[400],
        bgcolor: theme.palette.gold[500],
        color: theme.palette.gold[800],
        boxShadow: "0 1px 2px rgba(0,0,0,0.4), inset 0 0 2px rgba(0,0,0,0.3)" ,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-60px",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.3)",
          transform: "skewX(-30deg)",
          transition: ".6s",
        },
        "&:hover:before": {
          left: "60px",
          background: "rgba(255, 255, 255, 0.2)",
        },
      }}
      children={children}
    />
  );
};

export default CoinAvatar;
