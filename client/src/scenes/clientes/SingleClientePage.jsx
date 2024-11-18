import * as React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { selectClienteById } from "../../state/clientes";
import { selectClienteFutureTurnos } from "../../state/turnos";
import { selectProductoById } from '../../state/productos';

import { tokens } from "../../theme";
import { Box, Typography, Button, List, ListItem, ListItemText, useTheme } from "@mui/material";
import dayjs from "dayjs";

const SingleClientePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { clienteID } = useParams();
    const cliente = useSelector((state) => selectClienteById(state, clienteID));
    const turnos = useSelector((state) => selectClienteFutureTurnos(state, clienteID));
    const productos = useSelector((state) => turnos.map(turno => selectProductoById(state, turno.id_producto)));

    if (!cliente) {
        return (
            <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="91vh">
                <Typography p="20px" variant="body2" textAlign="center" wrap>Seleccioná un cliente para verlo en detalle</Typography>
            </Box>
        )
    } else {
        return (
            <Box position="relative" display="flex" justifyContent="start" height="91vh" overflow="hidden">

                <Box gap="30px">
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
        )
    };
};

export default SingleClientePage;