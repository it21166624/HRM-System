import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { Card, Divider, InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import mainlogo from "../../../ASSETS/mainlogo.png";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import "./Login.css";
import { Center } from "@mantine/core";
import { Form } from "react-router-dom";
// import shipvb from "../../../ASSETS/shipvb.mp4";
// import aa from "../../../ASSETS/aa.jpg";
import one from "../../../ASSETS/one.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getRegister } from "../../../action/CANDIDATES/CandidateRegister";
import { login } from "../../../action/CANDIDATES/CandidateLogin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getGoogleLogin } from "../../../action/CANDIDATES/CandidateGoogleLogin";
import { Link as RouterLink } from "react-router-dom";

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
        padding: "8px 0", // Add padding for spacing
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

export default function Login() {
  const [email, setemail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [googleAccessToken, setGoogleAccessToken] = useState("");
  const [googleUserDataName, setGoogleUserDataName] = useState("");
  const [googleUserDataEmail, setGoogleUserDataEmail] = useState("");
  const [googleUserDataId, setGoogleUserDataId] = useState("");
  const [signInError, setSignInError] = useState("");

  const responseGoogle = (response) => {
    if (response.accessToken) {
      setGoogleAccessToken(response.accessToken);
    }
  };

  const handleEmailChange = (event) => {
    const text = event.target.value;
    setemail({ value: text, error: "" });
  };

  const handlePasswordChange = (event) => {
    const text = event.target.value;
    setPassword({ value: text, error: "" });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSignInPressed() {
    if (!email.value || !password.value) {
      toast.error("Please Enter Your Email and Password", {
        position: "top-right",
      });
      return;
    }
    dispatch(login(navigate, email.value, password.value));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const onSignUpPressed = async (email, googleId) => {
    try {
      let data = new FormData();
      data.append("Email", email);
      data.append("Google_id", googleId);


      await dispatch(getGoogleLogin(navigate, data));
    } catch (error) {
      console.error("Error during sign-up:", error);
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
          backgroundImage: `url(${one})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: "flex-end",
          pr: "10%",
          pl: "10%",
        }}
      >
        {/* <video
          src={shipvb}
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
        <CssBaseline />
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

        {/* <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `url(${shipc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        /> */}

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={3}
          sx={{
            background: "rgba(163,189,222,0.2);",
            WebkitBackdropFilter: "blur(1px)", // Use Webkit prefix
            backdropFilter: "blur(1px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "25px",

            // Add other CSS properties or styles as needed
          }}
        >
          <Box>
            <Box
              sx={{
                my: 4,
                mx: 1,
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
                sx={{
                  my: 2,
                  fontFamily: "segoe ui",
                  fontWeight: "bold",
                  color: "Black",
                }}
              >
                Log in to your Account
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontFamily: "segoe ui",
                  color: "white",
                }}
              >
                Welcome back!
              </Typography>
            </Box>

            <Box
              sx={{
                my: 2,
                mx: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: -2 }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EmailOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    margin="normal"
                    autoComplete="email"
                    name="email"
                    id="email"
                    label="Email"
                    autoFocus
                    fullWidth
                    value={email.value}
                    onChange={handleEmailChange}
                    error={!!email.error}
                    helperText={email.error}
                    autoCapitalize="none"
                    autocompletetype="email"
                    inputMode="text"
                    type="text"
                    variant="outlined" // Change the variant to "outlined"
                    size="small" // Set the size to "small"
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
                  <VpnKeyOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                  />
                  <TextField
                    margin="normal"
                    autoComplete="password"
                    name="password"
                    id="password"
                    label="Password"
                    autoFocus
                    fullWidth
                    value={password.value}
                    onChange={handlePasswordChange}
                    error={!!password.error}
                    helperText={password.error}
                    autoCapitalize="none"
                    autocompletetype="password"
                    inputMode="text"
                    type="password"
                    variant="outlined" // Change the variant to "outlined"
                    size="small" // Set the size to "small"
                    InputProps={{ disableUnderline: true }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                {signInError && (
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    sx={{ mt: 1 }}
                  >
                    {signInError}
                  </Typography>
                )}
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                  {/* <Grid item>
                    <Link
                      component={RouterLink}
                      to="/forgot-password"
                      variant="body2"
                      sx={{ color: "blue" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid> */}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={onSignInPressed}
                  sx={{ mt: 2, mb: 1 }}
                >
                  Log In
                </Button>
                <Grid container justifyContent="center" sx={{ color: "white" }}>
                  <Grid item>
                    {/* <Link
                      href="/register"
                      variant="body2"
                      sx={{ color: "blue" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link> */}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="body2"
                      sx={{ color: "blue" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Divider
              sx={{
                my: 3,
                mx: 2,
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
            >
              or continue with gmail
            </Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
              }}
              onSubmit={handleSubmit}
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  var decoded = jwt_decode(credentialResponse.credential);
                  setGoogleUserDataName(decoded.name);
                  setGoogleUserDataEmail(decoded.email);
                  setGoogleUserDataId(decoded.sub);
                  onSignUpPressed(decoded.email, decoded.sub);
                }}
                onError={() => {}}
              />
            </Box>
          </Box>
          <Copyright sx={{ mt: 2 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
