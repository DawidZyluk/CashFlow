import React from "react";

import { Box, Typography } from "@mui/material";
import GalleryImg from "./GalleryImg";

const Gallery = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        py: 10,
        px: 15,
        height: "65rem",
        clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "60%",
          flexDirection: "column",
          justifyContent: "space-around",
          px: 5,
          width: "50%",
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight={300} my={1}>
            Explore the Power of In-Depth Analysis
          </Typography>
        </Box>
        <Typography sx={{ pr: 15, fontSize: 20 }}>
          Unleash the potential of CashFlow's Analytics Tools, designed to
          provide you with real-time insights, precise expense categorization,
          investment performance tracking, goal monitoring, and trend analysis.
          Elevate your financial decision-making and gain a comprehensive
          understanding of your financial landscape.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "40%",
          height: "50%",
          position: "relative",
        }}
      >
        <GalleryImg
          src="/chart.png"
          sx={{ zIndex: 3, top: "-4rem", left: "-10%", width: "40rem" }}
        />
        <GalleryImg
          src="/pie.png"
          sx={{ zIndex: 4, top: "0rem", right: "-25%", width: "25rem" }}
        />
        <GalleryImg
          src="/grid.png"
          sx={{ zIndex: 5, top: "10rem", right: "-1%", width: "40rem" }}
        />
      </Box>
    </Box>
  );
};

export default Gallery;
