import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, useTheme } from "@mui/material";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { tokens } from "../../theme";
import ProductoList from "./ProductoList";
import SingleProductoPane from "./SingleProductoPane";

const Productos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { status } = useSelector((state) => state.productos);
  const [productoID, setProductoID] = useState(0);

  /* if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") { return <Typography color="error">Failed to fetch data</Typography>; } */

  return (
    <Box position="relative" display="flex" justifyContent="center" height="91vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Productos</Typography>
          <Link to={"/productos/nuevo"}>
            <Button variant="contained" startIcon={<PostAddOutlinedIcon />}>
              Nuevo producto
            </Button>
          </Link>
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Box flexBasis="56%">
            <ProductoList setProductoID={setProductoID} />
          </Box>
          <Box flexBasis="44%">
            <SingleProductoPane productoID={productoID} setProductoID={setProductoID} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Productos;
