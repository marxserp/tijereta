import * as api from "./api";

export const fetchSingleUsuario = async (id) => {
  try {
    const { data } = await api.fetchSingleUsuario(id);
    return data;
  } catch (error) {
    console.error(`Error al obtener usuario, ${error}`);
  }
};