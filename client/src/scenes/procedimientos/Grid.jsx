import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { fetchAllProcedimientos } from "../../state/procedimientos";

const ListaProcedimientos = ({setCurrentID}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const dispatch = useDispatch();
  const { procedimientos } = useSelector((state) => state.procedimientos);
  
  
  //const token = useSelector((state) => state.token);
  /* const isLoading = useSelector((state) => state.isLoading); */
  // Selected index is saved using ref so as not to cause a re-render
  //let currentID = useRef(null);
  // Not the case for formValues, since we need to send it to Form with every change
  //const [formValues, setFormValues] = useState(null);
  // We'll try to setFormValues if currentID changes, leaving it null otherwise
  /* setFormValues(
    useSelector((state) =>
      currentID
    ? state.procedimientos.procedimientos.find((p) => p._id === currentID)
    : null
  )
); */

useEffect(() => {
  dispatch(fetchAllProcedimientos());
}, []);

const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
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
      height="80vh"
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
        rows={procedimientos}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row._id}
        onRowClick={(p) => setCurrentID(p.row._id)}
      />
    </Box>
  );
};

export default ListaProcedimientos;
