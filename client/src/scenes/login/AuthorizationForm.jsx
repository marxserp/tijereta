import { Typography, Box, TextField, Button, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import tijereta from "../../resources/tijeretaAlt.png";
import { useDispatch } from "react-redux";
import { adm } from "../../services/api.js";

const registerSchema = yup.object().shape({
  correo: yup.string().email("Formato de correo no válido.").required("Es necesario indicar una dirección de correo."),
});
const initialValuesAuth = {
  correo: ""
};

const AuthorizationForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const handleFormSubmit = async (values) => {
    const formData = new URLSearchParams(values)
    try {
      //const formData = { correo: values.correo };
      const response = await dispatch(adm(formData)).unwrap();
      console.log("Auth success:", response);
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
        <Formik onSubmit={handleFormSubmit} validationSchema={registerSchema} initialValues={initialValuesAuth}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm, }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4", width: isNonMobile ? "30vw" : "90vw" },
                }}
              >
                <TextField
                  size="large"
                  variant="standard"
                  label="Correo"
                  onBlur={handleBlur}
                  value={values.correo}
                  onChange={(e) => setFieldValue("correo", e.target.value)}
                  name="correo"
                  error={Boolean(touched.correo) && Boolean(errors.correo)}
                  helperText={touched.correo && errors.correo}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    m: "1rem 0",
                  }}
                >
                  Confirmar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );

};
export default AuthorizationForm;