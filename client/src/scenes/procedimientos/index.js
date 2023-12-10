import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProcedimientos } from "../../state";

const Procedimientos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const procedimientos = useSelector((state) => state.procedimientos);
  const token = useSelector((state) => state.token);

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
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

  const getProcedimientos = async () => {
    try {
      const response = await fetch("http://localhost:8080/procedimientos", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setProcedimientos({ procedimientos: data }));
      } else {
        console.error(
          "Error durante la carga de procedimientos: ",
          response.statusText
        );
      }
    } catch (error) {
      console.log("Error al cargar procedimientos: ", error);
    }
  };

  useEffect(() => {
    dispatch(setProcedimientos({ procedimientos: [] }));
    getProcedimientos();
  }, []);

  return (
    <Box m="20px">
      <Header title="Procedimientos" subtitle="Servicios ofrecidos" />
      <Box
        m="0"
        height="75vh"
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
        />
      </Box>
    </Box>
  );
};
export default Procedimientos;
