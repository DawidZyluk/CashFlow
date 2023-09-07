import { useTheme } from "@emotion/react";
import { Avatar } from "@mui/material";
import React from "react";

const CoinAvatar = ({
  initials,
  sx = {
    diameter: "40px",
  },
}) => {
  const theme = useTheme();
  const borderWidth = (sx.diameter.split('p')[0] / 10) - 1;
  const shade = (sx.diameter.split('p')[0] / 20)
  return (
    <Avatar
      sx={{
        border: borderWidth,
        borderColor: theme.palette.gold[400],
        bgcolor: theme.palette.gold[500],
        color: theme.palette.gold[800],
        height: sx.diameter,
        width: sx.diameter,
        fontSize: `calc(${sx.diameter} / 2)`,
        boxShadow: `0 ${shade/2}px ${shade}px rgba(0,0,0,0.4), inset 0 0 ${shade}px rgba(0,0,0,0.3)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: `calc(-${sx.diameter} - 20px)`,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.3)",
          transform: "skewX(-30deg)",
          transition: ".6s",
        },
        "&:hover:before": {
          left: `calc(${sx.diameter} + 20px)`,
          background: "rgba(255, 255, 255, 0.2)",
        },
      }}
      children={initials}
    />
  );
};

export default CoinAvatar;
