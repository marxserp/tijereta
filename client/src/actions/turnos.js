import { getTurnos, newTurno } from "../state";
import * as api from "../api/index.js";

export const createTurno = (turno) => async (dispatch) => {
  try {
    const { data } = await api.createTurno(turno);
    dispatch(newTurno({ turnos: data }));
  } catch (error) {
    console.log(`Action CREATE error: ${error}`);
  }
};

export const getAllTurnos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllTurnos();
    dispatch(getTurnos({ turnos: data }));
    console.log(data);
  } catch (error) {
    console.log(`Action FETCH_ALL error: ${error}`);
  }
};
