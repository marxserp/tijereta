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
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Box height="100%" width="100%" display="flex" position="relative">
      <Sidebar />
      <Box
        width="100%"
        padding="1rem"
        display="flex"
        gap="0.3rem"
        justifyContent="space-between"
      >
        <Box flexBasis="38%">
          <AdminProcedimientos />
        </Box>
        <Box flexBasis="60%" mt="1.2rem">
          <ListaProcedimientos />
        </Box>
      </Box>
    </Box>
  );
};

export default Procedimientos;
