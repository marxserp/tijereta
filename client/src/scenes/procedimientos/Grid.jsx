import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProcedimientos } from "../../state/procedimientos";

const ListaProcedimientos = ({ setCurrentID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const { procedimientos } = useSelector((state) => state.procedimientos);
  const isLoading = useSelector((state) => state.isLoading);
  const token = useSelector((state) => state.token);

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
