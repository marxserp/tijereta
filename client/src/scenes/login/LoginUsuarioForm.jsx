import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";

import { logIn } from "./../../state/auth";

const loginSchema = yup.object().shape({
  correo: yup.string().email("Formato de correo no válido.").required("Debés indicar una dirección de correo."),
  contrasena: yup.string().required("La contraseña es obligatoria"),
});

const initialValuesLogin = {
  correo: "",
  contrasena: "",
};

const LoginUsuarioForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [correoValue, setCorreoValue] = useState("");
  const [contrasenaValue, setContrasenaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    try {
      await dispatch(logIn(values));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Correo"
              onBlur={handleBlur}
              value={correoValue}
              onChange={(e) => {
                setCorreoValue(e.target.value);
                setFieldValue("correo", e.target.value);
              }}
              name="correo"
              error={Boolean(touched.correo) && Boolean(errors.correo)}
              helperText={touched.correo && errors.correo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              value={contrasenaValue}
              onChange={(e) => {
                setContrasenaValue(e.target.value);
                setFieldValue("contrasena", e.target.value);
              }}
              name="contrasena"
              error={Boolean(touched.contrasena) && Boolean(errors.contrasena)}
              helperText={touched.contrasena && errors.contrasena}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem"
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );

};

export default LoginUsuarioForm;