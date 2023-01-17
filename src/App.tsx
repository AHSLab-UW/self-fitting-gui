import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DragDrop from './pages/DragDrop'
import { useEffect } from 'react'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/drag-drop-demo" element={<DragDrop />}></Route>
      </Routes>
    </div>
  )
}

export default App
