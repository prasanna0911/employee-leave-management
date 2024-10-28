import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AdminRoutes, UserRoutes } from "./Datas/SideBarRoutes";
import { Logout } from "@mui/icons-material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./Pages/UserProfile";
// import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Department from "./Pages/Department";
import Employees from "./Pages/Employees";
import LeaveManagement from "./Pages/LeaveManagement";
import LeaveType from "./Pages/LeaveType";
import "bootstrap/dist/css/bootstrap.min.css";
import { NotFound } from "./Pages/NotFound";
import MyLeaves from "./Pages/MyLeaves";
import "./App.css";
import ChangePassword from "./Pages/ChangePassword";
import { Avatar } from "@mui/material";
import NavTop from "./Components/Nav/NavTop";
import SideBar from "./Components/Nav/SideBar";
import { useMyContext } from "./Context/MyContext";
import Login from "./Pages/Login";
import Topbar from "./Components/Nav/Topbar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);
  const { isAdmin, setIsAdmin, isLogin, setIsLogin } = useMyContext();
  // const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isLogin ? (
        <>
          <NavTop open={open} handleDrawerOpen={handleDrawerOpen} />
          <SideBar open={open} handleDrawerClose={handleDrawerClose} />
          <Main open={open}>
            <DrawerHeader />
            {isAdmin ? (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/department" element={<Department />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/leave-management" element={<LeaveManagement />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/leave-types" element={<LeaveType />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<UserProfile />} />
                <Route path="/myleaves" element={<MyLeaves />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </Main>
        </>
      ) : (
        <div className="d-flex flex-column w-100">
          {/* <Topbar /> */}
          <Login />
        </div>
      )}
    </Box>
  );
}
