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