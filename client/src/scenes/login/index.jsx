import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

import tijereta from "../../resources/tijeretaAlt.png";
import LoginUsuarioForm from "./LoginUsuarioForm";
import RegisterUsuarioForm from "./RegisterUsuarioForm";

const Auth = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [isLogin, toggleIsLogin] = useState(false);

  return (
    <Box
      width="100%" height="100vh"
      display="flex"
      flexDirection="column" justifyContent="center" alignItems="center"
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background}
        p="1rem 6%"
        display="flex" flexDirection="column" alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <img src={tijereta} alt="Icono de la marca" height="60" />
          <Typography m="0 0 0 20px" fontWeight="bold" variant="h1" color="primary">
            SIGUE
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          Sistema de Gestión Ultraligero para Emprendimientos
        </Typography>
      </Box>

      <Box
        width="24rem"
        p="1.5rem"
        m="2rem auto"
      >
        <Typography align="center" fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Completá los datos para Seguir
        </Typography>
        {isLogin ? <LoginUsuarioForm toggleIsLogin={toggleIsLogin} /> : <RegisterUsuarioForm toggleIsLogin={toggleIsLogin} />}
        <Typography
          align="center"
          onClick={() => toggleIsLogin(!isLogin)}
          sx={{
            textDecoration: "underline",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {isLogin ? "¿Todavía no tenés tu cuenta? Registrate acá" : "¿Ya tenés una cuenta? Iniciá sesión acá"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Auth;
