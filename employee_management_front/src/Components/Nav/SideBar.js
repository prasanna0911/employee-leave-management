import { Avatar, Divider, Drawer, IconButton, List } from "@mui/material";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AdminRoutes, UserRoutes } from "../../Datas/SideBarRoutes";
import { Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = ({ open, handleDrawerClose }) => {
  const drawerWidth = 240;
  const theme = useTheme();
  const { isAdmin, setIsAdmin } = useMyContext();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <div className="d-flex flex-column align-items-center justify-content-center mb-3">
        <Avatar
          style={{ height: "100px", width: "100px", marginBottom: "10px" }}
        />
        <h6 className="mb-1">Prasanna</h6>
        <h6>5438791</h6>
      </div>
      <Divider />
      <List>
        {(isAdmin ? AdminRoutes : UserRoutes).map((route, index) => (
          <ListItem
            key={route.name}
            disablePadding
            className={path === route.URL ? "sel-nav" : "nav"}
          >
            <ListItemButton onClick={() => navigate(route.URL)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
