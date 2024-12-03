import { Typography, Box, TextField, Button, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import tijereta from "../../resources/tijeretaAlt.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "./../../state/auth";

const validationSchema = yup.object().shape({
  correo: yup.string().email("Correo inválido").required("Correo es requerido"),
  codigo: yup.string().required("Código es requerido"),
});

const initialValuesVerification = {
  correo: "",
  codigo: "",
};

const VerificateUsuarioForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const formData = new URLSearchParams(values)
    try {
      dispatch(verify(formData));
      if (window.confirm("Tu cuenta está siendo verificada. No debería tomar mucho, pero intentá iniciar sesión dentro de 10 minutos.")) {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100%" height="100vh"
      display="flex"
      flexDirection="column" justifyContent="center" alignItems="center"
    >
      <Box
        width="100%" p="1rem 6%"
        display="flex" flexDirection="column" alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <img src={tijereta} alt="Icono de la marca" height="60" />
          <Typography ml="10px" fontWeight="bold" variant="h1" color="primary">SIGUE</Typography>
        </Box>
        <Typography variant="subtitle1">
          Ingresá el código de verificación que se envió a tu correo
        </Typography>
        <Formik initialValues={initialValuesVerification} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm, }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px" mt="40px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4", width: isNonMobile ? "30vw" : "90vw" },
                }}
              >
                <TextField
                  size="large"
                  label="Correo"
                  onBlur={handleBlur}
                  value={values.correo}
                  onChange={(e) => setFieldValue("correo", e.target.value)}
                  name="correo"
                  error={Boolean(touched.correo) && Boolean(errors.correo)}
                  helperText={touched.correo && errors.correo}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  size="large"
                  variant="filled"
                  label="Código de verificación"
                  onBlur={handleBlur}
                  value={values.codigo}
                  onChange={(e) => setFieldValue("codigo", e.target.value)}
                  name="codigo"
                  error={Boolean(touched.codigo) && Boolean(errors.codigo)}
                  helperText={touched.codigo && errors.codigo}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    m: "1rem 0",
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );

};

export default VerificateUsuarioForm;