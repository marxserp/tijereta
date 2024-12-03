import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createProducto } from "../../state/productos";

import { Typography, Box, Button, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Formik } from "formik";
import * as yup from "yup";

const valueValidation = yup.object().shape({
  nombre: yup.string().max(70, "Nombre demasiado largo").required("Producto debe llevar un nombre"),
  duracion: yup.number("Usar sólo números mayores que 0").required("Duración no puede estar vacío").integer(),
  detalle: yup.string().max(200, "Detalle no debe tener más de 200 caracteres"),
  precio: yup.number("Usar sólo números mayores que 0").required("Precio no puede estar vacío"),
  promo: yup.number("Usar sólo números mayores que 0").required("Precio no puede estar vacío"),
});
const initialValues = {
  nombre: "",
  duracion: 0,
  detalle: "",
  precio: 0,
  promo: 0,
};

const AddProductoForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = useSelector((state) => state.auth.usuario._id);
  const token = useSelector((state) => state.auth.token);

  const [nombreValue, setNombreValue] = useState("");
  const [duracionValue, setDuracionValue] = useState(0);
  const [detalleValue, setDetalleValue] = useState("");
  const [precioValue, setPrecioValue] = useState(0);
  const [promoValue, setPromoValue] = useState(0);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
      dispatch(createProducto(formData));
      setNombreValue("");
      setDuracionValue(0);
      setDetalleValue("");
      setPrecioValue(0);
      setPromoValue(0);
      navigate("/productos");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  const handleClear = (resetForm) => {
    setNombreValue("");
    setDetalleValue("");
    setDuracionValue(0);
    setPrecioValue(0);
    setPromoValue(0);
    resetForm();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={valueValidation}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue, }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="start" alignItems="center" m="20px 10px 10px 10px">
            <Tooltip title="Volver">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h2" fontWeight="bold">Nuevo producto</Typography>
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
              label="Duración"
              onBlur={handleBlur}
              value={duracionValue}
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setDuracionValue(e.target.value);
                    setFieldValue("duracion", e.target.value);
                  }
                }
              }
              name="duracion"
              error={!!touched.duracion && !!errors.duracion}
              helperText={touched.duracion && errors.duracion}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Precio"
              onBlur={handleBlur}
              value={precioValue}
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setPrecioValue(e.target.value);
                    setFieldValue("precio", e.target.value);
                  }
                }
              }
              name="precio"
              error={!!touched.precio && !!errors.precio}
              helperText={touched.precio && errors.precio}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Promoción"
              onBlur={handleBlur}
              value={promoValue}
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setPromoValue(e.target.value);
                    setFieldValue("promo", e.target.value);
                  }
                }
              }
              name="promo"
              error={!!touched.promo && !!errors.promo}
              helperText={touched.promo && errors.promo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              size="small"
              multiline
              variant="outlined"
              type="text"
              label="Detalles"
              onBlur={handleBlur}
              value={detalleValue}
              onChange={(e) => {
                setDetalleValue(e.target.value);
                setFieldValue("detalle", e.target.value);
              }}
              name="detalle"
              error={!!touched.detalle && !!errors.detalle}
              helperText={touched.detalle && errors.detalle}
              sx={{ gridColumn: "span 3" }}
            />
            <Box display="flex" justifyContent="start" mt="20px" columnGap="6px">
              <Button type="submit" color="primary" variant="contained" startIcon={<SaveOutlinedIcon />}>
                Crear producto
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

export default AddProductoForm;
