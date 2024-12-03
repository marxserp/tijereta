import * as api from "./api";
export const getTopBuyers = async () => {
  try {
    const { data } = await api.getTopBuyers();
    return data;
  } catch (error) {
    console.error(`Error al obtener top de clientes, ${error}`);
  }
};
export const getTopServices = async () => {
  try {
    const { data } = await api.getTopServices();
    return data;
  } catch (error) {
    console.error(`Error al obtener top de clientes, ${error}`);
  }
};
export const getTurnosByExtra = async (query) => {
  try {
    if (!query) {
      return ([]);
    }
    try {
      const { data } = await api.getTurnosByExtra(query);
      return data;
    } catch (error) {
      console.error(`Error al obtener turnos filtrados del servidor, ${error}`);
      return ([]);
    }
  } catch (error) {
    console.error(`Error al obtener turnos filtrados, ${error}`);
  }
};
