import {
  FETCH_ALL,
  FETCH_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";
import * as api from "../api";

export const getClients = () => async (dispatch) => {
  try {
    const { data } = await api.getClients();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const newClient = (note) => async (dispatch) => {
  try {
    const { data } = await api.createClient(note);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
