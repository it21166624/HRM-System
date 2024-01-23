import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MoreIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAppStore } from "../../../appStore";
import { useDispatch } from "react-redux";
import { logOut } from "../../../action/CANDIDATES/CandidateLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfile } from "../../../action/CANDIDATES/CandidateProfile";
import { getSummery } from "../../../action/CANDIDATES/CandidateSummery";
import mainlogo from "../../../ASSETS/mainlogo.png";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Can_Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  //lgoout confirmation
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  //lgoout confirmation
  const handleMenuClose = () => {
    setAnchorEl(null);
    setLogoutDialogOpen(true);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  //lgoout confirmation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut(navigate));
  };
  //lgoout confirmation
  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleVacanciesClick = () => {
    navigate("/dashboard");
  };
  const handleHistoryClick = () => {
    navigate("/history");
  };
  const { loginDataDispatch } = useSelector((state) => state.auth);
  const { profileDataDispatch } = useSelector((state) => state.profile);
  const { userData } = useSelector((state) => state.summery);
  const { data } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  // const [reg_id, type] = user.split("/");

  useEffect(() => {
    dispatch(getProfile(""));
  }, []);

  // useEffect(() => {
  //   if (reg_id !== data?.Reg_user_id && loginDataDispatch) {
  //     dispatch(getProfile(reg_id));
  //   }
  //   if (reg_id !== userData?.UserBioDtails?.reg_userid && profileDataDispatch) {
  //     dispatch(getSummery(reg_id));
  //   }
  // }, [loginDataDispatch, profileDataDispatch]);

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* lgoout confirmation */}
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );
  //lgoout confirmation
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        {/* "rgba(255, 255, 255, 0.9)" */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="info"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            // onClick={() => updateOpen(!dopen)}
          >
            {/* Display only the image as the icon */}
            <img
              src={mainlogo}
              alt="Menu Icon"
              style={{ width: "70%", height: "50%" }}
            />
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
            <Button color="primary" onClick={handleVacanciesClick}>
              Vacancies
            </Button>
            <Button color="primary" onClick={handleProfileClick}>
              Profile
            </Button>
            <Button color="primary" onClick={handleHistoryClick}>
              History
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box >
          {/* sx={{ display: { xs: "none", md: "flex" } }} */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuClose}
              color="primary"
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="info"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {logoutDialog}
    </Box>
  );
}
