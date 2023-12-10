import {
  CREATE,
  FETCH_ALL,
  FETCH_ONE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";
import * as api from "../api";

export const createCliente = (cliente) => async (dispatch) => {
  try {
    const { data } = await api.createCliente(cliente);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(`Action CREATE error: ${error}`);
  }
};

export const getAllClientes = () => async (dispatch) => {
  try {
    const { data } = await api.getAllClientes();
    dispatch({ type: FETCH_ALL, payload: data });
    console.log(data);
  } catch (error) {
    console.log(`Action FETCH_ALL error: ${error}`);
  }
};
