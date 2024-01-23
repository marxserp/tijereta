import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  isNavbarCollapsed: false,
};

export const configuracionesSlice = createSlice({
  name: "configuraciones",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    toggleNavbar: (state) => {
      state.isNavbarCollapsed =
        state.isNavbarCollapsed === false ? true : false;
    },
  },
});

export const { setMode, toggleNavbar } = configuracionesSlice.actions;
export default configuracionesSlice.reducer;
