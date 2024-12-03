import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api.js";

const initialState = {
  clientes: [],
  status: "idle", // loading | success | failed
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
  async ({ id, cliente }) => {
    try {
      const response = await api.updateCliente(id, cliente);
      return response.data;
    } catch (error) {
      return cliente;
    }
  }
);

export const deleteCliente = createAsyncThunk(
  "clientes/deleteCliente",
  async (id, thunkAPI) => {
    try {
      await api.deleteCliente(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
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
    builder
      .addCase(fetchAllClientes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllClientes.fulfilled, (state, action) => {
        return {
          ...state,
          clientes: action.payload,
          status: "success",
          error: null,
        };
      })
      .addCase(fetchAllClientes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCliente.fulfilled, (state, action) => {
        // Usás concat en vez de push porque retorna copia del arreglo original, y respetás inmutabilidad
        state.clientes = state.clientes.concat(action.payload);
      }).addCase(updateCliente.fulfilled, (state, action) => {
        // Eliminás el que tiene datos viejos y concatenás el que tiene datos nuevos
        const clientes = state.clientes.filter((cliente) => cliente._id !== action.payload._id);
        console.log("loggin action.payload from updateCliente.fulfilled", action.payload);
        state.clientes = [...clientes, action.payload];
      }).addCase(deleteCliente.fulfilled, (state, action) => {
        // Removés cliente filtrándolo por la id que retorna el thunk
        state.clientes = state.clientes.filter((cliente) => cliente._id !== action.payload);
      });
  },
});

// TEST
export const selectClienteById = (state, clienteID) => {
  return state.clientes.clientes.find((cliente) => cliente._id === clienteID);
};


export default clientesSlice.reducer;
