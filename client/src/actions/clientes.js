import { getClientes, newCliente, startLoading, endLoading } from "../state";
import * as api from "../api/index.js";

export const createCliente = (cliente) => async (dispatch) => {
  try {
    const { data } = await api.createCliente(cliente);
    dispatch(newCliente({ clientes: data }));
  } catch (error) {
    console.log(`Action CREATE error: ${error}`);
  }
};

export const getAllClientes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllClientes();
    console.log(data);
    dispatch(getClientes({ clientes: data }));
  } catch (error) {
    console.log(`Action FETCH_ALL error: ${error}`);
  }
};
