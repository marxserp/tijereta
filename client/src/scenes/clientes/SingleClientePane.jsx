import { useSelector } from "react-redux";
import { selectClienteById } from "../../state/clientes";

import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const SingleClientePane = ({ currentID }) => {
    
    const cliente = useSelector((state) => selectClienteById(state, currentID));

    if (!cliente) {
        return (
            <Box>
                <Typography variant="body2">Seleccioná un cliente para verlo en detalle</Typography>
            </Box>
        )
    } else {
        return (
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
        )
    };
};

export default SingleClientePane;