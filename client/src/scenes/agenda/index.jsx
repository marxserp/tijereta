import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setTurnos } from "../../state/turnos";

import { Box, Button, Typography, useTheme } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from "../../theme";

import TurnoAgenda from "./TurnoAgenda";
import ProximosTurnosList from "./ProximosTurnosList";

const Agenda = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [turnoId, setTurnoId] = useState(0);
  const [currentID, setCurrentID] = useState(0);

  return (
    <Box position="relative" display="flex" justifyContent="center" height="91vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Agenda</Typography>
          <Link to={"/agenda/nuevo"}>
            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}>
              Nuevo turno
            </Button>
          </Link>
        </Box>

        <Box display="flex" flexGrow="1" justifyContent="space-around" overflow="hidden" height="100%">
          <Box flexBasis="60%">
            <TurnoAgenda setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="38%" mr="2rem" overflow="auto">
            <ProximosTurnosList />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Agenda;
