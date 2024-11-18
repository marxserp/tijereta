import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div className="App">
                <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
                        <Sidebar isSidebar={isSidebar} />
                        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                            <Outlet />
                        </Box>
                    </Box>
                </main>
            </div>
        </Box >
    )
};

export default Layout;