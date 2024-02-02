import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  clientes: {},
  status: "idle",
  error: null,
};

// Async OPs
export const fetchAllClientes = createAsyncThunk(
  "clientes/fetchAllClientes",
  async (thunkAPI) => {
    try {
      const response = await api.fetchAllClientes();
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
  extraReducers: (builder) => {
    builder.addCase(fetchAllClientes.fulfilled, (state, action) => {
      state.clientes = action.payload;
    });
  },
});

export default clientesSlice.reducer;
