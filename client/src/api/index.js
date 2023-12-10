import axios from "axios";

const url = "http://localhost:8080/clientes";

export const createCliente = (newCliente) => axios.post(url, newCliente);
export const getAllClientes = () => axios.get(url);
// export const getSingleCliente = id => axios.get(`/clients/${id}`);
export const updateCliente = (id, updatedClient) =>
  axios.patch(`${url}/${id}`, updatedClient);
export const deleteCliente = (id) => axios.delete(`${url}/${id}`);
