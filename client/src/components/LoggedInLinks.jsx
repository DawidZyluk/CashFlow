import React, { useEffect, useState } from "react";
import { useGetProfileQuery, useLogoutMutation } from "../store/usersApiSlice";
import { setLogin, setLogout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { stringAvatar, stringToColor } from "../utils/stringAvatar";
import toast from "react-hot-toast";
import { Button, useTheme } from "@mui/material";
import CoinAvatar from "./CoinAvatar";

const LoggedInLinks = ({ userInfo }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const [logoutApi] = useLogoutMutation();
  const { data, refetch } = useGetProfileQuery();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
    dispatch(setLogin({ ...userInfo, ...data }));
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(setLogout());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Could not log out");
    }
  };

  return (
    <>
      <Button color="inherit" component={NavLink} to="/dashboard">
        Dashboard
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <CoinAvatar children={`${userInfo.name[0]}`} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1,
          "& .MuiAvatar-root": {
            width: 25,
            height: 25,
            ml: -0.5,
            mr: 2,
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default LoggedInLinks;
