import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const dispatch = useDispatch();
  const {turnos} = useSelector((state) => state.turnos);

  /*
  const [filtroProc, setFiltroProc] = useState("");
  const [filtroCli, setFiltroCli] = useState("");
  const cliFiltrados = useMemo(() => procedimientos.filter((proc) => proc.startsWith(filtroProc), [filtroProc]));
  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );

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
 */

  useEffect(() => {
    dispatch(fetchAllClientes());
    dispatch(fetchAllProcedimientos());
    dispatch(fetchAllTurnos());
  }, []);


  const handleDateClick = (selected) => {
    const title = prompt("Ingresar título del nuevo evento");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    console.log("log from handledateclick", turnos);
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
    console.log("log from handleeventclick", turnos);
  };

  return (
    <Box m="20px">
      <Box Boxdisplay="flex" justifyContent="space-between">
        {/* Barra lateral */}
        <Box
          flex="1 1 32%"
          p="12px"
        >
          <Typography variant="h5">
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
            initialEvents={turnos}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
