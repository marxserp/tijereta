
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectClienteById, updateCliente, deleteCliente, createCliente } from "../../state/clientes";
import { useParams, useNavigate } from 'react-router-dom';
// import { createCliente } from "../../api";

import { Box, Button, TextField } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"
  ;
const valueValidation = yup.object().shape({
  nombre: yup.string().required("Campo obligatorio"),
  apellido: yup.string(),
  correo: yup.string().email("Formato de correo no válido"),
  contacto: yup.number("Solo se admiten números").required("Campo obligatorio"),
});
const initialValues = {
  nombre: "",
  apellido: "",
  correo: "",
  contacto: "",
};

const FormObserver = ({ cliente }) => {
  const { setValues } = useFormikContext();
  useEffect(() => {
    if (cliente) {
      setValues({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        contacto: Number(cliente.contacto),
      });
    }
  }, [cliente, setValues]);
  return null;
};

const AddClienteForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clienteID = useParams();
  const _id = useSelector((state) => state.auth.usuario._id);
  // const cliente = useSelector((state) => selectClienteById(state, currentID));
  const token = useSelector((state) => state.auth.token);
  const cliente = useSelector((state) =>
    clienteID ? state.clientes.clientes.find((cliente) => cliente._id === clienteID) : null
  );

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new URLSearchParams(values);
      formData.append("usuario", _id);
      dispatch(createCliente(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={valueValidation}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nombre"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nombre}
              name="nombre"
              error={!!touched.nombre && !!errors.nombre}
              helperText={touched.nombre && errors.nombre}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Apellido"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.apellido}
              name="apellido"
              error={!!touched.apellido && !!errors.apellido}
              helperText={touched.apellido && errors.apellido}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Correo electrónico"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.correo}
              name="correo"
              error={!!touched.correo && !!errors.correo}
              helperText={touched.correo && errors.correo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Número de contacto"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contacto}
              name="contacto"
              error={!!touched.contacto && !!errors.contacto}
              helperText={touched.contacto && errors.contacto}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px" columnGap="6px">
            <Button variant="text" onClick={resetForm}>
              Limpiar todo
            </Button>
            <Button type="submit" color="secondary" variant="contained">
              Crear
            </Button>
          </Box>
          <FormObserver cliente={cliente} />
        </form>
      )}
    </Formik>
  );
};

export default AddClienteForm;
