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
  fecha: yup.date().required(),
  id_cliente: yup.string().required(),
  id_procedimiento: yup.string().required(),
  detalle: yup.string().required(),
  sena: yup.number().required(),
  observacion: yup.string(),
  estado: yup.number().required(),
  extra: yup.number().required()
});

const initialValues = {
  fecha: dayjs(),
  id_cliente: "",
  id_procedimiento: "",
  detalle: "",
  sena: 0,
  observacion: "",
  estado: 1,
  extra: 1,
};

const Form = () => {
  const dispatch = useDispatch();

  const [selectedProcID, setSelectedProcID] = useState("");
  const [selectedClienID, setSelectedClienID] = useState("");
  const [selectedDateValue, setSelectedDateValue] = useState(dayjs());
  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new URLSearchParams(values);
    formData.append("usuario", _id);
    if (currentID === 0 || currentID === null) {
      dispatch(createTurno(formData));
    } else {
      dispatch(updateTurno(currentID, formData));
    }
  }

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
              <DatePicker value={selectedDateValue} onChange={(e) => setSelectedDateValue(e)} defaultValue={dayjs()} />

              <Select
                name="Cliente"
                value={selectedClienID}
                label="Elegí un cliente"
                onChange={(e) => setSelectedClienID(e)}
                sx={{ gridColumn: "span 4" }}>
                {clientes.map((cliente) => (
                  <MenuItem value={cliente._id}>
                    <Typography>{cliente.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>

              <Select
                name="Procedimiento"
                value={selectedProcID}
                label="Elegí un producto"
                onChange={(e) => setSelectedProcID(e)}
                sx={{ gridColumn: "span 4" }}>
                {procedimientos.map((procedimiento) => (
                  <MenuItem value={procedimiento._id}>
                    <Typography>{procedimiento.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Seña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sena}
                name="sena"
                error={!!touched.sena && !!errors.sena}
                helperText={touched.sena && errors.sena}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Detalles"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detalle}
                name="detalle"
                error={!!touched.detalle && !!errors.detalle}
                helperText={touched.detalle && errors.detalle}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Observaciones"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.observacion}
                name="observacion"
                error={!!touched.observacion && !!errors.observacion}
                helperText={touched.observacion && errors.observacion}
                sx={{ gridColumn: "span 4" }}
              />

              <Typography>Estado placeholder</Typography>
              <Typography>Extra placeholder</Typography>

              {/* CLIENT PICKER */}

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

  export default Form;
