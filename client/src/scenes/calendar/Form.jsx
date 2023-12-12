import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state";

import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const valueValidation = yup.object().shape({
  fecha: yup.string(),
  proc1: yup.string(),
  proc2: yup.string().email("invalid email"),
  detalle: yup.string(),
  observacion: yup.string(),
});
const initialValues = {
  fecha: "",
  proc1: "",
  proc2: "",
  detalle: "",
  observacion: "",
};

const Form = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = () => {};

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
            <DatePicker defaultValue={dayjs("2022-04-17")} />

            <Select value="Procedimiento nombre" name="Procediminento">
              <MenuItem value="Proc1">
                <Typography>Proc1</Typography>
              </MenuItem>
              <MenuItem value="Proc2">
                <Typography>Proc2</Typography>
              </MenuItem>
            </Select>

            <Select value="Procedimiento nombre2" name="Procediminento Adic">
              <MenuItem value="Proc1">
                <Typography>Proc1</Typography>
              </MenuItem>
              <MenuItem value="Proc2">
                <Typography>Proc2</Typography>
              </MenuItem>
            </Select>

            {/* CLIENT PICKER */}
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Nombre"
              name="nombre"
            />
            <Button variant="outlined">Limpiar</Button>
            <Button variant="outlined">Eliminar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
