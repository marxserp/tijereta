import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Contacts from "./scenes/Contacts";
// import Form from "./scenes/Form";
// import Calendar from "./scenes/Calendar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          {/*<Route path="/form" element={<Form />} />*/}
        </Routes>
      </main>
    </div>
  );
}

export default App;
