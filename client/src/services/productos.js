import * as api from "./api";

export const searchProducto = async (query) => {
  if (!query) {
    return ([]);
  }
  try {
    const response = await api.searchProducto(query);
    return response.data;
  } catch (error) {
    return ([]);
  }
};

export const fetchProductoById = async (id) => {
  try {
    const { data } = await api.fetchSingleProducto(id);
    return data;
  } catch (error) {
    console.error(`Error fetching producto by ID: ${error}`);
    return null;
  }
};