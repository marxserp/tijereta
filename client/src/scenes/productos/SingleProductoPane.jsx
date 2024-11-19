import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectProductoById } from '../../state/productos';

import { Box, Typography, Button } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dayjs from "dayjs";

const SingleProductoPane = ({ productoID }) => {
    const producto = useSelector((state) => selectProductoById(state, productoID));

    if (!producto) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography p="20px" variant="body2" textAlign="center" wrap>Seleccioná un producto para obtener una vista previa del mismo.</Typography>
            </Box>
        );
    } else {
        return (
            <Box m="0 0 0 10px" gap="20px">
                <Box>
                    <Typography p="20px 10px 0px 10px" variant="h4">Información</Typography>
                    <Box p="20px 10px 0px 10px">
                        <Typography variant="h3" wrap >{producto.nombre}</Typography>
                        <Typography variant="subtitle1">Creado {dayjs(producto.createdAt).format('DD-MM-YYYY')}</Typography>
                        <Typography mt="-6px" variant="subtitle1">Última modificación {dayjs(producto.updatedAt).format('DD-MM-YYYY')}</Typography>
                    </Box>
                    <Box p="10px 10px 0px 10px">
                        <Typography variant="h5">Precio: {producto.precio}$</Typography>
                        <Typography variant="h5">Duración: {producto.duracion}'</Typography>
                    </Box>
                </Box>
                <Box p="10px 10px 10px 10px">
                    <Link to={`/productos/editar/${producto._id}`}>
                        <Button size="small" variant="text" startIcon={<EditRoundedIcon />}>
                            Editar producto
                        </Button>
                    </Link>
                </Box>
            </Box>
        );
    }
};

export default SingleProductoPane;