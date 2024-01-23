import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getRegister } from "../../../action/CANDIDATES/CandidateRegister";
import {
  firstnameValidator,
  lastnameValidator,
} from "../../helpers/nameValidator";
import { addressValidator } from "../../helpers/addressValidator";
import { telephoneValidator } from "../../helpers/telephoneValidator";
import { nicValidator } from "../../helpers/nicValidator";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { cpasswordValidator } from "../../helpers/cpasswordValidator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mainlogo from "../../../ASSETS/mainlogo.png";
// import aa from "../../../ASSETS/aa.jpg";
import two from "../../../ASSETS/two.jpg";
// import shipvc from "../../../ASSETS/shipvc.mp4";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";
// import { CandidateSMSActions } from "../../../action/CANDIDATES/CandidateSMSActions";

const HideArrowsInput = styled("input")({
  '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':
    {
      WebkitAppearance: "none",
      margin: 0,
    },
  appearance: "textfield",
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{
        position: "inherit",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: "8px 0",
      }}
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="">
        Dockyard Total Solutions(Pvt)Ltd.
      </Link> */}
      <Link color="inherit" to="">
        Dockyard Total Solutions(Pvt)Ltd.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState({ value: "", error: "" });
  const [lastName, setlastName] = useState({ value: "", error: "" });
  const [address, setaddress] = useState({ value: "", error: "" });
  const [telephone, settelephone] = useState({ value: "", error: "" });
  const [nic, setnic] = useState({ value: "", error: "" });
  const [email, setemail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const handleFirstNameChange = (event) => {
    const text = event.target.value;
    setfirstName({ value: text, error: "" });
  };
  const handleLastNameChange = (event) => {
    const text = event.target.value;
    setlastName({ value: text, error: "" });
  };
  const handleAddressChange = (event) => {
    const text = event.target.value;
    setaddress({ value: text, error: "" });
  };
  const handleTelephoneChange = (event) => {
    const text = event.target.value;
    settelephone({ value: text, error: "" });
  };
  const handleNicChange = (event) => {
    const text = event.target.value;
    setnic({ value: text, error: "" });
  };
  const handleEmailChange = (event) => {
    const text = event.target.value;
    setemail({ value: text, error: "" });
  };
  const handlePasswordChange = (event) => {
    const text = event.target.value;
    setPassword({ value: text, error: "" });
  };
  const handleConfirmPasswordChange = (event) => {
    const text = event.target.value;
    const error = cpasswordValidator(password.value, text);

    // Check if the passwords match
    const passwordsMatch =
      password.value === text ? "" : "Passwords don't match.";

    setConfirmPassword({ value: text, error: error || passwordsMatch });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignUpPressed();
  };
  const onSignUpPressed = () => {
    const requestBodyData = new FormData();
    requestBodyData.append("Full_name", firstName.value + " " + lastName.value);
    requestBodyData.append("Address", address.value);
    requestBodyData.append("Mobile_no", telephone.value);
    requestBodyData.append("Nic", nic.value);
    requestBodyData.append("Email", email.value);
    requestBodyData.append("Password", password.value);

    const firstNameError = firstnameValidator(firstName.value);
    const lastNameError = lastnameValidator(lastName.value);
    const addressError = addressValidator(address.value);
    const telephoneError = telephoneValidator(telephone.value);
    const nicError = nicValidator(nic.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const cpasswordError = cpasswordValidator(confirmPassword.value);
    const confirmPasswordError =
      cpasswordError ||
      (password.value !== confirmPassword.value
        ? "Passwords don't match."
        : "");

    setfirstName({ ...firstName, error: firstNameError });
    setlastName({ ...lastName, error: lastNameError });
    setaddress({ ...address, error: addressError });
    settelephone({ ...telephone, error: telephoneError });
    setnic({ ...nic, error: nicError });
    setemail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });

    if (
      !firstName.value ||
      !lastName.value ||
      !address.value ||
      !telephone.value ||
      !nic.value ||
      !email.value ||
      !password.value ||
      confirmPasswordError
    ) {
      return; // Exit early if any field is empty
    } else if (
      firstNameError ||
      lastNameError ||
      addressError ||
      telephoneError ||
      nicError ||
      emailError ||
      passwordError ||
      cpasswordError ||
      confirmPasswordError
    ) {
      return; // Exit early if any validation error exists
    } else {
      dispatch(getRegister(notify, setLoading, navigate, requestBodyData));
      // dispatch(CandidateSMSActions(telephone.value));
    }
  };

  //toast
  const notify = (message, type) => {
    const options = {
      position: "top-right",
    };
    if (type === "success") {
      toast.success(message, options);
    } else if (type === "error") {
      toast.error(message, options);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        // xs={false}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: `url(${two})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: "flex-end",
          pr: "10%",
          pl: "5%",
        }}
      >
        {/* <video
          src={shipvc}
          autoPlay
          loop
          muted
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1",
          }}
        ></video> */}
        {/* <img
          src={mainlogo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            width: "200px",
            height: "auto",
          }}
        /> */}

        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          xl={3}
          mt={5}
          sx={{
            background: "rgba(163,189,222,0.2);",
            WebkitBackdropFilter: "blur(1px)", // Use Webkit prefix
            backdropFilter: "blur(1px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "25px",

            // Add other CSS properties or styles as needed
          }}
        >
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={mainlogo}
              alt="Logo"
              style={{
                width: "200px",
                height: "auto",
              }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{ my: 1, fontFamily: "segoe ui", fontWeight: "bold" }}
            >
              Sign up
            </Typography>
          </Box>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PersonOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="firstName"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName.value}
                    onChange={handleFirstNameChange}
                    error={!!firstName.error}
                    helperText={firstName.error}
                    autoCapitalize="none"
                    autocompletetype="firstName"
                    inputMode="text"
                    type="text"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PersonOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="lastName"
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    value={lastName.value}
                    onChange={handleLastNameChange}
                    error={!!lastName.error}
                    helperText={lastName.error}
                    autoCapitalize="none"
                    autocompletetype="lastName"
                    inputMode="text"
                    type="text"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <HomeOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="address"
                    name="address"
                    fullWidth
                    id="address"
                    label="Address"
                    autoFocus
                    value={address.value}
                    onChange={handleAddressChange}
                    error={!!address.error}
                    helperText={address.error}
                    autoCapitalize="none"
                    autocompletetype="address"
                    inputMode="text"
                    type="text"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LocalPhoneOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="telephone"
                    name="telephone"
                    fullWidth
                    id="telephone"
                    label="Telephone"
                    autoFocus
                    value={telephone.value}
                    onChange={(e) => {
                      handleTelephoneChange(e);
                    }}
                    error={!!telephone.error}
                    helperText={telephone.error}
                    autoCapitalize="none"
                    autocompletetype="telephone"
                    inputMode="numeric"
                    type="number"
                    size="small"
                    variant="outlined"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                    InputProps={{
                      inputComponent: HideArrowsInput,
                      disableUnderline: true,
                      inputProps: {
                        step: "any",
                      },
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 9);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <BadgeOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="nic"
                    name="nic"
                    fullWidth
                    id="nic"
                    label="National Identity Card"
                    placeholder="xxxxxxxxxxV / xxxxxxxxxxxx"
                    autoFocus
                    value={nic.value}
                    onChange={handleNicChange}
                    error={!!nic.error}
                    helperText={nic.error}
                    autoCapitalize="none"
                    autocompletetype="nic"
                    inputMode="text"
                    type="text"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EmailOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="email"
                    name="email"
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    value={email.value}
                    onChange={handleEmailChange}
                    error={!!email.error}
                    helperText={email.error}
                    autoCapitalize="none"
                    autocompletetype="email"
                    inputMode="text"
                    type="text"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <VpnKeyOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="password"
                    name="password"
                    id="password"
                    label="Password"
                    autoFocus
                    value={password.value}
                    onChange={handlePasswordChange}
                    error={!!password.error}
                    helperText={password.error}
                    autoCapitalize="none"
                    autocompletetype="password"
                    inputMode="text"
                    type="password"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <VpnKeyOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password"
                    autoFocus
                    value={confirmPassword.value}
                    onChange={handleConfirmPasswordChange}
                    error={!!confirmPassword.error}
                    helperText={confirmPassword.error}
                    autoCapitalize="none"
                    autocompletetype="confirmPassword"
                    inputMode="text"
                    type="password"
                    size="small"
                    variant="outlined"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={onSignUpPressed}
                    sx={{ mt: 2 }}
                  >
                    Sign Up
                  </Button> */}
                  <LoadingButton
                    loading={loading} // Pass the loading state here
                    fullWidth
                    loadingIndicator="Loading…"
                    onClick={onSignUpPressed}
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={loading}
                  >
                    Sign Up
                  </LoadingButton>
                </Grid>
              </Grid>

              {/* <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="/" variant="body2" sx={{ color: "blue" }}>
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid> */}
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/"
                    variant="body2"
                    sx={{ color: "blue" }}
                  >
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 1 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
