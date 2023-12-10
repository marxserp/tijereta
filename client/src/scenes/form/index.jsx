import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useDispatch, useSelector } from "react-redux";

const checkoutSchema = yup.object().shape({
  nombre: yup.string(),
  apellido: yup.string(),
  correo: yup.string().email("invalid email"),
  contacto: yup
    .string(),
});
const initialValues = {
  nombre: "",
  apellido: "",
  correo: "",
  contacto: "",
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
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
      console.log("Error al crear un cliente: ",error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Nuevo cliente"
        subtitle="Cree un nuevo cliente para guardarlo en la base de datos"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Guardar cliente
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
