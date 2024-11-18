import { useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import AddClienteForm from "./AddClienteForm";
import ClienteList from "./ClienteList";
import SingleClientePane from "./SingleClientePane";

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentID, setCurrentID] = useState(0);
  return (
    <Box position="relative" display="flex" justifyContent="center" height="91vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Header title="Clientes" />
        <Box position="relative" display="flex" flex="1" justifyContent="space-around" overflow="auto" >
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
