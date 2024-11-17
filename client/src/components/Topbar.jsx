import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/auth.jsx";

import { ColorModeContext, tokens } from "../theme.js";
import { Box, IconButton, Typography, Button, useTheme } from "@mui/material";

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
    <Box display="flex" justifyContent="space-between" p="0.6rem">
      {/* LOGO */}
      <Box>
        <Typography fontWeight="bold" fontSize="16px" color="primary">
          TIJERETA:PROTO
        </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex">
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
          startIcon={isAuth ? <LogoutOutlinedIcon /> : <LoginIcon />}
          onClick={handleSubmit}
        >
          {isAuth ? `Cerrar sesión` : `Ingresar`}
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
