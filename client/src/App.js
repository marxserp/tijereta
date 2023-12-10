import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Calendar from "./scenes/calendar/calendar";
import Clientes from "./scenes/clientes";
import Form from "./scenes/form";
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <Sidebar isSidebar={isSidebar} />

            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              <Routes>
                <Route path="/logon" element={<Login />} />
                <Route path="/" element={<Calendar />} />
                <Route path="/home" element={<Calendar />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/form" element={<Form />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
