import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import CoinAvatar from "./CoinAvatar";

const UserInfo = ({ userInfo }) => {
  const { name, email } = userInfo;
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // bgcolor: theme.palette.grey[100],
        width: "250px",
        textAlign: "center",
        py: 2,
      }}
      disableGutters
    >
      <Box sx={{ mb: 1.5 }}>
        <CoinAvatar initials={name[0]} sx={{ diameter: "80px" }} />
      </Box>
      <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
      <Typography sx={{ color: theme.palette.grey[700], fontSize: ".9rem" }}>
        {email}
      </Typography>
    </Container>
  );
};

export default UserInfo;
