import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createProcedimiento } from "../../state/procedimientos";
import { createProcedimiento, updateProcedimiento, } from "../../api";

import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { Formik, useFormikContext, } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"

const valueValidation = yup.object().shape({
  nombre: yup.string().required("Obligatorio"),
  duracion: yup.number().required("Obligatorio").positive(),
  precio: yup.number().required("Obligatorio").positive().integer(),
});

const initialValues = {
  nombre: "",
  duracion: 1,
  precio: 100,
};

const FormObserver = ({procedimiento}) => {
  const {setValues} = useFormikContext();
  useEffect(()=> {
    if (procedimiento) {
      setValues({
        nombre: procedimiento.nombre,
        duracion: procedimiento.duracion,
        precio: procedimiento.precio,
      });
  }
}, [procedimiento, setValues]);
  return null
};

const AdminProcedimientos = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const _id = useSelector((state) => state.auth.usuario._id);
  const token = useSelector((state) => state.auth.token);
  const procedimiento = useSelector((state) =>
    currentID ? state.procedimientos.procedimientos.find((procedimiento) => procedimiento._id === currentID) : null
);
// const [formValues, setFormValues] = useState(null);

const handleFormSubmit = async (values, onSubmitProps) => {
  const formData = new URLSearchParams(values);
  formData.append("usuario", _id);
  if (currentID === 0 || currentID === null) {
    dispatch(createProcedimiento(formData));
  } else {
    dispatch(updateProcedimiento(currentID, formData));
  }
  // clearForm();
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
            onChange={handleChange}
            value={values.nombre}
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
            onChange={handleChange}
            value={values.duracion}
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
            onChange={handleChange}
            value={values.precio}
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
          <Button type="submit" color="secondary" variant="contained">
            Guardar
          </Button>
        </Box>
        <FormObserver procedimiento={procedimiento}/>
      </form>
    )}
  </Formik>
  );
};

export default AdminProcedimientos;
