import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTurno, setTurnos } from "../../state/turnos";

import { fetchAllTurnos } from "../../state/turnos";
import { fetchAllProductos } from "../../state/productos";
import { getProductoNombreById } from "../../state/productos";
import { tokens } from "../../theme";

import { DatePicker } from "@mui/x-date-pickers";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";

const ProximosTurnosList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const turnos = useSelector((state) => state.turnos.turnos);
  const productos = useSelector((state) => state.productos.productos);

  return (
    <Box m="0 0 0 10px" height="100vh" overflow-x="scroll">
      <Typography p="20px 10px 0px 10px" variant="h4">Próximos turnos</Typography>
      <Box p="20px 10px 0px 10px">
        <List>
          {turnos.map((turno) => (
            <ListItem
              key={turno.id}
              sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "6px",
              }}
            >
              <ListItemText
                primary={getProductoNombreById(productos, turno.id_producto)}
                secondary={
                  <Typography>
                    {formatDate(turno.fecha, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default ProximosTurnosList;