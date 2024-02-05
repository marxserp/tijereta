import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  procedimientos: {},
  status: "idle",
  error: null,
};

// Async OPs
export const fetchAllProcedimientos = createAsyncThunk(
  "procedimientos/fetchAllProcedimientos",
  async (thunkAPI) => {
    try {
      const response = await api.fetchAllProcedimientos();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const createProcedimiento = createAsyncThunk(
  "procedimientos/createProcedimiento",
  async (procedimiento, thunkAPI) => {
    const response = await api.createProcedimiento(procedimiento);
    return response.data;
  }
);

export const updateProcedimiento = createAsyncThunk(
  "procedimientos/updateProcedimiento",
  async (procedimiento) => {
    const response = await api.updateProcedimiento(procedimiento);
    return response.data;
  }
);

const procedimientosSlice = createSlice({
  name: "procedimientos",
  initialState,
  reducers: {
    procedimientoAdded: (state, action) => {
      state.procedimientos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProcedimientos.fulfilled, (state, action) => {
      return state = { ...state, procedimientos: action.payload, status: "succeeded", error: null }
    });
  },
});

export default procedimientosSlice.reducer;
