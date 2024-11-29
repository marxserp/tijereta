import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, IconButton, Button } from "@mui/material";
import dayjs from "dayjs";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { selectTurnoById } from "../../state/turnos";
import { selectClienteById } from "../../state/clientes";
import { selectProductoById } from "../../state/productos";
import ProximosTurnosList from "./ProximosTurnosList";

const SingleTurnoPage = () => {
    const navigate = useNavigate();
    const { turnoID } = useParams();
    const turno = useSelector((state) => selectTurnoById(state, turnoID));
    const cliente = useSelector((state) => selectClienteById(state, turno.id_cliente));
    const producto = useSelector((state) => selectProductoById(state, turno.id_producto));

    if (!turno) {
        return (
            <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="91vh">
                <Typography p="20px" variant="body2" textAlign="center" wrap>Turno no encontrado</Typography>
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
                    <Box p="20px 10px 10px 10px" position="relative" display="flex" flexDirection="column" minHeight="100px" height="10vh">
                        <Typography variant="h2">Turno para {`${cliente.nombre} ${cliente.apellido}`}</Typography>
                        <Typography variant="body">Creado el {dayjs(turno.createdAt).format('DD MMMM YYYY')}</Typography>
                        {turno.createdAt === turno.updatedAt ? <Typography variant="body">Última modificacíón el {dayjs(turno.updatedAt).format('DD MMMM YYYY')}</Typography> : null}
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Con fecha para </Typography>
                        <Typography variant="h4">{dayjs(turno.fecha).format('DD MMMM YYYY')}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Producto solicitado: </Typography>
                        <Typography variant="h4">{producto.nombre}</Typography>
                        <Typography variant="h5">Precio: {producto.precio}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Detalles: </Typography>
                        <Typography variant="h4">{turno.detalle}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Typography variant="subtitle">Observaciones: </Typography>
                        <Typography variant="h4">{turno.observacion}</Typography>
                    </Box>
                    <Box p="20px 10px 10px 10px">
                        <Link to={`/agenda/editar/${turno._id}`}>
                            <Button size="medium" variant="contained" onClick={() => navigate(`/agenda/editar/${turno._id}`)} startIcon={<EditRoundedIcon />}>
                                Editar turno
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        );

    }
};

export default SingleTurnoPage;