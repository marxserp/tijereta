import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "./../../state/auth";

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const registerSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  apellido: yup.string().required("El apellido es obligatorio."),
  correo: yup.string().email("Formato de correo no válido.").required("Es necesario indicar una dirección de correo."),

});

const initialValuesRegister = {
  nombre: "",
  apellido: "",
  correo: "",
  contrasena: "",
  confirmarContrasena: "",
};

const RegisterUsuarioForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombreValue, setNombreValue] = useState("");
  const [apellidoValue, setApellidoValue] = useState("");
  const [correoValue, setCorreoValue] = useState("");
  const [contrasenaValue, setContrasenaValue] = useState("");
  const [confirmarContrasenaValue, setConfirmarContrasenaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => { e.preventDefault(); };

  const handleFormSubmit = async (values) => {
    const formData = new URLSearchParams(values)
    console.log("logging formData from HandleFormSubmit, register", formData);
    try {
      dispatch(signUp(formData));
      if (window.confirm("Vas a recibir en breve un código de verificación al correo provisto. Deberás ingresarlo en la siguiente página.")) {
        navigate("/autenticar");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesRegister} validationSchema={registerSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm, }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px" mt="40px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}
          >
            <TextField
              size="small"
              label="Nombre"
              onBlur={handleBlur}
              value={nombreValue}
              onChange={(e) => {
                setNombreValue(e.target.value);
                setFieldValue("nombre", e.target.value);
              }}
              name="nombre"
              error={Boolean(touched.nombre) && Boolean(errors.nombre)}
              helperText={touched.nombre && errors.nombre}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              size="small"
              label="Apellido"
              onBlur={handleBlur}
              value={apellidoValue}
              onChange={(e) => {
                setApellidoValue(e.target.value);
                setFieldValue("apellido", e.target.value);
              }}
              name="apellido"
              error={Boolean(touched.apellido) && Boolean(errors.apellido)}
              helperText={touched.apellido && errors.apellido}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              size="small"
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
            <FormControl size="small" sx={{ gridColumn: "span 4" }}>
              <InputLabel>Contraseña</InputLabel>
              <OutlinedInput
                id="contrasena"
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
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl size="small" sx={{ gridColumn: "span 4" }}>
              <InputLabel>Confirmar contraseña</InputLabel>
              <OutlinedInput
                id="contrasena"
                label="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                value={confirmarContrasenaValue}
                onChange={(e) => {
                  setConfirmarContrasenaValue(e.target.value);
                  setFieldValue("confirmarContrasena", e.target.value);
                }}
                name="confirmarContrasena"
                error={Boolean(touched.confirmarContrasena) && Boolean(errors.confirmarContrasena)}
                helperText={touched.confirmarContrasena && errors.confirmarContrasena}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
              Registrarse
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterUsuarioForm