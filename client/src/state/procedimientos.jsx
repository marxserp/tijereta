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
  async (id, procedimiento, thunkAPI) => {
    const response = await api.updateProcedimiento(id, procedimiento);
    console.log(
      "Log from procedimientos.jsx>updateProcedimiento",
      procedimiento
    );
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
      return {
        ...state,
        procedimientos: action.payload,
        status: "succeeded",
        error: null,
      };
    });
    builder.addCase(createProcedimiento.fulfilled, (state, action) => {
      state.procedimientos = state.procedimientos.concat(action.payload);
    });
    builder.addCase(updateProcedimiento.fulfilled, (state, action) => {
      return {
        ...state,
        procedimientos: state.procedimientos.map((procedimiento) =>
          procedimiento._id === action.payload._id
            ? action.payload
            : procedimiento
        ),
        status: "succeeded",
        error: null,
      };
    });
  },
});

export default procedimientosSlice.reducer;
