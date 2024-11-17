import { useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import AddProductoForm from "./AddProductoForm";
import ProductoList from "./ProductoList";
import Sidebar from "../../components/Sidebar";

const Productos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [currentID, setCurrentID] = useState(0);

  return (
    <Box width="100%" display="flex" position="relative">
      
      <Box width="100%" m="20px">
        <Header title="Productos" subtitle={currentID} />
        <Box position="relative" display="flex" justifyContent="space-around">
          <Box flexBasis="30%">
            <AddProductoForm currentID={currentID} setCurrentID={setCurrentID} />
          </Box>
          <Box flexBasis="60%">
            <ProductoList setCurrentID={setCurrentID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Productos;
