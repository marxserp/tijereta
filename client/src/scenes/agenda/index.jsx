import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { Box, Button, Typography, CircularProgress, useTheme } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from "../../theme";

import TurnoAgenda from "./TurnoAgenda";
import SingleTurnoPane from "./SingleTurnoPane";

const Agenda = () => {
  const { status } = useSelector((state) => state.turnos);
  const [turnoId, setTurnoId] = useState(0);
  const [currentID, setCurrentID] = useState(0);

  /* if (status === "loading") {
    console.log(status);
    return <CircularProgress />;
  }

  if (status === "failed") { return <Typography color="error">Failed to fetch data</Typography>; } */

  return (
    <Box position="relative" display="flex" justifyContent="center" height="92vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Agenda</Typography>
          <Link to={"/agenda/nuevo"}>
            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}>
              Nuevo turno
            </Button>
          </Link>
        </Box>

        <Box display="flex" flexGrow="1" justifyContent="space-around" height="90%">
          <Box flexBasis="60%">
            <TurnoAgenda setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="38%" display="flex" flexDirection="column" height="100%" overflow="hidden">
            <SingleTurnoPane currentID={currentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Agenda;
