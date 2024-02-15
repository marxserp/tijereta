import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { createCliente } from "../../state/clientes";

const valueValidation = yup.object().shape({
  nombre: yup.string().required("Obligatorio"),
  apellido: yup.string(),
  correo: yup.string().required("Obligatorio").email("Correo no válido"),
  contacto: yup.string(),
});
const initialValues = {
  nombre: "",
  apellido: "",
  correo: "",
  contacto: "",
};

const AdminClientes = () => {
  // const AdminClientes = ({ currentID, setCurrentID }) => {
  /* const post = useSelector((state) =>
    currentID ? state.posts.find((message) => message._id === currentID) : null
  ); */
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new URLSearchParams(values);
    formData.append("usuario", _id);
    dispatch(createCliente(formData));
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
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Apellido"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.apellido}
              name="apellido"
              error={!!touched.apellido && !!errors.apellido}
              helperText={touched.apellido && errors.apellido}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Correo electrónico"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.correo}
              name="correo"
              error={!!touched.correo && !!errors.correo}
              helperText={touched.correo && errors.correo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Número de contacto"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contacto}
              name="contacto"
              error={!!touched.contacto && !!errors.contacto}
              helperText={touched.contacto && errors.contacto}
              sx={{ gridColumn: "span 4" }}
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
  );
};

export default AdminClientes;
