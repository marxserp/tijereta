import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Login from "./scenes/login";
import Calendar from "./scenes/calendar";
import Clientes from "./scenes/clientes";
import FAQ from "./scenes/faq";
import Procedimientos from "./scenes/procedimientos";

import { fetchAllClientes } from "./state/clientes";
import { fetchAllProcedimientos } from "./state/procedimientos";
import { fetchAllTurnos } from "./state/turnos";

function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    dispatch(fetchAllClientes());
    dispatch(fetchAllProcedimientos());
    dispatch(fetchAllTurnos());
  }, []);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/auth" element={<Login />} />
                <Route
                  path="/agenda"
                  element={isAuth ? <Calendar /> : <Navigate to="/auth" />}
                />
                <Route
                  path="/clientes"
                  element={isAuth ? <Clientes /> : <Navigate to="/auth" />}
                />
                <Route
                  path="/procedimientos"
                  element={
                    isAuth ? <Procedimientos /> : <Navigate to="/auth" />
                  }
                />
                <Route path="/ayuda" element={<FAQ />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
