import { Box } from "@mui/material";
import React from "react";

const GalleryImg = ({alt = "image", src, sx}) => {
  return (
    <Box
      component="img"
      alt={alt}
      src={src}
      sx={{
        position: "absolute",
        boxShadow: 10,
        transition: "all .5s",
        "&:hover": {
          zIndex: 10,
          boxShadow: 20,
        },
        ...sx
      }}
    />
  );
};

export default GalleryImg;
