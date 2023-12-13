import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        p: 5,
        px: 15,
        pl: 25,
        height: "50rem",
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "80%",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <Typography variant="h1" fontWeight={300} my={1}>
            Welcome to
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h1">Cash</Typography>
            <Typography variant="h1">Flow</Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ pr: 15 }}>
          Discover financial empowerment with CashFlow - your ultimate companion
          in achieving your savings goals. Say goodbye to financial uncertainty
          and hello to organized, stress-free savings management.
        </Typography>
        <Button
          variant="contained"
          component={NavLink}
          to="/register"
          size="large"
          sx={{ width: "40%", fontSize: 20 }}
        >
          Get started
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="image"
          src="/1.jpg"
          sx={{
            width: "90%",
            mr: 0.4,
          }}
        />
        <Box>
          <a href="https://www.freepik.com/free-vector/new-team-members-concept-illustration_19184614.htm#query=corporate%20illustration&position=17&from_view=keyword&track=ais&uuid=73539a3b-83b3-4a84-b21f-710448bd23a8">
            Image by storyset
          </a>{" "}
          on Freepik
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
