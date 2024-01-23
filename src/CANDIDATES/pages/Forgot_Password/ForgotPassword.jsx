import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { emailValidator } from "../../helpers/emailValidator";
import "../Login/Login.css";
import back from "../../../ASSETS/back.jpg";
import { Link as RouterLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
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

export default function ForgotPassword() {
  const [email, setemail] = useState({ value: "", error: "" });

  const handleEmailChange = (event) => {
    const text = event.target.value;
    setemail({ value: text, error: "" });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setemail({ ...email, error: emailError });
      return;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 4 }}
              >
                <Typography variant="h6">
                  Enter Your email address below and we will send you a link to
                  reset your passord
                </Typography>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
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
                    />
                  </Grid>
                </Grid>

                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={onSendPressed}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send
                </Button>

                <Grid container>
                  <Grid item>
                    {/* <Link href="/register" variant="body2">
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
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Box>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}
