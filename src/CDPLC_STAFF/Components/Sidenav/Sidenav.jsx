import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAppStore } from "../../../appStore";
import { GroupAdd } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    width: 0, // Set the width to 0 for xs and sm screens
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  //const [open, setOpen] = React.useState(true);
  const naviagte = useNavigate();
  const open = useAppStore((state) => state.dopen);
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const handleMenuClose = () => {
    setLogoutDialogOpen(true);
  };
  //lgoout confirmation
  // const handleLogout = () => {
  //   window.location.href = "/";
  // };
  const handleLogout = () => {
    // Perform any necessary logout logic here
    navigate("/");
  };
  //lgoout confirmation
  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  //-----------------Use Location for Highlight Sidebar List Item --------------------
  const location = useLocation();
  const isStaffDashboardActive = location.pathname === "/staff_dashboard";
  const isStaffAddJob = location.pathname === "/Jobs_Layout";
  const isStaffApprovedbyAdmin = location.pathname === "/ApprovedAdmin_Layout";
  const isStaffApprovedbyStaff = location.pathname === "/ApprovedStaff_Layout";
  const isStaffCreatePanel = location.pathname === "/Panel_layout";
  const isStaffInterviewDetails = location.pathname === "/Stffinterview_layout";
  const isStaffApponintedCandidates =
    location.pathname === "/Appointed_Candidates_Layout";
  const isStaffRequestHistory = location.pathname === "/History_Layout";
  //-------END------------------------------------------------------------------------

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
  return (
    <Box sx={{ display: "flex", minHeight: "100hv", flexDirection: "column" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffDashboardActive
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/Staff_Dashboard");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffAddJob ? "#7fcef0" : "transparent",
            }}
            onClick={() => {
              naviagte("/Jobs_Layout ");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Add Jobs" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffRequestHistory
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/History_Layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Request History"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffApprovedbyAdmin
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/ApprovedAdmin_Layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText
                primary="Approved By Admin"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffApprovedbyStaff
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/ApprovedStaff_Layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DownloadDoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Approved By Staff"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              naviagte("/Form_Layout ");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TextSnippetIcon />
              </ListItemIcon>
              <ListItemText
                primary="Request form"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List> */}
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffCreatePanel ? "#7fcef0" : "transparent",
            }}
            onClick={() => {
              naviagte("/Panel_layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Create Panel"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffInterviewDetails
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/Stffinterview_layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText
                primary="Interview Details"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isStaffApponintedCandidates
                ? "#7fcef0"
                : "transparent",
            }}
            onClick={() => {
              naviagte("/Appointed_Candidates_Layout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText
                primary="Appointed Candidates"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          {/* <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={handleMenuClose}
                  primary="Log Out"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleMenuClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Log Out"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {logoutDialog}
    </Box>
  );
}
