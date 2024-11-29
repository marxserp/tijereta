import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import unresolved from "../resources/unresolved.png";
import damaged from "../resources/damaged.png";
import bad from "../resources/bad.png";
import locked from "../resources/locked.png";

const Actions = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button variant="text" onClick={() => navigate("-1")} endIcon={<ArrowForwardIcon />}>Volver a la página anterior</Button>
      <Button variant="text" onClick={() => navigate("/")} endIcon={<ArrowForwardIcon />}>Ir al inicio</Button>
    </Box>
  );
};

const DeadEnd = ({ type, message, log }) => {

  switch (type) {
    case "401":
      return (
        <Box>
          <img src={locked} height="60" />
          <Typography variant="h3">401 Autenticación</Typography>
          <Typography variant="subtitle">{message}</Typography>
          <Typography variant="body"></Typography>
          <Typography variant="caption">{log}</Typography>
          <Actions />
        </Box>
      );
    case "403":
      return (
        <Box>
          <img src={locked} height="60" />
          <Typography variant="h3">403 Prohibido</Typography>
          <Typography variant="subtitle">{message}</Typography>
          <Typography variant="body"></Typography>
          <Typography variant="caption">{log}</Typography>
          <Actions />
        </Box>
      );
    case "404":
      return (
        <Box>
          <img src={unresolved} height="60" />
          <Typography variant="h3">404 No encontrado</Typography>
          <Typography variant="subtitle">{message}</Typography>
          <Typography variant="body"></Typography>
          <Typography variant="caption">{log}</Typography>
          <Actions />
        </Box>
      );
    case "408":
      return (
        <Box>
          <img src={bad} height="60" />
          <Typography variant="h3">408 Tiempo agotado</Typography>
          <Typography variant="subtitle">{message}</Typography>
          <Typography variant="body"></Typography>
          <Typography variant="caption">{log}</Typography>
          <Actions />
        </Box>
      );
    case "500":
      return (
        <Box>
          <img src={bad} height="60" />
          <Typography variant="h3">500 Error en servidor</Typography>
          <Typography variant="subtitle">{message}</Typography>
          <Typography variant="body"></Typography>
          <Typography variant="caption">{log}</Typography>
          <Actions />
        </Box>
      );
  }
}

export default DeadEnd;