import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos, createTurno, updateTurno, deleteTurno } from "../../state/turnos";
// import { createTurno, updateTurno } from "../../api";
import { isEqual } from 'lodash';

import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery"
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const valueValidation = yup.object().shape({
  detalle: yup.string().required(),
  sena: yup.number().required(),
  observacion: yup.string(),
});

const initialValues = {
  fecha: dayjs().format('DD-MM-YYYY'),
  id_cliente: "",
  id_producto: "",
  detalle: "",
  sena: 0,
  observacion: "",
  estado: 1,
  extra: 1,
};

const FormObserver = ({ turno }) => {
  const { setValues } = useFormikContext();
  const [previousTurno, setPreviousTurno] = useState(null);
  useEffect(() => {
    // Solo setea valores de Form si turno está definido Y es diferente a previousTurno
    if (turno && (turno && (!previousTurno || !isEqual(turno, previousTurno)))) {
      setValues({
        detalle: turno.detalle,
        sena: turno.sena,
        observacion: turno.observacion,
      });
      // Seguimiento de turno actual para evitar que se ejecute nuevamente
      setPreviousTurno(turno);
    }
    // Solo revisa turno y setValues para evitar bucle infinito
  }, [turno, setValues]);

  return null;
};

const AddTurnoForm = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const _id = useSelector((state) => state.auth.usuario._id);

  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );
  const { productos } = useSelector((state) => state.productos);
  const { clientes } = useSelector((state) => state.clientes);

  // Estado local que guarda id/fecha de elemento/fecha seleccionado
  const [selectedProdID, setSelectedProdID] = useState("");
  const [selectedClienID, setSelectedClienID] = useState("");
  const [selectedDateValue, setSelectedDateValue] = useState(dayjs().format('DD-MM-YYYY'));

  useEffect(() => {
    if (turno !== 0 && turno !== null) {
      console.log("Setting cliente and producto IDs, logging turno.fecha: ", turno.fecha)
      setSelectedDateValue(dayjs(turno.fecha).format('DD-MM-YYYY'));
      setSelectedClienID(turno.cliente);
      setSelectedProdID(turno.producto);
    }
  }, [turno]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new URLSearchParams(values);
    formData.append("usuario", _id);
    if (currentID === 0 || currentID === null) {
      console.log("loggin formData from turno handleFormSubmit", formData);
      dispatch(createTurno(formData));
    } else {
      dispatch(updateTurno(currentID, formData));
    };
  }

  const handleDelete = async () => {

    if (currentID !== 0 && currentID !== null) {
      dispatch(deleteTurno(currentID));
    }
    setCurrentID(0);
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
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
              onChange={(e) => setSelectedDateValue("fecha", e ? dayjs(e).toDate() : '')}
              defaultValue={dayjs().format('DD-MM-YYYY')}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="clienteLabel">Elegí un cliente</InputLabel>
              <Select
                name="id_cliente"
                value={selectedClienID}
                label="Elegí un cliente"
                onChange={(e) => setSelectedClienID("id_cliente", e.target.value)}>
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
                name="id_producto"
                value={selectedProdID}
                label="Elegí un producto"
                onChange={(e) => setSelectedProdID("id_producto", e.target.value)}
                sx={{ gridColumn: "span 4" }}>
                {productos.map((producto) => (
                  <MenuItem value={producto._id}>
                    <Typography>{producto.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Seña"

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
            <Button variant="text" onClick={() => { resetForm(); setCurrentID(0); }}>
              Limpiar todo
            </Button>
            <Button variant="text" onClick={() => handleDelete()}>Eliminar</Button>
            <Button type="submit" color="secondary" variant="contained">
              Guardar
            </Button>
          </Box>
          <FormObserver turno={turno} />
        </form>
      )}
    </Formik>
  );
};

export default AddTurnoForm;
