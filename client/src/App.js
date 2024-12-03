import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Layout from "./components/Layout";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import VerificateUsuarioForm from "./scenes/login/VerificateUsuarioForm";
import AuthorizationForm from "./scenes/login/AuthorizationForm";

import Agenda from "./scenes/agenda";
import SingleTurnoPage from "./scenes/agenda/SingleTurnoPage";
import AddTurnoForm from "./scenes/agenda/AddTurnoForm";
import UpdateTurnoForm from "./scenes/agenda/UpdateTurnoForm";

import Clientes from "./scenes/clientes";
import SingleClientePage from "./scenes/clientes/SingleClientePage";
import AddClienteForm from "./scenes/clientes/AddClienteForm";
import UpdateClienteForm from "./scenes/clientes/UpdateClienteForm";

import Productos from "./scenes/productos";
import AddProductoForm from "./scenes/productos/AddProductoForm";
import UpdateProductoForm from "./scenes/productos/UpdateProductoForm";

import FAQ from "./scenes/faq";

import { fetchAllClientes } from "./state/clientes";
import { fetchAllProductos } from "./state/productos";
import { fetchAllTurnos } from "./state/turnos";

function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    dispatch(fetchAllClientes());
    dispatch(fetchAllProductos());
    dispatch(fetchAllTurnos());
  }, [dispatch, isAuth]);

  function returnElementContent(isAuth, element) {
    if (isAuth) return element
    return <Navigate to="/auth" />
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/autenticar" element={isAuth ? <Navigate to="/auth" /> : <VerificateUsuarioForm />} />
          <Route path="/adm/auth" element={<AuthorizationForm />} />

          <Route path="/" element={isAuth ? <Layout /> : <Navigate to="/auth" />}>
            <Route index element={<Dashboard />} />
            <Route path="agenda">
              <Route index element={<Agenda />} />
              <Route path="nuevo" element={<AddTurnoForm />} />
              <Route path=":turnoID" element={<SingleTurnoPage />} />
              <Route path="editar/:turnoID" element={<UpdateTurnoForm />} />
            </Route>

            <Route path="clientes">
              <Route index element={<Clientes />} />
              <Route path="nuevo" element={<AddClienteForm />} />
              <Route path=":clienteID" element={<SingleClientePage />} />
              <Route path="editar/:clienteID" element={<UpdateClienteForm />} />
            </Route>

            <Route path="productos">
              <Route index element={<Productos />} />
              <Route path="nuevo" element={<AddProductoForm />} />
              <Route path="editar/:productoID" element={<UpdateProductoForm />} />
            </Route>

            <Route path="ayuda" element={returnElementContent(isAuth, <FAQ />)} />

            {/* Reemplazar con componente 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
