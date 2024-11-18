import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  mode: "light",
  sidebar: true,
  usuario: null,
  token: null,
  status: "idle",
  error: null,
};

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (formData, thunkAPI) => {
    try {
      const response = await api.login(formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData, thunkAPI) => {
    try {
      const response = await api.login(formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* setLogin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    }, */
    setLogout: (state) => {
      localStorage.clear();
      state.usuario = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.status = "successful";
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.status = "successful";
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});


export const { setLogout } = authSlice.actions;
export default authSlice.reducer;
