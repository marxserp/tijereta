import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state/turnos";
import { createTurno, updateTurno } from "../../api";

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
  InputLabel,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery"
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
  fecha: dayjs().format('DD-MM-YYYY'),
  id_cliente: "",
  id_procedimiento: "",
  detalle: "",
  sena: 0,
  observacion: "",
  estado: 1,
  extra: 1,
};

const AdminTurnos = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const _id = useSelector((state) => state.auth.usuario._id);

  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );
  const { procedimientos } = useSelector((state) => state.procedimientos);
  const { clientes } = useSelector((state) => state.clientes);
  const [selectedProcID, setSelectedProcID] = useState("");
  const [selectedClienID, setSelectedClienID] = useState("");
  const [selectedDateValue, setSelectedDateValue] = useState(dayjs().format('DD-MM-YYYY'));

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("Log1 from handleFromSubmit", values);
    const formData = new URLSearchParams(values);
    formData.append("usuario", _id);
    console.log("Log2 from handleFromSubmit", formData);
    dispatch(createTurno(formData));

    /*if (currentID === 0 || currentID === null) {
      dispatch(createTurno(formData));
    } else {
      dispatch(updateTurno(currentID, formData));
    }*/
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
        setFieldValue
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
            <DatePicker
              name="fecha"
              label="Elegí una fecha"
              value={selectedDateValue}
              onChange={(e) => setFieldValue("fecha", e ? dayjs(e).toDate() : '')}
              defaultValue={dayjs().format('DD-MM-YYYY')}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="clienteLabel">Elegí un cliente</InputLabel>
              <Select
                name="id_cliente"
                value={selectedClienID}
                label="Elegí un cliente"
                onChange={(e) => setFieldValue("id_cliente", e.target.value)}>
                {clientes.map((cliente) => (
                  <MenuItem value={cliente._id}>
                    <Typography>{cliente.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="productoLabel">Elegí un producto</InputLabel>

              <Select
                name="id_procedimiento"
                value={selectedProcID}
                label="Elegí un producto"
                onChange={(e) => setFieldValue("id_procedimiento", e.target.value)}
                sx={{ gridColumn: "span 4" }}>
                {procedimientos.map((procedimiento) => (
                  <MenuItem value={procedimiento._id}>
                    <Typography>{procedimiento.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

          </Box>
          <Box display="flex" justifyContent="end" mt="20px" columnGap="6px">
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

export default AdminTurnos;
