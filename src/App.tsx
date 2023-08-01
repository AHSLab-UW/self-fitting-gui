import "./styles/App.css";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Fitting from "./pages/ButtonFitting";
import Welcome from "./pages/Welcome";
import Intro1 from "./pages/ConnectToYourDevice1";
import Name from "./pages/Name";
import Intro2 from "./pages/Intro2";
import Intro3 from "./pages/Intro3";
import Select from "./pages/Select";
import Prompt from "./pages/Prompt";
import Finish from "./pages/Finish";
import FittingSelect from './pages/FittingSelect';

import CollapsingSidebar from "./components/CollapsingSidebar";
import BottomMenu from "./components/BottomMenu";
import FittingInstruction from "./pages/FittingInstruction";
import Admin from "./pages/Admin";
import ButtonFitting from "./pages/ButtonFitting";

const routes = [
  { path: "/", name: "Welcome", element: <Welcome /> },
  { path: "/name", name: "Name", element: <Name /> },
  { path: "/intro1", name: "Intro 1", element: <Intro1 /> },
  { path: "/intro2", name: "Intro 2", element: <Intro2 /> },
  { path: "/intro3", name: "Intro 3", element: <Intro3 /> },
  { path: "/select", name: "Select", element: <Select /> },
  { path: "/fit-select", name: "Fitting Select", element: <FittingSelect /> },
  { path: "/fit-instruct", name: "Fitting Instruction", element: <FittingInstruction /> },
  { path: "/buttons", name: "ButtonFitting", element: <ButtonFitting /> },
  { path: "/grid", name: "GridFitting", element: <ButtonFitting /> },
  { path: "/prompt", name: "Prompt", element: <Prompt /> },
  { path: "/finish", name: "Finish", element: <Finish /> },
  { path: "/admin", name: "Admin", element: <Admin /> },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <CollapsingSidebar open={sidebarOpen} closeModal={toggleSidebar} />

      <Routes>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Routes>

      <BottomMenu
        menuCallback={toggleSidebar}
        batteryCallback={() => {}}
        helpCallback={() => {}}
        settingCallback={() => {
          const name = localStorage.getItem("name");
          if (name === "admin") {
            navigate("/admin");
          }
        }}
      />
    </div>
  );
}

export default App;
