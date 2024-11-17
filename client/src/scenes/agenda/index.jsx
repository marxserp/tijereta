import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state/turnos";

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
// import SideContent from "./SideContent";
import AddTurnoForm from "./AddTurnoForm";
import TurnoAgenda from "./TurnoAgenda";
import Sidebar from "../../components/Sidebar";

const Agenda = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [turnoId, setTurnoId] = useState(0);
  const [currentID, setCurrentID] = useState(0);

  return (
    <Box position="relative" display="flex" justifyContent="center">
      <Sidebar isSidebar={isSidebar} />
      <Box width="100%" m="20px">
        <Header
          title="Calendario"
          subtitle="Cronograma con todos los eventos y sus estados."
        />
        <Box
          width="100%"
          padding="0.6rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box flexBasis="38%" mr="2rem">
            <AddTurnoForm currentID={currentID} setCurrentID={setCurrentID} turno={turnoId} />
          </Box>
          <Box flexBasis="60%">
            <TurnoAgenda setCurrentID={setCurrentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Agenda;
