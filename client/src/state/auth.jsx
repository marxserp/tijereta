import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api.js";

const initialState = {
  mode: "light",
  token: null,
  usuario: null,
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
      const response = await api.register(formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (formData, thunkAPI) => {
    try {
      const response = await api.verify(formData);
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
    setLogin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
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
      //thunkAPI.dispatch(authSlice.actions.setLogin(action.payload));

      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      console.log("loggin action.payload from login.fulfilled", action.payload);
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
