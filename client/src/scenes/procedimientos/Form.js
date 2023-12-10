import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { createProcedimiento } from "../../actions/procedimientoModel";
import { useDispatch, useSelector } from "react-redux";

const newProcedimientoSchema = yup.object().shape({
  nombre: yup.string().required("Obligatorio"),
  tipo: yup.string().required("Obligatorio"),
  duracion: yup.number().required("Obligatorio"),
  precio: yup.number().required("Obligatorio"),
});

const initialValues = {
  nombre: "",
  tipo: "",
  duracion: "",
  precio: "",
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      // const formData = new URLSearchParams(values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("_id", _id);
      const savedProcedimientoResponse = await fetch(
        "http://localhost:8080/procedimientos",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        }
      );
      if (savedProcedimientoResponse.ok) {
        onSubmitProps.resetForm();
      } else {
        console.log(
          "Error creando procedimiento: ",
          savedProcedimientoResponse.statusText
        );
      }
    } catch (error) {
      console.log("Error al crear un procedimiento: ", error);
    }
    dispatch(createProcedimiento(values));
  };
};

export default Form;
