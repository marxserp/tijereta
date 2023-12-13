import * as api from "../api/index.js";
import { setLogin } from "../state";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch(setLogin({ user: data.usuario, token: data.token }));
    navigate("/agenda");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch(setLogin({ user: data.usuario, token: data.token }));
    navigate("/agenda");
  } catch (error) {
    console.log(error);
  }
};
