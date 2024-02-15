import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { authSlice } from ".";
// import authReducer from "./index";
import clientesReducer from "./clientes.jsx";
import procedimientosReducer from "./procedimientos.jsx";
import configuracionesReducer from "./configuraciones.jsx";
import authReducer from "./auth.jsx";

const rootReducer = combineReducers({
  auth: authReducer,
  clientes: clientesReducer,
  procedimientos: procedimientosReducer,
  configuraciones: configuracionesReducer,
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
