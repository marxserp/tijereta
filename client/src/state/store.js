import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.jsx";
import clientesReducer from "./clientes.jsx";
import productosReducer from "./productos.jsx";
import turnosReducer from "./turnos.jsx";
import configuracionesReducer from "./configuraciones.jsx";

const rootReducer = combineReducers({
  auth: authReducer,
  clientes: clientesReducer,
  productos: productosReducer,
  turnos: turnosReducer,
  configuraciones: configuracionesReducer,
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
