import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  mode: "light",
  user: null,
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
      state.user = action.payload.user;
      state.token = action.payload.token;
    }, */
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [logIn.pending]: (state, action) => {
      state.status = "loading";
    },
    [logIn.fulfilled]: (state, action) => {
      state.status = "successful";
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [logIn.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [signUp.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = "successful";
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
