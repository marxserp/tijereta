import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
    clientes: [],
    status: 'idle' | 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
};

// Async OPs
export const fetchClientes = createAsyncThunk("clientes/fetchClientes", async () => {
    const response = await api.fetchAllClientes();
    return response.data;
});

export const createCliente = createAsyncThunk("clientes/createCliente", async (cliente) => {
    const response = await api.createCliente(cliente);
    return response.data;
})

export const updateCliente = createAsyncThunk("clientes/updateCliente", async (cliente) => {
    const response = await api.updateCliente(cliente);
    return response.data;
})

export const clientesSlice = createSlice({
    name: "clientes",
    initialState,
    reducers: {
        clienteAdded: (state, action) => {
            state.clientes.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
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
            })
    }
});