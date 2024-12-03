import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllTurnos } from "../../state/turnos";
import { getProductoNombreById } from "../../state/productos";

import { Box, useTheme } from "@mui/material";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { tokens } from "../../theme";

const TurnoAgenda = ({ setCurrentID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  // Estado local, guarda turnos en formato evento para Fullcalendar
  const [formattedTurnos, setFormattedTurnos] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { turnos } = useSelector((state) => state.turnos);
  const { productos } = useSelector((state) => state.productos);

  /*
  const [filtroProd, setFiltroProd] = useState("");
  const [filtroCli, setFiltroCli] = useState("");
  const cliFiltrados = useMemo(() => productos.filter((prod) => prod.startsWith(filtroProd), [filtroProd]));
  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );
 */

  const handleDateClick = (e) => {
    // Redirigir a AddTurnoForm
    const currentDate = new Date();
    if (new Date(e.start) >= currentDate) {
      navigate("/agenda/nuevo");
    }
  };

  const handleEventClick = (e) => {
    setCurrentID(e.event._def.publicId);
  };

  useEffect(() => {
    dispatch(fetchAllTurnos());
    // Si turno está declarado, mapea turnos a eventos, luego los setea a una const
    if (Array.isArray(turnos)) {
      const formatted = turnos.map((turno) => ({
        id: turno._id,
        title: getProductoNombreById(productos, turno.id_producto) || "Prod s/nombre",
        start: turno.fecha,
        extendedProps: {
          cliente: turno.id_cliente,
          detalle: turno.detalle,
          observacion: turno.observacion,
        }
      }));
      setFormattedTurnos(formatted);
    }
  }, []);

  return (
    <Box m="20px" height="100vh">
      <Box Boxdisplay="flex" justifyContent="space-between">
        <Box flex="1 1 100%">
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
            locale="es" 
            select={handleDateClick}
            eventClick={(e) => handleEventClick(e)}
            eventsSet={(events) => { if (events !== currentEvents) { setCurrentEvents(events) }; }}
            events={formattedTurnos}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TurnoAgenda;
