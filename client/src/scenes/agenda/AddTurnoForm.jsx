import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTurnos, createTurno, updateTurno, deleteTurno } from "../../state/turnos";
import { searchProducto } from "../../services/productos";
import { searchCliente } from "../../services/clientes";
import useDebouncedSearch from "./debouncer";
import { debounce, isEqual } from 'lodash';

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  Autocomplete,
  Tooltip
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useMediaQuery from "@mui/material/useMediaQuery"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";


const SENA_REGEX = /^[0-9]*\.?[0-9]*$/

const valueValidation = yup.object().shape({
  sena: yup.string().matches(SENA_REGEX, "Sólo se permiten números."),
  detalle: yup.string().required(),
  observacion: yup.string(),
});

const initialValues = {
  fecha: dayjs(),
  id_cliente: "",
  id_producto: "",
  id_producto2: "",
  id_producto3: "",
  sena: 0,
  monto: 0,
  promo: 0,
  total: 0,
  detalle: "",
  observacion: "",
  estado: 1,
  extra: "Activo",
};

const AddTurnoForm = ({ currentID, setCurrentID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = useSelector((state) => state.auth.usuario._id);
  const turno = useSelector((state) =>
    currentID ? state.turnos.turnos.find((turno) => turno._id === currentID) : null
  );

  // Estado local que guarda id/fecha de elemento/fecha seleccionado
  const [selectedDateValue, setSelectedDateValue] = useState();
  const [clientes, setClientes] = useState([]);
  const [selectedClienID, setSelectedClienID] = useState("");
  const [productos, setProductos] = useState([]);
  const [selectedProdID, setSelectedProdID] = useState("");
  const [selectedProd2ID, setSelectedProd2ID] = useState("");
  const [selectedProd3ID, setSelectedProd3ID] = useState("");
  const [sena, setSena] = useState(0);
  const [promo, setPromo] = useState(0);
  const [extra, setExtra] = useState("");

  const searchClienFunc = async (query) => {
    if (!query) return [];
    try {
      const response = await searchCliente(query);
      return response;
    } catch (error) {
      console.error("Error fetching clients", error);
      return [];
    }
  };

  const searchProductoFunc = async (query) => {
    if (!query) return [];
    try {
      const response = await searchProducto(query);
      return response;
    } catch (error) {
      console.error("Error fetching clients", error);
      return [];
    }
  };
  const debouncedSearchClienFunc = useDebouncedSearch(searchClienFunc);
  const debouncedSearchProdFunc = useDebouncedSearch(searchProductoFunc);

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
      dispatch(createTurno(formData));
      navigate("/agenda");
    } catch (error) {
      console.log(error);
    } finally {
      // Implementar estado de app en almacén
      console.log("finally");
    }
  };

  const handleDelete = async () => {
    dispatch(deleteTurno(currentID));
    navigate("/agenda");
  };

  const handleClear = (resetForm) => {
    setSelectedDateValue(dayjs());
    setSelectedClienID(null);
    setSelectedProdID(null);
    setSelectedProd2ID(null);
    setSelectedProd3ID(null);
    setSena(null);
    setPromo(null);
    setExtra(null);
    resetForm();
  };

  /*
  useEffect(() => {
    if (turno !== 0 && turno !== null) {
      setSelectedDateValue(dayjs(turno.fecha).format('DD-MM-YYYY'));
    }
  }, [turno]);
  */

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ values, errors, touched, handleChange, handleSubmit, resetForm, setFieldValue, }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0" m="20px 10px 10px 10px">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Nuevo turno</Typography>
          </Box>

          <Box
            display="grid"
            gap="30px" m="40px 20px 20px 20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}
          >
            <DateTimePicker
              slotProps={{ textField: { size: 'small' } }}
              name="fecha"
              label="Elegí una fecha"
              value={selectedDateValue}
              onChange={(e) => { setSelectedDateValue(e ? dayjs(e).toDate() : ''); setFieldValue("fecha", e ? dayjs(e).toDate() : '') }}
              defaultValue={dayjs()}
              minDate={dayjs()}
              sx={{ gridColumn: "span 1" }}
            />

            <FormControl size="small">
              <InputLabel id="extra">Estado del turno</InputLabel>
              <Select
                id="extra"
                name="extra"
                label="Estado del turno"
                value={extra}
                onChange={(e) => {
                  const value = e.target.value;
                  setExtra(value);
                  setFieldValue("extra", value);
                }}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value={"Activo"}>Activo</MenuItem>
                <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                <MenuItem value={"Pospuesto"}>Pospuesto</MenuItem>
                <MenuItem value={"Finalizado"}>Finalizado</MenuItem>
                <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              variant="outlined"
              label="Seña"
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setSena(value);
                    setFieldValue("sena", value);
                  }
                }
              }
              value={sena}
              name="sena"
              helperText="Sólo admite números"
              InputProps={{
                inputMode: "decimal", pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 1" }}
            />

            <TextField
              size="small"
              variant="outlined"
              label="Promoción"
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                    setPromo(value);
                    setFieldValue("promo", value);
                  }
                }
              }
              value={promo}
              name="promo"
              helperText="Sólo admite números"
              InputProps={{
                inputMode: "decimal", pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 1" }}
            />

            <Autocomplete
              options={clientes}
              getOptionLabel={(option) => option.nombre || ""}
              onInputChange={(event, value) => {
                if (value) {
                  debouncedSearchClienFunc(value, setClientes);
                } else {
                  setClientes([]);
                }
              }}
              onChange={(event, value) => {
                setSelectedClienID(value?._id || "");
                setFieldValue("id_cliente", value?._id || ""); // Synchronize with Formik
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} label="Elegí un cliente" size="small" variant="outlined" />
              )}
              renderOption={(props, option) => (
                <Box {...props} key={option._id}>
                  {option.nombre}
                </Box>
              )}
              sx={{ gridColumn: "span 2" }}
            />

            <Autocomplete
              options={productos}
              getOptionLabel={(option) => option.nombre || ""}
              onInputChange={(event, value) => {
                if (value) {
                  debouncedSearchProdFunc(value, setProductos);
                } else {
                  setProductos([]);
                }
              }}
              onChange={(event, value) => {
                setSelectedProdID(value?._id || "");
                setFieldValue("id_producto", value?._id || ""); // Synchronize with Formik
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} label="Elegí  un producto" size="small" variant="outlined" />
              )}
              renderOption={(props, option) => (
                <Box {...props} key={option._id}>
                  {option.nombre}
                </Box>
              )}
              sx={{ gridColumn: "span 2" }}
            />

            <Autocomplete
              options={productos}
              getOptionLabel={(option) => option.nombre || ""}
              onInputChange={(event, value) => {
                if (value) {
                  debouncedSearchProdFunc(value, setProductos);
                } else {
                  setProductos([]);
                }
              }}
              onChange={(event, value) => {
                setSelectedProd2ID(value?._id || "");
                setFieldValue("id_producto2", value?._id || "");
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} label="Opcional: agregá un producto adicional" size="small" variant="outlined" />
              )}
              renderOption={(props, option) => (
                <Box {...props} key={option._id}>
                  {option.nombre}
                </Box>
              )}
              sx={{ gridColumn: "span 2" }}
            />

            <Autocomplete
              options={productos}
              getOptionLabel={(option) => option.nombre || ""}
              onInputChange={(event, value) => {
                if (value) {
                  debouncedSearchProdFunc(value, setProductos);
                } else {
                  setProductos([]);
                }
              }}
              onChange={(event, value) => {
                setSelectedProd3ID(value?._id || "");
                setFieldValue("id_producto3", value?._id || "");
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} label="Opcional: agregá otro producto adicional" size="small" variant="outlined" />
              )}
              renderOption={(props, option) => (
                <Box {...props} key={option._id}>
                  {option.nombre}
                </Box>
              )}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Detalles"
              multiline
              onChange={handleChange}
              value={values.detalle}
              name="detalle"
              error={!!touched.detalle && !!errors.detalle}
              helperText={touched.detalle && errors.detalle}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Observaciones"
              multiline
              onChange={handleChange}
              value={values.observacion}
              name="observacion"
              error={!!touched.observacion && !!errors.observacion}
              helperText={touched.observacion && errors.observacion}
              sx={{ gridColumn: "span 2" }}
            />

            <Box display="flex" justifyContent="start" mt="20px" columnGap="6px">
              <Button type="submit" color="primary" variant="contained" startIcon={<SaveOutlinedIcon />}>
                Crear producto
              </Button>
              <Tooltip title="Limpiar todos los campos">
                <IconButton color="primary" onClick={() => handleClear(resetForm)}>
                  <CleaningServicesIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </form>
      )
      }
    </Formik >
  );
};

export default AddTurnoForm;
