import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getClientes } from "../../state/index";
//import { getClientes } from "../../state/index";
//import { getAllClientes } from "../../actions/clientes";
import { fetchClientes } from "../../state/clientes";
import { fetchingClientes } from "../../state/clientes";
import qs from "query-string";
const URL = "http://localhost:8080/clientes";

// FUNCA
const ListaClientes = ({ setCurrentID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clientes);
  /* const isLoading = useSelector((state) => state.isLoading);
  const token = useSelector((state) => state.token); */

  const [clientArray, setClientArray] = useState([]);
  const getClientes = async () => {
    try {
      const res = await fetch("http://localhost:8080/clientes");
      const data = await res.json();
      setClientArray(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "apellido",
      headerName: "Apellido",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contacto",
      headerName: "Teléfono",
      flex: 1,
    },
    {
      field: "correo",
      headerName: "Correo",
      flex: 1,
    },
  ];

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Box
      m="0"
      height="70vh"
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
        rows={clientArray}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row._id}
        onRowClick={(p) => setCurrentID(p.row._id)}
      />
    </Box>
  );
};

export default ListaClientes;
