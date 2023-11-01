import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import { Home, Menu, AccountBalanceWallet, Widgets } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const tabList = [
    { name: "Dashboard", path: '/dashboard', icon: <Home /> },
    { name: "My Accounts", path: '/accounts', icon: <AccountBalanceWallet /> },
    { name: "Categories", path: '/#', icon: <Widgets /> },
  ];

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer()}
      >
        <Menu />
      </IconButton>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer()} >
        <UserInfo userInfo={userInfo} />
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer()}
          onKeyDown={toggleDrawer()}
        >
          <List>
            {tabList.map(({ name, path, icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
