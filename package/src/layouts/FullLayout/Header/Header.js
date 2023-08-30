import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import userimg from "../../../assets/images/users/user.jpg";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";
import { ChangeCircleOutlined } from "@mui/icons-material";
import Toast from "../../../components/Toast/Toast";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [User, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.get("/user");
        setUser(data?.data?.user);
        if (!data?.data?.isLoggedIn) navigate("/login");
      } catch (error) {
        navigate("/error");
      }
    })();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    await Api.post("/logout");
    navigate("/login");
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Modal open={open} setOpen={setOpen} />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Box display={"flex"} alignItems={"center"}>
          {User && (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginRight: "10px" }}
            >
              {User.nama}
            </Typography>
          )}
          <IconButton
            aria-label="menu"
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userimg}
                alt={userimg}
                sx={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
          </IconButton>
        </Box>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={() => setOpen(true)}>
            <ListItemIcon>
              <ChangeCircleOutlined fontSize="small" />
            </ListItemIcon>
            Ubah Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

function Modal({ open, setOpen }) {
  const [Error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    let password1 = e.target.password.value;
    let password2 = e.target.password2.value;
    if (password1 != password2) {
      return setError("Password tidak sama");
    }
    let data = await Api.put("/reset-password", { password: password1 });
    Toast({ message: "Password Berhasil Diubah", type: "success" });
    setOpen(false);
    setError(false);
  }
  return (
    <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Typography>Ubah Password</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Grid xs={12} item lg={12} sm={12}>
              <TextField
                required
                id="default-value"
                label="Password"
                variant="outlined"
                fullWidth
                type={"password"}
                name="password"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <TextField
                required
                id="email-text"
                label="Konfirmasi Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password2"
                size="small"
                sx={{ mb: 2 }}
                error={Error}
              />
              {Error && <small style={{ color: "red" }}>{Error}</small>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button color="primary" type="submit">
            Ubah
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
