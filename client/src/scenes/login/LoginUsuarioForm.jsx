import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import { logIn } from "./../../state/auth";

const loginSchema = yup.object().shape({
  correo: yup.string().email("Formato de correo no válido").required("Debés indicar una dirección de correo"),
  contrasena: yup.string().min(8, "La contraseña debe tener por lo menos 8 caracteres").required("La contraseña es obligatoria"),
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

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => { e.preventDefault(); };

  const handleFormSubmit = async (values) => {
    const formData = new URLSearchParams(values)

    try {
      await dispatch(logIn(formData));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin} validationSchema={loginSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px" mt="40px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}, }}
          >
            <TextField
              fullWidth
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
            <FormControl size="small" fullWidth sx={{ gridColumn: "span 4" }}>
              <InputLabel>Contraseña</InputLabel>
              <OutlinedInput
                id="contrasena"
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
              Iniciar sesión
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );

};

export default LoginUsuarioForm;