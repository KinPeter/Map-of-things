import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Demo from './Pages/Demo'
import Generator from './Pages/Generator'
import TileEditor from './Pages/TileEditor'
import MapContext from './Context/mapContext'
import ModalContext from './Context/modalContext'

function App() {
  return (
    <MapContext>
      <ModalContext>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/demo" />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/tile-editor" element={<TileEditor />} />
              <Route path="*" element={<Navigate to="/demo" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ModalContext>
    </MapContext>
  )
}

export default App
