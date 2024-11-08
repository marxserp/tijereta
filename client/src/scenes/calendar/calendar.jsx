import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTurno, updateTurno } from "../../api";
import { fetchAllClientes } from "../../state/clientes";
import { fetchAllProcedimientos } from "../../state/procedimientos";
import { fetchAllTurnos } from "../../state/turnos";

import {
  Box,
  Button,
  TextField,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { Formik, useFormikContext } from "formik";
import * as yup from "yup";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";

import { tokens } from "../../theme";

import Header from "../../components/Header";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const dispatch = useDispatch();
  const turnos = useSelector((state) => state.turnos);
  const token = useSelector((state) => state.token);
  const { procedimientos } = useSelector((state) => state.procedimientos);
  const { clientes } = useSelector((state) => state.clientes);
  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
);
  const [selectedProcedimientoId, setSelectedProcedimientoId] = useState("");
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [dateValue, setDateValue] = useState(dayjs());

  useEffect(() => {
    dispatch(fetchAllClientes());
    dispatch(fetchAllProcedimientos());
  }, []);

  /* const getTurnos = async () => {
    try {
      const response = await fetch("http://localhost:8080/turnos", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setTurnos({ turnos: data }));
      } else {
        console.error(
          "Error durante la carga de turnos: ",
          response.statusText
        );
      }
    } catch (error) {
      console.log("Error al cargar turnos: ", error);
    }
  }; */

  /* const eliminarTurno = async (values, onSubmitProps) => {
    const formData = URLSearchParams(values);
    try {
      const response = await fetch("http://localhost:8080/turnos", {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });
      if (response.ok) {
        onSubmitProps.resetForm();
      } else {
        console.log("Error eliminando turno: ", response.statusText);
      }
    } catch (error) {
      console.log("Error al eliminar turno: ", error);
    }
  }; */

  /* useEffect(() => {
    dispatch(setTurnos({ turnos: [] }));
    getTurnos();
  }, []); */

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
  
  const handleDateClick = (selected) => {
    const title = prompt("Ingresar título del nuevo evento");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  
  const handleEventClick = (selected) => {
    if (window.confirm(`¿Eliminar evento? '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };
  
  const handleFormSubmit = async (values, onSubmitProps) => {  
    const formData = new URLSearchParams(values);
    if (currentID === 0 || currentID === null) {
      dispatch(createTurno(formData));
    } else {
      dispatch(updateTurno(currentID, formData));
    }
    // clearForm();
  }

  const handleProcedimientoSelectChange = (event) => {
    setSelectedProcedimientoId(event.target.value);
  }

  const handleClienteSelectChange = (event) => {
    setSelectedClienteId(event.target.value);
  }
  
  return (
    <Box m="20px">
      <Header
        title="Calendario"
        subtitle="Cronograma con todos los eventos y sus estados"
      />

      <Box Boxdisplay="flex" justifyContent="space-between">
        {/* Barra lateral */}
        <Box
          flex="1 1 32%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >

          <Typography variant="h5" mt="20px">
            Próximos
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "6px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
        display="grid"
        gap="12px">
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
            }) => (<form>
              <DatePicker value={dateValue} onChange={(e) => setDateValue(e)} defaultValue={dayjs()} />

              <Select name="Procediminento" value="Procedimiento nombre" sx={{ gridColumn: "span 4" }} onChange={handleProcedimientoSelectChange} label="Elegir producto">
                {procedimientos.map((procedimiento) => (
                  // Selección procedimientos con estado controlado. Cada cambio actualiza el estado; valor estado se envía en formData
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

              <Select name="Cliente" value="Cliente" sx={{ gridColumn: "span 4" }} onChange={handleClienteSelectChange} label="Elegir cliente">
                {clientes.map((cliente) => (
                  <MenuItem value={cliente._id}>
                    <Typography>{cliente.nombre}</Typography>
                  </MenuItem>
                ))}
              </Select>

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

              <Box display="flex" justifyContent="end" mt="20px" columnGap="6px">
                <Button variant="text" onClick={resetForm}>
                  Limpiar todo
                </Button>
                <Button type="submit" color="secondary" variant="contained">
                  Guardar
                </Button>
              </Box>

            </form>)}
          </Formik>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="70vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
