import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { createProcedimiento } from "../../actions/procedimientos";

const valueValidation = yup.object().shape({
  nombre: yup.string().required("Obligatorio"),
  tipo: yup.string().required("Obligatorio"),
  duracion: yup.number().required("Obligatorio"),
});

const initialValues = {
  nombre: "",
  tipo: "",
  duracion: "",
};

const AdminProcedimientos = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  // const token = useSelector((state) => state.token);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new URLSearchParams(values);
    formData.append("usuario", _id);
    dispatch(createProcedimiento(formData));
  };

  return (
    <div>
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
                value={values.firstName}
                name="nombre"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Duración"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="duracion"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
                type="text"
                label="Precio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="precio"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
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
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminProcedimientos;
