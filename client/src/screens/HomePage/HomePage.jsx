import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Features from "../Features/Features";
import Gallery from "../Gallery/Gallery";
import Footer from "./Footer/Footer";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Features />
      <Gallery />
      <Footer />
    </Box>
  );
};

export default HomePage;
