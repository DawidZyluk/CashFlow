import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoggedInLinks from "./LoggedInLinks";
import SideDrawer from "./SideDrawer";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {userInfo && <SideDrawer />}
          <Box
            component={Link}
            to={userInfo ? "/dashboard" : "/"}
            sx={{
              display: 'flex',
              textDecoration: "none",
              marginRight: "auto",
            }}
          >
            <Box
              component="img"
              alt="logo"
              src="/logo.png"
              sx={{
                width: "2rem",
                mr: 0.4,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                textDecoration: "none",
                color: "white",
              }}
            >
              CashFlow
            </Typography>
          </Box>
          {userInfo ? (
            <LoggedInLinks userInfo={userInfo} />
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={NavLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
