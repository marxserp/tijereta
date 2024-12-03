import React from "react"
import { Box, Card, CardContent, Typography } from "@mui/material";
export const UsuarioCard = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5"> {usuario.nombre} {usuario.apellido} </Typography>
          <Typography variant="body2" color="textSecondary"> Correo: {usuario.correo}</Typography>
          <Typography variant="body2" color="textSecondary"> Estado: {usuario.estado ? "Activo" : "Inactivo"} </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UsuarioCard;