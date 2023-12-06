import React from "react";
import { Box, Link, Typography } from "@mui/material";

import { FaLinkedinIn } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#333",
        color: "#f7f7f7",
        p: 5,
        mt: -20,
        pt: 25,
        px: 15,
        height: "25rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          pb: 2,
          justifyContent: "center",
          width: "20%",
        }}
      >
        <Box
          component="img"
          alt="image"
          src="/logo3.png"
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            mr: 0.4,
          }}
        />
        <Typography sx={{ fontSize: 34 }}>CashFlow</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 3,
        }}
      >
        <FooterLink icon={<FiGithub />} sx={{mr: 2.5}} href="https://github.com/DawidZyluk" />
        <FooterLink
          icon={<FaLinkedinIn />}
          href="https://www.linkedin.com/in/dawid-%C5%BCyluk-634401287/"
        />
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "light",
          mt: 3,
        }}
      >
        Copyright © by Dawid Żyluk
      </Typography>
    </Box>
  );
};

export default Footer;
