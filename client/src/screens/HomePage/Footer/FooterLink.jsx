import { Box, Link } from "@mui/material";
import React from "react";

const FooterLink = ({icon, href, sx}) => {
  return (
    <Link href={href} target="_blank">
      <Box
        sx={{
          width: "2.5rem",
          height: "2.5rem",
          color: "#f7f7f7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 22,
          border: 2,
          borderRadius: "50%",
          transition: "all .2s",
          // mr: 2,
          "&:hover": {
            bgcolor: "white",
            color: "#333",
            borderColor: "#f7f7f7",
          },
          ...sx
        }}
      >
        {icon}
      </Box>
    </Link>
  );
};

export default FooterLink;
