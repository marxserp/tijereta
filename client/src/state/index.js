import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  clientes: [],
  procedimentos: [],
  turnos: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setClientes: (state, action) => {
      if (state.user) {
        state.clientes = action.payload.clientes;
      } else {
        console.error(
          `Could not retrieve clients. Maybe you're not logged in?`
        );
      }
    },
    setProcedimientos: (state, action) => {
      if (state.user) {
        state.procedimientos = action.payload.procedimientos;
      } else {
        console.error(
          `Could not retrieve procedimientos. Maybe you're not logged in?`
        );
      }
    },
    setTurnos: (state, action) => {
      if (state.user) {
        state.turnos = action.payload.turnos;
      } else {
        console.error(`Could not retrieve turnos. Maybe you're not logged in?`);
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setClientes,
  setProcedimientos,
  setTurnos,
} = authSlice.actions;
export default authSlice.reducer;
