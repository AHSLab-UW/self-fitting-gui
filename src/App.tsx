import "./styles/App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Fitting from "./pages/Fitting";
import Welcome from "./pages/Welcome";

import CollapsingSidebar from "./components/CollapsingSidebar";
import MultiStepProgressBar from "./components/ProgressBar";
import Intro1 from "./pages/Intro1";
import Intro2 from "./pages/Intro2";
import Intro3 from "./pages/Intro3";
import Select from "./pages/Select";
import Adjust from "./pages/Adjust";
import Prompt from "./pages/Prompt";
import Finish from "./pages/Finish";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [step, setStep] = useState(1);

  return (
    <div className="App">
      <CollapsingSidebar open={sidebarOpen} closeModal={toggleSidebar} />
      {/* <MultiStepProgressBar step={step} /> */}

      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/intro1" element={<Intro1 />}></Route>
        <Route path="/intro2" element={<Intro2 />}></Route>
        <Route path="/intro3" element={<Intro3 />}></Route>
        <Route path="/select" element={<Select />}></Route>
        <Route path="/fit" element={<Fitting />}></Route>
        <Route path="/adjust" element={<Adjust />}></Route>
        <Route path="/prompt" element={<Prompt />}></Route>
        <Route path="/finish" element={<Finish/>}></Route>
      </Routes>

      {/* <button onClick={() => setStep(step + 1)}>Next</button> */}

      {/* <button onClick={() => toggleSidebar()}>Toggle sidebar</button> */}
    </div>
  );
}

export default App;
