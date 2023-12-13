import { useTheme } from "@emotion/react";
import { Card, Typography } from "@mui/material";
import React from "react";

const FeatureCard = ({icon, title, description}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        textAlign: "center",
        width: "20%",
        p: 4,
        boxShadow: 2,
        transition: "all .4s",
        "&:hover": {
          transform: "translateY(-0.7rem) scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 110,
          color: theme.palette.primary[600],
        }}
      >
        {icon}
      </Typography>
      <Typography sx={{ fontWeight: "bold", my: 2 }}>
        {title}
      </Typography>
      <Typography sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Card>
  );
};

export default FeatureCard;
