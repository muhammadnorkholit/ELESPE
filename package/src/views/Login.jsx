import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Api from "../Api";
// import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   margin: theme.spacing(1),
//   backgroundColor: theme.palette.primary.main,
// }));

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     (async () => {
//       Api.get("/user").then(({ data }) =>
//         data?.isLoggedIn ? navigate("/dashboards") : ""
//       );
//     })();
//   }, []);
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     let username = event.target.username.value;
//     let password = event.target.password.value;

//     try {
//       let res = await Api.post("/login", {
//         username: username,
//         password: password,
//       });
//       if (res?.data?.isLoggedIn) {
//         navigate("/dashboards");
//         sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
//       }
//     } catch (error) {
//       console.log(error);
//       Toast({ message: "Username atau password salah", type: "error" });
//     }
//   };

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         mt={8}
//         p={4}
//         boxShadow={3}
//         borderRadius={10}
//       >
//         <StyledAvatar>
//           <LockOutlinedIcon />
//         </StyledAvatar>
//         <Typography component="h1" variant="h5" align="center">
//           Login
//         </Typography>
//         <form
//           onSubmit={handleLogin}
//           style={{ width: "100%", marginTop: "1rem" }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Username"
//                 value={username}
//                 onChange={(event) => setUsername(event.target.value)}
//                 fullWidth
//                 autoFocus
//                 required
//                 name="username"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value)}
//                 fullWidth
//                 required
//                 name="password"
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton
//                       onClick={handleTogglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? (
//                         <VisibilityIcon />
//                       ) : (
//                         <VisibilityOffIcon />
//                       )}
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             style={{ marginTop: "1rem" }}
//           >
//             Login
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Login;

// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Hidden, IconButton } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        ELESPE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Remember, setRemember] = useState(false);
  console.log(Remember);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      Api.get("/user").then(({ data }) =>
        data?.isLoggedIn ? navigate("/dashboards") : ""
      );
    })();
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(event.target.username);
    let username = event.target.username.value;
    let password = event.target.password.value;

    try {
      let res = await Api.post("/login", {
        username: username,
        password: password,
        remember: Remember,
      });
      if (res?.data?.isLoggedIn) {
        navigate("/dashboards");
        sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
      }
    } catch (error) {
      console.log(error);
      Toast({ message: "Username atau password salah", type: "error" });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Hidden smDown>
          <Grid
            className="d-lg-block d-none"
            item
            xs={false}
            sm={4}
            md={8}
            sx={{
              backgroundColor: "#1a97f5",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                flexDirection: "column",
              }}
            >
              <Box className="m-auto " sx={{ width: "80%" }}>
                <Typography variant="h3" color={"white"}>
                  Selamat Datang di ELESPE
                </Typography>
                <Typography variant="p" color={"white"}>
                  ELESPE adalah sebuah sistem informasi yang digunakan untuk
                  mengelola penilaian kompetensi siswa. Aplikasi ini dibuat
                  dengan tujuan untuk memudahkan pengguna dalam melakukan
                  penilaian terhadap para siswa.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={2} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1a97f5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Masuk{" "}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label="Password "
                name="password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    onClick={() => setRemember(!Remember)}
                    color="primary"
                  />
                }
                label="Ingat Saya"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Masuk
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Lupa Password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
