import { useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from "@mui/material";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ClienteList from "./ClienteList";
import SingleClientePane from "./SingleClientePane";
import AddClienteForm from "./AddClienteForm";

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentID, setCurrentID] = useState(0);
  return (
    <Box position="relative" display="flex" justifyContent="center" height="91vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Clientes</Typography>
          <Link to={"/clientes/nuevo"}>
            <Button variant="contained" startIcon={<PersonAddOutlinedIcon />}>
              Nuevo cliente
            </Button>
          </Link>
        </Box>

        <Box display="flex" flex="1" justifyContent="space-around" overflow="auto">
          <Box flexBasis="55%" overflow="auto">
            <ClienteList setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="45%" overflow="auto">
            <SingleClientePane currentID={currentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Clientes;
