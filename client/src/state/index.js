import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  isLoading: null,
  user: null,
  token: null,
  clientes: [],
  procedimientos: [],
  turnos: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    setLogin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
    newCliente: (state, action) => {
      if (state.user) {
        state.clientes = [...state.clientes, action.payload.cliente];
      }
    },
    getClientes: (state, action) => {
      if (state.user) {
        state.clientes = action.payload.clientes;
      } else {
        console.error(
          `Could not retrieve clients. Maybe you're not logged in?`
        );
      }
    },
    /* getCliente: (state, action) => {
      if (state.user) {
        state.cliente = action.payload.cliente;
      } else {
        console.error(
          `Could not retrieve clients. Maybe you're not logged in?`
        );
      }
    }, */
    newProcedimiento: (state, action) => {
      if (state.user) {
        state.procedimientos = [
          ...state.procedimientos,
          action.payload.procedimiento,
        ];
      }
    },
    getProcedimientos: (state, action) => {
      if (state.user) {
        state.procedimientos = action.payload.procedimientos;
      } else {
        console.error(
          `Could not retrieve procedimientos. Maybe you're not logged in?`
        );
      }
    },
    /* getProcedimiento: (state, action) => {
      if (state.user) {
        state.procedimiento = action.payload.procedimiento;
      } else {
        console.error(
          `Could not retrieve procedimientos. Maybe you're not logged in?`
        );
      }
    }, */
    newTurno: (state, action) => {
      if (state.user) {
        state.turnos = [...state.turnos, action.payload.turno];
      }
    },
    getTurnos: (state, action) => {
      if (state.user) {
        state.turnos = action.payload.turnos;
      } else {
        console.error(`Could not retrieve turnos. Maybe you're not logged in?`);
      }
    },
    /* getTurno: (state, action) => {
      if (state.user) {
        state.turno = action.payload.turno;
      } else {
        console.error(`Could not retrieve turnos. Maybe you're not logged in?`);
      }
    }, */
  },
});

export const {
  setMode,
  startLoading,
  endLoading,
  setLogin,
  setLogout,
  newCliente,
  getClientes,
  newProcedimiento,
  getProcedimientos,
  newTurno,
  getTurnos,
} = authSlice.actions;
export default authSlice.reducer;
