import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectClienteById } from "../../state/clientes";
import { selectClienteNextTurno } from "../../state/turnos";
import { selectProductoById } from '../../state/productos';

import { tokens } from "../../theme";
import { Box, Typography, Button, List, ListItem, ListItemText, useTheme } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { formatDate } from "@fullcalendar/react";
import dayjs from "dayjs";

const SingleClientePane = ({ currentID }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const cliente = useSelector((state) => selectClienteById(state, currentID));
    const turno = useSelector((state) => selectClienteNextTurno(state, currentID));
    const producto = useSelector((state) => turno ? selectProductoById(state, turno.id_producto) : null);

    if (!cliente) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography p="20px" variant="body2" textAlign="center" wrap>Seleccioná un cliente para obtener una vista previa del mismo.</Typography>
            </Box>
        )
    } else {
        return (
            <Box m="0 0 0 10px" gap="20px">
                {/* Box A */}
                <Box>
                    <Typography p="20px 10px 0px 10px" variant="h4">Detalles</Typography>
                    <Box p="20px 10px 0px 10px">
                        <Typography variant="h3" wrap >{`${cliente.nombre} ${cliente.apellido}`}</Typography>
                        <Typography variant="subtitle1">Creado {dayjs(cliente.createdAt).format('DD-MM-YYYY')}</Typography>
                    </Box>
                    <Box p="10px 10px 0px 10px">
                        <Typography variant="h5">Teléfono: {cliente.contacto}</Typography>
                        <Typography variant="h5">Correo: {cliente.correo}</Typography>
                    </Box>
                </Box>
                <Box p="10px 10px 10px 10px">
                    <Link to={`/clientes/${cliente._id}`}>
                        <Button size="small" variant="text" startIcon={<InfoOutlinedIcon />}>
                            Detalle
                        </Button>
                    </Link>
                    <Link to={`/clientes/editar/${cliente._id}`}>
                        <Button size="small" variant="text" startIcon={<EditRoundedIcon />}>
                            Editar cliente
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <Typography p="20px 10px 0px 10px" variant="h4">Próximo turno</Typography>
                    {turno ? (
                        <List>
                            <ListItem
                                key={turno._id}
                                sx={{
                                    backgroundColor: colors.greenAccent[500],
                                    margin: "10px 0",
                                    borderRadius: "4px",
                                }}
                            >
                                <ListItemText
                                    primary={producto ? producto.nombre : 'Producto no encontrado'}
                                    secondary={
                                        <Typography>
                                            {formatDate(turno.fecha, {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    ) : (<Typography p="10px" variant="body2" wrap>No hay turnos próximos para este cliente.</Typography>)}
                </Box>
            </Box>
        )
    };
};

export default SingleClientePane;