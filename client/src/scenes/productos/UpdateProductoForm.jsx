import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateProducto, deleteProducto, selectProductoById } from "../../state/productos";

import { Box, Button, IconButton, TextField, Typography, InputAdornment } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery"
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Formik, useFormikContext, } from "formik";
import * as yup from "yup";

const valueValidation = yup.object().shape({
    nombre: yup.string().required("Producto debe llevar un nombre."),
    duracion: yup.number("Usar sólo números mayores que 0.").required("Duración no puede estar vacío.").positive().integer(),
    precio: yup.number("Usar sólo números mayores que 0.").required("Precio no puede estar vacío").positive(),
});

const initialValues = {
    nombre: "",
    duracion: 0,
    precio: 0,
};

const FormObserver = ({ producto }) => {
    const { setValues } = useFormikContext();
    useEffect(() => {
        if (producto) {
            setValues({
                nombre: producto.nombre,
                duracion: producto.duracion,
                precio: producto.precio,
            });
        }
    }, [producto, setValues]);
    return null
};

const UpdateProductoForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productoID } = useParams();
    const producto = useSelector((state) => selectProductoById(state, productoID));
    // const token = useSelector((state) => state.auth.token);
    const _id = useSelector((state) => state.auth.usuario._id);

    const [nombreValue, setNombreValue] = useState(producto?.nombre);
    const [duracionValue, setDuracionValue] = useState(producto?.duracion);
    const [precioValue, setPrecioValue] = useState(producto?.precio);

    if (!productoID) {
        return (
            <Box display="flex" justifyContent="center">
                <Typography p="20px" variant="body2" wrap>No se encontró el producto, puede que haya sido borrado o eliminado.</Typography>
            </Box>
        );
    }

    const handleFormSubmit = async (values) => {
        try {
            const formData = new URLSearchParams(values);
            formData.append("usuario", _id);
            console.log("loggin formData from handleFormSubmit", formData);
            dispatch(updateProducto({ id: productoID, producto: formData }));

            setNombreValue("");
            setDuracionValue("");
            setPrecioValue("");
            navigate("/productos");
        } catch (error) {
            console.log(error);
        } finally {
            console.log("finally");
        }
    };

    const handleDelete = async () => {
        try {
            if (productoID !== 0 && productoID !== null) {
                dispatch(deleteProducto(productoID));
                setNombreValue("");
                setDuracionValue("");
                setPrecioValue("");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log("finally");
        }
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={valueValidation}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Nombre"
                            onBlur={handleBlur}
                            value={nombreValue}
                            onChange={(e) => {
                                setNombreValue(e.target.value);
                                setFieldValue("nombre", e.target.value);
                            }}
                            name="nombre"
                            error={!!touched.nombre && !!errors.nombre}
                            helperText={touched.nombre && errors.nombre}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Duración"
                            onBlur={handleBlur}
                            value={duracionValue}
                            onChange={(e) => {
                                setDuracionValue(e.target.value);
                                setFieldValue("duracion", e.target.value);
                            }}
                            name="duracion"
                            error={!!touched.duracion && !!errors.duracion}
                            helperText={touched.duracion && errors.duracion}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">min</InputAdornment>
                                ),
                            }}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Precio"
                            onBlur={handleBlur}
                            value={precioValue}
                            onChange={(e) => {
                                setPrecioValue(e.target.value);
                                setFieldValue("precio", e.target.value);
                            }}
                            name="precio"
                            error={!!touched.precio && !!errors.precio}
                            helperText={touched.precio && errors.precio}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-around" mt="20px">
                        <Box>
                            <IconButton aria-label="limpiar formulario" onClick={resetForm}>
                                <CleaningServicesOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Box>

                            <Button type="submit" color="secondary" variant="contained" startIcon={<SaveAsOutlinedIcon />}>
                                Guardar
                            </Button>
                        </Box>
                    </Box>
                    <FormObserver producto={producto} />
                </form>
            )}
        </Formik>
    );
};

export default UpdateProductoForm;