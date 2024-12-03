import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTurno, deleteTurno, selectTurnoById } from "../../state/turnos";
import { searchProducto } from "../../services/productos";
import { searchCliente } from "../../services/clientes";
import useDebouncedSearch from "./debouncer";
import { debounce, isEqual } from 'lodash';

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  InputAdornment,
  Select,
  InputLabel,
  List,
  ListItem,
  Autocomplete,
  Tooltip
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import useMediaQuery from "@mui/material/useMediaQuery"
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
  sena: 0,
  detalle: "",
  observacion: "",
  estado: 1,
  extra: "",
};

const FormObserver = ({ turno }) => {
  const { setValues } = useFormikContext();
  useEffect(() => {
    if (turno) {
      setValues({
        fecha: turno.fecha,
        id_cliente: turno.id_cliente,
        id_producto: turno.id_producto,
        id_producto2: turno.id_producto2,
        id_producto3: turno.id_producto3,
        sena: turno.sena,
        promo: turno.promo,
        monto: turno.monto,
        detalle: turno.detalle,
        observacion: turno.observacion,
        estado: turno.estado,
        extra: turno.extra,
      });
    }
  }, [turno, setValues]);
  return null;
};

const UpdateTurnoForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { turnoID } = useParams();
  const turno = useSelector((state) => selectTurnoById(state, turnoID));
  const _id = useSelector((state) => state.auth.usuario._id);

  const [selectedDateValue, setSelectedDateValue] = useState(dayjs());
  const [clientes, setClientes] = useState([]);
  const [selectedClienID, setSelectedClienID] = useState(turno?.id_cliente);
  const [productos, setProductos] = useState([]);
  const [selectedProdID, setSelectedProdID] = useState(turno?.id_producto);
  const [selectedProd2ID, setSelectedProd2ID] = useState(turno?.id_producto2);
  const [selectedProd3ID, setSelectedProd3ID] = useState(turno?.id_producto3);
  const [senaValue, setSenaValue] = useState(turno?.sena);
  const [promoValue, setPromoValue] = useState(turno?.promo);
  const [extraValue, setExtraValue] = useState(turno?.extra);

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
      dispatch(updateTurno({ id: turnoID, turno: formData }));
      navigate("/agenda")
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    dispatch(deleteTurno(turnoID));
  };

  const handleClear = (resetForm) => {
    setSelectedDateValue(dayjs());
    setSelectedClienID(null);
    setSelectedProdID(null);
    setSelectedProd2ID(null);
    setSelectedProd3ID(null);
    setSenaValue(null);
    setPromoValue(null);
    setExtraValue(null);
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
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={valueValidation}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue, }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="start" alignItems="center" m="20px 10px 10px 10px">
            <Tooltip title="Volver">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h2" fontWeight="bold">Modificar turno</Typography>
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
                value={extraValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setExtraValue(value);
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
                    setSenaValue(value);
                    setFieldValue("sena", value);
                  }
                }
              }
              value={senaValue}
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
                    setPromoValue(value);
                    setFieldValue("promo", value);
                  }
                }
              }
              value={promoValue}
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

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained" startIcon={<SaveAsOutlinedIcon />}>
                Guardar cambios
              </Button>
              <Button variant="outlined" onClick={() => handleDelete()} startIcon={<DeleteOutlinedIcon />}>
                Eliminar
              </Button>
              <Tooltip title="Limpiar todos los campos">
                <IconButton color="primary" onClick={() => handleClear(resetForm)}>
                  <CleaningServicesIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <FormObserver turno={turno} />
        </form>
      )
      }
    </Formik >
  );
};

export default UpdateTurnoForm;
