import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/auth.jsx";
import tijereta from "../resources/tijereta.png";

import { ColorModeContext, tokens } from "../theme.js";
import { Box, IconButton, Typography, Button, AppBar, Toolbar, useTheme } from "@mui/material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleSubmit = () => {
    if (isAuth) dispatch(setLogout());
    navigate("/auth");
  };

  return (
    <Box m="0 0 0 54px" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center" flexDirection="row" sx={{ flexGrow: 1 }}>
            <img src={tijereta} alt="Icono de la marca" height="30" />
            <Typography m="0 0 0 8px" fontWeight="bold" fontSize="16px">
              SIGUE:BETA
            </Typography>
          </Box>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={isAuth ? <LogoutOutlinedIcon /> : <LoginIcon />}
            onClick={handleSubmit}
          >
            {isAuth ? `Cerrar sesión` : `Ingresar`}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
