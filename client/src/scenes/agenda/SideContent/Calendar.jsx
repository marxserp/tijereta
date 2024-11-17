import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state";

import { Box, Typography, useTheme } from "@mui/material";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

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

const Calendar = () => {
  return (
    <Box flex="1 1 100%" ml="15px">
      <FullCalendar
        height="70vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
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
  );
};

export default Calendar;
