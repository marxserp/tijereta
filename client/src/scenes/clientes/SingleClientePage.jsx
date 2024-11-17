import { useState } from "react";
import { useSelector } from "react-redux";
import { selectClienteById } from "../../state/clientes";

import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Sidebar from "../../components/Sidebar";

const SingleClientePage = ({ currentID }) => {
    const [isSidebar, setIsSidebar] = useState(true);

    const cliente = useSelector((state) => selectClienteById(state, currentID));

    if (!cliente) {
        return (
            <Box position="relative" display="flex" justifyContent="center">
                <Sidebar isSidebar={isSidebar} />
                <Box>
                    <Typography variant="body2">Seleccioná un cliente para verlo en detalle</Typography>
                </Box>
            </Box>
        )
    } else {
        return (
            <Box position="relative" display="flex" justifyContent="center">
                <Sidebar isSidebar={isSidebar} />
                <Box gap="30px">
                    <Box>
                        <Typography variant="h3">{cliente.nombre}</Typography>
                        <Typography variant="caption">{cliente.createdAt}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">{cliente.contacto}</Typography>
                        <Typography variant="subtitle1">{cliente.correo}</Typography>
                    </Box>
                </Box>
            </Box>
        )
    };
};

export default SingleClientePage;