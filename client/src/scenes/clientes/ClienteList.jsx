import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClientes } from "../../state/clientes";
import ShortToolbar from "../../components/GridToolbar";

const ClienteList = ({ setCurrentID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const { clientes } = useSelector((state) => state.clientes);

  useEffect(() => {
    dispatch(fetchAllClientes());
  }, []);

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
        rows={clientes}
        columns={columns}
        disableRowSelectionOnClick
        slots={{ toolbar: ShortToolbar, }}
        getRowId={(row) => row._id}
        onRowClick={(p) => setCurrentID(p.row._id)}
      />
    </Box>
  );
};

export default ClienteList;
