import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { selectClienteById, updateCliente, deleteCliente } from "../../state/clientes";

import { Box, Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const valueValidation = yup.object().shape({
    nombre: yup.string().required("Campo obligatorio"),
    apellido: yup.string(),
    correo: yup.string().email("Formato de correo no válido"),
    contacto: yup.number("Solo se admiten números").required("Campo obligatorio"),
});

const initialValues = {
    nombre: "",
    apellido: "",
    correo: "",
    contacto: "",
};

const FormObserver = ({ cliente }) => {
    const { setValues } = useFormikContext();
    useEffect(() => {
        if (cliente) {
            setValues({
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                correo: cliente.correo,
                contacto: Number(cliente.contacto),
            });
        }
    }, [cliente, setValues]);
    return null;
};

const UpdateClienteForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { clienteID } = useParams();
    const cliente = useSelector((state) => selectClienteById(state, clienteID));
    // const token = useSelector((state) => state.auth.token);
    const _id = useSelector((state) => state.auth.usuario._id);

    // Define estado local para elemntos controlados del formulario
    const [nombreValue, setNombreValue] = useState(cliente?.nombre);
    const [apellidoValue, setApellidoValue] = useState(cliente?.apellido);
    const [correoValue, setCorreoValue] = useState(cliente?.correo);
    const [contactoValue, setContactoValue] = useState(cliente?.contacto);
    const [estadoValue, setEstadoValue] = useState(cliente?.estado);

    // Directamente devuelve página en blanco si no hay cliente
    if (!clienteID) {
        return (
            <Box display="flex" justifyContent="center">
                <Typography p="20px" variant="body2" wrap>No se encontró cliente, puede que haya sido borrado o eliminado.</Typography>
            </Box>
        )
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const formData = new URLSearchParams(values);
            formData.append("usuario", _id);
            dispatch(updateCliente({ id: clienteID, cliente: formData }));

            setNombreValue("");
            setApellidoValue("");
            setCorreoValue("");
            setContactoValue("");
            setEstadoValue(1);
            navigate(`/clientes/${clienteID}`);
        } catch (error) {
            console.log(error);
        } finally {
            // Implementar estado de app en almacén
            console.log("finally");
        }
    };

    const handleDelete = async () => {
        try {
            if (clienteID !== 0 && clienteID !== null) {
                dispatch(deleteCliente(clienteID));

                setNombreValue("");
                setApellidoValue("");
                setCorreoValue("");
                setContactoValue("");
                setEstadoValue(1);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log("finally");
        }
    };

    // Copia de handleSubmit(update) donde solo setea estado a 0 y redirecciona a clientes/index.jsx
    const handleRemove = async (values, onSubmitProps) => {
        try {
            if (clienteID !== 0 && clienteID !== null) {
                const formData = new URLSearchParams(values);
                formData.append("usuario", _id);
                dispatch(updateCliente({ id: clienteID, cliente: formData }));

                setNombreValue("");
                setApellidoValue("");
                setCorreoValue("");
                setContactoValue("");
                setEstadoValue(1);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log("finally");
        }
    }

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
                        m="20px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
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
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Apellido"
                            onBlur={handleBlur}
                            value={apellidoValue}
                            onChange={(e) => {
                                setApellidoValue(e.target.value);
                                setFieldValue("apellido", e.target.value);
                            }}
                            name="apellido"
                            error={!!touched.apellido && !!errors.apellido}
                            helperText={touched.apellido && errors.apellido}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Correo electrónico"
                            onBlur={handleBlur}
                            value={correoValue}
                            onChange={(e) => {
                                setCorreoValue(e.target.value);
                                setFieldValue("correo", e.target.value);
                            }}
                            name="correo"
                            error={!!touched.correo && !!errors.correo}
                            helperText={touched.correo && errors.correo}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Número de contacto"
                            onBlur={handleBlur}
                            value={contactoValue}
                            onChange={(e) => {
                                setContactoValue(e.target.value);
                                setFieldValue("contacto", e.target.value);
                            }}
                            name="contacto"
                            error={!!touched.contacto && !!errors.contacto}
                            helperText={touched.contacto && errors.contacto}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <Button variant="text" startIcon={<DeleteForeverOutlinedIcon />} onClick={() => handleDelete()}>
                            Eliminar permanentemente
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="space-around" mt="20px">
                        <Box>
                            <IconButton aria-label="limpiar formulario" onClick={resetForm}>
                                <CleaningServicesOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Button
                                variant="text"
                                onClick={() => {
                                    setEstadoValue(0);
                                    setFieldValue("estado", estadoValue);
                                    handleRemove();
                                }}
                            >
                                Borrar
                            </Button>
                            <Button type="submit" color="secondary" variant="contained" startIcon={<SaveAsOutlinedIcon />}>
                                Modificar
                            </Button>
                        </Box>
                    </Box>
                    <FormObserver cliente={cliente} />
                </form>
            )}
        </Formik>
    );
};

export default UpdateClienteForm;
