import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DragDrop from './pages/DragDrop'
import Dev from './pages/Dev'
import Welcome from './pages/Welcome'
import Progress from './pages/Progress'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/dev" element={<Dev />}></Route>
        <Route path="/drag-drop-demo" element={<DragDrop />}></Route>
        <Route path="/progress" element={<Progress />}></Route>
      </Routes>
    </div>
  )
}

export default App
