import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  clientes: {},
  status: "idle",
  error: null,
};

// Async OPs
export const fetchClientes = createAsyncThunk(
  "clientes/fetchClientes",
  async (thunkAPI) => {
    try {
      const response = await api.fetchAllClientes();
      console.log("Log from Async_fetchClientes", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const createCliente = createAsyncThunk(
  "clientes/createCliente",
  async (cliente, thunkAPI) => {
    const response = await api.createCliente(cliente);
    return response.data;
  }
);

export const updateCliente = createAsyncThunk(
  "clientes/updateCliente",
  async (cliente) => {
    const response = await api.updateCliente(cliente);
    return response.data;
  }
);

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    clienteAdded: (state, action) => {
      state.clientes.push(action.payload);
    },
  },
  extraReducers: {
    [fetchClientes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchClientes.fulfilled]: (state, action) => {
      state.status = "successful";
      // state.clientes = state.clientes.concat(action.payload);
      // state.clientes.push(action.payload.clientes);
      state.clientes = action.payload.clientes;
    },
    [fetchClientes.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    /* builder
      .addCase(fetchClientes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientes = state.clientes.concat(action.payload);
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.status = "failed";
        error = action.error.message;
      }); */
  },
});

export default clientesSlice.reducer;
