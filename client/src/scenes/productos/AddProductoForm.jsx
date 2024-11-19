import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createProducto } from "../../state/productos";

import { Box, Button, TextField, InputAdornment } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"

const valueValidation = yup.object().shape({
  nombre: yup.string().required("Producto debe llevar un nombre."),
  duracion: yup.number("Usar sólo números mayores que 0.").required("Duración no puede estar vacío.").positive().integer(),
  precio: yup.number("Usar sólo números mayores que 0.").required("Precio no puede estar vacío").positive(),
});

const initialValues = {
  nombre: "",
  duracion: 1,
  precio: 100,
};

const AddProductoForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = useSelector((state) => state.auth.usuario._id);
  const token = useSelector((state) => state.auth.token);

  const [nombreValue, setNombreValue] = useState("");
  const [duracionValue, setDuracionValue] = useState("");
  const [precioValue, setPrecioValue] = useState("");

  const handleFormSubmit = async (values) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
      dispatch(createProducto(formData));
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


  return (
    <Formik
      onSubmit={handleFormSubmit}
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
          <Box display="flex" justifyContent="end" mt="20px" columnGap="6px">
            <Button variant="text" onClick={resetForm}>
              Limpiar todo
            </Button>
            <Button type="submit" color="secondary" variant="contained" startIcon={<SaveOutlinedIcon />}>
              Guardar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AddProductoForm;
