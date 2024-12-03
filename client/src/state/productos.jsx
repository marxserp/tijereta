import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api.js";

const initialState = {
  productos: [],
  status: "idle", // loading | success | failed
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
    try {
      const response = await api.updateProducto(id, producto);
      return response.data;
    } catch (error) {
      return producto;
    }
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
    builder
      .addCase(fetchAllProductos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductos.fulfilled, (state, action) => {
        return {
          ...state,
          productos: action.payload,
          status: "success",
          error: null,
        };
      })
      .addCase(fetchAllProductos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.productos = state.productos.concat(action.payload);
      })
      .addCase(updateProducto.fulfilled, (state, action) => {
        const productos = state.productos.filter((producto) => producto._id !== action.payload._id);
        console.log("loggin action.payload from updateProducto.fulfilled", action.payload);
        state.productos = [...productos, action.payload];
      }).addCase(deleteProducto.fulfilled, (state, action) => {
        state.productos = state.productos.filter((producto) => producto._id !== action.payload);
      });
  },
});

// TEST
export const selectProductoById = (state, productoID) => {
  return state.productos.productos.find((producto) => producto._id === productoID);
};

export const getProductoNombreById = (productos, productoID) => {
  const producto = productos.find((producto) => producto._id === productoID);
  return producto ? producto.nombre : "Producto desconocido o borrado";
};

export const searchProducto = async (query) => {
  if (!query) {
    return ([]);
  }
  try {
    const response = await api.searchProducto(query);
    return response.data;
  } catch (error) {
    return ([]);
  }
};

export default productosSlice.reducer;
