import * as api from "./api";

export const searchCliente = async (query) => {
  if (!query) {
    return ([]);
  }
  try {
    const response = await api.searchCliente(query);
    return response.data;
  } catch (error) {
    return ([]);
  }
};

export const fetchClienteById = async (id) => {
  try {
    const { data } = await api.fetchSingleCliente(id);
    return data;
  } catch (error) {
    console.error(`Error fetching cliente by ID: ${error}`);
    return null;
  }
};