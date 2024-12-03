import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api.js";

const initialState = {
  turnos: [],
  status: "idle", // loading | success | failed
  error: null,
};

// Async OPs
export const fetchAllTurnos = createAsyncThunk(
  "turnos/fetchAllTurnos",
  async (thunkAPI) => {
    try {
      const response = await api.fetchAllTurnos();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const createTurno = createAsyncThunk(
  "turnos/createTurno",
  async (turno, thunkAPI) => {
    const response = await api.createTurno(turno);
    return response.data;
  }
);

export const updateTurno = createAsyncThunk(
  "turnos/updateTurno",
  async ({ id, turno }) => {
    const response = await api.updateTurno(id, turno);
    return response.data;
  }
);

export const deleteTurno = createAsyncThunk(
  "turnos/deleteTurno",
  async (id) => {
    await api.deleteTurno(id);
    return id;
  }
);

const turnosSlice = createSlice({
  name: "turnos",
  initialState,
  reducers: {
    turnoAdded: (state, action) => {
      state.turnos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTurnos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllTurnos.fulfilled, (state, action) => {
        return {
          ...state,
          turnos: action.payload,
          status: "success",
          error: null,
        };
      })
      .addCase(fetchAllTurnos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTurno.fulfilled, (state, action) => {
        state.turnos = state.turnos.concat(action.payload);
      }).addCase(updateTurno.fulfilled, (state, action) => {
        const turnos = state.turnos.filter((turno) => turno._id !== action.payload._id);
        state.turnos = [...turnos, action.payload];
      }).addCase(deleteTurno.fulfilled, (state, action) => {
        state.turnos = state.turnos.filter((turnos) => turnos._id !== action.payload);
      });
  },
});

// TEST
export const selectTurnoById = (state, turnoID) => {
  return state.turnos.turnos.find((turno) => turno._id === turnoID);
};

/*export const selectClienteNextTurno = (state, clienteID) => {
  return  state.turnos.turnos.find((turno) => turno.id_cliente === clienteID);
};*/

export const selectClienteNextTurno = (state, clienteID) => {
  const currentDate = new Date();
  // 1. Filtra turnos desde hoy al futuro
  // 2. Ordena por fecha
  // 3. Agarra el primer turno (el [0] al final)
  return state.turnos.turnos.
    filter(turno => turno.id_cliente === clienteID && new Date(turno.fecha) > currentDate).
    sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];
};

export const selectClienteFutureTurnos = (state, clienteID) => {
  const currentDate = new Date();
  // Cambia en que incluye fecha actual y trae TODOS los turnos, no solo 1
  return state.turnos.turnos.
    filter(turno => turno.id_cliente === clienteID && new Date(turno.fecha) >= currentDate).
    sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
};

export default turnosSlice.reducer;
