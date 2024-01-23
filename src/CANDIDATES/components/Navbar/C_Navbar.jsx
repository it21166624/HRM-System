import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import mainlogo from "../../../ASSETS/mainlogo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../../../action/CANDIDATES/CandidateLogin";
import { getProfile } from "../../../action/CANDIDATES/CandidateProfile";
import { ListItemIcon } from "@mui/material";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
  { label: "History", path: "/history", icon: <HistoryIcon /> },
];

function DrawerAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { window } = props;
  const isMenuOpen = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setLogoutDialogOpen(true);
    handleMobileMenuClose();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut(navigate));
  };
  const { data } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile(""));
    console.log(data.Full_name);
  }, []);
  const logoutDialog = (
    <Dialog
      open={logoutDialogOpen}
      onClose={handleCancelLogout}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Log Out Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelLogout}>No</Button>
        <Button onClick={handleLogout} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="open drawer"
      >
        <img
          src={mainlogo}
          alt="Menu Icon"
          style={{ width: "70%", height: "50%" }}
        />
      </IconButton>
      <Typography
        variant="h8"
        noWrap
        component="div"
        sx={{
          fontSize: "10px",
          color:"#1976d2"
        }}
      >
        HELLO {data.Full_name}
        <br />
        <br />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
            // onClick={() => updateOpen(!dopen)}
          >
            {/* Display only the image as the icon */}
            <img
              src={mainlogo}
              alt="Menu Icon"
              style={{ width: "70%", height: "50%" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: "13px",
              }}
            >
              HELLO {data.Full_name} WELCOME TO THE HRM
            </Typography>
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              flex: 1,
              position: "fixed", // Set the position to fixed
              width: "90%", // Set the width to 100%
              // backgroundColor: "red",
            }}
          >
            {navItems.map((item) => (
              <Button
                color="primary"
                key={item.label}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuClose}
              color="primary"
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {logoutDialog}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
