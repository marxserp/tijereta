import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { createCliente } from "../../actions/clientes";

const valueValidation = yup.object().shape({
  nombre: yup.string(),
  apellido: yup.string(),
  correo: yup.string().email("invalid email"),
  contacto: yup.string(),
});
const initialValues = {
  nombre: "",
  apellido: "",
  correo: "",
  contacto: "",
};

const AdminClientes = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  /* const post = useSelector((state) =>
    currentID ? state.posts.find((message) => message._id === currentID) : null
  ); */

  const handleFormSubmit = async (values, onSubmitProps) => {
    /* try {
      const savedClienteResponse = await fetch(
        "http://localhost:8080/clientes",
        {
          method: "POST",
          body: formData,
        }
        );
        if (savedClienteResponse.ok) {
          onSubmitProps.resetForm();
        } else {
          console.log("Error creando cliente: ", savedClienteResponse.statusText);
        }
      } catch (error) {
        console.log("Error al crear un cliente: ", error);
      } */
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
              value={values.firstName}
              name="nombre"
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Apellido"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="apellido"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Correo"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="correo"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Número de contacto"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact}
              name="contacto"
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
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
