import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state";

import {
  Box,
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
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Formik } from "formik";
import * as yup from "yup";
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

  const getTurnos = async () => {
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
  };

  const eliminarTurno = async (values, onSubmitProps) => {
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
  };

  useEffect(() => {
    dispatch(setTurnos({ turnos: [] }));
    getTurnos();
  }, []);

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
          <Box display="flex" columnGap="8px" rowGap="8px">
            <Formik></Formik>
            <FormControl fullWidth>
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
            </FormControl>
          </Box>
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
