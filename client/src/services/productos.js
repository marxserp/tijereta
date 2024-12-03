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