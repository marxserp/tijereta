import { useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import AddClienteForm from "./AddClienteForm";
import ClienteList from "./ClienteList";
import SingleClientePane from "./SingleClientePane";
import Sidebar from "../../components/Sidebar";

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [currentID, setCurrentID] = useState(0);

  /*
          <Box flexBasis="30%">
            <AddClienteForm currentID={currentID} setCurrentID={setCurrentID} />
          </Box>
  */

  return (
    <Box position="relative" display="flex" justifyContent="center">
      <Sidebar isSidebar={isSidebar} />
      <Box width="100%" m="20px">
        <Header title="Clientes" />
        <Box position="relative" display="flex" justifyContent="space-around">
          <Box flexBasis="60%">
            <ClienteList setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="40%">
            <SingleClientePane currentID={currentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Clientes;
