import { getProcedimientos, newProcedimiento } from "../state";
import * as api from "../api/index.js";

export const createProcedimiento = (procedimiento) => async (dispatch) => {
  try {
    const { data } = await api.createProcedimiento(procedimiento);
    dispatch(newProcedimiento({ procedimientos: data }));
  } catch (error) {
    console.log(`Action CREATE error: ${error}`);
  }
};

export const getAllProcedimientos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllProcedimientos();
    console.log(data);
    dispatch(getProcedimientos({ procedimientos: data }));
  } catch (error) {
    console.log(`Action FETCH_ALL error: ${error}`);
  }
};
