import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <div className="App">
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet />
                <Sidebar isSidebar={isSidebar} />
            </main>
        </div>
    )
};

export default Layout;