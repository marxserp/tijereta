import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Box, Button, IconButton, Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

import { createCliente } from "../../state/clientes";

const valueValidation = yup.object().shape({
  nombre: yup.string().required("Campo obligatorio"),
  apellido: yup.string(),
  correo: yup.string().email("Formato de correo no válido"),
  contacto: yup.number("Solo se admiten números").required("Campo obligatorio").positive("Caracteres inválidos").integer("Caracteres inválidos"),
  
  direccion: yup.string(),
  observacion: yup.string(),
});

const initialValues = {
  nombre: "",
  apellido: "",
  correo: "",
  contacto: "",
  fechaNacimiento: dayjs(),
  direccion: "",
  observacion: "",
};

const AddClienteForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = useSelector((state) => state.auth.usuario._id);
  // const token = useSelector((state) => state.auth.token);

  const [nombreValue, setNombreValue] = useState("");
  const [apellidoValue, setApellidoValue] = useState("");
  const [correoValue, setCorreoValue] = useState("");
  const [contactoValue, setContactoValue] = useState("");
  const [fechaNacValue, setFechaNacValue] = useState(dayjs());
  const [direccionValue, setDireccionValue] = useState("");
  const [observacionValue, setObservacionValue] = useState("");

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
      dispatch(createCliente(formData));
      setNombreValue("");
      setApellidoValue("");
      setCorreoValue("");
      setContactoValue("");
      setDireccionValue("");
      setObservacionValue("");
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  const handleClear = (resetForm) => {
    setNombreValue("");
    setApellidoValue("");
    setCorreoValue("");
    setContactoValue("");
    setDireccionValue("");
    setObservacionValue("");
    setFechaNacValue(dayjs());
    resetForm();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue, }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="start" alignItems="center" m="20px 10px 10px 10px">
            <Tooltip title="Volver">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h2" fontWeight="bold">Nuevo cliente</Typography>
          </Box>
          <Box
            display="grid"
            gap="30px" m="40px 20px 20px 20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              size="small"
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
              size="small"
              variant="outlined"
              type="text"
              label="Apellido"
              onBlur={handleBlur}
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
              size="small"
              variant="outlined"
              type="text"
              label="Número de contacto"
              onBlur={handleBlur}
              value={contactoValue}
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setContactoValue(e.target.value);
                    setFieldValue("contacto", e.target.value);
                  }
                }
              }
              name="contacto"
              error={!!touched.contacto && !!errors.contacto}
              helperText={touched.contacto && errors.contacto}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              size="small"
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
              sx={{ gridColumn: "span 2" }}
            />
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              label="Fecha de nacimiento"
              value={fechaNacValue}
              onChange={(e) => { setFechaNacValue(e ? dayjs(e).toDate() : ''); setFieldValue("fechaNacimiento", e ? dayjs(e).toDate() : '') }}
              name="fechaNacimiento"
              defaultValue={dayjs()}
              minDate={dayjs("01/01/1900")}
              maxDate={dayjs()}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Domicilio del cliente"
              onBlur={handleBlur}
              value={direccionValue}
              onChange={(e) => {
                setDireccionValue(e.target.value);
                setFieldValue("direccion", e.target.value);
              }}
              name="direccion"
              error={!!touched.direccion && !!errors.direccion}
              helperText={touched.direccion && errors.direccion}
              sx={{ gridColumn: "span 3" }}
            />
            <TextField
              size="small"
              multiline
              variant="outlined"
              type="text"
              label="Observarciones"
              onBlur={handleBlur}
              value={observacionValue}
              onChange={(e) => {
                setObservacionValue(e.target.value);
                setFieldValue("observacion", e.target.value);
              }}
              name="observacion"
              error={!!touched.observacion && !!errors.observacion}
              helperText={touched.observacion && errors.observacion}
              sx={{ gridColumn: "span 4" }}
            />
            <Box display="flex" justifyContent="start" mt="20px" columnGap="6px">
              <Button type="submit" color="primary" variant="contained" startIcon={<SaveOutlinedIcon />}>
                Crear cliente
              </Button>
              <Tooltip title="Limpiar todos los campos">
                <IconButton color="primary" onClick={() => handleClear(resetForm)}>
                  <CleaningServicesIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AddClienteForm;
