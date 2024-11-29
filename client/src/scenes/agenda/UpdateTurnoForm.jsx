import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTurno, deleteTurno } from "../../state/turnos";
import { searchProducto } from "../../state/productos";
import { searchCliente } from "../../state/clientes";
import useDebouncedSearch from "./debouncer";
import { debounce, isEqual } from 'lodash';

import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    Autocomplete,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import useMediaQuery from "@mui/material/useMediaQuery"
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";


const SENA_REGEX = /^[0-9]*\.?[0-9]*$/

const valueValidation = yup.object().shape({
    sena: yup.string().matches(SENA_REGEX, "Sólo se permiten números."),
    detalle: yup.string().required(),
    observacion: yup.string(),
});

const initialValues = {
    fecha: dayjs(),
    id_cliente: "",
    id_producto: "",
    sena: 0,
    detalle: "",
    observacion: "",
    estado: 1,
    extra: 1,
};

const FormObserver = ({ turno }) => {
    const { setValues } = useFormikContext();
    useEffect(() => {
        if (turno) {
            setValues({
                fecha: turno.fecha,
                id_producto: turno.id_producto,
                id_cliente: turno.id_cliente,
                sena: Number(turno.sena),
                detalle: turno.detalle,
                observacion: turno.observacion,
                estado: turno.estado,
                extra: turno.extra,
            });
        }
    }, [turno, setValues]);
    return null;
};

const UpdateTurnoForm = ({ currentID, setCurrentID }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _id = useSelector((state) => state.auth.usuario._id);
    const { turnoID } = useParams();
    const turno = useSelector((state) =>
        turnoID ? state.turnos.turnos.find((turno) => turno._id === turnoID) : null
    );

    // Estado local que guarda id/fecha de elemento/fecha seleccionado
    const [selectedDateValue, setSelectedDateValue] = useState();
    const [clientes, setClientes] = useState([]);
    const [selectedClienID, setSelectedClienID] = useState("");
    const [productos, setProductos] = useState([]);
    const [selectedProdID, setSelectedProdID] = useState("");
    const [sena, setSena] = useState(0);
    const [extra, setExtra] = useState(1);

    const searchClienFunc = async (query) => {
        if (!query) return [];
        try {
            const response = await searchCliente(query);
            return response;
        } catch (error) {
            console.error("Error fetching clients", error);
            return [];
        }
    };

    const searchProductoFunc = async (query) => {
        if (!query) return [];
        try {
            const response = await searchProducto(query);
            return response;
        } catch (error) {
            console.error("Error fetching clients", error);
            return [];
        }
    };
    const debouncedSearchClienFunc = useDebouncedSearch(searchClienFunc);
    const debouncedSearchProdFunc = useDebouncedSearch(searchProductoFunc);

    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new URLSearchParams(values);
        formData.append("usuario", _id);
        dispatch(updateTurno({ id: turnoID, turno: formData }));
        navigate("/agenda")
    };

    const handleDelete = async () => {
        dispatch(deleteTurno(currentID));
    };

    const handleClear = (resetForm) => {
        setSelectedDateValue(dayjs());
        setSelectedClienID(null);
        setSelectedProdID(null);
        setSena(null);
        setExtra(null);
        resetForm();
    };

    /*
    useEffect(() => {
      if (turno !== 0 && turno !== null) {
        setSelectedDateValue(dayjs(turno.fecha).format('DD-MM-YYYY'));
      }
    }, [turno]);
    */

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                resetForm,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0" m="20px 10px 10px 10px">
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Detalles del turno</Typography>
                    </Box>
                    <Box
                        display="grid"
                        gap="30px" m="40px 20px 20px 20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <DatePicker
                            name="fecha"
                            label="Elegí una fecha"
                            value={selectedDateValue}
                            onChange={(e) => { setSelectedDateValue(e ? dayjs(e).toDate() : ''); setFieldValue("fecha", e ? dayjs(e).toDate() : '') }}
                            defaultValue={dayjs()}
                            minDate={dayjs()}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="extra">Estado del turno</InputLabel>
                            <Select
                                id="extra"
                                name="extra"
                                label="Estado del turno"
                                value={extra}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setExtra(value);
                                    setFieldValue("extra", value);
                                }}
                                sx={{ gridColumn: "span 1" }}
                            >
                                <MenuItem value={1}>Activo</MenuItem>
                                <MenuItem value={2}>Pendiente</MenuItem>
                                <MenuItem value={3}>Pospuesto</MenuItem>
                                <MenuItem value={4}>Finalizado</MenuItem>
                                <MenuItem value={5}>Cancelado</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="outlined"
                            label="Seña"
                            onChange={
                                (e) => {
                                    const value = e.target.value;
                                    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                                        setSena(value);
                                        setFieldValue("sena", value);
                                    }
                                }
                            }
                            value={sena}
                            name="sena"
                            helperText="Sólo admite números"
                            InputProps={{
                                inputMode: "decimal", pattern: "[0-9]*",
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                            sx={{ gridColumn: "span 1" }}
                        />

                        <Autocomplete
                            options={clientes}
                            getOptionLabel={(option) => option.nombre || ""}
                            onInputChange={(event, value) => {
                                if (value) {
                                    debouncedSearchClienFunc(value, setClientes);
                                } else {
                                    setClientes([]);
                                }
                            }}
                            onChange={(event, value) => {
                                setSelectedClienID(value?._id || "");
                                setFieldValue("id_cliente", value?._id || ""); // Synchronize with Formik
                            }}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            renderInput={(params) => (
                                <TextField {...params} label="Buscá un cliente" variant="outlined" />
                            )}
                            renderOption={(props, option) => (
                                <Box {...props} key={option._id}>
                                    {option.nombre}
                                </Box>
                            )}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <Autocomplete
                            options={productos}
                            getOptionLabel={(option) => option.nombre || ""}
                            onInputChange={(event, value) => {
                                if (value) {
                                    debouncedSearchProdFunc(value, setProductos);
                                } else {
                                    setProductos([]);
                                }
                            }}
                            onChange={(event, value) => {
                                setSelectedProdID(value?._id || "");
                                setFieldValue("id_producto", value?._id || ""); // Synchronize with Formik
                            }}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            renderInput={(params) => (
                                <TextField {...params} label="Elegí  un producto" variant="outlined" />
                            )}
                            renderOption={(props, option) => (
                                <Box {...props} key={option._id}>
                                    {option.nombre}
                                </Box>
                            )}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Detalles"
                            multiline
                            onChange={handleChange}
                            value={values.detalle}
                            name="detalle"
                            error={!!touched.detalle && !!errors.detalle}
                            helperText={touched.detalle && errors.detalle}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Observaciones"
                            multiline
                            onChange={handleChange}
                            value={values.observacion}
                            name="observacion"
                            error={!!touched.observacion && !!errors.observacion}
                            helperText={touched.observacion && errors.observacion}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <Box display="flex" justifyContent="end" mt="20px">
                            <IconButton color="primary" onClick={() => handleClear(resetForm)}>
                                <CleaningServicesIcon />
                            </IconButton>
                            <Button variant="outlined" onClick={() => handleDelete()} startIcon={<DeleteOutlinedIcon />}>Eliminar</Button>
                            <Button type="submit" color="primary" variant="contained" startIcon={<SaveOutlinedIcon />}>Guardar</Button>
                        </Box>
                    </Box>
                    <FormObserver turno={turno} />
                </form>
            )
            }
        </Formik >
    );
};

export default UpdateTurnoForm;
