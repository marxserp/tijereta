import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { fetchAllProductos } from "../../state/productos";
import ShortToolbar from "../../components/GridToolbar";

const ProductoList = ({setProductoID}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const dispatch = useDispatch();
  const { productos } = useSelector((state) => state.productos);

useEffect(() => {
  dispatch(fetchAllProductos());
}, []);

const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "duracion",
      headerName: "Duración",
      flex: 0.8,
    },
    {
      field: "precio",
      headerName: "Precio",
      flex: 0.8,
    },
  ];

  return (
    <Box
      m="0"
      height="78vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        density="compact"
        rows={productos}
        columns={columns}
        disableRowSelectionOnClick
        slots={{ toolbar: ShortToolbar, }}
        getRowId={(row) => row._id}
        onRowClick={(p) => setProductoID(p.row._id)}
      />
    </Box>
  );
};

export default ProductoList;
