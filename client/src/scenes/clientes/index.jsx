import { useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import AdminClientes from "./Form";
import ListaClientes from "./Grid";
import Sidebar from "../global/Sidebar";

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [currentID, setCurrentID] = useState(0);

  return (
    <Box position="relative" display="flex" justifyContent="center">
      <Sidebar isSidebar={isSidebar} />
      <Box width="100%" m="20px">
        <Header
          title="Clientes"
          subtitle="Adminstrá, creá, editá y borrá tus clientes."
        />
        <Box position="relative" display="flex" justifyContent="space-around">
          <Box flexBasis="30%">
            <AdminClientes currentID={currentID} setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="60%">
            <ListaClientes setCurrentID={setCurrentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Clientes;
