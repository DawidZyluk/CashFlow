import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";


const UserInfo = ({ userInfo }) => {
  const { name, email, verified } = userInfo;
  const theme = useTheme();


  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      disableGutters
    >
      <Box
        sx={{
          width: '250px',
          bgcolor: theme.palette.grey[100],
          border: 1,
          borderColor: theme.palette.grey[200],
          borderRadius: 1,
          textAlign: "center",
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold", mb: 0.6 }}>{name}</Typography>
        <Typography>{email}</Typography>
      </Box>

      
    </Container>
  );
};

export default UserInfo;
