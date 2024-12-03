import React from "react"
import { Box, Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";

export const UsuarioCard = ({ usuario }) => {
  if (!usuario) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography p="20px" variant="body2" textAlign="center">
          Cargando...
        </Typography>
      </Box>
    );
  }
  return (
    <Box m="0 0 0 10px" gap="20px">
      <Card>
        <CardContent>
          <Typography variant="h5">
            {usuario.nombre} {usuario.apellido}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Correo: {usuario.correo}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Estado: {usuario.estado ? "Activo" : "Inactivo"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Usuario desde: {dayjs(usuario.createdAt).format("DD/MM/YYYY")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UsuarioCard;