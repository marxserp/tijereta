import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  productos: {},
  status: "idle",
  error: null,
};

// Async OPs
export const fetchAllProductos = createAsyncThunk(
  "productos/fetchAllProductos",
  async (thunkAPI) => {
    try {
      const response = await api.fetchAllProductos();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const createProducto = createAsyncThunk(
  "productos/createProducto",
  async (producto, thunkAPI) => {
    const response = await api.createProducto(producto);
    return response.data;
  }
);

export const updateProducto = createAsyncThunk(
  "productos/updateProducto",
  async ({ id, producto }) => {
    const response = await api.updateProducto(id, producto);
    return response.data;
  }
);

export const deleteProducto = createAsyncThunk(
  "productos/deleteProducto",
  async (id) => {
    console.log("loggin id from thunk deleteProducto", id);
    await api.deleteProducto(id);
    return id;
  }
);

const productosSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    productoAdded: (state, action) => {
      state.productos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductos.fulfilled, (state, action) => {
      return {
        ...state,
        productos: action.payload,
        status: "succeeded",
        error: null,
      };
    });
    builder.addCase(createProducto.fulfilled, (state, action) => {
      state.productos = state.productos.concat(action.payload);
    })
      .addCase(updateProducto.fulfilled, (state, action) => {
        const productos = state.productos.filter((producto) => producto._id !== action.payload._id);
        state.productos = [...productos, action.payload];
      }).addCase(deleteProducto.fulfilled, (state, action) => {
        // Removés cliente filtrándolo por la id que retorna el thunk
        state.productos = state.productos.filter((producto) => producto._id !== action.payload);
      });
  },
});

// TEST
export const selectClienteById = (state, clienteID) => {
  state.clientes.find((cliente) => cliente._id === clienteID);
};

export default productosSlice.reducer;
