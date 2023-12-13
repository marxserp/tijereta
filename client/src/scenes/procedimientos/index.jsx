import { useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import AdminProcedimientos from "./Form";
import ListaProcedimientos from "./Grid";
import Sidebar from "../global/Sidebar";

const Procedimientos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [currentID, setCurrentID] = useState(0);

  return (
    <Box height="100%" width="100%" display="flex" position="relative">
      <Sidebar isSidebar={isSidebar} />
      <Box width="100%" m="20px">
        <Header
          title="Procedimientos"
          subtitle="Adminstrá los servicios ofrecidos por tu emprendimiento."
        />
        <Box flexBasis="38%">
          <AdminProcedimientos
            currentID={currentID}
            setCurrentID={setCurrentID}
          />
        </Box>
        <Box flexBasis="60%" mt="1.2rem">
          <ListaProcedimientos setCurrentID={setCurrentID} />
        </Box>
      </Box>
    </Box>
  );
};

export default Procedimientos;
