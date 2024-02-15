import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import {
  createProcedimiento,
  updateProcedimiento,
} from "../../state/procedimientos";

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

let customValues = {
  nombre: "",
  duracion: 1,
  precio: 100,
};

function Form() {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      duracion: 1,
      precio: 100,
    },
  });
}

const AdminProcedimientos = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.usuario);
  let procedimiento = useSelector((state) =>
    currentID
      ? state.procedimientos.procedimientos.find((p) => p._id === currentID)
      : null
  );

  if (procedimiento) {
    customValues.nombre = procedimiento.nombre;
    customValues.duracion = procedimiento.duracion;
    customValues.precio = procedimiento.precio;
  }

  const clearForm = () => {
    for (let clave in customValues) {
      customValues[clave] = null;
    }
    procedimiento = null;
    setCurrentID(0);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new URLSearchParams(values);
      console.log("Log from handleFormSubmit>values", values);
      formData.append("usuario", _id);
      if (!currentID || currentID === 0) {
        dispatch(createProcedimiento(formData));
      } else {
        dispatch(updateProcedimiento(currentID, formData));
        console.log(
          "Log from handleFormSubmit>currentID+formData",
          currentID,
          formData
        );
      }
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={customValues || initialValues}
        validationSchema={valueValidation}
        enableReinitialize
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
              <Button
                variant="text"
                onClick={() => {
                  resetForm;
                  clearForm();
                }}
              >
                Limpiar todo
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Guardar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminProcedimientos;
