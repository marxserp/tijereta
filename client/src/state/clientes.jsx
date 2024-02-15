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
      return {
        ...state,
        clientes: action.payload,
        status: "succeeded",
        error: null,
      };
    });
    builder.addCase(createCliente.fulfilled, (state, action) => {
      // using concat instead of push cause it returns a copy of the original array, thus does not breaks redux inmutability principle
      state.clientes = state.clientes.concat(action.payload);
    });
  },
});

export default clientesSlice.reducer;
