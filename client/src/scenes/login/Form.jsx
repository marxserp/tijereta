import { useState } from "react";
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
import FlexBetween from "../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { signIn, signUp } from "../../actions/auth";

// Restricciones
const registerSchema = yup.object().shape({
  nombre: yup.string().required("Obligatorio"),
  apellido: yup.string().required("Obligatorio"),
  correo: yup.string().email("Correo inválido").required("Obligatorio"),
  contrasena: yup.string().required("Obligatorio"),
});

const loginSchema = yup.object().shape({
  correo: yup.string().email("Correo inválido").required("Obligatorio"),
  contrasena: yup.string().required("Obligatorio"),
});

// Inicialización valores por defecto
const initialValuesRegister = {
  nombre: "",
  apellido: "",
  correo: "",
  contrasena: "",
};

const initialValuesLogin = {
  correo: "",
  contrasena: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageType, setPageType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) dispatch(signIn(values, navigate));
    if (isRegister) dispatch(signUp(values, navigate));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
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
            {isRegister && (
              <>
                <TextField
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nombre}
                  name="nombre"
                  error={Boolean(touched.nombre) && Boolean(errors.nombre)}
                  helperText={touched.nombre && errors.nombre}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apellido}
                  name="apellido"
                  error={Boolean(touched.apellido) && Boolean(errors.apellido)}
                  helperText={touched.apellido && errors.apellido}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}

            <TextField
              label="Correo"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.correo}
              name="correo"
              error={Boolean(touched.correo) && Boolean(errors.correo)}
              helperText={touched.correo && errors.correo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contrasena}
              name="contrasena"
              error={Boolean(touched.contrasena) && Boolean(errors.contrasena)}
              helperText={touched.contrasena && errors.contrasena}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Si no tenés cuenta, creá una acá."
                : "¿Ya tenés una cuenta? Iniciá sesión acá."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
