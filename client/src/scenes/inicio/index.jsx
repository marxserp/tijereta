import { useState } from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

const Inicio = () => {
    const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

    return (<div className="home">
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            
              <Sidebar isSidebar={isSidebar} />

              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                </main>
                </ThemeProvider>
                </ColorModeContext.Provider>
    </div>);
};

export default Inicio;