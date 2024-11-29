import * as React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from 'react-router-dom';

import { selectClienteById } from "../../state/clientes";
import { selectClienteFutureTurnos } from "../../state/turnos";
import { selectProductoById } from '../../state/productos';

import { tokens } from "../../theme";
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from "dayjs";

const SingleProductoPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { productoID } = useParams();
    const producto = useSelector((state) => selectProductoById(state, productoID));
    const turnos = useSelector((state) => selectClienteFutureTurnos(state, clienteID));
    //const clientes = useSelector((state) => turnos.map(turno => selectProductoById(state, turno.id_producto)));

    if (!producto) {
        return (
            <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="91vh">
                <Typography p="20px" variant="body2" textAlign="center" wrap>Producto no encontrado</Typography>
            </Box>
        );
    } else {
        return (
            <Box position="relative" display="flex" justifyContent="start" height="91vh" overflow="hidden">
                <Box gap="30px" m="20px 10px 10px 10px">
                    <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Detalles del turno</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px" position="relative" display="flex" flexDirection="column" height="16vh">
                        <Typography variant="h2">{`${cliente.nombre} ${cliente.apellido}`}</Typography>
                        <Typography variant="body">Creado el {dayjs(cliente.createdAt).format('DD-MMMM-YYYY')}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Número de teléfono</Typography>
                        <Typography variant="h4">{cliente.contacto}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Correo electrónico</Typography>
                        <Typography variant="h4">{cliente.correo}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography p="10px 0 0 0" variant="h5">Próximos turnos activos</Typography>
                        <List>
                            {turnos.map((turno, index) => (
                                <ListItem
                                    alignItems="flex-start"
                                    key={turno._id}
                                    sx={{
                                        backgroundColor: colors.greenAccent[500],
                                        margin: "10px 0",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <ListItemText
                                        primary={productos[index] ? productos[index].nombre : 'Producto no encontrado'}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    display="inline"
                                                >
                                                    {`Seña: ${turno.sena}`}
                                                </Typography>
                                                {` | Detalles: ${turno.detalle}`}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Box>
        );
    };
};

export default SingleProductoPage;