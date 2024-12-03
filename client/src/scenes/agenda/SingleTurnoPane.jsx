import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectTurnoById } from "../../state/turnos";
import { selectClienteById } from "../../state/clientes";
import { selectProductoById } from '../../state/productos';

import { tokens } from "../../theme";
import { Box, Typography, Button, List, ListItem, ListItemText, useTheme } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { formatDate } from "@fullcalendar/react";
import dayjs from "dayjs";

const SingleTurnoPane = ({ currentID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const turno = useSelector((state) => selectTurnoById(state, currentID));
  const cliente = useSelector((state) => turno ? selectClienteById(state, turno.id_cliente) : null);
  const producto = useSelector((state) => turno ? selectProductoById(state, turno.id_producto) : null);
  const producto2 = useSelector((state) => turno ? selectProductoById(state, turno.id_producto2) : null);
  const producto3 = useSelector((state) => turno ? selectProductoById(state, turno.id_producto3) : null);


  if (!turno) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" p="20px" textAlign="center">
        <Typography p="20px" variant="body2" textAlign="center" wrap>Seleccioná un turno para obtener una vistazo del mismo.</Typography>
      </Box>
    )
  } else {
    // reemplazar por info traida de turno
    const totalProductos = Number(producto.precio) + (producto2 ? Number(producto2.precio) : 0) + (producto3 ? Number(producto3.precio) : 0);
    const saldoFinal = Number(totalProductos) - Number(turno.sena);
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <Typography p="10px" variant="h4">Información</Typography>
        <Box flex="1" overflow="auto" px="10px">
          <Box mb="10px">
            <Typography variant="h3" wrap >{`Turno para ${cliente.nombre} ${cliente.apellido}`}</Typography>
            <Typography variant="h5">Estado: {turno.extra}</Typography>
            <Typography variant="subtitle1">{`Creado el ${dayjs(turno.createdAt).format('DD MM YYYY')}`}</Typography>
          </Box>

          <Box mb="10px">
            <Typography variant="h4">Productos cargados</Typography>
            {producto ? (
              <List>
                <ListItem
                  key={producto._id}
                  sx={{ backgroundColor: colors.greenAccent[500], borderRadius: "4px", }}
                >
                  <ListItemText
                    primary={producto ? producto.nombre : 'Producto no encontrado'}
                    secondary={<Typography>{producto.precio}</Typography>}
                  />
                </ListItem>
              </List>
            ) : (<Typography p="10px" variant="body2" wrap>Producto no encontrado.</Typography>)}
            {producto2 ? (
              <List>
                <ListItem
                  key={producto2._id}
                  sx={{ backgroundColor: colors.greenAccent[500], margin: "6px 0", borderRadius: "4px", }}
                >
                  <ListItemText
                    primary={producto2 ? producto2.nombre : 'Producto no encontrado'}
                    secondary={<Typography>{producto2.precio}</Typography>}
                  />
                </ListItem>
              </List>
            ) : null}
            {producto3 ? (
              <List>
                <ListItem
                  key={producto3._id}
                  sx={{ backgroundColor: colors.greenAccent[500], margin: "6px 0", borderRadius: "4px", }}
                >
                  <ListItemText
                    primary={producto3 ? producto3.nombre : 'Producto no encontrado'}
                    secondary={<Typography>{producto3.precio}</Typography>}
                  />
                </ListItem>
              </List>
            ) : null}
            <Typography variant="h5">Cant. señada: $ {turno.sena}</Typography>
            <Typography variant="h5">Total productos: $ {totalProductos}</Typography>
            <Typography variant="h5">Saldo final: $ {saldoFinal}</Typography>
          </Box>

          <Box>
            <Typography variant="h5">Observaciones</Typography>
            <Typography variant="subtitle">{turno.observacion}</Typography>
          </Box>
        </Box>

        <Box p="10px" borderTop="1px solid #ccc">
          <Button size="small" variant="text" onClick={() => navigate(`/agenda/${turno._id}`)} startIcon={<InfoOutlinedIcon />}>
            Ver más detalles
          </Button>
          <Button size="small" variant="text" onClick={() => navigate(`/agenda/editar/${turno._id}`)} startIcon={<EditRoundedIcon />}>
            Editar turno
          </Button>
        </Box>
      </Box>
    );
  }
};

export default SingleTurnoPane;