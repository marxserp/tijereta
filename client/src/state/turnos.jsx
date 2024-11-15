import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  turnos: [],
  status: "idle",
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
  async (id, turno) => {
    const response = await api.updateTurno(id, turno);
    return response.data;
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
    builder.addCase(fetchAllTurnos.fulfilled, (state, action) => {
      return {
        ...state,
        turnos: action.payload,
        status: "succeeded",
        error: null,
      };
    });
    builder.addCase(createTurno.fulfilled, (state, action) => {
      // using concat instead of push cause it returns a copy of the original array, thus does not breaks redux inmutability principle
      state.turnos = state.turnos.concat(action.payload);
    });
  },
});

// TEST
export const selectTurnoById = (state, turnoID) => {
  state.turnos.find((turno) => turno._id === turnoID);
};
export default turnosSlice.reducer;
