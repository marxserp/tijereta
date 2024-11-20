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

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "./../../state/auth";

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const registerSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  apellido: yup.string().required("El apellido es obligatorio."),
  correo: yup.string().email("Formato de correo no válido.").required("Es necesario indicar una dirección de correo."),
  contrasena: yup.string().matches(PASS_REGEX, "Contraseña inválida, la misma debe contener al menos un número, una letra mayúscula, una minúscula y un caracter especial.").required("Debés especificar una contraseña."),
  confirmarContrasena: yup
    .string()
    .oneOf([yup.ref("contrasena")], "Las contraseñas no coinciden.")
    .required("Debés confirmar la contraseña"),
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    try {
      await dispatch(signUp(values, navigate));
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
            }}>
            <TextField
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
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
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
              sx={{ gridColumn: "span 4" }}
            />
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
            <TextField
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
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem"
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